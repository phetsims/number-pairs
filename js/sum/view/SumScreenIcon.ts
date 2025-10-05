// Copyright 2025, University of Colorado Boulder

/**
 * SumScreenIcon contains a number circle with the number 20.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */
import ScreenIcon, { ScreenIconOptions } from '../../../../joist/js/ScreenIcon.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberLineIcon from '../../common/view/NumberLineIcon.js';
import numberPairs from '../../numberPairs.js';

type SelfOptions = EmptySelfOptions;
type SumScreenIconOptions = WithRequired<ScreenIconOptions, 'size'> & SelfOptions;

export default class SumScreenIcon extends ScreenIcon {

  public constructor( providedOptions: SumScreenIconOptions ) {
    const options = optionize<SumScreenIconOptions, SelfOptions, ScreenIconOptions>()( {
      fill: NumberPairsColors.sumScreenBackgroundColorProperty
    }, providedOptions );

    const numberLineIcon = new NumberLineIcon( 30, 1, {
      showRightArrow: true,
      showLabels: false,
      showPoint: true,
      pointFillColor: NumberPairsColors.attributeLeftAddendColorProperty,
      trackLineWidth: 0.7
    } );
    super( numberLineIcon, options );
  }
}

numberPairs.register( 'SumScreenIcon', SumScreenIcon );