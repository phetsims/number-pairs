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
import dotRandom from '../../../../dot/js/dotRandom.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';

type LocationCountingObjectNodeOptions = WithRequired<NodeOptions, 'tandem'>;

// TODO: Right now the position is not affecting the addend at all. That needs to happen next.
export default class LocationCountingObjectNode extends Node {
  public constructor(
    model: CountingObject,
    dragBounds: Bounds2,
    countingRepresentationTypeProperty: Property<CountingRepresentationType>,
    providedOptions: LocationCountingObjectNodeOptions
  ) {

    const apple = new Circle( 10, {
      fill: 'red',
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, CountingRepresentationType.APPLES )
    } );
    const oneCard = new Rectangle( 0, 0, 20, 30, {
      fill: 'white',
      stroke: 'black',
      cornerRadius: 5,
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, CountingRepresentationType.ONE_CARDS )
    } );
    const soccerBall = new Circle( 10, {
      fill: 'white',
      stroke: 'black',
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, CountingRepresentationType.SOCCER_BALLS )
    } );
    const butterfly = new Circle( 10, {
      fill: 'orange',
      visibleProperty: DerivedProperty.valueEqualsConstant( countingRepresentationTypeProperty, CountingRepresentationType.BUTTERFLIES )
    } );

    // Make sure that the initial position is within the drag bounds
    // TODO: Grab widest image for bounds dilation.
    const dilatedDragBounds = dragBounds.dilatedXY( -20, -20 );
    model.positionProperty.value = dotRandom.nextPointInBounds( dilatedDragBounds );

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
        positionProperty: model.positionProperty,
        tandem: providedOptions.tandem.createTandem( 'dragListener' )
      },
      keyboardDragListenerOptions: {
        tandem: providedOptions.tandem.createTandem( 'keyboardDragListener' )
      }
    } );
    this.addInputListener( dragListener );

    model.positionProperty.link( position => {
      this.center = position;
    } );
  }
}

numberPairs.register( 'LocationCountingObjectNode', LocationCountingObjectNode );