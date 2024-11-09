// Copyright 2024, University of Colorado Boulder

/**
 * The LocationCountingObjectNode is the view for the individual objects users can interact with to explore the
 * decomposition of a number. It can take the form of an apple, one card, soccer ball, or butterfly
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Image, Node, NodeOptions, Rectangle, RichDragListener, Text } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import CountingObject from '../model/CountingObject.js';
import Property from '../../../../axon/js/Property.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import apple_svg from '../../../images/apple_svg.js';
import soccerball_svg from '../../../images/soccerball_svg.js';
import butterfly_svg from '../../../images/butterfly_svg.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import RepresentationType from '../model/RepresentationType.js';
import { PositionPropertyType } from '../model/NumberPairsModel.js';

type SelfOptions = {
  handleLocationChange: ( countingObject: CountingObject, newPosition: Vector2 ) => void;
  onEndDrag: ( droppedObject: CountingObject, positionPropertyType: PositionPropertyType ) => void;
};
type LocationCountingObjectNodeOptions = SelfOptions & WithRequired<NodeOptions, 'tandem'>;

const IMAGE_WIDTH = 40;
const ONE_CARD_HEIGHT = 55;
const DRAG_BOUNDS_MARGIN = 2;
export default class LocationCountingObjectNode extends Node {
  public constructor(
    model: CountingObject,
    dragBounds: Bounds2,
    countingRepresentationTypeProperty: Property<RepresentationType>,
    providedOptions: LocationCountingObjectNodeOptions
  ) {

    const apple = new Image( apple_svg, {
      maxWidth: IMAGE_WIDTH,
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, RepresentationType.APPLES )
    } );
    const oneCard = new Rectangle( 0, 0, IMAGE_WIDTH, ONE_CARD_HEIGHT, {
      fill: 'white',
      stroke: 'black',
      cornerRadius: 5,
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, RepresentationType.ONE_CARDS )
    } );

    // Create the one card.
    const numberOne = new Text( '1', {
      font: new PhetFont( 40 ),
      center: oneCard.center,
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, RepresentationType.ONE_CARDS )
    } );
    oneCard.addChild( numberOne );

    const soccerBall = new Image( soccerball_svg, {
      maxWidth: IMAGE_WIDTH,
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, RepresentationType.SOCCER_BALLS )
    } );
    const butterfly = new Image( butterfly_svg, {
      maxWidth: IMAGE_WIDTH,
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, RepresentationType.BUTTERFLIES )
    } );

    const dilatedDragBounds = dragBounds.dilatedXY( -IMAGE_WIDTH / 2 - DRAG_BOUNDS_MARGIN, -ONE_CARD_HEIGHT / 2 - DRAG_BOUNDS_MARGIN );

    const options = optionize<LocationCountingObjectNodeOptions, SelfOptions, NodeOptions>()( {
      children: [ apple, oneCard, soccerBall, butterfly ]
    }, providedOptions );
    super( options );

    apple.center = this.center;
    oneCard.center = this.center;
    soccerBall.center = this.center;
    butterfly.center = this.center;

    const dragListener = new RichDragListener( {
      start: () => {
        model.draggingProperty.value = true;
        this.moveToFront();
      },
      end: () => {
        model.draggingProperty.value = false;
        options.onEndDrag( model, 'location' );
      },
      dragListenerOptions: {
        dragBoundsProperty: new Property( dilatedDragBounds, {} ),
        positionProperty: model.locationPositionProperty,
        tandem: providedOptions.tandem.createTandem( 'dragListener' ),
        useParentOffset: true
      },
      keyboardDragListenerOptions: {
        tandem: providedOptions.tandem.createTandem( 'keyboardDragListener' )
      }
    } );
    this.addInputListener( dragListener );

    model.locationPositionProperty.link( position => {
      this.center = position;
      providedOptions.handleLocationChange( model, position );
    } );
  }
}

numberPairs.register( 'LocationCountingObjectNode', LocationCountingObjectNode );