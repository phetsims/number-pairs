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
import Multilink from '../../../../axon/js/Multilink.js';
import dotRandom from '../../../../dot/js/dotRandom.js';

type LocationCountingObjectsLayerNodeOptions = WithRequired<NodeOptions, 'tandem'>;
export default class LocationCountingObjectsLayerNode extends Node {

  private readonly leftCountingAreaBounds: Bounds2;
  private readonly rightCountingAreaBounds: Bounds2;

  public constructor( private readonly model: NumberPairsModel, countingAreaBounds: Bounds2, providedOptions: LocationCountingObjectsLayerNodeOptions ) {

    super( providedOptions );

    this.leftCountingAreaBounds = countingAreaBounds.withOffsets( 0, 0, -countingAreaBounds.width / 2, 0 );
    this.rightCountingAreaBounds = countingAreaBounds.withOffsets( -countingAreaBounds.width / 2, 0, 0, 0 );

    model.countingObjects.forEach( countingObject => {
      this.addChild( new LocationCountingObjectNode( countingObject, countingAreaBounds, model.countingRepresentationTypeProperty, {
        handleLocationChange: this.handleLocationChange.bind( this ),
        visibleProperty: new DerivedProperty( [ countingObject.addendTypeProperty ],
          addendType => addendType !== AddendType.INACTIVE ),
        tandem: providedOptions.tandem.createTandem( `locationCountingObjectNode${countingObject.id}` )
      } ) );
    } );

    Multilink.multilink( [ model.leftAddendCountingObjectsProperty, model.rightAddendCountingObjectsProperty ],
      ( leftAddendCountingObjects, rightAddendCountingObjects ) => {
        leftAddendCountingObjects.forEach( countingObject => {
          this.updateLocation( countingObject, AddendType.LEFT );
        } );
        rightAddendCountingObjects.forEach( countingObject => {
          this.updateLocation( countingObject, AddendType.RIGHT );
        } );
      } );
  }

  /**
   *
   * @param countingObject
   * @param addendType - We do not want to rely on listener order and therefore the addendType is passed in.
   */
  public updateLocation( countingObject: CountingObject, addendType: AddendType ): void {
    const addendBounds = ( addendType === AddendType.LEFT ? this.leftCountingAreaBounds : this.rightCountingAreaBounds ).dilated( -20 );

    // Check to see if the countingObject is already in the correct addend area. If it is, we do not want to move it.
    if ( !addendBounds.containsPoint( countingObject.locationPositionProperty.value ) ) {
      countingObject.locationPositionProperty.value = dotRandom.nextPointInBounds( addendBounds );
    }
  }

  public handleLocationChange( countingObject: CountingObject, newPosition: Vector2 ): void {
    const leftAddendCountingObjects = this.model.leftAddendCountingObjectsProperty.value;
    const rightAddendCountingObjects = this.model.rightAddendCountingObjectsProperty.value;
    if ( this.leftCountingAreaBounds.containsPoint( newPosition ) && !leftAddendCountingObjects.includes( countingObject ) ) {
      rightAddendCountingObjects.remove( countingObject );
      leftAddendCountingObjects.add( countingObject );
    }
    else if ( this.rightCountingAreaBounds.containsPoint( newPosition ) && !rightAddendCountingObjects.includes( countingObject ) ) {

      // Add the countingObject to the right addend array first to avoid duplicate work being done when the left addend
      // value is updated in the ObservableArray.lengthProperty listener.
      rightAddendCountingObjects.add( countingObject );
      leftAddendCountingObjects.remove( countingObject );
    }
  }
}

numberPairs.register( 'LocationCountingObjectsLayerNode', LocationCountingObjectsLayerNode );