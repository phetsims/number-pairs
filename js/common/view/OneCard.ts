// Copyright 2024, University of Colorado Boulder

/**
 * TODO: describe file
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */
import { Node, NodeOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;
type OneCardOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;
export default class OneCard extends Node {

  public constructor( cardWidth: number, cardHeight: number, providedOptions?: OneCardOptions ) {
    const background = new Rectangle( 0, 0, cardWidth, cardHeight, {
      fill: 'white',
      stroke: 'black',
      cornerRadius: 5
    } );
    const numberOne = new Text( '1', {
      font: new PhetFont( 40 ),
      center: background.center
    } );

    const options = optionize<OneCardOptions, EmptySelfOptions, NodeOptions>()( {
      children: [ background, numberOne ]
    }, providedOptions );
    super( options );
  }
}

numberPairs.register( 'OneCard', OneCard );