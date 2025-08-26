// Copyright 2024-2025, University of Colorado Boulder

/**
 * The LocationCountingObjectsLayerNode creates all the location counting object nodes.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import { NumberPairsUtils } from '../model/NumberPairsUtils.js';
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
      accessibleName: NumberPairsFluent.a11y.locationCountingObjectsStringProperty,
      accessibleHelpText: NumberPairsFluent.a11y.locationCountingObjectsHelpTextStringProperty
    }, providedOptions );

    super( options );

    /**
     * Create the LocationCountingObjectNodes for each countingObject in the model.
     */
    model.countingObjects.forEach( countingObject => {
      const countingObjectNode = new LocationCountingObjectNode( countingObject, model.representationTypeProperty, {
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

    /**
     * Implement keyboard navigation for the counting objects using GroupSortInteraction. Implement this after creating
     * the counting object nodes so that we have access to them within the GroupSelectView.
     */
    const groupSelectModel = model.groupSelectLocationObjectsModel;
    const selectedItemPositionProperty = new DynamicProperty<Vector2, Vector2, CountingObject>( groupSelectModel.selectedGroupItemProperty, {
      derive: countingObject => countingObject.locationPositionProperty,
      bidirectional: true
    } );
    const groupSelectView = new GroupSelectDragInteractionView( groupSelectModel, this, selectedItemPositionProperty,
      this.countingObjectModelToNodeMap, {
        soundKeyboardDragListenerOptions: {
          dragDelta: 15,
          shiftDragDelta: 8,
          dragBoundsProperty: new Property( LocationCountingObjectNode.DRAG_BOUNDS )
        },
        getGroupItemToSelect: () => {
          const countingObjects = model.getCountingObjectsSortedByLocationPosition().filter( countingObject =>
            this.countingObjectModelToNodeMap.get( countingObject )!.visible
          );
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
            countingObject.locationPositionProperty.value.dot( delta ) > groupItem.locationPositionProperty.value.dot( delta )
            && this.countingObjectModelToNodeMap.get( countingObject )!.visible );

          let selectedGroupItem = groupItem;

          // Return the closest counting object in the above calculated direction. (if none stay where we are)
          if ( countingObjectsInDirection.length > 0 ) {
            countingObjectsInDirection.sort( ( a, b ) =>
              a.locationPositionProperty.value.distance( startingPoint ) - b.locationPositionProperty.value.distance( startingPoint ) );

            selectedGroupItem = countingObjectsInDirection[ 0 ];
          }
          return selectedGroupItem;
        },
        handleHomeEndKeysDuringDrag: ( keysPressed, groupItem ) => {
          const currentPosition = groupItem.locationPositionProperty.value;
          if ( keysPressed.includes( 'home' ) ) {

            // move to the left addend area.
            if ( !LEFT_COUNTING_AREA_BOUNDS.containsPoint( currentPosition ) ) {
              groupItem.locationPositionProperty.value = NumberPairsUtils.mirrorPositionAcrossCountingArea( currentPosition, -1 );
            }
          }
          else if ( keysPressed.includes( 'end' ) ) {

            // move to the right addend area.
            if ( !RIGHT_COUNTING_AREA_BOUNDS.containsPoint( currentPosition ) ) {
              groupItem.locationPositionProperty.value = NumberPairsUtils.mirrorPositionAcrossCountingArea( currentPosition, 1 );
            }
          }
        },
        tandem: options.tandem.createTandem( 'groupSelectView' )
      } );
    groupSelectView.groupSortGroupFocusHighlightPath.shape = Shape.bounds( NumberPairsConstants.COUNTING_AREA_BOUNDS );
    groupSelectView.grabReleaseCueNode.centerTop = NumberPairsConstants.COUNTING_AREA_BOUNDS.centerTop.plusXY( 0, 50 );

    const itemsStringProperty = new DynamicProperty<string, unknown, unknown>( new DerivedProperty( [ this.model.representationTypeProperty ], representation =>
      representation.accessibleName ) );
    const itemStringProperty = new DynamicProperty<string, unknown, unknown>( new DerivedProperty( [ this.model.representationTypeProperty ], representation =>
      representation.singularAccessibleName ) );

    const navigatePatternStringProperty = NumberPairsFluent.a11y.navigatePattern.createProperty( {
      items: itemsStringProperty
    } );
    const movePatternStringProperty = NumberPairsFluent.a11y.movePattern.createProperty( {
      item: itemStringProperty
    } );
    model.groupSelectLocationObjectsModel.isGroupItemKeyboardGrabbedProperty.link( isGrabbed => {

      // Link the isGrabbed property of the groupSelectLocationObjectsModel to the isDragging property of the
      // corresponding node. When we are no longer grabbed we want to go through the drop logic.
      const selectedGroupItem = model.groupSelectLocationObjectsModel.selectedGroupItemProperty.value;
      selectedGroupItem && selectedGroupItem.isDraggingProperty.set( isGrabbed );
      if ( !isGrabbed && selectedGroupItem ) {
        countingAreaNode.dropCountingObject( selectedGroupItem, 'location' );
      }

      this.accessibleName = isGrabbed ? movePatternStringProperty : navigatePatternStringProperty;
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