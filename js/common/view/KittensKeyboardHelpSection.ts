// Copyright 2025, University of Colorado Boulder
/**
 * Keyboard help section to use home/end hotkeys and toggle kitten color
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';

export default class KittensKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( toggleKittenColor: boolean ) {

    //REVIEW Should KeyboardHelpSectionRow.fromHotkeyData be used to create rows? For example, see VectorsKeyboardHelpSection.

    const homeRow = KeyboardHelpSectionRow.labelWithIcon( NumberPairsFluent.keyboardHelpDialog.jumpToFirstKittenStringProperty, TextKeyNode.home(), {
      labelInnerContent: NumberPairsFluent.a11y.keyboardHelpDialog.kittenInteraction.jumpToFirstLabelInnerContentStringProperty
    } );
    const endRow = KeyboardHelpSectionRow.labelWithIcon( NumberPairsFluent.keyboardHelpDialog.jumpToLastKittenStringProperty, TextKeyNode.end(), {
      labelInnerContent: NumberPairsFluent.a11y.keyboardHelpDialog.kittenInteraction.jumpToLastLabelInnerContentStringProperty
    } );
    const array = [ homeRow, endRow ];

    if ( toggleKittenColor ) {
      const toggleKittenColorRow = KeyboardHelpSectionRow.labelWithIcon( NumberPairsFluent.keyboardHelpDialog.changeKittenColorStringProperty, TextKeyNode.space(), {
        labelInnerContent: NumberPairsFluent.a11y.keyboardHelpDialog.kittenInteraction.changeColorLabelInnerContentStringProperty
      } );
      array.push( toggleKittenColorRow );
    }

    super( NumberPairsFluent.keyboardHelpDialog.kittenSectionHeadingStringProperty, array );
  }
}

numberPairs.register( 'KittensKeyboardHelpSection', KittensKeyboardHelpSection );