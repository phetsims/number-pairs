// Copyright 2025, University of Colorado Boulder

/**
 * Tests for GameModel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';
import GameModel from './GameModel.js';
import Level from './Level.js';

export default class GameModelTests {
  public constructor() {
    console.log( 'GameModelTests' );
  }

  public start(): void {
    console.log( 'start tests' );

    // Basic passing tests for Challenge
    const c1 = new Challenge( 'sum', 'b', 3, null, 8, 'zeroToTen' );
    affirm( c1.expectedAnswer() === 5, 'expectedAnswer for 3 + x = 8 is 5' );
    affirm( c1.isCorrect( 5 ), 'isCorrect accepts correct guess 5' );
    affirm( !c1.isCorrect( 4 ), 'isCorrect rejects incorrect guess 4' );

    const c2 = new Challenge( 'sum', 'y', 4, 7, null, 'zeroToTwenty' );
    affirm( c2.expectedAnswer() === 11, 'expectedAnswer for 4 + 7 = x is 11' );

    const c3 = new Challenge( 'decomposition', 'a', null, 6, 15, 'zeroToTwenty' );
    affirm( c3.expectedAnswer() === 9, 'expectedAnswer for x + 6 = 15 is 9' );

    // Negative case: wrong guess should be incorrect
    affirm( !c1.isCorrect( 4 ), 'wrong guess 4 should be incorrect for 3 + x = 8' );

    // Scoring tests: only a correct first guess grants points
    const level = new Level( Tandem.OPT_OUT, 1, true, false );

    // First challenge: correct on first try -> +1 point
    level.currentChallengeProperty.value = new Challenge( 'sum', 'b', 3, null, 8, 'zeroToTen' );
    affirm( level.scoreProperty.value === 0, 'initial score is 0' );
    affirm( level.checkAnswer( 5 ), 'first challenge: correct on first try' );
    affirm( level.scoreProperty.value as number === 1, 'score increments to 1 for first-try correct' );

    // Second challenge: wrong first, then correct -> no additional points
    level.resetForNewChallenge();
    level.currentChallengeProperty.value = new Challenge( 'sum', 'b', 4, null, 9, 'zeroToTen' ); // expect 5
    affirm( !level.checkAnswer( 6 ), 'second challenge: wrong first guess' );
    affirm( level.checkAnswer( 5 ), 'second challenge: then correct' );
    affirm( level.scoreProperty.value as number === 1, 'score does not increment on non-first-try correct' );

    // Foundational generation constraints: a <= y, b <= y, a + b = y, and y obeys the expected range by level
    const gm = new GameModel( { tandem: Tandem.OPT_OUT } );

    const iterations = 100;
    const checkChallenge = ( ch: Challenge, minY: number, maxY: number ) => {
      // y should be within range (derive if missing)
      const y = ch.missing === 'y' ? ch.expectedAnswer() : ( ch.y! );
      affirm( y >= minY && y <= maxY, `y in [${minY},${maxY}]` );
      const aVal = ch.a !== null ? ch.a : ( ch.missing === 'a' ? ch.expectedAnswer() : null );
      const bVal = ch.b !== null ? ch.b : ( ch.missing === 'b' ? ch.expectedAnswer() : null );

      if ( aVal !== null ) {
        affirm( aVal >= 0 && aVal <= y, 'a within [0,y]' );
      }
      if ( bVal !== null ) {
        affirm( bVal >= 0 && bVal <= y, 'b within [0,y]' );
      }

      if ( aVal !== null && bVal !== null ) {
        affirm( aVal + bVal === y, `a+b=y holds: ${aVal}+${bVal}=${y}` );
      }
    };

    // Level-specific expected y ranges
    const ranges: Array<[ number, number ]> = [
      [ 0, 10 ], // level 1
      [ 10, 10 ], // level 2
      [ 0, 10 ], // level 3
      [ 10, 10 ], // level 4
      [ 11, 20 ], // level 5
      [ 11, 20 ], // level 6
      [ 11, 20 ], // level 7
      [ 0, 20 ] // level 8
    ];

    for ( let levelIndex = 1; levelIndex <= 8; levelIndex++ ) {
      const [ minY, maxY ] = ranges[ levelIndex - 1 ];
      for ( let i = 0; i < iterations; i++ ) {
        const ch = gm.createChallengeForLevel( levelIndex );
        checkChallenge( ch, minY, maxY );

        // Level 7: missing may be a, b, or y
        if ( levelIndex === 7 ) {
          affirm( ch.missing === 'a' || ch.missing === 'b' || ch.missing === 'y', 'level 7 missing is a/b/y' );
        }

        // Level 8: missing is a or b (never y)
        if ( levelIndex === 8 ) {
          affirm( ch.missing === 'a' || ch.missing === 'b', 'level 8 missing is a/b only' );
        }
      }
    }

    // First challenge has no zeros (y != 0, a != 0, b != 0)
    for ( let levelIndex = 1; levelIndex <= 8; levelIndex++ ) {
      gm.startLevel( levelIndex );
      const ch = gm.getLevel( levelIndex ).currentChallengeProperty.value;

      // y is non-zero
      affirm( typeof ch.y === 'number' && ch.y > 0, 'first challenge: y > 0' );

      // derive the addends regardless of which is missing
      const aVal = ch.missing === 'a' ? ch.expectedAnswer() : ( ch.a! );
      const bVal = ch.missing === 'b' ? ch.expectedAnswer() : ( ch.b! );

      // both addends are non-zero for the first challenge
      affirm( aVal > 0, 'first challenge: a > 0' );
      affirm( bVal > 0, 'first challenge: b > 0' );

      // Level 8: first challenge requires missing === 'b'
      if ( levelIndex === 8 ) {
        affirm( ch.missing === 'b', 'level 8 first challenge uses right addend missing' );
      }
    }

    // Stars are remembered at the model level and surfaced to selection via getLevelScoreProperty
    const gm2 = new GameModel( { tandem: Tandem.OPT_OUT } );
    gm2.startLevel( 1 );
    // Deterministic challenge so we can award a star
    gm2.getLevel( 1 ).currentChallengeProperty.value = new Challenge( 'sum', 'b', 2, null, 7, 'zeroToTen' ); // expect 5
    affirm( gm2.getLevelScoreProperty( 1 ).value === 0, 'initial stars for level 1 are 0' );
    affirm( gm2.getLevel( 1 ).checkAnswer( 5 ), 'award star on first try for level 1' );
    affirm( gm2.getLevelScoreProperty( 1 ).value === 1, 'stars incremented to 1 for level 1' );

    // Navigate away and back; score should persist
    gm2.showSelection();
    gm2.startLevel( 2 );
    affirm( gm2.getLevelScoreProperty( 1 ).value === 1, 'level 1 stars remembered while viewing level 2/selection' );

    // New challenges should not reset the score
    gm2.startLevel( 1 );
    gm2.generateNewChallenge();
    affirm( gm2.getLevelScoreProperty( 1 ).value === 1, 'level 1 stars persist after new challenge' );

    // Model reset clears scores
    gm2.reset();
    affirm( gm2.getLevelScoreProperty( 1 ).value === 0, 'level 1 stars reset to 0 after model reset' );

    // Eye toggle availability: off for level 1, on for levels 2..8
    const gm3 = new GameModel( { tandem: Tandem.OPT_OUT } );
    for ( let levelIndex = 1; levelIndex <= 8; levelIndex++ ) {
      const hasEyeToggle = gm3.getLevel( levelIndex ).hasEyeToggle;
      if ( levelIndex === 1 ) {
        affirm( !hasEyeToggle, 'level 1 has no eye toggle' );
      }
      else {
        affirm( hasEyeToggle, `level ${levelIndex} has eye toggle` );
      }
    }
  }
}

numberPairs.register( 'GameModelTests', GameModelTests );