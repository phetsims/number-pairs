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

    /**
     * For all Levels + Challenges:
     * - The randomly chosen numbers follow: a ≤ y and  b ≤ y, a+b=y, and y ≤ 10 or 20
     * - y, a, and b are positive integers taking on values 0, 1, …, 20
     * - First challenge will not have y=0, a=0, or b=0
     */
    const createLevel234Challenge = ( isFirst: boolean ): Challenge => {
      const y = 10;
      const a = dotRandom.nextIntBetween( isFirst ? 1 : 0, 9 );
      const b = y - a;
      const missingComponent = dotRandom.sample( [ 'a', 'b' ] as const );
      return new Challenge( missingComponent, a, b, y );
    };
    this.levels = [

      /**
       * [L1] Level 1 (0-10) Missing addends – fluency facts
       * Number Bond
       * - On first challenge, neither addend is zero
       */
      new Level( providedOptions.tandem.createTandem( 'level1' ), 1, true, false, 'zeroToTen', false, 'bond', ( isFirst: boolean ): Challenge => {
        const y = dotRandom.nextIntBetween( isFirst ? 2 : 1, 10 ); // [L1] first: y>=2 so a,b>0 possible
        const a = dotRandom.nextIntBetween( isFirst ? 1 : 0, y - 1 ); // [L1] first: a>0
        const b = y - a;
        const missingComponent = dotRandom.sample( [ 'a', 'b' ] as const ); // [L1] missing is a or b only
        return new Challenge( missingComponent, a, b, y );
      } ),

      /**
       * ### Level 2 (total is 10 only): missing addend \- 10 only – counting area can be hidden
       *
       * Identical to level 1 with the following exceptions
       * - The value of y is always 10
       * - The counting area can be hidden
       * Starting state is the counting area visible // TODO https://github.com/phetsims/number-pairs/issues/36
       */
      new Level( providedOptions.tandem.createTandem( 'level2' ), 2, true, true, 'zeroToTen', false, 'bond', createLevel234Challenge ),

      /**
       * ### Level 3 (10 only): Missing addends: Equation (10 only)
       *
       * Identical to level 2, except the representation of the decomposition is an equation
       */
      new Level( providedOptions.tandem.createTandem( 'level3' ), 3, true, true, 'zeroToTen', true, 'decomposition', createLevel234Challenge ),

      /**
       * ### Level 4 (10 only): missing addend, sum equation
       *
       * Identical to Level 3, except the equation is flipped to represent a sum rather than a decomposition
       */
      new Level( providedOptions.tandem.createTandem( 'level4' ), 4, true, true, 'zeroToTen', false, 'sum', createLevel234Challenge ),

      /**
       * ### Level 5 (11-20): missing addend with number bond, promotes fact fluency
       *
       * * Uses game logic for number bond, where y is any number between 11-20
       * * Ten frame (organize) button organizes into separate locations since this is a decomposition screen TODO: https://github.com/phetsims/number-pairs/issues/36
       */
      new Level( providedOptions.tandem.createTandem( 'level5' ), 5, true, true, 'zeroToTwenty', false, 'decomposition', ( isFirst: boolean ): Challenge => {
        const y = dotRandom.nextIntBetween( 11, 20 ); // [L5]
        const a = dotRandom.nextIntBetween( isFirst ? 1 : 0, y - 1 );
        const b = y - a;
        const missingComponent = dotRandom.sample( [ 'a', 'b' ] as const ); // [L1] missing is a or b only
        return new Challenge( missingComponent, a, b, y );
      } ),

      /**
       * ### Level 6 (11-20): missing addend with decomposition equation
       *
       * * See logic for [decomposition equation](https://docs.google.com/document/d/1flSZAAlRbpN9OdGkYBMQ6HYyCsp31ruLrAm52y-_m1w/edit?pli=1#heading=h.ukjqs5rtjvn8)
       * * Ten frame (organize) button organizes into two separate ten frames on left/right since this is decomposition
       *   ![][image185]
       */
      new Level( providedOptions.tandem.createTandem( 'level6' ), 6, true, true, 'zeroToTwenty', true, 'decomposition', ( isFirst: boolean ): Challenge => {
        const y = dotRandom.nextIntBetween( 11, 20 );
        const a = dotRandom.nextIntBetween( isFirst ? 1 : 0, y - 1 );
        const b = y - a;
        const missingComponent = dotRandom.sample( [ 'a', 'b' ] as const );
        return new Challenge( missingComponent, a, b, y );
      } ),

      /**
       * ### Level 7 (11-20): missing addend or total, sum equation only, fact fluency
       *
       * * See logic for [sum equations](https://docs.google.com/document/d/1flSZAAlRbpN9OdGkYBMQ6HYyCsp31ruLrAm52y-_m1w/edit?pli=1#heading=h.o9d55p201mw3)
       * * Ten frame (organize) button arranges into a single ten frame in the center of the field since this is a “combine” or sum skill TODO: https://github.com/phetsims/number-pairs/issues/36
       * * The missing component could be either addend or the total (i.e. any of a, b, or y could be missing)
       * * Value range for y is from 11-20
       */
      new Level( providedOptions.tandem.createTandem( 'level7' ), 7, true, true, 'zeroToTwenty', false, 'sum', ( isFirst: boolean ): Challenge => {
        const y = dotRandom.nextIntBetween( 11, 20 );
        const a = dotRandom.nextIntBetween( isFirst ? 1 : 0, y - 1 );
        const b = y - a;
        const missingComponent = dotRandom.sample( [ 'a', 'b', 'y' ] as const );
        return new Challenge( missingComponent, a, b, y );
      } ),

      /**
       * ### Level 8 (0-20): missing both addends, fact fluency,
       *
       * * See logic for [sum equations](#heading=h.o9d55p201mw3)
       * * First challenge: left addend known, right addend unknown
       * * Subsequent challenges could be the left or the right addend (not the total)
       */
      new Level( providedOptions.tandem.createTandem( 'level8' ), 8, false, true, 'zeroToTwenty', false, 'numberLine', ( isFirst: boolean ): Challenge => {
        const y = dotRandom.nextIntBetween( isFirst ? 1 : 0, 20 );
        const a = dotRandom.nextIntBetween( isFirst ? 1 : 0, y - 1 );
        const b = y - a;
        const missingComponent = isFirst ? 'b' : dotRandom.sample( [ 'a', 'b', 'y' ] as const );
        return new Challenge( missingComponent, a, b, y );
      } )
    ];
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
      level.reset();
    } );
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