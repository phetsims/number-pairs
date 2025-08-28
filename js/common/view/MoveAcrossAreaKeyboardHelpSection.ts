// Copyright 2025, University of Colorado Boulder
/**
 * Keyboard help section for moving counting objects across an area with home and end keys
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';


export default class MoveAcrossAreaKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( headingStringProperty: TReadOnlyProperty<string>, itemStringProperty: TReadOnlyProperty<string> ) {

    const moveLeftPatternStringProperty = new PatternStringProperty( NumberPairsFluent.keyboardHelpDialog.moveToLeftSidePatternStringProperty, {
      items: itemStringProperty
    } );
    const moveRightPatternStringProperty = new PatternStringProperty( NumberPairsFluent.keyboardHelpDialog.moveToRightSidePatternStringProperty, {
      items: itemStringProperty
    } );
    const moveLeftDescriptionPatternStringProperty = NumberPairsFluent.a11y.controls.moveAcrossDescription.labelInnerContent.createProperty( {
      item: itemStringProperty,
      addend: NumberPairsFluent.a11y.leftStringProperty,
      key: NumberPairsFluent.a11y.homeStringProperty
    } );
    const moveRightDescriptionPatternStringProperty = NumberPairsFluent.a11y.controls.moveAcrossDescription.labelInnerContent.createProperty( {
      item: itemStringProperty,
      addend: NumberPairsFluent.a11y.rightStringProperty,
      key: NumberPairsFluent.a11y.endStringProperty
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