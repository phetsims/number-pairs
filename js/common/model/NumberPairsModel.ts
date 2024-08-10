// Copyright 2024, University of Colorado Boulder
/**
 * The base class for the model in the Number Pairs simulation.
 * This class keeps track of the sum and both addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import TModel from '../../../../joist/js/TModel.js';
import numberPairs from '../../numberPairs.js';
import Property from '../../../../axon/js/Property.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';

type SelfOptions = {
  initialSumValue: number;
  initialLeftAddendValue: number;
};

export type NumberPairsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;
export default class NumberPairsModel implements TModel {

  // TODO: This probably wants to be a derived Property. https://github.com/phetsims/number-pairs/issues/4
  //  possibly dynamic and these Properties move into the sceneModel.
  public readonly sumProperty: Property<number>;
  public readonly leftAddendProperty: Property<number>;
  public readonly rightAddendProperty: Property<number>;

  public constructor( providedOptions: NumberPairsModelOptions ) {

    const options = providedOptions;
    const initialRightAddendValue = options.initialSumValue - options.initialLeftAddendValue;
    this.sumProperty = new NumberProperty( options.initialSumValue, {
      tandem: options.tandem.createTandem( 'sumProperty' )
    } );
    this.leftAddendProperty = new NumberProperty( options.initialLeftAddendValue, {
      tandem: options.tandem.createTandem( 'leftAddendProperty' )
    } );
    this.rightAddendProperty = new NumberProperty( initialRightAddendValue, {
      tandem: options.tandem.createTandem( 'rightAddendProperty' )
    } );
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    this.sumProperty.reset();
    this.leftAddendProperty.reset();
    this.rightAddendProperty.reset();
  }
}

numberPairs.register( 'NumberPairsModel', NumberPairsModel );