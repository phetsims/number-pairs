// Copyright 2024, University of Colorado Boulder

/**
 * CubeNode uses an svg to create the visual representation of the cube. It also handles drag interactions through
 * both mouse and keyboard events. The color of the cube changes depending on which addend it is associated with.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Image, Node, NodeOptions, RichDragListener } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import cubeBackground_svg from '../../../images/cubeBackground_svg.js';
import cubeCircleOutline_svg from '../../../images/cubeCircleOutline_svg.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import cubeHexOutline_svg from '../../../images/cubeHexOutline_svg.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Vector2 from '../../../../dot/js/Vector2.js';

export const CUBE_WIDTH = 37;

type SelfOptions = {
  onDrag: ( position: Vector2, cube: CubeNode ) => void;
  onDrop: () => void;
};
type CubeNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'> & StrictOmit<NodeOptions, 'children'>;
export default class CubeNode extends Node {

  public constructor(
    public readonly model: CountingObject,
    providedOptions: CubeNodeOptions ) {

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

    const options = combineOptions<NodeOptions>( {
      children: [ cubeBackground, cubeLeftAddendOutline, cubeRightAddendOutline ]
    }, providedOptions );
    super( options );

    const dragListener = new RichDragListener( {
      drag: event => {
        providedOptions.onDrag( event.pointer.point, this );
      },
      end: providedOptions.onDrop,
      dragListenerOptions: {
        tandem: providedOptions.tandem.createTandem( 'dragListener' )
      },
      keyboardDragListenerOptions: {
        tandem: providedOptions.tandem.createTandem( 'keyboardDragListener' )
      }
    } );
    this.addInputListener( dragListener );
  }
}

numberPairs.register( 'CubeNode', CubeNode );