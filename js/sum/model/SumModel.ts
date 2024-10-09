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
import createObservableArray, { ObservableArray, ObservableArrayIO } from '../../../../axon/js/createObservableArray.js';
import CountingObject from '../../common/model/CountingObject.js';
import Property from '../../../../axon/js/Property.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = {
  //TODO add options that are specific to SumModel here
};

type SumModelOptions = SelfOptions &
  PickRequired<NumberPairsModelOptions, 'tandem'>
  & StrictOmit<NumberPairsModelOptions, 'initialCountingRepresentationType'>;

const SCENE_RANGE = new Range( NumberPairsConstants.TEN_TOTAL_RANGE.min, NumberPairsConstants.TWENTY_TOTAL_RANGE.max );

export default class SumModel extends NumberPairsModel {

  public override readonly rightAddendNumberProperty: Property<number>;
  public override readonly leftAddendNumberProperty: Property<number>;
  public readonly leftAddendRangeProperty: TReadOnlyProperty<Range>;
  public readonly rightAddendRangeProperty: TReadOnlyProperty<Range>;
  public readonly inactiveCountingObjects: ObservableArray<CountingObject>;

  // This Property is used to provide an interface for the number line slider and then updates the observable array
  // accordingly. leftAddendProxyProperty's value is updated by the slider and the leftAddendNumberProperty.
  // Although this loop creates a possibility for reentrant behavior, the values should stabilize after completing
  // one cycle.
  public readonly leftAddendProxyProperty: Property<number>;

  // TODO: A proxy property will probably need to be created for studio for the right and left addends as well.
  public readonly addendsStableProperty: Property<boolean>;

  public constructor( providedOptions: SumModelOptions ) {
    const options = optionize<SumModelOptions, SelfOptions, NumberPairsModelOptions>()( {
      initialCountingRepresentationType: CountingRepresentationType.CUBES
    }, providedOptions );

    const addendsStableProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'addendsStableProperty' ),
      phetioReadOnly: true,
      phetioFeatured: false
    } );

    const leftAddendNumberProperty = new NumberProperty( NumberPairsConstants.SUM_INITIAL_LEFT_ADDEND_VALUE, {
      numberType: 'Integer',
      range: SCENE_RANGE,
      tandem: options.tandem.createTandem( 'leftAddendNumberProperty' )
    } );

    const rightAddendNumberProperty = new NumberProperty( NumberPairsConstants.SUM_INITIAL_RIGHT_ADDEND_VALUE, {
      numberType: 'Integer',
      range: SCENE_RANGE,
      tandem: options.tandem.createTandem( 'rightAddendNumberProperty' )
    } );

    const totalProperty = new DerivedProperty( [ leftAddendNumberProperty, rightAddendNumberProperty ],
      ( leftAddend: number, rightAddend: number ) => leftAddend + rightAddend, {
        tandem: options.tandem.createTandem( 'totalProperty' ),
        phetioValueType: NumberIO
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
      totalProperty,
      leftAddendNumberProperty,
      rightAddendNumberProperty,
      new Property( leftAddendObjects ),
      new Property( rightAddendObjects ),
      SCENE_RANGE.max,
      options
    );

    this.leftAddendNumberProperty = leftAddendNumberProperty;
    this.rightAddendNumberProperty = rightAddendNumberProperty;

    // NumberProperty that links to the LeftAddendNumberProperty.
    // Link to proxy to update the observable array
    this.leftAddendProxyProperty = new NumberProperty( leftAddendNumberProperty.value, {
      numberType: 'Integer',
      tandem: options.tandem.createTandem( 'leftAddendProxyProperty' ),
      phetioReadOnly: true,
      phetioFeatured: false
    } );
    this.addendsStableProperty = addendsStableProperty;

    this.inactiveCountingObjects = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'inactiveCountingObjects' )
    } );

    this.registerObservableArrays( leftAddendObjects, rightAddendObjects );

    this.countingObjects.forEach( countingObject => {
      this.inactiveCountingObjects.push( countingObject );
    } );
    _.times( this.leftAddendNumberProperty.value, () => {
      const countingObject = this.inactiveCountingObjects.shift();
      assert && assert( countingObject, 'no more inactive counting objects' );
      leftAddendObjects.push( countingObject! );
    } );
    _.times( this.rightAddendNumberProperty.value, () => {
      const countingObject = this.inactiveCountingObjects.shift();
      assert && assert( countingObject, 'no more inactive counting objects' );
      rightAddendObjects.push( countingObject! );
    } );
    assert && assert( leftAddendObjects.length + rightAddendObjects.length === this.totalNumberProperty.value, 'leftAddendObjects.length + rightAddendObjects.length should equal total' );


    // The left addend proxy Property controls both the left/right addend ObservableArrays. The leftAddendNumberProperty
    // should not update observable arrays. That logic should only be handled by the proxy Property to avoid
    // malicious reentrant behavior.
    this.leftAddendProxyProperty.lazyLink( ( newValue, oldValue ) => {
      const delta = newValue - oldValue;
      if ( delta > 0 && this.addendsStableProperty.value ) {
        _.times( delta, () => {
          const countingObject = rightAddendObjects.pop();
          assert && assert( countingObject, 'rightAddendObjects should not be empty' );
          leftAddendObjects.push( countingObject! );
        } );
      }
      else if ( delta < 0 && this.addendsStableProperty.value ) {
        this.addendsStableProperty.value = false;
        _.times( -delta, () => {
          const countingObject = leftAddendObjects.pop();
          assert && assert( countingObject, 'leftAddendObjects should not be empty' );
          rightAddendObjects.push( countingObject! );
        } );
        this.addendsStableProperty.value = true;
      }
    } );
    this.leftAddendNumberProperty.lazyLink( leftAddend => {
      this.leftAddendProxyProperty.value = leftAddend;
    } );

    leftAddendObjects.lengthProperty.link( leftAddend => {
      this.leftAddendNumberProperty.value = leftAddend;
    } );
    rightAddendObjects.lengthProperty.link( rightAddend => {
      this.rightAddendNumberProperty.value = rightAddend;
    } );

    this.leftAddendRangeProperty = new DerivedProperty( [ this.rightAddendNumberProperty, this.addendsStableProperty ],
      ( rightAddend, addendsStable ) => {
        return addendsStable ? new Range( NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.min, NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.max - rightAddend ) :
          new Range( NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.min, NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.max );
      } );
    this.rightAddendRangeProperty = new DerivedProperty( [ this.leftAddendNumberProperty, this.addendsStableProperty ],
      ( leftAddend, addendsStable ) => {
        return addendsStable ? new Range( NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.min, NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.max - leftAddend ) :
          new Range( NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.min, NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.max );
      } );

    this.addendsStableProperty.value = true;
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