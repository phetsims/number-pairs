// Copyright 2024, University of Colorado Boulder

//TODO Revise doc when BeadNode artwork is finalized, it may not be SVG.
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
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';

type SelfOptions = {
  onDrag: ( position: Vector2, cube: BeadNode ) => void;
  onDrop: () => void;
};

type BeadNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'> &
  StrictOmit<NodeOptions, 'children' | 'visibleProperty'>;

export default class BeadNode extends Node {

  // BEAD_WIDTH is closely intertwined with the placement of the bead separator. Anything greater than 21.5 at the time
  // of this writing will cause spacing issues along the wire if other adjustments are not made.
  public static readonly BEAD_WIDTH = 21.5;
  private static readonly BEAD_HEIGHT = 80;

  public constructor(
    public readonly model: CountingObject,
    modelViewTransform: ModelViewTransform2,
    providedOptions: BeadNodeOptions ) {

    const leftAddendVisibleProperty = DerivedProperty.valueEqualsConstant( model.addendTypeProperty, AddendType.LEFT );
    const rightAddendVisibleProperty = DerivedProperty.valueEqualsConstant( model.addendTypeProperty, AddendType.RIGHT );

    const leftAddendBead = new Rectangle( 0, 0, BeadNode.BEAD_WIDTH, BeadNode.BEAD_HEIGHT, {
      fill: NumberPairsColors.numberLineLeftAddendColorProperty,
      cornerRadius: 10,
      stroke: Color.BLACK,
      visibleProperty: leftAddendVisibleProperty
    } );

    const rightAddendBead = new Rectangle( 0, 0, BeadNode.BEAD_WIDTH, BeadNode.BEAD_HEIGHT, {
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

    if ( phet.chipper.queryParameters.dev ) {
      this.addCountingObjectID( model.id );
    }
  }

  /**
   * Show the bead's id (object number) when debugging with ?dev.
   */
  private addCountingObjectID( id: number ): void {
    this.addChild( new Text( id + '', {
      font: new PhetFont( 20 ),
      fill: 'black',
      center: this.center
    } ) );
  }
}

numberPairs.register( 'BeadNode', BeadNode );