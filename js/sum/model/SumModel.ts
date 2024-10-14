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
import createObservableArray, { ObservableArray, ObservableArrayIO } from '../../../../axon/js/createObservableArray.js';
import CountingObject from '../../common/model/CountingObject.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
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

  public override readonly leftAddendNumberProperty: Property<number>;
  public readonly leftAddendRangeProperty: TReadOnlyProperty<Range>;

  // The right addend is derived due to competing user interactions in the Sum Screen.
  // You can find more information in this issue: https://github.com/phetsims/number-pairs/issues/17
  public override readonly rightAddendNumberProperty: TReadOnlyProperty<number>;
  public override readonly totalNumberProperty: Property<number>;
  public readonly totalRangeProperty: Property<Range>;

  public readonly inactiveCountingObjects: ObservableArray<CountingObject>;
  public readonly updateRangePropertiesEmitter: Emitter;

  public constructor( providedOptions: SumModelOptions ) {
    const options = optionize<SumModelOptions, SelfOptions, NumberPairsModelOptions>()( {
      initialCountingRepresentationType: CountingRepresentationType.CUBES
    }, providedOptions );

    const leftAddendNumberProperty = new NumberProperty( NumberPairsConstants.SUM_INITIAL_LEFT_ADDEND_VALUE, {
      numberType: 'Integer',
      range: SCENE_RANGE,
      tandem: options.tandem.createTandem( 'leftAddendNumberProperty' )
    } );

    const totalNumberProperty = new NumberProperty( NumberPairsConstants.SUM_INITIAL_LEFT_ADDEND_VALUE + NumberPairsConstants.SUM_INITIAL_RIGHT_ADDEND_VALUE, {
      tandem: options.tandem.createTandem( 'totalNumberProperty' ),
      numberType: 'Integer',
      range: SCENE_RANGE
    } );

    const rightAddendNumberProperty = new DerivedProperty( [ leftAddendNumberProperty, totalNumberProperty ], ( leftAddend, total ) => {
        return total - leftAddend;
      },
      {
        phetioValueType: NumberIO,
        tandem: options.tandem.createTandem( 'rightAddendNumberProperty' )
      } );

    const leftAddendObjects: ObservableArray<CountingObject> = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'leftAddendObjects' )
    } );
    const rightAddendObjects: ObservableArray<CountingObject> = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'rightAddendObjects' )
    } );


    // The sumModel does not have scenes, and therefore only has one set of observableArray for each addend.
    super(
      totalNumberProperty,
      leftAddendNumberProperty,
      rightAddendNumberProperty,
      new Property( leftAddendObjects ),
      new Property( rightAddendObjects ),
      SCENE_RANGE.max,
      options
    );

    this.leftAddendNumberProperty = leftAddendNumberProperty;
    this.rightAddendNumberProperty = rightAddendNumberProperty;
    this.totalNumberProperty = totalNumberProperty;

    this.inactiveCountingObjects = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'inactiveCountingObjects' )
    } );

    this.registerObservableArrays( leftAddendObjects, rightAddendObjects );

    this.countingObjects.forEach( countingObject => {
      this.inactiveCountingObjects.push( countingObject );
    } );
    _.times( leftAddendNumberProperty.value, () => {
      const countingObject = this.inactiveCountingObjects.shift();
      assert && assert( countingObject, 'no more inactive counting objects' );
      leftAddendObjects.push( countingObject! );
    } );
    _.times( rightAddendNumberProperty.value, () => {
      const countingObject = this.inactiveCountingObjects.shift();
      assert && assert( countingObject, 'no more inactive counting objects' );
      rightAddendObjects.push( countingObject! );
    } );
    assert && assert( leftAddendObjects.length + rightAddendObjects.length === this.totalNumberProperty.value, 'leftAddendObjects.length + rightAddendObjects.length should equal total' );


    // Listen to the rightAddendNumberProperty since it is derived and will therefore be updated last.
    this.rightAddendNumberProperty.lazyLink( rightAddendValue => {
      const leftAddendDelta = this.leftAddendNumberProperty.value - leftAddendObjects.length;
      const rightAddendDelta = rightAddendValue - rightAddendObjects.length;
      console.log( 'leftAddendDelta', leftAddendDelta, 'rightAddendDelta', rightAddendDelta );

      assert && assert( Math.sign( leftAddendDelta ) !== Math.sign( rightAddendDelta ), 'leftAddendDelta and rightAddendDelta should have opposite signs' );

      if ( Math.sign( leftAddendDelta ) === 1 ) {
        _.times( leftAddendDelta, () => {
          const countingObject = this.inactiveCountingObjects.pop();
          assert && assert( countingObject, 'rightAddendObjects should not be empty' );
          leftAddendObjects.push( countingObject! );
        } );
      }
      else {
        _.times( Math.abs( leftAddendDelta ), () => {
          const countingObject = leftAddendObjects.pop();
          assert && assert( countingObject, 'leftAddendObjects should not be empty' );
          this.inactiveCountingObjects.push( countingObject! );
        } );
      }

      if ( Math.sign( rightAddendDelta ) === 1 ) {
        _.times( rightAddendDelta, () => {
          const countingObject = this.inactiveCountingObjects.pop();
          assert && assert( countingObject, 'rightAddendObjects should not be empty' );
          rightAddendObjects.push( countingObject! );
        } );
      }
      else {
        _.times( Math.abs( rightAddendDelta ), () => {
          const countingObject = rightAddendObjects.pop();
          assert && assert( countingObject, 'leftAddendObjects should not be empty' );
          this.inactiveCountingObjects.push( countingObject! );
        } );
      }

      assert && assert( this.leftAddendNumberProperty.value === leftAddendObjects.length, 'leftAddendNumberProperty should match leftAddendObjects length' );
      assert && assert( this.rightAddendNumberProperty.value === rightAddendObjects.length, 'rightAddendNumberProperty should match rightAddendObjects length' );
      assert && assert( leftAddendObjects.length + rightAddendObjects.length === this.totalNumberProperty.value, 'leftAddendObjects.length + rightAddendObjects.length should equal total' );
    } );

    leftAddendObjects.lengthProperty.link( leftAddend => {
      console.log( 'leftAddendObjects.lengthProperty.link', leftAddend );
      this.leftAddendNumberProperty.value = leftAddend;
    } );

    this.leftAddendRangeProperty = new Property( new Range( NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.min, NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.max - this.rightAddendNumberProperty.value ), {
      phetioValueType: Range.RangeIO,
      tandem: options.tandem.createTandem( 'leftAddendRangeProperty' )
    } );
    this.totalRangeProperty = new Property( NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE, {
      phetioValueType: Range.RangeIO,
      tandem: options.tandem.createTandem( 'totalRangeProperty' )
    } );

    this.updateRangePropertiesEmitter = new Emitter( {
      tandem: options.tandem.createTandem( 'updateRangePropertiesEmitter' )
    } );
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