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
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import cubePinkHexagon_svg from '../../../images/cubePinkHexagon_svg.js';
import cubeBlueCircle_svg from '../../../images/cubeBlueCircle_svg.js';

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


    const leftAddendVisibleProperty = DerivedProperty.valueEqualsConstant( model.addendTypeProperty, AddendType.LEFT );
    const rightAddendVisibleProperty = DerivedProperty.valueEqualsConstant( model.addendTypeProperty, AddendType.RIGHT );
    const cubeLeftAddendImage = new Image( cubePinkHexagon_svg, {
      maxWidth: CUBE_WIDTH,
      visibleProperty: leftAddendVisibleProperty
    } );

    const cubeRightAddendImage = new Image( cubeBlueCircle_svg, {
      maxWidth: CUBE_WIDTH,
      visibleProperty: rightAddendVisibleProperty
    } );

    model.addendTypeProperty.link( addendType => {
      // cubeBackground.fill = addendType === AddendType.LEFT ? 'blue' : 'red';
    } );

    const options = combineOptions<NodeOptions>( {
      children: [ cubeLeftAddendImage, cubeRightAddendImage ]
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