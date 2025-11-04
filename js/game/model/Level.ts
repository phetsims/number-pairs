// Copyright 2025, University of Colorado Boulder

/**
 * Model for a single level in the Number Pairs game. It maintains state regarding the current challenge, what the
 * user has guessed so far, etc.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import createObservableArray, { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import derived from '../../../../axon/js/derived.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Color from '../../../../scenery/js/util/Color.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import CountingObject from '../../common/model/CountingObject.js';
import { NumberPairsUtils } from '../../common/model/NumberPairsUtils.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import Challenge from './Challenge.js';
import GameModelConstants from './GameModelConstants.js';
import InputRange from './InputRange.js';
import LevelCountingObjectsDelegate from './LevelCountingObjectsDelegate.js';

type SelfOptions = {
  representationType: RepresentationType;
};
export type LevelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

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

  public readonly countingObjectsDelegate: LevelCountingObjectsDelegate;

  public readonly addendsVisibleProperty: BooleanProperty;

  public hasShownReward = false;
  public readonly challengeResetEmitter = new Emitter();
  public readonly answerFeedbackEmitter = new Emitter<[ 'correct' | 'incorrect' ]>( {
    parameters: [
      { valueType: 'string' }
    ]
  } );

  public readonly accessibleChallengePromptProperty: TReadOnlyProperty<string>;

  /**
   * Only the default bounds are needed to calculate positions of counting objects in the counting area.
   * Other representations in the game screen (number line) do not use counting objects and therefore that
   * positioning logic is irrelevant in those scenarios.
   */
  public static readonly COUNTING_AREA_BOUNDS = GameModelConstants.DEFAULT_COUNTING_AREA_BOUNDS;

  public constructor(
    public readonly levelNumber: number, // 1-indexed level number
    public readonly color: TReadOnlyProperty<Color>, // Color used for the status bar and level selection button
    public readonly description: TReadOnlyProperty<string>, // Appears in the bar at the top of the screen and in the info dialog
    public readonly accessibleHelpText: TReadOnlyProperty<string>,
    public readonly accessibleChallengePromptPattern: typeof NumberPairsFluent.a11y.gameScreen.decompositionChallengePrompt,
    public readonly range: InputRange,
    public readonly type: ChallengeType,
    private readonly createChallenge: ( isFirst: boolean ) => Challenge,
    providedOptions: LevelOptions
  ) {
    const options = optionize<LevelOptions, SelfOptions, LevelOptions>()( {}, providedOptions );
    const tandem = options.tandem;

    // Create game play related Properties
    this.addendsVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'addendsVisibleProperty' )
    } );
    this.scoreProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'scoreProperty' )
    } );

    this.modeProperty = new StringUnionProperty<'idle' | 'guessSelected' | 'incorrect' | 'correct'>( 'idle', {
      validValues: [ 'idle', 'guessSelected', 'incorrect', 'correct' ],
      tandem: tandem.createTandem( 'modeProperty' ),
      phetioReadOnly: true
    } );

    this.challengeProperty = new Property<Challenge>( createChallenge( true ), {
      tandem: tandem.createTandem( 'challengeProperty' ),
      phetioValueType: Challenge.ChallengeIO,
      phetioDocumentation: 'Challenge type: ' + this.type
    } );

    this.selectedGuessProperty = new Property<number | null>( null, {
      tandem: tandem.createTandem( 'selectedGuessProperty' ),
      phetioValueType: NullableIO( NumberIO )
    } );

    this.countingObjectsDelegate = new LevelCountingObjectsDelegate( this.challengeProperty, this.selectedGuessProperty,
      range, {
        tandem: tandem.createTandem( 'countingObjectsDelegate' ),
        initialRepresentationType: options.representationType,
        representationTypeValidValues: [ options.representationType ] // This level only supports one representation type
      } );
    this.representationTypeProperty = this.countingObjectsDelegate.representationTypeProperty;

    // Track numbers already guessed for the current challenge via an ObservableArray so views can react to adds/removes
    this.guessedNumbers = createObservableArray<number>( {
      tandem: tandem.createTandem( 'guessedNumbers' ),
      phetioType: createObservableArray.ObservableArrayIO( NumberIO )
    } );

    this.accessibleChallengePromptProperty = this.accessibleChallengePromptPattern.createProperty( {
      leftAddend: derived( this.challengeProperty, NumberPairsFluent.a11y.gameScreen.whatNumberStringProperty,
        ( challenge, whatNumber ) => challenge.missing !== 'a' ? challenge.a : whatNumber ),
      rightAddend: derived( this.challengeProperty, NumberPairsFluent.a11y.gameScreen.whatNumberStringProperty,
        ( challenge, whatNumber ) => challenge.missing !== 'b' ? challenge.b : whatNumber ),
      total: derived( this.challengeProperty, NumberPairsFluent.a11y.gameScreen.whatNumberStringProperty,
        ( challenge, whatNumber ) => challenge.missing !== 'y' ? challenge.y : whatNumber ),
      addendOrSum: this.challengeProperty.derived( challenge => challenge.missing === 'y' ? 'sum' : 'addend' ),
      challengeType: 'unknown' // TODO: I was getting an error this was missing. I'm not sure what to put here. https://github.com/phetsims/number-pairs/issues/336
    } );

    const debugString = `Level ${this.levelNumber}: type=${this.type}, range=${this.range}`;
    phet.chipper.queryParameters.dev && console.log( debugString );

    phet.chipper.queryParameters.dev && this.challengeProperty.link( challenge => {
      console.log( `Level ${this.levelNumber}: ${challenge.toDebugString()}` );
    } );
  }

  public nextChallenge(): void {
    this.guessedNumbers.clear();
    this.selectedGuessProperty.value = null;
    this.modeProperty.value = 'idle';
    this.challengeProperty.value = this.createChallenge( false );
  }

  /**
   * Checks if the provided guess is correct for the current challenge and updates level state.
   */
  public checkAnswer( guess: number ): { isCorrect: boolean; firstTry: boolean } {

    if ( !this.guessedNumbers.includes( guess ) ) {
      this.guessedNumbers.push( guess );
    }

    const isCorrect = this.challengeProperty.value.isCorrect( guess );

    if ( isCorrect ) {

      // Award star only on first try
      if ( this.guessedNumbers.length === 1 ) {
        this.scoreProperty.value++;
      }
    }

    const feedback = isCorrect ? 'correct' : 'incorrect';
    this.modeProperty.value = feedback;
    this.answerFeedbackEmitter.emit( feedback );

    return { isCorrect: isCorrect, firstTry: this.guessedNumbers.length === 1 };
  }

  /**
   * Clears any incorrect/correct feedback, used when user changes selection before next check.
   */
  public clearFeedback(): void {
    this.modeProperty.value = 'idle';
  }

  public reset(): void {
    this.addendsVisibleProperty.reset();
    this.scoreProperty.reset();
    this.challengeProperty.value = this.createChallenge( true );
    this.countingObjectsDelegate.resetCountingObjects();
    this.hasShownReward = false;
    this.guessedNumbers.clear();
    this.selectedGuessProperty.value = null;
    this.modeProperty.value = 'idle';
  }

  public deselectAllKittens(): void {
    this.countingObjectsDelegate.deselectAllKittens();
  }

  /**
   * Organizes the counting objects into a ten frame based on the provided bounds.
   */
  public organizeIntoTenFrame(): void {

    const leftAddendObjects = this.countingObjectsDelegate.leftAddendCountingObjectsProperty.value;
    const rightAddendObjects = this.countingObjectsDelegate.rightAddendCountingObjectsProperty.value;
    const totalObjectCount = leftAddendObjects.length + rightAddendObjects.length;

    // When less than or equal to 20 objects, use a single combined ten frame, otherwise split into two ten frames.
    // Combine into a single ten frame on these levels.
    const COMBINE = this.levelNumber === 4 || this.levelNumber === 7;
    if ( totalObjectCount <= 20 && COMBINE ) {
      const centeredTenFrameBounds = NumberPairsUtils.createCenteredTenFrameBounds( Level.COUNTING_AREA_BOUNDS );
      this.countingObjectsDelegate.organizeIntoSingleTenFrame(
        centeredTenFrameBounds,
        leftAddendObjects,
        rightAddendObjects,
        'attribute'
      );
    }
    else {
      let leftCountingObjects: CountingObject[];
      let rightCountingObjects: CountingObject[];

      if ( COMBINE ) {
        const activeCountingObjects = [ ...leftAddendObjects, ...rightAddendObjects ];
        leftCountingObjects = activeCountingObjects.slice( 0, 20 );
        rightCountingObjects = activeCountingObjects.slice( 20 );
      }
      else {
        leftCountingObjects = leftAddendObjects;
        rightCountingObjects = rightAddendObjects;
      }

      this.countingObjectsDelegate.organizeIntoSplitTenFrame(
        NumberPairsUtils.splitBoundsInHalf( Level.COUNTING_AREA_BOUNDS ),
        leftCountingObjects,
        rightCountingObjects,
        'attribute'
      );
    }

  }

  public resetChallenge(): void {
    this.clearFeedback();
    this.modeProperty.value = 'idle';

    // hide the missing addend again
    this.selectedGuessProperty.value = null;

    this.countingObjectsDelegate.randomizeCountingObjectPositions();

    this.challengeResetEmitter.emit();
  }
}

numberPairs.register( 'Level', Level );
