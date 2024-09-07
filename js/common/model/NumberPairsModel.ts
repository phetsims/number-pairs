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
  initialLeftAddendValue: number;
  initialCountingRepresentationType: CountingRepresentationType;
};

export type NumberPairsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;
export default class NumberPairsModel implements TModel {

  // TODO: This probably wants to be a derived Property. https://github.com/phetsims/number-pairs/issues/4
  //  possibly dynamic and these Properties move into the sceneModel.
  public readonly sumProperty: Property<number>;
  public readonly leftAddendProperty: Property<number>;
  public readonly rightAddendProperty: Property<number>;

  public readonly countingRepresentationTypeProperty: Property<CountingRepresentationType>;
  public readonly sumColorProperty: TReadOnlyProperty<TColor>;
  public readonly leftAddendColorProperty: TReadOnlyProperty<TColor>;
  public readonly rightAddendColorProperty: TReadOnlyProperty<TColor>;

  public constructor( providedOptions: NumberPairsModelOptions ) {

    const options = providedOptions;
    const initialRightAddendValue = options.initialSumValue - options.initialLeftAddendValue;
    this.sumProperty = new NumberProperty( options.initialSumValue, {
      tandem: options.tandem.createTandem( 'sumProperty' )
    } );
    this.leftAddendProperty = new NumberProperty( options.initialLeftAddendValue, {
      tandem: options.tandem.createTandem( 'leftAddendProperty' )
    } );
    this.rightAddendProperty = new NumberProperty( initialRightAddendValue, {
      tandem: options.tandem.createTandem( 'rightAddendProperty' )
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
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    this.sumProperty.reset();
    this.leftAddendProperty.reset();
    this.rightAddendProperty.reset();
  }
}

numberPairs.register( 'NumberPairsModel', NumberPairsModel );