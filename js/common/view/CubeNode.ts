// Copyright 2024, University of Colorado Boulder

/**
 * CubeNode uses an svg to create the visual representation of the cube. It also handles drag interactions through
 * both mouse and keyboard events. The color of the cube changes depending on which addend it is associated with.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Node, Rectangle } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';

export const CUBE_WIDTH = 37;

export default class CubeNode extends Node {

  public constructor( model: CountingObject ) {
    const cubeStandIn = new Rectangle( 0, 0, CUBE_WIDTH, CUBE_WIDTH, {
      fill: 'blue'
    } );

    model.addendTypeProperty.link( addendType => {
      cubeStandIn.fill = addendType === AddendType.LEFT ? 'blue' : 'red';
    } );
    super( {
      children: [ cubeStandIn ]
    } );
  }
}

numberPairs.register( 'CubeNode', CubeNode );