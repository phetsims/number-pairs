// Copyright 2024, University of Colorado Boulder
/**
 * The base class for the model in the Number Pairs simulation.
 * This class keeps track of the sum and both addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import TModel from '../../../../joist/js/TModel.js';
import numberPairs from '../../numberPairs.js';
import Property from '../../../../axon/js/Property.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import { TColor } from '../../../../scenery/js/imports.js';
import NumberPairsColors from '../NumberPairsColors.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import NumberPairsSceneModel from './NumberPairsSceneModel.js';
import Range from '../../../../dot/js/Range.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import CountingObject from './CountingObject.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';

// type CountingRepresentationImageAssets = {
//   leftAddendImage: ImageableImage;
//   rightAddendImage: ImageableImage;
// };
export class CountingRepresentationType extends EnumerationValue {
  public static readonly APPLES = new CountingRepresentationType(
    'apples',
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty
  );
  public static readonly ONE_CARDS = new CountingRepresentationType(
    'oneCards',
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty
  );
  public static readonly SOCCER_BALLS = new CountingRepresentationType(
    'soccerBalls',
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty
  );
  public static readonly BUTTERFLIES = new CountingRepresentationType(
    'butterflies',
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty
  );
  public static readonly KITTENS = new CountingRepresentationType(
    'kittens',
    NumberPairsColors.attributeSumColorProperty,
    NumberPairsColors.attributeLeftAddendColorProperty,
    NumberPairsColors.attributeRightAddendColorProperty
  );
  public static readonly CUBES = new CountingRepresentationType(
    'cubes',
    NumberPairsColors.numberLineSumColorProperty,
    NumberPairsColors.numberLineLeftAddendColorProperty,
    NumberPairsColors.numberLineRightAddendColorProperty
  );
  public static readonly NUMBER_LINE = new CountingRepresentationType(
    'numberLine',
    NumberPairsColors.numberLineSumColorProperty,
    NumberPairsColors.numberLineLeftAddendColorProperty,
    NumberPairsColors.numberLineRightAddendColorProperty
  );
  public static readonly enumeration = new Enumeration( CountingRepresentationType );

  public constructor(
    public readonly label: string,
    public readonly sumColor: TColor,
    public readonly leftAddendColor: TColor,
    public readonly rightAddendColor: TColor
    // public readonly imageAssets: CountingRepresentationImageAssets | null TODO: pass in image assets
  ) {
    super();
  }
}

type SelfOptions = {
  initialSumValue: number;
  sceneRange: Range;
  initialCountingRepresentationType: CountingRepresentationType;
};

export type NumberPairsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;
export default class DecompositionModel implements TModel {

  // The sumProperty is controlled by the user and determines the selected scene model by using the sumToSceneModelMap.
  public readonly sumProperty: Property<number>;

  // Each scene is associated with a readonly sum. The selected scene model is determined by the sumProperty.
  // The length of the left/rightAddendCountingObjectsProperty.value must always add up to the sumProperty.value.
  public readonly selectedSceneModelProperty: Property<NumberPairsSceneModel>;
  public readonly sumToSceneModelMap = new Map<number, NumberPairsSceneModel>();
  public readonly leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  public readonly rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;

  public readonly leftAddendNumberProperty: TReadOnlyProperty<number>;
  public readonly rightAddendNumberProperty: TReadOnlyProperty<number>;

  // The counting representation type determines the colors of the sum and addends,
  // as well as the image assets used to represent each counting object.
  // The CUBES and NUMBER_LINE representations additionally support different user interactions.
  public readonly countingRepresentationTypeProperty: Property<CountingRepresentationType>;
  public readonly sumColorProperty: TReadOnlyProperty<TColor>;
  public readonly leftAddendColorProperty: TReadOnlyProperty<TColor>;
  public readonly rightAddendColorProperty: TReadOnlyProperty<TColor>;

  public constructor( providedOptions: NumberPairsModelOptions ) {

    const options = providedOptions;

    // We need to create a scene model for each scene in the scene range including both the max and min values.
    _.times( options.sceneRange.getLength() + 1, sum => {

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
      this.sumToSceneModelMap.set( sum, sceneModel );
    } );

    const initialSceneModel = this.sumToSceneModelMap.get( options.initialSumValue );
    assert && assert( initialSceneModel, `initialSceneModel not found for sum: ${options.initialSumValue}` );
    this.selectedSceneModelProperty = new Property( initialSceneModel!, {
      phetioValueType: NumberPairsSceneModel.NumberPairsSceneModelIO,
      tandem: options.tandem.createTandem( 'selectedSceneModelProperty' )
    } );
    this.sumProperty = new NumberProperty( this.selectedSceneModelProperty.value.sum, {
      tandem: options.tandem.createTandem( 'sumProperty' )
    } );
    this.leftAddendCountingObjectsProperty = new DerivedProperty( [ this.selectedSceneModelProperty ],
      sceneModel => sceneModel.leftAddendObjects );
    this.rightAddendCountingObjectsProperty = new DerivedProperty( [ this.selectedSceneModelProperty ],
      sceneModel => sceneModel.rightAddendObjects );

    // When the sum changes we need to update the selected scene model.
    this.sumProperty.link( sum => {
      const newSceneModel = this.sumToSceneModelMap.get( sum );
      assert && assert( newSceneModel, `newSceneModel not found for sum: ${sum}` );
      this.selectedSceneModelProperty.set( newSceneModel! );
    } );

    this.countingRepresentationTypeProperty = new EnumerationProperty( options.initialCountingRepresentationType, {
      tandem: options.tandem.createTandem( 'countingRepresentationTypeProperty' )
    } );

    this.sumColorProperty = new DerivedProperty( [ this.countingRepresentationTypeProperty ], countingRepresentationType => {
      return countingRepresentationType.sumColor;
    } );
    this.leftAddendColorProperty = new DerivedProperty( [ this.countingRepresentationTypeProperty ], countingRepresentationType => {
      return countingRepresentationType.leftAddendColor;
    } );
    this.rightAddendColorProperty = new DerivedProperty( [ this.countingRepresentationTypeProperty ], countingRepresentationType => {
      return countingRepresentationType.rightAddendColor;
    } );

    this.leftAddendNumberProperty = new DynamicProperty<number, number, ObservableArray<CountingObject>>( this.leftAddendCountingObjectsProperty, {
      derive: 'lengthProperty'
    } );
    this.rightAddendNumberProperty = new DynamicProperty<number, number, ObservableArray<CountingObject>>( this.rightAddendCountingObjectsProperty, {
      derive: 'lengthProperty'
    } );
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    this.sumProperty.reset();
  }
}

numberPairs.register( 'DecompositionModel', DecompositionModel );