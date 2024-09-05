// Copyright 2024, University of Colorado Boulder
/**
 * A circle that displays a number in its center with a specified fill color.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Circle, CircleOptions, Text } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Multilink from '../../../../axon/js/Multilink.js';

type NumberCircleOptions = StrictOmit<CircleOptions, 'children'>;

export default class NumberCircle extends Circle {
  public constructor( radius: number, numberProperty: TReadOnlyProperty<number>, providedOptions: NumberCircleOptions ) {

    const options = combineOptions<CircleOptions>( {
      stroke: 'black'
    }, providedOptions );
    super( radius, options );

    const numberStringProperty = new DerivedProperty( [ numberProperty ], ( number: number ) => number.toString() );
    const numberText = new Text( numberStringProperty, {
      font: new PhetFont( 20 ),
      center: this.center
    } );
    this.addChild( numberText );

    Multilink.multilink( [ numberText.boundsProperty, this.localBoundsProperty ], ( numberTextBounds, circleBounds ) => {
      numberText.center = circleBounds.center;
    } );
  }
}

numberPairs.register( 'NumberCircle', NumberCircle );