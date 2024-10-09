// Copyright 2024, University of Colorado Boulder

/**
 * Cubes are arranged in two groups, one for each addend. All the cubes are lined up on a "wire" and can be dragged
 * to either the left or right of the separator. The number of cubes in each group is determined by the addend values.
 * The number of visible cubes is determined by the total value.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Circle, Line, Node, NodeOptions } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
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

type SelfOptions = {
  sceneRange: Range;
};

const CUBE_OVERLAP = 5;
const LEFT_MOST_CUBE_X = 2;

type CubesOnWireNodeOptions = StrictOmit<NodeOptions, 'children'> & SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class CubesOnWireNode extends Node {

  private readonly cubeModelToNodeMap = new Map<CountingObject, CubeNode>();
  private readonly modelViewTransform: ModelViewTransform2;
  private readonly cubeSeparatorCenterXProperty: Property<number>;
  private readonly cubeDragBounds: Bounds2;

  private readonly leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  private readonly rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;

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

    // TODO, this is a convenience Property, I don't believe it needs to be instrumented.
    const cubeSeparatorCenterXProperty = new Property( 0 );
    const cubeSeparator = new Circle( 5, {
      fill: 'black'
    } );
    cubeSeparatorCenterXProperty.link( x => { cubeSeparator.centerX = x; } );

    const options = combineOptions<NodeOptions>( {
      children: [ wire, cubeSeparator ]
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
          onDrop: this.snapCubesToPositions.bind( this ),
          onDrag: this.handleCubeMove.bind( this )
        } );
      this.cubeModelToNodeMap.set( countingObject, cubeNode );
    } );

    Multilink.multilink( [
      model.leftAddendNumberProperty,
      model.rightAddendNumberProperty,
      model.totalNumberProperty,
      model.leftAddendCountingObjectsProperty,
      model.rightAddendCountingObjectsProperty
    ], () => {
      this.snapCubesToPositions();
    } );

    this.cubeModelToNodeMap.forEach( cube => {
      this.addChild( cube );
    } );
  }

  /**
   * Snap the cubes to their positions on the wire based on the addend values. By default, the cubes are arranged in
   * groups of 5 with a separator between the two addends.
   */
  public snapCubesToPositions(): void {
    const leftAddend = this.model.leftAddendNumberProperty.value;
    const leftAddendCubes = this.leftAddendCountingObjectsProperty.value.map( countingObject => this.cubeModelToNodeMap.get( countingObject )! );
    const rightAddendCubes = this.rightAddendCountingObjectsProperty.value.map( countingObject => this.cubeModelToNodeMap.get( countingObject )! );

    // Cubes should be lined up on the wire in groups of 5.
    leftAddendCubes.forEach( ( cube, i ) => {
      const placeOnWire = Math.floor( i / 5 ) + i + LEFT_MOST_CUBE_X;
      cube.center = new Vector2( this.modelViewTransform.modelToViewX( placeOnWire ), 0 );
    } );

    // The cube separator should not be grouped as part of the groups of 5.
    const separatorAdjustment = leftAddend % 5 === 0 ? 1 : 0;
    const cubeSeparatorPlaceOnWire = Math.floor( leftAddend / 5 ) + leftAddend - separatorAdjustment + LEFT_MOST_CUBE_X;
    this.cubeSeparatorCenterXProperty.value = this.modelViewTransform.modelToViewX( cubeSeparatorPlaceOnWire );
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
  public handleCubeMove( newPosition: Vector2, grabbedCube: CubeNode ): void {

    // Determine whether we are dragging the cube to the right or left along the wire.
    const draggingRight = Math.sign( newPosition.x - grabbedCube.parentToGlobalPoint( grabbedCube.bounds.center ).x ) > 0;

    // Sort all active cubes by their x position, and reverse if we are dragging towards the left.
    const cubeNodes = [ ...this.cubeModelToNodeMap.values() ];
    const activeCubes = cubeNodes.filter( cube => cube.model.addendTypeProperty.value !== AddendType.INACTIVE )
      .sort( ( a, b ) => a.centerX - b.centerX );
    const sortedCubes = draggingRight ? activeCubes : activeCubes.reverse();

    // Now that the cubes are sorted in the proper direction we can determine which cubes need to be moved based
    // on the index of the grabbed cube.
    const grabbedCubeIndex = sortedCubes.indexOf( grabbedCube );
    const cubesToMove = sortedCubes.slice( grabbedCubeIndex, sortedCubes.length + 1 ).filter(
      cube => {
        return cube.model.addendTypeProperty.value === grabbedCube.model.addendTypeProperty.value;
      } );

    // Calculate the distance the grabbed cube has moved and constrain the movement so that it does not exit
    // the drag bounds.
    const oldCenterX = grabbedCube.centerX;
    const dragBoundsWithMovingCubes = this.cubeDragBounds.dilatedX( -CUBE_WIDTH * ( cubesToMove.length - 1 ) );
    const newCenterX = dragBoundsWithMovingCubes.closestPointTo( grabbedCube.globalToParentPoint( newPosition ) ).x;
    const deltaX = newCenterX - oldCenterX;

    // Calculate the distance between the grabbed cube and the closest cube in the dragging direction.
    // The first cube in the array is the grabbed cube, and the second is the closest since we sorted the cubes above.
    const closestCubeDistance = cubesToMove.length > 1 ? Math.abs( cubesToMove[ 1 ].centerX - cubesToMove[ 0 ].centerX ) : 0;
    grabbedCube.centerX = newCenterX;

    cubesToMove.forEach( cube => {

      // Check the distance to see if the grabbed cube is close enough to the closest cube to move it.
      if ( cube !== grabbedCube && closestCubeDistance < CUBE_WIDTH ) {
        cube.centerX += deltaX;
      }
      if ( cube.centerX > this.cubeSeparatorCenterXProperty.value ) {
        if ( !this.rightAddendCountingObjectsProperty.value.includes( cube.model ) ) {
          this.leftAddendCountingObjectsProperty.value.remove( cube.model );
          this.rightAddendCountingObjectsProperty.value.add( cube.model );
        }
      }
      if ( cube.centerX < this.cubeSeparatorCenterXProperty.value ) {
        if ( !this.leftAddendCountingObjectsProperty.value.includes( cube.model ) ) {
          this.rightAddendCountingObjectsProperty.value.remove( cube.model );
          this.leftAddendCountingObjectsProperty.value.add( cube.model );
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
  }
}

numberPairs.register( 'CubesOnWireNode', CubesOnWireNode );