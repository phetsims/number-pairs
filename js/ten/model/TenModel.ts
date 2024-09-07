// Copyright 2024, University of Colorado Boulder

/**
 * TenModel is the top-level model for the 'Ten' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberPairsModel, { CountingRepresentationType, NumberPairsModelOptions } from '../../common/model/NumberPairsModel.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';

type SelfOptions = {
  //TODO add options that are specific to TenModel here
};

type TenModelOptions = SelfOptions &
  PickRequired<NumberPairsModelOptions, 'tandem'> &
  StrictOmit<NumberPairsModelOptions, 'initialSumValue' | 'initialLeftAddendValue' | 'initialCountingRepresentationType'>;

export default class TenModel extends NumberPairsModel {

  public constructor( providedOptions: TenModelOptions ) {
    const options = optionize<TenModelOptions, SelfOptions, NumberPairsModelOptions>()( {
      initialSumValue: NumberPairsConstants.TEN_INITIAL_SUM_VALUE,
      initialLeftAddendValue: NumberPairsConstants.TEN_INITIAL_LEFT_ADDEND_VALUE,
      initialCountingRepresentationType: CountingRepresentationType.CUBES
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

numberPairs.register( 'TenModel', TenModel );