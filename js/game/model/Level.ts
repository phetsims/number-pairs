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
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Color from '../../../../scenery/js/util/Color.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import CountingObject from '../../common/model/CountingObject.js';
import { NumberPairsUtils } from '../../common/model/NumberPairsUtils.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import Challenge from './Challenge.js';
import GameModelConstants from './GameModelConstants.js';
import InputRange from './InputRange.js';
import LevelCountingObjectsDelegate from './LevelCountingObjectsDelegate.js';

type SelfOptions = EmptySelfOptions;
export type LevelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export type ChallengeType = 'bond' | 'decompositionEquation' | 'sumEquation' | 'numberLine';

export default class Level extends PhetioObject {

  //REVIEW Public API should be ReadOnlyProperty
  // Accumulated points on this level.
  public readonly scoreProperty: NumberProperty;

  //REVIEW Public API should be TReadOnlyProperty
  // The current challenge for this level.
  public readonly challengeProperty: Property<Challenge>;

  //REVIEW Create a string enumeration type so that you're not duplicating this set of values in Level (3x) and in AnswerButtonGroup (1x).
  //REVIEW Public API should be TReadOnlyProperty
  //REVIEW Missing description of 'guessSelected'.
  // 'idle' = no feedback, 'incorrect' = last guess was incorrect, 'correct' = last guess was correct
  public readonly modeProperty: StringUnionProperty<'idle' | 'guessSelected' | 'incorrect' | 'correct'>;

  // List of numbers already guessed for the current challenge, used to know if they got it right on their first guess
  // and to gray out those numbers in the grid.
  public readonly guessedNumbers: ObservableArray<number>;

  //REVIEW Document fields below here that are missing documentation.

  //REVIEW Public API should be selectedGuessProperty: TReadOnlyProperty<number | null>
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
    public readonly range: InputRange,
    public readonly type: ChallengeType,
    private readonly createChallenge: ( isFirst: boolean ) => Challenge,
    public readonly representationType: RepresentationType,
    providedOptions: LevelOptions
  ) {
    const options = optionize<LevelOptions, SelfOptions, LevelOptions>()( {}, providedOptions );
    const tandem = options.tandem;

    super( {
      tandem: tandem,
      phetioState: false
    } );

    // Create game play related Properties
    this.addendsVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'addendsVisibleProperty' ),
      phetioFeatured: true
    } );

    this.scoreProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'scoreProperty' ),
      phetioFeatured: true
    } );

    this.modeProperty = new StringUnionProperty<'idle' | 'guessSelected' | 'incorrect' | 'correct'>( 'idle', {
      validValues: [ 'idle', 'guessSelected', 'incorrect', 'correct' ],
      tandem: tandem.createTandem( 'modeProperty' ),
      phetioReadOnly: true
    } );

    this.challengeProperty = new Property<Challenge>( createChallenge( true ), {
      tandem: tandem.createTandem( 'challengeProperty' ),
      phetioValueType: Challenge.ChallengeIO,
      phetioDocumentation: 'Challenge type: ' + this.type,
      phetioFeatured: true
    } );

    this.selectedGuessProperty = new Property<number | null>( null, {
      tandem: tandem.createTandem( 'selectedGuessProperty' ),
      phetioValueType: NullableIO( NumberIO ),
      phetioFeatured: true
    } );

    this.countingObjectsDelegate = new LevelCountingObjectsDelegate( this.challengeProperty, this.selectedGuessProperty,
      range, {
        tandem: tandem.createTandem( 'countingObjectsDelegate' ),
        initialRepresentationType: representationType,
        representationTypeValidValues: [ representationType ] // This level only supports one representation type
      } );

    this.representationTypeProperty = this.countingObjectsDelegate.representationTypeProperty;

    // Track numbers already guessed for the current challenge via an ObservableArray so views can react to adds/removes
    this.guessedNumbers = createObservableArray<number>( {
      tandem: tandem.createTandem( 'guessedNumbers' ),
      phetioType: createObservableArray.ObservableArrayIO( NumberIO )
    } );

    this.accessibleChallengePromptProperty = NumberPairsFluent.a11y.gameScreen.challengePrompt.createProperty( {
      color: derived(
        this.challengeProperty,
        NumberPairsFluent.a11y.leftAddendColorStringProperty,
        NumberPairsFluent.a11y.rightAddendColorStringProperty,
        challenge => challenge.missingComponent === 'a' ? NumberPairsFluent.a11y.leftAddendColorStringProperty.value : NumberPairsFluent.a11y.rightAddendColorStringProperty.value ),
      levelType: this.representationType === RepresentationType.NUMBER_LINE ? 'numberLine' : 'kittens',
      leftAddend: derived( this.challengeProperty, NumberPairsFluent.a11y.gameScreen.whatNumberStringProperty,
        ( challenge, whatNumber ) => challenge.missingComponent !== 'a' ? challenge.a : whatNumber ),
      rightAddend: derived( this.challengeProperty, NumberPairsFluent.a11y.gameScreen.whatNumberStringProperty,
        ( challenge, whatNumber ) => challenge.missingComponent !== 'b' ? challenge.b : whatNumber ),
      total: derived( this.challengeProperty, NumberPairsFluent.a11y.gameScreen.whatNumberStringProperty,
        ( challenge, whatNumber ) => challenge.missingComponent !== 'y' ? challenge.y : whatNumber ),
      addendOrSum: this.challengeProperty.derived( challenge => challenge.missingComponent === 'y' ? 'sum' : 'addend' ),
      challengeType: this.challengeProperty.derived( challenge => challenge.missingComponent === 'a' ? 'leftAddend' : challenge.missingComponent === 'b' ? 'rightAddend' : 'total' ),
      decompositionOrSum: ( levelNumber === 4 || levelNumber === 7 || levelNumber === 8 ) ? 'sum' : 'decomposition'
    } );

    const debugString = `Level ${this.levelNumber}: type=${this.type}, range=${this.range}`;
    phet.log && phet.log( debugString );

    phet.log && this.challengeProperty.link( challenge => {
      phet.log && phet.log( `Level ${this.levelNumber}: ${challenge.toDebugString()}` );
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
   * Organizes the counting objects into a ten frame based on the counting area bounds.
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

  /**
   * LevelIO handles serialization of a level in the game screen. It implements reference-type serialization, as
   * described in https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization.
   */
  public static readonly LevelIO = new IOType<Level, ReferenceIOState>( 'LevelIO', {
    valueType: Level,
    supertype: ReferenceIO( IOType.ObjectIO ),
    documentation: 'A level in the game.'
  } );
}

numberPairs.register( 'Level', Level );
