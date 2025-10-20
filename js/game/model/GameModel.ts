// Copyright 2024-2025, University of Colorado Boulder

/**
 * GameModel is the top-level model for the 'Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import TModel from '../../../../joist/js/TModel.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsQueryParameters from '../../common/NumberPairsQueryParameters.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import Challenge from './Challenge.js';
import Level from './Level.js';
import NumberLineLevel from './NumberLineLevel.js';

type SelfOptions = EmptySelfOptions;

type GameModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export const LevelValues = [ 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8' ] as const;
export type LevelType = ( typeof LevelValues )[number];

const ModeValues = [ 'levelSelectionScreen', ...LevelValues ] as const;
export type Mode = ( typeof ModeValues )[number];

export default class GameModel implements TModel {

  public readonly modeProperty: StringUnionProperty<Mode>;

  // Individual level models (persistent across session lifetime)
  // indexed 0..N-1 for levels 1..N
  public readonly levels: Level[];

  // Emits when a level reaches the reward score for the first time.
  public readonly rewardAchievedEmitter: Emitter<[ number, number ]>;
  public readonly levelAnswerFeedbackEmitter: Emitter<[ 'correct' | 'incorrect', Level ]>;

  public constructor( providedOptions: GameModelOptions ) {

    const tandem = providedOptions.tandem;

    this.rewardAchievedEmitter = new Emitter<[ number, number ]>( {
      tandem: tandem.createTandem( 'rewardAchievedEmitter' ),
      parameters: [
        {
          name: 'levelNumber',
          phetioType: NumberIO,
          valueType: 'number',
          phetioDocumentation: '1-indexed level number whose score reached the reward threshold'
        },
        {
          name: 'score',
          phetioType: NumberIO,
          valueType: 'number',
          phetioDocumentation: 'Score value that triggered the reward'
        }
      ]
    } );
    this.levelAnswerFeedbackEmitter = new Emitter<[ 'correct' | 'incorrect', Level ]>( {
      parameters: [
        { valueType: 'string' },
        { valueType: Level }
      ]
    } );

    this.modeProperty = new StringUnionProperty<Mode>( 'levelSelectionScreen', {
      validValues: ModeValues,
      tandem: tandem.createTandem( 'modeProperty' ),
      phetioDocumentation: 'the current level, or "levelSelectionScreen" if the level selection screen is showing',

      // In GameScreenView, we rely on listener order dispatch for recording and restoring focus
      hasListenerOrderDependencies: true
    } );

    /**
     * For all Levels + Challenges:
     * - The randomly chosen numbers follow: a ≤ y and  b ≤ y, a+b=y, and y ≤ 10 or 20
     * - y, a, and b are positive integers taking on values 0, 1, …, 20
     * - First challenge will not have y=0, a=0, or b=0
     */

    /**
     * Shared logic for levels 2 and 3 (y=10)
     */
    const createNonzeroSumTo10Challenge = () => {
      const y = 10;
      const a = dotRandom.nextIntBetween( 1, y - 1 );
      return new Challenge( dotRandom.sample( [ 'a', 'b' ] as const ), a, y - a, y );
    };

    this.levels = [

      /**
       * [L1] Level 1 (0-10) Missing addends – fluency facts
       * Number Bond
       * neither addend is zero since it can't be shown well with the number bar representation.
       */
      new Level( 'level1', 1, NumberPairsColors.level1StatusBarColorProperty, NumberPairsFluent.gameScreen.levelDescriptions.level1StringProperty, 'zeroToTen', 'bond', isFirst => {
        const y = dotRandom.nextIntBetween( 2, 10 );
        const { a, b } = generateAddends( y, true );
        return new Challenge( dotRandom.sample( [ 'a', 'b' ] as const ), a, b, y );
      }, {
        representationType: RepresentationType.KITTENS,
        tandem: tandem.createTandem( 'level1' )
      } ),

      /**
       * ### Level 2 (total is 10 only): missing addend \- 10 only – counting area can be hidden
       *
       * Identical to level 1 with the following exceptions
       * - The value of y is always 10
       * - The counting area can be hidden
       */
      new Level( 'level2', 2, NumberPairsColors.level234StatusBarColorProperty, NumberPairsFluent.gameScreen.levelDescriptions.level2StringProperty, 'zeroToTen', 'bond', createNonzeroSumTo10Challenge, {
        representationType: RepresentationType.KITTENS,
        tandem: tandem.createTandem( 'level2' )
      } ),

      /**
       * ### Level 3 (10 only): Missing addends: Equation (10 only)
       *
       * Identical to level 2, except the representation of the decomposition is an equation
       */
      new Level( 'level3', 3, NumberPairsColors.level234StatusBarColorProperty, NumberPairsFluent.gameScreen.levelDescriptions.level3StringProperty, 'zeroToTen', 'decompositionEquation', createNonzeroSumTo10Challenge, {
        representationType: RepresentationType.KITTENS,
        tandem: tandem.createTandem( 'level3' )
      } ),

      /**
       * ### Level 4 (10 only): missing addend, sum equation
       *
       * Identical to Level 3, except the equation is flipped to represent a sum rather than a decomposition
       */
      new Level( 'level4', 4, NumberPairsColors.level234StatusBarColorProperty, NumberPairsFluent.gameScreen.levelDescriptions.level4StringProperty, 'zeroToTen', 'sumEquation', isFirst => {
        const y = 10;
        const { a, b } = generateAddends( y, isFirst );
        return new Challenge( dotRandom.sample( [ 'a', 'b' ] as const ), a, b, y );
      }, {
        representationType: RepresentationType.KITTENS,
        tandem: tandem.createTandem( 'level4' )
      } ),

      /**
       * ### Level 5 (11-20): missing addend with number bond, promotes fact fluency
       *
       * * Uses game logic for number bond, where y is any number between 11-20
       * * Ten frame (organize) button organizes into separate locations since this is a decomposition screen
       */
      new Level( 'level5', 5, NumberPairsColors.level567StatusBarColorProperty, NumberPairsFluent.gameScreen.levelDescriptions.level5StringProperty, 'zeroToTwenty', 'bond', isFirst => {
        const y = dotRandom.nextIntBetween( 11, 20 );
        const { a, b } = generateAddends( y, true );
        return new Challenge( dotRandom.sample( [ 'a', 'b' ] as const ), a, b, y );
      }, {
        representationType: RepresentationType.KITTENS,
        tandem: tandem.createTandem( 'level5' )
      } ),

      /**
       * ### Level 6 (11-20): missing addend with decomposition equation
       *
       * * See logic for [decomposition
       * equation](https://docs.google.com/document/d/1flSZAAlRbpN9OdGkYBMQ6HYyCsp31ruLrAm52y-_m1w/edit?pli=1#heading=h.ukjqs5rtjvn8)
       * * Ten frame (organize) button organizes into two separate ten frames on left/right since this is decomposition
       */
      new Level( 'level6', 6, NumberPairsColors.level567StatusBarColorProperty, NumberPairsFluent.gameScreen.levelDescriptions.level6StringProperty, 'zeroToTwenty', 'decompositionEquation', isFirst => {
        const y = dotRandom.nextIntBetween( 11, 20 );
        const { a, b } = generateAddends( y, isFirst );
        return new Challenge( dotRandom.sample( [ 'a', 'b' ] as const ), a, b, y );
      }, {
        representationType: RepresentationType.KITTENS,
        tandem: tandem.createTandem( 'level6' )
      } ),

      /**
       * ### Level 7 (11-20): missing addend or total, sum equation only, fact fluency
       *
       * Ten frame (organize) button arranges into a single ten frame in the center of the field since this is a “combine” or sum skill
       * The missing component could be either addend or the total (i.e. any of a, b, or y could be missing)
       * Value range for y is from 11-20
       */
      new Level( 'level7', 7, NumberPairsColors.level567StatusBarColorProperty, NumberPairsFluent.gameScreen.levelDescriptions.level7StringProperty, 'zeroToTwenty', 'sumEquation', isFirst => {
        const y = dotRandom.nextIntBetween( 11, 20 );
        const { a, b } = generateAddends( y, isFirst );
        return new Challenge( dotRandom.sample( [ 'a', 'b', 'y' ] as const ), a, b, y );
      }, {
        representationType: RepresentationType.KITTENS,
        tandem: tandem.createTandem( 'level7' )
      } ),

      /**
       * ### Level 8 (0-20): missing both addends, fact fluency,
       *
       * - First challenge: left addend known, right addend unknown
       * - Subsequent challenges could be the left or the right addend (not the total)
       */
      new NumberLineLevel( 'level8', 8, NumberPairsColors.level8StatusBarColorProperty, NumberPairsFluent.gameScreen.levelDescriptions.level8StringProperty, 'zeroToTwenty', 'numberLine', isFirst => {

        // First challenge: y >= 2 so a,b > 0; subsequent: y can be 0..20 (allowing 0+0=0)
        const y = dotRandom.nextIntBetween( isFirst ? 2 : 0, 20 );
        const { a, b } = generateAddends( y, isFirst );
        const missingComponent = isFirst ? 'b' : dotRandom.sample( [ 'a', 'b' ] as const ); // total never missing on number line
        return new Challenge( missingComponent, a, b, y );
      }, {
        representationType: RepresentationType.NUMBER_LINE,
        tandem: tandem.createTandem( 'level8' )
      } )
    ];

    this.levels.forEach( level => {
      level.scoreProperty.link( score => {
        if ( score >= NumberPairsQueryParameters.rewardScore && !level.hasShownReward ) {
          level.hasShownReward = true;
          this.rewardAchievedEmitter.emit( level.levelNumber, score );
        }
      } );
      level.answerFeedbackEmitter.addListener( feedback => {
        this.levelAnswerFeedbackEmitter.emit( feedback, level );
      } );
    } );
  }

  public getLevel( levelNumber: number ): Level {
    affirm( levelNumber >= 1 && levelNumber <= this.getLevelCount(), `invalid level number: ${levelNumber}` );
    return this.levels[ levelNumber - 1 ];
  }

  public setLevel( levelNumber: number ): void {
    affirm( levelNumber >= 1 && levelNumber <= this.getLevelCount(), `invalid level number: ${levelNumber}` );
    this.modeProperty.value = LevelValues[ levelNumber - 1 ];
  }

  public getLevelCount(): number {
    return this.levels.length;
  }

  public reset(): void {
    this.levels.forEach( level => level.reset() );
  }

  public step( dt: number ): void {
    // No step behavior needed for this game model
  }
}

/**
 * Helper to generate (a,b) for a given y, honoring first-challenge constraint (no zeros) when possible.
 */
const generateAddends = ( y: number, zeroIsNotAllowed: boolean ): { a: number; b: number } => {
  if ( y === 0 ) {
    // Only valid pair when y=0
    return { a: 0, b: 0 };
  }
  const minA = zeroIsNotAllowed ? 1 : 0;
  const maxA = Math.max( minA, y - 1 ); // ensure valid range even for small y
  const a = dotRandom.nextIntBetween( minA, maxA );
  const b = y - a;
  return { a: a, b: b };
};

numberPairs.register( 'GameModel', GameModel );
