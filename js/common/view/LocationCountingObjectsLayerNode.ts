// Copyright 2024, University of Colorado Boulder

/**
 * The LocationCountingObjectsLayerNode creates all the location counting object nodes.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { KeyboardListener, Node, NodeOptions } from '../../../../scenery/js/imports.js';
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
import GroupSelectView from '../../../../scenery-phet/js/accessibility/group-sort/view/GroupSelectView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Shape } from '../../../../kite/js/imports.js';

type LocationCountingObjectsLayerNodeOptions = WithRequired<NodeOptions, 'tandem'>;

// A list of all keys that are listened to, except those covered by the numberKeyMapper
const KEYBOARD_INTERACTION_KEYS = [
  'd', 'arrowRight', 'a', 'arrowLeft', 'arrowUp', 'arrowDown', 'w', 's', // default-step select/drag
  'shift+d', 'shift+arrowRight', 'shift+a', 'shift+arrowLeft', 'shift+arrowUp', 'shift+arrowDown', 'shift+w', 'shift+s', // shift-step select/drag
  'pageUp', 'pageDown', // page-step select/drag
  'home', 'end' // min/max select/switch addends
] as const;
export default class LocationCountingObjectsLayerNode extends Node {

  private readonly leftCountingAreaBounds: Bounds2;
  private readonly rightCountingAreaBounds: Bounds2;
  private readonly countingObjectModelToNodeMap = new Map<CountingObject, LocationCountingObjectNode>();

  public constructor( private readonly model: NumberPairsModel, countingAreaBounds: Bounds2, providedOptions: LocationCountingObjectsLayerNodeOptions ) {

    const options = optionize<LocationCountingObjectsLayerNodeOptions, EmptySelfOptions, NodeOptions>()( {
      accessibleName: 'Location Counting Objects'
    }, providedOptions );

    super( options );

    this.leftCountingAreaBounds = countingAreaBounds.withOffsets( 0, 0, -countingAreaBounds.width / 2, 0 );
    this.rightCountingAreaBounds = countingAreaBounds.withOffsets( -countingAreaBounds.width / 2, 0, 0, 0 );

    model.countingObjects.forEach( countingObject => {

      // Update the location of the countingObject when the addendType changes as long as it is not being dragged.
      countingObject.addendTypeProperty.link( addendType => {
        if ( !countingObject.draggingProperty.value ) {
          const addendBounds = ( addendType === AddendType.LEFT ? this.leftCountingAreaBounds : this.rightCountingAreaBounds ).dilated( -20 );
          if ( addendType === AddendType.LEFT && !addendBounds.containsPoint( countingObject.locationPositionProperty.value ) ) {

            // we do not want to rely on listener order, therefore we find the counting objects based on our addend
            // value rather than other Properties
            const leftAddendCountingObjects = model.countingObjects.filter(
              countingObject => countingObject.addendTypeProperty.value === AddendType.LEFT );
            const gridCoordinates = this.getAvailableGridCoordinates( leftAddendCountingObjects, addendBounds );
            countingObject.locationPositionProperty.value = dotRandom.sample( gridCoordinates );
          }
          else if ( addendType === AddendType.RIGHT && !addendBounds.containsPoint( countingObject.locationPositionProperty.value ) ) {

            // we do not want to rely on listener order, therefore we find the counting objects based on our addend
            // value rather than other Properties
            const rightAddendCountingObjects = model.countingObjects.filter(
              countingObject => countingObject.addendTypeProperty.value === AddendType.RIGHT );
            const gridCoordinates = this.getAvailableGridCoordinates( rightAddendCountingObjects, addendBounds );
            countingObject.locationPositionProperty.value = dotRandom.sample( gridCoordinates );
          }

        }
      } );
      const countingObjectNode = new LocationCountingObjectNode( countingObject, countingAreaBounds, model.representationTypeProperty, {
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

    /**
     * Implement keyboard navigation for the counting objects using GroupSortInteraction.
     */
    const groupSelectModel = model.groupSelectModel;
    const groupSelectView = new GroupSelectView<CountingObject, LocationCountingObjectNode>( groupSelectModel, this, {
      getGroupItemToSelect: () => {
        const grid = model.getCountingObjectsInGridFormation( countingAreaBounds );
        if ( _.every( grid, row => row.length === 0 ) ) {
          return null;
        }
        else {
          return grid.find( row => row.length > 0 )![ 0 ];
        }
      },
      getNodeFromModelItem: countingObject => this.countingObjectModelToNodeMap.get( countingObject )!
    } );

    const keyboardListener = new KeyboardListener( {
      fireOnHold: true,
      keys: KEYBOARD_INTERACTION_KEYS,
      fire: ( event, keysPressed ) => {
        const groupItem = groupSelectModel.selectedGroupItemProperty.value;
        if ( groupItem !== null ) {
          if ( !groupSelectModel.isGroupItemKeyboardGrabbedProperty.value ) {
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
          }
           else {
            /**
             * We are now dragging and need to forward to a keyboard drag listener while maintaining focus on the group.
             */
          }
        }
      }
    } );
    groupSelectView.groupSortGroupFocusHighlightPath.shape = Shape.bounds( countingAreaBounds );

    this.addInputListener( keyboardListener );

  }

  private getAvailableGridCoordinates( countingObjects: CountingObject[], addendBounds: Bounds2 ): Vector2[] {
    const gridCoordinates = this.model.getGridCoordinates( addendBounds, COUNTING_AREA_MARGIN, COUNTING_AREA_MARGIN, 6 );
    return gridCoordinates.filter( gridCoordinate => countingObjects.every( countingObject =>
        countingObject.locationPositionProperty.value.x !== gridCoordinate.x ||
        countingObject.locationPositionProperty.value.y !== gridCoordinate.y ) );
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
    if ( this.leftCountingAreaBounds.containsPoint( newPosition ) &&
         !leftAddendCountingObjects.includes( countingObject ) &&
         rightAddendCountingObjects.includes( countingObject ) ) {
      countingObject.traverseInactiveObjects = false;
      rightAddendCountingObjects.remove( countingObject );
      leftAddendCountingObjects.add( countingObject );
      countingObject.traverseInactiveObjects = true;
    }
    else if ( this.rightCountingAreaBounds.containsPoint( newPosition ) &&
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
}

numberPairs.register( 'LocationCountingObjectsLayerNode', LocationCountingObjectsLayerNode );