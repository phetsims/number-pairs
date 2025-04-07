// Copyright 2025, University of Colorado Boulder
/**
 * Keyboard help section for the counting object spinners
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import numberPairs from '../../numberPairs.js';
import SceneryPhetStrings from '../../../../scenery-phet/js/SceneryPhetStrings.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';


export default class CountingObjectSpinnersKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const adjustSpinnerStringProperty = new PatternStringProperty( SceneryPhetStrings.keyboardHelpDialog.verbSliderPatternStringProperty, {
      verb: SceneryPhetStrings.keyboardHelpDialog.adjustStringProperty,
      slider: NumberPairsStrings.keyboardHelpDialog.numberOfObjectsStringProperty
    } );
    super( NumberPairsStrings.keyboardHelpDialog.adjustObjectsTitleStringProperty, [
      KeyboardHelpSectionRow.labelWithIcon( adjustSpinnerStringProperty, KeyboardHelpIconFactory.arrowKeysRowIcon(), {
        labelInnerContent: NumberPairsStrings.a11y.adjustObjectsStringProperty
      } )
    ] );
  }
}

numberPairs.register( 'CountingObjectSpinnersKeyboardHelpSection', CountingObjectSpinnersKeyboardHelpSection );