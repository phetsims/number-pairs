// Copyright 2024, University of Colorado Boulder

/**
 * CubeNode uses an svg to create the visual representation of the cube. It also handles drag interactions through
 * both mouse and keyboard events. The color of the cube changes depending on which addend it is associated with.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Node, Image } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import cubeBackground_svg from '../../../images/cubeBackground_svg.js';
import cubeCircleOutline_svg from '../../../images/cubeCircleOutline_svg.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import cubeHexOutline_svg from '../../../images/cubeHexOutline_svg.js';

export const CUBE_WIDTH = 37;

export default class CubeNode extends Node {

  public constructor( model: CountingObject ) {
    const cubeBackground = new Image( cubeBackground_svg, {
      maxWidth: CUBE_WIDTH
    } );

    const leftAddendVisibleProperty = DerivedProperty.valueEqualsConstant( model.addendTypeProperty, AddendType.LEFT );
    const rightAddendVisibleProperty = DerivedProperty.valueEqualsConstant( model.addendTypeProperty, AddendType.RIGHT );
    const cubeLeftAddendOutline = new Image( cubeHexOutline_svg, {
      maxWidth: CUBE_WIDTH,
      visibleProperty: leftAddendVisibleProperty
    } );

    const cubeRightAddendOutline = new Image( cubeCircleOutline_svg, {
      maxWidth: CUBE_WIDTH,
      visibleProperty: rightAddendVisibleProperty
    } );

    model.addendTypeProperty.link( addendType => {
      // cubeBackground.fill = addendType === AddendType.LEFT ? 'blue' : 'red';
    } );
    super( {
      children: [ cubeBackground, cubeLeftAddendOutline, cubeRightAddendOutline ]
    } );
  }
}

numberPairs.register( 'CubeNode', CubeNode );