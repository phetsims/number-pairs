// Copyright 2024, University of Colorado Boulder
/**
 * A square that displays a number in its center with a specified fill color.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Rectangle, RectangleOptions, Text } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';

type SelfOptions = {
  numberFontSize?: number;
  numberVisibleProperty?: TReadOnlyProperty<boolean>;
};

export type NumberSquareOptions = SelfOptions & StrictOmit<RectangleOptions, 'children' | 'rectSize'>;
export default class NumberSquare extends Rectangle {

  public constructor(
    squareDimension: number,
    numberProperty: TReadOnlyProperty<number>,
    providedOptions?: NumberSquareOptions ) {

    const options = optionize<NumberSquareOptions, SelfOptions, RectangleOptions>()( {
      numberFontSize: 24,
      rectSize: new Dimension2( squareDimension, squareDimension ),
      cornerRadius: 5,
      numberVisibleProperty: new Property( true ),
      excludeInvisibleChildrenFromBounds: true
    }, providedOptions );
    super( options );

    const numberStringProperty = new DerivedProperty( [ numberProperty ], ( number: number ) => number.toString() );
    const numberText = new Text( numberStringProperty, {
      font: new PhetFont( options.numberFontSize ),
      center: this.center,
      visibleProperty: options.numberVisibleProperty
    } );
    const questionMark = new Text( '?', {
      font: new PhetFont( options.numberFontSize ),
      center: this.center,
      visibleProperty: DerivedProperty.not( options.numberVisibleProperty )
    } );
    this.addChild( questionMark );
    this.addChild( numberText );

    Multilink.multilink( [ numberText.boundsProperty, this.localBoundsProperty ], ( numberTextBounds, circleBounds ) => {
      numberText.center = circleBounds.center;
      questionMark.center = circleBounds.center;
    } );
  }
}

numberPairs.register( 'NumberSquare', NumberSquare );