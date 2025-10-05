// Copyright 2024-2025, University of Colorado Boulder
/**
 * NumberPairsModel is the base model for the Number Pairs simulation. It contains the properties that control the
 * addends, total, and counting objects in the sim. The model also contains properties that control the visibility of
 * the addends and total, as well as the representation type of the counting objects.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import GroupSelectModel from '../../../../scenery-phet/js/accessibility/group-sort/model/GroupSelectModel.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import Color from '../../../../scenery/js/util/Color.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Animation from '../../../../twixt/js/Animation.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import BeadManager from './BeadManager.js';
import CountingObject, { AddendType } from './CountingObject.js';
import { CountingObjectsManager } from './CountingObjectsManager.js';
import { NumberPairsUtils } from './NumberPairsUtils.js';
import RepresentationType from './RepresentationType.js';
import TNumberPairsModel from './TNumberPairsModel.js';

export type AnimationTarget = {
  property: Property<Vector2>;
  to: Vector2;
};
type SelfOptions = {
  initialRepresentationType: RepresentationType;
  representationTypeValidValues: RepresentationType[];
  numberOfCountingObjects: number;
  isSumScreen: boolean;
};

export type NumberPairsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export type PositionPropertyType = 'attribute' | 'location';
export type BeadXPositionsTypes = {
  leftAddendXPositions: number[];
  rightAddendXPositions: number[];
};

export default class NumberPairsModel implements TNumberPairsModel {

  public readonly beadManager: BeadManager;

  // The counting representation type determines the colors of the total and addends,
  // as well as the image assets used to represent each counting object.
  // The CUBES and NUMBER_LINE representations additionally support different user interactions.
  public readonly representationTypeProperty: Property<RepresentationType>;

  // The colors that code each addend and the total in the sim change based on the chosen counting representation.
  public readonly totalColorProperty: TReadOnlyProperty<Color>;
  public readonly leftAddendColorProperty: TReadOnlyProperty<Color>;
  public readonly rightAddendColorProperty: TReadOnlyProperty<Color>;

  public readonly leftAddendVisibleProperty: BooleanProperty;
  public readonly rightAddendVisibleProperty: BooleanProperty;
  public readonly totalVisibleProperty: BooleanProperty;

  public readonly numberLineSliderEnabledRangeProperty: Property<Range>;

  // The following Properties control the visibility of decorators on the number line.
  public readonly numberLineAddendValuesVisibleProperty: Property<boolean>;
  public readonly tickValuesVisibleProperty: Property<boolean>;
  public readonly totalJumpVisibleProperty: Property<boolean>;
  public readonly numberLineCountFromZeroProperty: Property<boolean>;

  public countingObjectsAnimation: Animation | null = null;

  public readonly groupSelectLocationObjectsModel: GroupSelectModel<CountingObject>;
  public readonly groupSelectBeadsModel: GroupSelectModel<CountingObject>;

  // These are convenience Properties for listeners that are concerned about intermediate values between the arrays
  // and addend/total value Properties.
  public readonly leftAddendCountingObjectsLengthProperty: TReadOnlyProperty<number>;
  public readonly rightAddendCountingObjectsLengthProperty: TReadOnlyProperty<number>;

  protected constructor(
    // The totalProperty is derived from the left and right addend numbers.
    // In decomposition models (Intro, Ten, and Twenty screens) it is set by the selected scene.
    public readonly totalProperty: TReadOnlyProperty<number>,
    public readonly leftAddendProperty: PhetioProperty<number>,
    public readonly rightAddendProperty: TReadOnlyProperty<number>,
    public readonly leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>,
    public readonly rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>,
    public readonly countingObjects: CountingObject[],
    public readonly changingScenesProperty: Property<boolean>,
    providedOptions: NumberPairsModelOptions ) {

    const options = optionize<NumberPairsModelOptions, SelfOptions, PhetioObjectOptions>()( {}, providedOptions );
    this.beadManager = new BeadManager( leftAddendCountingObjectsProperty, rightAddendCountingObjectsProperty, this.countingObjects );
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

    // Define Visible Properties
    const visiblePropertiesTandem = options.tandem.createTandem( 'visibleProperties' );

    // As of this writing the leftAddendVisibleProperty and rightAddendVisibleProperty are only used in the
    // location representations. Every screen with a location representation at least has the RepresentationType.ONE_CARDS
    this.leftAddendVisibleProperty = new BooleanProperty( true, {
      tandem: options.representationTypeValidValues.includes( RepresentationType.ONE_CARDS ) ?
              visiblePropertiesTandem.createTandem( 'leftAddendVisibleProperty' ) : Tandem.OPT_OUT,
      phetioFeatured: true
    } );
    this.rightAddendVisibleProperty = new BooleanProperty( true, {
      tandem: options.representationTypeValidValues.includes( RepresentationType.ONE_CARDS ) ?
              visiblePropertiesTandem.createTandem( 'rightAddendVisibleProperty' ) : Tandem.OPT_OUT,
      phetioFeatured: true
    } );
    this.totalVisibleProperty = new BooleanProperty( !options.isSumScreen, {
      tandem: visiblePropertiesTandem.createTandem( 'totalVisibleProperty' ),
      phetioFeatured: true
    } );

    this.numberLineAddendValuesVisibleProperty = new BooleanProperty( true, {
      tandem: options.representationTypeValidValues.includes( RepresentationType.NUMBER_LINE ) ?
              visiblePropertiesTandem.createTandem( 'numberLineAddendValuesVisibleProperty' ) : Tandem.OPT_OUT,
      phetioFeatured: true
    } );
    this.tickValuesVisibleProperty = new BooleanProperty( true, {
      tandem: options.representationTypeValidValues.includes( RepresentationType.NUMBER_LINE ) ?
              visiblePropertiesTandem.createTandem( 'tickValuesVisibleProperty' ) : Tandem.OPT_OUT,
      phetioFeatured: true
    } );
    this.totalJumpVisibleProperty = new BooleanProperty( true, {
      tandem: options.representationTypeValidValues.includes( RepresentationType.NUMBER_LINE ) ?
              visiblePropertiesTandem.createTandem( 'totalJumpVisibleProperty' ) : Tandem.OPT_OUT,
      phetioFeatured: true
    } );
    this.numberLineCountFromZeroProperty = new BooleanProperty( false, {
      phetioDocumentation: 'This Property is only applicable in number line representations and controls the toggle under the Counting Area.' +
                           'When false, the toggle is to the left and represents a Counting On strategy.' +
                           'When true, this toggle is to the right and represents a Counting from Zero strategy.',
      tandem: options.representationTypeValidValues.includes( RepresentationType.NUMBER_LINE ) ?
              options.tandem.createTandem( 'numberLineCountFromZeroProperty' ) : Tandem.OPT_OUT,
      phetioFeatured: true
    } );

    // The range will update after all addends have stabilized their values during construction.
    this.numberLineSliderEnabledRangeProperty = new Property(
      new Range( NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.min, options.numberOfCountingObjects ), {
        hasListenerOrderDependencies: true,
        phetioValueType: Range.RangeIO,
        phetioReadOnly: true,
        tandem: options.representationTypeValidValues.includes( RepresentationType.NUMBER_LINE ) ?
                options.tandem.createTandem( 'numberLineSliderEnabledRangeProperty' ) : Tandem.OPT_OUT
      } );

    this.groupSelectLocationObjectsModel = new GroupSelectModel( {
      phetioMouseSortCueInstrumented: false,
      getGroupItemValue: ( countingObject: CountingObject ) => {
        affirm( countingObject.addendTypeProperty.value !== AddendType.INACTIVE, 'Inactive counting objects should not be sorted.' );
        return countingObject.addendTypeProperty.value === AddendType.LEFT ? 0 : 1;
      },
      tandem: options.tandem.createTandem( 'groupSelectLocationObjectsModel' )
    } );
    this.groupSelectBeadsModel = new GroupSelectModel( {
      phetioMouseSortCueInstrumented: false,
      getGroupItemValue: ( countingObject: CountingObject ) => {
        affirm( countingObject.addendTypeProperty.value !== AddendType.INACTIVE, 'Inactive counting objects should not be sorted.' );
        return countingObject.addendTypeProperty.value === AddendType.LEFT ? 0 : 1;
      },
      tandem: options.tandem.createTandem( 'groupSelectBeadsModel' )
    } );

    this.leftAddendCountingObjectsLengthProperty = new DynamicProperty( this.leftAddendCountingObjectsProperty, {
      hasListenerOrderDependencies: true,
      derive: 'lengthProperty'
    } );
    this.rightAddendCountingObjectsLengthProperty = new DynamicProperty( this.rightAddendCountingObjectsProperty, {
      hasListenerOrderDependencies: true,
      derive: 'lengthProperty'
    } );

    this.representationTypeProperty.link( representation => {
      const locationRepresentations = [ RepresentationType.ONE_CARDS, RepresentationType.APPLES, RepresentationType.SOCCER_BALLS, RepresentationType.BUTTERFLIES ];
      if ( !locationRepresentations.includes( representation ) ) {
        this.leftAddendVisibleProperty.value = this.leftAddendVisibleProperty.value && this.rightAddendVisibleProperty.value;
        this.rightAddendVisibleProperty.value = this.rightAddendVisibleProperty.value && this.leftAddendVisibleProperty.value;
      }
    } );
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
      if ( isResettingAllProperty.value || this.changingScenesProperty.value || !locationRepresentationTypes.includes( this.representationTypeProperty.value ) ) {
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
   * Creates a multilink that updates the enabled range of the number line slider based on the left and right addend numbers.
   */
  protected createNumberLineEnabledRangeLinks(): void {

    // We do not want to use the total in case the left or right addend numbers have not fully updated. This may
    // change the range multiple times in the course of a firing cycle, but we know the rightAddend value gets updated
    // last, therefore we can feel confident that the left addend value will at least not be affected by the range change.
    Multilink.multilink( [ this.leftAddendProperty, this.rightAddendProperty ], ( leftAddend, rightAddend ) => {
      this.numberLineSliderEnabledRangeProperty.value = new Range( NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.min, leftAddend + rightAddend );
    } );
  }

  /**
   * Set the left addend to the right addend value and update positions as is desired.
   */
  public swapAddends(): void {
    this.countingObjectsAnimation?.stop();

    // Due to observable array turmoil during swap hide all location counting objects that are not part of the
    // original addend arrays. The opacity value will be further handled in animations triggered in this function.
    this.countingObjects.filter( countingObject => countingObject.addendTypeProperty.value !== AddendType.INACTIVE ).forEach( countingObject => {
      countingObject.locationOpacityProperty.value = 0;
    } );

    const leftAddendObjects = this.leftAddendCountingObjectsProperty.value;
    const rightAddendObjects = this.rightAddendCountingObjectsProperty.value;

    // Save old positions.
    const leftAttributePositions = leftAddendObjects.map( countingObject => countingObject.attributePositionProperty.value );
    const rightAttributePositions = rightAddendObjects.map( countingObject => countingObject.attributePositionProperty.value );
    const leftLocationPositions = leftAddendObjects.map( countingObject => countingObject.locationPositionProperty.value );
    const rightLocationPositions = rightAddendObjects.map( countingObject => countingObject.locationPositionProperty.value );

    let leftBeadXPositions: number[] = [];
    let rightBeadXPositions: number[] = [];
    if ( this.representationTypeProperty.validValues?.includes( RepresentationType.BEADS ) ) {
      leftBeadXPositions = leftAddendObjects.map( countingObject => countingObject.beadXPositionProperty.value );
      rightBeadXPositions = rightAddendObjects.map( countingObject => countingObject.beadXPositionProperty.value );
    }

    // Swap the addend values. Listeners handle the rest (observable arrays, addend types, etc).
    this.leftAddendProperty.value = this.rightAddendProperty.value;
    affirm( leftAddendObjects.length === this.leftAddendProperty.value,
      `We have swapped addends and leftAddendObjects.length (${leftAddendObjects.length}) should equal leftAddendProperty.value (${this.leftAddendProperty.value})` );
    affirm( rightAddendObjects.length === this.rightAddendProperty.value,
      `We have swapped addends and leftAddendObjects.length (${rightAddendObjects.length}) should equal leftAddendProperty.value (${this.rightAddendProperty.value})` );

    // Make a copy of the counting object observable arrays so that each representation is working with a consistent
    // set of counting objects. Otherwise, changes may occur to the observable arrays during animation that other
    // representations do not need to be tracking.
    const copyOfLeftAddendObjects = leftAddendObjects.getArrayCopy();
    const copyOfRightAddendObjects = rightAddendObjects.getArrayCopy();

    // All attribute counting objects should appear to not have moved, and every object's color was simply swapped.
    // This is not how the model handles movement between addends so we must do that artificially here.
    // The last two arguments are flip-flopped. rightAttributePositions is assigned to leftAttributePositions in the
    // function and vice versa.
    this.setAttributePositions( copyOfLeftAddendObjects, copyOfRightAddendObjects, rightAttributePositions, leftAttributePositions );

    // All location counting objects should be a mirrored translation across the counting area of their previous position.
    const newRightLocationPositions = leftLocationPositions.map( position =>
      NumberPairsUtils.mirrorPositionAcrossCountingArea( position, 1 ) );
    const newLeftLocationPositions = rightLocationPositions.map( position =>
      NumberPairsUtils.mirrorPositionAcrossCountingArea( position, -1 ) );
    this.setLocationPositions( copyOfLeftAddendObjects, copyOfRightAddendObjects, newLeftLocationPositions, newRightLocationPositions );

    if ( this.representationTypeProperty.validValues?.includes( RepresentationType.BEADS ) ) {

      // Bead positions should be a mirrored translation across the separator.
      const previousSeparatorPosition = BeadManager.calculateBeadSeparatorXPosition( this.rightAddendProperty.value );
      const updatedSeparatorPosition = BeadManager.calculateBeadSeparatorXPosition( this.leftAddendProperty.value );
      const distanceBetweenSeparators = updatedSeparatorPosition - previousSeparatorPosition;
      const newLeftBeadXPositions = rightBeadXPositions.map( x => Math.max( x - Math.abs( x - previousSeparatorPosition ) * 2 + distanceBetweenSeparators, BeadManager.LEFTMOST_BEAD_X ) );
      const newRightBeadXPositions = leftBeadXPositions.map( x => Math.min( x + Math.abs( x - previousSeparatorPosition ) * 2 + distanceBetweenSeparators, BeadManager.RIGHTMOST_BEAD_X ) );

      // We can confidently shift overlapping beads to the right if we are on the left, because any overlaps
      // should be on the left most edge of the bead boundary from the above Math.max calculation.
      // Same with the right side, but in the opposite direction.
      this.beadManager.setBeadXPositions( copyOfLeftAddendObjects, copyOfRightAddendObjects,
        this.beadManager.shiftOverlappingBeadPositions( newLeftBeadXPositions, true ),
        this.beadManager.shiftOverlappingBeadPositions( newRightBeadXPositions, false ) );
    }

    affirm( this.leftAddendCountingObjectsProperty.value.length === this.leftAddendProperty.value, 'Addend array length and value should match' );
    affirm( this.rightAddendCountingObjectsProperty.value.length === this.rightAddendProperty.value, 'Addend array length and value should match' );
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
   * Set the location positions of the counting objects based on the provided left and right location positions.
   * @param leftLocationPositions
   * @param rightLocationPositions
   * @param leftAddendObjects - prevent incorrect intermediary values by using the same counting objects as the call site.
   * @param rightAddendObjects
   * @param animate - whether to animate the movement of the counting objects. If we are not animating the movement
   *  we are fading the counting objects in and out to their new spots to prevent a jarring UX.
   */
  public setLocationPositions( leftAddendObjects: CountingObject[], rightAddendObjects: CountingObject[], leftLocationPositions: Vector2[], rightLocationPositions: Vector2[], animate = false ): void {

    affirm( leftAddendObjects.length === leftLocationPositions.length, 'leftAddendObjects should be the same length as the rightLocationPositions.' );
    affirm( rightAddendObjects.length === rightLocationPositions.length, 'rightAddendObjects should be the same length as the leftLocationPositions.' );

    if ( animate ) {
      const animationTargets = [ ...this.getAnimationTargets( leftAddendObjects.map( countingObject => countingObject.locationPositionProperty ), leftLocationPositions ),
        ...this.getAnimationTargets( rightAddendObjects.map( countingObject => countingObject.locationPositionProperty ), rightLocationPositions ) ];
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
   * Snap the beads to their organized positions on the wire based on the addend values. When organized the beads are
   * arranged in groups of 5 with a separator between the two addends.
   */
  public organizeInGroupsOfFive(): void {
    const leftAddend = this.leftAddendProperty.value;
    const leftAddendBeads = this.leftAddendCountingObjectsProperty.value;
    const rightAddendBeads = this.rightAddendCountingObjectsProperty.value;
    const distanceFromSeparator = 1.5;

    // Beads should be lined up on the wire in groups of 5, with the remainder closest to the bead separator.
    const beadSeparatorXPosition = BeadManager.calculateBeadSeparatorXPosition( leftAddend );
    const leftAddendRemainder = leftAddendBeads.length % 5;

    const leftXPositions = leftAddendBeads.map( ( bead, i ) => {

      // If the remainder is zero, no beads need to be in a non-five group next to the separator
      const numerator = leftAddendRemainder === 0 ? i - 5 : i - leftAddendRemainder;

      // Find which group the bead belongs to
      const groupingIndex = Math.floor( numerator / 5 ) + 1;
      return beadSeparatorXPosition - groupingIndex - i - distanceFromSeparator;
    } );

    const rightAddendRemainder = rightAddendBeads.length % 5;
    const rightXPositions = rightAddendBeads.map( ( bead, i ) => {
      const numerator = rightAddendRemainder === 0 ? i - 5 : i - rightAddendRemainder;
      const groupingIndex = Math.floor( numerator / 5 ) + 1;
      return groupingIndex + i + beadSeparatorXPosition + distanceFromSeparator;
    } );

    this.beadManager.setBeadXPositions( leftAddendBeads, rightAddendBeads, leftXPositions, rightXPositions );
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
      const totalColumnCount = CountingObjectsManager.getColumnCountForObjectTotal( leftAddendObjects.length + rightAddendObjects.length );
      const gridCoordinates = CountingObjectsManager.getGridCoordinates( tenFrameBounds[ 0 ], 0, 0, totalColumnCount );
      leftGridCoordinates = gridCoordinates.slice( 0, leftAddendObjects.length );
      rightGridCoordinates = gridCoordinates.slice( leftAddendObjects.length, leftAddendObjects.length + rightAddendObjects.length );
    }
    else {
      const leftColumnCount = CountingObjectsManager.getColumnCountForObjectTotal( leftAddendObjects.length );
      const rightColumnCount = CountingObjectsManager.getColumnCountForObjectTotal( rightAddendObjects.length );
      leftGridCoordinates = CountingObjectsManager.getGridCoordinates( tenFrameBounds[ 0 ], 35, 35, leftColumnCount ).slice( 0, leftAddendObjects.length );
      rightGridCoordinates = CountingObjectsManager.getGridCoordinates( tenFrameBounds[ 1 ], 35, 35, rightColumnCount ).slice( 0, rightAddendObjects.length );
    }
    if ( positionType === 'attribute' ) {
      this.setAttributePositions( leftAddendObjects, rightAddendObjects, leftGridCoordinates, rightGridCoordinates, true );
    }
    else {
      this.setLocationPositions( leftAddendObjects, rightAddendObjects, leftGridCoordinates, rightGridCoordinates, true );
    }


    affirm( this.leftAddendCountingObjectsProperty.value.length === this.leftAddendProperty.value, 'Addend array length and value should match' );
    affirm( this.rightAddendCountingObjectsProperty.value.length === this.rightAddendProperty.value, 'Addend array length and value should match' );
  }

  public getCountingObjectsSortedByLocationPosition(): CountingObject[] {
    return this.countingObjects.filter( countingObject => countingObject.addendTypeProperty.value !== AddendType.INACTIVE )
      .slice().sort( ( a, b ) => a.locationPositionProperty.value.x - b.locationPositionProperty.value.x + a.locationPositionProperty.value.y - b.locationPositionProperty.value.y );
  }

  public reset(): void {

    // Stop any animation that may be in progress.
    this.countingObjectsAnimation?.stop();

    this.countingObjects.forEach( countingObject => countingObject.reset() );

    this.representationTypeProperty.reset();
    this.leftAddendVisibleProperty.reset();
    this.rightAddendVisibleProperty.reset();
    this.totalVisibleProperty.reset();
    this.numberLineAddendValuesVisibleProperty.reset();
    this.tickValuesVisibleProperty.reset();
    this.totalJumpVisibleProperty.reset();
    this.numberLineCountFromZeroProperty.reset();
    this.numberLineSliderEnabledRangeProperty.reset();
    this.changingScenesProperty.reset();
    this.groupSelectBeadsModel.reset();
    this.groupSelectLocationObjectsModel.reset();

    affirm( this.leftAddendCountingObjectsProperty.value.length === this.leftAddendProperty.value, 'Addend array length and value should match' );
    affirm( this.rightAddendCountingObjectsProperty.value.length === this.rightAddendProperty.value, 'Addend array length and value should match' );
  }

  public deselectAllKittens(): void {
    this.countingObjects.forEach( countingObject => {
      countingObject.kittenSelectedProperty.value = false;
    } );
  }
}

numberPairs.register( 'NumberPairsModel', NumberPairsModel );
