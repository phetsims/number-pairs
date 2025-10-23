// Copyright 2024-2025, University of Colorado Boulder
/**
 * A circle that displays a number in its center with a specified fill color.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Circle, { CircleOptions } from '../../../../scenery/js/nodes/Circle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import numberPairs from '../../numberPairs.js';

type NumberCircleSelfOptions = {
  radius?: number;
  fontSize?: number;
};

type NumberCircleOptions = NumberCircleSelfOptions & StrictOmit<CircleOptions, 'children'>;

const RADIUS = 30;
const FONT_SIZE = 28;
export default class NumberCircle extends Circle {
  public static readonly RADIUS = RADIUS;
  public static readonly DEFAULT_FONT_SIZE = FONT_SIZE;

  public constructor(
    numberProperty: TReadOnlyProperty<number>,
    numberVisibleProperty: TReadOnlyProperty<boolean>,
    providedOptions?: NumberCircleOptions ) {

    const options = optionize<NumberCircleOptions, NumberCircleSelfOptions, CircleOptions>()( {
      radius: RADIUS,
      fontSize: FONT_SIZE,
      stroke: 'black',
      excludeInvisibleChildrenFromBounds: true
    }, providedOptions );

    const { radius: resolvedRadius, fontSize: resolvedFontSize, ...circleOptions } = options;
    const radius = resolvedRadius;
    const fontSize = resolvedFontSize;

    // TODO: https://github.com/phetsims/number-pairs/issues/307 Types are a bit odd here
    super( radius, circleOptions as CircleOptions );

    const numberStringProperty = new DerivedProperty( [ numberProperty ], ( number: number ) => number.toString() );
    const numberText = new Text( numberStringProperty, {
      font: new PhetFont( fontSize ),
      center: this.center,
      visibleProperty: numberVisibleProperty
    } );

    const questionMark = new Text( '?', {
      font: new PhetFont( fontSize ),
      center: this.center,
      visibleProperty: DerivedProperty.not( numberVisibleProperty )
    } );
    this.addChild( questionMark );
    this.addChild( numberText );

    Multilink.multilink( [ numberText.boundsProperty, this.localBoundsProperty ], ( numberTextBounds, circleBounds ) => {
      numberText.center = circleBounds.center;
      questionMark.center = circleBounds.center;
    } );
  }
}

numberPairs.register( 'NumberCircle', NumberCircle );
