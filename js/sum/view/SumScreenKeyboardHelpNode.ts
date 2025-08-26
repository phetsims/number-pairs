// Copyright 2025, University of Colorado Boulder
/**
 * Keyboard help content for the sum screen
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
import CountingObjectSpinnersKeyboardHelpSection from './CountingObjectSpinnersKeyboardHelpSection.js';
import MoveAcrossAreaKeyboardHelpSection from '../../common/view/MoveAcrossAreaKeyboardHelpSection.js';

export default class SumScreenKeyboardHelpNode extends NumberPairsKeyboardHelpNode {

  public constructor() {
    super( [ new GrabReleaseKeyboardHelpSection( NumberPairsFluent.keyboardHelpDialog.beadHeadingStringProperty,
        NumberPairsFluent.keyboardHelpDialog.beadStringProperty ),
        new MoveDraggableItemsKeyboardHelpSection( {
          headingStringProperty: NumberPairsFluent.keyboardHelpDialog.sumScreen.moveGrabbableItemHeadingStringProperty
        } ),
        new MoveAcrossAreaKeyboardHelpSection( NumberPairsFluent.keyboardHelpDialog.moveBeadsToOppositeSideStringProperty,
          NumberPairsFluent.keyboardHelpDialog.beadStringProperty ),
        new KittensKeyboardHelpSection(), new CountingObjectSpinnersKeyboardHelpSection() ],
      new SliderControlsKeyboardHelpSection() );
  }
}

numberPairs.register( 'SumScreenKeyboardHelpNode', SumScreenKeyboardHelpNode );