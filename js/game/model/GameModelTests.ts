// Copyright 2025, University of Colorado Boulder

/**
 * Tests for GameModel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';

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
  }
}

numberPairs.register( 'GameModelTests', GameModelTests );