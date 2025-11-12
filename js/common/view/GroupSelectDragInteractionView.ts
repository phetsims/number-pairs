// Copyright 2024-2025, University of Colorado Boulder

/**
 * GroupSelectDragInteractionView is a GroupSelectView that listens to keyboard events to move the selected group item
 * in the direction of the arrow keys.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import GroupSelectModel from '../../../../scenery-phet/js/accessibility/group-sort/model/GroupSelectModel.js';
import GroupSelectView, { GroupSelectViewOptions } from '../../../../scenery-phet/js/accessibility/group-sort/view/GroupSelectView.js';
import SoundKeyboardDragListener, { SoundKeyboardDragListenerOptions } from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import CountingObject from '../model/CountingObject.js';
import NumberPairsHotkeyData from './NumberPairsHotkeyData.js';

type AvailablePressedKeys = typeof NumberPairsHotkeyData.NAVIGATION_KEYS[ number ] |
  typeof NumberPairsHotkeyData.JUMP_TO_FIRST_KEYS[number] | typeof NumberPairsHotkeyData.JUMP_TO_LAST_KEYS[number] |
  typeof NumberPairsHotkeyData.NAVIGATION_SHIFT_KEYS[ number ] |
  typeof NumberPairsHotkeyData.NAVIGATION_PAGE_KEYS[number];

type SelfOptions = {

  // The positionProperty must be passed through the constructor instead.
  soundKeyboardDragListenerOptions?: StrictOmit<SoundKeyboardDragListenerOptions, 'positionProperty'>;
  getNextSelectedGroupItemFromPressedKeys: ( keysPressed: AvailablePressedKeys, groupItem: CountingObject ) => CountingObject;

  // We use home and end keys to facilitate movement of the selected group item during drag
  handleHomeEndKeysDuringDrag: ( keysPressed: AvailablePressedKeys, groupItem: CountingObject ) => void;
};
type GroupSelectDragInteractionViewOptions = SelfOptions &
  StrictOmit<GroupSelectViewOptions<CountingObject, Node>, 'getNodeFromModelItem'> &
  PickRequired<PhetioObjectOptions, 'tandem'>;

export default class GroupSelectDragInteractionView extends GroupSelectView<CountingObject, Node> {

  public constructor(
    groupSelectModel: GroupSelectModel<CountingObject>,
    primaryFocusedNode: Node,
    positionProperty: TReadOnlyProperty<Vector2>,
    modelToNodeMap: Map<CountingObject, Node>,
    providedOptions: GroupSelectDragInteractionViewOptions
  ) {

    const options = optionize<GroupSelectDragInteractionViewOptions, SelfOptions, GroupSelectViewOptions<CountingObject, Node>>()( {
      getNodeFromModelItem: countingObject => modelToNodeMap.get( countingObject )!,
      grabbedRoleDescription: NumberPairsFluent.a11y.movableRoleDescriptionStringProperty,
      soundKeyboardDragListenerOptions: {}
    }, providedOptions );
    super( groupSelectModel, primaryFocusedNode, options );

    const keyboardListenerOptions = combineOptions<WithRequired<SoundKeyboardDragListenerOptions, 'positionProperty'>>( {
      positionProperty: positionProperty,
      enabledProperty: groupSelectModel.isGroupItemKeyboardGrabbedProperty,
      tandem: options.tandem.createTandem( 'keyboardDragListener' )
    }, options.soundKeyboardDragListenerOptions );
    const keyboardDragListener = new SoundKeyboardDragListener( keyboardListenerOptions );
    positionProperty.link( () => {
      const selectedItem = groupSelectModel.selectedGroupItemProperty.value;
      groupSelectModel.isGroupItemKeyboardGrabbedProperty.value && selectedItem && this.onGroupItemChange( selectedItem );
    } );

    const selectItemKeyboardListener = new KeyboardListener( {
      fireOnHold: false,
      keyStringProperties: NumberPairsHotkeyData.GROUP_SELECT_DRAG.navigation.keyStringProperties,
      enabledProperty: DerivedProperty.not( groupSelectModel.isGroupItemKeyboardGrabbedProperty ),
      fire: ( event, keysPressed ) => {
        const groupItem = groupSelectModel.selectedGroupItemProperty.value;
        if ( groupItem !== null ) {
          if ( !groupSelectModel.isGroupItemKeyboardGrabbedProperty.value ) {
            groupSelectModel.selectedGroupItemProperty.value = options.getNextSelectedGroupItemFromPressedKeys( keysPressed, groupItem );
          }
          groupSelectModel.selectedGroupItemProperty.value && this.onGroupItemChange( groupSelectModel.selectedGroupItemProperty.value );
        }
      }
    } );

    const homeEndKeyboardListener = new KeyboardListener( {
      keyStringProperties: NumberPairsHotkeyData.GROUP_SELECT_DRAG.jumpToFirstOrLast.keyStringProperties,
      enabledProperty: groupSelectModel.isGroupItemKeyboardGrabbedProperty,
      fire: ( event, keysPressed ) => {
        const groupItem = groupSelectModel.selectedGroupItemProperty.value;
        affirm( groupItem !== null, 'selectedGroupItem should not be null' );
        options.handleHomeEndKeysDuringDrag( keysPressed, groupItem );
      }
    } );

    // In this interaction nodes may become invisible but still be active. In this case we do not want to be able
    // to select or drag them even though they will still contribute to values in the model.
    const visibleProperties = [ ...modelToNodeMap.values() ].map( v => v.visibleProperty );

    Multilink.multilinkAny( visibleProperties, () => {
      if ( groupSelectModel.selectedGroupItemProperty.value ) {
        const selectedGroupItemNode = modelToNodeMap.get( groupSelectModel.selectedGroupItemProperty.value )!;
        if ( !selectedGroupItemNode.visible ) {

          // We will define the selected group item once the interaction has focus again.
          groupSelectModel.selectedGroupItemProperty.value = this.model.isKeyboardFocusedProperty.value ?
                                                             options.getGroupItemToSelect() : null;
        }
      }
    } );

    primaryFocusedNode.addInputListener( selectItemKeyboardListener );
    primaryFocusedNode.addInputListener( keyboardDragListener );
    primaryFocusedNode.addInputListener( homeEndKeyboardListener );
  }
}

numberPairs.register( 'GroupSelectDragInteractionView', GroupSelectDragInteractionView );