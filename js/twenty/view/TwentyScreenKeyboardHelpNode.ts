// Copyright 2025, University of Colorado Boulder

/**
 * Keyboard help content for the twenty screen
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import NumberPairsKeyboardHelpNode from '../../common/view/NumberPairsKeyboardHelpNode.js';
import GrabReleaseKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/GrabReleaseKeyboardHelpSection.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import MoveDraggableItemsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/MoveDraggableItemsKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import KittensKeyboardHelpSection from '../../common/view/KittensKeyboardHelpSection.js';
import MoveAcrossAreaKeyboardHelpSection from '../../common/view/MoveAcrossAreaKeyboardHelpSection.js';

export default class TwentyScreenKeyboardHelpNode extends NumberPairsKeyboardHelpNode {

  public constructor() {
    super( [ new GrabReleaseKeyboardHelpSection( NumberPairsStrings.keyboardHelpDialog.countingObjectOrBeadHeadingStringProperty,
        NumberPairsStrings.keyboardHelpDialog.countingObjectOrBeadStringProperty ),
        new MoveDraggableItemsKeyboardHelpSection( {
          headingStringProperty: NumberPairsStrings.keyboardHelpDialog.twentyScreen.moveGrabbableItemHeadingStringProperty
        } ),
        new MoveAcrossAreaKeyboardHelpSection( NumberPairsStrings.keyboardHelpDialog.countingObjectHeadingStringProperty,
          NumberPairsStrings.keyboardHelpDialog.countingAreaHeadingStringProperty,
          NumberPairsStrings.keyboardHelpDialog.countingAreaStringProperty ),
        new MoveAcrossAreaKeyboardHelpSection( NumberPairsStrings.keyboardHelpDialog.beadHeadingStringProperty,
          NumberPairsStrings.keyboardHelpDialog.wireHeadingStringProperty,
          NumberPairsStrings.keyboardHelpDialog.wireStringProperty ),
        new KittensKeyboardHelpSection() ],
      new SliderControlsKeyboardHelpSection() );
  }
}
numberPairs.register( 'TwentyScreenKeyboardHelpNode', TwentyScreenKeyboardHelpNode );