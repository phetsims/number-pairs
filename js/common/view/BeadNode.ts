// Copyright 2024-2025, University of Colorado Boulder

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
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import beadBlue_svg from '../../../images/beadBlue_svg.js';
import beadPink_svg from '../../../images/beadPink_svg.js';
import numberPairs from '../../numberPairs.js';
import BeadManager from '../model/BeadManager.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';

type SelfOptions = {
  onStartDrag: ( beadNode: BeadNode ) => void;
  onDrag: ( position: Vector2, beadNode: BeadNode ) => void;
  onEndDrag: () => void;
};

type BeadNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'> &
  StrictOmit<NodeOptions, 'children' | 'visibleProperty'>;

export default class BeadNode extends Node {
  public constructor(
    public readonly countingObject: CountingObject,
    providedOptions: BeadNodeOptions ) {

    // giving the bead image an extra 0.5 width allows the outlines to line up cleanly when next to each other.
    // This prevents odd gaps now and then as well as graphical artifacts.
    const beadMaxWidth = BeadManager.BEAD_WIDTH + 0.5;
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
    let startDragOffset: Vector2;
    const dragListener = new SoundDragListener( {
      start: event => {
        options.onStartDrag( this );
        startDragOffset = event.pointer.point.minus( this.parentToGlobalPoint( this.center ) );
      },
      drag: event => {
        const point = event.pointer.point.minus( startDragOffset );
        options.onDrag( point, this );
      },
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