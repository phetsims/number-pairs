// Copyright 2024-2025, University of Colorado Boulder
/**
 * A circle that displays a number in its center with a specified fill color.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Circle, { CircleOptions } from '../../../../scenery/js/nodes/Circle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import numberPairs from '../../numberPairs.js';

type NumberCircleOptions = StrictOmit<CircleOptions, 'children' | 'radius'>;

const RADIUS = 30;
export default class NumberCircle extends Circle {
  public static readonly RADIUS = RADIUS;
  public constructor(
    numberProperty: TReadOnlyProperty<number>,
    numberVisibleProperty: TReadOnlyProperty<boolean>,
    providedOptions: NumberCircleOptions ) {

    const options = optionize<NumberCircleOptions, EmptySelfOptions, CircleOptions>()( {
      stroke: 'black',
      excludeInvisibleChildrenFromBounds: true
    }, providedOptions );
    super( RADIUS, options );

    const numberStringProperty = new DerivedProperty( [ numberProperty ], ( number: number ) => number.toString() );
    const numberText = new Text( numberStringProperty, {
      font: new PhetFont( 28 ),
      center: this.center,
      visibleProperty: numberVisibleProperty
    } );

    const questionMark = new Text( '?', {
      font: new PhetFont( 28 ),
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