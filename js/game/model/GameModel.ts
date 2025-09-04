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
  
  // New view state (preferred over modeProperty going forward)
  public readonly currentViewProperty: StringUnionProperty<'selection' | 'level'>;
  public readonly currentLevelNumberProperty: NumberProperty; // 1..N

  // Current equation challenge properties
  public readonly leftAddendProperty: NumberProperty;
  public readonly missingValueProperty: NumberProperty; // The x value that needs to be guessed
  public readonly totalProperty: NumberProperty;
  public readonly equationTextProperty: StringProperty;

  // Game state properties

  // Individual level models (persistent across session lifetime)
  public readonly levels: Level[]; // indexed 0..N-1 for levels 1..N
  private readonly levelConfigs: LevelConfig[];

  public constructor( providedOptions: GameModelOptions ) {

    this.modeProperty = new StringUnionProperty<Mode>( 'levelSelectionScreen', {
      validValues: ModeValues,
      tandem: providedOptions.tandem.createTandem( 'modeProperty' ),
      phetioDocumentation: 'the current level'
    } );

    // New view state
    this.currentViewProperty = new StringUnionProperty<'selection' | 'level'>( 'selection', {
      validValues: [ 'selection', 'level' ],
      tandem: providedOptions.tandem.createTandem( 'currentViewProperty' ),
      phetioDocumentation: 'which view is currently shown'
    } );
    this.currentLevelNumberProperty = new NumberProperty( 1, {
      tandem: providedOptions.tandem.createTandem( 'currentLevelNumberProperty' ),
      numberType: 'Integer'
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

    // Configure and create per-level models
    this.levelConfigs = [
      {
        id: 1,
        description: 'Level 1 Missing addends in a number bond (0-10)',
        gridRange: 'zeroToTen',
        generateChallenge: () => {
          const total = dotRandom.nextIntBetween( 0, 10 );
          const leftAddend = dotRandom.nextIntBetween( 0, total );
          const missingValue = total - leftAddend;
          return createChallenge( leftAddend, missingValue, total );
        }
      },
      {
        id: 2,
        description: 'Level 2 Missing addend in a number bond (10 only)',
        gridRange: 'zeroToTen',
        generateChallenge: () => {
          const total = 10;
          const leftAddend = dotRandom.nextIntBetween( 0, total );
          const missingValue = total - leftAddend;
          return createChallenge( leftAddend, missingValue, total );
        }
      },
      {
        id: 3,
        description: 'Level 3 Missing addend in a decomposition equation',
        gridRange: 'zeroToTen',
        generateChallenge: () => {
          const total = dotRandom.nextIntBetween( 0, 10 );
          const leftAddend = dotRandom.nextIntBetween( 0, total );
          const missingValue = total - leftAddend;
          return createChallenge( leftAddend, missingValue, total );
        }
      },
      {
        id: 4,
        description: 'Level 4 Missing addend in a sum equation (10 only)',
        gridRange: 'zeroToTen',
        generateChallenge: () => {
          const total = 10;
          const leftAddend = dotRandom.nextIntBetween( 0, total );
          const missingValue = total - leftAddend;
          return createChallenge( leftAddend, missingValue, total );
        }
      },
      {
        id: 5,
        description: 'Level 5 Missing addend with a number bond (11-20)',
        gridRange: 'zeroToTwenty',
        generateChallenge: () => {
          const total = dotRandom.nextIntBetween( 11, 20 );
          const leftAddend = dotRandom.nextIntBetween( 0, total );
          const missingValue = total - leftAddend;
          return createChallenge( leftAddend, missingValue, total );
        }
      },
      {
        id: 6,
        description: 'Level 6 Missing addend with decomposition equation (11-20)',
        gridRange: 'zeroToTwenty',
        generateChallenge: () => {
          const total = dotRandom.nextIntBetween( 11, 20 );
          const leftAddend = dotRandom.nextIntBetween( 0, total );
          const missingValue = total - leftAddend;
          return createChallenge( leftAddend, missingValue, total );
        }
      },
      {
        id: 7,
        description: 'Level 7 Missing addend or total with sum equation (11-20)',
        gridRange: 'zeroToTwenty',
        generateChallenge: () => {
          const total = dotRandom.nextIntBetween( 11, 20 );
          const leftAddend = dotRandom.nextIntBetween( 0, total );
          const missingValue = total - leftAddend;
          return createChallenge( leftAddend, missingValue, total );
        }
      },
      {
        id: 8,
        description: 'Level 8 Equations with the number line (0-20)',
        gridRange: 'zeroToTwenty',
        generateChallenge: () => {
          const total = dotRandom.nextIntBetween( 0, 20 );
          const leftAddend = dotRandom.nextIntBetween( 0, total );
          const missingValue = total - leftAddend;
          return createChallenge( leftAddend, missingValue, total );
        }
      }
    ];

    this.levels = this.levelConfigs.map( cfg => new Level( providedOptions.tandem.createTandem( `level${cfg.id}` ) ) );

    // Generate the first challenge
    this.generateNewChallenge();
  }

  /** Generates and applies a new challenge for the current level. */
  public generateNewChallenge(): void {
    const challenge = this.getLevelConfig( this.getCurrentLevelNumber() ).generateChallenge();
    this.leftAddendProperty.value = challenge.leftAddend;
    this.missingValueProperty.value = challenge.missingValue;
    this.totalProperty.value = challenge.total;
    this.equationTextProperty.value = challenge.text;

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

  /** Returns the Level model for the current selection. */
  public getCurrentLevel(): Level {
    // Prefer the new properties when in 'level' view
    if ( this.currentViewProperty.value === 'level' ) {
      return this.getLevel( this.currentLevelNumberProperty.value );
    }
    // Fallback for legacy modeProperty
    const mode = this.modeProperty.value;
    if ( mode === 'levelSelectionScreen' ) {
      return this.getLevel( 1 );
    }
    const match = /^level([1-8])$/.exec( mode );
    const n = match ? Number( match[ 1 ] ) : 1;
    return this.getLevel( n );
  }

  /** Current level number (1-based). */
  public getCurrentLevelNumber(): number { return this.currentLevelNumberProperty.value; }

  /** Start the specified level and generate the initial challenge. */
  public startLevel( levelNumber: number ): void {
    this.currentLevelNumberProperty.value = levelNumber;
    this.currentViewProperty.value = 'level';
    this.getCurrentLevel().resetForNewChallenge();
    this.generateNewChallenge();
  }

  /** Show the level selection view. */
  public showSelection(): void {
    this.currentViewProperty.value = 'selection';
  }

  /** Number of levels available. */
  public getLevelCount(): number { return this.levels.length; }

  /** Level configuration for a level number. */
  public getLevelConfig( levelNumber: number ): LevelConfig {
    const index = Math.max( 1, Math.min( this.levelConfigs.length, levelNumber ) ) - 1;
    return this.levelConfigs[ index ];
  }

  /** Description for a level. */
  public getLevelDescription( levelNumber: number ): string { return this.getLevelConfig( levelNumber ).description; }

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

// Local types to organize challenges and level configuration without new files
type Challenge = {
  leftAddend: number;
  missingValue: number;
  total: number;
  text: string;
};

function createChallenge( leftAddend: number, missingValue: number, total: number ): Challenge {
  return {
    leftAddend: leftAddend,
    missingValue: missingValue,
    total: total,
    text: `${leftAddend} + x = ${total}`
  };
}

type LevelConfig = {
  id: number;
  description: string;
  gridRange: 'zeroToTen' | 'zeroToTwenty';
  generateChallenge: () => Challenge;
};