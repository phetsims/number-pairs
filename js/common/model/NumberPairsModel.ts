// Copyright 2024, University of Colorado Boulder
/**
 * NumberPairsModel is the base model for the Number Pairs simulation. It contains the properties that control the
 * addends, total, and counting objects in the sim. The model also contains properties that control the visibility of
 * the addends and total, as well as the representation type of the counting objects.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */
import TModel from '../../../../joist/js/TModel.js';
import numberPairs from '../../numberPairs.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { Color } from '../../../../scenery/js/imports.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import CountingObject, { AddendType, KITTEN_PANEL_WIDTH } from './CountingObject.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Animation from '../../../../twixt/js/Animation.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import Range from '../../../../dot/js/Range.js';
import Multilink from '../../../../axon/js/Multilink.js';
import RepresentationType from './RepresentationType.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';

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
  private tenFrameAnimation: Animation | null = null;

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
      tandem: options.tandem.createTandem( 'representationTypeProperty' )
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
      tandem: options.tandem.createTandem( 'showNumberLineAddendValuesProperty' )
    } );
    this.showTickValuesProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'showTickValuesProperty' )
    } );
    this.showTotalJumpProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'showTotalJumpProperty' )
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

    this.beadXPositionsProperty.link( beadXPositions => {
      beadXPositions.forEach( ( beadXPosition, index ) => {
        this.countingObjects[ index ].beadXPositionProperty.value = beadXPosition;
      } );
    } );

    // The range will update after all addends have stabilized their values during construction.
    this.numberLineSliderEnabledRangeProperty = new Property(
      new Range( NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.min, numberOfCountingObjects ), {
        phetioValueType: Range.RangeIO,
        tandem: options.tandem.createTandem( 'numberLineSliderEnabledRangeProperty' )
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
    } );
  }

  /**
   * Animates the dropped counting object and any overlapping objects to the closest boundary point of the drop zone.
   * @param droppedCountingObject
   * @param positionPropertyType
   */
  public dropCountingObject( droppedCountingObject: CountingObject, positionPropertyType: 'attribute' | 'location' ): void {
    const dropZoneBounds = positionPropertyType === 'attribute' ?
                           this.getDropZoneBounds( droppedCountingObject.attributePositionProperty.value ) :
                           this.getDropZoneBounds( droppedCountingObject.locationPositionProperty.value );
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
   * Set the left addend to the right addend value. Derived Properties and listeners take care of the rest.
   */
  public swapAddends(): void {
    this.leftAddendProperty.value = this.rightAddendProperty.value;
  }

  /**
   * Snap the cubes to their positions on the wire based on the addend values. By default, the cubes are arranged in
   * groups of 5 with a separator between the two addends.
   */
  public organizeInGroupsOfFive(): void {
    const leftAddend = this.leftAddendProperty.value;
    const leftAddendBeads = this.leftAddendCountingObjectsProperty.value;
    const rightAddendBeads = this.rightAddendCountingObjectsProperty.value;

    // Cubes should be lined up on the wire in groups of 5.
    leftAddendBeads.forEach( ( bead, i ) => {
      bead.beadXPositionProperty.value = Math.floor( i / 5 ) + i + NumberPairsConstants.LEFT_MOST_BEAD_X;
    } );

    const beadSeparatorPlaceOnWire = NumberPairsModel.calculateBeadSeparatorPlacement( leftAddend );
    rightAddendBeads.forEach( ( bead, i ) => {
      bead.beadXPositionProperty.value = Math.floor( i / 5 ) + i + beadSeparatorPlaceOnWire + 1;
    } );
  }

  /**
   * Organizes the counting objects into a ten frame based on the provided bounds.
   * @param tenFrameBounds
   */
  public organizeIntoTenFrame( tenFrameBounds: Bounds2[] ): void {
    assert && assert( tenFrameBounds.length === 1 || tenFrameBounds.length === 2, 'Ten frame bounds must be an array of length 1 or 2.' );
    const leftAddendObjects = this.leftAddendCountingObjectsProperty.value;
    const rightAddendObjects = this.rightAddendCountingObjectsProperty.value;

    // If we are only provided one ten frame bound, we will organize the objects within that single ten frame bounds.
    let leftGridCoordinates: Vector2[];
    let rightGridCoordinates: Vector2[];
    if ( tenFrameBounds.length === 1 ) {
      const gridCoordinates = this.getGridCoordinates( tenFrameBounds[ 0 ], 0, 0 );
      leftGridCoordinates = gridCoordinates.slice( 0, leftAddendObjects.length );
      rightGridCoordinates = gridCoordinates.slice( leftAddendObjects.length );
    }
    else {
      leftGridCoordinates = this.getGridCoordinates( tenFrameBounds[ 0 ], 20, 50 );
      rightGridCoordinates = this.getGridCoordinates( tenFrameBounds[ 1 ], 50, 20 );
    }


    const tenFrameAnimationTargets: AnimationTarget[] = [];
    leftAddendObjects.forEach( ( countingObject, index ) => {
      tenFrameAnimationTargets.push( {
        property: countingObject.attributePositionProperty,
        to: leftGridCoordinates[ index ]
      } );
      tenFrameAnimationTargets.push( {
        property: countingObject.locationPositionProperty,
        to: leftGridCoordinates[ index ]
      } );
    } );
    rightAddendObjects.forEach( ( countingObject, index ) => {
      tenFrameAnimationTargets.push( {
        property: countingObject.attributePositionProperty,
        to: rightGridCoordinates[ index ]
      } );
      tenFrameAnimationTargets.push( {
        property: countingObject.locationPositionProperty,
        to: rightGridCoordinates[ index ]
      } );
    } );

    this.tenFrameAnimation = new Animation( {
      duration: 0.4,
      targets: tenFrameAnimationTargets
    } );
    this.tenFrameAnimation.endedEmitter.addListener( () => {
      this.tenFrameAnimation = null;
    } );
    this.tenFrameAnimation.start();
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

    //
    for ( let i = 0; i < rowNumber; i++ ) {
      for ( let j = 0; j < columnNumber; j++ ) {
        const x = bounds.minX + j * columnWidth + columnWidth / 2;
        const y = bounds.minY + i * rowHeight + rowHeight / 2;
        cellCenterCoordinates.push( new Vector2( x + leftMargin, y + topMargin ) );
      }
    }
    return cellCenterCoordinates;
  }

  public reset(): void {

    // Stop any animations that may be in progress.
    this.dropAnimation?.stop();
    this.tenFrameAnimation?.stop();

    this.representationTypeProperty.reset();
    this.leftAddendVisibleProperty.reset();
    this.rightAddendVisibleProperty.reset();
    this.totalVisibleProperty.reset();
    this.showNumberLineAddendValuesProperty.reset();
    this.showTickValuesProperty.reset();
    this.showTotalJumpProperty.reset();
    this.leftAddendLabelPlacementProperty.reset();
    this.numberLineSliderEnabledRangeProperty.reset();
  }

  public static calculateBeadSeparatorPlacement( leftAddendValue: number ): number {
    const startingPosition = 15; // empirically determined;;
    return leftAddendValue / 2.5 + startingPosition;
  }
}

numberPairs.register( 'NumberPairsModel', NumberPairsModel );