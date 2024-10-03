// Copyright 2024, University of Colorado Boulder
/**
 * The base class for the model in the Number Pairs simulation.
 * This class keeps track of the total and both addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import Property from '../../../../axon/js/Property.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import NumberPairsSceneModel from './NumberPairsSceneModel.js';
import Range from '../../../../dot/js/Range.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import CountingObject, { AddendType } from './CountingObject.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import NumberPairsModel, { NumberPairsModelOptions } from './NumberPairsModel.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';


type SelfOptions = {
  initialTotalValue: number;
  sceneRange: Range;
};

export type DecompositionModelOptions = SelfOptions & NumberPairsModelOptions;
export default class DecompositionModel extends NumberPairsModel {


  // Each scene is associated with a readonly total. The selected scene model is determined by the totalProperty.
  // The length of the left/rightAddendCountingObjectsProperty.value must always add up to the totalProperty.value.
  public readonly selectedSceneModelProperty: Property<NumberPairsSceneModel>;
  public readonly sceneModels: NumberPairsSceneModel[];
  public readonly leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  public readonly rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;

  protected constructor( providedOptions: DecompositionModelOptions ) {

    const options = providedOptions;

    // We need to create a scene model for each scene in the scene range including both the max and min values.
    const sceneModels = [];
    for ( let total = options.sceneRange.min; total <= options.sceneRange.max; total++ ) {
      let sceneModel: NumberPairsSceneModel;
      if ( total === 0 ) {
        sceneModel = new NumberPairsSceneModel( 0, 0, options.tandem.createTandem( `sceneModel${total}` ) );
      }
      else {

        // The initial left addend value for each scene is n - 1.
        const leftAddendValue = total - 1;
        const rightAddendValue = 1;
        sceneModel = new NumberPairsSceneModel( leftAddendValue, rightAddendValue, options.tandem.createTandem( `sceneModel${total}` ) );
      }
      sceneModels.push( sceneModel );
    }

    const initialSceneModel = sceneModels.find( sceneModel => sceneModel.total === options.initialTotalValue );
    assert && assert( initialSceneModel, `initialSceneModel not found for total: ${options.initialTotalValue}` );
    const selectedSceneModelProperty = new Property( initialSceneModel!, {
      phetioValueType: NumberPairsSceneModel.NumberPairsSceneModelIO,
      tandem: options.tandem.createTandem( 'selectedSceneModelProperty' )
    } );

    const totalProperty = new DerivedProperty( [ selectedSceneModelProperty ], sceneModel => sceneModel.total );
    const leftAddendCountingObjectsProperty = new DerivedProperty( [ selectedSceneModelProperty ],
      sceneModel => sceneModel.leftAddendObjects );
    const rightAddendCountingObjectsProperty = new DerivedProperty( [ selectedSceneModelProperty ],
      sceneModel => sceneModel.rightAddendObjects );
    const leftAddendNumberProperty = new DynamicProperty<number, number, NumberPairsSceneModel>( selectedSceneModelProperty, {
      derive: 'leftAddendNumberProperty',
      bidirectional: true
    } );
    const rightAddendNumberProperty = new DynamicProperty<number, number, NumberPairsSceneModel>( selectedSceneModelProperty, {
      derive: 'rightAddendNumberProperty'
    } );

    const superOptions = combineOptions<NumberPairsModelOptions>( {}, options );
    super( totalProperty, leftAddendNumberProperty, rightAddendNumberProperty, options.sceneRange.max, superOptions );

    // Add all the counting objects to the appropriate observable array in each scene.
    sceneModels.forEach( sceneModel => {
      this.registerObservableArrays( sceneModel.leftAddendObjects, sceneModel.rightAddendObjects );

      let countingObjectsIndex = 0;
      _.times( sceneModel.leftAddendNumberProperty.value, () => {
        sceneModel.leftAddendObjects.push( this.countingObjects[ countingObjectsIndex ] );
        countingObjectsIndex++;
      } );
      _.times( sceneModel.rightAddendNumberProperty.value, () => {
        sceneModel.rightAddendObjects.push( this.countingObjects[ countingObjectsIndex ] );
        countingObjectsIndex++;
      } );

      assert && assert( sceneModel.leftAddendObjects.length + sceneModel.rightAddendObjects.length === sceneModel.total, 'leftAddendObjects.length + rightAddendObjects.length should equal total' );
    } );

    selectedSceneModelProperty.link( sceneModel => {

      // Set all the counting objects to inactive so that the objects in each observable array
      // get set to the proper state below.
      this.countingObjects.forEach( countingObject => {
        countingObject.addendTypeProperty.value = AddendType.INACTIVE;
      } );
      sceneModel.leftAddendObjects.forEach( countingObject => {
        countingObject.addendTypeProperty.value = AddendType.LEFT;
      } );
      sceneModel.rightAddendObjects.forEach( countingObject => {
        countingObject.addendTypeProperty.value = AddendType.RIGHT;
      } );
    } );

    this.selectedSceneModelProperty = selectedSceneModelProperty;
    this.sceneModels = sceneModels;
    this.leftAddendCountingObjectsProperty = leftAddendCountingObjectsProperty;
    this.rightAddendCountingObjectsProperty = rightAddendCountingObjectsProperty;
  }

  /**
   * Resets the model.
   */
  public override reset(): void {
    super.reset();
    this.selectedSceneModelProperty.reset();
    this.countingRepresentationTypeProperty.reset();
  }
}

numberPairs.register( 'DecompositionModel', DecompositionModel );