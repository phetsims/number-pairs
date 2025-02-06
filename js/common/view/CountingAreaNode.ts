// Copyright 2024-2025, University of Colorado Boulder

/**
 * Create the counting area where counting representations are placed and can be manipulated by the user.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, NodeOptions, Rectangle, TColor, Text } from '../../../../scenery/js/imports.js';
import SplitCountingAreaNode from '../../intro/view/SplitCountingAreaNode.js';
import numberPairs from '../../numberPairs.js';
import RepresentationType from '../model/RepresentationType.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import ShowHideAddendButton from './ShowHideAddendButton.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import Animation from '../../../../twixt/js/Animation.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';

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

    const showHideBothAddendsButton = new ShowHideAddendButton( leftAddendVisibleProperty, {
      accessibleName: NumberPairsStrings.showOrHideAddendsStringProperty,
      left: COUNTING_AREA_BOUNDS.minX + COUNTING_AREA_MARGIN,
      bottom: COUNTING_AREA_BOUNDS.maxY - COUNTING_AREA_MARGIN,
      secondAddendVisibleProperty: rightAddendVisibleProperty,
      visibleProperty: DerivedProperty.not( splitCountingAreaVisibleProperty ),
      tandem: options.tandem.createTandem( 'showHideBothAddendsButton' )
    } );
    this.addChild( backgroundRectangle );
    this.addChild( showHideBothAddendsButton );

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
   *
   * // TODO: We still need to handle when a point is calculated to be outside of the Counting Area bounds.
   */
  public dropCountingObject( droppedCountingObject: CountingObject, positionPropertyType: 'attribute' | 'location' ): void {

    const countingObjectValidDropPoint = this.sendToValidDropPoint( droppedCountingObject, positionPropertyType );
    const dropZoneBounds = this.getDropZoneBounds( countingObjectValidDropPoint );
    const activeCountingObjects = this.model.countingObjects.filter( countingObject =>
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
      this.model.countingObjectsAnimation?.stop();
      this.model.countingObjectsAnimation = new Animation( {
        duration: 0.4,
        targets: animationTargets
      } );
      this.model.countingObjectsAnimation.endedEmitter.addListener( () => {
        // TODO: Do I need to dispose?
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
}

numberPairs.register( 'CountingAreaNode', CountingAreaNode );