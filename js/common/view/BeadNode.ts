// Copyright 2024, University of Colorado Boulder

/**
 * BeadNode uses an svg to create the visual representation of the bead. It also handles drag interactions through
 * both mouse and keyboard events. The color of the bead changes depending on which addend it is associated with.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Color, Node, NodeOptions, Rectangle, RichDragListener, Text } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import NumberPairsColors from '../NumberPairsColors.js';

export const BEAD_WIDTH = 25;
const BEAD_HEIGHT = 60;

type SelfOptions = {
  onDrag: ( position: Vector2, cube: BeadNode ) => void;
  onDrop: () => void;
};
type BeadNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'> &
  StrictOmit<NodeOptions, 'children' | 'visibleProperty'>;
export default class BeadNode extends Node {

  public constructor(
    public readonly model: CountingObject,
    providedOptions: BeadNodeOptions ) {

    const leftAddendVisibleProperty = DerivedProperty.valueEqualsConstant( model.addendTypeProperty, AddendType.LEFT );
    const rightAddendVisibleProperty = DerivedProperty.valueEqualsConstant( model.addendTypeProperty, AddendType.RIGHT );
    const leftAddendBead = new Rectangle( 0, 0, BEAD_WIDTH, BEAD_HEIGHT, {
      fill: NumberPairsColors.numberLineLeftAddendColorProperty,
      cornerRadius: 10,
      stroke: Color.BLACK,
      visibleProperty: leftAddendVisibleProperty
    } );

    const rightAddendBead = new Rectangle( 0, 0, BEAD_WIDTH, BEAD_HEIGHT, {
      fill: NumberPairsColors.numberLineRightAddendColorProperty,
      cornerRadius: 10,
      stroke: Color.BLACK,
      visibleProperty: rightAddendVisibleProperty
    } );
    const options = optionize<BeadNodeOptions, SelfOptions, NodeOptions>()( {
      children: [ leftAddendBead, rightAddendBead ],
      visibleProperty: new DerivedProperty( [ model.addendTypeProperty ], addendType => addendType !== AddendType.INACTIVE )
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
    this.addDebugText( model );
  }

  public addDebugText( cube: CountingObject ): void {
    // Show index when debugging with ?dev
    if ( phet.chipper.queryParameters.dev ) {
      this.addChild( new Text( cube.id + '', {
        font: new PhetFont( 20 ),
        fill: 'black',
        center: this.center
      } ) );
    }
  }
}

numberPairs.register( 'BeadNode', BeadNode );