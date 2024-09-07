// Copyright 2024, University of Colorado Boulder

/**
 * IntroModel is the top-level model for the 'Intro' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import numberPairs from '../../numberPairs.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberPairsModel, { CountingRepresentationType, NumberPairsModelOptions } from '../../common/model/NumberPairsModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';

type SelfOptions = EmptySelfOptions;

type IntroModelOptions =
  SelfOptions
  & PickRequired<NumberPairsModelOptions, 'tandem'>
  & StrictOmit<NumberPairsModelOptions, 'initialSumValue' | 'initialLeftAddendValue' | 'initialCountingRepresentationType'>;

export default class IntroModel extends NumberPairsModel {

  public constructor( providedOptions: IntroModelOptions ) {

    const options = optionize<IntroModelOptions, SelfOptions, NumberPairsModelOptions>()( {
      initialSumValue: NumberPairsConstants.INTRO_INITIAL_SUM_VALUE,
      initialLeftAddendValue: NumberPairsConstants.INTRO_INITIAL_LEFT_ADDEND_VALUE,
      initialCountingRepresentationType: CountingRepresentationType.APPLES
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

numberPairs.register( 'IntroModel', IntroModel );