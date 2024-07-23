// Copyright 2024, University of Colorado Boulder

/**
 * TwentyModel is the top-level model for the 'Twenty' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TModel from '../../../../joist/js/TModel.js';

type SelfOptions = {
  //TODO add options that are specific to TwentyModel here
};

type TwentyModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class TwentyModel implements TModel {

  public constructor( providedOptions: TwentyModelOptions ) {
    //TODO
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

numberPairs.register( 'TwentyModel', TwentyModel );