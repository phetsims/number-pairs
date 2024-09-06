// Copyright 2024, University of Colorado Boulder
/**
 * A square that displays a number in its center with a specified fill color.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import { Rectangle, RectangleOptions, Text } from '../../../../scenery/js/imports.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Multilink from '../../../../axon/js/Multilink.js';


type NumberSquareOptions = StrictOmit<RectangleOptions, 'children'>;
export default class NumberSquare extends Rectangle {

  public constructor( squareDimension: number, numberProperty: TReadOnlyProperty<number>, providedOptions: NumberSquareOptions ) {

    const options = combineOptions<RectangleOptions>( {
      rectSize: new Dimension2( squareDimension, squareDimension ),
      stroke: 'black'
    }, providedOptions );
   super( options );

    const numberStringProperty = new DerivedProperty( [ numberProperty ], ( number: number ) => number.toString() );
    const numberText = new Text( numberStringProperty, {
      font: new PhetFont( 24 ),
      center: this.center
    } );
    this.addChild( numberText );

    Multilink.multilink( [ numberText.boundsProperty, this.localBoundsProperty ], ( numberTextBounds, circleBounds ) => {
      numberText.center = circleBounds.center;
    } );
  }
}

numberPairs.register( 'NumberSquare', NumberSquare );