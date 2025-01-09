// Copyright 2024-2025, University of Colorado Boulder

/**
 * Beads are arranged in two groups, one for each addend. All the beads are lined up on a "wire" and can be dragged
 * to either the left or right of the separator. Because the beads are on a wire, when you drag one bead any bead it
 * touches in the direction of the drag will move with it. The number of beads in each group is determined by the
 * addend values. The number of visible beads is determined by the total value.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Circle, LinearGradient, Node, NodeOptions, Path, Rectangle } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsColors from '../NumberPairsColors.js';
import GroupSelectDragInteractionView from './GroupSelectDragInteractionView.js';
import Utils from '../../../../dot/js/Utils.js';
import BeadNode from './BeadNode.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';

const BEAD_WIDTH = BeadNode.BEAD_WIDTH;
const WIRE_HEIGHT = 4;
type SelfOptions = {
  sceneRange: Range;
  sumScreen: boolean;
};

type BeadsOnWireNodeOptions = StrictOmit<NodeOptions, 'children'> & SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class BeadsOnWireNode extends Node {

  private readonly beadModelToNodeMap = new Map<CountingObject, BeadNode>();
  private readonly modelViewTransform: ModelViewTransform2;

  // Convenience Property
  private readonly beadSeparatorCenterXProperty: Property<number>;
  private readonly beadDragBounds: Bounds2;

  private readonly leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  private readonly rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;

  private beadDragging = false;
  private readonly numberOfSpotsOnWire: number;
  private readonly beadXRange: Range;

  public constructor(
    private readonly model: NumberPairsModel,
    countingAreaBounds: Bounds2,
    providedOptions: BeadsOnWireNodeOptions
  ) {
    const numberOfSpotsOnWire = Math.floor( countingAreaBounds.width / BEAD_WIDTH );

    // TODO: add documentation for the modelViewTransform
    //  Perhaps use a LinearFunction instead.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleMapping(
      Vector2.ZERO,
      Vector2.ZERO,
      BEAD_WIDTH
    );

    const wireGradient = new LinearGradient( 0, -WIRE_HEIGHT / 2, 0, WIRE_HEIGHT / 2 )
      .addColorStop( 0, NumberPairsColors.wireHighlightColorProperty )
      .addColorStop( 0.2, NumberPairsColors.wireHighlightColorProperty )
      .addColorStop( 0.6, NumberPairsColors.wireBaseColorProperty )
      .addColorStop( 1, NumberPairsColors.wireBaseColorProperty );
    const wireLineWidth = 1;
    const wire = new Rectangle( 0, -WIRE_HEIGHT / 2, countingAreaBounds.width - wireLineWidth, WIRE_HEIGHT, {
      fill: wireGradient,
      stroke: 'black',
      lineWidth: wireLineWidth
    } );

    const beadSeparator = new BeadSeparator();
    const beadSeparatorCenterXProperty = new NumberProperty( 0, {
      tandem: providedOptions.tandem.createTandem( 'beadSeparatorCenterXProperty' ),
      phetioReadOnly: true
    } );
    beadSeparatorCenterXProperty.link( x => { beadSeparator.centerX = x; } );

    const options = optionize<BeadsOnWireNodeOptions, SelfOptions, NodeOptions>()( {
      children: [ wire, beadSeparator ],
      excludeInvisibleChildrenFromBounds: true,
      accessibleName: 'Beads On a Wire'
    }, providedOptions );

    super( options );

    this.beadXRange = new Range( NumberPairsConstants.LEFTMOST_BEAD_X, numberOfSpotsOnWire - 1 );
    this.modelViewTransform = modelViewTransform;
    this.beadSeparatorCenterXProperty = beadSeparatorCenterXProperty;
    this.beadDragBounds = wire.bounds.erodedX( BEAD_WIDTH );
    this.rightAddendCountingObjectsProperty = model.rightAddendCountingObjectsProperty;
    this.leftAddendCountingObjectsProperty = model.leftAddendCountingObjectsProperty;
    this.numberOfSpotsOnWire = numberOfSpotsOnWire;

    // The proposed bead position when dragging with the keyboard, in model coordinates.
    const keyboardProposedBeadPositionProperty = new Vector2Property( new Vector2( 0, 0 ) );

    // GroupSelectView is used to handle keyboard interactions for selecting and dragging beads. When the selection
    // changes, update keyboardProposedBeadPositionProperty to the selected bead's current position.
    const groupSelectModel = model.groupSelectBeadsModel;
    groupSelectModel.selectedGroupItemProperty.link( countingObject => {
      if ( countingObject ) {
        keyboardProposedBeadPositionProperty.value = new Vector2( countingObject.beadXPositionProperty.value, 0 );
      }
    } );

    // When the proposed bead position is being changed by dragging with the keyboard, handle that proposed position
    // using a process similar to mouse/touch dragging - that is, via handleBeadMove.
    keyboardProposedBeadPositionProperty.lazyLink( proposedBeadPosition => {
      const countingObject = groupSelectModel.selectedGroupItemProperty.value!;
      assert && assert( countingObject, 'Expected to have a countingObject when dragging with keyboard.' );
      const grabbedBeadNode = this.beadModelToNodeMap.get( countingObject )!;
      assert && assert( grabbedBeadNode, 'Expected to have a grabbedBeadNode when dragging with keyboard.' );


      // This complicated transform is unfortunate, but we want to handle all varieties of dragging via handleBeadMove.
      // HandleBeadMove expects the proposed position to be in the global view coordinate frame, because that is
      // what the DragListener (internal to BeadNode) provides.
      const viewPosition = grabbedBeadNode.parentToGlobalPoint( modelViewTransform.modelToViewPosition( proposedBeadPosition ) );
      this.handleBeadMove( viewPosition, grabbedBeadNode );
    } );

    const groupSelectView = new GroupSelectDragInteractionView( groupSelectModel, model, this, this.beadModelToNodeMap, {
      soundKeyboardDragListenerOptions: {
        keyboardDragDirection: 'leftRight',
        positionProperty: keyboardProposedBeadPositionProperty,
        transform: modelViewTransform
      },
      getGroupItemToSelect: () => {
        return this.getSortedBeadNodes()[ 0 ].model;
      },
      getNextSelectedGroupItemFromPressedKeys: ( keysPressed, groupItem ) => {
        const sortedBeadNodes = this.getSortedBeadNodes();

        const selectedBeadNode = this.beadModelToNodeMap.get( groupItem );
        assert && assert( selectedBeadNode, 'selectedBeadNode should not be null' );
        const groupItemIndex = sortedBeadNodes.indexOf( selectedBeadNode! );

        // Determine the delta based on the keys pressed, then use this delta to find the appropriate bead to select.
        const delta = this.getKeysDelta( keysPressed );
        const selectedGroupItemIndex = Utils.clamp( groupItemIndex + delta, 0, sortedBeadNodes.length - 1 );
        return sortedBeadNodes[ selectedGroupItemIndex ].model;
      },
      tandem: options.tandem.createTandem( 'groupSelectView' )
    } );

    // TODO: Why is this.getGlobalToLocalMatrix() telling me that we are in the same coordinate frame as global when we are obviously not?
    //  The counting are bounds are being rendered as if there is a local coordinate frame they are worrying about.
    //  The origin (0,0) is set at the center left edge of the counting area. Does a different origin not
    //   automatically create a new coordinate frame?
    groupSelectView.groupSortGroupFocusHighlightPath.shape = Shape.bounds( new Bounds2( 0, -countingAreaBounds.height / 2, countingAreaBounds.width, countingAreaBounds.height / 2 ) );

    model.countingObjects.forEach( ( countingObject, i ) => {
      const beadNode = new BeadNode(
        countingObject,
        {
          tandem: options.tandem.createTandem( `beadNode${i}` ),
          onStartDrag: draggedBeadNode => {

            // Interrupt the drag that's in progress. Multitouch support is too difficult and unnecessary.
            if ( this.beadDragging ) {
              this.beadModelToNodeMap.forEach( ( beadNode, countingObject ) => {
                if ( beadNode !== draggedBeadNode ) {
                  beadNode.interruptSubtreeInput();
                }
              } );
            }
            else {
              this.beadDragging = true;
            }
          },
          onDrag: ( pointerPoint: Vector2, beadNode: BeadNode ) => {
            this.handleBeadMove( pointerPoint, beadNode );
          },
          onEndDrag: () => {
            this.beadDragging = false;
            const sortedBeads = this.getSortedBeadNodes();
            this.model.beadXPositionsProperty.value = sortedBeads.map( beadNode => beadNode.model.beadXPositionProperty.value );
          }
        } );

      countingObject.beadXPositionProperty.link( x => {
        beadNode.center = new Vector2( modelViewTransform.modelToViewX( x ), 0 );
      } );

      this.beadModelToNodeMap.set( countingObject, beadNode );
      this.addChild( beadNode );
    } );

    Multilink.multilink( [
      model.leftAddendProperty,
      model.leftAddendCountingObjectsLengthProperty,
      model.rightAddendProperty,
      model.rightAddendCountingObjectsLengthProperty,
      model.totalProperty
    ], ( leftAddend, leftAddendLength, rightAddend, rightAddendLength ) => {

      // If we are not dragging a bead was added or removed from the wire.
      // We also want to make sure that our values are in sync during state or scene changes.
      if ( !this.beadDragging && leftAddend === leftAddendLength && rightAddend === rightAddendLength ) {
        this.beadSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX( NumberPairsModel.calculateBeadSeparatorXPosition( leftAddend ) );

        // We are only adding or removing beads in the sum screen. In other screens "adding" or "removing" a bead is
        // actually a scene change and bead positions are handled elsewhere.
        if ( options.sumScreen ) {
          this.updateBeadPositions( leftAddend, rightAddend );
        }
      }
    } );

  }

  /**
   * Update the positions of the beads on the wire based on the addend values. We may have to account for a bead being
   * added or removed.
   * @param leftAddend
   * @param rightAddend
   */
  private updateBeadPositions( leftAddend: number, rightAddend: number ): void {
    const leftAddendBeads = this.leftAddendCountingObjectsProperty.value;
    const rightAddendBeads = this.rightAddendCountingObjectsProperty.value;
    const positions = this.model.beadXPositionsProperty.value;
    const separatorXPosition = NumberPairsModel.calculateBeadSeparatorXPosition( leftAddend );

    // TODO: This is relying on the assumption that the separator will never move enough to force a bead
    //  over the threshold... Is that true? Probably not because of studio... sigh...
    let leftAddendXPositions = positions.filter( x => x < separatorXPosition ).sort( ( a, b ) => a - b );
    let rightAddendXPositions = positions.filter( x => x > separatorXPosition ).sort( ( a, b ) => a - b );

    /**
     * Handle adding or removing a bead
     */
    if ( leftAddendBeads.length > leftAddendXPositions.length ) {
      _.times( leftAddendBeads.length - leftAddendXPositions.length, () => {
        leftAddendXPositions = this.addBeadToWire( leftAddendXPositions, 1, leftAddend, rightAddend );
      } );
    }
    else if ( leftAddendBeads.length < leftAddendXPositions.length ) {
      _.times( leftAddendXPositions.length - leftAddendBeads.length, () => {
        // when a bead is removed we want to take the furthest one to the left
        leftAddendXPositions.shift();
      } );
    }
    if ( rightAddendBeads.length > rightAddendXPositions.length ) {
      const reversedXPositions = rightAddendXPositions.slice().reverse();
      _.times( rightAddendBeads.length - rightAddendXPositions.length, () => {
        rightAddendXPositions = this.addBeadToWire( reversedXPositions, -1, leftAddend, rightAddend );
      } );
    }
    else if ( rightAddendBeads.length < rightAddendXPositions.length ) {
      _.times( rightAddendXPositions.length - rightAddendBeads.length, () => {
        // when a bead is removed we want to take the furthest one to the right
        rightAddendXPositions.pop();
      } );
    }

    /**
     * Handle movement of the separator that may cause overlap with a bead
     */
    const beadDistanceFromSeparator = NumberPairsConstants.BEAD_DISTANCE_FROM_SEPARATOR;
    const separatorRange = new Range( separatorXPosition - beadDistanceFromSeparator,
      separatorXPosition + beadDistanceFromSeparator );
    const leftAddendBeadOverlap = _.some( leftAddendXPositions, x => separatorRange.contains( x ) );
    const rightAddendBeadOverlap = _.some( rightAddendXPositions, x => separatorRange.contains( x ) );
    if ( leftAddendBeadOverlap ) {
      leftAddendXPositions = this.shiftXPositions( leftAddendXPositions.reverse(), -1, separatorXPosition - beadDistanceFromSeparator ).reverse();
    }
    if ( rightAddendBeadOverlap ) {
      rightAddendXPositions = this.shiftXPositions( rightAddendXPositions, 1, separatorXPosition + beadDistanceFromSeparator );
    }

    this.model.setBeadXPositions( leftAddendBeads, rightAddendBeads, leftAddendXPositions, rightAddendXPositions );
  }

  /**
   * @param xPositions
   * @param direction - positive when we want to shift to the right, negative when we want to shift to the left.
   * @param startingValue
   */
  private shiftXPositions( xPositions: number[], direction: number, startingValue: number ): number[] {
    direction = Math.sign( direction );
    const shiftedPositions: number[] = [];
    xPositions.reduce( ( previousX, currentX ) => {
      const x = direction > 0 ? Math.max( currentX, previousX + direction ) : Math.min( currentX, previousX + direction );
      shiftedPositions.push( x );
      return x;
    }, startingValue - direction ); // we want the first xPosition to be at the starting value.
    return shiftedPositions;
  }

  /**
   * We want to add beads from the outside in. This function returns an array of x positions based on adding an
   * x position to the provided array and handles the logic of updating other x positions to meet the space
   * requirements along the wire.
   *
   * @param existingXPositions - in traversal order ( outside in).
   * @param direction - a negative direction is adding a bead to the right (since beads will need to shift left),
   * a positive direction is adding a bead to the left (since beads will need to shift right).
   * @param leftAddend
   * @param rightAddend
   */
  private addBeadToWire( existingXPositions: number[], direction: number, leftAddend: number, rightAddend: number ): number[] {

    // we only want the sign, we will traverse by one.
    direction = Math.sign( direction );

    // If there are no xPositions provided then go to the default.
    if ( existingXPositions.length === 0 ) {
      const initialBeadPositions = NumberPairsModel.getInitialBeadPositions( leftAddend, rightAddend );
      return direction > 0 ? initialBeadPositions.leftAddendXPositions : initialBeadPositions.rightAddendXPositions;
    }
    else {
      let newXPositions;
      const proposedNewBeadPosition = existingXPositions[ 0 ] - direction;
      const newBeadInRange = this.beadXRange.contains( proposedNewBeadPosition );
      if ( newBeadInRange ) {
        existingXPositions.unshift( proposedNewBeadPosition );
        newXPositions = existingXPositions;
      }

        // If the proposed position for the new bead is not within range, we need to constrain the position and
      // adjust any neighboring beads to make room.
      else {
        const startingValue = direction > 0 ? this.beadXRange.min : this.beadXRange.max;
        existingXPositions.unshift( proposedNewBeadPosition );
        newXPositions = this.shiftXPositions( existingXPositions, direction, startingValue );
      }

      // When adding a bead to the right we were given xPosition values in traversal order (right to left) because we
      // add beads to the outside. But we want to return values in bead order (left to right) since that is how
      // we store the beads in the model.
      direction < 0 && newXPositions.reverse();
      return newXPositions;
    }
  }

  /**
   * Handle the movement of a bead and its neighbors when it is dragged.
   * @param newPosition - the proposed new position, in the global view coordinate frame.
   * @param grabbedBeadNode
   */
  private handleBeadMove( newPosition: Vector2, grabbedBeadNode: BeadNode ): void {
    const proposedParentPosition = grabbedBeadNode.globalToParentPoint( newPosition );

    // Determine whether we are dragging the bead to the right or left along the wire.
    const draggingRight = Math.sign( newPosition.x - grabbedBeadNode.parentToGlobalPoint( grabbedBeadNode.bounds.center ).x ) > 0;

    // Reverse the sorted and active beads if we are dragging towards the left.
    const activeBeadNodes = this.getSortedBeadNodes();
    const sortedBeadNode = draggingRight ? activeBeadNodes : activeBeadNodes.reverse();

    // Now that the beads are sorted in the proper direction we can determine which beads need to be moved based
    // on the index of the grabbed beads and their proximity to each other.
    const grabbedBeadIndex = sortedBeadNode.indexOf( grabbedBeadNode );

    // Find the beads that are touching the grabbed bead and have the same addend type. Any beads that are touching the
    // grabbed bead should move with it. If a space is found between beads, stop moving beads in that direction.
    let beadSpaceFound = false;
    const slicedBeadNodes = sortedBeadNode.slice( grabbedBeadIndex, sortedBeadNode.length + 1 );
    const beadNodesToMove = slicedBeadNodes.filter(
      ( beadNode, i ) => {
        const addendMatch: boolean = beadNode.model.addendTypeProperty.value === grabbedBeadNode.model.addendTypeProperty.value;
        const touchingPreviousBead: boolean = i === 0 || Math.abs( beadNode.centerX - slicedBeadNodes[ i - 1 ].centerX ) <= BEAD_WIDTH;
        if ( !touchingPreviousBead ) {
          beadSpaceFound = true;
        }
        const newPositionPastBead = draggingRight ? proposedParentPosition.x >= beadNode.centerX : proposedParentPosition.x <= beadNode.centerX;

        // We want to only return beads that are the same addend type as the grabbed bead, and are touching the
        // grabbed bead without space in between, OR the grabbed bead is proposing to move past a bead no matter
        // what it's addend type is.
        return ( addendMatch && touchingPreviousBead && !beadSpaceFound ) || newPositionPastBead;
      } );

    /**
     * Calculate the distance the grabbed bead has moved and constrain the movement so that it does not exit
     * the drag bounds.
     *
     * We should only adjust the bounds in the direction the bead is being dragged.
     */
    const minXOffset = draggingRight ? 0 : -( slicedBeadNodes.length - 1 ) * BEAD_WIDTH;
    const maxXOffset = draggingRight ? -( slicedBeadNodes.length - 1 ) * BEAD_WIDTH : 0;
    const dragBoundsWithMovingBeads = this.beadDragBounds.withOffsets( minXOffset, 0, maxXOffset, 0 );

    // Constrain the new position to the drag bounds and set the grabbed bead's updated position.
    const newCenterX = dragBoundsWithMovingBeads.closestPointTo( proposedParentPosition ).x;
    grabbedBeadNode.model.beadXPositionProperty.value = this.modelViewTransform.viewToModelX( newCenterX );

    // Since beadNodesToMove was created above by slicing the sortedBeadNodeArray at the grabbedBead, we can
    // be confident that the first beadNode in the beadNodesToMove array is the grabbedBeadNode, and rely
    // on that assumption as we iterate over the array.
    assert && assert( beadNodesToMove[ 0 ] === grabbedBeadNode, 'The first bead in beadNodesToMove should be the grabbed bead' );

    beadNodesToMove.forEach( ( beadNode, i ) => {
      if ( beadNode !== grabbedBeadNode ) {

        // Move the beads in the drag direction and base their positions on the grabbed bead.
        beadNode.model.beadXPositionProperty.value = this.modelViewTransform.viewToModelX(
          grabbedBeadNode.centerX + i * ( draggingRight ? BEAD_WIDTH : -BEAD_WIDTH ) );
      }

      /**
       * Handle the case where a bead is moved past the separator. In this case, the bead should be moved to the
       * proper countingObjects observable array according to its new addendType value.
       *
       * When a bead is dragging to the right, and it's centerX value is equal to that of the separator, we assume the
       * intention is to move the bead to the right addend. The same logic applies when dragging to the left.
       */
      if ( beadNode.centerX > this.beadSeparatorCenterXProperty.value ||
           ( draggingRight && beadNode.centerX === this.beadSeparatorCenterXProperty.value ) ) {

        // Do not adjust the separator or move beads between addends if the bead is already in the proper observable array.
        if ( !this.rightAddendCountingObjectsProperty.value.includes( beadNode.model ) && this.leftAddendCountingObjectsProperty.value.includes( beadNode.model ) ) {

          // Since a bead is moving to the right, the separator should adjust one position to the left.
          this.beadSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX(
            NumberPairsModel.calculateBeadSeparatorXPosition( this.model.leftAddendProperty.value - 1 ) );

          // Add the bead to the right addend first to avoid duplicate work being done when the left addend value is
          // updated in the ObservableArray.lengthProperty listener.
          beadNode.model.traverseInactiveObjects = false;
          this.rightAddendCountingObjectsProperty.value.add( beadNode.model );
          this.leftAddendCountingObjectsProperty.value.remove( beadNode.model );
          beadNode.model.traverseInactiveObjects = true;

          // Immediately move the beads past the separator
          beadNode.model.beadXPositionProperty.value = this.modelViewTransform.viewToModelX(
            Math.max( beadNode.centerX, this.beadSeparatorCenterXProperty.value + BEAD_WIDTH * 1.5 ) );
        }
      }
      else if ( beadNode.centerX < this.beadSeparatorCenterXProperty.value ||
                ( !draggingRight && beadNode.centerX === this.beadSeparatorCenterXProperty.value ) ) {

        // Do not adjust the separator or move beads between addends if the bead is already in the proper observable array.
        if ( !this.leftAddendCountingObjectsProperty.value.includes( beadNode.model ) && this.rightAddendCountingObjectsProperty.value.includes( beadNode.model ) ) {

          // Since a bead is moving to the left, the separator should adjust one position to the right.
          this.beadSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX(
            NumberPairsModel.calculateBeadSeparatorXPosition( this.model.leftAddendProperty.value + 1 ) );

          // Remove the bead from the right addend first to avoid duplicate work being done when the left addend value is
          // updated in the ObservableArray.lengthProperty listener.
          beadNode.model.traverseInactiveObjects = false;
          this.rightAddendCountingObjectsProperty.value.remove( beadNode.model );
          this.leftAddendCountingObjectsProperty.value.add( beadNode.model );
          beadNode.model.traverseInactiveObjects = true;

          // Immediately move the beads past the separator
          beadNode.model.beadXPositionProperty.value = this.modelViewTransform.viewToModelX(
            Math.min( beadNode.centerX, this.beadSeparatorCenterXProperty.value - BEAD_WIDTH * 1.5 ) );
        }
      }
    } );

    // Once all the beads are moved confirm that any active beads on the wire are each the required minimum distance
    // apart to avoid overlap.
    activeBeadNodes.forEach( ( beadNode, i ) => {
      if ( i > 0 && !beadNode.model.draggingProperty.value ) {
        const previousBeadNode = activeBeadNodes[ i - 1 ];
        const distance = Math.abs( beadNode.centerX - previousBeadNode.centerX );
        if ( distance < BEAD_WIDTH ) {
          const newPosition = draggingRight ? previousBeadNode.centerX + BEAD_WIDTH : previousBeadNode.centerX - BEAD_WIDTH;
          beadNode.model.beadXPositionProperty.value = this.modelViewTransform.viewToModelX( newPosition );
        }
      }
    } );

    assert && assert( this.leftAddendCountingObjectsProperty.value.length === this.model.leftAddendProperty.value, 'leftAddendObjects.length should match leftAddendNumberProperty' );
    assert && assert( this.rightAddendCountingObjectsProperty.value.length === this.model.rightAddendProperty.value, 'rightAddendObjects.length should match rightAddendNumberProperty' );
  }

  /**
   * Sort all active beads by their x position.
   */
  private getSortedBeadNodes(): BeadNode[] {
    return [ ...this.beadModelToNodeMap.values() ]
      .filter( beadNode => beadNode.model.addendTypeProperty.value !== AddendType.INACTIVE )
      .sort( ( a, b ) => a.centerX - b.centerX );
  }

  /**
   * Determine how to traverse via keyboard input.
   * @param keysPressed
   */
  private getKeysDelta( keysPressed: string ): number {
    switch( keysPressed ) {
      case 'd':
      case 'w':
      case 'arrowUp':
      case 'arrowRight':
        return 1;
      case 'a':
      case 's':
      case 'arrowDown':
      case 'arrowLeft':
        return -1;
      case 'shift+d':
      case 'shift+w':
      case 'shift+arrowUp':
      case 'shift+arrowRight':
        return 2;
      case 'shift+a':
      case 'shift+s':
      case 'shift+arrowDown':
      case 'shift+arrowLeft':
        return -2;
      default:
        return 0;
    }
  }
}

class BeadSeparator extends Circle {
  public constructor() {
    const circleRadius = WIRE_HEIGHT * 1.5;
    const circleHighlightShape = new Shape().ellipse( new Vector2( -2, -2 ), 3.25, 2.5, -Math.PI / 4 );
    const circleHighlight = new Path( circleHighlightShape, {
      fill: NumberPairsColors.wireHighlightColorProperty
    } );
    super( circleRadius, {
      fill: NumberPairsColors.wireBaseColorProperty,
      stroke: 'black',
      children: [ circleHighlight ]
    } );
  }
}

numberPairs.register( 'BeadsOnWireNode', BeadsOnWireNode );