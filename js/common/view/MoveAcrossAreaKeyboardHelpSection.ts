// Copyright 2025, University of Colorado Boulder
/**
 * Keyboard help section for moving counting objects across an area with home and end keys
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
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

    const moveCountingObjectHomeRow = KeyboardHelpSectionRow.fromHotkeyData( new HotkeyData( {
      keys: [ 'home' ],
      keyboardHelpDialogLabelStringProperty: moveLeftPatternStringProperty,
      repoName: numberPairs.name
    } ) );

    const moveCountingObjectEndRow = KeyboardHelpSectionRow.fromHotkeyData( new HotkeyData( {
      keys: [ 'end' ],
      keyboardHelpDialogLabelStringProperty: moveRightPatternStringProperty,
      repoName: numberPairs.name
    } ) );

    super( headingStringProperty, [ moveCountingObjectHomeRow, moveCountingObjectEndRow ] );
  }
}

numberPairs.register( 'MoveAcrossAreaKeyboardHelpSection', MoveAcrossAreaKeyboardHelpSection );