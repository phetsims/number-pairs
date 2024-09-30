// Copyright 2024, University of Colorado Boulder

/**
 * SumModel is the top-level model for the 'Sum' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberPairsModel, { CountingRepresentationType, NumberPairsModelOptions } from '../../common/model/NumberPairsModel.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import Range from '../../../../dot/js/Range.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';

type SelfOptions = {
  //TODO add options that are specific to SumModel here
};

type SumModelOptions = SelfOptions &
  PickRequired<NumberPairsModelOptions, 'tandem'>
  & StrictOmit<NumberPairsModelOptions, 'initialCountingRepresentationType'>;

const SCENE_RANGE = new Range( NumberPairsConstants.TEN_TOTAL_RANGE.min, NumberPairsConstants.TWENTY_TOTAL_RANGE.max );

export default class SumModel extends NumberPairsModel {

  public constructor( providedOptions: SumModelOptions ) {
    const options = optionize<SumModelOptions, SelfOptions, NumberPairsModelOptions>()( {
      initialCountingRepresentationType: CountingRepresentationType.CUBES
    }, providedOptions );

    const totalProperty = new NumberProperty( NumberPairsConstants.SUM_INITIAL_SUM_VALUE, {
      range: SCENE_RANGE,
      tandem: options.tandem.createTandem( 'totalProperty' )
    } );

    const leftAddendNumberProperty = new NumberProperty( NumberPairsConstants.SUM_INITIAL_LEFT_ADDEND_VALUE, {
      range: SCENE_RANGE,
      tandem: options.tandem.createTandem( 'leftAddendNumberProperty' )
    } );

    // The right addend value is the only value that is not required to be directly set by a component controlled
    // by the user. Therefore, it is derived from the total and left addend values.
    const rightAddendNumberProperty = new DerivedProperty( [ totalProperty, leftAddendNumberProperty ],
      ( total: number, leftAddend: number ) => {
        return total - leftAddend;
      }, {
        tandem: options.tandem.createTandem( 'rightAddendNumberProperty' ),
        phetioValueType: NumberIO
      } );

    super( totalProperty, leftAddendNumberProperty, rightAddendNumberProperty, options );
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