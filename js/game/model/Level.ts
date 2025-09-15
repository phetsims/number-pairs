// Copyright 2025, University of Colorado Boulder

/**
 * Model for a single level in the Number Pairs game. It maintains state regarding the current challenge, what the
 * user has guessed so far, etc.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import createObservableArray, { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';

export type ChallengeType = 'bond' | 'decompositionEquation' | 'sumEquation' | 'numberLine';

export default class Level {

  public readonly scoreProperty: NumberProperty;
  public readonly attemptsProperty: NumberProperty;
  public readonly challengeProperty: Property<Challenge>;
  public readonly feedbackStateProperty: StringUnionProperty<'idle' | 'incorrect' | 'correct'>;
  public readonly isChallengeSolvedProperty: TReadOnlyProperty<boolean>;
  public readonly guessedNumbers: ObservableArray<number>;

  public constructor(
    tandem: Tandem,
    public readonly levelNumber: number,
    public readonly description: string,
    public readonly hasOrganizeTenFrameButton: boolean,
    public readonly hasEyeToggle: boolean,
    public readonly range: 'zeroToTen' | 'zeroToTwenty',
    public readonly type: ChallengeType,
    private readonly createChallenge: ( isFirst: boolean ) => Challenge
  ) {
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

    this.challengeProperty = new Property<Challenge>( createChallenge( true ), {
      tandem: tandem.createTandem( 'challengeProperty' ),
      phetioValueType: Challenge.ChallengeIO
    } );

    this.hasEyeToggle = hasEyeToggle;
    this.hasOrganizeTenFrameButton = hasOrganizeTenFrameButton;
    this.range = range;
    this.type = type;

    // Track numbers already guessed for the current challenge via an ObservableArray so views can react to adds/removes
    this.guessedNumbers = createObservableArray<number>();

    const debugString = `Level ${this.levelNumber}: type=${this.type}, range=${this.range}, hasEyeToggle=${this.hasEyeToggle}, hasOrganizeTenFrameButton=${this.hasOrganizeTenFrameButton}`;
    phet.chipper.queryParameters.dev && console.log( debugString );

    phet.chipper.queryParameters.dev && this.challengeProperty.link( challenge => {
      console.log( `Level ${this.levelNumber}: ${challenge.toDebugString()}` );
    } );
  }

  public nextChallenge(): void {

    this.attemptsProperty.value = 0;
    this.resetGuesses();
    this.feedbackStateProperty.value = 'idle';

    this.challengeProperty.value = this.createChallenge( false );
  }

  /**
   * Checks if the provided guess is correct for the current challenge and updates level state.
   */
  public checkAnswer( guess: number ): boolean {
    this.attemptsProperty.value++;
    // Record the guess
    this.addGuess( guess );

    const isCorrect = this.challengeProperty.value.isCorrect( guess );

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

  public addGuess( guess: number ): void {
    if ( !this.guessedNumbers.includes( guess ) ) {
      this.guessedNumbers.push( guess );
    }
  }

  public resetGuesses(): void { this.guessedNumbers.clear(); }

  public reset(): void {
    this.scoreProperty.reset();
    this.challengeProperty.value = this.createChallenge( true );
  }
}

numberPairs.register( 'Level', Level );
