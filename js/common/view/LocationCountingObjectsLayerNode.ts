// Copyright 2024, University of Colorado Boulder

/**
 * The LocationCountingObjectsLayerNode creates all the location counting object nodes.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import LocationCountingObjectNode from './LocationCountingObjectNode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import { COUNTING_AREA_MARGIN } from './CountingAreaNode.js';

type LocationCountingObjectsLayerNodeOptions = WithRequired<NodeOptions, 'tandem'>;
export default class LocationCountingObjectsLayerNode extends Node {

  private readonly leftCountingAreaBounds: Bounds2;
  private readonly rightCountingAreaBounds: Bounds2;

  public constructor( private readonly model: NumberPairsModel, countingAreaBounds: Bounds2, providedOptions: LocationCountingObjectsLayerNodeOptions ) {

    super( providedOptions );

    this.leftCountingAreaBounds = countingAreaBounds.withOffsets( 0, 0, -countingAreaBounds.width / 2, 0 );
    this.rightCountingAreaBounds = countingAreaBounds.withOffsets( -countingAreaBounds.width / 2, 0, 0, 0 );

    model.countingObjects.forEach( countingObject => {

      // Update the location of the countingObject when the addendType changes as long as it is not being dragged.
      countingObject.addendTypeProperty.link( addendType => {
        if ( !countingObject.draggingProperty.value && addendType !== AddendType.INACTIVE ) {
          this.updateLocation( countingObject, addendType );
        }
      } );
      this.addChild( new LocationCountingObjectNode( countingObject, countingAreaBounds, model.representationTypeProperty, {
        handleLocationChange: this.handleLocationChange.bind( this ),
        onDrop: model.dropCountingObject.bind( model ),
        visibleProperty: new DerivedProperty( [ countingObject.addendTypeProperty, model.leftAddendVisibleProperty,
            model.rightAddendVisibleProperty, countingObject.draggingProperty ],
          ( addendType, leftVisible, rightVisible, dragging ) =>
            dragging || ( addendType !== AddendType.INACTIVE && ( addendType === AddendType.LEFT ? leftVisible : rightVisible ) ) ),
        tandem: providedOptions.tandem.createTandem( `locationCountingObjectNode${countingObject.id}` )
      } ) );
    } );

  }

  /**
   * Update the location of the countingObject to be within the correct addend area.
   * @param countingObject
   * @param addendType - We do not want to rely on listener order and therefore the addendType is passed in.
   */
  public updateLocation( countingObject: CountingObject, addendType: AddendType ): void {
    const addendBounds = ( addendType === AddendType.LEFT ? this.leftCountingAreaBounds : this.rightCountingAreaBounds ).dilated( -20 );

    // Check to see if the countingObject is already in the correct addend area. If it is, we do not want to move it.
    if ( !addendBounds.containsPoint( countingObject.locationPositionProperty.value ) ) {
      countingObject.locationPositionProperty.value = dotRandom.sample( this.model.getGridCoordinates( addendBounds, COUNTING_AREA_MARGIN, COUNTING_AREA_MARGIN, 6 ) );
    }
  }

  /**
   * As the counting object changes location, we need to update the addend arrays.
   * @param countingObject
   * @param newPosition
   */
  public handleLocationChange( countingObject: CountingObject, newPosition: Vector2 ): void {
    const leftAddendCountingObjects = this.model.leftAddendCountingObjectsProperty.value;
    const rightAddendCountingObjects = this.model.rightAddendCountingObjectsProperty.value;
    if ( this.leftCountingAreaBounds.containsPoint( newPosition ) && !leftAddendCountingObjects.includes( countingObject ) ) {
      countingObject.traverseInactiveObjects = false;
      rightAddendCountingObjects.remove( countingObject );
      leftAddendCountingObjects.add( countingObject );
      countingObject.traverseInactiveObjects = true;
    }
    else if ( this.rightCountingAreaBounds.containsPoint( newPosition ) && !rightAddendCountingObjects.includes( countingObject ) ) {

      // Add the countingObject to the right addend array first to avoid duplicate work being done when the left addend
      // value is updated in the ObservableArray.lengthProperty listener.
      countingObject.traverseInactiveObjects = false;
      rightAddendCountingObjects.add( countingObject );
      leftAddendCountingObjects.remove( countingObject );
      countingObject.traverseInactiveObjects = true;
    }
  }
}

numberPairs.register( 'LocationCountingObjectsLayerNode', LocationCountingObjectsLayerNode );