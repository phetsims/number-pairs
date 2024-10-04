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

type SelfOptions = {
  sceneRange: Range;
};

const CUBE_OVERLAP = 5;

type CubesOnWireNodeOptions = StrictOmit<NodeOptions, 'children'> & SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class CubesOnWireNode extends Node {

  public constructor( model: NumberPairsModel, countingAreaBounds: Bounds2, providedOptions: CubesOnWireNodeOptions ) {
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleMapping(
      new Vector2( 0, 0 ),
      new Vector2( CUBE_WIDTH, 0 ),
      CUBE_WIDTH - CUBE_OVERLAP
    );
    const wire = new Line( 0, 0, countingAreaBounds.width, 0, {
      lineWidth: 2,
      stroke: 'black'
    } );

    // TODO, this is a convenience Property, I don't believe it needs to be isntrumented.
    const cubeSeparatorCenterXProperty = new Property( 0 );
    const cubeSeparator = new Circle( 5, {
      fill: 'black'
    } );
    cubeSeparatorCenterXProperty.link( x => { cubeSeparator.centerX = x; } );

    const cubes: Node[] = [];
    const cubeDragBounds = wire.bounds.dilatedX( -CUBE_WIDTH );
    model.countingObjects.forEach( ( countingObject, i ) => {
     cubes.push( new CubeNode(
       countingObject,
       model.leftAddendCountingObjectsProperty,
       model.rightAddenedCountingObjectsProperty,
       cubeSeparatorCenterXProperty,
       cubeDragBounds,
       providedOptions.tandem.createTandem( `cubeNode${i}` ) ) );
    } );

    Multilink.multilink( [ model.leftAddendNumberProperty, model.rightAddendNumberProperty, model.totalNumberProperty ], ( leftAddend, rightAddend, total ) => {
      const leftAddendCubes = [];
      const rightAddendCubes = [];
      for ( let i = 0; i < leftAddend; i++ ) {
        leftAddendCubes.push( cubes[ i ] );
      }
      for ( let i = 0; i < rightAddend; i++ ) {
        rightAddendCubes.push( cubes[ i + leftAddend ] );
      }

      // Cubes should be lined up on the wire in groups of 5.
      leftAddendCubes.forEach( ( cube, i ) => {
        const placeOnWire = Math.floor( i / 5 ) + i;
        cube.center = new Vector2( modelViewTransform.modelToViewX( placeOnWire ), 0 );
      } );

      // The cube separator should not be grouped as part of the groups of 5.
      const separatorAdjustment = leftAddend % 5 === 0 ? 1 : 0;
      const cubeSeparatorPlaceOnWire = Math.floor( leftAddend / 5 ) + leftAddend - separatorAdjustment;
      cubeSeparatorCenterXProperty.value = modelViewTransform.modelToViewX( cubeSeparatorPlaceOnWire );
      rightAddendCubes.forEach( ( cube, i ) => {
        const placeOnWire = Math.floor( i / 5 ) + i + cubeSeparatorPlaceOnWire + 1;
        cube.center = new Vector2( modelViewTransform.modelToViewX( placeOnWire ), 0 );
      } );

      for ( let i = 0; i < cubes.length; i++ ) {
        cubes[ i ].visible = i < total;
      }
    } );

    const options = combineOptions<NodeOptions>( {
      children: [ wire, cubeSeparator, ...cubes ]
    }, providedOptions );
    super( options );
  }
}

numberPairs.register( 'CubesOnWireNode', CubesOnWireNode );