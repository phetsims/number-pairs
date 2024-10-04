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

  private readonly cubes: CubeNode[] = [];
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
      this.cubes.push( new CubeNode(
        countingObject,
        {
          tandem: providedOptions.tandem.createTandem( `cubeNode${i}` ),
          onDrop: this.snapCubesToPositions.bind( this ),
          onDrag: this.handleCubeMove.bind( this )
        } ) );
    } );

    Multilink.multilink( [ model.leftAddendNumberProperty, model.rightAddendNumberProperty, model.totalNumberProperty ], () => {
      this.snapCubesToPositions();
    } );

    this.cubes.forEach( cube => {
      this.addChild( cube );
    } );
  }

  public snapCubesToPositions(): void {
    const leftAddend = this.model.leftAddendNumberProperty.value;
    const rightAddend = this.model.rightAddendNumberProperty.value;
    const total = leftAddend + rightAddend;
    const leftAddendCubes = [];
    const rightAddendCubes = [];
    for ( let i = 0; i < leftAddend; i++ ) {
      leftAddendCubes.push( this.cubes[ i ] );
    }
    for ( let i = 0; i < rightAddend; i++ ) {
      rightAddendCubes.push( this.cubes[ i + leftAddend ] );
    }

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

    for ( let i = 0; i < this.cubes.length; i++ ) {
      this.cubes[ i ].visible = i < total;
    }
  }

  public handleCubeMove( newPosition: Vector2, grabbedCube: CubeNode ): void {
    const draggingRight = Math.sign( newPosition.x - grabbedCube.parentToGlobalPoint( grabbedCube.bounds.center ).x ) > 0;
    const activeCubes = this.cubes.filter( cube => cube.model.addendTypeProperty.value !== AddendType.INACTIVE )
      .sort( ( a, b ) => a.centerX - b.centerX );

    const sortedCubes = draggingRight ? activeCubes : activeCubes.reverse();
    const index = sortedCubes.indexOf( grabbedCube );
    const cubesToMove = sortedCubes.slice( index, sortedCubes.length + 1 ).filter(
      cube => {
        return cube.model.addendTypeProperty.value === grabbedCube.model.addendTypeProperty.value;
      } );

    const oldCenterX = grabbedCube.centerX;
    const dragBoundsWithMovingCubes = this.cubeDragBounds.dilatedX( -CUBE_WIDTH * ( cubesToMove.length - 1 ) );
    const newCenterX = dragBoundsWithMovingCubes.closestPointTo( grabbedCube.globalToParentPoint( newPosition ) ).x;
    const deltaX = newCenterX - oldCenterX;
    cubesToMove.forEach( cube => {
      cube.centerX += deltaX;

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
  }
}

numberPairs.register( 'CubesOnWireNode', CubesOnWireNode );