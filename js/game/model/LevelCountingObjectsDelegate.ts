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
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import CountingObject, { AddendType } from '../../common/model/CountingObject.js';
import { CountingObjectsManager } from '../../common/model/CountingObjectsManager.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';
import AbstractNumberPairsModel, { AbstractNumberPairsModelOptions } from '../../common/model/AbstractNumberPairsModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
export type CountingObjectsDelegateOptions = SelfOptions & AbstractNumberPairsModelOptions;

export default class LevelCountingObjectsDelegate extends AbstractNumberPairsModel {

  public readonly inactiveCountingObjects: ObservableArray<CountingObject>;
  private readonly leftAddendObjects: ObservableArray<CountingObject>;
  private readonly rightAddendObjects: ObservableArray<CountingObject>;

  public constructor(
    private readonly challengeProperty: Property<Challenge>,
    private readonly selectedGuessProperty: Property<number | null>,
    providedOptions: CountingObjectsDelegateOptions ) {

    const options = optionize<CountingObjectsDelegateOptions, CountingObjectsDelegateOptions, AbstractNumberPairsModelOptions>()( {}, providedOptions );
    const totalProperty = derived( challengeProperty, challenge => challenge.y );
    const leftAddendProperty = derived( challengeProperty, selectedGuessProperty,
      ( challenge, guess ) => challenge.missing === 'a' ? guess === null ? 0 : guess : challenge.a
    );
    const rightAddendProperty = derived( challengeProperty, selectedGuessProperty,
      ( challenge, guess ) => challenge.missing === 'b' ? guess === null ? 0 : guess : challenge.b );

    const countingObjects = CountingObjectsManager.createCountingObjects( 40, leftAddendProperty.value, rightAddendProperty.value, options.tandem );
    const inactiveCountingObjects = createObservableArray( {
      elements: countingObjects.slice(),
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'inactiveCountingObjects' )
    } );
    const leftAddendObjects: ObservableArray<CountingObject> = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'leftAddendObjects' )
    } );
    const rightAddendObjects: ObservableArray<CountingObject> = createObservableArray( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'rightAddendObjects' )
    } );

    const leftAddendCountingObjectsProperty = new Property( leftAddendObjects );
    const rightAddendCountingObjectsProperty = new Property( rightAddendObjects );

    const totalVisibleProperty = derived( challengeProperty, challenge => challenge.missing !== 'y' );

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
