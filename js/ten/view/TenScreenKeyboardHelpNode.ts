// Copyright 2025, University of Colorado Boulder
/**
 * Keyboard help content for the ten screen
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import NumberPairsKeyboardHelpNode from '../../common/view/NumberPairsKeyboardHelpNode.js';
import numberPairs from '../../numberPairs.js';
import GrabReleaseKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/GrabReleaseKeyboardHelpSection.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import MoveDraggableItemsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/MoveDraggableItemsKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import KittensKeyboardHelpSection from '../../common/view/KittensKeyboardHelpSection.js';
import MoveAcrossAreaKeyboardHelpSection from '../../common/view/MoveAcrossAreaKeyboardHelpSection.js';


export default class TenScreenKeyboardHelpNode extends NumberPairsKeyboardHelpNode {

  public constructor() {
    super( [ new GrabReleaseKeyboardHelpSection( NumberPairsFluent.keyboardHelpDialog.beadHeadingStringProperty,
        NumberPairsFluent.keyboardHelpDialog.beadStringProperty ),
        new MoveDraggableItemsKeyboardHelpSection( {
          headingStringProperty: NumberPairsFluent.keyboardHelpDialog.tenScreen.moveGrabbableItemHeadingStringProperty
        } ),
        new MoveAcrossAreaKeyboardHelpSection( NumberPairsFluent.keyboardHelpDialog.moveBeadsToOppositeSideStringProperty,
          NumberPairsFluent.keyboardHelpDialog.beadStringProperty ),
        new KittensKeyboardHelpSection() ],
      new SliderControlsKeyboardHelpSection() );
  }
}

numberPairs.register( 'TenScreenKeyboardHelpNode', TenScreenKeyboardHelpNode );