// Copyright 2024, University of Colorado Boulder
/**
 * The base class for the model in the Number Pairs simulation.
 * This class keeps track of the sum and both addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import Property from '../../../../axon/js/Property.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import NumberPairsSceneModel from './NumberPairsSceneModel.js';
import Range from '../../../../dot/js/Range.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import CountingObject from './CountingObject.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import NumberPairsModel, { NumberPairsModelOptions } from './NumberPairsModel.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';


type SelfOptions = {
  initialSumValue: number;
  sceneRange: Range;
};

export type DecompositionModelOptions = SelfOptions & NumberPairsModelOptions;
export default class DecompositionModel extends NumberPairsModel {


  // Each scene is associated with a readonly sum. The selected scene model is determined by the sumProperty.
  // The length of the left/rightAddendCountingObjectsProperty.value must always add up to the sumProperty.value.
  public readonly selectedSceneModelProperty: Property<NumberPairsSceneModel>;
  public readonly sumToSceneModelMap: Map<number, NumberPairsSceneModel>;
  public readonly leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  public readonly rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;

  public constructor( providedOptions: DecompositionModelOptions ) {

    const options = providedOptions;

    // We need to create a scene model for each scene in the scene range including both the max and min values.
    const sumToSceneModelMap = new Map<number, NumberPairsSceneModel>();
    _.times( options.sceneRange.getLength() + 1, i => {

      const sum = i + options.sceneRange.min;
      let sceneModel: NumberPairsSceneModel;
      if ( sum === 0 ) {
        sceneModel = new NumberPairsSceneModel( 0, 0, options.tandem.createTandem( `sceneModel${sum}` ) );
      }
      else {
        // The initial left addend value for each scene is n - 1.
        const leftAddendValue = sum - 1;
        const rightAddendValue = 1;
        sceneModel = new NumberPairsSceneModel( leftAddendValue, rightAddendValue, options.tandem.createTandem( `sceneModel${sum}` ) );
      }
      sumToSceneModelMap.set( sum, sceneModel );
    } );

    const initialSceneModel = sumToSceneModelMap.get( options.initialSumValue );
    assert && assert( initialSceneModel, `initialSceneModel not found for sum: ${options.initialSumValue}` );
    const selectedSceneModelProperty = new Property( initialSceneModel!, {
      phetioValueType: NumberPairsSceneModel.NumberPairsSceneModelIO,
      tandem: options.tandem.createTandem( 'selectedSceneModelProperty' )
    } );
    const sumProperty = new NumberProperty( selectedSceneModelProperty.value.SUM, {
      tandem: options.tandem.createTandem( 'sumProperty' )
    } );

    const leftAddendCountingObjectsProperty = new DerivedProperty( [ selectedSceneModelProperty ],
      sceneModel => sceneModel.leftAddendObjects );
    const rightAddendCountingObjectsProperty = new DerivedProperty( [ selectedSceneModelProperty ],
      sceneModel => sceneModel.rightAddendObjects );
    const leftAddendNumberProperty = new DynamicProperty<number, number, NumberPairsSceneModel>( selectedSceneModelProperty, {
      derive: 'leftAddendNumberProperty',
      bidirectional: true
    } );
    const rightAddendNumberProperty = new DynamicProperty<number, number, NumberPairsSceneModel>( selectedSceneModelProperty, {
      derive: 'rightAddendNumberProperty',
      bidirectional: true
    } );

    const superOptions = combineOptions<NumberPairsModelOptions>( {}, options );
    super( sumProperty, leftAddendNumberProperty, rightAddendNumberProperty, superOptions );
    this.selectedSceneModelProperty = selectedSceneModelProperty;
    this.sumToSceneModelMap = sumToSceneModelMap;
    this.leftAddendCountingObjectsProperty = leftAddendCountingObjectsProperty;
    this.rightAddendCountingObjectsProperty = rightAddendCountingObjectsProperty;

    // When the sum changes we need to update the selected scene model.
    this.sumNumberProperty.link( sum => {
      const newSceneModel = this.sumToSceneModelMap.get( sum );
      assert && assert( newSceneModel, `newSceneModel not found for sum: ${sum}` );
      this.selectedSceneModelProperty.set( newSceneModel! );
    } );
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