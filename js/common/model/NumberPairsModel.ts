// Copyright 2024, University of Colorado Boulder
/**
 * TODO: describe file
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */
import TModel from '../../../../joist/js/TModel.js';
import numberPairs from '../../numberPairs.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import NumberPairsColors from '../NumberPairsColors.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import { Color, Rectangle, TColor } from '../../../../scenery/js/imports.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
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
import { Node, Image, Line, Text } from '../../../../scenery/js/imports.js';
import apple_svg from '../../../images/apple_svg.js';
import soccerball_svg from '../../../images/soccerball_svg.js';
import butterfly_svg from '../../../images/butterfly_svg.js';
import kittenYellow_svg from '../../../images/kittenYellow_svg.js';
import cubeBlueCircle_svg from '../../../images/cubeBlueCircle_svg.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Vector2 from '../../../../dot/js/Vector2.js';

// TODO: rename to RepresentationType
// TODO: Pull enumeration out into it's own file.
const ICON_MAX_WIDTH = 25;
export const ICON_MAX_HEIGHT = 32;
export class CountingRepresentationType extends EnumerationValue {
  public static readonly APPLES = new CountingRepresentationType(
    'apples',
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new Image( apple_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly SOCCER_BALLS = new CountingRepresentationType(
    'soccerBalls',
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new Image( soccerball_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly BUTTERFLIES = new CountingRepresentationType(
    'butterflies',
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new Image( butterfly_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly ONE_CARDS = new CountingRepresentationType(
    'oneCards',
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new Rectangle( 0, 0, ICON_MAX_WIDTH, ICON_MAX_HEIGHT, {
      cornerRadius: 5,
      fill: Color.WHITE,
      stroke: 'black',
      children: [ new Text( '1', { font: new PhetFont( 18 ), center: new Vector2( ICON_MAX_WIDTH / 2, ICON_MAX_HEIGHT / 2 ) } ) ]
    } )
  );
  public static readonly KITTENS = new CountingRepresentationType(
    'kittens',
    NumberPairsColors.attributeSumColorProperty,
    NumberPairsColors.attributeLeftAddendColorProperty,
    NumberPairsColors.attributeRightAddendColorProperty,
    new Image( kittenYellow_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly CUBES = new CountingRepresentationType(
    'cubes',
    NumberPairsColors.numberLineSumColorProperty,
    NumberPairsColors.numberLineLeftAddendColorProperty,
    NumberPairsColors.numberLineRightAddendColorProperty,
    new Image( cubeBlueCircle_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly NUMBER_LINE = new CountingRepresentationType(
    'numberLine',
    NumberPairsColors.numberLineSumColorProperty,
    NumberPairsColors.numberLineLeftAddendColorProperty,
    NumberPairsColors.numberLineRightAddendColorProperty,
    new Line( 0, 0, ICON_MAX_WIDTH, 0, { stroke: 'black' } )
  );
  public static readonly enumeration = new Enumeration( CountingRepresentationType );

  public constructor(
    public readonly label: string,
    public readonly totalColor: TColor,
    public readonly leftAddendColor: TColor,
    public readonly rightAddendColor: TColor,
    public readonly icon: Node
  ) {
    super();
  }
}

type leftAddendLabelPlacement = 'handle' | 'arrow';
// TODO: Add counting representations valid values to options
type SelfOptions = {
  initialCountingRepresentationType: CountingRepresentationType;
};

export type NumberPairsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

const DROP_ZONE_MARGIN = KITTEN_PANEL_WIDTH / 1.75;

export default class NumberPairsModel implements TModel {

  public readonly countingObjects: CountingObject[] = [];

  // The counting representation type determines the colors of the total and addends,
  // as well as the image assets used to represent each counting object.
  // The CUBES and NUMBER_LINE representations additionally support different user interactions.
  public readonly countingRepresentationTypeProperty: Property<CountingRepresentationType>;

  // The colors that code each addend and the total in the sim change based on the chosen counting representation.
  public readonly totalColorProperty: TReadOnlyProperty<TColor>;
  public readonly leftAddendColorProperty: TReadOnlyProperty<TColor>;
  public readonly rightAddendColorProperty: TReadOnlyProperty<TColor>;

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

  protected constructor(
    // The totalProperty is derived from the left and right addend numbers.
    // In decomposition models (Intro, Ten, and Twenty screens) it is set by the selected scene.
    public readonly totalNumberProperty: TReadOnlyProperty<number>,
    public readonly leftAddendNumberProperty: PhetioProperty<number>,
    public readonly rightAddendNumberProperty: TReadOnlyProperty<number>,
    public readonly leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>,
    public readonly rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>,
    numberOfCountingObjects: number,
    providedOptions: NumberPairsModelOptions ) {

    const options = providedOptions;
    this.countingRepresentationTypeProperty = new EnumerationProperty( options.initialCountingRepresentationType, {
      tandem: options.tandem.createTandem( 'countingRepresentationTypeProperty' )
    } );

    this.totalColorProperty = new DerivedProperty( [ this.countingRepresentationTypeProperty ], countingRepresentationType => {
      return countingRepresentationType.totalColor;
    } );
    this.leftAddendColorProperty = new DerivedProperty( [ this.countingRepresentationTypeProperty ], countingRepresentationType => {
      return countingRepresentationType.leftAddendColor;
    } );
    this.rightAddendColorProperty = new DerivedProperty( [ this.countingRepresentationTypeProperty ], countingRepresentationType => {
      return countingRepresentationType.rightAddendColor;
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

    this.showNumberLineAddendValuesProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'showNumberLineAddendValuesProperty' )
    } );
    this.showTickValuesProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'showTickValuesProperty' )
    } );
    this.showTotalJumpProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'showTotalJumpProperty' )
    } );
    this.leftAddendLabelPlacementProperty = new Property<leftAddendLabelPlacement>( 'handle', {
      phetioValueType: StringIO,
      tandem: options.tandem.createTandem( 'leftAddendLabelPlacementProperty' )
    } );

    _.times( numberOfCountingObjects, i => {
      const countingObjectID = i + 1;
      this.countingObjects.push( new CountingObject( {
        id: countingObjectID,
        tandem: options.tandem.createTandem( `CountingObject${countingObjectID}` )
      } ) );
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
   * Animates the dropped counting object and any overlapping objects to the closest boundary point of the drop zone.
   * @param droppedCountingObject
   */
  public dropCountingObject( droppedCountingObject: CountingObject ): void {
    const dropZoneBoundsCenter = droppedCountingObject.attributePositionProperty.value;
    const dropZoneBounds = new Bounds2(
      dropZoneBoundsCenter.x - DROP_ZONE_MARGIN,
      dropZoneBoundsCenter.y - DROP_ZONE_MARGIN,
      dropZoneBoundsCenter.x + DROP_ZONE_MARGIN,
      dropZoneBoundsCenter.y + DROP_ZONE_MARGIN
    );

    // Find all the active counting objects that are half a panel width away from the dropped counting object.
    const activeCountingObjects = this.countingObjects.filter( countingObject =>
      countingObject.addendTypeProperty.value !== AddendType.INACTIVE && countingObject !== droppedCountingObject );
    const countingObjectsInsideDropZone = activeCountingObjects.filter( countingObject =>
      dropZoneBounds.containsPoint( countingObject.attributePositionProperty.value ) );

    // If there are counting objects inside the drop zone, add the dropped counting object to the array, so it can be
    // also be positioned towards the boundary of the drop zone.
    if ( countingObjectsInsideDropZone.length !== 0 ) {
      countingObjectsInsideDropZone.push( droppedCountingObject );

      // Animate the object to the closest boundary point of the drop zone.
      const animationTargets = countingObjectsInsideDropZone.map( countingObject => {
        return {
          property: countingObject.attributePositionProperty,
          to: dropZoneBounds.closestBoundaryPointTo( countingObject.attributePositionProperty.value )
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
   * Creates a multilink that updates the enabled range of the number line slider based on the left and right addend numbers.
   */
  protected createNumberLineEnabledRangeLinks(): void {

    // TODO: Kind of weird that we're using the twenty number line range min here always... right now both the ten and twenty are 0... but what if that changes?
    Multilink.multilink( [ this.leftAddendNumberProperty, this.rightAddendNumberProperty ], ( leftAddendNumber, rightAddendNumber ) => {

      // We do not want to use the total in case the left or right addend numbers have not fully updated. This may
      // change the range multiple times in the course of a firing cycle, but we know the rightAddend value gets updated
      // last, therefore we can feel confident that the left addend value will at least not be affected by the range change.
      this.numberLineSliderEnabledRangeProperty.value = new Range( NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.min, leftAddendNumber + rightAddendNumber );
    } );
  }

  /**
   * Set the left addend to the right addend value. Derived Properties and listeners take care of the rest.
   */
  public swapAddends(): void {
    this.leftAddendNumberProperty.value = this.rightAddendNumberProperty.value;
  }

  public organizeIntoTenFrame(): void {
    // TODO: Add logic that organizes draggable counting objects into a ten frame. https://github.com/phetsims/number-pairs/issues/18
  }

  public reset(): void {
    this.dropAnimation?.stop();
  }
}

numberPairs.register( 'NumberPairsModel', NumberPairsModel );