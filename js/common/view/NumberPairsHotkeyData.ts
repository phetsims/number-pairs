// Copyright 2025, University of Colorado Boulder

/**
 * HotkeyData for the KeyboardListeners in Number Pairs.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import platform from '../../../../phet-core/js/platform.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';

export default class NumberPairsHotkeyData {

  // Navigation keys for selecting and moving items
  public static readonly NAVIGATION_KEYS: OneKeyStroke[] = [ 'arrowRight', 'd', 'arrowLeft', 'a', 'arrowUp', 'w', 'arrowDown', 's' ];

  // Navigation keys with shift modifiers for larger steps
  public static readonly NAVIGATION_SHIFT_KEYS: OneKeyStroke[] = [ 'shift+arrowRight', 'shift+d', 'shift+arrowLeft', 'shift+a', 'shift+arrowUp', 'shift+w', 'shift+arrowDown', 'shift+s' ];

  // Jump to first/last keys
  public static readonly JUMP_TO_FIRST_KEYS: OneKeyStroke[] = [ 'home' ];
  public static readonly JUMP_TO_LAST_KEYS: OneKeyStroke[] = [ 'end' ];

  // Navigation page keys
  public static readonly NAVIGATION_PAGE_KEYS: OneKeyStroke[] = [ 'pageUp', 'pageDown' ];

  public static readonly GROUP_SELECT_DRAG = {

    // Navigation between items (default step)
    navigation: new HotkeyData( {
      keys: NumberPairsHotkeyData.NAVIGATION_KEYS,
      repoName: numberPairs.name,
      binderName: 'Group Select Navigation'
    } ),

    // Navigation with shift for larger steps
    navigationShift: new HotkeyData( {
      keys: NumberPairsHotkeyData.NAVIGATION_SHIFT_KEYS,
      repoName: numberPairs.name,
      binderName: 'Group Select Navigation with Shift'
    } ),

    // Page-step navigation
    navigationPage: new HotkeyData( {
      keys: NumberPairsHotkeyData.NAVIGATION_PAGE_KEYS,
      repoName: numberPairs.name,
      binderName: 'Group Select Page Navigation'
    } ),

    // Jump to first/last item
    jumpToFirstOrLast: new HotkeyData( {
      keys: [ ...NumberPairsHotkeyData.JUMP_TO_FIRST_KEYS, ...NumberPairsHotkeyData.JUMP_TO_LAST_KEYS ],
      repoName: numberPairs.name,
      binderName: 'Group Select Jump to First/Last'
    } )
  };

  public static readonly KITTEN = {

    // Toggle kitten color/addend
    toggleAddend: new HotkeyData( {
      keys: [ 'space', 'enter' ] as OneKeyStroke[],
      repoName: numberPairs.name,
      keyboardHelpDialogLabelStringProperty: NumberPairsFluent.keyboardHelpDialog.changeKittenColorStringProperty,
      keyboardHelpDialogPDOMLabelStringProperty: NumberPairsFluent.a11y.keyboardHelpDialog.kittenInteraction.changeColorLabelInnerContent.createProperty( {
        key: platform.enterOrReturn
      } )
    } ),

    // Jump to first kitten
    jumpToFirst: new HotkeyData( {
      keys: NumberPairsHotkeyData.JUMP_TO_FIRST_KEYS,
      repoName: numberPairs.name,
      keyboardHelpDialogLabelStringProperty: NumberPairsFluent.keyboardHelpDialog.jumpToFirstKittenStringProperty,
      keyboardHelpDialogPDOMLabelStringProperty: NumberPairsFluent.a11y.keyboardHelpDialog.kittenInteraction.jumpToFirstLabelInnerContentStringProperty
    } ),

    // Jump to last kitten
    jumpToLast: new HotkeyData( {
      keys: NumberPairsHotkeyData.JUMP_TO_LAST_KEYS,
      repoName: numberPairs.name,
      keyboardHelpDialogLabelStringProperty: NumberPairsFluent.keyboardHelpDialog.jumpToLastKittenStringProperty,
      keyboardHelpDialogPDOMLabelStringProperty: NumberPairsFluent.a11y.keyboardHelpDialog.kittenInteraction.jumpToLastLabelInnerContentStringProperty
    } )
  };

  public static readonly COUNTING_OBJECT_CONTROL = {

    // Adjust number of objects
    adjust: new HotkeyData( {
      keys: NumberPairsHotkeyData.NAVIGATION_KEYS,
      repoName: numberPairs.name,
      keyboardHelpDialogLabelStringProperty: NumberPairsFluent.keyboardHelpDialog.adjustObjectsTitleStringProperty
    } )
  };

  public static readonly ANSWER_BUTTON_GROUP = {

    // Navigate between answer buttons
    navigation: new HotkeyData( {
      keys: NumberPairsHotkeyData.NAVIGATION_KEYS,
      repoName: numberPairs.name,
      binderName: 'Answer Button Group Navigation'
    } )
  };
}

numberPairs.register( 'NumberPairsHotkeyData', NumberPairsHotkeyData );
