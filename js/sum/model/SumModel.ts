// Copyright 2024, University of Colorado Boulder

/**
 * SumModel is the top-level model for the 'Sum' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { CountingRepresentationType, NumberPairsModelOptions } from '../../common/model/NumberPairsModel.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberPairsModel from '../../common/model/NumberPairsModel.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import Range from '../../../../dot/js/Range.js';

type SelfOptions = {
  //TODO add options that are specific to SumModel here
};

type SumModelOptions = SelfOptions &
  PickRequired<NumberPairsModelOptions, 'tandem'>
  & StrictOmit<NumberPairsModelOptions, 'initialCountingRepresentationType'>;

const SCENE_RANGE = new Range( NumberPairsConstants.TEN_SCENE_RANGE.min, NumberPairsConstants.TWENTY_SCENE_RANGE.max );

export default class SumModel extends NumberPairsModel {
  public override readonly sumProperty: NumberProperty;
  public override readonly leftAddendNumberProperty: NumberProperty;
  public override readonly rightAddendNumberProperty: NumberProperty;

  public constructor( providedOptions: SumModelOptions ) {
    const options = optionize<SumModelOptions, SelfOptions, NumberPairsModelOptions>()( {
      initialCountingRepresentationType: CountingRepresentationType.CUBES
    }, providedOptions );

    const sumProperty = new NumberProperty( NumberPairsConstants.SUM_INITIAL_SUM_VALUE, {
      range: SCENE_RANGE,
      tandem: options.tandem.createTandem( 'sumProperty' )
    } );

    const leftAddendNumberProperty = new NumberProperty( NumberPairsConstants.SUM_INITIAL_LEFT_ADDEND_VALUE, {
      range: SCENE_RANGE,
      tandem: options.tandem.createTandem( 'leftAddendNumberProperty' )
    } );

    const initialRightAddendValue = sumProperty.value - leftAddendNumberProperty.value;
    const rightAddendNumberProperty = new NumberProperty( initialRightAddendValue, {
      range: SCENE_RANGE,
      tandem: options.tandem.createTandem( 'rightAddendNumberProperty' )
    } );

    super( sumProperty, leftAddendNumberProperty, rightAddendNumberProperty, options );

    this.sumProperty = sumProperty;
    this.leftAddendNumberProperty = leftAddendNumberProperty;
    this.rightAddendNumberProperty = rightAddendNumberProperty;
  }

  /**
   * Resets the model.
   */
  public override reset(): void {
    super.reset();
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