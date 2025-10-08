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
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import AbstractNumberPairsModel, { AbstractNumberPairsModelOptions } from '../../common/model/AbstractNumberPairsModel.js';
import CountingObject from '../../common/model/CountingObject.js';
import { CountingObjectsManager } from '../../common/model/CountingObjectsManager.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';

type SelfOptions = EmptySelfOptions & {
  countingAreaBounds?: Bounds2;
};
export type CountingObjectsDelegateOptions = SelfOptions & AbstractNumberPairsModelOptions;

export default class LevelCountingObjectsDelegate extends AbstractNumberPairsModel {

  public readonly inactiveCountingObjects: ObservableArray<CountingObject>;
  private readonly leftAddendObjects: ObservableArray<CountingObject>;
  private readonly rightAddendObjects: ObservableArray<CountingObject>;
  public readonly countingAreaBounds: Bounds2;

  public constructor(
    private readonly challengeProperty: Property<Challenge>,
    selectedGuessProperty: Property<number | null>,
    providedOptions: CountingObjectsDelegateOptions ) {

    const options = optionize<CountingObjectsDelegateOptions, CountingObjectsDelegateOptions, AbstractNumberPairsModelOptions>()( {
      countingAreaBounds: NumberPairsConstants.COUNTING_AREA_BOUNDS
    }, providedOptions );

    const totalProperty = derived( challengeProperty, selectedGuessProperty,
      ( challenge, guess ) => challenge.missing === 'y' ? ( guess === null ? 0 : guess ) : challenge.y
    );
    const leftAddendProperty = derived( challengeProperty, selectedGuessProperty,
      ( challenge, guess ) => challenge.missing === 'a' ? guess === null ? 0 : guess : challenge.a
    );
    const rightAddendProperty = derived( challengeProperty, selectedGuessProperty,
      ( challenge, guess ) => challenge.missing === 'b' ? guess === null ? 0 : guess : challenge.b );

    const countingObjects = CountingObjectsManager.createCountingObjects( 40, leftAddendProperty.value, rightAddendProperty.value, options.tandem, options.countingAreaBounds );
    const inactiveCountingObjects = createObservableArray( {
      elements: countingObjects.slice(),
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'inactiveCountingObjects' )
    } );
    const leftAddendObjects = createObservableArray<CountingObject>( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'leftAddendObjects' )
    } );
    const rightAddendObjects = createObservableArray<CountingObject>( {
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'rightAddendObjects' )
    } );

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
    this.countingAreaBounds = options.countingAreaBounds;

    this.distributeCountingObjects();
    CountingObjectsManager.setAddendType( this.leftAddendObjects, this.rightAddendObjects, this.inactiveCountingObjects );
    this.registerObservableArrays( this.leftAddendObjects, this.rightAddendObjects, this.inactiveCountingObjects );

    this.challengeProperty.link( () => {
      this.distributeCountingObjects();
    } );

    this.setupAddendPropertyLink( leftAddendProperty, this.leftAddendObjects, this.inactiveCountingObjects );
    this.setupAddendPropertyLink( rightAddendProperty, this.rightAddendObjects, this.inactiveCountingObjects );

    // Link to the countingObject.addendTypeProperty at the end of construction to avoid triggering duplicate work
    // that is handled manually above.
    this.initializeCountingObjectLinks();
  }

  /**
   * Sets up a link on the addendProperty to add or remove counting objects from the addendObjects array.
   * @param addendProperty
   * @param addendObjects
   * @param inactiveObjects
   */
  private setupAddendPropertyLink( addendProperty: TReadOnlyProperty<number>, addendObjects: ObservableArray<CountingObject>, inactiveObjects: ObservableArray<CountingObject> ): void {
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
}

numberPairs.register( 'LevelCountingObjectsDelegate', LevelCountingObjectsDelegate );
