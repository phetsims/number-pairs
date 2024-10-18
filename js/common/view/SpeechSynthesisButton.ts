// Copyright 2024, University of Colorado Boulder
/**
 * SpeechSynthesisButton is a button that when clicked will speak the number sentence.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import numberPairs from '../../numberPairs.js';
import { Color, Path } from '../../../../scenery/js/imports.js';
import bullhornSolidShape from '../../../../sherpa/js/fontawesome-5/bullhornSolidShape.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import NumberPairsConstants from '../NumberPairsConstants.js';

type SelfOptions = EmptySelfOptions;
type SpeechSynthesisButtonOptions = WithRequired<RectangularPushButtonOptions, 'tandem'>;

// TODO: Add speech synthesis functionality: https://github.com/phetsims/number-pairs/issues/18
export default class SpeechSynthesisButton extends RectangularPushButton {

  public constructor( providedOptions?: SpeechSynthesisButtonOptions ) {

    const options = optionize4<SpeechSynthesisButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {},
      {
        content: new Path( bullhornSolidShape, {
          fill: Color.BLACK
        } )
      }, NumberPairsConstants.RECTANGULAR_PUSH_BUTTON_OPTIONS, providedOptions );
    super( options );
  }
}

numberPairs.register( 'SpeechSynthesisButton', SpeechSynthesisButton );