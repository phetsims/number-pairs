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

import { Circle, Line, Node, NodeOptions, Path, PathOptions } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import Multilink from '../../../../axon/js/Multilink.js';
import BeadNode, { BEAD_WIDTH } from './BeadNode.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Range from '../../../../dot/js/Range.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Property from '../../../../axon/js/Property.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { Shape } from '../../../../kite/js/imports.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import NumberPairsConstants from '../NumberPairsConstants.js';

type SelfOptions = {
  sceneRange: Range;
};

const LEFT_MOST_BEAD_X = NumberPairsConstants.LEFT_MOST_BEAD_X;
const END_CAP_RADIUS = 10;

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

  public constructor(
    private readonly model: NumberPairsModel,
    countingAreaBounds: Bounds2,
    providedOptions: BeadsOnWireNodeOptions
  ) {
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleMapping(
      new Vector2( 0, 0 ),
      new Vector2( BEAD_WIDTH / 2, 0 ),
      BEAD_WIDTH
    );
    const wire = new Line( 0, 0, countingAreaBounds.width, 0, {
      lineWidth: 2,
      stroke: 'black'
    } );

    const wireMinXEndCap = new WireEndCap( true, {
      left: wire.left,
      centerY: wire.centerY
    } );
    const wireMaxXEndCap = new WireEndCap( false, {
      right: wire.right,
      centerY: wire.centerY
    } );

    const beadSeparatorCenterXProperty = new NumberProperty( 0, {
      tandem: providedOptions.tandem.createTandem( 'beadSeparatorCenterXProperty' ),
      phetioReadOnly: true
    } );
    const beadSeparator = new Circle( 5, {
      fill: 'black'
    } );
    beadSeparatorCenterXProperty.link( x => { beadSeparator.centerX = x; } );

    const options = optionize<BeadsOnWireNodeOptions, SelfOptions, NodeOptions>()( {
      children: [ wire, beadSeparator, wireMinXEndCap, wireMaxXEndCap ]
    }, providedOptions );
    super( options );
    this.modelViewTransform = modelViewTransform;
    this.beadSeparatorCenterXProperty = beadSeparatorCenterXProperty;
    this.beadDragBounds = wire.bounds.dilatedX( -BEAD_WIDTH );
    this.rightAddendCountingObjectsProperty = model.rightAddendCountingObjectsProperty;
    this.leftAddendCountingObjectsProperty = model.leftAddendCountingObjectsProperty;

    model.countingObjects.forEach( ( countingObject, i ) => {
      const beadNode = new BeadNode(
        countingObject,
        this.modelViewTransform,
        {
          opacity: 0.8,
          tandem: providedOptions.tandem.createTandem( `beadNode${i}` ),
          onDrop: () => {
            this.beadDragging = false;
          },
          onDrag: ( pointerPoint: Vector2, beadNode: BeadNode ) => {
            this.beadDragging = true;
            this.handleBeadMove( pointerPoint, beadNode );
          }
        } );

      countingObject.beadXPositionProperty.link( x => {
        beadNode.center = new Vector2( modelViewTransform.modelToViewX( x ), 0 );
      } );
      this.beadModelToNodeMap.set( countingObject, beadNode );
    } );

    // TODO: When we add cubes to the wire they should not snap.
    Multilink.multilink( [
      model.leftAddendProperty,
      model.rightAddendProperty
    ], ( leftAddend, rightAddend ) => {
      if ( !this.beadDragging ) {
        this.beadSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX( NumberPairsModel.calculateBeadSeparatorPlacement( leftAddend ) );
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

    this.beadModelToNodeMap.forEach( bead => {
      this.addChild( bead );
    } );
  }

  private getBeadNodes( countingObjects: CountingObject[] ): BeadNode[] {
    return countingObjects.map( countingObject => this.beadModelToNodeMap.get( countingObject )! );
  }

  private positionBeadsOnWire(): void {
    const beadSeparatorPlacement = NumberPairsModel.calculateBeadSeparatorPlacement( this.model.leftAddendProperty.value );
    const leftAddendBeads = this.leftAddendCountingObjectsProperty.value;
    const rightAddendBeads = this.rightAddendCountingObjectsProperty.value;

    leftAddendBeads.forEach( ( bead, i ) => {
      bead.beadXPositionProperty.value = i + LEFT_MOST_BEAD_X;
    } );
    rightAddendBeads.forEach( ( bead, i ) => {
      bead.beadXPositionProperty.value = i + beadSeparatorPlacement + 1;
    } );
  }

  /**
   * Handle the movement of a cube and its neighbors when it is dragged.
   * @param newPosition
   * @param grabbedBead
   */
  private handleBeadMove( newPosition: Vector2, grabbedBead: BeadNode ): void {

    // Determine whether we are dragging the cube to the right or left along the wire.
    const draggingRight = Math.sign( newPosition.x - grabbedBead.parentToGlobalPoint( grabbedBead.bounds.center ).x ) > 0;

    // Sort all active cubes by their x position, and reverse if we are dragging towards the left.
    const beadNodes = [ ...this.beadModelToNodeMap.values() ];
    const activeBeads = beadNodes.filter( cube => cube.model.addendTypeProperty.value !== AddendType.INACTIVE )
      .sort( ( a, b ) => a.centerX - b.centerX );
    const sortedBeads = draggingRight ? activeBeads : activeBeads.reverse();

    // Now that the cubes are sorted in the proper direction we can determine which cubes need to be moved based
    // on the index of the grabbed cube and their proximity to each other.
    const grabbedBeadIndex = sortedBeads.indexOf( grabbedBead );
    let beadSpaceFound = false;
    const slicedBeads = sortedBeads.slice( grabbedBeadIndex, sortedBeads.length + 1 );
    const beadsToMove = slicedBeads.filter(
      ( bead, i ) => {
        const addendMatch: boolean = bead.model.addendTypeProperty.value === grabbedBead.model.addendTypeProperty.value;
        const touchingPreviousCube = i === 0 || Math.abs( bead.centerX - slicedBeads[ i - 1 ].centerX ) <= BEAD_WIDTH;
        if ( !touchingPreviousCube ) {
          beadSpaceFound = true;
        }
        return addendMatch && touchingPreviousCube && !beadSpaceFound;
      } );

    // Calculate the distance the grabbed cube has moved and constrain the movement so that it does not exit
    // the drag bounds.
    const oldCenterX = grabbedBead.centerX;
    const minXOffset = draggingRight ? 0 : -( slicedBeads.length - 1 ) * BEAD_WIDTH;
    const maxXOffset = draggingRight ? -( slicedBeads.length - 1 ) * BEAD_WIDTH : 0;
    const dragBoundsWithMovingCubes = this.beadDragBounds.withOffsets( minXOffset, 0, maxXOffset, 0 );
    const newCenterX = dragBoundsWithMovingCubes.closestPointTo( grabbedBead.globalToParentPoint( newPosition ) ).x;
    const deltaX = newCenterX - oldCenterX;
    grabbedBead.model.beadXPositionProperty.value = this.modelViewTransform.viewToModelX( newCenterX );

    beadsToMove.forEach( bead => {

      if ( bead !== grabbedBead ) {
        bead.model.beadXPositionProperty.value = this.modelViewTransform.viewToModelX( bead.centerX + deltaX );
      }
      if ( bead.centerX > this.beadSeparatorCenterXProperty.value ) {
        if ( !this.rightAddendCountingObjectsProperty.value.includes( bead.model ) && this.leftAddendCountingObjectsProperty.value.includes( bead.model ) ) {

          // Since a bead is moving to the right, the separator should adjust one position to the left.
          this.beadSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX(
            NumberPairsModel.calculateBeadSeparatorPlacement( this.model.leftAddendProperty.value - 1 ) );

          // Add the bead to the right addend first to avoid duplicate work being done when the left addend value is
          // updated in the ObservableArray.lengthProperty listener.
          bead.model.traverseInactiveObjects = false;
          this.rightAddendCountingObjectsProperty.value.add( bead.model );
          this.leftAddendCountingObjectsProperty.value.remove( bead.model );
          bead.model.traverseInactiveObjects = true;

          // Immediately move the cubes past the separator
          bead.model.beadXPositionProperty.value = this.modelViewTransform.viewToModelX( Math.max( bead.centerX, this.beadSeparatorCenterXProperty.value + BEAD_WIDTH * 1.5 ) );
        }
      }
      if ( bead.centerX < this.beadSeparatorCenterXProperty.value ) {
        if ( !this.leftAddendCountingObjectsProperty.value.includes( bead.model ) && this.rightAddendCountingObjectsProperty.value.includes( bead.model ) ) {
          // Since a bead is moving to the left, the separator should adjust one position to the right.
          this.beadSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX(
            NumberPairsModel.calculateBeadSeparatorPlacement( this.model.leftAddendProperty.value + 1 ) );

          // Remove the bead from the right addend first to avoid duplicate work being done when the left addend value is
          // updated in the ObservableArray.lengthProperty listener.
          bead.model.traverseInactiveObjects = false;
          this.rightAddendCountingObjectsProperty.value.remove( bead.model );
          this.leftAddendCountingObjectsProperty.value.add( bead.model );
          bead.model.traverseInactiveObjects = true;

          // Immediately move the cubes past the separator
          bead.model.beadXPositionProperty.value = this.modelViewTransform.viewToModelX( Math.min( bead.centerX, this.beadSeparatorCenterXProperty.value - BEAD_WIDTH * 1.5 ) );
        }
      }
    } );

    // Once all the beads are moved confirm that any active beads on the wire are each the required minimum distance
    // apart to avoid overlap.
    activeBeads.forEach( ( cube, i ) => {
      if ( i > 0 && !cube.model.draggingProperty.value ) {
        const previousCube = activeBeads[ i - 1 ];
        const distance = Math.abs( cube.centerX - previousCube.centerX );
        if ( distance < BEAD_WIDTH ) {
          const newPosition = draggingRight ? previousCube.centerX + BEAD_WIDTH : previousCube.centerX - BEAD_WIDTH;
          cube.model.beadXPositionProperty.value = this.modelViewTransform.viewToModelX( newPosition );
        }
      }
    } );

    assert && assert( this.leftAddendCountingObjectsProperty.value.length === this.model.leftAddendProperty.value, 'leftAddendObjects.length should match leftAddendNumberProperty' );
    assert && assert( this.rightAddendCountingObjectsProperty.value.length === this.model.rightAddendProperty.value, 'rightAddendObjects.length should match rightAddendNumberProperty' );
  }
}

class WireEndCap extends Path {
  public constructor( minXEndCap: boolean, providedOptions: PathOptions ) {
    const endCapShape = new Shape()
      .arc( 0, END_CAP_RADIUS / 2, END_CAP_RADIUS, Math.PI / 2, 1.5 * Math.PI, minXEndCap ).lineTo( 0, 0 );

    const options = combineOptions<PathOptions>( {
      fill: 'black'
    }, providedOptions );
    super( endCapShape, options );
  }
}

numberPairs.register( 'BeadsOnWireNode', BeadsOnWireNode );