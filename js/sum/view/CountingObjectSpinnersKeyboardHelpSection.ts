// Copyright 2025-2026, University of Colorado Boulder
/**
 * Keyboard help section for the counting object spinners
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import SceneryPhetFluent from '../../../../scenery-phet/js/SceneryPhetFluent.js';
import AccessibleValueHandlerHotkeyDataCollection from '../../../../sun/js/accessibility/AccessibleValueHandlerHotkeyDataCollection.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';

export default class CountingObjectSpinnersKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const adjustSpinnerStringProperty = new PatternStringProperty( SceneryPhetFluent.keyboardHelpDialog.verbSliderPatternStringProperty, {
      verb: SceneryPhetFluent.keyboardHelpDialog.adjustStringProperty,
      slider: NumberPairsFluent.keyboardHelpDialog.numberOfObjectsStringProperty
    } );
    super( NumberPairsFluent.keyboardHelpDialog.adjustObjectsTitleStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData( AccessibleValueHandlerHotkeyDataCollection.ARROW_KEYS_HOTKEY_DATA, {
        labelStringProperty: adjustSpinnerStringProperty
      } )
    ] );
  }
}

numberPairs.register( 'CountingObjectSpinnersKeyboardHelpSection', CountingObjectSpinnersKeyboardHelpSection );