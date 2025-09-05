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

export type ChallengeType = 'bond' | 'decomposition' | 'sum' | 'numberLine';
export type MissingComponent = 'a' | 'b' | 'y';

export default class Challenge {
  public readonly type: ChallengeType;
  public readonly missing: MissingComponent;

  // If a component is missing, its value is null. The remaining components are non-null.
  public readonly a: number | null;
  public readonly b: number | null;
  public readonly y: number | null;

  // Range used to generate/validate values (useful for grid selection and future validation)
  public readonly range: 'zeroToTen' | 'zeroToTwenty';

  // Track numbers the user has already guessed for this challenge
  private readonly guessedNumbers: Set<number> = new Set<number>();

  public constructor( type: ChallengeType, missing: MissingComponent, a: number | null, b: number | null, y: number | null, range: 'zeroToTen' | 'zeroToTwenty' ) {
    this.type = type;
    this.missing = missing;
    this.a = a;
    this.b = b;
    this.y = y;
    this.range = range;
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

  /** Records a guess into the set of already guessed numbers. */
  public addGuess( guess: number ): void {
    this.guessedNumbers.add( guess );
  }

  /** Whether this number has already been guessed for this challenge. */
  public hasGuessed( guess: number ): boolean {
    return this.guessedNumbers.has( guess );
  }

  /** Returns an array of all guessed numbers (copy). */
  public getGuessedNumbers(): number[] {
    return Array.from( this.guessedNumbers );
  }

  /** Clears all recorded guesses. */
  public resetGuesses(): void {
    this.guessedNumbers.clear();
  }

  /** Simple equation string suitable for the current prototype UI. */
  public toEquationString(): string {
    // Use a generic sum form for now; views will evolve with representations.
    const aStr = this.missing === 'a' ? 'x' : String( this.a );
    const bStr = this.missing === 'b' ? 'x' : String( this.b );
    const yStr = this.missing === 'y' ? 'x' : String( this.y );
    return `${aStr} + ${bStr} = ${yStr}`;
  }
}

numberPairs.register( 'Challenge', Challenge );