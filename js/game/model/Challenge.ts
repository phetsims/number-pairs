// Copyright 2025, University of Colorado Boulder

/**
 * Challenge encapsulates the arithmetic state for a single problem in the game.
 * It knows which representation it is, which component is missing, and the numeric values.
 *
 * This model is intentionally UI-agnostic; views can format as needed.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import numberPairs from '../../numberPairs.js';

export type MissingComponent = 'a' | 'b' | 'y';

export default class Challenge {
  public readonly answer: number;

  public constructor(
    public readonly missing: MissingComponent,
    public readonly a: number,
    public readonly b: number,
    public readonly y: number
  ) {

    affirm( a + b === y, `Invalid Challenge: a(${a}) + b(${b}) should equal y(${y})` );

    this.answer = this.missing === 'a' ? this.a :
                  this.missing === 'b' ? this.b :
                  this.missing === 'y' ? this.y :
                  ( () => { throw new Error( `Unhandled missing: ${this.missing}` ); } )(); // IIFE to throw error
  }

  // Compatibility helpers for callers that query correctness
  public isCorrect( guess: number ): boolean { return guess === this.answer; }
}

numberPairs.register( 'Challenge', Challenge );
