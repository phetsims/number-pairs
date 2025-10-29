// Copyright 2024-2025, University of Colorado Boulder
/**
 * This button toggles the visibility of the addend (or addends).
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import EyeToggleButton, { EyeToggleButtonOptions } from '../../../../scenery-phet/js/buttons/EyeToggleButton.js';
import Color from '../../../../scenery/js/util/Color.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import NumberPairsConstants from '../NumberPairsConstants.js';

type SelfOptions = EmptySelfOptions;
type AddendEyeToggleButtonOptions = SelfOptions & WithRequired<EyeToggleButtonOptions, 'tandem'>;

const HEIGHT = 40; // empirically determined
export default class AddendEyeToggleButton extends EyeToggleButton {

  public constructor( addendVisibleProperty: BooleanProperty, providedOptions: AddendEyeToggleButtonOptions ) {

    const options = optionize<AddendEyeToggleButtonOptions, SelfOptions, EyeToggleButtonOptions>()( {
      size: new Dimension2( NumberPairsConstants.RECTANGULAR_PUSH_BUTTON_OPTIONS.size.width, HEIGHT ),
      baseColor: Color.WHITE,
      touchAreaXDilation: 5,
      touchAreaYDilation: 5,
      accessibleContextResponseOn: NumberPairsFluent.a11y.controls.addendVisibleButton.accessibleContextResponseOnStringProperty,
      accessibleContextResponseOff: NumberPairsFluent.a11y.controls.addendVisibleButton.accessibleContextResponseOffStringProperty
    }, providedOptions );

    super( addendVisibleProperty, options );
  }
}

numberPairs.register( 'AddendEyeToggleButton', AddendEyeToggleButton );