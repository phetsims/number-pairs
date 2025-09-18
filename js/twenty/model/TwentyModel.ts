// Copyright 2024-2025, University of Colorado Boulder

/**
 * TwentyModel is the top-level model for the 'Twenty' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import DecompositionModel, { DecompositionModelOptions } from '../../common/model/DecompositionModel.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';

type SelfOptions = EmptySelfOptions;

type TwentyModelOptions = SelfOptions &
  PickRequired<DecompositionModelOptions, 'tandem'>
  & StrictOmit<DecompositionModelOptions, 'initialTotalValue' | 'sceneRange' | 'initialRepresentationType'>;

export default class TwentyModel extends DecompositionModel {

  public constructor( providedOptions: TwentyModelOptions ) {
    const options = optionize<TwentyModelOptions, SelfOptions, DecompositionModelOptions>()( {
      sceneRange: NumberPairsConstants.TWENTY_TOTAL_RANGE,
      initialTotalValue: NumberPairsConstants.TWENTY_INITIAL_SUM_VALUE,
      initialRepresentationType: RepresentationType.APPLES
    }, providedOptions );
    super( options );
  }
}

numberPairs.register( 'TwentyModel', TwentyModel );