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

    // Create per-level models with the appropriate capabilities
    this.levels = [
      // id, hasOrganize, hasEye, range, addendsOnRightInEquation, type
      new Level( providedOptions.tandem.createTandem( 'level1' ), 1, true, false, 'zeroToTen', false, 'bond' ),
      new Level( providedOptions.tandem.createTandem( 'level2' ), 2, true, true, 'zeroToTen', false, 'bond' ),
      new Level( providedOptions.tandem.createTandem( 'level3' ), 3, true, true, 'zeroToTen', true, 'decomposition' ),
      new Level( providedOptions.tandem.createTandem( 'level4' ), 4, true, true, 'zeroToTen', false, 'sum' ),
      new Level( providedOptions.tandem.createTandem( 'level5' ), 5, true, true, 'zeroToTwenty', false, 'bond' ),
      new Level( providedOptions.tandem.createTandem( 'level6' ), 6, true, true, 'zeroToTwenty', true, 'decomposition' ),
      new Level( providedOptions.tandem.createTandem( 'level7' ), 7, true, true, 'zeroToTwenty', false, 'sum' ),
      new Level( providedOptions.tandem.createTandem( 'level8' ), 8, false, true, 'zeroToTwenty', false, 'numberLine' )
    ];

    // Pre-allocate the first challenge for each level so challenges persist across navigation
    for ( let i = 1; i <= this.getLevelCount(); i++ ) {
      const level = this.getLevel( i );
      level.currentChallengeProperty.value = this.createChallengeForLevel( i, true );
    }
  }

  /** Generates and applies a new challenge for the current level. */
  public generateNewChallenge(): void {
    const challenge = this.createChallengeForLevel( this.getCurrentLevelNumber() );
    if ( this.levels && this.levels.length > 0 ) {
      const level = this.getCurrentLevel();

      level.resetForNewChallenge();
      level.currentChallengeProperty.value = challenge;
    }
  }

  // First-challenge generation is handled by createChallengeForLevel(levelNumber, true)

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
  }

  /** Show the level selection view. */
  public showSelection(): void {
    this.currentViewProperty.value = 'selection';
  }

  /** Number of levels available. */
  public getLevelCount(): number { return this.levels.length; }

  /** Grid range for a level. */
  public getGridRange( levelNumber: number ): 'zeroToTen' | 'zeroToTwenty' {
    return levelNumber <= 4 ? 'zeroToTen' : 'zeroToTwenty';
  }

  /** Description for a level. */
  public getLevelDescription( levelNumber: number ): string {
    switch( levelNumber ) {
      case 1:
        return 'Level 1 Missing addends in a number bond (0-10)';
      case 2:
        return 'Level 2 Missing addend in a number bond (10 only)';
      case 3:
        return 'Level 3 Missing addend in a decomposition equation';
      case 4:
        return 'Level 4 Missing addend in a sum equation (10 only)';
      case 5:
        return 'Level 5 Missing addend with a number bond (11-20)';
      case 6:
        return 'Level 6 Missing addend with decomposition equation (11-20)';
      case 7:
        return 'Level 7 Missing addend or total with sum equation (11-20)';
      case 8:
        return 'Level 8 Equations with the number line (0-20)';
      default:
        return '';
    }
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

  /** Create (but do not apply) a new Challenge appropriate for the specified level.
   *  If isFirst is true, applies first-challenge constraints (y present and > 0, a > 0, b > 0; level 8: missing='b').
   */
  public createChallengeForLevel( levelNumber: number, isFirst = false ): Challenge {
    switch( levelNumber ) {
      case 1: {
        // Bond, missing b
        const y = dotRandom.nextIntBetween( isFirst ? 2 : 1, 10 ); // first: need y>=2 so a,b>0 are possible
        const a = dotRandom.nextIntBetween( isFirst ? 1 : 0, y - 1 ); // ensure a>0 when first
        return createChallenge( 'b', a, null, y );
      }
      case 2: {
        const y = 10;
        // Avoid b=0 generally; and ensure a>0 when first
        const a = dotRandom.nextIntBetween( isFirst ? 1 : 0, 9 );
        return createChallenge( 'b', a, null, y );
      }
      case 3: {
        const y = dotRandom.nextIntBetween( isFirst ? 2 : 0, 10 );
        const a = dotRandom.nextIntBetween( isFirst ? 1 : 0, isFirst ? ( y - 1 ) : y );
        // First: a in [1, y-1] so a>0 and b>0; otherwise allow a==y (b=0 allowed for this level)
        return createChallenge( 'b', a, null, y );
      }
      case 4: {
        const y = 10;
        const a = dotRandom.nextIntBetween( isFirst ? 1 : 0, isFirst ? 9 : y );
        return createChallenge( 'b', a, null, y );
      }
      case 5: {
        const y = dotRandom.nextIntBetween( 11, 20 );
        // Avoid right addend (b) = 0 generally; and ensure a>0 when first
        const a = dotRandom.nextIntBetween( isFirst ? 1 : 0, y - 1 );
        return createChallenge( 'b', a, null, y );
      }
      case 6: {
        const y = dotRandom.nextIntBetween( 11, 20 );
        const a = dotRandom.nextIntBetween( isFirst ? 1 : 0, isFirst ? ( y - 1 ) : y );
        return createChallenge( 'b', a, null, y );
      }
      case 7: {
        const y = dotRandom.nextIntBetween( 11, 20 );
        if ( isFirst ) {
          // First: y shown, a>0, b>0; choose missing from a/b only
          const chooseA = dotRandom.nextIntBetween( 0, 1 ) === 0; // if true, missing a; else missing b
          if ( chooseA ) {
            const b = dotRandom.nextIntBetween( 1, y - 1 );
            return createChallenge( 'a', null, b, y );
          }
          else {
            const a = dotRandom.nextIntBetween( 1, y - 1 );
            return createChallenge( 'b', a, null, y );
          }
        }
        else {
          const a = dotRandom.nextIntBetween( 0, y );
          const b = y - a;
          const choices: Array<'a' | 'b' | 'y'> = [ 'a', 'b', 'y' ];
          const missing = choices[ dotRandom.nextIntBetween( 0, choices.length - 1 ) ];
          if ( missing === 'a' ) {
            return createChallenge( 'a', null, b, y );
          }
          else if ( missing === 'b' ) {
            return createChallenge( 'b', a, null, y );
          }
          else { // 'y'
            return createChallenge( 'y', a, b, null );
          }
        }
      }
      case 8: {
        if ( isFirst ) {
          // First: y shown, a>0, b>0, missing='b'
          const y = dotRandom.nextIntBetween( 2, 20 );
          const a = dotRandom.nextIntBetween( 1, y - 1 );
          return createChallenge( 'b', a, null, y );
        }
        else {
          const y = dotRandom.nextIntBetween( 0, 20 );
          const a = dotRandom.nextIntBetween( 0, y );
          const b = y - a;
          const missing = dotRandom.nextIntBetween( 0, 1 ) === 0 ? 'a' : 'b';
          if ( missing === 'a' ) {
            return createChallenge( 'a', null, b, y );
          }
          else {
            return createChallenge( 'b', a, null, y );
          }
        }
      }
      default: {
        const y = 10;
        const a = dotRandom.nextIntBetween( 0, y );
        return createChallenge( 'b', a, null, y );
      }
    }
  }
}

numberPairs.register( 'GameModel', GameModel );

function createChallenge( missing: 'a' | 'b' | 'y', a: number | null, b: number | null, y: number | null ): Challenge {
  return new Challenge( missing, a, b, y );
}
