// Copyright 2025, University of Colorado Boulder

/**
 * Model for a single level in the Number Pairs game.
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';

export default class Level {
  public readonly scoreProperty: NumberProperty;
  public readonly isChallengeSolvedProperty: BooleanProperty;
  public readonly attemptsProperty: NumberProperty;
  public readonly currentChallengeProperty: Property<Challenge>;
  public isFirstChallenge: boolean;
  public readonly hasEyeToggle: boolean;

  public constructor( tandem: Tandem, levelNumber: number ) {
    this.scoreProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'scoreProperty' )
    } );

    this.isChallengeSolvedProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'isChallengeSolvedProperty' )
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
  }

  public resetForNewChallenge(): void {
    this.isChallengeSolvedProperty.value = false;
    this.attemptsProperty.value = 0;
    // Clear any tracked guesses on the current challenge, if present
    this.currentChallengeProperty.value.resetGuesses();
  }

  /**
   * Checks if the provided guess is correct for the current challenge and updates level state.
   */
  public checkAnswer( guess: number ): boolean {
    this.attemptsProperty.value++;
    // Record the guess with the current challenge
    this.currentChallengeProperty.value.addGuess( guess );

    const isCorrect = this.currentChallengeProperty.value.isCorrect( guess );

    if ( isCorrect ) {
      this.isChallengeSolvedProperty.value = true;

      // Award star only on first try
      if ( this.attemptsProperty.value === 1 ) {
        this.scoreProperty.value++;
      }
    }

    return isCorrect;
  }
}

numberPairs.register( 'Level', Level );