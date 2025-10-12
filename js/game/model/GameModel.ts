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
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import NumberPairsQueryParameters from '../../common/NumberPairsQueryParameters.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';
import Level from './Level.js';
import NumberLineLevel from './NumberLineLevel.js';

type SelfOptions = EmptySelfOptions;

type GameModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

const ModeValues = [ 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8', 'levelSelectionScreen' ] as const;
export type Mode = ( typeof ModeValues )[number];

export default class GameModel implements TModel {

  public readonly modeProperty: StringUnionProperty<Mode>;

  // Individual level models (persistent across session lifetime)
  // indexed 0..N-1 for levels 1..N
  public readonly levels: Level[];

  // Emits when a level reaches the reward score for the first time.
  public readonly rewardAchievedEmitter: Emitter<[ number, number ]>;

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
     * Shared logic for levels 2, 3, and 4 (y=10)
     */
    const createLevel23Challenge = () => {
      const y = 10;
      const a = dotRandom.nextIntBetween( 1, y - 1 );
      return new Challenge( dotRandom.sample( [ 'a', 'b' ] as const ), a, y - a, y );
    };

    // Hex for status bar & level selection icon
    const level1Color = '#EFBEBD';
    const level234Color = '#BCA4F7';
    const level567Color = '#9EDCEF';
    const level8Color = '#F2928B';

    this.levels = [

      /**
       * [L1] Level 1 (0-10) Missing addends – fluency facts
       * Number Bond
       * neither addend is zero since it can't be shown well with the number bar representation.
       */
      new Level( 1, level1Color, 'Missing addend in a number bond (0-10)', 'zeroToTen', 'bond', isFirst => {
        const y = dotRandom.nextIntBetween( 2, 10 );
        const a = dotRandom.nextIntBetween( 1, y - 1 );
        return new Challenge( dotRandom.sample( [ 'a', 'b' ] as const ), a, y - a, y );
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
      new Level( 2, level234Color, 'Missing addend in a number bond (10 only)', 'zeroToTen', 'bond', createLevel23Challenge, {
        representationType: RepresentationType.KITTENS,
        tandem: tandem.createTandem( 'level2' )
      } ),

      /**
       * ### Level 3 (10 only): Missing addends: Equation (10 only)
       *
       * Identical to level 2, except the representation of the decomposition is an equation
       */
      new Level( 3, level234Color, 'Missing addend in a decomposition equation (10 only)', 'zeroToTen', 'decompositionEquation', createLevel23Challenge, {
        representationType: RepresentationType.KITTENS,
        tandem: tandem.createTandem( 'level3' )
      } ),

      /**
       * ### Level 4 (10 only): missing addend, sum equation
       *
       * Identical to Level 3, except the equation is flipped to represent a sum rather than a decomposition
       */
      new Level( 4, level234Color, 'Missing addend in a sum equation (10 only)', 'zeroToTen', 'sumEquation', isFirst => {
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
      new Level( 5, level567Color, 'Missing addend in a number bond (11-20)', 'zeroToTwenty', 'bond', isFirst => {
        const y = dotRandom.nextIntBetween( 11, 20 );
        const { a, b } = generateAddends( y, isFirst );
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
       *   ![][image185]
       */
      new Level( 6, level567Color, 'Missing addend in a decomposition equation (11-20)', 'zeroToTwenty', 'decompositionEquation', isFirst => {
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
       * See logic for [sum equations](https://docs.google.com/document/d/1flSZAAlRbpN9OdGkYBMQ6HYyCsp31ruLrAm52y-_m1w/edit?pli=1#heading=h.o9d55p201mw3)
       * Ten frame (organize) button arranges into a single ten frame in the center of the field since this is a “combine” or sum skill
       * The missing component could be either addend or the total (i.e. any of a, b, or y could be missing)
       * Value range for y is from 11-20
       */
      new Level( 7, level567Color, 'Missing addend or total in a sum equation (11-20)', 'zeroToTwenty', 'sumEquation', isFirst => {
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
       * - See logic for [sum equations](#heading=h.o9d55p201mw3)
       * - First challenge: left addend known, right addend unknown
       * - Subsequent challenges could be the left or the right addend (not the total)
       */
      new NumberLineLevel( 8, level8Color, 'Equations with the number line (0-20)', 'zeroToTwenty', 'numberLine', isFirst => {

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
    } );
  }

  public getLevel( levelNumber: number ): Level {
    const index = Math.max( 1, Math.min( 8, levelNumber ) ) - 1;
    return this.levels[ index ];
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
const generateAddends = ( y: number, isFirst: boolean ): { a: number; b: number } => {
  if ( y === 0 ) {
    // Only valid pair when y=0
    return { a: 0, b: 0 };
  }
  const minA = isFirst ? 1 : 0;
  const maxA = Math.max( minA, y - 1 ); // ensure valid range even for small y
  const a = dotRandom.nextIntBetween( minA, maxA );
  const b = y - a;
  return { a: a, b: b };
};

numberPairs.register( 'GameModel', GameModel );
