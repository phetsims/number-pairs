// Copyright 2025, University of Colorado Boulder

/**
 * SimpleLevelDisplay is a thin adapter that exposes TGenericNumberPairsModel-compatible
 * read-only properties derived from the Level model and current grid selection.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Color from '../../../../scenery/js/util/Color.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import TGenericNumberPairsModel from '../../common/model/TGenericNumberPairsModel.js';
import Level from '../model/Level.js';
import Challenge from '../model/Challenge.js';

export default class SimpleLevelDisplay implements TGenericNumberPairsModel {
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

    const challengeProperty = level.challengeProperty;
    const feedbackStateProperty = level.feedbackStateProperty;

    const displayedForSlot = ( slot: 'a' | 'b' | 'y' ) => new DerivedProperty( [ challengeProperty, selectedGuessProperty, feedbackStateProperty ],
      ( ch: Challenge, guess: number | null, state: 'idle' | 'incorrect' | 'correct' ) => {
        const correctMissing = ch.answer;
        const valueBySlot = {
          a: ch.a === null ? ( state === 'correct' ? correctMissing : ( guess ?? 0 ) ) : ch.a,
          b: ch.b === null ? ( state === 'correct' ? correctMissing : ( guess ?? 0 ) ) : ch.b,
          y: ch.y === null ? ( state === 'correct' ? correctMissing : ( guess ?? 0 ) ) : ch.y
        } as const;
        return valueBySlot[ slot ];
      } );

    const visibleForSlot = ( slot: 'a' | 'b' | 'y' ) => new DerivedProperty( [ challengeProperty, selectedGuessProperty, feedbackStateProperty ],
      ( ch: Challenge, guess: number | null, state: 'idle' | 'incorrect' | 'correct' ) => {
        const isMissing = ch.missing === slot;
        if ( !isMissing ) { return true; }
        // Missing slot: show number when solved or when the user has an active selection
        return state === 'correct' || guess !== null;
      } );

    this.leftAddendProperty = displayedForSlot( 'a' );
    this.rightAddendProperty = displayedForSlot( 'b' );
    this.totalProperty = displayedForSlot( 'y' );

    this.leftAddendVisibleProperty = visibleForSlot( 'a' );
    this.rightAddendVisibleProperty = visibleForSlot( 'b' );
    this.totalVisibleProperty = visibleForSlot( 'y' );
  }
}

numberPairs.register( 'SimpleLevelDisplay', SimpleLevelDisplay );
