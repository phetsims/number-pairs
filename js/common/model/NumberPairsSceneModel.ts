// Copyright 2024, University of Colorado Boulder
/**
 * NumberPairsSceneModel is the model for the scene in the Number Pairs simulation.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */
import numberPairs from '../../numberPairs.js';
import createObservableArray, { ObservableArray, ObservableArrayIO } from '../../../../axon/js/createObservableArray.js';
import CountingObject from './CountingObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import Property from '../../../../axon/js/Property.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';


export default class NumberPairsSceneModel {

  // The sum as initialized by the values provided to the constructor. This is a constant.
  public readonly SUM: number;

  // The leftAddendNumberProperty handles adding or removing CountingObjects from the leftAddendObjects array.
  public readonly leftAddendNumberProperty: Property<number>;
  public readonly leftAddendObjects: ObservableArray<CountingObject>;

  // The rightAddendNumberProperty handles adding or removing CountingObjects from the rightAddendObjects array.
  public readonly rightAddendNumberProperty: Property<number>;
  public readonly rightAddendObjects: ObservableArray<CountingObject>;

  private addendsStable = false;

  public constructor( initialLeftAddendValue: number, initialRightAddendValue: number, tandem: Tandem ) {

    this.SUM = initialLeftAddendValue + initialRightAddendValue;
    const sceneRange = new Range( 0, this.SUM );

    this.leftAddendNumberProperty = new NumberProperty( initialLeftAddendValue, {
      range: sceneRange,
      numberType: 'Integer',
      tandem: tandem.createTandem( 'leftAddendNumberProperty' )
    } );
    this.leftAddendObjects = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: tandem.createTandem( 'leftAddendObjects' )
    } );

    this.rightAddendNumberProperty = new NumberProperty( initialRightAddendValue, {
      range: sceneRange,
      numberType: 'Integer',
      tandem: tandem.createTandem( 'rightAddendNumberProperty' )
    } );
    this.rightAddendObjects = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: tandem.createTandem( 'rightAddendObjects' )
    } );

    _.times( initialLeftAddendValue, () => {
      this.leftAddendObjects.push( new CountingObject() );
    } );
    _.times( initialRightAddendValue, () => {
      this.rightAddendObjects.push( new CountingObject() );
    } );

    assert && assert( this.leftAddendObjects.length + this.rightAddendObjects.length === this.SUM, 'leftAddendObjects.length + rightAddendObjects.length should equal sum' );

    // TODO: is addendsStable necessary? Currently feels like an extra precaution in case updateCountingObjects is called
    //  in more places.
    this.addendsStable = true;
    this.leftAddendNumberProperty.link( value => {
      this.addendsStable = false;
      this.rightAddendNumberProperty.value = this.SUM - value;
      if ( value + this.rightAddendNumberProperty.value === this.SUM ) {
        this.addendsStable = true;
      }
      this.updateCountingObjects();
    } );

    this.rightAddendNumberProperty.link( value => {
      this.addendsStable = false;
      this.leftAddendNumberProperty.value = this.SUM - value;
      if ( value + this.leftAddendNumberProperty.value === this.SUM ) {
        this.addendsStable = true;
      }
      this.updateCountingObjects();
    } );
  }

  // TODO: There is still work to do here. Clean it up and document.
  // TODO: Is having this many assertions a red flag... CM am I overthinking this?
  private updateCountingObjects(): void {
    if ( this.addendsStable ) {
      const leftAddendDelta = this.leftAddendNumberProperty.value - this.leftAddendObjects.length;
      const rightAddendDelta = this.rightAddendNumberProperty.value - this.rightAddendObjects.length;

      if ( leftAddendDelta === 0 || rightAddendDelta === 0 ) {

        assert && assert( leftAddendDelta === 0 && rightAddendDelta === 0, 'leftAddendDelta and rightAddendDelta should both be 0' );
        return;
      }
      else {
        assert && assert( Math.sign( leftAddendDelta ) !== Math.sign( rightAddendDelta ), 'leftAddendDelta and rightAddendDelta should have opposite signs' );

        if ( Math.sign( leftAddendDelta ) === 1 ) {
          _.times( leftAddendDelta, () => {
            const countingObject = this.rightAddendObjects.pop();
            assert && assert( countingObject, 'rightAddendObjects should not be empty' );
            this.leftAddendObjects.push( countingObject! );
          } );
        }
        else {
          _.times( Math.abs( leftAddendDelta ), () => {
            const countingObject = this.leftAddendObjects.pop();
            assert && assert( countingObject, 'leftAddendObjects should not be empty' );
            this.rightAddendObjects.push( countingObject! );
          } );
        }
      }

      assert && assert( this.leftAddendNumberProperty.value === this.leftAddendObjects.length, 'leftAddendNumberProperty should match leftAddendObjects length' );
      assert && assert( this.rightAddendNumberProperty.value === this.rightAddendObjects.length, 'rightAddendNumberProperty should match rightAddendObjects length' );
      assert && assert( this.leftAddendObjects.length + this.rightAddendObjects.length === this.SUM, 'leftAddendObjects.length + rightAddendObjects.length should equal sum' );
    }
  }

  public static NumberPairsSceneModelIO = new IOType( 'NumberPairsSceneModelIO', {
    valueType: NumberPairsSceneModel
  } );
}

numberPairs.register( 'NumberPairsSceneModel', NumberPairsSceneModel );