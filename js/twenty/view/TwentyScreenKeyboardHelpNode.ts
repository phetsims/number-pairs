// Copyright 2025, University of Colorado Boulder

/**
 * Keyboard help content for the twenty screen
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import GrabReleaseKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/GrabReleaseKeyboardHelpSection.js';
import MoveDraggableItemsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/MoveDraggableItemsKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import KittensKeyboardHelpSection from '../../common/view/KittensKeyboardHelpSection.js';
import MoveAcrossAreaKeyboardHelpSection from '../../common/view/MoveAcrossAreaKeyboardHelpSection.js';
import NumberPairsKeyboardHelpNode from '../../common/view/NumberPairsKeyboardHelpNode.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';

export default class TwentyScreenKeyboardHelpNode extends NumberPairsKeyboardHelpNode {

  public constructor() {
    super( [ new GrabReleaseKeyboardHelpSection( NumberPairsFluent.keyboardHelpDialog.countingObjectOrBeadHeadingStringProperty,
        NumberPairsFluent.keyboardHelpDialog.countingObjectOrBeadStringProperty ),
        new MoveDraggableItemsKeyboardHelpSection( {
          headingStringProperty: NumberPairsFluent.keyboardHelpDialog.twentyScreen.moveGrabbableItemHeadingStringProperty
        } ),
        new MoveAcrossAreaKeyboardHelpSection( NumberPairsFluent.keyboardHelpDialog.moveGrabbedObjectToOppositeSideStringProperty,
          NumberPairsFluent.keyboardHelpDialog.objectStringProperty ),
        new KittensKeyboardHelpSection() ],
      new SliderControlsKeyboardHelpSection() );
  }
}
numberPairs.register( 'TwentyScreenKeyboardHelpNode', TwentyScreenKeyboardHelpNode );