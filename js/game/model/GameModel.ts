// Copyright 2024-2025, University of Colorado Boulder

/**
 * GameModel is the top-level model for the 'Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import TModel from '../../../../joist/js/TModel.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';
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

    // No aggregate session score; scoring is per-level

    // Configure and create per-level models
    this.levelConfigs = [
      {
        id: 1,
        description: 'Level 1 Missing addends in a number bond (0-10)',
        gridRange: 'zeroToTen',
        generateChallenge: () => {
          const y = dotRandom.nextIntBetween( 0, 10 );
          const a = dotRandom.nextIntBetween( 0, y );
          return createChallenge( 'bond', 'b', a, null, y, 'zeroToTen' );
        }
      },
      {
        id: 2,
        description: 'Level 2 Missing addend in a number bond (10 only)',
        gridRange: 'zeroToTen',
        generateChallenge: () => {
          const y = 10;
          const a = dotRandom.nextIntBetween( 0, y );
          return createChallenge( 'bond', 'b', a, null, y, 'zeroToTen' );
        }
      },
      {
        id: 3,
        description: 'Level 3 Missing addend in a decomposition equation',
        gridRange: 'zeroToTen',
        generateChallenge: () => {
          const y = dotRandom.nextIntBetween( 0, 10 );
          const a = dotRandom.nextIntBetween( 0, y );
          return createChallenge( 'decomposition', 'b', a, null, y, 'zeroToTen' );
        }
      },
      {
        id: 4,
        description: 'Level 4 Missing addend in a sum equation (10 only)',
        gridRange: 'zeroToTen',
        generateChallenge: () => {
          const y = 10;
          const a = dotRandom.nextIntBetween( 0, y );
          return createChallenge( 'sum', 'b', a, null, y, 'zeroToTen' );
        }
      },
      {
        id: 5,
        description: 'Level 5 Missing addend with a number bond (11-20)',
        gridRange: 'zeroToTwenty',
        generateChallenge: () => {
          const y = dotRandom.nextIntBetween( 11, 20 );
          const a = dotRandom.nextIntBetween( 0, y );
          return createChallenge( 'bond', 'b', a, null, y, 'zeroToTwenty' );
        }
      },
      {
        id: 6,
        description: 'Level 6 Missing addend with decomposition equation (11-20)',
        gridRange: 'zeroToTwenty',
        generateChallenge: () => {
          const y = dotRandom.nextIntBetween( 11, 20 );
          const a = dotRandom.nextIntBetween( 0, y );
          return createChallenge( 'decomposition', 'b', a, null, y, 'zeroToTwenty' );
        }
      },
      {
        id: 7,
        description: 'Level 7 Missing addend or total with sum equation (11-20)',
        gridRange: 'zeroToTwenty',
        generateChallenge: () => {
          const y = dotRandom.nextIntBetween( 11, 20 );
          const a = dotRandom.nextIntBetween( 0, y );
          const b = y - a;
          const choices: Array<'a' | 'b' | 'y'> = [ 'a', 'b', 'y' ];
          const missing = choices[ dotRandom.nextIntBetween( 0, choices.length - 1 ) ];
          if ( missing === 'a' ) {
            return createChallenge( 'sum', 'a', null, b, y, 'zeroToTwenty' );
          }
          else if ( missing === 'b' ) {
            return createChallenge( 'sum', 'b', a, null, y, 'zeroToTwenty' );
          }
          else { // missing === 'y'
            return createChallenge( 'sum', 'y', a, b, null, 'zeroToTwenty' );
          }
        }
      },
      {
        id: 8,
        description: 'Level 8 Equations with the number line (0-20)',
        gridRange: 'zeroToTwenty',
        generateChallenge: () => {
          const y = dotRandom.nextIntBetween( 0, 20 );
          const a = dotRandom.nextIntBetween( 0, y );
          const b = y - a;
          const missing = dotRandom.nextIntBetween( 0, 1 ) === 0 ? 'a' : 'b';
          if ( missing === 'a' ) {
            return createChallenge( 'numberLine', 'a', null, b, y, 'zeroToTwenty' );
          }
          else {
            return createChallenge( 'numberLine', 'b', a, null, y, 'zeroToTwenty' );
          }
        }
      }
    ];

    this.levels = this.levelConfigs.map( cfg => new Level( providedOptions.tandem.createTandem( `level${cfg.id}` ), cfg.id ) );

    // Defer challenge generation until a level is started
  }

  /** Generates and applies a new challenge for the current level. */
  public generateNewChallenge(): void {
    let challenge = this.getLevelConfig( this.getCurrentLevelNumber() ).generateChallenge();
    if ( this.levels && this.levels.length > 0 ) {
      const level = this.getCurrentLevel();

      // If this is the first challenge for this level, enforce that y, a, b are all non-zero
      if ( level.isFirstChallenge ) {
        let attempts = 0;
        const isValidFirstChallenge = ( ch: Challenge ): boolean => {
          if ( ch.y === null ) { return false; }

          const y = ch.missing === 'y' ? ch.expectedAnswer() : ch.y;
          const aVal = ch.missing === 'a' ? ch.expectedAnswer() : ( ch.a! );
          const bVal = ch.missing === 'b' ? ch.expectedAnswer() : ( ch.b! );

          return y > 0 && aVal > 0 && bVal > 0;
        };
        while ( attempts < 100 && !isValidFirstChallenge( challenge ) ) {
          challenge = this.getLevelConfig( this.getCurrentLevelNumber() ).generateChallenge();
          attempts++;
        }

        // For Level 8, first challenge specifically requires left known, right missing (i.e. missing === 'b')
        if ( this.getCurrentLevelNumber() === 8 ) {
          const y = challenge.missing === 'y' ? challenge.expectedAnswer() : ( challenge.y! );
          const a = challenge.missing === 'a' ? challenge.expectedAnswer() : ( challenge.a! );
          challenge = createChallenge( 'numberLine', 'b', a, null, y, 'zeroToTwenty' );
        }
        level.isFirstChallenge = false;
      }

      level.resetForNewChallenge();
      level.currentChallengeProperty.value = challenge;
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

type LevelConfig = {
  id: number;
  description: string;
  gridRange: 'zeroToTen' | 'zeroToTwenty';
  generateChallenge: () => Challenge;
};

function createChallenge( type: 'bond' | 'decomposition' | 'sum' | 'numberLine', missing: 'a' | 'b' | 'y', a: number | null, b: number | null, y: number | null, range: 'zeroToTen' | 'zeroToTwenty' ): Challenge {
  return new Challenge( type, missing, a, b, y, range );
}