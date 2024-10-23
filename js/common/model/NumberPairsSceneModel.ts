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
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import { StateObject } from '../../../../tandem/js/types/StateSchema.js';

const STATE_SCHEMA = {
  leftAddendNumber: NumberIO,
  rightAddendNumber: NumberIO
};

type NumberPairsSceneStateObject = StateObject<typeof STATE_SCHEMA>;

export default class NumberPairsSceneModel {

  // The total as initialized by the values provided to the constructor. This is a constant.
  public readonly total: number;

  public readonly leftAddendNumberProperty: Property<number>;

  // The right addend number is derived from the total and left addend number and is used to update
  // the counting objects in each array as it changes.
  public readonly rightAddendNumberProperty: TReadOnlyProperty<number>;
  public readonly leftAddendObjects: ObservableArray<CountingObject>;
  public readonly rightAddendObjects: ObservableArray<CountingObject>;
  public readonly inactiveCountingObjects: ObservableArray<CountingObject>;

  public constructor( initialLeftAddendValue: number, initialRightAddendValue: number, tandem: Tandem ) {

    this.total = initialLeftAddendValue + initialRightAddendValue;
    const sceneRange = new Range( 0, this.total );
    this.inactiveCountingObjects = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: tandem.createTandem( 'inactiveCountingObjects' )
    } );
    this.leftAddendNumberProperty = new NumberProperty( initialLeftAddendValue, {
      range: sceneRange,
      numberType: 'Integer',
      tandem: tandem.createTandem( 'leftAddendNumberProperty' )
    } );
    this.leftAddendObjects = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: tandem.createTandem( 'leftAddendObjects' )
    } );

    this.rightAddendNumberProperty = new DerivedProperty( [ this.leftAddendNumberProperty ], leftAddendValue => {
      return this.total - leftAddendValue;
    } );
    this.rightAddendObjects = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: tandem.createTandem( 'rightAddendObjects' )
    } );

    // Listen to the rightAddendNumberProperty since it is derived and will therefore be updated last.
    this.rightAddendNumberProperty.lazyLink( rightAddendValue => {
      const leftAddendDelta = this.leftAddendNumberProperty.value - this.leftAddendObjects.length;
      const rightAddendDelta = rightAddendValue - this.rightAddendObjects.length;

      if ( this.inactiveCountingObjects.length === 0 ) {
        if ( leftAddendDelta > 0 ) {
          this.leftAddendObjects.push( ...this.rightAddendObjects.splice( 0, leftAddendDelta ) );
        }
        else if ( leftAddendDelta < 0 ) {
          this.rightAddendObjects.push( ...this.leftAddendObjects.splice( 0, rightAddendDelta ) );
        }
      }
      else {
        if ( rightAddendDelta > 0 ) {

          // We use the immutable `slice` here because removing and item from the inactiveCountingObjects array
          // should be handled by the addend specific ObservableArray.
          this.rightAddendObjects.push( ...this.inactiveCountingObjects.slice( 0, rightAddendDelta ) );
        }
        else if ( rightAddendDelta < 0 ) {
          this.rightAddendObjects.splice( rightAddendDelta, -rightAddendDelta );
        }

        if ( leftAddendDelta > 0 ) {
          this.leftAddendObjects.push( ...this.inactiveCountingObjects.slice( 0, leftAddendDelta ) );
        }
        else if ( leftAddendDelta < 0 ) {
          this.leftAddendObjects.splice( leftAddendDelta, -leftAddendDelta );
        }
      }

      assert && assert( this.leftAddendNumberProperty.value === this.leftAddendObjects.length, 'leftAddendNumberProperty should match leftAddendObjects length' );
      assert && assert( this.rightAddendNumberProperty.value === this.rightAddendObjects.length, 'rightAddendNumberProperty should match rightAddendObjects length' );
      assert && assert( this.leftAddendObjects.length + this.rightAddendObjects.length === this.total, 'leftAddendObjects.length + rightAddendObjects.length should equal total' );
    } );
  }

  public toStateObject(): NumberPairsSceneStateObject {
    return {
      leftAddendNumber: this.leftAddendNumberProperty.value,
      rightAddendNumber: this.rightAddendNumberProperty.value
    };
  }

  public static NumberPairsSceneModelIO = new IOType( 'NumberPairsSceneModelIO', {
    valueType: NumberPairsSceneModel,
    stateSchema: STATE_SCHEMA,
    toStateObject: ( model: NumberPairsSceneModel ) => model.toStateObject(),
    fromStateObject: ( stateObject: NumberPairsSceneStateObject ) => {
      return new NumberPairsSceneModel( stateObject.leftAddendNumber, stateObject.rightAddendNumber, Tandem.REQUIRED );
    }
  } );
}

numberPairs.register( 'NumberPairsSceneModel', NumberPairsSceneModel );