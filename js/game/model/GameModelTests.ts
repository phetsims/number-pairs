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
    const level = new Level( Tandem.OPT_OUT );

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
  }
}

numberPairs.register( 'GameModelTests', GameModelTests );