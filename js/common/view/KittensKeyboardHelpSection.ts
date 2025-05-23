// Copyright 2025, University of Colorado Boulder
/**
 * Keyboard help section to use home/end hotkeys and toggle kitten color
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import numberPairs from '../../numberPairs.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';

export default class KittensKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {
    const homeRow = KeyboardHelpSectionRow.labelWithIcon( NumberPairsStrings.keyboardHelpDialog.jumpToFirstKittenStringProperty, TextKeyNode.home(), {
      labelInnerContent: NumberPairsStrings.a11y.jumpToFirstKittenKeyboardHelpStringProperty
    } );
    const endRow = KeyboardHelpSectionRow.labelWithIcon( NumberPairsStrings.keyboardHelpDialog.jumpToLastKittenStringProperty, TextKeyNode.end(), {
      labelInnerContent: NumberPairsStrings.a11y.jumpToLastKittenKeyboardHelpStringProperty
    } );
    const toggleKittenColorRow = KeyboardHelpSectionRow.labelWithIcon( NumberPairsStrings.keyboardHelpDialog.changeKittenColorStringProperty, TextKeyNode.space(), {
      labelInnerContent: NumberPairsStrings.a11y.changeColorKeyboardHelpStringProperty
    } );
    super( NumberPairsStrings.keyboardHelpDialog.kittenSectionHeadingStringProperty, [ homeRow, endRow, toggleKittenColorRow ] );
  }
}

numberPairs.register( 'KittensKeyboardHelpSection', KittensKeyboardHelpSection );