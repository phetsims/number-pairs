// Copyright 2025, University of Colorado Boulder
/**
 * Keyboard help section for moving counting objects across an area with home and end keys
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';


export default class MoveAcrossAreaKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( headingStringProperty: TReadOnlyProperty<string> ) {

    const moveCountingObjectHomeRow = KeyboardHelpSectionRow.labelWithIcon( NumberPairsStrings.keyboardHelpDialog.moveToLeftSideStringProperty, TextKeyNode.home() );
    const moveCountingObjectEndRow = KeyboardHelpSectionRow.labelWithIcon( NumberPairsStrings.keyboardHelpDialog.moveToRightSideStringProperty, TextKeyNode.end() );

    super( headingStringProperty, [ moveCountingObjectHomeRow, moveCountingObjectEndRow ] );
  }
}

numberPairs.register( 'MoveAcrossAreaKeyboardHelpSection', MoveAcrossAreaKeyboardHelpSection );