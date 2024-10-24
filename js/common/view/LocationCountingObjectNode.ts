// Copyright 2024, University of Colorado Boulder

/**
 * The LocationCountingObjectNode is the view for the individual objects users can interact with to explore the
 * decomposition of a number. It can take the form of an apple, one card, soccer ball, or butterfly
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Circle, Node, NodeOptions, Rectangle, RichDragListener } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import CountingObject from '../model/CountingObject.js';
import { CountingRepresentationType } from '../model/NumberPairsModel.js';
import Property from '../../../../axon/js/Property.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';

type SelfOptions = {
  handleLocationChange: ( countingObject: CountingObject, newPosition: Vector2 ) => void;
};
type LocationCountingObjectNodeOptions = SelfOptions & WithRequired<NodeOptions, 'tandem'>;

// TODO: Right now the position is not affecting the addend at all. That needs to happen next.
export default class LocationCountingObjectNode extends Node {
  public constructor(
    model: CountingObject,
    dragBounds: Bounds2,
    countingRepresentationTypeProperty: Property<CountingRepresentationType>,
    providedOptions: LocationCountingObjectNodeOptions
  ) {

    const apple = new Circle( 20, {
      fill: 'red',
      stroke: 'black',
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, CountingRepresentationType.APPLES )
    } );
    const oneCard = new Rectangle( 0, 0, 40, 55, {
      fill: 'white',
      stroke: 'black',
      cornerRadius: 5,
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, CountingRepresentationType.ONE_CARDS )
    } );
    const soccerBall = new Circle( 20, {
      fill: 'white',
      stroke: 'black',
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, CountingRepresentationType.SOCCER_BALLS )
    } );
    const butterfly = new Circle( 20, {
      fill: 'orange',
      stroke: 'black',
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, CountingRepresentationType.BUTTERFLIES )
    } );

    // TODO: Grab widest image for bounds dilation.
    const dilatedDragBounds = dragBounds.dilatedXY( -20, -20 );

    const superOptions = combineOptions<NodeOptions>( {
      children: [ apple, oneCard, soccerBall, butterfly ]
    }, providedOptions );
    super( superOptions );

    apple.center = this.center;
    oneCard.center = this.center;
    soccerBall.center = this.center;
    butterfly.center = this.center;

    const dragListener = new RichDragListener( {
      dragListenerOptions: {
        dragBoundsProperty: new Property( dilatedDragBounds, {} ),
        positionProperty: model.locationPositionProperty,
        tandem: providedOptions.tandem.createTandem( 'dragListener' ),
        start: () => {
          model.draggingProperty.value = true;
        },
        end: () => {
          model.draggingProperty.value = false;
        }
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