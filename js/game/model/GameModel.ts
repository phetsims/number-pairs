// Copyright 2024-2025, University of Colorado Boulder

/**
 * GameModel is the top-level model for the 'Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import TModel from '../../../../joist/js/TModel.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import numberPairs from '../../numberPairs.js';
import Level from './Level.js';

type SelfOptions = {
  //TODO add options that are specific to GameModel here https://github.com/phetsims/number-pairs/issues/36
};

type GameModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

const ModeValues = [ 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8', 'levelSelectionScreen' ] as const;
export type Mode = ( typeof ModeValues )[number];

export default class GameModel implements TModel {
  public readonly modeProperty: StringUnionProperty<Mode>;

  // Current equation challenge properties
  public readonly leftAddendProperty: NumberProperty;
  public readonly missingValueProperty: NumberProperty; // The x value that needs to be guessed
  public readonly totalProperty: NumberProperty;
  public readonly equationTextProperty: StringProperty;

  // Game state properties

  // Individual level score properties (persistent across sessions)
  public readonly levels: Level[]; // indexed 0..7 for levels 1..8

  public constructor( providedOptions: GameModelOptions ) {

    this.modeProperty = new StringUnionProperty<Mode>( 'levelSelectionScreen', {
      validValues: ModeValues,
      tandem: providedOptions.tandem.createTandem( 'modeProperty' ),
      phetioDocumentation: 'the current level'
    } );

    // Initialize equation properties
    this.leftAddendProperty = new NumberProperty( 3, {
      tandem: providedOptions.tandem.createTandem( 'leftAddendProperty' )
    } );

    this.missingValueProperty = new NumberProperty( 2, {
      tandem: providedOptions.tandem.createTandem( 'missingValueProperty' )
    } );

    this.totalProperty = new NumberProperty( 5, {
      tandem: providedOptions.tandem.createTandem( 'totalProperty' )
    } );

    this.equationTextProperty = new StringProperty( '3 + x = 5', {
      tandem: providedOptions.tandem.createTandem( 'equationTextProperty' )
    } );

    // No aggregate session score; scoring is per-level

    // Create per-level models
    this.levels = [ 1, 2, 3, 4, 5, 6, 7, 8 ].map( n => new Level( providedOptions.tandem.createTandem( `level${n}` ) ) );

    // Generate the first challenge
    this.generateNewChallenge();
  }

  /**
   * Generates a new challenge with random numbers for level 1 (totals 0-10).
   */
  public generateNewChallenge(): void {
    // For level 1: totals between 0-10
    const total = dotRandom.nextIntBetween( 0, 10 );
    const leftAddend = dotRandom.nextIntBetween( 0, total );
    const missingValue = total - leftAddend;

    this.totalProperty.value = total;
    this.leftAddendProperty.value = leftAddend;
    this.missingValueProperty.value = missingValue;
    this.equationTextProperty.value = `${leftAddend} + x = ${total}`;

    // Reset challenge state for the current level (or level 1 during startup)
    if ( this.levels && this.levels.length > 0 ) {
      this.getCurrentLevel().resetForNewChallenge();
    }
  }

  /**
   * Gets the score property for a specific level number (1-8).
   */
  public getLevelScoreProperty( levelNumber: number ): NumberProperty {
    const index = Math.max( 1, Math.min( 8, levelNumber ) ) - 1;
    return this.levels[ index ].scoreProperty;
  }

  /** Returns the Level model for a specific level number (1-8). */
  public getLevel( levelNumber: number ): Level {
    const index = Math.max( 1, Math.min( 8, levelNumber ) ) - 1;
    return this.levels[ index ];
  }

  /** Returns the Level model for the current mode, defaulting to level 1. */
  public getCurrentLevel(): Level {
    const mode = this.modeProperty.value;
    if ( mode === 'levelSelectionScreen' ) {
      return this.getLevel( 1 );
    }
    const match = /^level([1-8])$/.exec( mode );
    const n = match ? Number( match[ 1 ] ) : 1;
    return this.getLevel( n );
  }

  /**
   * Checks if the user's guess is correct and updates game state.
   */
  public checkAnswer( guess: number ): boolean {
    const level = this.getCurrentLevel();
    level.attemptsProperty.value++;

    const isCorrect = guess === this.missingValueProperty.value;

    if ( isCorrect ) {
      level.isChallengeSolvedProperty.value = true;

      // Award star only on first try
      if ( level.attemptsProperty.value === 1 ) {
        level.scoreProperty.value++;
      }
    }

    return isCorrect;
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    // Reset all level scores and state
    this.levels.forEach( level => {
      level.scoreProperty.reset();
      level.resetForNewChallenge();
    } );

    this.generateNewChallenge();
  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    // No step behavior needed for this game model
  }
}

numberPairs.register( 'GameModel', GameModel );