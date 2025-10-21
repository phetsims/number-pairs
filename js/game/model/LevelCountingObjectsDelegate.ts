// Copyright 2025, University of Colorado Boulder

/**
 * Encapsulates the counting-object logic for a game level so that the Level model can focus on
 * challenge/score state. This mirrors the responsibilities provided by NumberPairsModel for other
 * screens while keeping construction lightweight for the Level model.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import createObservableArray, { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import derived from '../../../../axon/js/derived.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import arrayRemove from '../../../../phet-core/js/arrayRemove.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import AbstractNumberPairsModel, { AbstractNumberPairsModelOptions } from '../../common/model/AbstractNumberPairsModel.js';
import CountingObject, { AddendType } from '../../common/model/CountingObject.js';
import { CountingObjectsManager } from '../../common/model/CountingObjectsManager.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';
import InputRange from './InputRange.js';
import Level from './Level.js';

type SelfOptions = EmptySelfOptions;
export type CountingObjectsDelegateOptions = SelfOptions & AbstractNumberPairsModelOptions;

// constants
const ZERO_TO_TEN_MAX = 20;
const ZERO_TO_TWENTY_MAX = 40;

export default class LevelCountingObjectsDelegate extends AbstractNumberPairsModel {

  public readonly inactiveCountingObjects: ObservableArray<CountingObject>;
  private readonly leftAddendObjects: ObservableArray<CountingObject>;
  private readonly rightAddendObjects: ObservableArray<CountingObject>;

  public constructor(
    private readonly challengeProperty: Property<Challenge>,
    selectedGuessProperty: Property<number | null>,
    range: InputRange,
    options: CountingObjectsDelegateOptions ) {

    const totalProperty = derived( challengeProperty, selectedGuessProperty,
      ( challenge, guess ) => challenge.missing === 'y' ? ( guess === null ? 0 : guess ) : challenge.y
    );
    const leftAddendProperty = derived( challengeProperty, selectedGuessProperty,
      ( challenge, guess ) => challenge.missing === 'a' ? guess === null ? 0 : guess : challenge.a
    );
    const rightAddendProperty = derived( challengeProperty, selectedGuessProperty,
      ( challenge, guess ) => challenge.missing === 'b' ? guess === null ? 0 : guess : challenge.b );


    const countingObjectsCount = range === 'zeroToTen' ? ZERO_TO_TEN_MAX : ZERO_TO_TWENTY_MAX;
    const countingObjects = CountingObjectsManager.createCountingObjects( countingObjectsCount, leftAddendProperty.value,
      rightAddendProperty.value, options.tandem, Level.COUNTING_AREA_BOUNDS );
    const inactiveCountingObjects = createObservableArray( {
      elements: countingObjects.slice()
    } );
    const leftAddendObjects = createObservableArray<CountingObject>( {} );
    const rightAddendObjects = createObservableArray<CountingObject>( {} );

    const leftAddendCountingObjectsProperty = new Property( leftAddendObjects );
    const rightAddendCountingObjectsProperty = new Property( rightAddendObjects );

    const totalVisibleProperty = derived( challengeProperty, selectedGuessProperty,
      ( challenge, guess ) => ( challenge.missing === 'y' && guess !== null ) || challenge.missing !== 'y'
    );

    const leftAddendVisibleProperty = derived( challengeProperty, selectedGuessProperty,
      ( challenge, guess ) => ( challenge.missing === 'a' && guess !== null ) || challenge.missing !== 'a' );

    const rightAddendVisibleProperty = derived( challengeProperty, selectedGuessProperty,
      ( challenge, guess ) => ( challenge.missing === 'b' && guess !== null ) || challenge.missing !== 'b' );
    super( totalProperty, leftAddendProperty, rightAddendProperty, leftAddendCountingObjectsProperty,
      rightAddendCountingObjectsProperty, totalVisibleProperty, leftAddendVisibleProperty, rightAddendVisibleProperty,
      countingObjects, options );

    this.inactiveCountingObjects = inactiveCountingObjects;
    this.leftAddendObjects = leftAddendObjects;
    this.rightAddendObjects = rightAddendObjects;

    // The order of these operations is important during construction, so please do not change without careful consideration.
    this.distributeCountingObjects();
    this.registerObservableArrays( this.leftAddendObjects, this.rightAddendObjects, this.inactiveCountingObjects );
    this.setupAddendPropertyLink( leftAddendProperty, this.leftAddendObjects, this.inactiveCountingObjects );
    this.setupAddendPropertyLink( rightAddendProperty, this.rightAddendObjects, this.inactiveCountingObjects );

    // Link to the countingObject.addendTypeProperty at the end of construction to avoid triggering duplicate work
    // that is handled manually above.
    this.initializeCountingObjectLinks();

    // When a counting object becomes active, we want to update its position and ensure it does not overlap
    // with other active counting objects.
    countingObjects.forEach( countingObject => {
      countingObject.addendTypeProperty.link( addendType => {
        if ( addendType !== AddendType.INACTIVE ) {
          const activeCountingObjects = countingObjects.filter(
            countingObject => countingObject.addendTypeProperty.value !== AddendType.INACTIVE );

          // We do not want to worry about overlapping with itself.
          arrayRemove( activeCountingObjects, countingObject );
          const gridCoordinates = this.getAvailableGridCoordinates( activeCountingObjects, Level.COUNTING_AREA_BOUNDS );
          countingObject.attributePositionProperty.value = dotRandom.sample( gridCoordinates );
        }
      } );
    } );

    this.challengeProperty.lazyLink( () => {
      this.distributeCountingObjects();
      this.randomizeCountingObjectPositions();
    } );
  }

  /**
   * We referenced getAvailableLocationGridCoordinates to create this function. Here we want to use attribute positions,
   * and also need more columns to fit all possible counting objects in the counting area.
   * @param countingObjects - the counting objects to avoid overlapping with
   * @param addendBounds
   */
  private getAvailableGridCoordinates( countingObjects: CountingObject[], addendBounds: Bounds2 ): Vector2[] {
    const countingAreaMargin = NumberPairsConstants.COUNTING_AREA_INNER_MARGIN;
    const columnCount = CountingObjectsManager.getColumnCount( this.countingObjects.length );
    const gridCoordinates = CountingObjectsManager.getGridCoordinates( addendBounds, countingAreaMargin, countingAreaMargin, columnCount );
    return gridCoordinates.filter( gridCoordinate => countingObjects.every( countingObject => {
      const dropZoneBounds = NumberPairsConstants.GET_DROP_ZONE_BOUNDS( countingObject.attributePositionProperty.value );
      return !dropZoneBounds.containsPoint( gridCoordinate );
    } ) );
  }

  /**
   * Sets up a link on the addendProperty to add or remove counting objects from the addendObjects array.
   * @param addendProperty
   * @param addendObjects
   * @param inactiveObjects
   */
  private setupAddendPropertyLink( addendProperty: TReadOnlyProperty<number>,
                                   addendObjects: ObservableArray<CountingObject>,
                                   inactiveObjects: ObservableArray<CountingObject> ): void {
    addendProperty.link( addend => {
      if ( isResettingAllProperty.value || isSettingPhetioStateProperty.value ) {
        return;
      }
      const delta = addend - addendObjects.length;
      if ( delta > 0 ) {
        affirm( inactiveObjects.length >= delta, 'not enough inactive counting objects' );
        addendObjects.push( ...inactiveObjects.slice( 0, delta ) );
      }
      else if ( delta < 0 ) {
        addendObjects.splice( delta, -delta );
      }
    } );
  }

  public resetCountingObjects(): void {
    this.distributeCountingObjects();
  }

  /**
   * Distribute the counting objects to the appropriate arrays based on the current addend properties.
   */
  private distributeCountingObjects(): void {
    this.inactiveCountingObjects.reset();
    this.leftAddendObjects.reset();
    this.rightAddendObjects.reset();

    _.times( this.leftAddendProperty.value, () => {
      const countingObject = this.inactiveCountingObjects.shift();
      this.leftAddendObjects.push( countingObject! );
    } );

    _.times( this.rightAddendProperty.value, () => {
      const countingObject = this.inactiveCountingObjects.pop();
      this.rightAddendObjects.push( countingObject! );
    } );

    CountingObjectsManager.setAddendType( this.leftAddendObjects, this.rightAddendObjects, this.inactiveCountingObjects );
  }

  /**
   * Sets the positions of the counting objects to random grid positions within the counting area bounds.
   * @param countingObjectPositionProperties
   */
  private setCountingObjectPositions( countingObjectPositionProperties: Property<Vector2>[] ): void {
    const availableGridCoordinates = CountingObjectsManager.getGridCoordinates( Level.COUNTING_AREA_BOUNDS,
      NumberPairsConstants.COUNTING_AREA_INNER_MARGIN,
      NumberPairsConstants.COUNTING_AREA_INNER_MARGIN, 10 );
    countingObjectPositionProperties.forEach( positionProperty => {
      const position = dotRandom.sample( availableGridCoordinates );
      availableGridCoordinates.splice( availableGridCoordinates.indexOf( position ), 1 );
      positionProperty.value = position;
    } );
  }

  /**
   * Randomizes the attribute positions for all counting objects in the level.
   */
  public randomizeCountingObjectPositions(): void {
    this.setCountingObjectPositions( this.countingObjects.map( countingObject => countingObject.attributePositionProperty ) );
  }
}

numberPairs.register( 'LevelCountingObjectsDelegate', LevelCountingObjectsDelegate );
