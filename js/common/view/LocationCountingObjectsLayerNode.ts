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
import NumberPairsFluent from '../../NumberPairsFluent.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import RepresentationType from '../model/RepresentationType.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import CountingAreaNode from './CountingAreaNode.js';
import GrabDragDescriptionManager from './description/GrabDragDescriptionManager.js';
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
            model.rightAddendVisibleProperty, countingObject.isDraggingProperty,
            model.groupSelectLocationObjectsModel.isGroupItemKeyboardGrabbedProperty,
            model.groupSelectLocationObjectsModel.selectedGroupItemProperty ],
          ( addendType, locationPosition, leftVisible, rightVisible, dragging, groupItemKeyboardGrabbed, selectedGroupItem ) => {
            const leftBounds = NumberPairsConstants.LEFT_COUNTING_AREA_BOUNDS;
            const keyboardDragging = groupItemKeyboardGrabbed && selectedGroupItem === countingObject;
            return dragging || keyboardDragging || ( addendType !== AddendType.INACTIVE && ( leftBounds.containsPoint( locationPosition ) ? leftVisible : rightVisible ) );
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
      model.leftAddendVisibleProperty,
      model.rightAddendCountingObjectsProperty,
      model.rightAddendVisibleProperty,
      this.countingObjectModelToNodeMap,
      options.tandem.createTandem( 'groupSelectView' )
    );
    groupSelectView.groupSortGroupFocusHighlightPath.shape = Shape.bounds( NumberPairsConstants.COUNTING_AREA_BOUNDS );
    groupSelectView.grabReleaseCueNode.centerTop = NumberPairsConstants.COUNTING_AREA_BOUNDS.centerTop.plusXY( 0, 50 );
    model.groupSelectLocationObjectsModel.isGroupItemKeyboardGrabbedProperty.link( isGrabbed => {

      // When we are no longer grabbed we want to go through the drop logic.
      const selectedGroupItem = model.groupSelectLocationObjectsModel.selectedGroupItemProperty.value;
      if ( !isGrabbed && selectedGroupItem ) {
        countingAreaNode.dropCountingObject( selectedGroupItem, 'location' );
      }
    } );

    model.groupSelectLocationObjectsModel.selectedGroupItemProperty.link( selectedGroupItem => {

      // Force a re-render of the pdom when the selected group item changes to announce the accessible name even if the
      // accessible name hasn't changed.
      const hadFocus = this.focused;
      this.labelTagName = 'label';
      this.labelTagName = null;
      hadFocus && this.focus();

      selectedGroupItem && this.countingObjectModelToNodeMap.get( selectedGroupItem )?.moveToFront();
    } );

    /**
     * Create the a11y description and help text.
     */
    const itemStringProperty = new DynamicProperty<string, unknown, RepresentationType>(
      this.model.representationTypeProperty, {
        derive: 'singularAccessibleName'
      } );

    // There is no distinction between left and right item names, so we can use the same property for both.
    const grabDragDescriptionManager = new GrabDragDescriptionManager(
      itemStringProperty,
      itemStringProperty,
      itemStringProperty,
      new DynamicProperty<string, unknown, RepresentationType>( this.model.representationTypeProperty, {
        derive: 'accessibleName'
      } ),
      model.representationTypeProperty );
    this.accessibleName = grabDragDescriptionManager.createItemDescriptionProperty(
      model.groupSelectLocationObjectsModel.selectedGroupItemProperty,
      () => model.leftAddendCountingObjectsProperty.value,
      () => model.rightAddendCountingObjectsProperty.value,
      model.leftAddendCountingObjectsLengthProperty,
      model.rightAddendCountingObjectsLengthProperty,

      // Since the closures above return the exact array, they do not get out of sync, and we don't need further dependencies here.
      []
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
    let contextResponse: string | null = null;

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
      contextResponse = NumberPairsFluent.a11y.grabOrReleaseInteraction.movedAccessibleResponse.format( {
        addend: NumberPairsFluent.a11y.leftStringProperty
      } );
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
      contextResponse = NumberPairsFluent.a11y.grabOrReleaseInteraction.movedAccessibleResponse.format( {
        addend: NumberPairsFluent.a11y.rightStringProperty
      } );
    }

    // Only add the context response if the counting object is being dragged or is keyboard grabbed.
    const canAddContextResponse = !!contextResponse && (
      this.model.groupSelectLocationObjectsModel.isGroupItemKeyboardGrabbedProperty.value ||
      countingObject.isDraggingProperty.value );
    canAddContextResponse && this.addAccessibleContextResponse( contextResponse );
    contextResponse = null;
  }
}

numberPairs.register( 'LocationCountingObjectsLayerNode', LocationCountingObjectsLayerNode );
