// Copyright 2024, University of Colorado Boulder

/**
 * Cubes are arranged in two groups, one for each addend. All the cubes are lined up on a "wire" and can be dragged
 * to either the left or right of the separator. Because the cubes are on a wire, when you drag one cube any cube it
 * touches in the direction of the drag will move with it. The number of cubes in each group is determined by the
 * addend values. The number of visible cubes is determined by the total value.
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
import CubeNode, { CUBE_WIDTH } from './CubeNode.js';
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

const CUBE_OVERLAP = 6;
const LEFT_MOST_CUBE_X = 1;
const END_CAP_RADIUS = 10;

type CubesOnWireNodeOptions = StrictOmit<NodeOptions, 'children'> & SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class CubesOnWireNode extends Node {

  private readonly cubeModelToNodeMap = new Map<CountingObject, CubeNode>();
  private readonly modelViewTransform: ModelViewTransform2;

  // Convenience Property
  private readonly cubeSeparatorCenterXProperty: Property<number>;
  private readonly cubeDragBounds: Bounds2;

  private readonly leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  private readonly rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;

  private cubeDragging = false;

  public constructor(
    private readonly model: NumberPairsModel,
    countingAreaBounds: Bounds2,
    providedOptions: CubesOnWireNodeOptions
  ) {
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleMapping(
      new Vector2( 0, 0 ),
      new Vector2( CUBE_WIDTH, 0 ),
      CUBE_WIDTH - CUBE_OVERLAP
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

    const cubeSeparatorCenterXProperty = new NumberProperty( 0, {
      tandem: providedOptions.tandem.createTandem( 'cubeSeparatorCenterXProperty' ),
      phetioReadOnly: true
    } );
    const cubeSeparator = new Circle( 5, {
      fill: 'black'
    } );
    cubeSeparatorCenterXProperty.link( x => { cubeSeparator.centerX = x; } );

    const options = optionize<CubesOnWireNodeOptions, SelfOptions, NodeOptions>()( {
      children: [ wire, cubeSeparator, wireMinXEndCap, wireMaxXEndCap ]
    }, providedOptions );
    super( options );
    this.modelViewTransform = modelViewTransform;
    this.cubeSeparatorCenterXProperty = cubeSeparatorCenterXProperty;
    this.cubeDragBounds = wire.bounds.dilatedX( -CUBE_WIDTH );
    this.rightAddendCountingObjectsProperty = model.rightAddendCountingObjectsProperty;
    this.leftAddendCountingObjectsProperty = model.leftAddendCountingObjectsProperty;

    model.countingObjects.forEach( ( countingObject, i ) => {
      const cubeNode = new CubeNode(
        countingObject,
        {
          tandem: providedOptions.tandem.createTandem( `cubeNode${i}` ),
          onDrop: () => {
            this.cubeDragging = false;
          },
          onDrag: ( pointerPoint: Vector2, cubeNode: CubeNode ) => {
            this.cubeDragging = true;
            this.handleCubeMove( pointerPoint, cubeNode );
          }
        } );
      this.cubeModelToNodeMap.set( countingObject, cubeNode );
    } );

    // TODO: When we add cubes to the wire they should not snap. They should be placed in random spots
    Multilink.multilink( [
      model.leftAddendProperty,
      model.rightAddendProperty,
      model.totalProperty,
      model.leftAddendCountingObjectsProperty,
      model.rightAddendCountingObjectsProperty
    ], () => {
      !this.cubeDragging && this.snapCubesToPositions();
    } );

    this.cubeModelToNodeMap.forEach( cube => {
      this.addChild( cube );
    } );
  }

  /**
   * Snap the cubes to their positions on the wire based on the addend values. By default, the cubes are arranged in
   * groups of 5 with a separator between the two addends.
   */
  private snapCubesToPositions(): void {
    const leftAddend = this.model.leftAddendProperty.value;
    const leftAddendCubes = this.leftAddendCountingObjectsProperty.value
      .map( countingObject => this.cubeModelToNodeMap.get( countingObject )! );
    const rightAddendCubes = this.rightAddendCountingObjectsProperty.value
      .map( countingObject => this.cubeModelToNodeMap.get( countingObject )! );

    // Cubes should be lined up on the wire in groups of 5.
    leftAddendCubes.forEach( ( cube, i ) => {
      const placeOnWire = Math.floor( i / 5 ) + i + LEFT_MOST_CUBE_X;
      cube.center = new Vector2( this.modelViewTransform.modelToViewX( placeOnWire ), 0 );
      cube.moveToFront();
    } );

    const cubeSeparatorPlaceOnWire = calculateCubeSeparatorPlacement( leftAddend );
    this.cubeSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX( cubeSeparatorPlaceOnWire );
    rightAddendCubes.forEach( ( cube, i ) => {
      const placeOnWire = Math.floor( i / 5 ) + i + cubeSeparatorPlaceOnWire + 1;
      cube.center = new Vector2( this.modelViewTransform.modelToViewX( placeOnWire ), 0 );
      cube.moveToFront();
    } );
  }

  /**
   * Handle the movement of a cube and its neighbors when it is dragged.
   * @param newPosition
   * @param grabbedCube
   */
  private handleCubeMove( newPosition: Vector2, grabbedCube: CubeNode ): void {

    // Determine whether we are dragging the cube to the right or left along the wire.
    const draggingRight = Math.sign( newPosition.x - grabbedCube.parentToGlobalPoint( grabbedCube.bounds.center ).x ) > 0;

    // Sort all active cubes by their x position, and reverse if we are dragging towards the left.
    const cubeNodes = [ ...this.cubeModelToNodeMap.values() ];
    const activeCubes = cubeNodes.filter( cube => cube.model.addendTypeProperty.value !== AddendType.INACTIVE )
      .sort( ( a, b ) => a.centerX - b.centerX );
    const sortedCubes = draggingRight ? activeCubes : activeCubes.reverse();

    // Now that the cubes are sorted in the proper direction we can determine which cubes need to be moved based
    // on the index of the grabbed cube and their proximity to each other.
    const grabbedCubeIndex = sortedCubes.indexOf( grabbedCube );
    let cubeSpaceFound = false;
    const slicedCubes = sortedCubes.slice( grabbedCubeIndex, sortedCubes.length + 1 );
    const cubesToMove = slicedCubes.filter(
      ( cube, i ) => {
        const addendMatch: boolean = cube.model.addendTypeProperty.value === grabbedCube.model.addendTypeProperty.value;
        const touchingPreviousCube = i === 0 || Math.abs( cube.centerX - slicedCubes[ i - 1 ].centerX ) <= CUBE_WIDTH;
        if ( !touchingPreviousCube ) {
          cubeSpaceFound = true;
        }
        return addendMatch && touchingPreviousCube && !cubeSpaceFound;
      } );

    // Calculate the distance the grabbed cube has moved and constrain the movement so that it does not exit
    // the drag bounds.
    const oldCenterX = grabbedCube.centerX;
    const dragBoundsWithMovingCubes = this.cubeDragBounds.dilatedX( -( CUBE_WIDTH - CUBE_OVERLAP ) * ( cubesToMove.length - 1 ) );
    const newCenterX = dragBoundsWithMovingCubes.closestPointTo( grabbedCube.globalToParentPoint( newPosition ) ).x;
    const deltaX = newCenterX - oldCenterX;
    grabbedCube.centerX = newCenterX;

    cubesToMove.forEach( cube => {

      if ( cube !== grabbedCube ) {
        cube.centerX += deltaX;
      }
      if ( cube.centerX > this.cubeSeparatorCenterXProperty.value ) {
        if ( !this.rightAddendCountingObjectsProperty.value.includes( cube.model ) && this.leftAddendCountingObjectsProperty.value.includes( cube.model ) ) {

          // Since a cube is moving to the right, the separator should adjust one position to the left.
          this.cubeSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX( calculateCubeSeparatorPlacement( this.model.leftAddendProperty.value - 1 ) );

          // Add the cube to the right addend first to avoid duplicate work being done when the left addend value is
          // updated in the ObservableArray.lengthProperty listener.
          cube.model.traverseInactiveObjects = false;
          this.rightAddendCountingObjectsProperty.value.add( cube.model );
          this.leftAddendCountingObjectsProperty.value.remove( cube.model );
          cube.model.traverseInactiveObjects = true;
        }
      }
      if ( cube.centerX < this.cubeSeparatorCenterXProperty.value ) {
        if ( !this.leftAddendCountingObjectsProperty.value.includes( cube.model ) && this.rightAddendCountingObjectsProperty.value.includes( cube.model ) ) {
          // Since a cube is moving to the left, the separator should adjust one position to the right.
          this.cubeSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX( calculateCubeSeparatorPlacement( this.model.leftAddendProperty.value + 1 ) );

          // Remove the cube from the right addend first to avoid duplicate work being done when the left addend value is
          // updated in the ObservableArray.lengthProperty listener.
          cube.model.traverseInactiveObjects = false;
          this.rightAddendCountingObjectsProperty.value.remove( cube.model );
          this.leftAddendCountingObjectsProperty.value.add( cube.model );
          cube.model.traverseInactiveObjects = true;
        }
      }
    } );

    // Once all the cubes are moved confirm that their centers are each the required minimum distance apart to avoid
    // overlap.
    cubesToMove.forEach( ( cube, i ) => {
      if ( i > 0 ) {
        const previousCube = cubesToMove[ i - 1 ];
        const distance = Math.abs( cube.centerX - previousCube.centerX );
        if ( distance < CUBE_WIDTH ) {
          cube.centerX = draggingRight ? previousCube.centerX + CUBE_WIDTH - CUBE_OVERLAP
                                       : previousCube.centerX - CUBE_WIDTH + CUBE_OVERLAP;
        }
      }
    } );

    assert && assert( this.leftAddendCountingObjectsProperty.value.length === this.model.leftAddendProperty.value, 'leftAddendObjects.length should match leftAddendNumberProperty' );
    assert && assert( this.rightAddendCountingObjectsProperty.value.length === this.model.rightAddendProperty.value, 'rightAddendObjects.length should match rightAddendNumberProperty' );
  }
}

function calculateCubeSeparatorPlacement( leftAddendValue: number ): number {

  // The cube separator should not be grouped as part of the groups of 5.
  const separatorAdjustment = leftAddendValue % 5 === 0 ? 1 : 0;
  return Math.floor( leftAddendValue / 5 ) + leftAddendValue - separatorAdjustment + LEFT_MOST_CUBE_X;
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

numberPairs.register( 'CubesOnWireNode', CubesOnWireNode );