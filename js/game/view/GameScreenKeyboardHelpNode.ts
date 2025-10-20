// Copyright 2025, University of Colorado Boulder

/**
 * Keyboard help content for the intro screen
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import GrabReleaseKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/GrabReleaseKeyboardHelpSection.js';
import MoveDraggableItemsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/MoveDraggableItemsKeyboardHelpSection.js';
import NumberPairsKeyboardHelpNode from '../../common/view/NumberPairsKeyboardHelpNode.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';

export default class GameScreenKeyboardHelpNode extends NumberPairsKeyboardHelpNode {

  public constructor() {
    super( [
      new GrabReleaseKeyboardHelpSection( NumberPairsFluent.keyboardHelpDialog.objectHeadingStringProperty,
        NumberPairsFluent.keyboardHelpDialog.objectStringProperty ),
      new MoveDraggableItemsKeyboardHelpSection( {
        headingStringProperty: NumberPairsFluent.keyboardHelpDialog.introScreen.moveGrabbableItemHeadingStringProperty
      } )
    ] );
  }
}

numberPairs.register( 'GameScreenKeyboardHelpNode', GameScreenKeyboardHelpNode );