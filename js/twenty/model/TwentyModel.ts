// Copyright 2024, University of Colorado Boulder

/**
 * TwentyModel is the top-level model for the 'Twenty' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberPairsModel, { NumberPairsModelOptions } from '../../common/model/NumberPairsModel.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';

type SelfOptions = {
  //TODO add options that are specific to TwentyModel here
};

type TwentyModelOptions = SelfOptions &
  PickRequired<NumberPairsModelOptions, 'tandem'>
  & StrictOmit<NumberPairsModelOptions, 'initialSumValue' | 'initialLeftAddendValue'>;

export default class TwentyModel extends NumberPairsModel {

  public constructor( providedOptions: TwentyModelOptions ) {
    const options = optionize<TwentyModelOptions, SelfOptions, NumberPairsModelOptions>()( {
      initialSumValue: NumberPairsConstants.TWENTY_INITIAL_SUM_VALUE,
      initialLeftAddendValue: NumberPairsConstants.TWENTY_INITIAL_LEFT_ADDEND_VALUE
    }, providedOptions );
    super( options );
  }

  /**
   * Resets the model.
   */
  public override reset(): void {
    //TODO
  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    //TODO
  }
}

numberPairs.register( 'TwentyModel', TwentyModel );