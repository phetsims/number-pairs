// Copyright 2025, University of Colorado Boulder

/**
 * Model for a single level in the Number Pairs game. It maintains state regarding the current challenge, what the
 * user has guessed so far, etc.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import createObservableArray, { ObservableArray, ObservableArrayIO } from '../../../../axon/js/createObservableArray.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import Color from '../../../../scenery/js/util/Color.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import Animation from '../../../../twixt/js/Animation.js';
import CountingObject, { AddendType } from '../../common/model/CountingObject.js';
import { CountingObjectsManager } from '../../common/model/CountingObjectsManager.js';
import { AnimationTarget } from '../../common/model/NumberPairsModel.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import TNumberPairsModel from '../../common/model/TNumberPairsModel.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';
import InputRange from './InputRange.js';

type SelfOptions = {
  representationType: RepresentationType;
};
type LevelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export type ChallengeType = 'bond' | 'decompositionEquation' | 'sumEquation' | 'numberLine';

export default class Level implements TNumberPairsModel {

  // Accumulated points on this level.
  public readonly scoreProperty: NumberProperty;

  // The current challenge for this level.
  public readonly challengeProperty: Property<Challenge>;

  // 'idle' = no feedback, 'incorrect' = last guess was incorrect, 'correct' = last guess was correct
  public readonly modeProperty: StringUnionProperty<'idle' | 'guessSelected' | 'incorrect' | 'correct'>;

  // List of numbers already guessed for the current challenge, used to know if they got it right on their first guess
  // and to gray out those numbers in the grid.
  public readonly guessedNumbers: ObservableArray<number>;

  public readonly totalProperty: TReadOnlyProperty<number>;
  public readonly leftAddendProperty: TReadOnlyProperty<number>;
  public readonly rightAddendProperty: TReadOnlyProperty<number>;
  public readonly selectedGuessProperty: Property<number | null>;

  // Counting object observable arrays
  public readonly leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  public readonly rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  public readonly inactiveCountingObjects: ObservableArray<CountingObject>;

  public countingObjectsAnimation: Animation | null = null;

  public readonly countingObjects: CountingObject[];
  public readonly representationTypeProperty: Property<RepresentationType>;

  // Colors
  public readonly totalColorProperty: TReadOnlyProperty<Color>;
  public readonly leftAddendColorProperty: TReadOnlyProperty<Color>;
  public readonly rightAddendColorProperty: TReadOnlyProperty<Color>;

  // Addend visible Properties
  public readonly totalVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly leftAddendVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly rightAddendVisibleProperty: TReadOnlyProperty<boolean>;

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
    this.totalColorProperty = options.representationType.totalColorProperty;
    this.leftAddendColorProperty = options.representationType.leftAddendColorProperty;
    this.rightAddendColorProperty = options.representationType.rightAddendColorProperty;

    this.totalVisibleProperty = new DerivedProperty( [ this.challengeProperty ], challenge => challenge.missing !== 'y' );
    this.leftAddendVisibleProperty = new DerivedProperty( [ this.challengeProperty, this.selectedGuessProperty ],
      ( challenge, guess ) => ( challenge.missing === 'a' && guess !== null ) || challenge.missing !== 'a' );
    this.rightAddendVisibleProperty = new DerivedProperty( [ this.challengeProperty, this.selectedGuessProperty ],
      ( challenge, guess ) => ( challenge.missing === 'b' && guess !== null ) || challenge.missing !== 'b' );

    this.totalProperty = new DerivedProperty( [ this.challengeProperty ], challenge => challenge.y );

    // If the user hasn't guessed yet, selectedGuess is null, and we want to show 0 objects in the counting area for the missing addend.
    this.leftAddendProperty = new DerivedProperty( [ this.challengeProperty, this.selectedGuessProperty ],
      ( challenge, guess ) => challenge.missing === 'a' ? guess === null ? 0 : guess : challenge.a );
    this.rightAddendProperty = new DerivedProperty( [ this.challengeProperty, this.selectedGuessProperty ],
      ( challenge, guess ) => challenge.missing === 'b' ? guess === null ? 0 : guess : challenge.b );

    this.countingObjects = CountingObjectsManager.createCountingObjects( 40, this.leftAddendProperty.value, this.rightAddendProperty.value, tandem );
    const inactiveCountingObjects = this.countingObjects.slice();
    this.inactiveCountingObjects = createObservableArray( {
      elements: inactiveCountingObjects,
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'inactiveCountingObjects' )
    } );
    const leftAddendObjects: ObservableArray<CountingObject> = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: tandem.createTandem( 'leftAddendObjects' )
    } );
    const rightAddendObjects: ObservableArray<CountingObject> = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: tandem.createTandem( 'rightAddendObjects' )
    } );

    // This model does not need a Property of each addend's counting objects since the array never changes, but it
    // satisfies the type requirement of TNumberPairsModel.
    this.leftAddendCountingObjectsProperty = new Property( leftAddendObjects );
    this.rightAddendCountingObjectsProperty = new Property( rightAddendObjects );
    this.distributeCountingObjects();

    CountingObjectsManager.setAddendType( leftAddendObjects, rightAddendObjects, this.inactiveCountingObjects );
    this.registerObservableArrays( leftAddendObjects, rightAddendObjects, this.inactiveCountingObjects );

    this.challengeProperty.link( () => {
      this.distributeCountingObjects();
    } );

    // TODO: Add missing y functionality https://github.com/phetsims/number-pairs/issues/36

    this.leftAddendProperty.link( leftAddend => {
      if ( isResettingAllProperty.value || isSettingPhetioStateProperty.value ) {
        // No_op. We can rely on our observable arrays and Properties to have the correct state. This link fires before
        // counting objects have been distributed to observable arrays properly in both state setting and reset
        // scenarios.
        return;
      }
      const delta = leftAddend - leftAddendObjects.length;
      if ( delta > 0 ) {
        affirm( this.inactiveCountingObjects.length >= delta, 'not enough inactive counting objects' );
        leftAddendObjects.push( ...this.inactiveCountingObjects.slice( 0, delta ) );
      }
      else if ( delta < 0 ) {
        leftAddendObjects.splice( delta, -delta );
      }
    } );

    this.rightAddendProperty.link( rightAddend => {
      if ( isResettingAllProperty.value || isSettingPhetioStateProperty.value ) {
        // No_op. We can rely on our observable arrays and Properties to have the correct state. This link fires before
        // counting objects have been distributed to observable arrays properly in both state setting and reset
        // scenarios.
        return;
      }
      const delta = rightAddend - rightAddendObjects.length;
      if ( delta > 0 ) {
        affirm( this.inactiveCountingObjects.length >= delta, 'not enough inactive counting objects' );
        rightAddendObjects.push( ...this.inactiveCountingObjects.slice( 0, delta ) );
      }
      else if ( delta < 0 ) {
        rightAddendObjects.splice( delta, -delta );
      }
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

  /**
   * When a challenge is created or changed, we need to distribute the counting objects to match the left and right addends.
   * This is used at startup as well as during reset and when a challenge is changed.
   */
  private distributeCountingObjects(): void {
    const leftAddendObjects = this.leftAddendCountingObjectsProperty.value;
    const rightAddendObjects = this.rightAddendCountingObjectsProperty.value;

    this.inactiveCountingObjects.reset();
    leftAddendObjects.reset();
    rightAddendObjects.reset();

    _.times( this.leftAddendProperty.value, () => {
      const countingObject = this.inactiveCountingObjects.shift();
      leftAddendObjects.push( countingObject! );
    } );
    _.times( this.rightAddendProperty.value, () => {

      // We want to pull from the end of the inactiveCountingObjects array to keep as much consistency as possible
      // between which countingObjects belong to which addend in the initial state.
      const countingObject = this.inactiveCountingObjects.pop();
      rightAddendObjects.push( countingObject! );
    } );

    CountingObjectsManager.setAddendType( leftAddendObjects, rightAddendObjects, this.inactiveCountingObjects );
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
    this.distributeCountingObjects();
  }

  // TODO: Everything from here and below was pulled from NumberPairsModel https://github.com/phetsims/number-pairs/issues/36
  // Maybe subtype?
  public deselectAllKittens(): void {
    this.countingObjects.forEach( countingObject => {
      countingObject.kittenSelectedProperty.value = false;
    } );
  }

  /**
   * Returns animation targets based on the provided position Properties and target positions.
   * @param positionProperties
   * @param targetPositions
   */
  private getAnimationTargets( positionProperties: Property<Vector2>[], targetPositions: Vector2[] ): AnimationTarget[] {
    return positionProperties.map( ( positionProperty, index ) => {
      return {
        property: positionProperty,
        to: targetPositions[ index ]
      };
    } );
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
    affirm( leftAddendObjects.length === leftAttributePositions.length,
      `leftAddendObjects length: ${leftAddendObjects.length}  should be the same leftAttributePositions length: ${leftAttributePositions.length} and the left value is: ${this.leftAddendProperty.value}.` );
    affirm( rightAddendObjects.length === rightAttributePositions.length,
      `rightAddendObjects length: ${rightAddendObjects.length}  should be the same rightAttributePositions length: ${rightAttributePositions.length} and the right value is: ${this.rightAddendProperty.value}.` );

    if ( animate ) {
      const animationTargets = [ ...this.getAnimationTargets( leftAddendObjects.map( countingObject => countingObject.attributePositionProperty ), leftAttributePositions ),
        ...this.getAnimationTargets( rightAddendObjects.map( countingObject => countingObject.attributePositionProperty ), rightAttributePositions ) ];

      this.countingObjectsAnimation?.stop();
      this.countingObjectsAnimation = new Animation( {
        duration: 0.4,
        targets: animationTargets
      } );
      this.countingObjectsAnimation.endedEmitter.addListener( () => {
        this.countingObjectsAnimation = null;
      } );
      this.countingObjectsAnimation.start();
    }
    else {
      leftAddendObjects.forEach( ( countingObject, index ) => {
        countingObject.attributePositionProperty.value = leftAttributePositions[ index ];
      } );
      rightAddendObjects.forEach( ( countingObject, index ) => {
        countingObject.attributePositionProperty.value = rightAttributePositions[ index ];
      } );
    }
  }

  /**
   * Organizes the counting objects into a ten frame based on the provided bounds.
   * @param tenFrameBounds
   * @param positionType
   */
  public organizeIntoTenFrame( tenFrameBounds: Bounds2[], positionType: 'attribute' | 'location' ): void {
    affirm( tenFrameBounds.length === 1 || tenFrameBounds.length === 2, 'Ten frame bounds must be an array of length 1 or 2.' );
    const leftAddendObjects = this.leftAddendCountingObjectsProperty.value;
    const rightAddendObjects = this.rightAddendCountingObjectsProperty.value;

    // If we are only provided one ten frame bound, we are in the unified counting area where Counting Objects are split by attribute.
    // If we have two ten frame bounds, we are in a split counting area where Counting Objects are split by location.
    let leftGridCoordinates: Vector2[];
    let rightGridCoordinates: Vector2[];
    if ( tenFrameBounds.length === 1 ) {
      const gridCoordinates = CountingObjectsManager.getGridCoordinates( tenFrameBounds[ 0 ], 0, 0 );
      leftGridCoordinates = gridCoordinates.slice( 0, leftAddendObjects.length );
      rightGridCoordinates = gridCoordinates.slice( leftAddendObjects.length, leftAddendObjects.length + rightAddendObjects.length );
    }
    else {
      leftGridCoordinates = CountingObjectsManager.getGridCoordinates( tenFrameBounds[ 0 ], 35, 35 ).slice( 0, leftAddendObjects.length );
      rightGridCoordinates = CountingObjectsManager.getGridCoordinates( tenFrameBounds[ 1 ], 35, 35 ).slice( 0, rightAddendObjects.length );
    }
    if ( positionType === 'attribute' ) {
      this.setAttributePositions( leftAddendObjects, rightAddendObjects, leftGridCoordinates, rightGridCoordinates, true );
    }


    affirm( this.leftAddendCountingObjectsProperty.value.length === this.leftAddendProperty.value, 'Addend array length and value should match' );
    affirm( this.rightAddendCountingObjectsProperty.value.length === this.rightAddendProperty.value, 'Addend array length and value should match' );
  }

  /**
   * Registers the provided observable arrays to update their counting objects as expected when added or removed.
   * Overall, the removal and addition of counting objects to the inactiveCountingObjects array should be handled
   * in these listeners. This allows us to keep the arrays in sync in one central location.
   * @param leftAddendObjects
   * @param rightAddendObjects
   * @param inactiveCountingObjects
   */
  public registerObservableArrays( leftAddendObjects: ObservableArray<CountingObject>, rightAddendObjects: ObservableArray<CountingObject>, inactiveCountingObjects: ObservableArray<CountingObject> ): void {

    // In general, We want to rely on the observable arrays and instrumented Properties to manage the state of the counting objects.
    leftAddendObjects.addItemAddedListener( countingObject => {
      if ( !isResettingAllProperty.value && !isSettingPhetioStateProperty.value ) {
        inactiveCountingObjects.includes( countingObject ) && inactiveCountingObjects.remove( countingObject );
        countingObject.addendTypeProperty.value = AddendType.LEFT;
      }
    } );
    leftAddendObjects.addItemRemovedListener( countingObject => {
      if ( !isResettingAllProperty.value && !isSettingPhetioStateProperty.value && countingObject.traverseInactiveObjects && !inactiveCountingObjects.includes( countingObject ) ) {
        inactiveCountingObjects.unshift( countingObject );
      }
    } );

    rightAddendObjects.addItemAddedListener( countingObject => {
      if ( !isResettingAllProperty.value && !isSettingPhetioStateProperty.value ) {
        inactiveCountingObjects.includes( countingObject ) && inactiveCountingObjects.remove( countingObject );
        countingObject.addendTypeProperty.value = AddendType.RIGHT;
      }
    } );
    rightAddendObjects.addItemRemovedListener( countingObject => {
      if ( !isResettingAllProperty.value && !isSettingPhetioStateProperty.value && countingObject.traverseInactiveObjects && !inactiveCountingObjects.includes( countingObject ) ) {
        inactiveCountingObjects.unshift( countingObject );
      }
    } );

    inactiveCountingObjects.addItemAddedListener( countingObject => {
      countingObject.addendTypeProperty.value = AddendType.INACTIVE;
    } );
  }

  /**
   * Returns the grid coordinates that are available for a counting object to be placed in the counting area.
   * This function will first retrieve all the grid coordinates according to the provided bounds, and then
   * filter out the grid coordinates that are already occupied by counting objects.
   * @param countingObjects
   * @param addendBounds
   */
  protected getAvailableGridCoordinates( countingObjects: CountingObject[], addendBounds: Bounds2 ): Vector2[] {
    const countingAreaMargin = NumberPairsConstants.COUNTING_AREA_INNER_MARGIN;
    const gridCoordinates = CountingObjectsManager.getGridCoordinates( addendBounds, countingAreaMargin, countingAreaMargin, 6 );
    return gridCoordinates.filter( gridCoordinate => countingObjects.every( countingObject => {
      const dropZoneBounds = NumberPairsConstants.GET_DROP_ZONE_BOUNDS( countingObject.locationPositionProperty.value );
      return !dropZoneBounds.containsPoint( gridCoordinate );
    } ) );
  }

  /**
   * Creates a link that updates the addend type of the counting object based on the changed addend type.
   * @param countingObject
   */
  public createCountingObjectAddendTypeLinks( countingObject: CountingObject ): void {
    countingObject.addendTypeProperty.lazyLink( addendType => {
      const leftAddendCountingObjects = this.leftAddendCountingObjectsProperty.value;
      const rightAddendCountingObjects = this.rightAddendCountingObjectsProperty.value;

      if ( !isSettingPhetioStateProperty.value && !isResettingAllProperty.value ) {
        if ( addendType === AddendType.LEFT && !leftAddendCountingObjects.includes( countingObject ) && rightAddendCountingObjects.includes( countingObject ) ) {
          countingObject.traverseInactiveObjects = false;
          rightAddendCountingObjects.remove( countingObject );
          leftAddendCountingObjects.add( countingObject );
          countingObject.traverseInactiveObjects = true;
        }
        else if ( addendType === AddendType.RIGHT && !rightAddendCountingObjects.includes( countingObject ) && leftAddendCountingObjects.includes( countingObject ) ) {
          countingObject.traverseInactiveObjects = false;
          rightAddendCountingObjects.add( countingObject );
          leftAddendCountingObjects.remove( countingObject );
          countingObject.traverseInactiveObjects = true;
        }
      }

      // Update the location of the countingObject when the addendType changes during reset, scene changes, or if we are
      // changing the addend value in a different representation.
      const locationRepresentationTypes = [ RepresentationType.APPLES, RepresentationType.ONE_CARDS, RepresentationType.SOCCER_BALLS, RepresentationType.BUTTERFLIES ];
      if ( isResettingAllProperty.value || !locationRepresentationTypes.includes( this.representationTypeProperty.value ) ) {
        const addendBounds = addendType === AddendType.LEFT ? NumberPairsConstants.LEFT_COUNTING_AREA_BOUNDS : NumberPairsConstants.RIGHT_COUNTING_AREA_BOUNDS;
        const dilatedAddendBounds = addendBounds.dilated( -20 );

        if ( addendType === AddendType.LEFT && !addendBounds.containsPoint( countingObject.locationPositionProperty.value ) ) {
          const gridCoordinates = this.getAvailableGridCoordinates( leftAddendCountingObjects, dilatedAddendBounds );
          countingObject.locationPositionProperty.value = dotRandom.sample( gridCoordinates );
        }
        else if ( addendType === AddendType.RIGHT && !addendBounds.containsPoint( countingObject.locationPositionProperty.value ) ) {
          const gridCoordinates = this.getAvailableGridCoordinates( rightAddendCountingObjects, dilatedAddendBounds );
          countingObject.locationPositionProperty.value = dotRandom.sample( gridCoordinates );
        }
      }
    } );
  }

  public tryAgain(): void {
    this.clearFeedback();
    this.modeProperty.value = 'idle';

    // hide the missing addend again
    this.selectedGuessProperty.value = null;
  }
}

numberPairs.register( 'Level', Level );
