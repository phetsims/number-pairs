// Copyright 2024, University of Colorado Boulder

/**
 * SumModel is the top-level model for the 'Sum' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import DecompositionModel, { CountingRepresentationType, NumberPairsModelOptions } from '../../common/model/DecompositionModel.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
// import optionize from '../../../../phet-core/js/optionize.js';
// import NumberPairsConstants from '../../common/NumberPairsConstants.js';
// import Range from '../../../../dot/js/Range.js';

type SelfOptions = {
  //TODO add options that are specific to SumModel here
};

type SumModelOptions = SelfOptions &
  PickRequired<NumberPairsModelOptions, 'tandem'>
  & StrictOmit<NumberPairsModelOptions, 'sceneRange' | 'initialSumValue' | 'initialCountingRepresentationType'>;

export default class SumModel {

  public constructor( providedOptions: SumModelOptions ) {
    // const options = optionize<SumModelOptions, SelfOptions, NumberPairsModelOptions>()( {
    //   sceneRange: new Range( 0, 0 ),
    //   initialSumValue: NumberPairsConstants.SUM_INITIAL_SUM_VALUE,
    //   initialCountingRepresentationType: CountingRepresentationType.CUBES
    // }, providedOptions );
  }

  /**
   * Resets the model.
   */
  public reset(): void {
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

numberPairs.register( 'SumModel', SumModel );