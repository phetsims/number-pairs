// Copyright 2024-2025, University of Colorado Boulder

/**
 * LocationGroupSelectDragInteractionView manages keyboard navigation and drag interaction for location counting objects.
 * It handles selection, navigation between addends, and home/end key functionality.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import GroupSelectModel from '../../../../scenery-phet/js/accessibility/group-sort/model/GroupSelectModel.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import { NumberPairsUtils } from '../model/NumberPairsUtils.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import GroupSelectDragInteractionView from './GroupSelectDragInteractionView.js';
import LocationCountingObjectNode from './LocationCountingObjectNode.js';
import NumberPairsSounds from './NumberPairsSounds.js';

const LEFT_COUNTING_AREA_BOUNDS = NumberPairsConstants.LEFT_COUNTING_AREA_BOUNDS;
const RIGHT_COUNTING_AREA_BOUNDS = NumberPairsConstants.RIGHT_COUNTING_AREA_BOUNDS;

export default class LocationGroupSelectDragInteractionView extends GroupSelectDragInteractionView {

  public constructor(
    groupSelectModel: GroupSelectModel<CountingObject>,
    targetNode: Node,
    leftAddendCountingObjectsProperty: TReadOnlyProperty<CountingObject[]>,
    rightAddendCountingObjectsProperty: TReadOnlyProperty<CountingObject[]>,
    countingObjectModelToNodeMap: Map<CountingObject, LocationCountingObjectNode>,
    tandem: Tandem
  ) {

    const selectedItemPositionProperty = new DynamicProperty<Vector2, Vector2, CountingObject>( groupSelectModel.selectedGroupItemProperty, {
      derive: countingObject => countingObject.locationPositionProperty,
      bidirectional: true
    } );

    super( groupSelectModel, targetNode, selectedItemPositionProperty, countingObjectModelToNodeMap, {
      soundKeyboardDragListenerOptions: {
        dragDelta: 15,
        shiftDragDelta: 8,
        dragBoundsProperty: new Property( LocationCountingObjectNode.DRAG_BOUNDS )
      },
      getGroupItemToSelect: () => {
        const leftCountingObjects = leftAddendCountingObjectsProperty.value;
        const rightCountingObjects = rightAddendCountingObjectsProperty.value;

        // We want to start with the left addend counting objects.
        if ( leftCountingObjects.length > 0 ) {
          return leftCountingObjects[ 0 ];
        }
        else if ( rightCountingObjects.length > 0 ) {
          return rightCountingObjects[ 0 ];
        }
        else {
          return null;
        }
      },
      getNextSelectedGroupItemFromPressedKeys: ( keysPressed: string, groupItem: CountingObject ) => {
        affirm( groupItem.addendTypeProperty.value !== AddendType.INACTIVE, 'Inactive counting objects should not be selectable' );
        const addendType = groupItem.addendTypeProperty.value;
        const addendCountingObjects = addendType === AddendType.LEFT ?
                                      leftAddendCountingObjectsProperty.value :
                                      rightAddendCountingObjectsProperty.value;
        const otherAddendCountingObjects = addendType === AddendType.LEFT ?
                                           rightAddendCountingObjectsProperty.value :
                                           leftAddendCountingObjectsProperty.value;
        const keysDelta = LocationGroupSelectDragInteractionView.getKeysDelta( keysPressed );

        if ( keysDelta === 0 ) {
          return groupItem;
        }

        const orderedCountingObjects = addendCountingObjects.concat( otherAddendCountingObjects );
        const currentIndex = orderedCountingObjects.indexOf( groupItem );
        affirm( currentIndex !== -1, 'Group item not found in combined counting objects' );

        const totalObjects = orderedCountingObjects.length;
        affirm( totalObjects > 0, 'No counting objects available for navigation' );
        const nextIndex = ( currentIndex + keysDelta + totalObjects ) % totalObjects;

        const nextCountingObject = orderedCountingObjects[ nextIndex ];
        NumberPairsSounds.playSelectAddendSound( nextCountingObject.addendTypeProperty.value, keysDelta > 0 );

        return nextCountingObject;
      },
      handleHomeEndKeysDuringDrag: ( keysPressed: string, groupItem: CountingObject ) => {
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
      tandem: tandem
    } );
  }

  private static getKeysDelta( keysPressed: string ): number {
    switch( keysPressed ) {
      case 'd':
      case 'arrowRight':
        return 1;
      case 'a':
      case 'arrowLeft':
        return -1;
      case 'w':
      case 'arrowUp':
        return 1;
      case 's':
      case 'arrowDown':
        return -1;
      default:
        return 0;
    }
  }
}

numberPairs.register( 'LocationGroupSelectDragInteractionView', LocationGroupSelectDragInteractionView );
