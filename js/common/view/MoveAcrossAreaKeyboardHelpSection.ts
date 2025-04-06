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
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';


export default class MoveAcrossAreaKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( headingStringProperty: TReadOnlyProperty<string>, itemStringProperty: TReadOnlyProperty<string> ) {

    const moveLeftPatternStringProperty = new PatternStringProperty( NumberPairsStrings.keyboardHelpDialog.moveToLeftSidePatternStringProperty, {
      items: itemStringProperty
    } );
    const moveRightPatternStringProperty = new PatternStringProperty( NumberPairsStrings.keyboardHelpDialog.moveToRightSidePatternStringProperty, {
      items: itemStringProperty
    } );
    const moveLeftDescriptionPatternStringProperty = new PatternStringProperty( NumberPairsStrings.a11y.moveAcrossDescriptionPatternStringProperty, {
      item: itemStringProperty,
      addend: NumberPairsStrings.a11y.leftStringProperty,
      key: NumberPairsStrings.a11y.homeStringProperty
    } );
    const moveRightDescriptionPatternStringProperty = new PatternStringProperty( NumberPairsStrings.a11y.moveAcrossDescriptionPatternStringProperty, {
      item: itemStringProperty,
      addend: NumberPairsStrings.a11y.rightStringProperty,
      key: NumberPairsStrings.a11y.endStringProperty
    } );
    const moveCountingObjectHomeRow = KeyboardHelpSectionRow.labelWithIcon( moveLeftPatternStringProperty, TextKeyNode.home(), {
      labelInnerContent: moveLeftDescriptionPatternStringProperty
    } );
    const moveCountingObjectEndRow = KeyboardHelpSectionRow.labelWithIcon( moveRightPatternStringProperty, TextKeyNode.end(), {
      labelInnerContent: moveRightDescriptionPatternStringProperty
    } );

    super( headingStringProperty, [ moveCountingObjectHomeRow, moveCountingObjectEndRow ] );
  }
}

numberPairs.register( 'MoveAcrossAreaKeyboardHelpSection', MoveAcrossAreaKeyboardHelpSection );