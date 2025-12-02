// Copyright 2024-2025, University of Colorado Boulder
/**
 * The LevelRange Enumeration defines the range and y value constraints for each level in the game.
 * Each level has specific rules about the minimum and maximum values for y (the total).
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import derivedMap from '../../../../axon/js/derivedMap.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import Color from '../../../../scenery/js/util/Color.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';

// constants
const ZERO_TO_TEN_RANGE = NumberPairsConstants.GAME_TEN_RANGE;
const ZERO_TO_TWENTY_RANGE = NumberPairsConstants.GAME_TWENTY_RANGE;

const NUMBER_MODEL_TYPE_STRING_PROPERTY = derivedMap( NumberPairsPreferences.numberModelTypeProperty, new Map( [
  [ NumberModelType.BAR_MODEL, NumberPairsFluent.barModelLowercaseStringProperty ],
  [ NumberModelType.NUMBER_BOND_MODEL, NumberPairsFluent.numberBondLowercaseStringProperty ]
] ) );

export default class LevelDefinition extends EnumerationValue {
  public static readonly LEVEL_1 = new LevelDefinition(
    1,
    ZERO_TO_TEN_RANGE,
    2,
    NUMBER_MODEL_TYPE_STRING_PROPERTY,
    NumberPairsFluent.gameScreen.levelDescriptions.level1StringProperty,
    NumberPairsColors.level1StatusBarColorProperty
  );
  public static readonly LEVEL_2 = new LevelDefinition(
    2,
    ZERO_TO_TEN_RANGE,
    10,
    NUMBER_MODEL_TYPE_STRING_PROPERTY,
    NumberPairsFluent.gameScreen.levelDescriptions.level2StringProperty,
    NumberPairsColors.level234StatusBarColorProperty
  );
  public static readonly LEVEL_3 = new LevelDefinition(
    3,
    ZERO_TO_TEN_RANGE,
    10,
    null,
    NumberPairsFluent.gameScreen.levelDescriptions.level3StringProperty,
    NumberPairsColors.level234StatusBarColorProperty
  );
  public static readonly LEVEL_4 = new LevelDefinition(
    4,
    ZERO_TO_TEN_RANGE,
    10,
    null,
    NumberPairsFluent.gameScreen.levelDescriptions.level4StringProperty,
    NumberPairsColors.level234StatusBarColorProperty
  );
  public static readonly LEVEL_5 = new LevelDefinition(
    5,
    ZERO_TO_TWENTY_RANGE,
    11,
    NUMBER_MODEL_TYPE_STRING_PROPERTY,
    NumberPairsFluent.gameScreen.levelDescriptions.level5StringProperty,
    NumberPairsColors.level567StatusBarColorProperty
  );
  public static readonly LEVEL_6 = new LevelDefinition(
    6,
    ZERO_TO_TWENTY_RANGE,
    11,
    null,
    NumberPairsFluent.gameScreen.levelDescriptions.level6StringProperty,
    NumberPairsColors.level567StatusBarColorProperty
  );
  public static readonly LEVEL_7 = new LevelDefinition(
    7,
    ZERO_TO_TWENTY_RANGE,
    11,
    null,
    NumberPairsFluent.gameScreen.levelDescriptions.level7StringProperty,
    NumberPairsColors.level567StatusBarColorProperty
  );
  public static readonly LEVEL_8 = new LevelDefinition(
    8,
    ZERO_TO_TWENTY_RANGE,
    0,
    null,
    NumberPairsFluent.gameScreen.levelDescriptions.level8StringProperty,
    NumberPairsColors.level567StatusBarColorProperty
  );
  public static readonly enumeration = new Enumeration( LevelDefinition );

  public readonly yValueRange: Range;
  public readonly descriptionProperty: TReadOnlyProperty<string>;
  public constructor(
    public readonly levelNumber: number,
    public readonly range: Range,
    yMinValue: number,
    numberModelTypeStringProperty: TReadOnlyProperty<string> | null,
    public readonly descriptionPattern: TReadOnlyProperty<string>,
    public readonly color: TReadOnlyProperty<Color>
  ) {
    super();
    this.yValueRange = new Range( yMinValue, range.max );
    const yMaxValue = this.yValueRange.max;
    if ( yMinValue !== yMaxValue ) {
      if ( numberModelTypeStringProperty ) {
        this.descriptionProperty = new PatternStringProperty( descriptionPattern, {
          numberModelType: numberModelTypeStringProperty,
          yValueMin: yMinValue,
          yValueMax: yMaxValue
        } );
      }
      else {
        this.descriptionProperty = new PatternStringProperty( descriptionPattern, {
          yValueMin: yMinValue,
          yValueMax: yMaxValue
        } );
      }
    }
    else {
      if ( numberModelTypeStringProperty ) {
        this.descriptionProperty = new PatternStringProperty( descriptionPattern, {
          numberModelType: numberModelTypeStringProperty,
          yValue: yMaxValue
        } );
      }
      else {
        this.descriptionProperty = new PatternStringProperty( descriptionPattern, {
          yValue: yMaxValue
        } );
      }
    }
  }
}

numberPairs.register( 'LevelDefinition', LevelDefinition );
