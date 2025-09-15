// Copyright 2025, University of Colorado Boulder

/**
 * Challenge represents one question in the game for a+b=y. It knows which representation it is, which component is
 * missing, and the numeric values.
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
                  ( () => { throw new Error( `Unhandled missing: ${this.missing}` ); } )();
  }

  public isCorrect( guess: number ): boolean { return guess === this.answer; }

  /**
   * Returns a concise string representation for debugging, e.g. "3 + ? = 7 (answer = 4)".
   */
  public toDebugString(): string {
    const aStr = this.missing === 'a' ? '?' : `${this.a}`;
    const bStr = this.missing === 'b' ? '?' : `${this.b}`;
    const yStr = this.missing === 'y' ? '?' : `${this.y}`;
    return `${aStr} + ${bStr} = ${yStr} (answer = ${this.answer})`;
  }
}

numberPairs.register( 'Challenge', Challenge );
