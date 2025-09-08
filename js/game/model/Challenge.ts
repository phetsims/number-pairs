// Copyright 2025, University of Colorado Boulder

/**
 * Challenge encapsulates the arithmetic state for a single problem in the game.
 * It knows which representation it is, which component is missing, and the numeric values.
 *
 * This model is intentionally UI-agnostic; views can format as needed.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import numberPairs from '../../numberPairs.js';

export type MissingComponent = 'a' | 'b' | 'y';

export default class Challenge {
  public readonly missing: MissingComponent;

  // If a component is missing, its value is null. The remaining components are non-null.
  public readonly a: number | null;
  public readonly b: number | null;
  public readonly y: number | null;

  public constructor( missing: MissingComponent, a: number | null, b: number | null, y: number | null ) {
    this.missing = missing;
    this.a = a;
    this.b = b;
    this.y = y;
  }

  /** Returns the expected numeric answer for the missing component. */
  public expectedAnswer(): number {
    if ( this.missing === 'a' ) {
      if ( this.y === null || this.b === null ) { throw new Error( 'invalid challenge values' ); }
      return this.y - this.b;
    }
    if ( this.missing === 'b' ) {
      if ( this.y === null || this.a === null ) { throw new Error( 'invalid challenge values' ); }
      return this.y - this.a;
    }
    // missing === 'y'
    if ( this.a === null || this.b === null ) { throw new Error( 'invalid challenge values' ); }
    return this.a + this.b;
  }

  /** Returns true if the provided guess matches the expected numeric answer. */
  public isCorrect( guess: number ): boolean {
    return guess === this.expectedAnswer();
  }
}

numberPairs.register( 'Challenge', Challenge );
