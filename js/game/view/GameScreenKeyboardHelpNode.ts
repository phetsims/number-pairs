// Copyright 2025, University of Colorado Boulder

/**
 * Keyboard help content for the intro screen
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import MoveDraggableItemsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/MoveDraggableItemsKeyboardHelpSection.js';
import KittensKeyboardHelpSection from '../../common/view/KittensKeyboardHelpSection.js';
import NumberPairsKeyboardHelpNode from '../../common/view/NumberPairsKeyboardHelpNode.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';

export default class GameScreenKeyboardHelpNode extends NumberPairsKeyboardHelpNode {

  public constructor() {
    super( [
      new MoveDraggableItemsKeyboardHelpSection( {
        headingStringProperty: NumberPairsFluent.keyboardHelpDialog.gameScreen.moveKittenItemHeadingStringProperty
      } ),

      new KittensKeyboardHelpSection( false )
    ] );
  }
}

numberPairs.register( 'GameScreenKeyboardHelpNode', GameScreenKeyboardHelpNode );