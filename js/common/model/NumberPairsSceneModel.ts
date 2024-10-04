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

  public constructor( initialLeftAddendValue: number, initialRightAddendValue: number, tandem: Tandem ) {

    this.total = initialLeftAddendValue + initialRightAddendValue;
    const sceneRange = new Range( 0, this.total );

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