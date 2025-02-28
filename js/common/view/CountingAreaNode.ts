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
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
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
import NumberPairsStrings from '../../NumberPairsStrings.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import RepresentationType from '../model/RepresentationType.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import AddendEyeToggleButton from './AddendEyeToggleButton.js';
import { GatedVisibleProperty } from '../../../../axon/js/GatedBooleanProperty.js';
import KittenNode from './KittenNode.js';
import LocationCountingObjectNode from './LocationCountingObjectNode.js';
import dotRandom from '../../../../dot/js/dotRandom.js';

type SelfOptions = {
  backgroundColorProperty: TReadOnlyProperty<TColor>;
  countingRepresentationTypeProperty: Property<RepresentationType>;
};

type CountingAreaNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'> & PickRequired<NodeOptions, 'tandem'>;

const COUNTING_AREA_LINE_WIDTH = 1.5;
const COUNTING_AREA_MARGIN = NumberPairsConstants.COUNTING_AREA_INNER_MARGIN;
const DROP_ZONE_MARGIN = NumberPairsConstants.KITTEN_PANEL_WIDTH / 1.75;
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
      accessibleName: NumberPairsStrings.showOrHideAddendsStringProperty,
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
    this.sendToValidDropPoint( positionProperty, dragBounds );
    const dropZoneBounds = this.getDropZoneBounds( positionProperty.value );

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
      const animationTargets = countingObjectsInsideDropZone.map( countingObject => {
        const positionProperty = positionPropertyType === 'attribute' ?
                                 countingObject.attributePositionProperty : countingObject.locationPositionProperty;

        // Find 4 points that are half a panel width away from the drop zone.
        const points = [
          positionProperty.value.plusXY( -NumberPairsConstants.KITTEN_PANEL_WIDTH / 2, 0 ),
          positionProperty.value.plusXY( NumberPairsConstants.KITTEN_PANEL_WIDTH / 2, 0 ),
          positionProperty.value.plusXY( 0, -NumberPairsConstants.KITTEN_PANEL_WIDTH / 2 ),
          positionProperty.value.plusXY( 0, NumberPairsConstants.KITTEN_PANEL_WIDTH / 2 )
        ];

        // Eliminate any points that are outside the countingAreaBounds.
        const pointsInBounds = points.filter( point => dragBounds.containsPoint( point ) );

        // Randomly select one of the remaining points.
        const destination = dotRandom.sample( pointsInBounds );

        return {
          property: positionProperty,
          to: destination
        };
      } );
      this.model.countingObjectsAnimation?.stop();
      this.model.countingObjectsAnimation = new Animation( {
        duration: 0.4,
        targets: animationTargets
      } );
      this.model.countingObjectsAnimation.endedEmitter.addListener( () => {
        this.model.countingObjectsAnimation = null;
      } );
      this.model.countingObjectsAnimation.start();
    }

    assert && assert( this.model.leftAddendCountingObjectsProperty.value.length === this.model.leftAddendProperty.value, 'Addend array length and value should match' );
    assert && assert( this.model.rightAddendCountingObjectsProperty.value.length === this.model.rightAddendProperty.value, 'Addend array length and value should match' );
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

  private sendToValidDropPoint( positionProperty: Property<Vector2>, dragBounds: Bounds2 ): void {
    const dropPoint = dragBounds.containsPoint( positionProperty.value ) ?
                      positionProperty.value : dragBounds.closestBoundaryPointTo( positionProperty.value );

    const animation = new Animation( {
      duration: 0.4,
      targets: [ {
        property: positionProperty,
        to: dropPoint
      } ]
    } );
    animation.start();
  }
}

numberPairs.register( 'CountingAreaNode', CountingAreaNode );