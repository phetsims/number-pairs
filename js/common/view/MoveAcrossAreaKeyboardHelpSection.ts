// Copyright 2025, University of Colorado Boulder
/**
 * Keyboard help section for moving counting objects across an area with home and end keys
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';


export default class MoveAcrossAreaKeyboardHelpSection extends KeyboardHelpSection {

  public constructor(
    itemHeadingStringProperty: TReadOnlyProperty<string>,
    areaHeadingStringProperty: TReadOnlyProperty<string>,
    areaStringProperty: TReadOnlyProperty<string> ) {
    const moveToRightPatternStringProperty = new PatternStringProperty( NumberPairsStrings.keyboardHelpDialog.moveToRightPatternStringPropertyStringProperty, {
      area: areaStringProperty
    } );
    const moveToLeftPatternStringProperty = new PatternStringProperty( NumberPairsStrings.keyboardHelpDialog.moveToLeftPatternStringPropertyStringProperty, {
      area: areaStringProperty
    } );
    const moveAcrossAreaHeadingStringProperty = new PatternStringProperty( NumberPairsStrings.keyboardHelpDialog.moveAcrossAreaPatternStringProperty, {
      item: itemHeadingStringProperty,
      area: areaHeadingStringProperty
    } );
    const moveCountingObjectHomeRow = KeyboardHelpSectionRow.labelWithIcon( moveToLeftPatternStringProperty, TextKeyNode.home() );
    const moveCountingObjectEndRow = KeyboardHelpSectionRow.labelWithIcon( moveToRightPatternStringProperty, TextKeyNode.end() );

    super( moveAcrossAreaHeadingStringProperty, [ moveCountingObjectHomeRow, moveCountingObjectEndRow ] );

  }
}

numberPairs.register( 'MoveAcrossAreaKeyboardHelpSection', MoveAcrossAreaKeyboardHelpSection );