// Copyright 2024-2025, University of Colorado Boulder
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
import Rectangle, { RectangleOptions } from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import numberPairs from '../../numberPairs.js';

type SelfOptions = {
  numberFontSize?: number;
  numberVisibleProperty?: TReadOnlyProperty<boolean>;
};

export type NumberSquareOptions = SelfOptions & StrictOmit<RectangleOptions, 'children' | 'rectSize'>;
export default class NumberRectangle extends Rectangle {

  public constructor(
    dimension: Dimension2,
    numberProperty: TReadOnlyProperty<number>,
    providedOptions?: NumberSquareOptions ) {

    const options = optionize<NumberSquareOptions, SelfOptions, RectangleOptions>()( {
      numberFontSize: 24,
      rectSize: dimension,
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

    Multilink.multilink( [ numberText.boundsProperty, this.localBoundsProperty ], ( numberTextBounds, rectangleBounds ) => {
      numberText.center = rectangleBounds.center;
      questionMark.center = rectangleBounds.center;
    } );
  }
}

numberPairs.register( 'NumberRectangle', NumberRectangle );