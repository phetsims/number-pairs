// Copyright 2024, University of Colorado Boulder

/**
 * GroupSelectDragInteractionView is a GroupSelectView that listens to keyboard events to move the selected group item
 * in the direction of the arrow keys.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import GroupSelectModel from '../../../../scenery-phet/js/accessibility/group-sort/model/GroupSelectModel.js';
import GroupSelectView, { GroupSelectViewOptions } from '../../../../scenery-phet/js/accessibility/group-sort/view/GroupSelectView.js';
import SoundKeyboardDragListener from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import { KeyboardListener, Node } from '../../../../scenery/js/imports.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import LocationCountingObjectNode from './LocationCountingObjectNode.js';

// A list of all keys that are listened to, except those covered by the numberKeyMapper
const KEYBOARD_INTERACTION_KEYS = [
  'd', 'arrowRight', 'a', 'arrowLeft', 'arrowUp', 'arrowDown', 'w', 's', // default-step select/drag
  'shift+d', 'shift+arrowRight', 'shift+a', 'shift+arrowLeft', 'shift+arrowUp', 'shift+arrowDown', 'shift+w', 'shift+s', // shift-step select/drag
  'pageUp', 'pageDown', // page-step select/drag
  'home', 'end' // min/max select/switch addends
] as const;

type SelfOptions = EmptySelfOptions;
type GroupSelectDragInteractionViewOptions =
  SelfOptions
  & StrictOmit<GroupSelectViewOptions<CountingObject, LocationCountingObjectNode>, 'getGroupItemToSelect' | 'getNodeFromModelItem'>
  &
  PickRequired<PhetioObjectOptions, 'tandem'>;

export default class GroupSelectDragInteractionView extends GroupSelectView<CountingObject, LocationCountingObjectNode> {

  public constructor(
    groupSelectModel: GroupSelectModel<CountingObject>,
    model: NumberPairsModel,
    primaryFocusedNode: Node,
    modelToNodeMap: Map<CountingObject, LocationCountingObjectNode>,
    providedOptions: GroupSelectDragInteractionViewOptions
  ) {

    const options = optionize<GroupSelectDragInteractionViewOptions, SelfOptions, GroupSelectViewOptions<CountingObject, LocationCountingObjectNode>>()( {
      getGroupItemToSelect: () => {
        const countingObjects = model.getCountingObjectsSortedByLocationPosition();
        if ( countingObjects.length === 0 ) {
          return null;
        }
        else {
          return countingObjects[ 0 ];
        }
      },
      getNodeFromModelItem: countingObject => modelToNodeMap.get( countingObject )!
    }, providedOptions );
    super( groupSelectModel, primaryFocusedNode, options );

    const selectedItemPositionProperty = new DynamicProperty<Vector2, Vector2, CountingObject>( groupSelectModel.selectedGroupItemProperty, {
      derive: countingObject => countingObject.locationPositionProperty,
      bidirectional: true
    } );

    const keyboardDragListener = new SoundKeyboardDragListener( {
      positionProperty: selectedItemPositionProperty,
      enabledProperty: groupSelectModel.isGroupItemKeyboardGrabbedProperty,
      tandem: options.tandem.createTandem( 'keyboardDragListener' )
    } );
    const keyboardListener = new KeyboardListener( {
      fireOnHold: true,
      keys: KEYBOARD_INTERACTION_KEYS,
      enabledProperty: DerivedProperty.not( groupSelectModel.isGroupItemKeyboardGrabbedProperty ),
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

              // Find the direction of the traversal by finding the slope for the currentPoint(0, 0) and the
              // delta created by the arrow keys (1, 0) for right, (-1, 0), etc.
            const startingPoint = groupItem.locationPositionProperty.value;
            const delta = this.getKeysDelta( keysPressed );
            const countingObjectsInDirection = model.countingObjects.filter( countingObject =>
              countingObject.addendTypeProperty.value !== AddendType.INACTIVE &&
              countingObject.locationPositionProperty.value.dot( delta ) > groupItem.locationPositionProperty.value.dot( delta ) );
            if ( countingObjectsInDirection.length > 0 ) {
              countingObjectsInDirection.sort( ( a, b ) =>
                a.locationPositionProperty.value.distance( startingPoint ) - b.locationPositionProperty.value.distance( startingPoint ) );

              const coordinate = Utils.clamp( delta.x === 0 ? Math.abs( delta.y ) : Math.abs( delta.x ), 0, countingObjectsInDirection.length );
              groupSelectModel.selectedGroupItemProperty.value = countingObjectsInDirection[ coordinate - 1 ];
            }
          }
        }
      }
    } );

    primaryFocusedNode.addInputListener( keyboardListener );
    primaryFocusedNode.addInputListener( keyboardDragListener );
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

numberPairs.register( 'GroupSelectDragInteractionView', GroupSelectDragInteractionView );