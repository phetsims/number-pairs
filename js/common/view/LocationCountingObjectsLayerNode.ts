// Copyright 2024-2025, University of Colorado Boulder

/**
 * The LocationCountingObjectsLayerNode creates all the location counting object nodes.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import CountingAreaNode from './CountingAreaNode.js';
import GrabDragDescriptionManager from './GrabDragDescriptionManager.js';
import LocationCountingObjectNode from './LocationCountingObjectNode.js';
import LocationGroupSelectDragInteractionView from './LocationGroupSelectDragInteractionView.js';

type LocationCountingObjectsLayerNodeOptions = StrictOmit<NodeOptions, 'children'> & PickRequired<NodeOptions, 'tandem'>;

export default class LocationCountingObjectsLayerNode extends Node {
  private readonly countingObjectModelToNodeMap = new Map<CountingObject, LocationCountingObjectNode>();

  public constructor( private readonly model: NumberPairsModel, countingAreaNode: CountingAreaNode, providedOptions: LocationCountingObjectsLayerNodeOptions ) {

    const options = optionize<LocationCountingObjectsLayerNodeOptions, EmptySelfOptions, NodeOptions>()( {}, providedOptions );

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
    const groupSelectView = new LocationGroupSelectDragInteractionView(
      groupSelectModel,
      this,
      model.leftAddendCountingObjectsProperty,
      model.rightAddendCountingObjectsProperty,
      this.countingObjectModelToNodeMap,
      options.tandem.createTandem( 'groupSelectView' )
    );
    groupSelectView.groupSortGroupFocusHighlightPath.shape = Shape.bounds( NumberPairsConstants.COUNTING_AREA_BOUNDS );
    groupSelectView.grabReleaseCueNode.centerTop = NumberPairsConstants.COUNTING_AREA_BOUNDS.centerTop.plusXY( 0, 50 );
    model.groupSelectLocationObjectsModel.isGroupItemKeyboardGrabbedProperty.link( isGrabbed => {

      // Link the isGrabbed property of the groupSelectLocationObjectsModel to the isDragging property of the
      // corresponding node. When we are no longer grabbed we want to go through the drop logic.
      const selectedGroupItem = model.groupSelectLocationObjectsModel.selectedGroupItemProperty.value;
      selectedGroupItem && selectedGroupItem.isDraggingProperty.set( isGrabbed );
      if ( !isGrabbed && selectedGroupItem ) {
        countingAreaNode.dropCountingObject( selectedGroupItem, 'location' );
      }
    } );

    model.groupSelectLocationObjectsModel.selectedGroupItemProperty.link( selectedGroupItem => {
      selectedGroupItem && this.countingObjectModelToNodeMap.get( selectedGroupItem )?.moveToFront();
    } );

    /**
     * Create the a11y description and help text.
     */
    const itemStringProperty = new DynamicProperty<string, unknown, unknown>(
      new DerivedProperty( [ this.model.representationTypeProperty ],
        representation => representation.singularAccessibleName ) );

    // There is no distinction between left and right item names, so we can use the same property for both.
    const grabDragDescriptionManager = new GrabDragDescriptionManager( itemStringProperty, itemStringProperty, itemStringProperty );
    this.accessibleName = grabDragDescriptionManager.createItemDescriptionProperty(
      model.groupSelectLocationObjectsModel.selectedGroupItemProperty,
      () => model.leftAddendCountingObjectsProperty.value,
      () => model.rightAddendCountingObjectsProperty.value,
      model.leftAddendCountingObjectsLengthProperty,
      model.rightAddendCountingObjectsLengthProperty
    );
    this.accessibleHelpText = grabDragDescriptionManager.createHelpTextProperty(
      model.groupSelectLocationObjectsModel.isGroupItemKeyboardGrabbedProperty
    );
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
}

numberPairs.register( 'LocationCountingObjectsLayerNode', LocationCountingObjectsLayerNode );
