// Copyright 2025, University of Colorado Boulder

/**
 * Model for a single level in the Number Pairs game. It maintains state regarding the current challenge, what the
 * user has guessed so far, etc.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import createObservableArray, { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';

export type ChallengeType = 'bond' | 'decompositionEquation' | 'sumEquation' | 'numberLine';

export default class Level {

  // Accumulated points on this level.
  public readonly scoreProperty: NumberProperty;

  // The current challenge for this level.
  public readonly challengeProperty: Property<Challenge>;

  // 'idle' = no feedback, 'incorrect' = last guess was incorrect, 'correct' = last guess was correct
  public readonly feedbackStateProperty: StringUnionProperty<'idle' | 'incorrect' | 'correct'>;

  // List of numbers already guessed for the current challenge, used to know if they got it right on their first guess
  // and to gray out those numbers in the grid.
  public readonly guessedNumbers: ObservableArray<number>;

  public constructor(
    tandem: Tandem,
    public readonly levelNumber: number, // 1-indexed level number
    public readonly description: string, // Appears in the bar at the top of the screen
    public readonly hasOrganizeTenFrameButton: boolean,
    public readonly hasEyeToggle: boolean,
    public readonly range: 'zeroToTen' | 'zeroToTwenty', // possible guesses
    public readonly type: ChallengeType,
    private readonly createChallenge: ( isFirst: boolean ) => Challenge
  ) {
    this.scoreProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'scoreProperty' )
    } );

    this.feedbackStateProperty = new StringUnionProperty<'idle' | 'incorrect' | 'correct'>( 'idle', {
      validValues: [ 'idle', 'incorrect', 'correct' ],
      tandem: Tandem.OPT_OUT
    } );

    this.challengeProperty = new Property<Challenge>( createChallenge( true ), {
      tandem: tandem.createTandem( 'challengeProperty' ),
      phetioValueType: Challenge.ChallengeIO
    } );

    // Track numbers already guessed for the current challenge via an ObservableArray so views can react to adds/removes
    this.guessedNumbers = createObservableArray<number>( {
      tandem: tandem.createTandem( 'guessedNumbers' ),
      phetioType: createObservableArray.ObservableArrayIO( NumberIO )
    } );

    const debugString = `Level ${this.levelNumber}: type=${this.type}, range=${this.range}, hasEyeToggle=${this.hasEyeToggle}, hasOrganizeTenFrameButton=${this.hasOrganizeTenFrameButton}`;
    phet.chipper.queryParameters.dev && console.log( debugString );

    phet.chipper.queryParameters.dev && this.challengeProperty.link( challenge => {
      console.log( `Level ${this.levelNumber}: ${challenge.toDebugString()}` );
    } );
  }

  public nextChallenge(): void {
    this.resetGuesses();
    this.feedbackStateProperty.value = 'idle';
    this.challengeProperty.value = this.createChallenge( false );
  }

  /**
   * Checks if the provided guess is correct for the current challenge and updates level state.
   */
  public checkAnswer( guess: number ): boolean {

    this.addGuess( guess );

    const isCorrect = this.challengeProperty.value.isCorrect( guess );

    if ( isCorrect ) {

      // Award star only on first try
      if ( this.guessedNumbers.length === 1 ) {
        this.scoreProperty.value++;
      }
      this.feedbackStateProperty.value = 'correct';
    }
    else {
      this.feedbackStateProperty.value = 'incorrect';
    }

    return isCorrect;
  }

  /**
   * Clears any incorrect/correct feedback, used when user changes selection before next check.
   */
  public clearFeedback(): void {
    this.feedbackStateProperty.value = 'idle';
  }

  private addGuess( guess: number ): void {
    if ( !this.guessedNumbers.includes( guess ) ) {
      this.guessedNumbers.push( guess );
    }
  }

  private resetGuesses(): void {
    this.guessedNumbers.clear();
  }

  public reset(): void {
    this.scoreProperty.reset();
    this.challengeProperty.value = this.createChallenge( true );
  }
}

numberPairs.register( 'Level', Level );
