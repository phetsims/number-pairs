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

  // The right addend is derived due to competing user interactions in the Sum Screen.
  // You can find more information in this issue: https://github.com/phetsims/number-pairs/issues/17
  public override readonly rightAddendNumberProperty: TReadOnlyProperty<number>;
  public override readonly totalNumberProperty: Property<number>;

  public readonly inactiveCountingObjects: ObservableArray<CountingObject>;

  public constructor( providedOptions: SumModelOptions ) {
    const options = optionize<SumModelOptions, SelfOptions, NumberPairsModelOptions>()( {
      initialCountingRepresentationType: CountingRepresentationType.CUBES
    }, providedOptions );

    const leftAddendNumberProperty = new NumberProperty( NumberPairsConstants.SUM_INITIAL_LEFT_ADDEND_VALUE, {
      numberType: 'Integer',
      range: SCENE_RANGE,
      tandem: options.tandem.createTandem( 'leftAddendNumberProperty' )
    } );

    const totalNumberProperty = new NumberProperty(
      NumberPairsConstants.SUM_INITIAL_LEFT_ADDEND_VALUE + NumberPairsConstants.SUM_INITIAL_RIGHT_ADDEND_VALUE, {
      tandem: options.tandem.createTandem( 'totalNumberProperty' ),
      numberType: 'Integer',
      range: SCENE_RANGE
    } );

    const rightAddendNumberProperty = new DerivedProperty( [ leftAddendNumberProperty, totalNumberProperty ], ( leftAddend, total ) => {
        const newValue = total - leftAddend;
        assert && assert( SCENE_RANGE.contains( newValue ), 'rightAddendNumberProperty out of range' );
        return newValue;
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

    this.registerObservableArrays( leftAddendObjects, rightAddendObjects, this.inactiveCountingObjects );

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

      if ( leftAddendDelta + rightAddendDelta === 0 ) {

        if ( leftAddendDelta > 0 ) {
          assert && assert( rightAddendObjects.length >= leftAddendDelta, 'not enough right addend objects' );
          leftAddendObjects.push( ...rightAddendObjects.splice( 0, leftAddendDelta ) );

        }
        else if ( rightAddendDelta > 0 ) {
          assert && assert( leftAddendObjects.length >= rightAddendDelta, 'not enough right addend objects' );
          rightAddendObjects.push( ...leftAddendObjects.splice( 0, rightAddendDelta ) );
        }
      }
      else {
        if ( rightAddendDelta > 0 ) {
          assert && assert( this.inactiveCountingObjects.length >= rightAddendDelta, 'not enough inactive counting objects' );

          // We use the immutable `slice` here because removing and item from the inactiveCountingObjects array
          // should be handled by the addend specific ObservableArray.
          rightAddendObjects.push( ...this.inactiveCountingObjects.slice( 0, rightAddendDelta ) );
        }
        else if ( rightAddendDelta < 0 ) {
          rightAddendObjects.splice( rightAddendDelta, -rightAddendDelta );
        }

        if ( leftAddendDelta > 0 ) {
          assert && assert( this.inactiveCountingObjects.length >= leftAddendDelta, 'not enough inactive counting objects' );
          leftAddendObjects.push( ...this.inactiveCountingObjects.slice( 0, leftAddendDelta ) );
        }
        else if ( leftAddendDelta < 0 ) {
          leftAddendObjects.splice( leftAddendDelta, -leftAddendDelta );
        }
      }


      assert && assert( this.leftAddendNumberProperty.value === leftAddendObjects.length, 'leftAddendNumberProperty should match leftAddendObjects length' );
      assert && assert( this.rightAddendNumberProperty.value === rightAddendObjects.length, 'rightAddendNumberProperty should match rightAddendObjects length' );
      assert && assert( leftAddendObjects.length + rightAddendObjects.length === this.totalNumberProperty.value, 'leftAddendObjects.length + rightAddendObjects.length should equal total' );
    } );

    leftAddendObjects.lengthProperty.link( leftAddend => {
      this.leftAddendNumberProperty.value = leftAddend;
    } );

    this.createNumberLineEnabledRangeLinks();
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