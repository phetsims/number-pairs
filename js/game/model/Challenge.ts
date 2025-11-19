// Copyright 2025, University of Colorado Boulder

/**
 * Challenge represents one question in the game for a+b=y. It knows which representation it is, which component is
 * missing, and the numeric values.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import numberPairs from '../../numberPairs.js';

export type MissingComponent = 'a' | 'b' | 'y';

type ChallengeState = {
  //REVIEW Consider naming this field missingComponent. 'missing' sounds like a boolean in context.
  missing: MissingComponent;
  a: number;
  b: number;
  y: number;
};

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

  //REVIEW Document the type of serialization used.
  public static ChallengeIO = new IOType<Challenge, ChallengeState>( 'ChallengeIO', {
    valueType: Challenge,

    // Also provides toStateObject()
    stateSchema: {
      missing: StringIO,
      a: NumberIO,
      b: NumberIO,
      y: NumberIO
    },
    fromStateObject: ( state: ChallengeState ): Challenge => {
      return new Challenge( state.missing, state.a, state.b, state.y );
    }
  } );
}

numberPairs.register( 'Challenge', Challenge );
