// Copyright 2024-2025, University of Colorado Boulder

/**
 * GroupSelectDragInteractionView is a GroupSelectView that listens to keyboard events to move the selected group item
 * in the direction of the arrow keys.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import GroupSelectModel from '../../../../scenery-phet/js/accessibility/group-sort/model/GroupSelectModel.js';
import GroupSelectView, { GroupSelectViewOptions } from '../../../../scenery-phet/js/accessibility/group-sort/view/GroupSelectView.js';
import SoundKeyboardDragListener, { SoundKeyboardDragListenerOptions } from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import numberPairs from '../../numberPairs.js';
import CountingObject from '../model/CountingObject.js';
import Multilink from '../../../../axon/js/Multilink.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

// A list of all keys that are listened to, except those covered by the numberKeyMapper
const KEYBOARD_INTERACTION_KEYS = [
  'd', 'arrowRight', 'a', 'arrowLeft', 'arrowUp', 'arrowDown', 'w', 's', // default-step select/drag
  'shift+d', 'shift+arrowRight', 'shift+a', 'shift+arrowLeft', 'shift+arrowUp', 'shift+arrowDown', 'shift+w', 'shift+s', // shift-step select/drag
  'pageUp', 'pageDown', // page-step select/drag
  'home', 'end' // min/max select/switch addends
] as const;

type AvailablePressedKeys = typeof KEYBOARD_INTERACTION_KEYS[number];

type SelfOptions = {
  soundKeyboardDragListenerOptions?: SoundKeyboardDragListenerOptions;
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
    modelToNodeMap: Map<CountingObject, Node>,
    providedOptions: GroupSelectDragInteractionViewOptions
  ) {

    const options = optionize<GroupSelectDragInteractionViewOptions, SelfOptions, GroupSelectViewOptions<CountingObject, Node>>()( {
      getNodeFromModelItem: countingObject => modelToNodeMap.get( countingObject )!,
      soundKeyboardDragListenerOptions: {}
    }, providedOptions );
    super( groupSelectModel, primaryFocusedNode, options );

    const keyboardListenerOptions = combineOptions<SoundKeyboardDragListenerOptions>( {
      enabledProperty: groupSelectModel.isGroupItemKeyboardGrabbedProperty,
      tandem: options.tandem.createTandem( 'keyboardDragListener' )
    }, options.soundKeyboardDragListenerOptions );
    const keyboardDragListener = new SoundKeyboardDragListener( keyboardListenerOptions );

    const selectItemKeyboardListener = new KeyboardListener( {
      fireOnHold: false,
      keys: KEYBOARD_INTERACTION_KEYS,
      enabledProperty: DerivedProperty.not( groupSelectModel.isGroupItemKeyboardGrabbedProperty ),
      fire: ( event, keysPressed ) => {
        const groupItem = groupSelectModel.selectedGroupItemProperty.value;
        if ( groupItem !== null ) {
          if ( !groupSelectModel.isGroupItemKeyboardGrabbedProperty.value ) {
            groupSelectModel.selectedGroupItemProperty.value = options.getNextSelectedGroupItemFromPressedKeys( keysPressed, groupItem );
          }
        }
      }
    } );

    const homeEndKeyboardListener = new KeyboardListener( {
      keys: [ 'home', 'end' ],
      enabledProperty: groupSelectModel.isGroupItemKeyboardGrabbedProperty,
      fire: ( event, keysPressed ) => {
        const groupItem = groupSelectModel.selectedGroupItemProperty.value;
        assert && assert( groupItem !== null, 'selectedGroupItem should not be null' );
        options.handleHomeEndKeysDuringDrag( keysPressed, groupItem! );
      }
    } );

    // In this interaction nodes may become invisible but still be active. In this case we do not want to be able
    // to select or drag them even though they will still contribute to values in the model.
    const visibleProperties: TReadOnlyProperty<boolean>[] = [];
    modelToNodeMap.forEach( ( value, key ) => {
      visibleProperties.push( value.visibleProperty );
    } );
    Multilink.multilinkAny( visibleProperties, () => {
      if ( groupSelectModel.selectedGroupItemProperty.value ) {
        const selectedGroupItemNode = modelToNodeMap.get( groupSelectModel.selectedGroupItemProperty.value )!;
        if ( !selectedGroupItemNode.visible ) {
          groupSelectModel.selectedGroupItemProperty.value = options.getGroupItemToSelect();
        }
      }
    } );

    primaryFocusedNode.addInputListener( selectItemKeyboardListener );
    primaryFocusedNode.addInputListener( keyboardDragListener );
    primaryFocusedNode.addInputListener( homeEndKeyboardListener );
  }
}

numberPairs.register( 'GroupSelectDragInteractionView', GroupSelectDragInteractionView );