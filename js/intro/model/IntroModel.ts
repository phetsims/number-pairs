// Copyright 2024-2025, University of Colorado Boulder

/**
 * IntroModel is the top-level model for the 'Intro' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import DecompositionModel, { DecompositionModelOptions } from '../../common/model/DecompositionModel.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';

type SelfOptions = EmptySelfOptions;

type IntroModelOptions =
  SelfOptions
  & PickRequired<DecompositionModelOptions, 'tandem'>
  & StrictOmit<DecompositionModelOptions, 'sceneRange' | 'initialTotalValue' | 'initialRepresentationType'>;

export default class IntroModel extends DecompositionModel {

  public constructor( providedOptions: IntroModelOptions ) {

    const options = optionize<IntroModelOptions, SelfOptions, DecompositionModelOptions>()( {
      sceneRange: NumberPairsConstants.TEN_TOTAL_RANGE,
      initialTotalValue: NumberPairsConstants.INTRO_INITIAL_SUM_VALUE,
      initialRepresentationType: RepresentationType.APPLES
    }, providedOptions );

    super( options );
  }
}

numberPairs.register( 'IntroModel', IntroModel );