// Copyright 2025, University of Colorado Boulder

/**
 * Model for a single level in the Number Pairs game.
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import createObservableArray, { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';

export default class Level {
  public readonly levelNumber: number;
  public readonly scoreProperty: NumberProperty;
  public readonly attemptsProperty: NumberProperty;
  public readonly currentChallengeProperty: Property<Challenge>;
  public isFirstChallenge: boolean;
  public readonly hasEyeToggle: boolean;
  public readonly hasOrganizeTenFrameButton: boolean;
  public readonly range: 'zeroToTen' | 'zeroToTwenty';
  public readonly addendsOnRightInEquation: boolean;
  public readonly feedbackStateProperty: StringUnionProperty<'idle' | 'incorrect' | 'correct'>;
  public readonly isChallengeSolvedProperty: TReadOnlyProperty<boolean>;
  public readonly guessedNumbers: ObservableArray<number>;

  public constructor( tandem: Tandem, levelNumber: number, hasOrganizeTenFrameButton: boolean, hasEyeToggle: boolean, range: 'zeroToTen' | 'zeroToTwenty', addendsOnRightInEquation: boolean ) {
    this.levelNumber = levelNumber;
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

    // Eye toggle from config
    this.hasEyeToggle = hasEyeToggle;
    this.hasOrganizeTenFrameButton = hasOrganizeTenFrameButton;
    this.range = range;
    this.addendsOnRightInEquation = addendsOnRightInEquation;

    // NOTE: feedbackStateProperty already initialized above, before DerivedProperty creation.

    // Track numbers already guessed for the current challenge via an ObservableArray so views can react to adds/removes
    this.guessedNumbers = createObservableArray<number>();
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

  public addGuess( guess: number ): void {
    if ( !this.guessedNumbers.includes( guess ) ) {
      this.guessedNumbers.push( guess );
    }
  }
  public hasGuessed( guess: number ): boolean { return this.guessedNumbers.includes( guess ); }
  public getGuessedNumbers(): number[] { return this.guessedNumbers.slice(); }
  public resetGuesses(): void { this.guessedNumbers.clear(); }
}

numberPairs.register( 'Level', Level );