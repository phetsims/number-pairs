// Copyright 2024-2025, University of Colorado Boulder

/**
 * SumModel is the top-level model for the 'Sum' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import createObservableArray, { ObservableArray, ObservableArrayIO } from '../../../../axon/js/createObservableArray.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import CountingObject from '../../common/model/CountingObject.js';
import NumberPairsModel, { BeadXPositionsTypes, NumberPairsModelOptions } from '../../common/model/NumberPairsModel.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';

type SelfOptions = EmptySelfOptions;

type SumModelOptions = SelfOptions &
  PickRequired<NumberPairsModelOptions, 'tandem'>
  & StrictOmit<NumberPairsModelOptions, 'initialRepresentationType' | 'numberOfCountingObjects' | 'isSumScreen'>;

const SCENE_RANGE = new Range( NumberPairsConstants.TEN_TOTAL_RANGE.min, NumberPairsConstants.TWENTY_TOTAL_RANGE.max );

export default class SumModel extends NumberPairsModel {

  public override readonly leftAddendProperty: Property<number>;

  // The right addend is derived due to competing user interactions in the Sum Screen.
  // You can find more information in this issue: https://github.com/phetsims/number-pairs/issues/17
  public override readonly rightAddendProperty: TReadOnlyProperty<number>;
  public override readonly totalProperty: NumberProperty; // NumberProperty because we need setValueAndRange.

  public readonly inactiveCountingObjects: ObservableArray<CountingObject>;

  // This Property is only created in the sumModel to satisfy requirements for NumberPairsModel. It does not
  // need to be instrumented for PhET-iO.
  public readonly beadXPositionsProperty: Property<BeadXPositionsTypes>;

  public constructor( providedOptions: SumModelOptions ) {
    const options = optionize<SumModelOptions, SelfOptions, NumberPairsModelOptions>()( {
      initialRepresentationType: RepresentationType.BEADS,
      numberOfCountingObjects: SCENE_RANGE.max,
      isSumScreen: true
    }, providedOptions );

    const leftAddendProperty = new NumberProperty( NumberPairsConstants.SUM_INITIAL_LEFT_ADDEND_VALUE, {
      numberType: 'Integer',
      range: SCENE_RANGE,
      hasListenerOrderDependencies: true,
      tandem: options.tandem.createTandem( 'leftAddendProperty' )
    } );

    const totalProperty = new NumberProperty(
      NumberPairsConstants.SUM_INITIAL_LEFT_ADDEND_VALUE + NumberPairsConstants.SUM_INITIAL_RIGHT_ADDEND_VALUE, {
        tandem: options.tandem.createTandem( 'totalProperty' ),
        phetioFeatured: true,
        numberType: 'Integer',
        hasListenerOrderDependencies: true,
        range: new Range( leftAddendProperty.value, SCENE_RANGE.max )
      } );

    const rightAddendProperty: TReadOnlyProperty<number> = new DerivedProperty( [ leftAddendProperty, totalProperty ], ( leftAddend, total ) => {
        const newValue: number = total - leftAddend;

        // We may hit intermediate values that are outside the scene range when resetting all,
        // so we need to handle this case.
        if ( isResettingAllProperty.value && !SCENE_RANGE.contains( newValue ) ) {
          return rightAddendProperty.value;
        }
        else {
          assert && assert( SCENE_RANGE.contains( newValue ), 'rightAddendProperty out of range' );
          return newValue;
        }
      },
      {
        phetioValueType: NumberIO,
        tandem: options.tandem.createTandem( 'rightAddendProperty' )
      } );

    const countingObjects = NumberPairsModel.createCountingObjects( SCENE_RANGE.max, leftAddendProperty.value, rightAddendProperty.value, options.tandem );
    const inactiveCountingObjects = countingObjects.slice();
    const initialLeftAddendObjects: CountingObject[] = [];
    const initialRightAddendObjects: CountingObject[] = [];
    _.times( leftAddendProperty.value, () => {
      const countingObject = inactiveCountingObjects.shift();
      initialLeftAddendObjects.push( countingObject! );
    } );
    _.times( rightAddendProperty.value, () => {

      // We want to pull from the end of the inactiveCountingObjects array to keep as much consistency as possible
      // between which countingObjects belong to which addend in the initial state.
      const countingObject = inactiveCountingObjects.pop();
      initialRightAddendObjects.push( countingObject! );
    } );

    const leftAddendObjects: ObservableArray<CountingObject> = createObservableArray( {
      elements: initialLeftAddendObjects,
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'leftAddendObjects' )
    } );
    const leftAddendCountingObjectsProperty = new Property( leftAddendObjects );
    const rightAddendObjects: ObservableArray<CountingObject> = createObservableArray( {
      elements: initialRightAddendObjects,
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'rightAddendObjects' )
    } );
    const rightAddendCountingObjectsProperty = new Property( rightAddendObjects );

    const beadXPositionsProperty = new Property<BeadXPositionsTypes>( {
      leftAddendXPositions: leftAddendObjects.map( countingObject => countingObject.beadXPositionProperty.value ),
      rightAddendXPositions: rightAddendObjects.map( countingObject => countingObject.beadXPositionProperty.value )
    } );


    // The sumModel does not have scenes, and therefore only has one set of observableArray for each addend.
    super(
      totalProperty,
      leftAddendProperty,
      rightAddendProperty,
      leftAddendCountingObjectsProperty,
      rightAddendCountingObjectsProperty,
      countingObjects,
      new BooleanProperty( false ),
      options
    );

    this.leftAddendProperty = leftAddendProperty;
    this.rightAddendProperty = rightAddendProperty;
    this.totalProperty = totalProperty;
    this.beadXPositionsProperty = beadXPositionsProperty;

    this.inactiveCountingObjects = createObservableArray( {
      elements: inactiveCountingObjects,
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'inactiveCountingObjects' )
    } );

    NumberPairsModel.setAddendType( leftAddendObjects, rightAddendObjects, this.inactiveCountingObjects );
    this.registerObservableArrays( leftAddendObjects, rightAddendObjects, this.inactiveCountingObjects );
    assert && assert( leftAddendObjects.length + rightAddendObjects.length === this.totalProperty.value, 'leftAddendObjects.length + rightAddendObjects.length should equal total' );


    // Listen to the rightAddendProperty since it is derived and will therefore be updated last.
    this.rightAddendProperty.lazyLink( rightAddendValue => {
      if ( isResettingAllProperty.value || isSettingPhetioStateProperty.value ) {
        // No_op. We can rely on our observable arrays and Properties to have the correct state. This link fires before
        // counting objects have been distributed to observable arrays properly in both state setting and reset
        // scenarios.
        return;
      }
      const leftAddendDelta = this.leftAddendProperty.value - leftAddendObjects.length;
      const rightAddendDelta = rightAddendValue - rightAddendObjects.length;

      if ( leftAddendDelta + rightAddendDelta === 0 ) {
        if ( leftAddendDelta > 0 ) {
          assert && assert( rightAddendObjects.length >= leftAddendDelta, 'not enough right addend objects' );

          // Remove from the end of the array to create a less jarring experience for the user.
          leftAddendObjects.push( ...rightAddendObjects.splice( -leftAddendDelta, leftAddendDelta ) );
        }
        else if ( rightAddendDelta > 0 ) {
          assert && assert( leftAddendObjects.length >= rightAddendDelta, 'not enough right addend objects' );

          // Remove from the end of the array to create a less jarring experience for the user.
          rightAddendObjects.push( ...leftAddendObjects.splice( -rightAddendDelta, rightAddendDelta ) );
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
    this.leftAddendProperty.link( leftAddend => {
      const newRange = new Range( leftAddend, totalProperty.range.max );
      newRange.contains( this.totalProperty.value ) ? this.totalProperty.rangeProperty.value = newRange : this.totalProperty.setValueAndRange( leftAddend, newRange );
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
    this.totalProperty.resetValueAndRange();
    this.leftAddendCountingObjectsProperty.value.reset();
    this.rightAddendCountingObjectsProperty.value.reset();
    this.inactiveCountingObjects.reset();


    // Once all the observable arrays have been reset we can set the addendType for each counting object.
    NumberPairsModel.setAddendType( this.leftAddendCountingObjectsProperty.value, this.rightAddendCountingObjectsProperty.value, this.inactiveCountingObjects );
  }
}

numberPairs.register( 'SumModel', SumModel );