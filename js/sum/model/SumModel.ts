// Copyright 2024, University of Colorado Boulder

/**
 * SumModel is the top-level model for the 'Sum' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberPairsModel, { NumberPairsModelOptions } from '../../common/model/NumberPairsModel.js';
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
import RepresentationType from '../../common/model/RepresentationType.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';

type SelfOptions = {
  //TODO add options that are specific to SumModel here
};

type SumModelOptions = SelfOptions &
  PickRequired<NumberPairsModelOptions, 'tandem'>
  & StrictOmit<NumberPairsModelOptions, 'initialRepresentationType'>;

const SCENE_RANGE = new Range( NumberPairsConstants.TEN_TOTAL_RANGE.min, NumberPairsConstants.TWENTY_TOTAL_RANGE.max );

export default class SumModel extends NumberPairsModel {

  public override readonly leftAddendProperty: Property<number>;

  // The right addend is derived due to competing user interactions in the Sum Screen.
  // You can find more information in this issue: https://github.com/phetsims/number-pairs/issues/17
  public override readonly rightAddendProperty: TReadOnlyProperty<number>;
  public override readonly totalProperty: Property<number>;

  public readonly inactiveCountingObjects: ObservableArray<CountingObject>;

  public constructor( providedOptions: SumModelOptions ) {
    const options = optionize<SumModelOptions, SelfOptions, NumberPairsModelOptions>()( {
      initialRepresentationType: RepresentationType.CUBES
    }, providedOptions );

    const leftAddendProperty = new NumberProperty( NumberPairsConstants.SUM_INITIAL_LEFT_ADDEND_VALUE, {
      numberType: 'Integer',
      range: SCENE_RANGE,
      tandem: options.tandem.createTandem( 'leftAddendProperty' )
    } );

    const totalProperty = new NumberProperty(
      NumberPairsConstants.SUM_INITIAL_LEFT_ADDEND_VALUE + NumberPairsConstants.SUM_INITIAL_RIGHT_ADDEND_VALUE, {
        tandem: options.tandem.createTandem( 'totalProperty' ),
        numberType: 'Integer',
        range: SCENE_RANGE
      } );

    const rightAddendProperty = new DerivedProperty( [ leftAddendProperty, totalProperty ], ( leftAddend, total ) => {
        const newValue: number = total - leftAddend;
        assert && assert( SCENE_RANGE.contains( newValue ), 'rightAddendProperty out of range' );
        return newValue;
      },
      {
        phetioValueType: NumberIO,
        tandem: options.tandem.createTandem( 'rightAddendProperty' )
      } );

    const leftAddendObjects: ObservableArray<CountingObject> = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'leftAddendObjects' )
    } );
    const rightAddendObjects: ObservableArray<CountingObject> = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'rightAddendObjects' )
    } );

    const initialBeadXPositions: number[] = [];
    _.times( totalProperty.value, i => {
      const leftAddend = leftAddendProperty.value;
      const position = i < leftAddend ? i + NumberPairsConstants.LEFTMOST_BEAD_X :
                       i - leftAddend + NumberPairsModel.calculateBeadSeparatorPlacement( leftAddend );
      initialBeadXPositions.push( position );
    } );
    const beadXPositionsProperty = new Property<number[]>( initialBeadXPositions, {
      tandem: options.tandem.createTandem( 'beadXPositionsProperty' ),
      phetioValueType: ArrayIO( NumberIO )
    } );

    // The sumModel does not have scenes, and therefore only has one set of observableArray for each addend.
    super(
      totalProperty,
      leftAddendProperty,
      rightAddendProperty,
      new Property( leftAddendObjects ),
      new Property( rightAddendObjects ),
      beadXPositionsProperty,
      SCENE_RANGE.max,
      options
    );

    this.leftAddendProperty = leftAddendProperty;
    this.rightAddendProperty = rightAddendProperty;
    this.totalProperty = totalProperty;

    this.inactiveCountingObjects = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'inactiveCountingObjects' )
    } );

    this.registerObservableArrays( leftAddendObjects, rightAddendObjects, this.inactiveCountingObjects );

    this.countingObjects.forEach( countingObject => {
      this.inactiveCountingObjects.push( countingObject );
    } );
    _.times( leftAddendProperty.value, () => {
      const countingObject = this.inactiveCountingObjects.shift();
      assert && assert( countingObject, 'no more inactive counting objects' );
      leftAddendObjects.push( countingObject! );
    } );
    _.times( rightAddendProperty.value, () => {
      const countingObject = this.inactiveCountingObjects.shift();
      assert && assert( countingObject, 'no more inactive counting objects' );
      rightAddendObjects.push( countingObject! );
    } );
    assert && assert( leftAddendObjects.length + rightAddendObjects.length === this.totalProperty.value, 'leftAddendObjects.length + rightAddendObjects.length should equal total' );


    // Listen to the rightAddendProperty since it is derived and will therefore be updated last.
    this.rightAddendProperty.lazyLink( rightAddendValue => {
      const leftAddendDelta = this.leftAddendProperty.value - leftAddendObjects.length;
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


      assert && assert( this.leftAddendProperty.value === leftAddendObjects.length, 'leftAddendProperty should match leftAddendObjects length' );
      assert && assert( this.rightAddendProperty.value === rightAddendObjects.length, 'rightAddendProperty should match rightAddendObjects length' );
      assert && assert( leftAddendObjects.length + rightAddendObjects.length === this.totalProperty.value, 'leftAddendObjects.length + rightAddendObjects.length should equal total' );
    } );

    leftAddendObjects.lengthProperty.link( leftAddend => {
      this.leftAddendProperty.value = leftAddend;
    } );

    this.createNumberLineEnabledRangeLinks();

    // Link to the countingObject.addendTypeProperty at the end of construction to avoid triggering duplicate work
    // that is handled manually above.
    this.countingObjects.forEach( countingObject => {
      this.createCountingObjectAddendTypeLinks( countingObject );
    } );
  }

  /**
   * Resets the model.
   */
  public override reset(): void {
    super.reset();
    this.leftAddendProperty.reset();
    this.totalProperty.reset();

  }
}

numberPairs.register( 'SumModel', SumModel );