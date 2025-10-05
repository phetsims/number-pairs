// Copyright 2024-2025, University of Colorado Boulder
/**
 * A OneCard is a rectangle with rounded corners and the number one in the center.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import numberPairs from '../../numberPairs.js';

type SelfOptions = EmptySelfOptions;
type OneCardOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;
export default class OneCard extends Node {

  public constructor( cardWidth: number, cardHeight: number, fontSize: number, providedOptions?: OneCardOptions ) {
    const background = new Rectangle( 0, 0, cardWidth, cardHeight, {
      fill: 'white',
      stroke: 'black',
      cornerRadius: 5
    } );
    const numberOne = new Text( '1', {
      font: new PhetFont( fontSize ),
      center: background.center
    } );

    const options = optionize<OneCardOptions, EmptySelfOptions, NodeOptions>()( {
      children: [ background, numberOne ]
    }, providedOptions );
    super( options );
  }
}

numberPairs.register( 'OneCard', OneCard );