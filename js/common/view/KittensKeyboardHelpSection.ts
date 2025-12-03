// Copyright 2025, University of Colorado Boulder
/**
 * Keyboard help section to use home/end hotkeys and toggle kitten color
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import NumberPairsHotkeyData from './NumberPairsHotkeyData.js';

export default class KittensKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( toggleKittenColor: boolean ) {

    const homeRow = KeyboardHelpSectionRow.fromHotkeyData( NumberPairsHotkeyData.KITTEN.jumpToFirst );
    const endRow = KeyboardHelpSectionRow.fromHotkeyData( NumberPairsHotkeyData.KITTEN.jumpToLast );
    const array = [ homeRow, endRow ];

    if ( toggleKittenColor ) {
      const toggleKittenColorRow = KeyboardHelpSectionRow.fromHotkeyData( NumberPairsHotkeyData.KITTEN.toggleAddend );
      array.push( toggleKittenColorRow );
    }

    super( NumberPairsFluent.keyboardHelpDialog.kittenSectionHeadingStringProperty, array );
  }
}

numberPairs.register( 'KittensKeyboardHelpSection', KittensKeyboardHelpSection );