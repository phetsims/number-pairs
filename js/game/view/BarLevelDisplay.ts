// Copyright 2025, University of Colorado Boulder

/**
 * BarLevelDisplay provides a TGenericNumberPairsModel where the numeric values used for sizing are always
 * the correct decomposition (i.e., the known addend plus the remainder), independent of the user's guess.
 *
 * Use this for GameNumberBarModelNode so bar widths do not reflect guessed values. Pair it with separate display number
 * properties when constructing GameNumberBarModelNode to show guessed numbers if desired.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import derived from '../../../../axon/js/derived.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Color from '../../../../scenery/js/util/Color.js';
import TGenericNumberPairsModel from '../../common/model/TGenericNumberPairsModel.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import numberPairs from '../../numberPairs.js';
import { MissingComponent } from '../model/Challenge.js';
import Level from '../model/Level.js';

export default class BarLevelDisplay implements TGenericNumberPairsModel {

  public readonly totalProperty: TReadOnlyProperty<number>;
  public readonly totalColorProperty: TReadOnlyProperty<Color> = NumberPairsColors.attributeSumColorProperty;
  public readonly totalVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly leftAddendProperty: TReadOnlyProperty<number>;
  public readonly leftAddendColorProperty: TReadOnlyProperty<Color> = NumberPairsColors.attributeLeftAddendColorProperty;
  public readonly leftAddendVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly rightAddendProperty: TReadOnlyProperty<number>;
  public readonly rightAddendColorProperty: TReadOnlyProperty<Color> = NumberPairsColors.attributeRightAddendColorProperty;
  public readonly rightAddendVisibleProperty: TReadOnlyProperty<boolean>;

  public constructor( level: Level, selectedGuessProperty: TReadOnlyProperty<number | null> ) {

    // Correct values for bar widths (independent of guess)
    //REVIEW 'ch' params violate PhET naming convention "avoid non-standard abbreviations".
    this.leftAddendProperty = level.challengeProperty.derived( ch => ch.a );
    this.rightAddendProperty = level.challengeProperty.derived( ch => ch.b );
    this.totalProperty = level.challengeProperty.derived( ch => ch.y );

    // Visibility mirrors GameNumberBondNodeViewModel behavior: show the missing number when solved or when there's a guess
    const visibleForSlot = ( slot: MissingComponent ) => derived( level.challengeProperty, selectedGuessProperty, level.modeProperty,
      ( ch, guess, state ) => {
        const isMissing = ch.missingComponent === slot;
        if ( !isMissing ) { return true; }
        return state === 'correct' || guess !== null;
      } );

    this.leftAddendVisibleProperty = visibleForSlot( 'a' );
    this.rightAddendVisibleProperty = visibleForSlot( 'b' );
    this.totalVisibleProperty = visibleForSlot( 'y' );
  }
}

numberPairs.register( 'BarLevelDisplay', BarLevelDisplay );
