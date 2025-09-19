// Copyright 2024-2025, University of Colorado Boulder

/**
 * Create the counting area where counting representations are placed and can be manipulated by the user.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Animation from '../../../../twixt/js/Animation.js';
import SplitCountingAreaNode from '../../intro/view/SplitCountingAreaNode.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import NumberPairsModel, { AnimationTarget } from '../model/NumberPairsModel.js';
import RepresentationType from '../model/RepresentationType.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import AddendEyeToggleButton from './AddendEyeToggleButton.js';
import GatedVisibleProperty from '../../../../axon/js/GatedVisibleProperty.js';
import KittenNode from './KittenNode.js';
import LocationCountingObjectNode from './LocationCountingObjectNode.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';

type SelfOptions = {
  backgroundColorProperty: TReadOnlyProperty<TColor>;
  countingRepresentationTypeProperty: Property<RepresentationType>;
};

type CountingAreaNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'> & PickRequired<NodeOptions, 'tandem'>;

const COUNTING_AREA_LINE_WIDTH = 1.5;
const COUNTING_AREA_MARGIN = NumberPairsConstants.COUNTING_AREA_INNER_MARGIN;
const COUNTING_AREA_BOUNDS = NumberPairsConstants.COUNTING_AREA_BOUNDS;

export default class CountingAreaNode extends Node {
  public constructor(
    leftAddendVisibleProperty: BooleanProperty,
    rightAddendVisibleProperty: BooleanProperty,
    private readonly model: NumberPairsModel,
    providedOptions: CountingAreaNodeOptions ) {

    const options = optionize<CountingAreaNodeOptions, SelfOptions, NodeOptions>()( {
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );
    super( options );

    // The split counting area is only visible when we are in a location based counting representation.
    // i.e. Apples, Soccer Balls, Butterflies, One Cards
    const splitCountingAreaVisibleProperty = new DerivedProperty( [ options.countingRepresentationTypeProperty ],
      countingRepresentationType => {
        return countingRepresentationType === RepresentationType.APPLES ||
               countingRepresentationType === RepresentationType.ONE_CARDS ||
               countingRepresentationType === RepresentationType.SOCCER_BALLS ||
               countingRepresentationType === RepresentationType.BUTTERFLIES;
      } );

    const backgroundRectangle = new Rectangle( COUNTING_AREA_BOUNDS, {
      fill: options.backgroundColorProperty.value,
      stroke: 'black',
      lineWidth: COUNTING_AREA_LINE_WIDTH,
      cornerRadius: NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS
    } );
    const addendsNotVisibleNode = new Text( '?', {
      font: new PhetFont( 80 ),
      center: backgroundRectangle.center,
      visibleProperty: new DerivedProperty( [ leftAddendVisibleProperty, rightAddendVisibleProperty ],
        ( leftAddendVisible, rightAddendVisible ) => {
          return !leftAddendVisible || !rightAddendVisible;
        } )
    } );
    backgroundRectangle.addChild( addendsNotVisibleNode );
    options.backgroundColorProperty.link( backgroundColor => {
      backgroundRectangle.fill = backgroundColor;
    } );

    const bothAddendsEyeToggleButtonTandem = options.countingRepresentationTypeProperty.validValues?.includes( RepresentationType.BEADS ) ?
                                             options.tandem.createTandem( 'bothAddendsEyeToggleButton' ) : Tandem.OPT_OUT;
    const bothAddendsEyeToggleButtonVisibleProperty = new GatedVisibleProperty( DerivedProperty.not( splitCountingAreaVisibleProperty ), bothAddendsEyeToggleButtonTandem );
    const bothAddendsEyeToggleButton = new AddendEyeToggleButton( leftAddendVisibleProperty, {
      accessibleName: NumberPairsFluent.a11y.controls.hideAddends.accessibleNameStringProperty,
      left: COUNTING_AREA_BOUNDS.minX + COUNTING_AREA_MARGIN,
      bottom: COUNTING_AREA_BOUNDS.maxY - COUNTING_AREA_MARGIN,
      secondAddendVisibleProperty: rightAddendVisibleProperty,
      visibleProperty: bothAddendsEyeToggleButtonVisibleProperty,
      tandem: bothAddendsEyeToggleButtonTandem
    } );
    this.addChild( backgroundRectangle );
    this.addChild( bothAddendsEyeToggleButton );

    const splitCountingAreaBackground = new SplitCountingAreaNode(
      COUNTING_AREA_BOUNDS, leftAddendVisibleProperty, rightAddendVisibleProperty, {
        visibleProperty: splitCountingAreaVisibleProperty,
        tandem: options.countingRepresentationTypeProperty.validValues?.includes( RepresentationType.ONE_CARDS ) ?
                options.tandem.createTandem( 'splitCountingAreaBackground' ) : Tandem.OPT_OUT
      } );

    this.addChild( splitCountingAreaBackground );
  }

  /**
   * Animates the dropped counting object and any overlapping objects to the closest boundary point of the drop zone.
   * @param droppedCountingObject
   * @param positionPropertyType
   */
  public dropCountingObject( droppedCountingObject: CountingObject, positionPropertyType: 'attribute' | 'location' ): void {
    const dragBounds = positionPropertyType === 'attribute' ? KittenNode.DRAG_BOUNDS : LocationCountingObjectNode.DRAG_BOUNDS;
    const positionProperty = positionPropertyType === 'attribute' ? droppedCountingObject.attributePositionProperty :
                             droppedCountingObject.locationPositionProperty;

    const animationTargets: AnimationTarget[] = [ this.getValidDropPointTarget( positionProperty, dragBounds ) ];
    const dropPoint = animationTargets[ 0 ].to;
    const dropZoneBounds = NumberPairsConstants.GET_DROP_ZONE_BOUNDS( dropPoint );

    // Find all the active counting objects that are half a panel width away from the dropped counting object.
    const activeCountingObjects = this.model.countingObjects.filter( countingObject =>
      countingObject.addendTypeProperty.value !== AddendType.INACTIVE && countingObject !== droppedCountingObject );
    const countingObjectsInsideDropZone = activeCountingObjects.filter( countingObject => {
      const positionProperty = positionPropertyType === 'attribute' ?
                               countingObject.attributePositionProperty : countingObject.locationPositionProperty;
      return dropZoneBounds.containsPoint( positionProperty.value );
    } );

    if ( countingObjectsInsideDropZone.length !== 0 ) {
      // Animate the object to the closest boundary point of the drop zone.
      countingObjectsInsideDropZone.forEach( countingObject => {
        const positionProperty = positionPropertyType === 'attribute' ?
                                 countingObject.attributePositionProperty : countingObject.locationPositionProperty;
        const destination = CountingAreaNode.getNearbyEmptyPoint( dropPoint, positionProperty.value, dragBounds );

        animationTargets.push( {
          property: positionProperty,
          to: destination
        } );
      } );
    }

    this.model.countingObjectsAnimation?.stop();
    this.model.countingObjectsAnimation = new Animation( {
      duration: 0.4,
      targets: animationTargets
    } );
    this.model.countingObjectsAnimation.endedEmitter.addListener( () => {
      this.model.countingObjectsAnimation = null;
    } );
    this.model.countingObjectsAnimation.start();

    affirm( this.model.leftAddendCountingObjectsProperty.value.length === this.model.leftAddendProperty.value, 'Addend array length and value should match' );
    affirm( this.model.rightAddendCountingObjectsProperty.value.length === this.model.rightAddendProperty.value, 'Addend array length and value should match' );
  }

  /**
   * Returns a point that no longer overlaps the occupied point. Prefers points that are near the current point.
   * @param occupiedPoint
   * @param currentPoint
   * @param validBounds
   * @param minRatio - The minimum ratio of the panel width to use when finding a new point.
   */
  public static getNearbyEmptyPoint( occupiedPoint: Vector2, currentPoint: Vector2, validBounds: Bounds2, minRatio = 0.5 ): Vector2 {

    // Find 4 points that are between a panel width or half a panel width away from the current position.
    const panelWidthRatio = dotRandom.nextDoubleBetween( minRatio, 1 );
    const distanceDirectionChange = NumberPairsConstants.KITTEN_PANEL_WIDTH * panelWidthRatio;

    const points = [
      currentPoint.plusXY( -distanceDirectionChange, 0 ),
      currentPoint.plusXY( distanceDirectionChange, 0 ),
      currentPoint.plusXY( 0, -distanceDirectionChange ),
      currentPoint.plusXY( 0, distanceDirectionChange ),
      currentPoint.plusXY( distanceDirectionChange, distanceDirectionChange ),
      currentPoint.plusXY( -distanceDirectionChange, distanceDirectionChange ),
      currentPoint.plusXY( distanceDirectionChange, -distanceDirectionChange ),
      currentPoint.plusXY( -distanceDirectionChange, -distanceDirectionChange )
    ];

    // Eliminate any points that are outside the countingAreaBounds.
    const pointsInBounds = points.filter( point => validBounds.containsPoint( point ) );

    // Randomly select one of the remaining points and use it as the destination if it is further away from the drop
    // point than the current position. If we had no valid points a panel width ratio away, then find any random
    // point inside the valid bounds.
    const randomPoint = pointsInBounds.length === 0 ? dotRandom.nextPointInBounds( validBounds ) : dotRandom.sample( pointsInBounds );
    return currentPoint.distance( occupiedPoint ) >= randomPoint.distance( occupiedPoint ) ? currentPoint : randomPoint;
  }

  /**
   * Returns a random point that does not overlap any of the occupied points.
   * @param occupiedPoints
   * @param validBounds
   * @param minRatio - The minimum ratio of the panel width to use when finding a new point.
   */
  public static getRandomEmptyPoint( occupiedPoints: Vector2[], validBounds: Bounds2, minRatio = 0.5 ): Vector2 {
    let recursionDepth = 0;
    let point = dotRandom.nextPointInBounds( validBounds );
    
    const isPointTooClose = ( point: Vector2 ): boolean => {
      return occupiedPoints.some( occupiedPoint =>
        point.distance( occupiedPoint ) < NumberPairsConstants.KITTEN_PANEL_WIDTH * minRatio
      );
    };

    while ( isPointTooClose( point ) ) {
      recursionDepth += 1;
      assert && assert( recursionDepth <= 100, 'We tried to find an empty point but it took us over 100 tries.' );
      point = dotRandom.nextPointInBounds( validBounds );
    }
    
    return point;
  }

  /**
   * Returns the closest boundary point of the drop zone if the position is outside the drag bounds.
   * @param positionProperty
   * @param dragBounds
   */
  private getValidDropPointTarget( positionProperty: Property<Vector2>, dragBounds: Bounds2 ): AnimationTarget {
    const dropPoint = dragBounds.containsPoint( positionProperty.value ) ?
                      positionProperty.value : dragBounds.closestBoundaryPointTo( positionProperty.value );

    return {
      property: positionProperty,
      to: dropPoint
    };
  }
}

numberPairs.register( 'CountingAreaNode', CountingAreaNode );