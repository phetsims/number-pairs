// Copyright 2025, University of Colorado Boulder
/**
 * Abstract base class for all screens in the Number Pairs sim.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Property from '../../../../axon/js/Property.js';
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
import Animation from '../../../../twixt/js/Animation.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import CountingObject, { AddendType } from './CountingObject.js';
import { CountingObjectsManager } from './CountingObjectsManager.js';
import { AnimationTarget } from './NumberPairsModel.js';
import RepresentationType from './RepresentationType.js';
import TGenericNumberPairsModel from './TGenericNumberPairsModel.js';

type SelfOptions = {
  initialRepresentationType: RepresentationType;
  representationTypeValidValues: RepresentationType[];
};

export type AbstractNumberPairsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default abstract class AbstractNumberPairsModel implements TGenericNumberPairsModel {

  // The colors that code each addend and the total in the sim change based on the chosen counting representation.
  public readonly totalColorProperty: TReadOnlyProperty<Color>;
  public readonly leftAddendColorProperty: TReadOnlyProperty<Color>;
  public readonly rightAddendColorProperty: TReadOnlyProperty<Color>;

  public countingObjectsAnimation: Animation | null = null;

  // The counting representation type determines the colors of the total and addends,
  // as well as the image assets used to represent each counting object.
  // The BEADS and NUMBER_LINE representations additionally support different user interactions.
  public readonly representationTypeProperty: Property<RepresentationType>;

  protected constructor(
    public readonly totalProperty: TReadOnlyProperty<number>,
    public readonly leftAddendProperty: TReadOnlyProperty<number>,
    public readonly rightAddendProperty: TReadOnlyProperty<number>,
    public readonly leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>,
    public readonly rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>,
    public readonly totalVisibleProperty: TReadOnlyProperty<boolean>,
    public readonly leftAddendVisibleProperty: TReadOnlyProperty<boolean>,
    public readonly rightAddendVisibleProperty: TReadOnlyProperty<boolean>,
    public readonly countingObjects: CountingObject[],
    providedOptions: AbstractNumberPairsModelOptions
  ) {
    const options = optionize<AbstractNumberPairsModelOptions, SelfOptions, PhetioObjectOptions>()( {}, providedOptions );

    this.representationTypeProperty = new EnumerationProperty( options.initialRepresentationType, {
      validValues: options.representationTypeValidValues,
      tandem: options.tandem.createTandem( 'representationTypeProperty' ),
      phetioFeatured: true
    } );

    this.totalColorProperty = new DynamicProperty( this.representationTypeProperty, {
      derive: 'totalColorProperty'
    } );
    this.leftAddendColorProperty = new DynamicProperty( this.representationTypeProperty, {
      derive: 'leftAddendColorProperty'
    } );
    this.rightAddendColorProperty = new DynamicProperty( this.representationTypeProperty, {
      derive: 'rightAddendColorProperty'
    } );
  }

  /**
   * Initializes the links that update the addend type of each counting object based on its current addend type.
   *
   * @param changingScenesProperty - Optional property that indicates if scenes are changing. Used in NumberPairsModel
   * but not in LevelCountingObjectsDelegate.
   */
  protected initializeCountingObjectLinks( changingScenesProperty?: TReadOnlyProperty<boolean> ): void {
    this.countingObjects.forEach( countingObject => {
      this.createCountingObjectAddendTypeLinks( countingObject, changingScenesProperty );
    } );
  }

  /**
   * Returns animation targets based on the provided position Properties and target positions.
   * @param positionProperties
   * @param targetPositions
   */
  private static getAnimationTargets( positionProperties: Property<Vector2>[], targetPositions: Vector2[] ): AnimationTarget[] {
    return positionProperties.map( ( positionProperty, index ) => {
      return {
        property: positionProperty,
        to: targetPositions[ index ]
      };
    } );
  }

  /**
   * Set the location positions of the counting objects based on the provided left and right location positions. The
   * left counting objects and right counting objects should be split by addend type.
   * @param leftLocationPositions
   * @param rightLocationPositions
   * @param leftAddendObjects - prevent incorrect intermediary values by using the same counting objects as the call site.
   * @param rightAddendObjects
   * @param animate - whether to animate the movement of the counting objects. If we are not animating the movement
   *  we are fading the counting objects in and out to their new spots to prevent a jarring UX.
   *
   * TODO: Seperate into two different functions based on if/else logic. https://github.com/phetsims/number-pairs/issues/240
   */
  public setLocationPositions( leftAddendObjects: CountingObject[], rightAddendObjects: CountingObject[], leftLocationPositions: Vector2[], rightLocationPositions: Vector2[], animate: boolean ): void {

    affirm( leftAddendObjects.length === leftLocationPositions.length, 'leftAddendObjects should be the same length as the rightLocationPositions.' );
    affirm( rightAddendObjects.length === rightLocationPositions.length, 'rightAddendObjects should be the same length as the leftLocationPositions.' );

    if ( animate ) {
      const animationTargets = [ ...AbstractNumberPairsModel.getAnimationTargets( leftAddendObjects.map( countingObject => countingObject.locationPositionProperty ), leftLocationPositions ),
        ...AbstractNumberPairsModel.getAnimationTargets( rightAddendObjects.map( countingObject => countingObject.locationPositionProperty ), rightLocationPositions ) ];
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
      const fadeOutTargets = this.countingObjects.map( countingObject => {
        return {
          property: countingObject.locationOpacityProperty,
          to: 0
        };
      } );
      const fadeInTargets = this.countingObjects.map( countingObject => {
        return {
          property: countingObject.locationOpacityProperty,
          to: 1
        };
      } );

      this.countingObjectsAnimation?.stop();
      this.countingObjectsAnimation = new Animation( {
        duration: 0.04,
        targets: fadeOutTargets
      } );

      // Save a copy of the counting objects observable array so that we do not iterate over a different array
      // once the animation has ended.
      const copyOfLeftAddendObjects = leftAddendObjects.slice();
      const copyOfRightAddendObjects = rightAddendObjects.slice();
      this.countingObjectsAnimation.endedEmitter.addListener( () => {
        copyOfLeftAddendObjects.forEach( ( countingObject, index ) => {
          countingObject.locationPositionProperty.value = leftLocationPositions[ index ];
        } );
        copyOfRightAddendObjects.forEach( ( countingObject, index ) => {
          countingObject.locationPositionProperty.value = rightLocationPositions[ index ];
        } );
      } );

      // If the fade out animation is manually stopped we do not want to start the fade in animation, instead we want
      // to immediately set the target Properties to the fade in target "to" values.
      this.countingObjectsAnimation.stopEmitter.addListener( () => {
        fadeInTargets.forEach( target => {
          target.property.value = target.to;
        } );
        this.countingObjectsAnimation = null;
      } );

      // If the fade out animation is finished we want to start the fade in animation.
      this.countingObjectsAnimation.finishEmitter.addListener( () => {
        this.countingObjectsAnimation = new Animation( {
          duration: 0.3,
          targets: fadeInTargets
        } );
        this.countingObjectsAnimation.endedEmitter.addListener( () => {
          this.countingObjectsAnimation = null;
        } );
        this.countingObjectsAnimation.start();
      } );

      this.countingObjectsAnimation.start();
    }
  }

  /**
   * Set the attribute positions of the counting objects based on the provided left and right positions.
   * @param leftObjects - prevent incorrect intermediary values by using the same counting objects as the call site.
   * @param rightObjects
   * @param leftAttributePositions
   * @param rightAttributePositions
   * @param animate - whether to animate the movement of the counting objects.
   *
   * TODO: Seperate into two different functions based on if/else logic. https://github.com/phetsims/number-pairs/issues/240
   */
  public setAttributePositions( leftObjects: CountingObject[], rightObjects: CountingObject[], leftAttributePositions: Vector2[], rightAttributePositions: Vector2[], animate = false ): void {
    affirm( leftObjects.length === leftAttributePositions.length,
      `leftAddendObjects length: ${leftObjects.length}  should be the same leftAttributePositions length: ${leftAttributePositions.length} and the left value is: ${this.leftAddendProperty.value}.` );
    affirm( rightObjects.length === rightAttributePositions.length,
      `rightAddendObjects length: ${rightObjects.length}  should be the same rightAttributePositions length: ${rightAttributePositions.length} and the right value is: ${this.rightAddendProperty.value}.` );

    if ( animate ) {
      const animationTargets = [ ...AbstractNumberPairsModel.getAnimationTargets( leftObjects.map( countingObject => countingObject.attributePositionProperty ), leftAttributePositions ),
        ...AbstractNumberPairsModel.getAnimationTargets( rightObjects.map( countingObject => countingObject.attributePositionProperty ), rightAttributePositions ) ];

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
      leftObjects.forEach( ( countingObject, index ) => {
        countingObject.attributePositionProperty.value = leftAttributePositions[ index ];
      } );
      rightObjects.forEach( ( countingObject, index ) => {
        countingObject.attributePositionProperty.value = rightAttributePositions[ index ];
      } );
    }
  }

  /**
   * Organizes the counting objects into ten frames. The counting objects will be arranged in two ten frames one
   * on the left side of the counting area and one on the right side of the counting area.
   * @param leftObjects
   * @param rightObjects
   * @param tenFrameBounds
   * @param positionType
   */
  public organizeIntoSplitTenFrame( tenFrameBounds: Bounds2[], leftObjects: CountingObject[], rightObjects: CountingObject[], positionType: 'attribute' | 'location' ): void {
    const leftGridCoordinates = CountingObjectsManager.getGridCoordinates( tenFrameBounds[ 0 ], 35, 35 ).slice( 0, leftObjects.length );
    const rightGridCoordinates = CountingObjectsManager.getGridCoordinates( tenFrameBounds[ 1 ], 35, 35 ).slice( 0, rightObjects.length );

    if ( positionType === 'attribute' ) {
      this.setAttributePositions( leftObjects, rightObjects, leftGridCoordinates, rightGridCoordinates, true );
    }
    else {
      this.setLocationPositions( leftObjects, rightObjects, leftGridCoordinates, rightGridCoordinates, true );
    }
  }

  /**
   * Organizes the counting objects into ten frames centered in the provided bounds.
   * @param leftObjects
   * @param rightObjects
   * @param tenFrameBounds
   * @param positionType
   */
  public organizeIntoSingleTenFrame( tenFrameBounds: Bounds2, leftObjects: CountingObject[], rightObjects: CountingObject[], positionType: 'attribute' | 'location' ): void {
    const gridCoordinates = CountingObjectsManager.getGridCoordinates( tenFrameBounds, 0, 0 );
    const leftGridCoordinates = gridCoordinates.slice( 0, leftObjects.length );
    const rightGridCoordinates = gridCoordinates.slice( leftObjects.length, leftObjects.length + rightObjects.length );

    if ( positionType === 'attribute' ) {
      this.setAttributePositions( leftObjects, rightObjects, leftGridCoordinates, rightGridCoordinates, true );
    }
    else {
      this.setLocationPositions( leftObjects, rightObjects, leftGridCoordinates, rightGridCoordinates, true );
    }
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
   * Creates a link that updates the addend type of the counting object based on the changed addend type.
   * @param countingObject
   * @param changingScenesProperty - Optional property that indicates if scenes are changing. Used in NumberPairsModel
   * but not in LevelCountingObjectsDelegate.
   */
  private createCountingObjectAddendTypeLinks( countingObject: CountingObject, changingScenesProperty?: TReadOnlyProperty<boolean> ): void {
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
      if ( isResettingAllProperty.value || ( changingScenesProperty && changingScenesProperty.value ) || !locationRepresentationTypes.includes( this.representationTypeProperty.value ) ) {
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
   * Deselects all kittens.
   */
  public deselectAllKittens(): void {
    this.countingObjects.forEach( countingObject => {
      countingObject.kittenSelectedProperty.value = false;
    } );
  }

  public reset(): void {
    // Stop any animation that may be in progress.
    this.countingObjectsAnimation?.stop();

    this.countingObjects.forEach( countingObject => countingObject.reset() );

    this.representationTypeProperty.reset();
  }
}

numberPairs.register( 'AbstractNumberPairsModel', AbstractNumberPairsModel );