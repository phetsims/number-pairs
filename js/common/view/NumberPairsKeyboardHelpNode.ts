// Copyright 2025, University of Colorado Boulder

/**
 * Base class for the keyboard help content for the number pairs sim
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import numberPairs from '../../numberPairs.js';

export default class NumberPairsKeyboardHelpNode extends TwoColumnKeyboardHelpContent {

  public constructor( leftContent: KeyboardHelpSection[], topRightContent?: KeyboardHelpSection ) {
    KeyboardHelpSection.alignHelpSectionIcons( leftContent );
    super( leftContent, [ ...( topRightContent ? [ topRightContent ] : [] ), new BasicActionsKeyboardHelpSection( {
      withCheckboxContent: true
    } ) ] );
  }
}

numberPairs.register( 'NumberPairsKeyboardHelpNode', NumberPairsKeyboardHelpNode );