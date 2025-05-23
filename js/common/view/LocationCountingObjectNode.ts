// Copyright 2024-2025, University of Colorado Boulder

/**
 * The LocationCountingObjectNode is the view for the individual objects users can interact with to explore the
 * decomposition of a number. It can take the form of an apple, one card, soccer ball, or butterfly
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import apple_svg from '../../../images/apple_svg.js';
import butterfly_svg from '../../../images/butterfly_svg.js';
import soccerball_svg from '../../../images/soccerball_svg.js';
import numberPairs from '../../numberPairs.js';
import CountingObject from '../model/CountingObject.js';
import { PositionPropertyType } from '../model/NumberPairsModel.js';
import RepresentationType from '../model/RepresentationType.js';
import OneCard from './OneCard.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import InteractiveHighlightingNode from '../../../../scenery/js/accessibility/voicing/nodes/InteractiveHighlightingNode.js';

type SelfOptions = {
  handleLocationChange: ( countingObject: CountingObject, newPosition: Vector2 ) => void;
  onEndDrag: ( droppedObject: CountingObject, positionPropertyType: PositionPropertyType ) => void;
};
type LocationCountingObjectNodeOptions = SelfOptions & WithRequired<NodeOptions, 'tandem'> & StrictOmit<NodeOptions, 'children'>;

const IMAGE_WIDTH = 40;
const ONE_CARD_HEIGHT = 55;
const DRAG_BOUNDS_MARGIN = 2;
export default class LocationCountingObjectNode extends InteractiveHighlightingNode {
  public static readonly WIDTH = IMAGE_WIDTH;
  public static readonly HEIGHT = ONE_CARD_HEIGHT;
  public static readonly DRAG_BOUNDS = NumberPairsConstants.COUNTING_AREA_BOUNDS.erodedXY(
    IMAGE_WIDTH / 2 + DRAG_BOUNDS_MARGIN,
    ONE_CARD_HEIGHT / 2 + DRAG_BOUNDS_MARGIN
  );

  public constructor(
    countingObject: CountingObject,
    countingRepresentationTypeProperty: Property<RepresentationType>,
    providedOptions: LocationCountingObjectNodeOptions
  ) {

    const appleNode = new Image( apple_svg, {
      maxWidth: IMAGE_WIDTH,
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, RepresentationType.APPLES )
    } );

    // Create the one card.
    const oneCardNode = new OneCard( IMAGE_WIDTH, ONE_CARD_HEIGHT, 40, {
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, RepresentationType.ONE_CARDS )
    } );

    const soccerBallNode = new Image( soccerball_svg, {
      maxWidth: IMAGE_WIDTH,
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, RepresentationType.SOCCER_BALLS )
    } );
    const butterflyNode = new Image( butterfly_svg, {
      maxWidth: IMAGE_WIDTH,
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, RepresentationType.BUTTERFLIES )
    } );


    const options = optionize<LocationCountingObjectNodeOptions, SelfOptions, NodeOptions>()( {
      children: [ appleNode, oneCardNode, soccerBallNode, butterflyNode ],
      cursor: 'pointer',
      touchArea: new Bounds2( 0, 0, IMAGE_WIDTH, ONE_CARD_HEIGHT ).dilate( 5 )
    }, providedOptions );
    super( options );

    countingObject.locationOpacityProperty.link( opacity => {
      this.opacity = opacity;
    } );

    appleNode.center = this.center;
    oneCardNode.center = this.center;
    soccerBallNode.center = this.center;
    butterflyNode.center = this.center;

    const dragListener = new SoundDragListener( {
      start: () => {
        countingObject.isDraggingProperty.value = true;
        this.moveToFront();
      },
      end: () => {
        countingObject.isDraggingProperty.value = false;
        options.onEndDrag( countingObject, 'location' );
      },
      dragBoundsProperty: new Property( LocationCountingObjectNode.DRAG_BOUNDS, {} ),
      positionProperty: countingObject.locationPositionProperty,
      tandem: providedOptions.tandem.createTandem( 'dragListener' ),
      useParentOffset: true
    } );
    this.addInputListener( dragListener );

    countingObject.locationPositionProperty.link( position => {
      this.center = position;
      !isSettingPhetioStateProperty.value && !isResettingAllProperty.value && providedOptions.handleLocationChange( countingObject, position );
    } );
  }
}

numberPairs.register( 'LocationCountingObjectNode', LocationCountingObjectNode );