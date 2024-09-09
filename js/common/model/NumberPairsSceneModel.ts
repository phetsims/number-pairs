// Copyright 2024, University of Colorado Boulder
/**
 * NumberPairsSceneModel is the model for the scene in the Number Pairs simulation.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */
import numberPairs from '../../numberPairs.js';
import createObservableArray, { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import CountingObject from './CountingObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';


export default class NumberPairsSceneModel {

  // The sum as initialized by the values provided to the constructor. This is a constant.
  public readonly sum: number;
  public readonly leftAddendObjects: ObservableArray<CountingObject>;
  public readonly rightAddendObjects: ObservableArray<CountingObject>;

  public constructor( initialLeftAddendValue: number, initialRightAddendValue: number, tandem: Tandem ) {

    this.sum = initialLeftAddendValue + initialRightAddendValue;

    this.leftAddendObjects = createObservableArray( {
      tandem: tandem.createTandem( 'leftAddendObjects' )
    } );
    this.rightAddendObjects = createObservableArray( {
      tandem: tandem.createTandem( 'rightAddendObjects' )
    } );

    _.times( initialLeftAddendValue, () => {
      this.leftAddendObjects.push( new CountingObject() );
    } );
    _.times( initialRightAddendValue, () => {
      this.rightAddendObjects.push( new CountingObject() );
    } );
  }
}

numberPairs.register( 'NumberPairsSceneModel', NumberPairsSceneModel );