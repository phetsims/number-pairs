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
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
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
import LevelCountingObjectsDelegate from './LevelCountingObjectsDelegate.js';
import LevelDefinition from './LevelDefinition.js';

type SelfOptions = EmptySelfOptions;
export type LevelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export type ChallengeType = 'bond' | 'decompositionEquation' | 'sumEquation' | 'numberLine';

// 'idle' = no feedback, 'incorrect' = last guess was incorrect, 'correct' = last guess was correct
export type ChallengeState = 'idle' | 'guessSelected' | 'incorrect' | 'correct';

export default class Level extends PhetioObject {

  // Accumulated points on this level.
  public readonly scoreProperty: ReadOnlyProperty<number>;
  private readonly _scoreProperty: Property<number>;

  // The current challenge for this level.
  public readonly challengeProperty: TReadOnlyProperty<Challenge>;
  private readonly _challengeProperty: Property<Challenge>;

  // The current state of the challenge to track whether a user has guessed, the answer is incorrect/correct, or idle.
  public readonly challengeStateProperty: TReadOnlyProperty<ChallengeState>;
  private readonly _challengeStateProperty: Property<ChallengeState>;

  // List of numbers already guessed for the current challenge, used to know if they got it right on their first guess
  // and to gray out those numbers in the grid.
  public readonly guessedNumbers: ObservableArray<number>;

  // The currently selected guess, or null if no selection.
  public readonly selectedGuessProperty: Property<number | null>;

  // The representation type for this level. Only one representation type is supported per level, but must be of
  // type Property to comply with the CountingAreaNode API.
  public readonly representationTypeProperty: Property<RepresentationType>;

  // Delegate that manages counting objects for this level including which addend they belong to, their positions,
  // and observable array management that powers the views.
  public readonly countingObjectsDelegate: LevelCountingObjectsDelegate;

  // Whether the addend representations in the counting area are visible or not.
  public readonly addendsVisibleProperty: BooleanProperty;

  // Whether the reward for completing the level has been shown yet.
  public hasShownReward = false;

  // Emitter that emits when the challenge is reset.
  public readonly challengeResetEmitter = new Emitter();

  // Emitter that emits feedback when an answer is checked.
  public readonly answerFeedbackEmitter = new Emitter<[ 'correct' | 'incorrect' ]>( {
    parameters: [
      { valueType: 'string' }
    ]
  } );

  // Accessible prompt for the current challenge.
  public readonly accessibleChallengePromptProperty: TReadOnlyProperty<string>;

  // The level number (1-based).
  public readonly levelNumber: number;

  // Color associated with this level.
  public readonly colorProperty: TReadOnlyProperty<Color>;

  // Description associated with this level.
  public readonly descriptionProperty: TReadOnlyProperty<string>;

  // The range of possible number answers used in this level.
  public readonly range: Range;

  /**
   * Only the default bounds are needed to calculate positions of counting objects in the counting area.
   * Other representations in the game screen (number line) do not use counting objects and therefore that
   * positioning logic is irrelevant in those scenarios.
   */
  public static readonly COUNTING_AREA_BOUNDS = GameModelConstants.DEFAULT_COUNTING_AREA_BOUNDS;

  /**
   * @param levelDefinition
   * @param type - the type of challenge for this level. Can be a 'bond', 'decompositionEquation', 'sumEquation', or 'numberLine'
   * @param createChallenge
   * @param representationType
   * @param providedOptions
   */
  public constructor(
    levelDefinition: LevelDefinition,
    public readonly type: ChallengeType,
    private readonly createChallenge: ( isFirst: boolean ) => Challenge,
    representationType: RepresentationType,
    providedOptions: LevelOptions
  ) {
    const options = optionize<LevelOptions, SelfOptions, LevelOptions>()( {}, providedOptions );
    const tandem = options.tandem;

    super( {
      tandem: tandem,
      phetioState: false
    } );
    this.levelNumber = levelDefinition.levelNumber;
    this.range = levelDefinition.range;
    this.colorProperty = levelDefinition.color;
    this.descriptionProperty = levelDefinition.descriptionProperty;

    // Create game play related Properties
    this.addendsVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'addendsVisibleProperty' ),
      phetioFeatured: true
    } );

    this._scoreProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'scoreProperty' ),
      phetioFeatured: true
    } );
    this.scoreProperty = this._scoreProperty;

    this._challengeStateProperty = new StringUnionProperty<ChallengeState>( 'idle', {
      validValues: [ 'idle', 'guessSelected', 'incorrect', 'correct' ],
      tandem: tandem.createTandem( 'challengeStateProperty' ),
      phetioReadOnly: true
    } );
    this.challengeStateProperty = this._challengeStateProperty;

    this._challengeProperty = new Property<Challenge>( createChallenge( true ), {
      tandem: tandem.createTandem( 'challengeProperty' ),
      phetioValueType: Challenge.ChallengeIO,
      phetioDocumentation: 'Challenge type: ' + this.type,
      phetioFeatured: true
    } );
    this.challengeProperty = this._challengeProperty;

    this.selectedGuessProperty = new Property<number | null>( null, {
      tandem: tandem.createTandem( 'selectedGuessProperty' ),
      phetioValueType: NullableIO( NumberIO ),
      phetioFeatured: true
    } );

    this.countingObjectsDelegate = new LevelCountingObjectsDelegate( this._challengeProperty, this.selectedGuessProperty,
      this.range, {
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
      leftAddend: derived( this.challengeProperty, NumberPairsFluent.a11y.gameScreen.whatNumberStringProperty,
        ( challenge, whatNumber ) => challenge.missingComponent !== 'a' ? challenge.a : whatNumber ),
      rightAddend: derived( this.challengeProperty, NumberPairsFluent.a11y.gameScreen.whatNumberStringProperty,
        ( challenge, whatNumber ) => challenge.missingComponent !== 'b' ? challenge.b : whatNumber ),
      total: derived( this.challengeProperty, NumberPairsFluent.a11y.gameScreen.whatNumberStringProperty,
        ( challenge, whatNumber ) => challenge.missingComponent !== 'y' ? challenge.y : whatNumber ),
      decompositionOrSum: ( this.levelNumber === 4 || this.levelNumber === 7 || this.levelNumber === 8 ) ? 'sum' : 'decomposition'
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
    this._challengeStateProperty.value = 'idle';
    this._challengeProperty.value = this.createChallenge( false );
  }

  /**
   * Checks if the provided guess is correct for the current challenge and updates level state.
   */
  public checkAnswer( guess: number ): { isCorrect: boolean; firstTry: boolean } {

    if ( !this.guessedNumbers.includes( guess ) ) {
      this.guessedNumbers.push( guess );
    }

    const isCorrect = this._challengeProperty.value.isCorrect( guess );

    if ( isCorrect ) {

      // Award star only on first try
      if ( this.guessedNumbers.length === 1 ) {
        this._scoreProperty.value++;
      }
    }

    const feedback = isCorrect ? 'correct' : 'incorrect';
    this._challengeStateProperty.value = feedback;
    this.answerFeedbackEmitter.emit( feedback );

    return { isCorrect: isCorrect, firstTry: this.guessedNumbers.length === 1 };
  }

  /**
   * Clears any incorrect/correct feedback, used when user changes selection before next check.
   */
  public clearFeedback(): void {
    this._challengeStateProperty.value = 'idle';
  }

  public reset(): void {
    this.addendsVisibleProperty.reset();
    this._scoreProperty.reset();

    // Set the selected guess to null before creating a new challenge. This ensures that any listeners to the
    // challengeProperty that also read the selectedGuessProperty will see it as null when a new challenge is created.
    this.selectedGuessProperty.value = null;
    this._challengeProperty.value = this.createChallenge( true );
    this.countingObjectsDelegate.resetCountingObjects();
    this.hasShownReward = false;
    this.guessedNumbers.clear();
    this._challengeStateProperty.value = 'idle';
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
    this._challengeStateProperty.value = 'idle';

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
