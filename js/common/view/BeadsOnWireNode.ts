// Copyright 2024-2025, University of Colorado Boulder

/**
 * Beads are arranged in two groups, one for each addend. All the beads are lined up on a "wire" and can be dragged
 * to either the left or right of the separator. Because the beads are on a wire, when you drag one bead, any bead it
 * touches in the direction of the drag will move with it. The addend values determine the number of beads in each
 * group. The total value determines the number of visible beads.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import { clamp } from '../../../../dot/js/util/clamp.js';
import { equalsEpsilon } from '../../../../dot/js/util/equalsEpsilon.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import LinearGradient from '../../../../scenery/js/util/LinearGradient.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import BeadManager from '../model/BeadManager.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import RepresentationType from '../model/RepresentationType.js';
import NumberPairsColors from '../NumberPairsColors.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import BeadNode from './BeadNode.js';
import GroupSelectDragInteractionView from './GroupSelectDragInteractionView.js';

const BEAD_WIDTH = BeadManager.BEAD_WIDTH;
const SEPARATOR_BUFFER = 1.5 * BEAD_WIDTH;
const WIRE_HEIGHT = 4;
type SelfOptions = {
  sceneRange: Range;
  sumScreen: boolean;
};

type BeadsOnWireNodeOptions = StrictOmit<NodeOptions, 'children'> & SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class BeadsOnWireNode extends Node {

  private readonly beadModelToNodeMap = new Map<CountingObject, BeadNode>();

  // In view coordinates.
  private readonly beadSeparatorCenterXProperty: Property<number>;
  private readonly beadDragBounds: Bounds2;

  private readonly leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  private readonly rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;

  private readonly beadDraggingProperty = new BooleanProperty( false );

  // This flag is used during `home` and `end` keyboard behavior for the beads. We ignore bounds initially and then
  // shift positions accordingly once all the work is done.
  private ignoreBeadBounds = false;
  private readonly keyboardProposedBeadPositionProperty: Vector2Property;

  public constructor(
    private readonly model: NumberPairsModel,
    countingAreaBounds: Bounds2,
    providedOptions: BeadsOnWireNodeOptions
  ) {

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

    // Create the responsive accessible names for the beads.
    const navigatePatternStringProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.navigatePattern.createProperty( {
      items: RepresentationType.BEADS.accessibleName
    } );
    const movePatternStringProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.grabbedPattern.createProperty( {
      item: RepresentationType.BEADS.singularAccessibleName!
    } );

    const options = optionize<BeadsOnWireNodeOptions, SelfOptions, NodeOptions>()( {
      children: [ wire, beadSeparator ],
      excludeInvisibleChildrenFromBounds: true,
      accessibleName: navigatePatternStringProperty,
      accessibleHelpText: NumberPairsFluent.a11y.beads.accessibleHelpTextStringProperty
    }, providedOptions );

    super( options );

    this.beadSeparatorCenterXProperty = beadSeparatorCenterXProperty;
    this.beadDragBounds = wire.bounds.erodedX( BEAD_WIDTH );
    this.rightAddendCountingObjectsProperty = model.rightAddendCountingObjectsProperty;
    this.leftAddendCountingObjectsProperty = model.leftAddendCountingObjectsProperty;

    model.countingObjects.forEach( ( countingObject, i ) => {
      const beadNode = new BeadNode(
        countingObject,
        this.beadDraggingProperty,
        {
          tandem: options.tandem.createTandem( `beadNode${i}` ),
          onStartDrag: () => {
            this.beadDraggingProperty.value = true;
          },
          onDrag: ( pointerPoint: Vector2, beadNode: BeadNode ) => {
            this.handleBeadMove( pointerPoint, beadNode );
          },
          onEndDrag: () => {
            this.beadDraggingProperty.value = false;
            this.handleBeadDrop( beadNode );
          }
        } );

      countingObject.beadXPositionProperty.link( x => {
        beadNode.center = new Vector2( BeadManager.BEAD_MODEL_VIEW_TRANSFORM.modelToViewX( x ), 0 );
      } );

      this.beadModelToNodeMap.set( countingObject, beadNode );
      this.addChild( beadNode );
    } );

    /**
     * Keyboard interaction for dragging beads.
     * Bead nodes need to be created before the groupSelectView is created so that the beadModelToNodeMap is populated.
     */

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
      if ( !isGrabbed && wasGrabbed && !isResettingAllProperty.value && !isSettingPhetioStateProperty.value ) {
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
      const viewPosition = grabbedBeadNode.parentToGlobalPoint( BeadManager.BEAD_MODEL_VIEW_TRANSFORM.modelToViewPosition( proposedBeadPosition ) );

      // We only need to handle a bead move when our values and array lengths match. Otherwise, we are in an intermediary
      // state when beads are being added or removed.
      if ( model.leftAddendProperty.value === model.leftAddendCountingObjectsLengthProperty.value &&
           model.rightAddendProperty.value === model.rightAddendCountingObjectsLengthProperty.value &&
           !isResettingAllProperty.value && !isSettingPhetioStateProperty.value ) {
        this.handleBeadMove( viewPosition, grabbedBeadNode );
      }
    } );

    const groupSelectView = new GroupSelectDragInteractionView( groupSelectModel, this, this.keyboardProposedBeadPositionProperty, this.beadModelToNodeMap, {
      soundKeyboardDragListenerOptions: {
        dragDelta: 30,
        shiftDragDelta: 15,
        keyboardDragDirection: 'leftRight',
        transform: BeadManager.BEAD_MODEL_VIEW_TRANSFORM
      },
      getGroupItemToSelect: () => {
        const sortedBeadNodes = this.getSortedBeadNodes();
        return sortedBeadNodes.length > 0 ? sortedBeadNodes[ 0 ].countingObject : null;
      },
      getNextSelectedGroupItemFromPressedKeys: ( keysPressed, groupItem ) => {
        const sortedBeadNodes = this.getSortedBeadNodes();

        const selectedBeadNode = this.beadModelToNodeMap.get( groupItem );
        assert && assert( selectedBeadNode, 'selectedBeadNode should not be null' );
        const groupItemIndex = sortedBeadNodes.indexOf( selectedBeadNode! );

        // Determine the delta based on the keys pressed, then use this delta to find the appropriate bead to select.
        const delta = this.getKeysDelta( keysPressed );
        const selectedGroupItemIndex = clamp( groupItemIndex + delta, 0, sortedBeadNodes.length - 1 );
        return sortedBeadNodes[ selectedGroupItemIndex ].countingObject;
      },
      handleHomeEndKeysDuringDrag: ( keysPressed, groupItem ) => {
        const separatorXPosition = this.beadSeparatorCenterXProperty.value;
        const currentBeadXPosition = groupItem.beadXPositionProperty.value;

        if ( keysPressed.includes( 'home' ) && BeadManager.BEAD_MODEL_VIEW_TRANSFORM.modelToViewX( currentBeadXPosition ) > separatorXPosition ) {
          this.ignoreBeadBounds = true;
          this.handleBeadMove( this.localToGlobalPoint( new Vector2( separatorXPosition - SEPARATOR_BUFFER, 0 ) ), this.beadModelToNodeMap.get( groupItem )! );
          this.ignoreBeadBounds = false;

          const leftAddendSortedBeads = this.getSortedBeadNodes().filter( beadNode => beadNode.countingObject.addendTypeProperty.value === AddendType.LEFT );
          this.handleBeadsOutsideOfBounds( leftAddendSortedBeads, false );

        }
        else if ( keysPressed.includes( 'end' ) && BeadManager.BEAD_MODEL_VIEW_TRANSFORM.modelToViewX( currentBeadXPosition ) < separatorXPosition ) {
          this.ignoreBeadBounds = true;
          this.handleBeadMove( this.localToGlobalPoint( new Vector2( separatorXPosition + SEPARATOR_BUFFER, 0 ) ), this.beadModelToNodeMap.get( groupItem )! );
          this.ignoreBeadBounds = false;

          const rightAddendSortedBeads = this.getSortedBeadNodes().filter( beadNode => beadNode.countingObject.addendTypeProperty.value === AddendType.RIGHT ).reverse();
          this.handleBeadsOutsideOfBounds( rightAddendSortedBeads, true );
        }
      },
      tandem: options.tandem.createTandem( 'groupSelectView' )
    } );

    groupSelectView.groupSortGroupFocusHighlightPath.shape = Shape.bounds( new Bounds2( 0, -countingAreaBounds.height / 2, countingAreaBounds.width, countingAreaBounds.height / 2 ) );
    groupSelectView.grabReleaseCueNode.centerTop = new Vector2( NumberPairsConstants.COUNTING_AREA_BOUNDS.width / 2, -NumberPairsConstants.COUNTING_AREA_BOUNDS.height / 2 ).plusXY( 0, 50 );
    groupSelectModel.isGroupItemKeyboardGrabbedProperty.link( grabbed => {
      this.accessibleName = grabbed ? movePatternStringProperty : navigatePatternStringProperty;
    } );

    Multilink.multilink( [
      model.leftAddendProperty,
      model.leftAddendCountingObjectsLengthProperty,
      model.rightAddendProperty,
      model.rightAddendCountingObjectsLengthProperty
    ], ( leftAddend, leftAddendLength, rightAddend, rightAddendLength ) => {

      // If we are not dragging a bead was added or removed from the wire.
      // We also want to make sure that our values are in sync during state or scene changes.
      if ( !this.beadDraggingProperty.value && leftAddend === leftAddendLength && rightAddend === rightAddendLength ) {
        this.beadSeparatorCenterXProperty.value = BeadManager.BEAD_MODEL_VIEW_TRANSFORM.modelToViewX( BeadManager.calculateBeadSeparatorXPosition( leftAddend ) );

        // We are only adding or removing beads in the sum screen.
        // Reset may also give the impression that we are adding or removing beads, but we want to position the beads
        // differently than when interacting with the CountingObjectSpinners. In a reset situation we will rely
        // on the initial values of the position Properties.
        if ( !isResettingAllProperty.value && !isSettingPhetioStateProperty.value && options.sumScreen &&
             !model.groupSelectBeadsModel.isGroupItemKeyboardGrabbedProperty.value && !this.beadDraggingProperty.value ) {
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

    if ( equalsEpsilon( beadNode.centerX, this.beadSeparatorCenterXProperty.value, BEAD_WIDTH / 1.5 ) ) {
      this.handleSeparatorOverlap( beadNode );
    }
    else {
      const sortedBeads = this.getSortedBeadNodes();
      for ( let i = 0; i < sortedBeads.length; i++ ) {
        const beadNode = sortedBeads[ i ];
        if ( equalsEpsilon( beadNode.centerX, this.beadSeparatorCenterXProperty.value, BEAD_WIDTH / 1.5 ) ) {
          this.handleSeparatorOverlap( beadNode );
          break;
        }
      }
    }

    if ( this.model.groupSelectBeadsModel.selectedGroupItemProperty.value ) {
      this.keyboardProposedBeadPositionProperty.value = new Vector2( this.model.groupSelectBeadsModel.selectedGroupItemProperty.value.beadXPositionProperty.value, 0 );
    }
  }

  private handleSeparatorOverlap( beadNode: BeadNode ): void {
    const proposedPosition = beadNode.centerX > this.beadSeparatorCenterXProperty.value ? this.beadSeparatorCenterXProperty.value + BEAD_WIDTH : this.beadSeparatorCenterXProperty.value - BEAD_WIDTH;
    this.handleBeadMove( this.localToGlobalPoint( new Vector2( proposedPosition, 0 ) ), beadNode );
  }

  /**
   * If a bead is outside the bounds of the drag area, shift all the beads of that addend type over to accommodate.
   * @param movingRight - Whether the beads were moving to the right or left of the wire.
   * @param beadNodes
   */
  private handleBeadsOutsideOfBounds( beadNodes: BeadNode[], movingRight: boolean ): void {

    // If we are moving to the right and beads are out of bounds we want to shift the beads to the left.
    const shiftDirection = movingRight ? -1 : 1;

    // If beads are out of bounds that means we need to start from the outside in.
    const extremePosition = movingRight ? BeadManager.RIGHTMOST_BEAD_X : BeadManager.LEFTMOST_BEAD_X;

    if ( _.some( beadNodes, beadNode => !this.beadDragBounds.containsPoint( beadNode.center ) ) ) {
      const beadXPositions = beadNodes.map( beadNode => beadNode.countingObject.beadXPositionProperty.value );
      const shiftedXPositions = this.model.beadManager.shiftXPositions( beadXPositions, shiftDirection, extremePosition );
      beadNodes.forEach( ( beadNode, i ) => {
        beadNode.countingObject.beadXPositionProperty.value = shiftedXPositions[ i ];
      } );
    }
  }

  /**
   * Handle the movement of a bead and its neighbors when it is dragged.
   * @param newPosition - the proposed new position, in the global view coordinate frame.
   * @param grabbedBeadNode
   */
  private handleBeadMove( newPosition: Vector2, grabbedBeadNode: BeadNode ): void {
    let proposedParentPosition = grabbedBeadNode.globalToParentPoint( newPosition );

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
    if ( !this.ignoreBeadBounds ) {
      const minXOffset = draggingRight ? 0 : -( beadNodesToMove.length - 1 ) * BEAD_WIDTH;
      const maxXOffset = draggingRight ? -( beadNodesToMove.length - 1 ) * BEAD_WIDTH : 0;
      const dragBoundsWithMovingBeads = this.beadDragBounds.withOffsets( minXOffset, 0, maxXOffset, 0 );

      // Constrain the new position to the drag bounds and set the grabbed bead's updated position.
      proposedParentPosition = dragBoundsWithMovingBeads.closestPointTo( proposedParentPosition );
    }

    grabbedBeadNode.countingObject.beadXPositionProperty.value = BeadManager.BEAD_MODEL_VIEW_TRANSFORM.viewToModelX( proposedParentPosition.x );

    // Since beadNodesToMove was created above by slicing the sortedBeadNodeArray at the grabbedBead, we can
    // be confident that the first beadNode in the beadNodesToMove array is the grabbedBeadNode, and rely
    // on that assumption as we iterate over the array.
    assert && assert( beadNodesToMove[ 0 ] === grabbedBeadNode, 'The first bead in beadNodesToMove should be the grabbed bead' );

    beadNodesToMove.forEach( ( beadNode, i ) => {
      if ( beadNode !== grabbedBeadNode ) {

        // Move the beads in the drag direction and base their positions on the grabbed bead.
        beadNode.countingObject.beadXPositionProperty.value = BeadManager.BEAD_MODEL_VIEW_TRANSFORM.viewToModelX(
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
        this.moveBeadToRightAddend( beadNode, grabbedBeadNode );
      }
      else if ( beadNode.centerX < this.beadSeparatorCenterXProperty.value ||
                ( !draggingRight && beadNode.centerX === this.beadSeparatorCenterXProperty.value ) ) {
        this.moveBeadToLeftAddend( beadNode, grabbedBeadNode );
      }
    } );

    // After the separator has adjusted position with beads crossing over above, we need to also check if any beads
    // remain on the wrong side of the separator. If so, we need to move them to the correct side.
    while ( !this.beadsOnCorrectSide() ) {
      this.getSortedBeadNodes().forEach( beadNode => {
        const addendType = beadNode.countingObject.addendTypeProperty.value;
        if ( addendType === AddendType.LEFT && beadNode.centerX > this.beadSeparatorCenterXProperty.value ) {
          this.moveBeadToRightAddend( beadNode, grabbedBeadNode );
        }
        else if ( addendType === AddendType.RIGHT && beadNode.centerX < this.beadSeparatorCenterXProperty.value ) {
          this.moveBeadToLeftAddend( beadNode, grabbedBeadNode );
        }
      } );
    }

    // Once all the beads are moved confirm that any active beads on the wire are each the required minimum distance
    // apart to avoid overlap.
    activeBeadNodes.forEach( ( beadNode, i ) => {
      if ( i > 0 && !beadNode.countingObject.isDraggingProperty.value ) {
        const previousBeadNode = activeBeadNodes[ i - 1 ];
        const distance = Math.abs( beadNode.centerX - previousBeadNode.centerX );
        if ( distance < BEAD_WIDTH ) {
          const newPosition = draggingRight ? previousBeadNode.centerX + BEAD_WIDTH : previousBeadNode.centerX - BEAD_WIDTH;
          beadNode.countingObject.beadXPositionProperty.value = BeadManager.BEAD_MODEL_VIEW_TRANSFORM.viewToModelX( newPosition );
        }
      }
    } );

    // Update the proposed bead position if it does not match the grabbed bead's position.
    if ( this.model.groupSelectBeadsModel.isGroupItemKeyboardGrabbedProperty.value ) {
      this.keyboardProposedBeadPositionProperty.value.x !== grabbedBeadNode.countingObject.beadXPositionProperty.value &&
      this.keyboardProposedBeadPositionProperty.set( new Vector2( grabbedBeadNode.countingObject.beadXPositionProperty.value, 0 ) );
    }

    assert && assert( this.leftAddendCountingObjectsProperty.value.length === this.model.leftAddendProperty.value, 'leftAddendObjects.length should match leftAddendProperty' );
    assert && assert( this.rightAddendCountingObjectsProperty.value.length === this.model.rightAddendProperty.value, 'rightAddendObjects.length should match rightAddendProperty' );
  }

  /**
   *
   * @param startingBeadNode - The bead that is being dragged.
   * @param proposedXPosition - The proposed x position of the bead.
   * @param movingRight - Whether the beads are moving to the right or left.
   * @param sortedBeadNodes - Should be sorted in the order we want to traverse the beads in the function. This is most
   * likely related to whether the beads are movingRight or not
   *
   * This function will return all the beads that are touching the startingBeadNode.
   */
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
                                    proposedXPosition + BeadManager.BEAD_MODEL_VIEW_TRANSFORM.modelToViewDeltaX( proposedBeadsToMove.length ) >= beadNode.centerX :
                                    proposedXPosition - BeadManager.BEAD_MODEL_VIEW_TRANSFORM.modelToViewDeltaX( proposedBeadsToMove.length ) <= beadNode.centerX;

        // We want to only return beads that are the same addend type as the grabbed bead, and are touching the
        // grabbed bead without space in between, OR any moving bead is proposing to move past another bead no matter
        // what it's addend type is.
        ( ( addendMatch && touchingPreviousBead && !beadSpaceFound ) || newPositionPastBead ) && proposedBeadsToMove.push( beadNode );
      } );
    return proposedBeadsToMove;
  }

  /**
   * @param beadNode
   * @param grabbedBeadNode
   */
  private moveBeadToRightAddend( beadNode: BeadNode, grabbedBeadNode: BeadNode ): void {

    // Do not adjust the separator or move beads between addends if the bead is already in the proper observable array.
    if ( !this.rightAddendCountingObjectsProperty.value.includes( beadNode.countingObject ) && this.leftAddendCountingObjectsProperty.value.includes( beadNode.countingObject ) ) {

      // Since a bead is moving to the right, the separator should adjust one position to the left.
      this.beadSeparatorCenterXProperty.value = BeadManager.BEAD_MODEL_VIEW_TRANSFORM.modelToViewX(
        BeadManager.calculateBeadSeparatorXPosition( this.model.leftAddendProperty.value - 1 ) );

      // Add the bead to the right addend first to avoid duplicate work being done when the left addend value is
      // updated in the ObservableArray.lengthProperty listener.
      beadNode.countingObject.traverseInactiveObjects = false;
      this.rightAddendCountingObjectsProperty.value.add( beadNode.countingObject );
      this.leftAddendCountingObjectsProperty.value.remove( beadNode.countingObject );
      beadNode.countingObject.traverseInactiveObjects = true;

      // As the bead moves past the separator recalculate if other beads now need to move to accommodate.
      if ( beadNode !== grabbedBeadNode ) {
        const xPosition = Math.max( beadNode.centerX, this.beadSeparatorCenterXProperty.value + SEPARATOR_BUFFER );
        this.getBeadsToMove( beadNode, xPosition, true, this.getSortedBeadNodes() ).filter( bead => bead !== grabbedBeadNode ).forEach( ( beadNode, i ) => {
          beadNode.countingObject.beadXPositionProperty.value = BeadManager.BEAD_MODEL_VIEW_TRANSFORM.viewToModelX( xPosition + i * BEAD_WIDTH );
        } );
      }
    }
  }

  /**
   * @param beadNode
   * @param grabbedBeadNode
   */
  private moveBeadToLeftAddend( beadNode: BeadNode, grabbedBeadNode: BeadNode ): void {

    // Do not adjust the separator or move beads between addends if the bead is already in the proper observable array.
    if ( !this.leftAddendCountingObjectsProperty.value.includes( beadNode.countingObject ) && this.rightAddendCountingObjectsProperty.value.includes( beadNode.countingObject ) ) {

      // Since a bead is moving to the left, the separator should adjust one position to the right.
      this.beadSeparatorCenterXProperty.value = BeadManager.BEAD_MODEL_VIEW_TRANSFORM.modelToViewX(
        BeadManager.calculateBeadSeparatorXPosition( this.model.leftAddendProperty.value + 1 ) );

      // Remove the bead from the right addend first to avoid duplicate work being done when the left addend value is
      // updated in the ObservableArray.lengthProperty listener.
      beadNode.countingObject.traverseInactiveObjects = false;
      this.rightAddendCountingObjectsProperty.value.remove( beadNode.countingObject );
      this.leftAddendCountingObjectsProperty.value.add( beadNode.countingObject );
      beadNode.countingObject.traverseInactiveObjects = true;

      // As the bead moves past the separator recalculate if other beads now need to move to accommodate.
      if ( beadNode !== grabbedBeadNode ) {
        const xPosition = Math.min( beadNode.centerX, this.beadSeparatorCenterXProperty.value - SEPARATOR_BUFFER );
        this.getBeadsToMove( beadNode, xPosition, false, this.getSortedBeadNodes().reverse() ).filter( bead => bead !== grabbedBeadNode ).forEach( ( beadNode, i ) => {
          beadNode.countingObject.beadXPositionProperty.value = BeadManager.BEAD_MODEL_VIEW_TRANSFORM.viewToModelX( xPosition - i * BEAD_WIDTH );
        } );
      }
    }
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
   * Check if all beads are on the correct side of the separator according to their addend type.
   */
  private beadsOnCorrectSide(): boolean {
    const separatorXPosition = this.beadSeparatorCenterXProperty.value;
    return this.getSortedBeadNodes().every( beadNode => {
      const addendType = beadNode.countingObject.addendTypeProperty.value;
      assert && assert( addendType !== AddendType.INACTIVE, 'Addend type should not be inactive' );
      return addendType === AddendType.LEFT ? beadNode.centerX <= separatorXPosition : beadNode.centerX >= separatorXPosition;
    } );
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