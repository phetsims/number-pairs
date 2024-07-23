// Copyright 2024, University of Colorado Boulder

/**
 * IntroModel is the top-level model for the 'Intro' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TModel from '../../../../joist/js/TModel.js';

type SelfOptions = {
  //TODO add options that are specific to IntroModel here
};

type IntroModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class IntroModel implements TModel {

  public constructor( providedOptions: IntroModelOptions ) {
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

numberPairs.register( 'IntroModel', IntroModel );