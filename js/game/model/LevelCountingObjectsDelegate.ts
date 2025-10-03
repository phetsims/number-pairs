// Copyright 2025, University of Colorado Boulder

/**
 * Encapsulates the counting-object logic for a game level so that the Level model can focus on
 * challenge/score state. This mirrors the responsibilities provided by NumberPairsModel for other
 * screens while keeping construction lightweight for the Level model.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import createObservableArray, { ObservableArray, ObservableArrayIO } from '../../../../axon/js/createObservableArray.js';
import derived from '../../../../axon/js/derived.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import Color from '../../../../scenery/js/util/Color.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Animation from '../../../../twixt/js/Animation.js';
import CountingObject, { AddendType } from '../../common/model/CountingObject.js';
import { CountingObjectsManager } from '../../common/model/CountingObjectsManager.js';
import { AnimationTarget } from '../../common/model/NumberPairsModel.js';
import { NumberPairsUtils } from '../../common/model/NumberPairsUtils.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import TNumberPairsModel from '../../common/model/TNumberPairsModel.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';

// Controls extra spacing between the two halves of the single ten frame used in level 7.
const SINGLE_TEN_FRAME_COLUMN_GAP = 20;
const SINGLE_TEN_FRAME_GAP_COLUMN_INDEX = 5;

export type CountingObjectsDelegateOptions = {
  challengeProperty: Property<Challenge>;
  selectedGuessProperty: Property<number | null>;
  representationTypeProperty: Property<RepresentationType>;
} & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class LevelCountingObjectsDelegate implements TNumberPairsModel {
  public readonly totalProperty: TReadOnlyProperty<number>;
  public readonly leftAddendProperty: TReadOnlyProperty<number>;
  public readonly rightAddendProperty: TReadOnlyProperty<number>;
  public readonly totalVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly leftAddendVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly rightAddendVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly totalColorProperty: TReadOnlyProperty<Color>;
  public readonly leftAddendColorProperty: TReadOnlyProperty<Color>;
  public readonly rightAddendColorProperty: TReadOnlyProperty<Color>;

  public readonly leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  public readonly rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  public readonly inactiveCountingObjects: ObservableArray<CountingObject>;
  public readonly countingObjects: CountingObject[];

  public countingObjectsAnimation: Animation | null = null;

  private readonly challengeProperty: Property<Challenge>;
  private readonly selectedGuessProperty: Property<number | null>;
  public readonly representationTypeProperty: Property<RepresentationType>;
  private readonly leftAddendObjects: ObservableArray<CountingObject>;
  private readonly rightAddendObjects: ObservableArray<CountingObject>;

  public constructor( options: CountingObjectsDelegateOptions ) {
    this.challengeProperty = options.challengeProperty;
    this.selectedGuessProperty = options.selectedGuessProperty;
    this.representationTypeProperty = options.representationTypeProperty;

    this.totalColorProperty = new DynamicProperty( this.representationTypeProperty, {
      derive: 'totalColorProperty'
    } );
    this.leftAddendColorProperty = new DynamicProperty( this.representationTypeProperty, {
      derive: 'leftAddendColorProperty'
    } );
    this.rightAddendColorProperty = new DynamicProperty( this.representationTypeProperty, {
      derive: 'rightAddendColorProperty'
    } );

    this.totalProperty = derived( this.challengeProperty, challenge => challenge.y );

    this.leftAddendProperty = derived( this.challengeProperty, this.selectedGuessProperty,
      ( challenge, guess ) => challenge.missing === 'a' ? guess === null ? 0 : guess : challenge.a
    );

    this.rightAddendProperty = derived( this.challengeProperty, this.selectedGuessProperty,
      ( challenge, guess ) => challenge.missing === 'b' ? guess === null ? 0 : guess : challenge.b );

    this.totalVisibleProperty = derived( this.challengeProperty, challenge => challenge.missing !== 'y' );

    this.leftAddendVisibleProperty = derived( this.challengeProperty, this.selectedGuessProperty,
      ( challenge, guess ) => ( challenge.missing === 'a' && guess !== null ) || challenge.missing !== 'a' );

    this.rightAddendVisibleProperty = derived( this.challengeProperty, this.selectedGuessProperty,
      ( challenge, guess ) => ( challenge.missing === 'b' && guess !== null ) || challenge.missing !== 'b' );

    this.countingObjects = CountingObjectsManager.createCountingObjects( 40, this.leftAddendProperty.value, this.rightAddendProperty.value, options.tandem );
    const inactiveCountingObjects = this.countingObjects.slice();
    this.inactiveCountingObjects = createObservableArray( {
      elements: inactiveCountingObjects,
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'inactiveCountingObjects' )
    } );
    this.leftAddendObjects = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'leftAddendObjects' )
    } );
    this.rightAddendObjects = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'rightAddendObjects' )
    } );

    this.leftAddendCountingObjectsProperty = new Property( this.leftAddendObjects );
    this.rightAddendCountingObjectsProperty = new Property( this.rightAddendObjects );

    this.distributeCountingObjects();
    CountingObjectsManager.setAddendType( this.leftAddendObjects, this.rightAddendObjects, this.inactiveCountingObjects );
    this.registerObservableArrays();

    this.challengeProperty.link( () => {
      this.distributeCountingObjects();
    } );

    this.leftAddendProperty.link( leftAddend => {
      if ( isResettingAllProperty.value || isSettingPhetioStateProperty.value ) {
        return;
      }
      const delta = leftAddend - this.leftAddendObjects.length;
      if ( delta > 0 ) {
        affirm( this.inactiveCountingObjects.length >= delta, 'not enough inactive counting objects' );
        this.leftAddendObjects.push( ...this.inactiveCountingObjects.slice( 0, delta ) );
      }
      else if ( delta < 0 ) {
        this.leftAddendObjects.splice( delta, -delta );
      }
    } );

    this.rightAddendProperty.link( rightAddend => {
      if ( isResettingAllProperty.value || isSettingPhetioStateProperty.value ) {
        return;
      }
      const delta = rightAddend - this.rightAddendObjects.length;
      if ( delta > 0 ) {
        affirm( this.inactiveCountingObjects.length >= delta, 'not enough inactive counting objects' );
        this.rightAddendObjects.push( ...this.inactiveCountingObjects.slice( 0, delta ) );
      }
      else if ( delta < 0 ) {
        this.rightAddendObjects.splice( delta, -delta );
      }
    } );
  }

  public organizeIntoDoubleTenFrame(): void {
    const leftAddendObjects = this.leftAddendObjects;
    const rightAddendObjects = this.rightAddendObjects;

    const tenFrameBounds = NumberPairsUtils.splitBoundsInHalf( NumberPairsConstants.COUNTING_AREA_BOUNDS );

    const leftColumnCount = CountingObjectsManager.getColumnCountForObjectTotal( leftAddendObjects.length );
    const rightColumnCount = CountingObjectsManager.getColumnCountForObjectTotal( rightAddendObjects.length );
    const leftGridCoordinates = CountingObjectsManager.getGridCoordinates( tenFrameBounds[ 0 ], 35, 35, leftColumnCount ).slice( 0, leftAddendObjects.length );
    const rightGridCoordinates = CountingObjectsManager.getGridCoordinates( tenFrameBounds[ 1 ], 35, 35, rightColumnCount ).slice( 0, rightAddendObjects.length );

    this.setAttributePositions( leftAddendObjects, rightAddendObjects, leftGridCoordinates, rightGridCoordinates );

    affirm( this.leftAddendObjects.length === this.leftAddendProperty.value, 'Addend array length and value should match' );
    affirm( this.rightAddendObjects.length === this.rightAddendProperty.value, 'Addend array length and value should match' );
  }

  // For level 7, show as a single ten-frame, with a gap between 5th and 6th columns
  public organizeIntoSingleTenFrame(): void {
    const leftAddendObjects = this.leftAddendObjects;
    const rightAddendObjects = this.rightAddendObjects;

    const LOTS_OF_CATS = leftAddendObjects.length + rightAddendObjects.length > 20;

    // Use more of the number game play area when there are lots of cats
    const tenFrameBounds = NumberPairsUtils.createCenteredTenFrameBounds( NumberPairsConstants.COUNTING_AREA_BOUNDS ).dilatedX( LOTS_OF_CATS ? 100 : 0 );

    // when there are lots of cats, use more columns
    const minColumns = LOTS_OF_CATS ? 10 : 5;

    const totalColumnCount = CountingObjectsManager.getColumnCountForObjectTotal( leftAddendObjects.length + rightAddendObjects.length, minColumns );
    const gridCoordinates = CountingObjectsManager.getGridCoordinates( tenFrameBounds, 0, 0, totalColumnCount );

    // On level 7, show a gap between columns 5-6 to make it easier to visually parse
    const gapAdjustedGridCoordinates = gridCoordinates.map( ( coordinate, index ) => {
      const columnIndex = index % totalColumnCount;
      return columnIndex >= SINGLE_TEN_FRAME_GAP_COLUMN_INDEX ? coordinate.plusXY( SINGLE_TEN_FRAME_COLUMN_GAP, 0 ) : coordinate;
    } );

    const leftGridCoordinates = gapAdjustedGridCoordinates.slice( 0, leftAddendObjects.length );
    const rightGridCoordinates = gapAdjustedGridCoordinates.slice( leftAddendObjects.length, leftAddendObjects.length + rightAddendObjects.length );

    this.setAttributePositions( leftAddendObjects, rightAddendObjects, leftGridCoordinates, rightGridCoordinates );

    affirm( this.leftAddendObjects.length === this.leftAddendProperty.value, 'Addend array length and value should match' );
    affirm( this.rightAddendObjects.length === this.rightAddendProperty.value, 'Addend array length and value should match' );
  }

  public setAttributePositions( leftAddendObjects: CountingObject[],
                                rightAddendObjects: CountingObject[],
                                leftAttributePositions: Vector2[],
                                rightAttributePositions: Vector2[] ): void {
    affirm( leftAddendObjects.length === leftAttributePositions.length,
      `leftAddendObjects length: ${leftAddendObjects.length}  should be the same leftAttributePositions length: ${leftAttributePositions.length} and the left value is: ${this.leftAddendProperty.value}.` );
    affirm( rightAddendObjects.length === rightAttributePositions.length,
      `rightAddendObjects length: ${rightAddendObjects.length}  should be the same rightAttributePositions length: ${rightAttributePositions.length} and the right value is: ${this.rightAddendProperty.value}.` );

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

  public createCountingObjectAddendTypeLinks( countingObject: CountingObject ): void {
    countingObject.addendTypeProperty.lazyLink( addendType => {
      const leftAddendCountingObjects = this.leftAddendObjects;
      const rightAddendCountingObjects = this.rightAddendObjects;

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

  public deselectAllKittens(): void {
    this.countingObjects.forEach( countingObject => {
      countingObject.kittenSelectedProperty.value = false;
    } );
  }

  public resetCountingObjects(): void {
    this.distributeCountingObjects();
  }

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

  private registerObservableArrays(): void {
    const leftAddendObjects = this.leftAddendObjects;
    const rightAddendObjects = this.rightAddendObjects;
    const inactiveCountingObjects = this.inactiveCountingObjects;

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

  private getAnimationTargets( positionProperties: Property<Vector2>[], targetPositions: Vector2[] ): AnimationTarget[] {
    return positionProperties.map( ( positionProperty, index ) => {
      return {
        property: positionProperty,
        to: targetPositions[ index ]
      };
    } );
  }

  private getAvailableGridCoordinates( countingObjects: CountingObject[], addendBounds: Bounds2 ): Vector2[] {
    const countingAreaMargin = NumberPairsConstants.COUNTING_AREA_INNER_MARGIN;
    const gridCoordinates = CountingObjectsManager.getGridCoordinates( addendBounds, countingAreaMargin, countingAreaMargin, 6 );
    return gridCoordinates.filter( gridCoordinate => countingObjects.every( countingObject => {
      const dropZoneBounds = NumberPairsConstants.GET_DROP_ZONE_BOUNDS( countingObject.locationPositionProperty.value );
      return !dropZoneBounds.containsPoint( gridCoordinate );
    } ) );
  }
}

numberPairs.register( 'LevelCountingObjectsDelegate', LevelCountingObjectsDelegate );
