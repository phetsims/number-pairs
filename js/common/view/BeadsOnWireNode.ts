// Copyright 2024, University of Colorado Boulder

/**
 * Beads are arranged in two groups, one for each addend. All the beads are lined up on a "wire" and can be dragged
 * to either the left or right of the separator. Because the beads are on a wire, when you drag one bead any bead it
 * touches in the direction of the drag will move with it. The number of beads in each group is determined by the
 * addend values. The number of visible beads is determined by the total value.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Circle, LinearGradient, Node, NodeOptions, Path, Rectangle } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import Multilink from '../../../../axon/js/Multilink.js';
import BeadNode from './BeadNode.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Range from '../../../../dot/js/Range.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Property from '../../../../axon/js/Property.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import NumberPairsColors from '../NumberPairsColors.js';
import { Shape } from '../../../../kite/js/imports.js';

const BEAD_WIDTH = BeadNode.BEAD_WIDTH;
const WIRE_HEIGHT = 5;
type SelfOptions = {
  sceneRange: Range;
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
      excludeInvisibleChildrenFromBounds: true
    }, providedOptions );

    super( options );

    this.modelViewTransform = modelViewTransform;
    this.beadSeparatorCenterXProperty = beadSeparatorCenterXProperty;
    this.beadDragBounds = wire.bounds.erodedX( BEAD_WIDTH );
    this.rightAddendCountingObjectsProperty = model.rightAddendCountingObjectsProperty;
    this.leftAddendCountingObjectsProperty = model.leftAddendCountingObjectsProperty;
    this.numberOfSpotsOnWire = numberOfSpotsOnWire;

    model.countingObjects.forEach( ( countingObject, i ) => {
      const beadNode = new BeadNode(
        countingObject,
        {
          tandem: providedOptions.tandem.createTandem( `beadNode${i}` ),
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
          }
        } );

      countingObject.beadXPositionProperty.link( x => {
        beadNode.center = new Vector2( modelViewTransform.modelToViewX( x ), 0 );
      } );

      this.beadModelToNodeMap.set( countingObject, beadNode );
      this.addChild( beadNode );
    } );

    // TODO: When we add beads to the wire they should not snap.
    Multilink.multilink( [
      model.leftAddendProperty,
      model.rightAddendProperty
    ], ( leftAddend, rightAddend ) => {
      if ( !this.beadDragging ) {
        this.beadSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX( NumberPairsModel.calculateBeadSeparatorXPosition( leftAddend ) );
        this.positionBeadsOnWire();
      }
    } );

    // Whenever the positions of a bead change and the bead is not being dragged, update the beadXPositionsProperty.
    const beadPositionDependencies = model.countingObjects.map( countingObject => countingObject.beadXPositionProperty );
    Multilink.multilinkAny( beadPositionDependencies, () => {
      if ( !this.beadDragging ) {
        model.beadXPositionsProperty.value = model.countingObjects.map( countingObject => countingObject.beadXPositionProperty.value );
      }
    } );
  }

  //TODO Delete getBeadNodes if it is still unused.
  private getBeadNodes( countingObjects: CountingObject[] ): BeadNode[] {
    return countingObjects.map( countingObject => this.beadModelToNodeMap.get( countingObject )! );
  }

  private positionBeadsOnWire(): void {
    const beadSeparatorXPosition = NumberPairsModel.calculateBeadSeparatorXPosition( this.model.leftAddendProperty.value );
    const leftAddendBeads = this.leftAddendCountingObjectsProperty.value;
    const rightAddendBeads = this.rightAddendCountingObjectsProperty.value;

    leftAddendBeads.forEach( ( bead, i ) => {
      bead.beadXPositionProperty.value = beadSeparatorXPosition - i - 1;
    } );
    rightAddendBeads.forEach( ( bead, i ) => {
      bead.beadXPositionProperty.value = i + beadSeparatorXPosition + 1;
    } );
  }

  /**
   * Handle the movement of a bead and its neighbors when it is dragged.
   * @param newPosition
   * @param grabbedBeadNode
   */
  private handleBeadMove( newPosition: Vector2, grabbedBeadNode: BeadNode ): void {

    // Determine whether we are dragging the bead to the right or left along the wire.
    const draggingRight = Math.sign( newPosition.x - grabbedBeadNode.parentToGlobalPoint( grabbedBeadNode.bounds.center ).x ) > 0;

    // Sort all active beads by their x position, and reverse if we are dragging towards the left.
    const beadNodes = [ ...this.beadModelToNodeMap.values() ];
    const activeBeadNodes = beadNodes.filter( beadNode => beadNode.model.addendTypeProperty.value !== AddendType.INACTIVE )
      .sort( ( a, b ) => a.centerX - b.centerX );
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
        // TODO: take into consideration if the grabbed bead has moved past a bead. In that case it also needs to move.
        const touchingPreviousBead = i === 0 || Math.abs( beadNode.centerX - slicedBeadNodes[ i - 1 ].centerX ) <= BEAD_WIDTH;
        if ( !touchingPreviousBead ) {
          beadSpaceFound = true;
        }
        return addendMatch && touchingPreviousBead && !beadSpaceFound;
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
    const newCenterX = dragBoundsWithMovingBeads.closestPointTo( grabbedBeadNode.globalToParentPoint( newPosition ) ).x;
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