// Copyright 2024, University of Colorado Boulder
/**
 * TODO: describe file
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */
import TModel from '../../../../joist/js/TModel.js';
import numberPairs from '../../numberPairs.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import NumberPairsColors from '../NumberPairsColors.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import { TColor } from '../../../../scenery/js/imports.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';

// type CountingRepresentationImageAssets = {
//   leftAddendImage: ImageableImage;
//   rightAddendImage: ImageableImage;
// };

// TODO: rename to RepresentationType
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
    public readonly totalColor: TColor,
    public readonly leftAddendColor: TColor,
    public readonly rightAddendColor: TColor
    // public readonly imageAssets: CountingRepresentationImageAssets | null TODO: pass in image assets
  ) {
    super();
  }
}

type SelfOptions = {
  initialCountingRepresentationType: CountingRepresentationType;
};

export type NumberPairsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class NumberPairsModel implements TModel {

  // The counting representation type determines the colors of the total and addends,
  // as well as the image assets used to represent each counting object.
  // The CUBES and NUMBER_LINE representations additionally support different user interactions.
  public readonly countingRepresentationTypeProperty: Property<CountingRepresentationType>;
  public readonly totalColorProperty: TReadOnlyProperty<TColor>;
  public readonly leftAddendColorProperty: TReadOnlyProperty<TColor>;
  public readonly rightAddendColorProperty: TReadOnlyProperty<TColor>;

  public readonly showAddendValuesProperty: Property<boolean>;
  public readonly showTickValuesProperty: Property<boolean>;
  public readonly showTotalJumpProperty: Property<boolean>;

  protected constructor(
    // The totalProperty is controlled by the user. In decomposition models (Intro, Ten, and Twenty screens) it also
    // determines the selected scene model by using the totalToSceneModelMap.
    public readonly totalNumberProperty: Property<number>,
    public readonly leftAddendNumberProperty: PhetioProperty<number>,

    // The right addend value is the only value that is not required to be directly set by a component controlled
    // by the user. Therefore, it is derived from the total and left addend values.
    public readonly rightAddendNumberProperty: TReadOnlyProperty<number>,
    providedOptions: NumberPairsModelOptions ) {

    const options = providedOptions;
    this.countingRepresentationTypeProperty = new EnumerationProperty( options.initialCountingRepresentationType, {
      tandem: options.tandem.createTandem( 'countingRepresentationTypeProperty' )
    } );

    this.totalColorProperty = new DerivedProperty( [ this.countingRepresentationTypeProperty ], countingRepresentationType => {
      return countingRepresentationType.totalColor;
    } );
    this.leftAddendColorProperty = new DerivedProperty( [ this.countingRepresentationTypeProperty ], countingRepresentationType => {
      return countingRepresentationType.leftAddendColor;
    } );
    this.rightAddendColorProperty = new DerivedProperty( [ this.countingRepresentationTypeProperty ], countingRepresentationType => {
      return countingRepresentationType.rightAddendColor;
    } );

    this.showAddendValuesProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'showAddendValuesProperty' )
    } );
    this.showTickValuesProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'showTickValuesProperty' )
    } );
    this.showTotalJumpProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'showTotalJumpProperty' )
    } );
  }

  public reset(): void {
    this.totalNumberProperty.reset();
  }
}

numberPairs.register( 'NumberPairsModel', NumberPairsModel );