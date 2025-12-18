// Copyright 2025, University of Colorado Boulder
/**
 * Keyboard help section for the counting object spinners
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import SceneryPhetFluent from '../../../../scenery-phet/js/SceneryPhetFluent.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';


export default class CountingObjectSpinnersKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const adjustSpinnerStringProperty = new PatternStringProperty( SceneryPhetFluent.keyboardHelpDialog.verbSliderPatternStringProperty, {
      verb: SceneryPhetFluent.keyboardHelpDialog.adjustStringProperty,
      slider: NumberPairsFluent.keyboardHelpDialog.numberOfObjectsStringProperty
    } );
    super( NumberPairsFluent.keyboardHelpDialog.adjustObjectsTitleStringProperty, [
      KeyboardHelpSectionRow.labelWithIcon( adjustSpinnerStringProperty, KeyboardHelpIconFactory.arrowKeysRowIcon(), {
        labelInnerContent: NumberPairsFluent.a11y.keyboardHelpDialog.adjustObjectsKeyboard.labelInnerContentStringProperty
      } )
    ] );
  }
}

numberPairs.register( 'CountingObjectSpinnersKeyboardHelpSection', CountingObjectSpinnersKeyboardHelpSection );