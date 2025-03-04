// Copyright 2025, University of Colorado Boulder

/**
 * TwentyScreenIcon contains a number circle with the number 20.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */
import ScreenIcon, { ScreenIconOptions } from '../../../../joist/js/ScreenIcon.js';
import numberPairs from '../../numberPairs.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import NumberCircle from '../../common/view/NumberCircle.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';

type SelfOptions = EmptySelfOptions;
type TwentyScreenIconOptions = WithRequired<ScreenIconOptions, 'size'> & SelfOptions;

export default class TwentyScreenIcon extends ScreenIcon {

  public constructor( providedOptions: TwentyScreenIconOptions ) {
    const options = optionize<TwentyScreenIconOptions, SelfOptions, ScreenIconOptions>()( {
      fill: NumberPairsColors.twentyScreenBackgroundColorProperty
    }, providedOptions );

    // These Properties are only created to satisfy the needs of NumberCircle, and should not be mutated.
    const numberProperty = new NumberProperty( 20 );
    const numberVisibleProperty = new BooleanProperty( true );
    const numberCircle = new NumberCircle( numberProperty, numberVisibleProperty, {
      fill: NumberPairsColors.numberLineSumColorProperty,
      lineWidth: 2
    } );
    super( numberCircle, options );
  }
}

numberPairs.register( 'TwentyScreenIcon', TwentyScreenIcon );