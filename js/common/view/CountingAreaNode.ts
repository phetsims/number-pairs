// Copyright 2024-2025, University of Colorado Boulder

/**
 * Create the counting area where counting representations are placed and can be manipulated by the user.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import GatedVisibleProperty from '../../../../axon/js/GatedVisibleProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
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
import AbstractNumberPairsModel from '../model/AbstractNumberPairsModel.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import { AnimationTarget } from '../model/NumberPairsModel.js';
import RepresentationType from '../model/RepresentationType.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import AddendEyeToggleButton from './AddendEyeToggleButton.js';
import LocationCountingObjectNode from './LocationCountingObjectNode.js';
import { numberBondOrBarModelStringProperty } from './numberBondOrBarModelStringProperty.js';

type SelfOptions = {
  backgroundColorProperty: TReadOnlyProperty<TColor>;
  countingRepresentationTypeProperty: Property<RepresentationType>;
  countingAreaBounds?: Bounds2;
};

type CountingAreaNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'> & PickRequired<NodeOptions, 'tandem'>;

const COUNTING_AREA_LINE_WIDTH = 1.5;
const COUNTING_AREA_MARGIN = NumberPairsConstants.COUNTING_AREA_INNER_MARGIN;

export default class CountingAreaNode extends Node {
  public readonly attributeDragBounds: Bounds2;
  public readonly bothAddendsEyeToggleButton: AddendEyeToggleButton;

  public constructor(
    leftAddendVisibleProperty: BooleanProperty,
    rightAddendVisibleProperty: BooleanProperty,
    private readonly model: AbstractNumberPairsModel,
    providedOptions: CountingAreaNodeOptions ) {

    const options = optionize<CountingAreaNodeOptions, SelfOptions, NodeOptions>()( {
      phetioVisiblePropertyInstrumented: false,
      countingAreaBounds: NumberPairsConstants.COUNTING_AREA_BOUNDS
    }, providedOptions );
    super( options );

    const countingAreaBounds = options.countingAreaBounds;
    this.attributeDragBounds = countingAreaBounds.erodedXY(
      NumberPairsConstants.KITTEN_PANEL_WIDTH / 2 + NumberPairsConstants.KITTEN_PANEL_MARGIN,
      NumberPairsConstants.KITTEN_PANEL_HEIGHT / 2 + NumberPairsConstants.KITTEN_PANEL_MARGIN
    );

    // The split counting area is only visible when we are in a location based counting representation.
    // i.e. Apples, Soccer Balls, Butterflies, One Cards

    const backgroundRectangle = new Rectangle( countingAreaBounds, {
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

    const bothAddendsEyeToggleButtonTandem = options.countingRepresentationTypeProperty.validValues?.includes( RepresentationType.KITTENS ) ?
                                             options.tandem.createTandem( 'bothAddendsEyeToggleButton' ) : Tandem.OPT_OUT;
    const bothAddendsEyeToggleButtonVisibleProperty = new GatedVisibleProperty( DerivedProperty.not( model.locationLayerVisibleProperty ), bothAddendsEyeToggleButtonTandem );
    this.bothAddendsEyeToggleButton = new AddendEyeToggleButton( leftAddendVisibleProperty, {
      accessibleName: NumberPairsFluent.a11y.controls.bothAddendsVisible.accessibleNameStringProperty,
      accessibleHelpText: NumberPairsFluent.a11y.controls.bothAddendsVisible.accessibleHelpTextPattern.createProperty( {
        modelRepresentation: numberBondOrBarModelStringProperty
      } ),
      left: countingAreaBounds.minX + COUNTING_AREA_MARGIN,
      bottom: countingAreaBounds.maxY - COUNTING_AREA_MARGIN,
      secondAddendVisibleProperty: rightAddendVisibleProperty,
      visibleProperty: bothAddendsEyeToggleButtonVisibleProperty,
      tandem: bothAddendsEyeToggleButtonTandem,
      accessibleContextResponseOff: NumberPairsFluent.a11y.controls.addendVisible.accessibleContextResponse.visibleStringProperty,
      accessibleContextResponseOn: NumberPairsFluent.a11y.controls.addendVisible.accessibleContextResponse.hiddenStringProperty
    } );
    this.addChild( backgroundRectangle );
    this.addChild( this.bothAddendsEyeToggleButton );

    const splitCountingAreaBackground = new SplitCountingAreaNode(
      countingAreaBounds, leftAddendVisibleProperty, rightAddendVisibleProperty, {
        visibleProperty: model.locationLayerVisibleProperty,
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
    const dragBounds = positionPropertyType === 'attribute' ? this.attributeDragBounds : LocationCountingObjectNode.DRAG_BOUNDS;
    const positionProperty = positionPropertyType === 'attribute' ? droppedCountingObject.attributePositionProperty :
                             droppedCountingObject.locationPositionProperty;

    const animationTargets = [ this.getValidDropPointTarget( positionProperty, dragBounds ) ];
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
      affirm( recursionDepth <= 100, 'We tried to find an empty point but it took us over 100 tries.' );
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
