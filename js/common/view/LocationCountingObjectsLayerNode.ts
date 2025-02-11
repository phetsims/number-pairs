// Copyright 2024-2025, University of Colorado Boulder

/**
 * The LocationCountingObjectsLayerNode creates all the location counting object nodes.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import CountingAreaNode from './CountingAreaNode.js';
import GroupSelectDragInteractionView from './GroupSelectDragInteractionView.js';
import LocationCountingObjectNode from './LocationCountingObjectNode.js';

type LocationCountingObjectsLayerNodeOptions = WithRequired<NodeOptions, 'tandem'>;

const LEFT_COUNTING_AREA_BOUNDS = NumberPairsConstants.LEFT_COUNTING_AREA_BOUNDS;
const RIGHT_COUNTING_AREA_BOUNDS = NumberPairsConstants.RIGHT_COUNTING_AREA_BOUNDS;
export default class LocationCountingObjectsLayerNode extends Node {
  private readonly countingObjectModelToNodeMap = new Map<CountingObject, LocationCountingObjectNode>();

  public constructor( private readonly model: NumberPairsModel, countingAreaNode: CountingAreaNode, providedOptions: LocationCountingObjectsLayerNodeOptions ) {

    const options = optionize<LocationCountingObjectsLayerNodeOptions, EmptySelfOptions, NodeOptions>()( {
      accessibleName: NumberPairsStrings.locationCountingObjectsStringProperty
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
    const groupSelectView = new GroupSelectDragInteractionView( groupSelectModel, this, this.countingObjectModelToNodeMap, {
      soundKeyboardDragListenerOptions: {
        dragSpeed: 180,
        shiftDragSpeed: 90,
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

        // Find the direction of the traversal by finding the slope for the currentPoint(0, 0) and the
        // delta created by the arrow keys (1, 0) for right, (-1, 0), etc.
        const startingPoint = groupItem.locationPositionProperty.value;
        const delta = this.getKeysDelta( keysPressed );
        const countingObjectsInDirection = model.countingObjects.filter( countingObject =>
          countingObject.addendTypeProperty.value !== AddendType.INACTIVE &&
          countingObject.locationPositionProperty.value.dot( delta ) > groupItem.locationPositionProperty.value.dot( delta ) );

        let selectedGroupItem = groupItem;

        // Return all counting objects in the above calculated direction. (if none stay where we are)
        // TODO: Refine to only include counting objects within the 90 degree angle of the direction. Currently
        //  is defaulting to 180 degrees.
        if ( countingObjectsInDirection.length > 0 ) {
          countingObjectsInDirection.sort( ( a, b ) =>
            a.locationPositionProperty.value.distance( startingPoint ) - b.locationPositionProperty.value.distance( startingPoint ) );

          const coordinate = Utils.clamp( delta.x === 0 ? Math.abs( delta.y ) : Math.abs( delta.x ), 0, countingObjectsInDirection.length );
          selectedGroupItem = countingObjectsInDirection[ coordinate - 1 ];
        }
        return selectedGroupItem;
      },
      handleHomeEndKeysDuringDrag: ( keysPressed, groupItem ) => {
        const currentPosition = groupItem.locationPositionProperty.value;
        if ( keysPressed.includes( 'home' ) ) {

          // If we're already in the left addend area move to the furthest edge.
          if ( LEFT_COUNTING_AREA_BOUNDS.containsPoint( currentPosition ) ) {
            const newXValue = LEFT_COUNTING_AREA_BOUNDS.left + LocationCountingObjectNode.WIDTH;
            groupItem.locationPositionProperty.value = new Vector2( newXValue, currentPosition.y );
          }
          else {
            // move to the left addend area.
            const newXValue = LEFT_COUNTING_AREA_BOUNDS.right - LocationCountingObjectNode.WIDTH;
            groupItem.locationPositionProperty.value = new Vector2( newXValue, currentPosition.y );
          }
        }
        else if ( keysPressed.includes( 'end' ) ) {

          // If we're already in the right addend area move to the furthest edge.
          if ( RIGHT_COUNTING_AREA_BOUNDS.containsPoint( currentPosition ) ) {
            const newXValue = RIGHT_COUNTING_AREA_BOUNDS.right - LocationCountingObjectNode.WIDTH;
            groupItem.locationPositionProperty.value = new Vector2( newXValue, currentPosition.y );
          }
          else {
            // move to the right addend area.
            const newXValue = RIGHT_COUNTING_AREA_BOUNDS.left + LocationCountingObjectNode.WIDTH;
            groupItem.locationPositionProperty.value = new Vector2( newXValue, currentPosition.y );
          }
        }
      },
      tandem: options.tandem.createTandem( 'groupSelectView' )
    } );
    groupSelectView.groupSortGroupFocusHighlightPath.shape = Shape.bounds( NumberPairsConstants.COUNTING_AREA_BOUNDS );
    groupSelectView.grabReleaseCueNode.centerBottom = NumberPairsConstants.COUNTING_AREA_BOUNDS.centerTop.plus( new Vector2( 0, 10 ) );
    model.groupSelectLocationObjectsModel.isGroupItemKeyboardGrabbedProperty.link( isGrabbed => {
      if ( !isGrabbed && model.groupSelectLocationObjectsModel.selectedGroupItemProperty.value ) {
        countingAreaNode.dropCountingObject( model.groupSelectLocationObjectsModel.selectedGroupItemProperty.value, 'location' );
      }
    } );

    /**
     * Create the LocationCountingObjectNodes for each countingObject in the model.
     */
    model.countingObjects.forEach( countingObject => {
      const countingObjectNode = new LocationCountingObjectNode( countingObject, NumberPairsConstants.COUNTING_AREA_BOUNDS, model.representationTypeProperty, {
        handleLocationChange: this.handleLocationChange.bind( this ),
        onEndDrag: countingAreaNode.dropCountingObject.bind( countingAreaNode ),
        visibleProperty: new DerivedProperty( [ countingObject.addendTypeProperty, countingObject.locationPositionProperty, model.leftAddendVisibleProperty,
            model.rightAddendVisibleProperty, countingObject.isDraggingProperty ],
          ( addendType, locationPosition, leftVisible, rightVisible, dragging ) => {
            const leftBounds = NumberPairsConstants.LEFT_COUNTING_AREA_BOUNDS;
            return dragging || ( addendType !== AddendType.INACTIVE && ( leftBounds.containsPoint( locationPosition ) ? leftVisible : rightVisible ) );
          } ),
        tandem: providedOptions.tandem.createTandem( `locationCountingObjectNode${countingObject.id}` )
      } );
      this.addChild( countingObjectNode );
      this.countingObjectModelToNodeMap.set( countingObject, countingObjectNode );
    } );
    model.groupSelectLocationObjectsModel.selectedGroupItemProperty.link( selectedGroupItem => {
      selectedGroupItem && this.countingObjectModelToNodeMap.get( selectedGroupItem )?.moveToFront();
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
      default:
        return new Vector2( 0, 0 );
    }
  }
}

numberPairs.register( 'LocationCountingObjectsLayerNode', LocationCountingObjectsLayerNode );