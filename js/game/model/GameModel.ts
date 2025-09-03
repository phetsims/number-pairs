// Copyright 2024-2025, University of Colorado Boulder

/**
 * GameModel is the top-level model for the 'Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TModel from '../../../../joist/js/TModel.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import numberPairs from '../../numberPairs.js';

type SelfOptions = {
  //TODO add options that are specific to GameModel here https://github.com/phetsims/number-pairs/issues/36
};

type GameModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class GameModel implements TModel {

  public constructor( providedOptions: GameModelOptions ) {
    //TODO https://github.com/phetsims/number-pairs/issues/36
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    //TODO https://github.com/phetsims/number-pairs/issues/36
  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    //TODO https://github.com/phetsims/number-pairs/issues/36
  }
}

numberPairs.register( 'GameModel', GameModel );