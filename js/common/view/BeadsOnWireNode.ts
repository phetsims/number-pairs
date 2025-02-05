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
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import BeadManager from '../model/BeadManager.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';

const BEAD_WIDTH = BeadManager.BEAD_WIDTH;
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
  private readonly keyboardProposedBeadPositionProperty: Vector2Property;

  public constructor(
    private readonly model: NumberPairsModel,
    countingAreaBounds: Bounds2,
    providedOptions: BeadsOnWireNodeOptions
  ) {

    // Although this model view transform is essentially used as a linear function, it is needed as the transform
    // for the keyboard drag listener.
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

    this.modelViewTransform = modelViewTransform;
    this.beadSeparatorCenterXProperty = beadSeparatorCenterXProperty;
    this.beadDragBounds = wire.bounds.erodedX( BEAD_WIDTH );
    this.rightAddendCountingObjectsProperty = model.rightAddendCountingObjectsProperty;
    this.leftAddendCountingObjectsProperty = model.leftAddendCountingObjectsProperty;

    // The proposed bead position when dragging with the keyboard, in model coordinates.
    this.keyboardProposedBeadPositionProperty = new Vector2Property( new Vector2( 0, 0 ), {
      reentrant: true // We need to be able to set this Property in handleBeadMove if it is not matching the bead's position.
    } );

    // GroupSelectView is used to handle keyboard interactions for selecting and dragging beads. When the selection
    // changes, update keyboardProposedBeadPositionProperty to the selected bead's current position.
    const groupSelectModel = model.groupSelectBeadsModel;
    groupSelectModel.selectedGroupItemProperty.link( countingObject => {
      if ( countingObject ) {
        this.keyboardProposedBeadPositionProperty.value = new Vector2( countingObject.beadXPositionProperty.value, 0 );
      }
    } );
    groupSelectModel.isGroupItemKeyboardGrabbedProperty.lazyLink( ( isGrabbed, wasGrabbed ) => {
      if ( !isGrabbed && wasGrabbed ) {
        this.handleBeadDrop( this.beadModelToNodeMap.get( groupSelectModel.selectedGroupItemProperty.value! )! );
      }
    } );

    // When the proposed bead position is being changed by dragging with the keyboard, handle that proposed position
    // using a process similar to mouse/touch dragging - that is, via handleBeadMove.
    this.keyboardProposedBeadPositionProperty.lazyLink( proposedBeadPosition => {
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

    const groupSelectView = new GroupSelectDragInteractionView( groupSelectModel, this, this.beadModelToNodeMap, {
      soundKeyboardDragListenerOptions: {
        keyboardDragDirection: 'leftRight',
        positionProperty: this.keyboardProposedBeadPositionProperty,
        transform: modelViewTransform
      },
      getGroupItemToSelect: () => {
        return this.getSortedBeadNodes()[ 0 ].countingObject;
      },
      getNextSelectedGroupItemFromPressedKeys: ( keysPressed, groupItem ) => {
        const sortedBeadNodes = this.getSortedBeadNodes();

        const selectedBeadNode = this.beadModelToNodeMap.get( groupItem );
        assert && assert( selectedBeadNode, 'selectedBeadNode should not be null' );
        const groupItemIndex = sortedBeadNodes.indexOf( selectedBeadNode! );

        // Determine the delta based on the keys pressed, then use this delta to find the appropriate bead to select.
        const delta = this.getKeysDelta( keysPressed );
        const selectedGroupItemIndex = Utils.clamp( groupItemIndex + delta, 0, sortedBeadNodes.length - 1 );
        return sortedBeadNodes[ selectedGroupItemIndex ].countingObject;
      },
      handleHomeEndKeysDuringDrag: ( keysPressed, groupItem ) => {
        const separatorXPosition = this.beadSeparatorCenterXProperty.value;
        const currentBeadXPosition = groupItem.beadXPositionProperty.value;

        if ( keysPressed.includes( 'home' ) && this.modelViewTransform.modelToViewX( currentBeadXPosition ) > separatorXPosition ) {
          this.handleBeadMove( this.localToGlobalPoint( new Vector2( separatorXPosition - BEAD_WIDTH, 0 ) ), this.beadModelToNodeMap.get( groupItem )! );
        }
        else if ( keysPressed.includes( 'end' ) && this.modelViewTransform.modelToViewX( currentBeadXPosition ) < separatorXPosition ) {
          this.handleBeadMove( this.localToGlobalPoint( new Vector2( separatorXPosition + BEAD_WIDTH, 0 ) ), this.beadModelToNodeMap.get( groupItem )! );
        }
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
            this.handleBeadDrop( beadNode );
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
      model.rightAddendCountingObjectsLengthProperty
    ], ( leftAddend, leftAddendLength, rightAddend, rightAddendLength ) => {

      // If we are not dragging a bead was added or removed from the wire.
      // We also want to make sure that our values are in sync during state or scene changes.
      if ( !this.beadDragging && leftAddend === leftAddendLength && rightAddend === rightAddendLength ) {
        this.beadSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX( NumberPairsModel.calculateBeadSeparatorXPosition( leftAddend ) );

        // We are only adding or removing beads in the sum screen.
        // Reset may also give the impression that we are adding or removing beads, but we want to position the beads
        // differently than when interacting with the CountingObjectSpinners. In a reset situation we will rely
        // on the initial values of the position Properties.
        if ( !isResettingAllProperty.value && !isSettingPhetioStateProperty.value && options.sumScreen ) {
          this.model.beadManager.updateBeadPositions( leftAddend );
        }

        // In our non sum screens "adding" or "removing" a bead during a scene change positions are handled elsewhere.
        // In theory this should only fire when our representation is not RepresentationType.BEADS.
        else if ( !options.sumScreen && !isResettingAllProperty.value && !model.changingScenesProperty.value
                  && !isSettingPhetioStateProperty.value && !model.groupSelectBeadsModel.isGroupItemKeyboardGrabbedProperty.value ) {
          this.model.beadManager.updateBeadPositions( leftAddend );
        }
      }
    } );

  }

  private handleBeadDrop( beadNode: BeadNode ): void {
    if ( Utils.equalsEpsilon( beadNode.centerX, this.beadSeparatorCenterXProperty.value, BEAD_WIDTH / 1.5 ) ) {
      const proposedPosition = beadNode.centerX > this.beadSeparatorCenterXProperty.value ? this.beadSeparatorCenterXProperty.value + BEAD_WIDTH : this.beadSeparatorCenterXProperty.value - BEAD_WIDTH;
      this.handleBeadMove( this.localToGlobalPoint( new Vector2( proposedPosition, 0 ) ), beadNode );
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
    const sortedBeadNodes = draggingRight ? activeBeadNodes : activeBeadNodes.reverse();

    // Now that the beads are sorted in the proper direction we can determine which beads need to be moved based
    // on the index of the grabbed beads and their proximity to each other.
    const beadNodesToMove = this.getBeadsToMove( grabbedBeadNode, proposedParentPosition.x, draggingRight, sortedBeadNodes );

    /**
     * Calculate the distance the grabbed bead has moved and constrain the movement so that it does not exit
     * the drag bounds.
     *
     * We should only adjust the bounds in the direction the bead is being dragged.
     */
    const minXOffset = draggingRight ? 0 : -( beadNodesToMove.length - 1 ) * BEAD_WIDTH;
    const maxXOffset = draggingRight ? -( beadNodesToMove.length - 1 ) * BEAD_WIDTH : 0;
    const dragBoundsWithMovingBeads = this.beadDragBounds.withOffsets( minXOffset, 0, maxXOffset, 0 );

    // Constrain the new position to the drag bounds and set the grabbed bead's updated position.
    const newCenterX = dragBoundsWithMovingBeads.closestPointTo( proposedParentPosition ).x;
    grabbedBeadNode.countingObject.beadXPositionProperty.value = this.modelViewTransform.viewToModelX( newCenterX );

    // Since beadNodesToMove was created above by slicing the sortedBeadNodeArray at the grabbedBead, we can
    // be confident that the first beadNode in the beadNodesToMove array is the grabbedBeadNode, and rely
    // on that assumption as we iterate over the array.
    assert && assert( beadNodesToMove[ 0 ] === grabbedBeadNode, 'The first bead in beadNodesToMove should be the grabbed bead' );

    beadNodesToMove.forEach( ( beadNode, i ) => {
      if ( beadNode !== grabbedBeadNode ) {

        // Move the beads in the drag direction and base their positions on the grabbed bead.
        beadNode.countingObject.beadXPositionProperty.value = this.modelViewTransform.viewToModelX(
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
        if ( !this.rightAddendCountingObjectsProperty.value.includes( beadNode.countingObject ) && this.leftAddendCountingObjectsProperty.value.includes( beadNode.countingObject ) ) {

          // Since a bead is moving to the right, the separator should adjust one position to the left.
          this.beadSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX(
            NumberPairsModel.calculateBeadSeparatorXPosition( this.model.leftAddendProperty.value - 1 ) );

          // Add the bead to the right addend first to avoid duplicate work being done when the left addend value is
          // updated in the ObservableArray.lengthProperty listener.
          beadNode.countingObject.traverseInactiveObjects = false;
          this.rightAddendCountingObjectsProperty.value.add( beadNode.countingObject );
          this.leftAddendCountingObjectsProperty.value.remove( beadNode.countingObject );
          beadNode.countingObject.traverseInactiveObjects = true;

          // As the bead moves past the separator recalculate if other beads now need to move to accommodate.
          const xPosition = this.modelViewTransform.viewToModelX(
            Math.max( beadNode.centerX, this.beadSeparatorCenterXProperty.value + BEAD_WIDTH * 1.5 ) );
          this.getBeadsToMove( beadNode, xPosition, true, sortedBeadNodes ).forEach( ( beadNode, i ) => {
            beadNode.countingObject.beadXPositionProperty.value = xPosition + i;
          } );
        }
      }
      else if ( beadNode.centerX < this.beadSeparatorCenterXProperty.value ||
                ( !draggingRight && beadNode.centerX === this.beadSeparatorCenterXProperty.value ) ) {

        // Do not adjust the separator or move beads between addends if the bead is already in the proper observable array.
        if ( !this.leftAddendCountingObjectsProperty.value.includes( beadNode.countingObject ) && this.rightAddendCountingObjectsProperty.value.includes( beadNode.countingObject ) ) {

          // Since a bead is moving to the left, the separator should adjust one position to the right.
          this.beadSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX(
            NumberPairsModel.calculateBeadSeparatorXPosition( this.model.leftAddendProperty.value + 1 ) );

          // Remove the bead from the right addend first to avoid duplicate work being done when the left addend value is
          // updated in the ObservableArray.lengthProperty listener.
          beadNode.countingObject.traverseInactiveObjects = false;
          this.rightAddendCountingObjectsProperty.value.remove( beadNode.countingObject );
          this.leftAddendCountingObjectsProperty.value.add( beadNode.countingObject );
          beadNode.countingObject.traverseInactiveObjects = true;

          // As the bead moves past the separator recalculate if other beads now need to move to accommodate.
          const xPosition = this.modelViewTransform.viewToModelX(
            Math.min( beadNode.centerX, this.beadSeparatorCenterXProperty.value - BEAD_WIDTH * 1.5 ) );
          this.getBeadsToMove( beadNode, xPosition, false, sortedBeadNodes ).forEach( ( beadNode, i ) => {
            beadNode.countingObject.beadXPositionProperty.value = xPosition - i;
          } );
        }
      }
    } );

    // Once all the beads are moved confirm that any active beads on the wire are each the required minimum distance
    // apart to avoid overlap.
    activeBeadNodes.forEach( ( beadNode, i ) => {
      if ( i > 0 && !beadNode.countingObject.isDraggingProperty.value ) {
        const previousBeadNode = activeBeadNodes[ i - 1 ];
        const distance = Math.abs( beadNode.centerX - previousBeadNode.centerX );
        if ( distance < BEAD_WIDTH ) {
          const newPosition = draggingRight ? previousBeadNode.centerX + BEAD_WIDTH : previousBeadNode.centerX - BEAD_WIDTH;
          beadNode.countingObject.beadXPositionProperty.value = this.modelViewTransform.viewToModelX( newPosition );
        }
      }
    } );

    // Update the proposed bead position if it does not match the grabbed bead's position.
    this.keyboardProposedBeadPositionProperty.value.x !== grabbedBeadNode.countingObject.beadXPositionProperty.value &&
    this.keyboardProposedBeadPositionProperty.set( new Vector2( grabbedBeadNode.countingObject.beadXPositionProperty.value, 0 ) );

    assert && assert( this.leftAddendCountingObjectsProperty.value.length === this.model.leftAddendProperty.value, 'leftAddendObjects.length should match leftAddendNumberProperty' );
    assert && assert( this.rightAddendCountingObjectsProperty.value.length === this.model.rightAddendProperty.value, 'rightAddendObjects.length should match rightAddendNumberProperty' );
  }

  private getBeadsToMove( startingBeadNode: BeadNode, proposedXPosition: number, movingRight: boolean, sortedBeadNodes: BeadNode[] ): BeadNode[] {
    const grabbedBeadIndex = sortedBeadNodes.indexOf( startingBeadNode );
    const slicedBeadNodes = sortedBeadNodes.slice( grabbedBeadIndex, sortedBeadNodes.length + 1 );

    // Find the beads that are touching the affected and have the same addend type. Any beads that are touching the
    // grabbed bead should move with it. If a space is found between beads, stop moving beads in that direction.
    let beadSpaceFound = false;

    const proposedBeadsToMove: BeadNode[] = [];
    slicedBeadNodes.forEach(
      ( beadNode, i ) => {
        const addendMatch: boolean = beadNode.countingObject.addendTypeProperty.value === startingBeadNode.countingObject.addendTypeProperty.value;
        const touchingPreviousBead: boolean = i === 0 || Math.abs( beadNode.centerX - slicedBeadNodes[ i - 1 ].centerX ) <= BEAD_WIDTH;
        if ( !touchingPreviousBead ) {
          beadSpaceFound = true;
        }

        // If the bead is moving to the right, check if the proposed position plus the number of beads to move will go
        // past the bead that is being considered. If it does, add the bead to the list of beads to move.
        const newPositionPastBead = movingRight ?
                                    proposedXPosition + proposedBeadsToMove.length * BEAD_WIDTH >= beadNode.centerX :
                                    proposedXPosition - proposedBeadsToMove.length * BEAD_WIDTH <= beadNode.centerX;

        // We want to only return beads that are the same addend type as the grabbed bead, and are touching the
        // grabbed bead without space in between, OR any moving bead is proposing to move past another bead no matter
        // what it's addend type is.
        ( ( addendMatch && touchingPreviousBead && !beadSpaceFound ) || newPositionPastBead ) && proposedBeadsToMove.push( beadNode );
      } );
    return proposedBeadsToMove;
  }

  /**
   * Sort all active beads by their x position.
   */
  private getSortedBeadNodes(): BeadNode[] {
    return [ ...this.beadModelToNodeMap.values() ]
      .filter( beadNode => beadNode.countingObject.addendTypeProperty.value !== AddendType.INACTIVE )
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