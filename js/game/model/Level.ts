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
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Color from '../../../../scenery/js/util/Color.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import Animation from '../../../../twixt/js/Animation.js';
import CountingObject from '../../common/model/CountingObject.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import TNumberPairsModel from '../../common/model/TNumberPairsModel.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';
import InputRange from './InputRange.js';
import LevelCountingObjectsDelegate from './LevelCountingObjectsDelegate.js';

type SelfOptions = {
  representationType: RepresentationType;
};
type LevelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export type ChallengeType = 'bond' | 'decompositionEquation' | 'sumEquation' | 'numberLine';

export default class Level {

  // Accumulated points on this level.
  public readonly scoreProperty: NumberProperty;

  // The current challenge for this level.
  public readonly challengeProperty: Property<Challenge>;

  // 'idle' = no feedback, 'incorrect' = last guess was incorrect, 'correct' = last guess was correct
  public readonly modeProperty: StringUnionProperty<'idle' | 'guessSelected' | 'incorrect' | 'correct'>;

  // List of numbers already guessed for the current challenge, used to know if they got it right on their first guess
  // and to gray out those numbers in the grid.
  public readonly guessedNumbers: ObservableArray<number>;

  public readonly selectedGuessProperty: Property<number | null>;

  // Counting object observable arrays
  public readonly representationTypeProperty: Property<RepresentationType>;

  private readonly countingObjectsDelegate: LevelCountingObjectsDelegate;

  public hasShownReward = false;

  public constructor(
    public readonly levelNumber: number, // 1-indexed level number
    public readonly description: string, // Appears in the bar at the top of the screen
    public readonly hasOrganizeTenFrameButton: boolean,
    public readonly hasEyeToggle: boolean,
    public readonly range: InputRange,
    public readonly type: ChallengeType,
    private readonly createChallenge: ( isFirst: boolean ) => Challenge,
    providedOptions: LevelOptions
  ) {
    const options = optionize<LevelOptions, SelfOptions, LevelOptions>()( {}, providedOptions );
    const tandem = options.tandem;

    // Create game play related Properties
    this.scoreProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'scoreProperty' )
    } );

    this.modeProperty = new StringUnionProperty<'idle' | 'guessSelected' | 'incorrect' | 'correct'>( 'idle', {
      validValues: [ 'idle', 'guessSelected', 'incorrect', 'correct' ],
      tandem: Tandem.OPT_OUT
    } );

    this.challengeProperty = new Property<Challenge>( createChallenge( true ), {
      tandem: tandem.createTandem( 'challengeProperty' ),
      phetioValueType: Challenge.ChallengeIO
    } );

    this.selectedGuessProperty = new Property<number | null>( null );

    // Create UI/UX related Properties
    // This Property doesn't change, so does not need to be instrumented.
    this.representationTypeProperty = new Property( options.representationType );

    this.countingObjectsDelegate = new LevelCountingObjectsDelegate( {
      tandem: tandem,
      challengeProperty: this.challengeProperty,
      selectedGuessProperty: this.selectedGuessProperty,
      representationTypeProperty: this.representationTypeProperty
    } );

    // Link to the countingObject.addendTypeProperty at the end of construction to avoid triggering duplicate work
    // that is handled manually above.
    this.countingObjects.forEach( countingObject => {
      this.createCountingObjectAddendTypeLinks( countingObject );
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

  public get totalProperty(): TReadOnlyProperty<number> {
    return this.countingObjectsDelegate.totalProperty;
  }

  public get leftAddendProperty(): TReadOnlyProperty<number> {
    return this.countingObjectsDelegate.leftAddendProperty;
  }

  public get rightAddendProperty(): TReadOnlyProperty<number> {
    return this.countingObjectsDelegate.rightAddendProperty;
  }

  public get totalVisibleProperty(): TReadOnlyProperty<boolean> {
    return this.countingObjectsDelegate.totalVisibleProperty;
  }

  public get leftAddendVisibleProperty(): TReadOnlyProperty<boolean> {
    return this.countingObjectsDelegate.leftAddendVisibleProperty;
  }

  public get rightAddendVisibleProperty(): TReadOnlyProperty<boolean> {
    return this.countingObjectsDelegate.rightAddendVisibleProperty;
  }

  public get leftAddendCountingObjectsProperty(): TReadOnlyProperty<ObservableArray<CountingObject>> {
    return this.countingObjectsDelegate.leftAddendCountingObjectsProperty;
  }

  public get rightAddendCountingObjectsProperty(): TReadOnlyProperty<ObservableArray<CountingObject>> {
    return this.countingObjectsDelegate.rightAddendCountingObjectsProperty;
  }

  public get totalColorProperty(): TReadOnlyProperty<Color> {
    return this.countingObjectsDelegate.totalColorProperty;
  }

  public get leftAddendColorProperty(): TReadOnlyProperty<Color> {
    return this.countingObjectsDelegate.leftAddendColorProperty;
  }

  public get rightAddendColorProperty(): TReadOnlyProperty<Color> {
    return this.countingObjectsDelegate.rightAddendColorProperty;
  }

  public get inactiveCountingObjects(): ObservableArray<CountingObject> {
    return this.countingObjectsDelegate.inactiveCountingObjects;
  }

  public get countingObjects(): CountingObject[] {
    return this.countingObjectsDelegate.countingObjects;
  }

  public get countingObjectsModel(): TNumberPairsModel {
    return this.countingObjectsDelegate;
  }

  public get countingObjectsAnimation(): Animation | null {
    return this.countingObjectsDelegate.countingObjectsAnimation;
  }

  public set countingObjectsAnimation( animation: Animation | null ) {
    this.countingObjectsDelegate.countingObjectsAnimation = animation;
  }

  public nextChallenge(): void {
    this.resetGuesses();
    this.modeProperty.value = 'idle';
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
      this.modeProperty.value = 'correct';
    }
    else {
      this.modeProperty.value = 'incorrect';
    }

    return isCorrect;
  }

  /**
   * Clears any incorrect/correct feedback, used when user changes selection before next check.
   */
  public clearFeedback(): void {
    this.modeProperty.value = 'idle';
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
    this.countingObjectsDelegate.resetCountingObjects();
    this.hasShownReward = false;
  }

  public deselectAllKittens(): void {
    this.countingObjectsDelegate.deselectAllKittens();
  }

  /**
   * Set the attribute positions of the counting objects based on the provided left and right addend positions.
   * @param leftAddendObjects - prevent incorrect intermediary values by using the same counting objects as the call site.
   * @param rightAddendObjects
   * @param leftAttributePositions
   * @param rightAttributePositions
   * @param animate - whether to animate the movement of the counting objects.
   */
  public setAttributePositions( leftAddendObjects: CountingObject[], rightAddendObjects: CountingObject[], leftAttributePositions: Vector2[], rightAttributePositions: Vector2[], animate = false ): void {
    this.countingObjectsDelegate.setAttributePositions( leftAddendObjects, rightAddendObjects, leftAttributePositions, rightAttributePositions, animate );
  }

  /**
   * Organizes the counting objects into a ten frame based on the provided bounds.
   * @param tenFrameBounds
   * @param positionType
   */
  public organizeIntoTenFrame( tenFrameBounds: Bounds2[], positionType: 'attribute' | 'location' ): void {
    this.countingObjectsDelegate.organizeIntoTenFrame( tenFrameBounds, positionType );
  }

  /**
   * Creates a link that updates the addend type of the counting object based on the changed addend type.
   * @param countingObject
   */
  public createCountingObjectAddendTypeLinks( countingObject: CountingObject ): void {
    this.countingObjectsDelegate.createCountingObjectAddendTypeLinks( countingObject );
  }

  public tryAgain(): void {
    this.clearFeedback();
    this.modeProperty.value = 'idle';

    // hide the missing addend again
    this.selectedGuessProperty.value = null;
  }
}

numberPairs.register( 'Level', Level );
