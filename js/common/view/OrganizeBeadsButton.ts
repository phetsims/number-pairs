// Copyright 2024, University of Colorado Boulder
/**
 * TODO: describe file
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import numberPairs from '../../numberPairs.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberPairsConstants from '../NumberPairsConstants.js';

type SelfOptions = EmptySelfOptions;
type OrganizeBeadsButtonOptions = SelfOptions & PickRequired<RectangularPushButtonOptions, 'tandem'>
  & StrictOmit<RectangularPushButtonOptions, 'content' | 'listener'>;

export default class OrganizeBeadsButton extends RectangularPushButton {

  public constructor( organizeBeads: () => void, providedOptions: OrganizeBeadsButtonOptions ) {
    const options = optionize4<OrganizeBeadsButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {}, {
      listener: organizeBeads
    }, NumberPairsConstants.RECTANGULAR_PUSH_BUTTON_OPTIONS, providedOptions );
   super( options );
  }
}

numberPairs.register( 'OrganizeBeadsButton', OrganizeBeadsButton );