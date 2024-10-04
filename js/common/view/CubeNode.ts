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
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';

export const CUBE_WIDTH = 37;

type SelfOptions = {
  onDrop: () => void;
};
type CubeNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'> & StrictOmit<NodeOptions, 'children'>;
export default class CubeNode extends Node {

  public constructor(
    model: CountingObject,
    leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>,
    rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>,
    cubeSeparatorPositionProperty: TReadOnlyProperty<number>,
    dragBounds: Bounds2,
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
        this.centerX = dragBounds.closestPointTo( this.globalToParentPoint( event.pointer.point ) ).x;

        if ( this.centerX > cubeSeparatorPositionProperty.value ) {
          if ( !rightAddendCountingObjectsProperty.value.includes( model ) ) {
            leftAddendCountingObjectsProperty.value.remove( model );
            rightAddendCountingObjectsProperty.value.add( model );
          }
        }
        if ( this.centerX < cubeSeparatorPositionProperty.value ) {
          if ( !leftAddendCountingObjectsProperty.value.includes( model ) ) {
            rightAddendCountingObjectsProperty.value.remove( model );
            leftAddendCountingObjectsProperty.value.add( model );
          }
        }
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