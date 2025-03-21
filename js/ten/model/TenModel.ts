// Copyright 2024, University of Colorado Boulder

/**
 * TenModel is the top-level model for the 'Ten' screen.
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

type TenModelOptions = SelfOptions &
  PickRequired<DecompositionModelOptions, 'tandem'> &
  StrictOmit<DecompositionModelOptions, 'sceneRange' | 'initialTotalValue' | 'initialRepresentationType'>;

export default class TenModel extends DecompositionModel {

  public constructor( providedOptions: TenModelOptions ) {
    const options = optionize<TenModelOptions, SelfOptions, DecompositionModelOptions>()( {
      sceneRange: NumberPairsConstants.TEN_TOTAL_RANGE,
      initialTotalValue: NumberPairsConstants.TEN_INITIAL_SUM_VALUE,
      initialRepresentationType: RepresentationType.BEADS
    }, providedOptions );
    super( options );
  }

  /**
   * Resets the model.
   */
  public override reset(): void {
    super.reset();
  }
}

numberPairs.register( 'TenModel', TenModel );