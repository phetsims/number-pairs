// Copyright 2025, University of Colorado Boulder

/**
 * TenScreenIcon contains a number circle with the number 10.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import ScreenIcon, { ScreenIconOptions } from '../../../../joist/js/ScreenIcon.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberCircle from '../../common/view/NumberCircle.js';
import numberPairs from '../../numberPairs.js';

type SelfOptions = EmptySelfOptions;
type TenScreenIconOptions = WithRequired<ScreenIconOptions, 'size'> & SelfOptions;

export default class TenScreenIcon extends ScreenIcon {

  public constructor( providedOptions: TenScreenIconOptions ) {
    const options = optionize<TenScreenIconOptions, SelfOptions, ScreenIconOptions>()( {
      fill: NumberPairsColors.tenScreenBackgroundColorProperty
    }, providedOptions );

    // These Properties are only created to satisfy the needs of NumberCircle, and should not be mutated.
    const numberProperty = new NumberProperty( 10 );
    const numberVisibleProperty = new BooleanProperty( true );
    const numberCircle = new NumberCircle( numberProperty, numberVisibleProperty, {
      fill: NumberPairsColors.attributeSumColorProperty,
      lineWidth: 2
    } );
    super( numberCircle, options );
  }
}

numberPairs.register( 'TenScreenIcon', TenScreenIcon );