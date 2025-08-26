// Copyright 2025, University of Colorado Boulder
/**
 * Keyboard help content for the intro screen
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import NumberPairsKeyboardHelpNode from '../../common/view/NumberPairsKeyboardHelpNode.js';
import numberPairs from '../../numberPairs.js';
import GrabReleaseKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/GrabReleaseKeyboardHelpSection.js';
import MoveDraggableItemsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/MoveDraggableItemsKeyboardHelpSection.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import MoveAcrossAreaKeyboardHelpSection from '../../common/view/MoveAcrossAreaKeyboardHelpSection.js';


export default class IntroScreenKeyboardHelpNode extends NumberPairsKeyboardHelpNode {

  public constructor() {
    super( [
      new GrabReleaseKeyboardHelpSection( NumberPairsFluent.keyboardHelpDialog.objectHeadingStringProperty,
        NumberPairsFluent.keyboardHelpDialog.objectStringProperty ),
      new MoveDraggableItemsKeyboardHelpSection( {
        headingStringProperty: NumberPairsFluent.keyboardHelpDialog.introScreen.moveGrabbableItemHeadingStringProperty
      } ),
      new MoveAcrossAreaKeyboardHelpSection( NumberPairsFluent.keyboardHelpDialog.moveGrabbedObjectToOppositeSideStringProperty,
        NumberPairsFluent.keyboardHelpDialog.objectStringProperty )
    ] );
  }
}

numberPairs.register( 'IntroScreenKeyboardHelpNode', IntroScreenKeyboardHelpNode );