// Copyright 2024-2025, University of Colorado Boulder
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
/**
 * NumberPairsModel is the base model for the Number Pairs simulation. It contains the properties that control the
 * addends, total, and counting objects in the sim. The model also contains properties that control the visibility of
 * the addends and total, as well as the representation type of the counting objects.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */
import TModel from '../../../../joist/js/TModel.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import GroupSelectModel from '../../../../scenery-phet/js/accessibility/group-sort/model/GroupSelectModel.js';
import { Color } from '../../../../scenery/js/imports.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import Animation from '../../../../twixt/js/Animation.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import CountingObject, { AddendType, KITTEN_PANEL_WIDTH } from './CountingObject.js';
import RepresentationType from './RepresentationType.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';

type AnimationTarget = {
  property: Property<Vector2>;
  to: Vector2;
};
type leftAddendLabelPlacement = 'handle' | 'arrow';
type SelfOptions = {
  initialRepresentationType: RepresentationType;
  representationTypeValidValues: RepresentationType[];
};

export type NumberPairsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export type PositionPropertyType = 'attribute' | 'location';
const DROP_ZONE_MARGIN = KITTEN_PANEL_WIDTH / 1.75;

export default class NumberPairsModel implements TModel {

  public readonly countingObjects: CountingObject[] = [];

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
  public readonly showNumberLineAddendValuesProperty: Property<boolean>;
  public readonly showTickValuesProperty: Property<boolean>;
  public readonly showTotalJumpProperty: Property<boolean>;
  public readonly leftAddendLabelPlacementProperty: Property<leftAddendLabelPlacement>;

  private dropAnimation: Animation | null = null;
  private attributeAnimation: Animation | null = null;
  public locationAnimation: Animation | null = null;
  public fadeOutAnimation: Animation | null = null;
  private fadeInAnimation: Animation | null = null;

  public readonly groupSelectLocationObjectsModel: GroupSelectModel<CountingObject>;
  public readonly groupSelectBeadsModel: GroupSelectModel<CountingObject>;

  // These are convenience Properties for listeners that are concerned about intermediate values between the arrays
  // and addend/total value Properties.
  public readonly leftAddendCountingObjectsLengthProperty: TReadOnlyProperty<number>;
  public readonly rightAddendCountingObjectsLengthProperty: TReadOnlyProperty<number>;

  protected changingScenes = false;

  protected constructor(
    // The totalProperty is derived from the left and right addend numbers.
    // In decomposition models (Intro, Ten, and Twenty screens) it is set by the selected scene.
    public readonly totalProperty: TReadOnlyProperty<number>,
    public readonly leftAddendProperty: PhetioProperty<number>,
    public readonly rightAddendProperty: TReadOnlyProperty<number>,
    public readonly leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>,
    public readonly rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>,
    public readonly beadXPositionsProperty: PhetioProperty<number[]>,
    private readonly numberOfCountingObjects: number,
    providedOptions: NumberPairsModelOptions ) {

    const options = providedOptions;
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

    this.leftAddendVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'leftAddendVisibleProperty' )
    } );
    this.rightAddendVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'rightAddendVisibleProperty' )
    } );
    this.totalVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'totalVisibleProperty' )
    } );

    this.showNumberLineAddendValuesProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'showNumberLineAddendValuesProperty' ),
      phetioFeatured: true
    } );
    this.showTickValuesProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'showTickValuesProperty' ),
      phetioFeatured: true
    } );
    this.showTotalJumpProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'showTotalJumpProperty' ),
      phetioFeatured: true
    } );
    this.leftAddendLabelPlacementProperty = new Property<leftAddendLabelPlacement>( 'handle', {
      phetioValueType: StringIO,
      tandem: options.tandem.createTandem( 'leftAddendLabelPlacementProperty' )
    } );

    _.times( numberOfCountingObjects, i => {
      const countingObjectID = i + 1;
      const initialBeadXPosition = this.beadXPositionsProperty.value[ i ] || 0;
      this.countingObjects.push( new CountingObject( {
        id: countingObjectID,
        initialBeadXPosition: initialBeadXPosition,
        tandem: options.tandem.createTandem( `CountingObject${countingObjectID}` )
      } ) );
    } );

    // The range will update after all addends have stabilized their values during construction.
    this.numberLineSliderEnabledRangeProperty = new Property(
      new Range( NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.min, numberOfCountingObjects ), {
        hasListenerOrderDependencies: true,
        phetioValueType: Range.RangeIO,
        tandem: options.tandem.createTandem( 'numberLineSliderEnabledRangeProperty' )
      } );

    this.groupSelectLocationObjectsModel = new GroupSelectModel( {
      getGroupItemValue: ( countingObject: CountingObject ) => {
        assert && assert( countingObject.addendTypeProperty.value !== AddendType.INACTIVE, 'Inactive counting objects should not be sorted.' );
        return countingObject.addendTypeProperty.value === AddendType.LEFT ? 0 : 1;
      },
      tandem: options.tandem.createTandem( 'groupSelectLocationObjectsModel' )
    } );
    this.groupSelectBeadsModel = new GroupSelectModel( {
      getGroupItemValue: ( countingObject: CountingObject ) => {
        assert && assert( countingObject.addendTypeProperty.value !== AddendType.INACTIVE, 'Inactive counting objects should not be sorted.' );
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
    leftAddendObjects.addItemAddedListener( countingObject => {
      inactiveCountingObjects.includes( countingObject ) && inactiveCountingObjects.remove( countingObject );
      countingObject.addendTypeProperty.value = AddendType.LEFT;
    } );
    leftAddendObjects.addItemRemovedListener( countingObject => {
      if ( countingObject.traverseInactiveObjects && !inactiveCountingObjects.includes( countingObject ) ) {
        inactiveCountingObjects.unshift( countingObject );
      }
    } );

    rightAddendObjects.addItemAddedListener( countingObject => {
      inactiveCountingObjects.includes( countingObject ) && inactiveCountingObjects.remove( countingObject );
      countingObject.addendTypeProperty.value = AddendType.RIGHT;
    } );
    rightAddendObjects.addItemRemovedListener( countingObject => {
      if ( countingObject.traverseInactiveObjects && !inactiveCountingObjects.includes( countingObject ) ) {
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

      // Update the location of the countingObject when the addendType changes during reset and scene changes.
      if ( isResettingAllProperty.value || this.changingScenes ) {
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

  protected getAvailableGridCoordinates( countingObjects: CountingObject[], addendBounds: Bounds2 ): Vector2[] {
    const countingAreaMargin = NumberPairsConstants.COUNTING_AREA_INNER_MARGIN;
    const gridCoordinates = this.getGridCoordinates( addendBounds, countingAreaMargin, countingAreaMargin, 6 );
    return gridCoordinates.filter( gridCoordinate => countingObjects.every( countingObject =>
      countingObject.locationPositionProperty.value.x !== gridCoordinate.x ||
      countingObject.locationPositionProperty.value.y !== gridCoordinate.y ) );
  }

  private getValidDropPoint( invalidBounds: Bounds2, proposedPoint: Vector2, allowedDirection: 'upLeft' | 'upRight' ): Vector2 {

    if ( invalidBounds.containsPoint( proposedPoint ) ) {
      const closestXEdge = allowedDirection === 'upLeft' ? invalidBounds.minX : invalidBounds.maxX;
      const closestYEdge = invalidBounds.minY;

      if ( Math.abs( closestXEdge - proposedPoint.x ) < Math.abs( closestYEdge - proposedPoint.y ) ) {
        return new Vector2( closestXEdge, proposedPoint.y );
      }
      else {
        return new Vector2( proposedPoint.x, closestYEdge );
      }
    }
    else {
      return proposedPoint;
    }
  }

  private sendToValidDropPoint( countingObject: CountingObject, positionPropertyType: 'attribute' | 'location' ): Vector2 {
    const countingAreaBounds = NumberPairsConstants.COUNTING_AREA_BOUNDS;
    const positionProperty = positionPropertyType === 'attribute' ? countingObject.attributePositionProperty :
                             countingObject.locationPositionProperty;

    const addendVisibleButtonDimension = new Dimension2(
      NumberPairsConstants.RECTANGULAR_PUSH_BUTTON_OPTIONS.size.width + NumberPairsConstants.COUNTING_AREA_INNER_MARGIN + DROP_ZONE_MARGIN,
      NumberPairsConstants.RECTANGULAR_PUSH_BUTTON_OPTIONS.size.height + NumberPairsConstants.COUNTING_AREA_INNER_MARGIN + DROP_ZONE_MARGIN
    );
    const leftAddendVisibleButtonBounds = new Bounds2(
      countingAreaBounds.minX,
      countingAreaBounds.maxY - addendVisibleButtonDimension.height,
      countingAreaBounds.minX + addendVisibleButtonDimension.width,
      countingAreaBounds.maxY );
    const invalidDropBounds = positionPropertyType === 'attribute' ? [ leftAddendVisibleButtonBounds ] :
      [
        leftAddendVisibleButtonBounds,
        leftAddendVisibleButtonBounds.shiftedX( countingAreaBounds.width - addendVisibleButtonDimension.width )
      ];

    let validDropPoint = positionProperty.value;
    invalidDropBounds.forEach( ( bounds, i ) => {

      // The first bounds is on the left side of the counting area
      const direction = i === 0 ? 'upRight' : 'upLeft';
      validDropPoint = this.getValidDropPoint( bounds, validDropPoint, direction );
    } );

    const animation = new Animation( {
      duration: 0.4,
      targets: [ {
        property: positionProperty,
        to: validDropPoint
      } ]
    } );
    animation.start();
    return validDropPoint;
  }


  /**
   * Animates the dropped counting object and any overlapping objects to the closest boundary point of the drop zone.
   * @param droppedCountingObject
   * @param positionPropertyType
   *
   * // TODO: We still need to handle when a point is calculated to be outside of the Counting Area bounds.
   */
  public dropCountingObject( droppedCountingObject: CountingObject, positionPropertyType: 'attribute' | 'location' ): void {

    const countingObjectValidDropPoint = this.sendToValidDropPoint( droppedCountingObject, positionPropertyType );
    const dropZoneBounds = this.getDropZoneBounds( countingObjectValidDropPoint );
    const activeCountingObjects = this.countingObjects.filter( countingObject =>
      countingObject.addendTypeProperty.value !== AddendType.INACTIVE && countingObject !== droppedCountingObject );

    // Find all the active counting objects that are half a panel width away from the dropped counting object.
    const countingObjectsInsideDropZone = activeCountingObjects.filter( countingObject => {
      const positionProperty = positionPropertyType === 'attribute' ?
                               countingObject.attributePositionProperty : countingObject.locationPositionProperty;
      return dropZoneBounds.containsPoint( positionProperty.value );
    } );

    if ( countingObjectsInsideDropZone.length !== 0 ) {

      // Animate the object to the closest boundary point of the drop zone.
      const animationTargets = countingObjectsInsideDropZone.map( countingObject => {
        const positionProperty = positionPropertyType === 'attribute' ?
                                 countingObject.attributePositionProperty : countingObject.locationPositionProperty;
        return {
          property: positionProperty,
          to: dropZoneBounds.closestBoundaryPointTo( positionProperty.value )
        };
      } );
      this.dropAnimation = new Animation( {
        duration: 0.4,
        targets: animationTargets
      } );
      this.dropAnimation.endedEmitter.addListener( () => {
        // TODO: Do I need to dispose?
        this.dropAnimation = null;
      } );
      this.dropAnimation.start();
    }

    assert && assert( this.leftAddendCountingObjectsProperty.value.length === this.leftAddendProperty.value, 'Addend array length and value should match' );
    assert && assert( this.rightAddendCountingObjectsProperty.value.length === this.rightAddendProperty.value, 'Addend array length and value should match' );
  }

  /**
   * Returns the bounds of the drop zone based on the provided drop zone center.
   * @param dropZoneCenter
   */
  private getDropZoneBounds( dropZoneCenter: Vector2 ): Bounds2 {
    return new Bounds2(
      dropZoneCenter.x - DROP_ZONE_MARGIN,
      dropZoneCenter.y - DROP_ZONE_MARGIN,
      dropZoneCenter.x + DROP_ZONE_MARGIN,
      dropZoneCenter.y + DROP_ZONE_MARGIN
    );
  }

  /**
   * Creates a multilink that updates the enabled range of the number line slider based on the left and right addend numbers.
   */
  protected createNumberLineEnabledRangeLinks(): void {

    // TODO: Kind of weird that we're using the twenty number line range min here always... right now both the ten and twenty are 0... but what if that changes?
    Multilink.multilink( [ this.leftAddendProperty, this.rightAddendProperty ], ( leftAddend, rightAddend ) => {
      // We do not want to use the total in case the left or right addend numbers have not fully updated. This may
      // change the range multiple times in the course of a firing cycle, but we know the rightAddend value gets updated
      // last, therefore we can feel confident that the left addend value will at least not be affected by the range change.
      this.numberLineSliderEnabledRangeProperty.value = new Range( NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.min, leftAddend + rightAddend );
    } );
  }

  /**
   * Set the left addend to the right addend value and update positions as is desired.
   */
  public swapAddends(): void {
    const countingAreaWidth = NumberPairsConstants.COUNTING_AREA_BOUNDS.width;
    const leftAddendObjects = this.leftAddendCountingObjectsProperty.value;
    const rightAddendObjects = this.rightAddendCountingObjectsProperty.value;

    // Save old positions.
    const leftAttributePositions = leftAddendObjects.map( countingObject => countingObject.attributePositionProperty.value );
    const rightAttributePositions = rightAddendObjects.map( countingObject => countingObject.attributePositionProperty.value );
    const leftLocationPositions = leftAddendObjects.map( countingObject => countingObject.locationPositionProperty.value );
    const rightLocationPositions = rightAddendObjects.map( countingObject => countingObject.locationPositionProperty.value );
    const leftBeadXPositions = leftAddendObjects.map( countingObject => countingObject.beadXPositionProperty.value );
    const rightBeadXPositions = rightAddendObjects.map( countingObject => countingObject.beadXPositionProperty.value );

    // Swap the addend values. Listeners handle the rest (observable arrays, addend types, etc).
    this.leftAddendProperty.value = this.rightAddendProperty.value;

    // All attribute counting objects should appear to not have moved, and every object's color was simply swapped.
    // This is not how the model handles movement between addends so we must do that artificially here.
    this.setAttributePositions( leftAddendObjects, rightAddendObjects, rightAttributePositions, leftAttributePositions );

    // All location counting objects should be a translation across the counting area of their previous position.
    const xTranslation = countingAreaWidth / 2;
    const newRightLocationPositions = leftLocationPositions.map( position =>
      new Vector2( position.x + xTranslation, position.y ) );
    const newLeftLocationPositions = rightLocationPositions.map( position =>
      new Vector2( position.x - xTranslation, position.y ) );
    this.setLocationPositions( leftAddendObjects, rightAddendObjects, newLeftLocationPositions, newRightLocationPositions );

    // Bead positions should be a translation across the separator.
    const updatedSeparatorPosition = NumberPairsModel.calculateBeadSeparatorXPosition( this.leftAddendProperty.value );
    const rightXTranslation = _.max( rightBeadXPositions )! - ( updatedSeparatorPosition - NumberPairsConstants.BEAD_DISTANCE_FROM_SEPARATOR );
    const leftXTranslation = updatedSeparatorPosition + NumberPairsConstants.BEAD_DISTANCE_FROM_SEPARATOR - _.min( leftBeadXPositions )!;
    const newLeftBeadXPositions = rightBeadXPositions.map( x => x - rightXTranslation );
    const newRightBeadXPositions = leftBeadXPositions.map( x => x + leftXTranslation );
    this.setBeadXPositions( leftAddendObjects, rightAddendObjects, newLeftBeadXPositions, newRightBeadXPositions );

    assert && assert( this.leftAddendCountingObjectsProperty.value.length === this.leftAddendProperty.value, 'Addend array length and value should match' );
    assert && assert( this.rightAddendCountingObjectsProperty.value.length === this.rightAddendProperty.value, 'Addend array length and value should match' );
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

    assert && assert( leftAddendObjects.length === leftLocationPositions.length, 'leftAddendObjects should be the same length as the rightLocationPositions.' );
    assert && assert( rightAddendObjects.length === rightLocationPositions.length, 'rightAddendObjects should be the same length as the leftLocationPositions.' );

    if ( animate ) {
      const animationTargets = [ ...this.getAnimationTargets( leftAddendObjects.map( countingObject => countingObject.locationPositionProperty ), leftLocationPositions ),
                                 ...this.getAnimationTargets( rightAddendObjects.map( countingObject => countingObject.locationPositionProperty ), rightLocationPositions ) ];
      this.locationAnimation?.stop();

      this.locationAnimation = new Animation( {
        duration: 0.4,
        targets: animationTargets
      } );
      this.locationAnimation.endedEmitter.addListener( () => {
        this.locationAnimation = null;
      } );
      this.locationAnimation.start();
    }
    else {
      const fadeOutTargets = [ ...leftAddendObjects, ...rightAddendObjects ].map( countingObject => {
        return {
          property: countingObject.locationOpacityProperty,
          to: 0
        };
      } );
      const fadeInTargets = [ ...leftAddendObjects, ...rightAddendObjects ].map( countingObject => {
        return {
          property: countingObject.locationOpacityProperty,
          to: 1
        };
      } );

      this.fadeOutAnimation?.stop();
      this.fadeInAnimation?.stop();

      this.fadeOutAnimation = new Animation( {
        duration: 0.3,
        targets: fadeOutTargets
      } );
      this.fadeInAnimation = new Animation( {
        duration: 0.3,
        targets: fadeInTargets
      } );
      this.fadeOutAnimation.then( this.fadeInAnimation.start() );

      this.fadeOutAnimation.endedEmitter.addListener( () => {
        leftAddendObjects.forEach( ( countingObject, index ) => {
          countingObject.locationPositionProperty.value = leftLocationPositions[ index ];
        } );
        rightAddendObjects.forEach( ( countingObject, index ) => {
          countingObject.locationPositionProperty.value = rightLocationPositions[ index ];
        } );
        this.fadeOutAnimation = null;
      } );
      this.fadeInAnimation.endedEmitter.addListener( () => {
        this.fadeOutAnimation = null;
      } );

      this.fadeOutAnimation.start();
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
    assert && assert( leftAddendObjects.length === leftAttributePositions.length, 'leftAddendObjects should be the same length as the leftAttributePositions.' );
    assert && assert( rightAddendObjects.length === rightAttributePositions.length, 'rightAddendObjects should be the same length as the rightAttributePositions.' );

    if ( animate ) {
      const animationTargets = [ ...this.getAnimationTargets( leftAddendObjects.map( countingObject => countingObject.attributePositionProperty ), leftAttributePositions ),
        ...this.getAnimationTargets( rightAddendObjects.map( countingObject => countingObject.attributePositionProperty ), rightAttributePositions ) ];

      this.attributeAnimation?.stop();
      this.attributeAnimation = new Animation( {
        duration: 0.4,
        targets: animationTargets
      } );
      this.attributeAnimation.endedEmitter.addListener( () => {
        this.attributeAnimation = null;
      } );
      this.attributeAnimation.start();
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
   * Set the bead x positions of the counting objects based on the provided left and right x positions.
   * @param leftXPositions
   * @param rightXPositions
   * @param leftAddendObjects - prevent incorrect intermediary values by using the same counting objects as the call site.
   * @param rightAddendObjects
   */
  public setBeadXPositions( leftAddendObjects: CountingObject[], rightAddendObjects: CountingObject[], leftXPositions: number[], rightXPositions: number[] ): void {
    leftAddendObjects.forEach( ( countingObject, index ) => {
      countingObject.beadXPositionProperty.value = leftXPositions[ index ];
    } );
    rightAddendObjects.forEach( ( countingObject, index ) => {
      countingObject.beadXPositionProperty.value = rightXPositions[ index ];
    } );
    this.beadXPositionsProperty.value = leftXPositions.concat( rightXPositions );
  }

  /**
   * Position the beads on the wire according to the left and right addend values. This function puts beads
   * in their default starting positions, all grouped together on either the left or right side of the wire depending
   * on their addend type.
   */
  public static getInitialBeadPositions( leftAddendValue: number, rightAddendValue: number ): { leftAddendXPositions: number[]; rightAddendXPositions: number[] } {
    const distanceFromSeparator = NumberPairsConstants.BEAD_DISTANCE_FROM_SEPARATOR;
    const beadSeparatorXPosition = NumberPairsModel.calculateBeadSeparatorXPosition( leftAddendValue );

    return {
      leftAddendXPositions: _.times( leftAddendValue, i => beadSeparatorXPosition - i - distanceFromSeparator ),
      rightAddendXPositions: _.times( rightAddendValue, i => i + beadSeparatorXPosition + distanceFromSeparator )
    };
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
    const beadSeparatorXPosition = NumberPairsModel.calculateBeadSeparatorXPosition( leftAddend );
    const leftAddendRemainder = leftAddendBeads.length % 5;
    const leftXPositions = leftAddendBeads.map( ( bead, i ) => {

      // TODO: I don't like this solution but it's working... There's got to be a better way.
      //  the negative numbers from subtracting the remainder is what gets me here. But I'm having
      //  hard time finding a way to deal with it because of situations where the remainder can also be zero.
      const numerator = leftAddendRemainder === 0 ? i - 5 : i - leftAddendRemainder;
      const groupingIndex = Math.floor( numerator / 5 ) + 1;
      return beadSeparatorXPosition - groupingIndex - i - distanceFromSeparator;
    } );

    const rightAddendRemainder = rightAddendBeads.length % 5;
    const rightXPositions = rightAddendBeads.map( ( bead, i ) => {
      const numerator = rightAddendRemainder === 0 ? i - 5 : i - rightAddendRemainder;
      const groupingIndex = Math.floor( numerator / 5 ) + 1;
      return groupingIndex + i + beadSeparatorXPosition + distanceFromSeparator;
    } );

    this.setBeadXPositions( leftAddendBeads, rightAddendBeads, leftXPositions, rightXPositions );
  }

  /**
   * Organizes the counting objects into a ten frame based on the provided bounds.
   * @param tenFrameBounds
   */
  public organizeIntoTenFrame( tenFrameBounds: Bounds2[] ): void {
    assert && assert( tenFrameBounds.length === 1 || tenFrameBounds.length === 2, 'Ten frame bounds must be an array of length 1 or 2.' );
    const leftAddendObjects = this.leftAddendCountingObjectsProperty.value;
    const rightAddendObjects = this.rightAddendCountingObjectsProperty.value;

    // If we are only provided one ten frame bound, we are in the unified counting area where Counting Objects are split by attribute.
    // If we have two ten frame bounds, we are in a split counting area where Counting Objects are split by location.
    let leftGridCoordinates: Vector2[];
    let rightGridCoordinates: Vector2[];
    if ( tenFrameBounds.length === 1 ) {
      const gridCoordinates = this.getGridCoordinates( tenFrameBounds[ 0 ], 0, 0 );
      leftGridCoordinates = gridCoordinates.slice( 0, leftAddendObjects.length );
      rightGridCoordinates = gridCoordinates.slice( leftAddendObjects.length, leftAddendObjects.length + rightAddendObjects.length );
    }
    else {
      leftGridCoordinates = this.getGridCoordinates( tenFrameBounds[ 0 ], 20, 50 ).slice( 0, leftAddendObjects.length );
      rightGridCoordinates = this.getGridCoordinates( tenFrameBounds[ 1 ], 50, 20 ).slice( 0, rightAddendObjects.length );
    }
    this.setAttributePositions( leftAddendObjects, rightAddendObjects, leftGridCoordinates, rightGridCoordinates, true );
    this.setLocationPositions( leftAddendObjects, rightAddendObjects, leftGridCoordinates, rightGridCoordinates, true );


    assert && assert( this.leftAddendCountingObjectsProperty.value.length === this.leftAddendProperty.value, 'Addend array length and value should match' );
    assert && assert( this.rightAddendCountingObjectsProperty.value.length === this.rightAddendProperty.value, 'Addend array length and value should match' );
  }

  /**
   * Returns grid coordinates based on the provided bounds.
   * This function assumes that we want the coordinates for a ten frame based grid which means there are 5 columns.
   * @param bounds
   * @param leftMargin
   * @param rightMargin
   * @param columnNumber
   */
  public getGridCoordinates( bounds: Bounds2, leftMargin: number, rightMargin: number, columnNumber = 5 ): Vector2[] {
    const rowNumber = 4;
    const topMargin = 9;
    const bottomMargin = 58;
    assert && assert( columnNumber * rowNumber >= this.numberOfCountingObjects, 'There are not enough cells for the possible amount of counting objects.' );

    const columnWidth = ( bounds.width - rightMargin - leftMargin ) / columnNumber;
    const rowHeight = ( bounds.height - bottomMargin - topMargin ) / rowNumber;

    const cellCenterCoordinates: Vector2[] = [];

    for ( let i = 0; i < rowNumber; i++ ) {
      for ( let j = 0; j < columnNumber; j++ ) {
        const x = bounds.minX + j * columnWidth + columnWidth / 2;
        const y = bounds.minY + i * rowHeight + rowHeight / 2;
        cellCenterCoordinates.push( new Vector2( x + leftMargin, y + topMargin ) );
      }
    }
    return cellCenterCoordinates;
  }

  public getCountingObjectsSortedByLocationPosition(): CountingObject[] {
    return this.countingObjects.filter( countingObject => countingObject.addendTypeProperty.value !== AddendType.INACTIVE )
      .slice().sort( ( a, b ) => a.locationPositionProperty.value.x - b.locationPositionProperty.value.x + a.locationPositionProperty.value.y - b.locationPositionProperty.value.y );
  }

  public reset(): void {

    // Stop any animations that may be in progress.
    this.dropAnimation?.stop();
    this.attributeAnimation?.stop();
    this.locationAnimation?.stop();
    this.fadeOutAnimation?.stop();
    this.fadeInAnimation?.stop();

    this.representationTypeProperty.reset();
    this.leftAddendVisibleProperty.reset();
    this.rightAddendVisibleProperty.reset();
    this.totalVisibleProperty.reset();
    this.showNumberLineAddendValuesProperty.reset();
    this.showTickValuesProperty.reset();
    this.showTotalJumpProperty.reset();
    this.leftAddendLabelPlacementProperty.reset();
    this.numberLineSliderEnabledRangeProperty.reset();

    assert && assert( this.leftAddendCountingObjectsProperty.value.length === this.leftAddendProperty.value, 'Addend array length and value should match' );
    assert && assert( this.rightAddendCountingObjectsProperty.value.length === this.rightAddendProperty.value, 'Addend array length and value should match' );
  }

  public static calculateBeadSeparatorXPosition( leftAddendValue: number ): number {

    // empirically determined. This starting position is closely intertwined with the
    // both the width of the bead, and the denominator in the calculation below.
    const startingPosition = 15;
    return leftAddendValue / 2.2 + startingPosition;
  }
}

numberPairs.register( 'NumberPairsModel', NumberPairsModel );