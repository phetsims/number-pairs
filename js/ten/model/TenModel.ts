// Copyright 2024, University of Colorado Boulder

/**
 * TenModel is the top-level model for the 'Ten' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import DecompositionModel, { DecompositionModelOptions } from '../../common/model/DecompositionModel.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import RepresentationType from '../../common/model/RepresentationType.js';

type SelfOptions = {
  //TODO add options that are specific to TenModel here
};

type TenModelOptions = SelfOptions &
  PickRequired<DecompositionModelOptions, 'tandem'> &
  StrictOmit<DecompositionModelOptions, 'sceneRange' | 'initialTotalValue' | 'initialRepresentationType'>;

export default class TenModel extends DecompositionModel {

  public constructor( providedOptions: TenModelOptions ) {
    const options = optionize<TenModelOptions, SelfOptions, DecompositionModelOptions>()( {
      sceneRange: NumberPairsConstants.TEN_TOTAL_RANGE,
      initialTotalValue: NumberPairsConstants.TEN_INITIAL_SUM_VALUE,
      initialRepresentationType: RepresentationType.CUBES
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