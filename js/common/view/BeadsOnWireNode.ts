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

type SelfOptions = {
  sceneRange: Range;
};

const LEFT_MOST_BEAD_X = 1;
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
  private sceneRange: Range;

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
        {
          opacity: 0.8,
          tandem: providedOptions.tandem.createTandem( `cubeNode${i}` ),
          onDrop: () => {
            this.beadDragging = false;
          },
          onDrag: ( pointerPoint: Vector2, cubeNode: BeadNode ) => {
            this.beadDragging = true;
            this.handleBeadMove( pointerPoint, cubeNode );
          }
        } );
      this.beadModelToNodeMap.set( countingObject, beadNode );
    } );

    // TODO: When we add cubes to the wire they should not snap.
    Multilink.multilink( [
      model.leftAddendProperty,
      model.rightAddendProperty
    ], ( leftAddend, rightAddend ) => {
      if ( !this.beadDragging ) {
        this.beadSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX( calculateBeadSeparatorPlacement( leftAddend ) );
        this.positionBeadsOnWire();
      }
    } );

    this.beadModelToNodeMap.forEach( cube => {
      this.addChild( cube );
    } );

    this.sceneRange = options.sceneRange;
  }

  private getBeadNodes( countingObjects: CountingObject[] ): BeadNode[] {
    return countingObjects.map( countingObject => this.beadModelToNodeMap.get( countingObject )! );
  }

  private positionBeadsOnWire(): void {
    const beadSeparatorPlacement = calculateBeadSeparatorPlacement( this.model.leftAddendProperty.value );
    const leftAddendBeads = this.getBeadNodes( this.leftAddendCountingObjectsProperty.value );
    const rightAddendBeads = this.getBeadNodes( this.rightAddendCountingObjectsProperty.value );

    leftAddendBeads.forEach( ( bead, i ) => {
      bead.center = new Vector2( this.modelViewTransform.modelToViewX( i + LEFT_MOST_BEAD_X ), 0 );
    } );
    rightAddendBeads.forEach( ( bead, i ) => {
      bead.center = new Vector2( this.modelViewTransform.modelToViewX( i + beadSeparatorPlacement + 1 ), 0 );
    } );
  }

  /**
   * Snap the cubes to their positions on the wire based on the addend values. By default, the cubes are arranged in
   * groups of 5 with a separator between the two addends.
   */
  private organizeInGroupsOfFive(): void {
    const leftAddend = this.model.leftAddendProperty.value;
    const leftAddendCubes = this.getBeadNodes( this.leftAddendCountingObjectsProperty.value );
    const rightAddendCubes = this.getBeadNodes( this.rightAddendCountingObjectsProperty.value );

    // Cubes should be lined up on the wire in groups of 5.
    leftAddendCubes.forEach( ( cube, i ) => {
      const placeOnWire = Math.floor( i / 5 ) + i + LEFT_MOST_BEAD_X;
      cube.center = new Vector2( this.modelViewTransform.modelToViewX( placeOnWire ), 0 );
    } );

    const cubeSeparatorPlaceOnWire = calculateBeadSeparatorPlacement( leftAddend );
    this.beadSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX( cubeSeparatorPlaceOnWire );
    rightAddendCubes.forEach( ( cube, i ) => {
      const placeOnWire = Math.floor( i / 5 ) + i + cubeSeparatorPlaceOnWire + 1;
      cube.center = new Vector2( this.modelViewTransform.modelToViewX( placeOnWire ), 0 );
    } );
  }

  /**
   * Handle the movement of a cube and its neighbors when it is dragged.
   * @param newPosition
   * @param grabbedCube
   */
  private handleBeadMove( newPosition: Vector2, grabbedCube: BeadNode ): void {

    // Determine whether we are dragging the cube to the right or left along the wire.
    const draggingRight = Math.sign( newPosition.x - grabbedCube.parentToGlobalPoint( grabbedCube.bounds.center ).x ) > 0;

    // Sort all active cubes by their x position, and reverse if we are dragging towards the left.
    const beadNodes = [ ...this.beadModelToNodeMap.values() ];
    const activeBeads = beadNodes.filter( cube => cube.model.addendTypeProperty.value !== AddendType.INACTIVE )
      .sort( ( a, b ) => a.centerX - b.centerX );
    const sortedBeads = draggingRight ? activeBeads : activeBeads.reverse();

    // Now that the cubes are sorted in the proper direction we can determine which cubes need to be moved based
    // on the index of the grabbed cube and their proximity to each other.
    const grabbedCubeIndex = sortedBeads.indexOf( grabbedCube );
    let cubeSpaceFound = false;
    const slicedCubes = sortedBeads.slice( grabbedCubeIndex, sortedBeads.length + 1 );
    const cubesToMove = slicedCubes.filter(
      ( cube, i ) => {
        const addendMatch: boolean = cube.model.addendTypeProperty.value === grabbedCube.model.addendTypeProperty.value;
        const touchingPreviousCube = i === 0 || Math.abs( cube.centerX - slicedCubes[ i - 1 ].centerX ) <= BEAD_WIDTH;
        if ( !touchingPreviousCube ) {
          cubeSpaceFound = true;
        }
        return addendMatch && touchingPreviousCube && !cubeSpaceFound;
      } );

    // Calculate the distance the grabbed cube has moved and constrain the movement so that it does not exit
    // the drag bounds.
    const oldCenterX = grabbedCube.centerX;
    const minXOffset = draggingRight ? 0 : -( slicedCubes.length - 1 ) * BEAD_WIDTH;
    const maxXOffset = draggingRight ? -( slicedCubes.length - 1 ) * BEAD_WIDTH : 0;
    const dragBoundsWithMovingCubes = this.beadDragBounds.withOffsets( minXOffset, 0, maxXOffset, 0 );
    const newCenterX = dragBoundsWithMovingCubes.closestPointTo( grabbedCube.globalToParentPoint( newPosition ) ).x;
    const deltaX = newCenterX - oldCenterX;
    grabbedCube.centerX = newCenterX;

    cubesToMove.forEach( cube => {

      if ( cube !== grabbedCube ) {
        cube.centerX += deltaX;
      }
      if ( cube.centerX > this.beadSeparatorCenterXProperty.value ) {
        if ( !this.rightAddendCountingObjectsProperty.value.includes( cube.model ) && this.leftAddendCountingObjectsProperty.value.includes( cube.model ) ) {

          // Since a cube is moving to the right, the separator should adjust one position to the left.
          this.beadSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX(
            calculateBeadSeparatorPlacement( this.model.leftAddendProperty.value - 1 ) );

          // Add the cube to the right addend first to avoid duplicate work being done when the left addend value is
          // updated in the ObservableArray.lengthProperty listener.
          cube.model.traverseInactiveObjects = false;
          this.rightAddendCountingObjectsProperty.value.add( cube.model );
          this.leftAddendCountingObjectsProperty.value.remove( cube.model );
          cube.model.traverseInactiveObjects = true;

          // Immediately move the cubes past the separator
          cube.centerX = Math.max( cube.centerX, this.beadSeparatorCenterXProperty.value + BEAD_WIDTH * 1.5 );
        }
      }
      if ( cube.centerX < this.beadSeparatorCenterXProperty.value ) {
        if ( !this.leftAddendCountingObjectsProperty.value.includes( cube.model ) && this.rightAddendCountingObjectsProperty.value.includes( cube.model ) ) {
          // Since a cube is moving to the left, the separator should adjust one position to the right.
          this.beadSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX(
            calculateBeadSeparatorPlacement( this.model.leftAddendProperty.value + 1 ) );

          // Remove the cube from the right addend first to avoid duplicate work being done when the left addend value is
          // updated in the ObservableArray.lengthProperty listener.
          cube.model.traverseInactiveObjects = false;
          this.rightAddendCountingObjectsProperty.value.remove( cube.model );
          this.leftAddendCountingObjectsProperty.value.add( cube.model );
          cube.model.traverseInactiveObjects = true;

          // Immediately move the cubes past the separator
          cube.centerX = Math.min( cube.centerX, this.beadSeparatorCenterXProperty.value - BEAD_WIDTH * 1.5 );
        }
      }
    } );

    // Once all the beads are moved confirm that any active beads on the wire  are each the required minimum distance
    // apart to avoid overlap.
    // TODO: this needs to be more sophisticated
    // activeBeads.forEach( ( cube, i ) => {
    //   if ( i > 0 && !cube.model.draggingProperty.value ) {
    //     const previousCube = activeBeads[ i - 1 ];
    //     const distance = Math.abs( cube.centerX - previousCube.centerX );
    //     if ( distance < BEAD_WIDTH ) {
    //       cube.centerX = previousCube.centerX + BEAD_WIDTH;
    //     }
    //   }
    // } );

    // Once all the cubes are moved confirm that their centers are each the required minimum distance apart to avoid
    // overlap.
    cubesToMove.forEach( ( cube, i ) => {
      if ( i > 0 ) {
        const previousCube = cubesToMove[ i - 1 ];
        const distance = Math.abs( cube.centerX - previousCube.centerX );
        if ( distance < BEAD_WIDTH ) {
          cube.centerX = draggingRight ? previousCube.centerX + BEAD_WIDTH
                                       : previousCube.centerX - BEAD_WIDTH;
        }
      }
    } );

    assert && assert( this.leftAddendCountingObjectsProperty.value.length === this.model.leftAddendProperty.value, 'leftAddendObjects.length should match leftAddendNumberProperty' );
    assert && assert( this.rightAddendCountingObjectsProperty.value.length === this.model.rightAddendProperty.value, 'rightAddendObjects.length should match rightAddendNumberProperty' );
  }


}

function calculateBeadSeparatorPlacement( leftAddendValue: number ): number {
  const startingPosition = 12; // empirically determined;;
  return leftAddendValue / 2.5 + startingPosition;
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