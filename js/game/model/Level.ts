// Copyright 2025, University of Colorado Boulder

/**
 * Model for a single level in the Number Pairs game.
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';

export default class Level {
  public readonly scoreProperty: NumberProperty;
  public readonly isChallengeSolvedProperty: TReadOnlyProperty<boolean>;
  public readonly attemptsProperty: NumberProperty;
  public readonly currentChallengeProperty: Property<Challenge>;
  public isFirstChallenge: boolean;
  public readonly hasEyeToggle: boolean;
  public readonly feedbackStateProperty: StringUnionProperty<'idle' | 'incorrect' | 'correct'>;
  private readonly guessedNumbers: Set<number>;

  public constructor( tandem: Tandem, levelNumber: number ) {
    this.scoreProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'scoreProperty' )
    } );

    this.feedbackStateProperty = new StringUnionProperty<'idle' | 'incorrect' | 'correct'>( 'idle', {
      validValues: [ 'idle', 'incorrect', 'correct' ],
      tandem: Tandem.OPT_OUT
    } );

    // Derived to avoid redundancy: solved iff feedback == 'correct'
    this.isChallengeSolvedProperty = new DerivedProperty( [ this.feedbackStateProperty ], state => state === 'correct', {
      tandem: tandem.createTandem( 'isChallengeSolvedProperty' ),
      phetioValueType: BooleanIO
    } );

    this.attemptsProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'attemptsProperty' )
    } );

    // Seed with a placeholder; GameModel will replace on start/new challenge
    this.currentChallengeProperty = new Property<Challenge>( new Challenge( 'sum', 'b', 3, null, 5, 'zeroToTen' ), {
      tandem: Tandem.OPT_OUT
    } );

    this.isFirstChallenge = true;

    // Eye toggle on all levels except level 1
    this.hasEyeToggle = levelNumber !== 1;

    // NOTE: feedbackStateProperty already initialized above, before DerivedProperty creation.

    // Track numbers already guessed for the current challenge
    this.guessedNumbers = new Set<number>();
  }

  public resetForNewChallenge(): void {
    this.attemptsProperty.value = 0;
    // Clear any tracked guesses
    this.resetGuesses();
    this.feedbackStateProperty.value = 'idle';
  }

  /**
   * Checks if the provided guess is correct for the current challenge and updates level state.
   */
  public checkAnswer( guess: number ): boolean {
    this.attemptsProperty.value++;
    // Record the guess
    this.addGuess( guess );

    const isCorrect = this.currentChallengeProperty.value.isCorrect( guess );

    if ( isCorrect ) {
      // Award star only on first try
      if ( this.attemptsProperty.value === 1 ) {
        this.scoreProperty.value++;
      }
      this.feedbackStateProperty.value = 'correct';
    }
    else {
      this.feedbackStateProperty.value = 'incorrect';
    }

    return isCorrect;
  }

  /** Clears any incorrect/correct feedback, used when user changes selection before next check. */
  public clearFeedback(): void {
    this.feedbackStateProperty.value = 'idle';
  }

  // --- Guessed number tracking (model-owned) ---

  public addGuess( guess: number ): void { this.guessedNumbers.add( guess ); }
  public hasGuessed( guess: number ): boolean { return this.guessedNumbers.has( guess ); }
  public getGuessedNumbers(): number[] { return Array.from( this.guessedNumbers ); }
  public resetGuesses(): void { this.guessedNumbers.clear(); }
}

numberPairs.register( 'Level', Level );