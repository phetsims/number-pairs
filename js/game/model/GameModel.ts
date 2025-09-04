// Copyright 2024-2025, University of Colorado Boulder

/**
 * GameModel is the top-level model for the 'Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import TModel from '../../../../joist/js/TModel.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import numberPairs from '../../numberPairs.js';

type SelfOptions = {
  //TODO add options that are specific to GameModel here https://github.com/phetsims/number-pairs/issues/36
};

type GameModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

const ModeValues = [ 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8', 'levelSelectionScreen' ] as const;
export type Mode = ( typeof ModeValues )[number];

export default class GameModel implements TModel {
  public readonly modeProperty: StringUnionProperty<Mode>;

  // Current equation challenge properties
  public readonly leftAddendProperty: NumberProperty;
  public readonly missingValueProperty: NumberProperty; // The x value that needs to be guessed
  public readonly totalProperty: NumberProperty;
  public readonly equationTextProperty: StringProperty;

  // Game state properties
  public readonly isChallengeSolvedProperty: BooleanProperty;
  public readonly scoreProperty: NumberProperty; // Number of stars earned
  public readonly attemptsProperty: NumberProperty; // Number of attempts on current challenge

  public constructor( providedOptions: GameModelOptions ) {

    this.modeProperty = new StringUnionProperty<Mode>( 'levelSelectionScreen', {
      validValues: ModeValues,
      tandem: providedOptions.tandem.createTandem( 'modeProperty' ),
      phetioDocumentation: 'the current level'
    } );

    // Initialize equation properties
    this.leftAddendProperty = new NumberProperty( 3, {
      tandem: providedOptions.tandem.createTandem( 'leftAddendProperty' )
    } );

    this.missingValueProperty = new NumberProperty( 2, {
      tandem: providedOptions.tandem.createTandem( 'missingValueProperty' )
    } );

    this.totalProperty = new NumberProperty( 5, {
      tandem: providedOptions.tandem.createTandem( 'totalProperty' )
    } );

    this.equationTextProperty = new StringProperty( '3 + x = 5', {
      tandem: providedOptions.tandem.createTandem( 'equationTextProperty' )
    } );

    // Game state
    this.isChallengeSolvedProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'isChallengeSolvedProperty' )
    } );

    this.scoreProperty = new NumberProperty( 0, {
      tandem: providedOptions.tandem.createTandem( 'scoreProperty' )
    } );

    this.attemptsProperty = new NumberProperty( 0, {
      tandem: providedOptions.tandem.createTandem( 'attemptsProperty' )
    } );

    // Generate the first challenge
    this.generateNewChallenge();
  }

  /**
   * Generates a new challenge with random numbers for level 1 (totals 0-10).
   */
  public generateNewChallenge(): void {
    // For level 1: totals between 0-10
    const total = dotRandom.nextIntBetween( 0, 10 );
    const leftAddend = dotRandom.nextIntBetween( 0, total );
    const missingValue = total - leftAddend;

    this.totalProperty.value = total;
    this.leftAddendProperty.value = leftAddend;
    this.missingValueProperty.value = missingValue;
    this.equationTextProperty.value = `${leftAddend} + x = ${total}`;

    // Reset challenge state
    this.isChallengeSolvedProperty.value = false;
    this.attemptsProperty.value = 0;
  }

  /**
   * Checks if the user's guess is correct and updates game state.
   */
  public checkAnswer( guess: number ): boolean {
    this.attemptsProperty.value++;

    const isCorrect = guess === this.missingValueProperty.value;

    if ( isCorrect ) {
      this.isChallengeSolvedProperty.value = true;

      // Award star only on first try
      if ( this.attemptsProperty.value === 1 ) {
        this.scoreProperty.value++;
      }
    }

    return isCorrect;
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    this.scoreProperty.reset();
    this.generateNewChallenge();
  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    // No step behavior needed for this game model
  }
}

numberPairs.register( 'GameModel', GameModel );