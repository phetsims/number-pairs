// Copyright 2024, University of Colorado Boulder

/**
 * The LocationCountingObjectsLayerNode creates all the location counting object nodes.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import GroupSelectDragInteractionView from './GroupSelectDragInteractionView.js';
import Utils from '../../../../dot/js/Utils.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import LocationCountingObjectNode from './LocationCountingObjectNode.js';
import NumberPairsConstants from '../NumberPairsConstants.js';

type LocationCountingObjectsLayerNodeOptions = WithRequired<NodeOptions, 'tandem'>;


export default class LocationCountingObjectsLayerNode extends Node {
  private readonly countingObjectModelToNodeMap = new Map<CountingObject, LocationCountingObjectNode>();

  public constructor( private readonly model: NumberPairsModel, providedOptions: LocationCountingObjectsLayerNodeOptions ) {

    const options = optionize<LocationCountingObjectsLayerNodeOptions, EmptySelfOptions, NodeOptions>()( {
      accessibleName: 'Location Counting Objects'
    }, providedOptions );

    super( options );

    /**
     * Implement keyboard navigation for the counting objects using GroupSortInteraction.
     */
    const groupSelectModel = model.groupSelectLocationObjectsModel;
    const selectedItemPositionProperty = new DynamicProperty<Vector2, Vector2, CountingObject>( groupSelectModel.selectedGroupItemProperty, {
      derive: countingObject => countingObject.locationPositionProperty,
      bidirectional: true
    } );
    const groupSelectView = new GroupSelectDragInteractionView( groupSelectModel, model, this, this.countingObjectModelToNodeMap, {
      soundKeyboardDragListenerOptions: {
        positionProperty: selectedItemPositionProperty
      },
      getGroupItemToSelect: () => {
        const countingObjects = model.getCountingObjectsSortedByLocationPosition();
        if ( countingObjects.length === 0 ) {
          return null;
        }
        else {
          return countingObjects[ 0 ];
        }
      },
      getNextSelectedGroupItemFromPressedKeys: ( keysPressed, groupItem ) => {
        /**
         * Algorithm to search for the next group item to select.
         *
         * 1. Find the direction of the traversal by finding the slope for the currentPoint(0, 0) and the
         * delta created by the arrow keys (1, 0) for right, (-1, 0), etc. The use the slope to calculate the angle.
         * 2. Return all counting objects in the above calculated direction. (if none stay where we are)
         * 3. Filter to objects within the 90-degree angle of the direction.
         * 4. If the 90 degree filter is empty return to step 2 and find the next closest object.
         * 5. If the 90 degree filter is not empty, find the closest object in the 90-degree filter.
         */

          // Find the direction of the traversal by finding the slope for the currentPoint(0, 0) and the
          // delta created by the arrow keys (1, 0) for right, (-1, 0), etc.
        const startingPoint = groupItem.locationPositionProperty.value;
        const delta = this.getKeysDelta( keysPressed );
        const countingObjectsInDirection = model.countingObjects.filter( countingObject =>
          countingObject.addendTypeProperty.value !== AddendType.INACTIVE &&
          countingObject.locationPositionProperty.value.dot( delta ) > groupItem.locationPositionProperty.value.dot( delta ) );

        let selectedGroupItem = groupItem;
        if ( countingObjectsInDirection.length > 0 ) {
          countingObjectsInDirection.sort( ( a, b ) =>
            a.locationPositionProperty.value.distance( startingPoint ) - b.locationPositionProperty.value.distance( startingPoint ) );

          const coordinate = Utils.clamp( delta.x === 0 ? Math.abs( delta.y ) : Math.abs( delta.x ), 0, countingObjectsInDirection.length );
          selectedGroupItem = countingObjectsInDirection[ coordinate - 1 ];
        }
        return selectedGroupItem;
      },
      tandem: options.tandem.createTandem( 'groupSelectView' )
    } );
    groupSelectView.groupSortGroupFocusHighlightPath.shape = Shape.bounds( NumberPairsConstants.COUNTING_AREA_BOUNDS );

    /**
     * Create the LocationCountingObjectNodes for each countingObject in the model.
     */
    model.countingObjects.forEach( countingObject => {
      const countingObjectNode = new LocationCountingObjectNode( countingObject, NumberPairsConstants.COUNTING_AREA_BOUNDS, model.representationTypeProperty, {
        handleLocationChange: this.handleLocationChange.bind( this ),
        onEndDrag: model.dropCountingObject.bind( model ),
        visibleProperty: new DerivedProperty( [ countingObject.addendTypeProperty, model.leftAddendVisibleProperty,
            model.rightAddendVisibleProperty, countingObject.draggingProperty ],
          ( addendType, leftVisible, rightVisible, dragging ) =>
            dragging || ( addendType !== AddendType.INACTIVE && ( addendType === AddendType.LEFT ? leftVisible : rightVisible ) ) ),
        tandem: providedOptions.tandem.createTandem( `locationCountingObjectNode${countingObject.id}` )
      } );
      this.addChild( countingObjectNode );
      this.countingObjectModelToNodeMap.set( countingObject, countingObjectNode );
    } );
  }

  /**
   * As the counting object changes location, we need to update the addend arrays.
   * @param countingObject
   * @param newPosition
   */
  public handleLocationChange( countingObject: CountingObject, newPosition: Vector2 ): void {
    const leftAddendCountingObjects = this.model.leftAddendCountingObjectsProperty.value;
    const rightAddendCountingObjects = this.model.rightAddendCountingObjectsProperty.value;

    // If the countingObject is in the left addend area, remove it from the right addend area and add it to the
    // left addend area and vice versa.
    // This function will no-op if the countingObject is not in the left or right addend area, or if it is already in
    // the correct countingObject array.
    if ( NumberPairsConstants.LEFT_COUNTING_AREA_BOUNDS.containsPoint( newPosition ) &&
         !leftAddendCountingObjects.includes( countingObject ) &&
         rightAddendCountingObjects.includes( countingObject ) ) {
      countingObject.traverseInactiveObjects = false;
      rightAddendCountingObjects.remove( countingObject );
      leftAddendCountingObjects.add( countingObject );
      countingObject.traverseInactiveObjects = true;
    }
    else if ( NumberPairsConstants.RIGHT_COUNTING_AREA_BOUNDS.containsPoint( newPosition ) &&
              !rightAddendCountingObjects.includes( countingObject ) &&
              leftAddendCountingObjects.includes( countingObject ) ) {

      // Add the countingObject to the right addend array first to avoid duplicate work being done when the left addend
      // value is updated in the ObservableArray.lengthProperty listener.
      countingObject.traverseInactiveObjects = false;
      rightAddendCountingObjects.add( countingObject );
      leftAddendCountingObjects.remove( countingObject );
      countingObject.traverseInactiveObjects = true;
    }
  }

  private getKeysDelta( keysPressed: string ): Vector2 {
    switch( keysPressed ) {
      case 'd':
      case 'arrowRight':
        return new Vector2( 1, 0 );
      case 'a':
      case 'arrowLeft':
        return new Vector2( -1, 0 );
      case 'w':
      case 'arrowUp':
        return new Vector2( 0, -1 );
      case 's':
      case 'arrowDown':
        return new Vector2( 0, 1 );
      case 'shift+d':
      case 'shift+arrowRight':
        return new Vector2( 2, 0 );
      case 'shift+a':
      case 'shift+arrowLeft':
        return new Vector2( -2, 0 );
      case 'shift+w':
      case 'shift+arrowUp':
        return new Vector2( 0, -2 );
      case 'shift+s':
      case 'shift+arrowDown':
        return new Vector2( 0, 2 );
      default:
        return new Vector2( 0, 0 );
    }
  }
}

numberPairs.register( 'LocationCountingObjectsLayerNode', LocationCountingObjectsLayerNode );