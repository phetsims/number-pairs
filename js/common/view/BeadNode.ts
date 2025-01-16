// Copyright 2024, University of Colorado Boulder

/**
 * BeadNode uses an svg to create the visual representation of the bead. It also handles drag interactions through
 * both mouse and keyboard events. The color of the bead changes depending on which addend it is associated with.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Image, Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import beadBlue_svg from '../../../images/beadBlue_svg.js';
import beadPink_svg from '../../../images/beadPink_svg.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';

type SelfOptions = {
  onStartDrag: ( beadNode: BeadNode ) => void;
  onDrag: ( position: Vector2, beadNode: BeadNode ) => void;
  onEndDrag: () => void;
};

type BeadNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'> &
  StrictOmit<NodeOptions, 'children' | 'visibleProperty'>;

export default class BeadNode extends Node {

  // BEAD_WIDTH is closely intertwined with the placement of the bead separator. Anything greater than 21.5 at the time
  // of this writing will cause spacing issues along the wire if other adjustments are not made.
  public static readonly BEAD_WIDTH = 21.5;
  public static readonly BEAD_HEIGHT = 80;

  public constructor(
    public readonly countingObject: CountingObject,
    providedOptions: BeadNodeOptions ) {

    // giving the bead image an extra 0.5 width allows the outlines to line up cleanly when next to each other.
    // This prevents odd gaps now and then as well as graphical artifacts.
    const beadMaxWidth = BeadNode.BEAD_WIDTH + 0.5;
    const blueBead = new Image( beadBlue_svg, {
      maxWidth: beadMaxWidth,
      visibleProperty: DerivedProperty.valueEqualsConstant( countingObject.addendTypeProperty, AddendType.RIGHT )
    } );
    const pinkBead = new Image( beadPink_svg, {
      maxWidth: beadMaxWidth,
      visibleProperty: DerivedProperty.valueEqualsConstant( countingObject.addendTypeProperty, AddendType.LEFT )
    } );

    const options = optionize<BeadNodeOptions, SelfOptions, NodeOptions>()( {
      opacity: phet.chipper.queryParameters.dev ? 0.8 : 1,
      cursor: 'pointer',
      children: [ blueBead, pinkBead ],
      visibleProperty: new DerivedProperty( [ countingObject.addendTypeProperty ], addendType => addendType !== AddendType.INACTIVE )
    }, providedOptions );

    super( options );

    const dragListener = new SoundDragListener( {

      // TODO: Ask CC if we want to use an offset here. See ShoppingItemDragListener for example. There's a weird scenario where it can make other beads jump
      // too sometimes I think we should handle the offset.
      start: () => options.onStartDrag( this ),
      drag: event => options.onDrag( event.pointer.point, this ),
      end: options.onEndDrag,
      tandem: options.tandem.createTandem( 'dragListener' )
    } );
    this.addInputListener( dragListener );

    if ( phet.chipper.queryParameters.dev ) {
      this.addCountingObjectID( countingObject.id );
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