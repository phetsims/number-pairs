// Copyright 2024-2025, University of Colorado Boulder
/**
 * This button toggles the visibility of the addend (or addends).
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Color } from '../../../../scenery/js/imports.js';
import EyeToggleButton, { EyeToggleButtonOptions } from '../../../../scenery-phet/js/buttons/EyeToggleButton.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import Multilink from '../../../../axon/js/Multilink.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';

type SelfOptions = {
  secondAddendVisibleProperty?: BooleanProperty | null;
};
type ShowHideAddendButtonOptions = SelfOptions & WithRequired<EyeToggleButtonOptions, 'tandem'>;
export default class ShowHideAddendButton extends EyeToggleButton {

  public constructor( addendVisibleProperty: BooleanProperty, providedOptions: ShowHideAddendButtonOptions ) {

    const options = optionize<ShowHideAddendButtonOptions, SelfOptions, EyeToggleButtonOptions>()( {
      size: new Dimension2( NumberPairsConstants.RECTANGULAR_PUSH_BUTTON_OPTIONS.size.width, 40 ),
      secondAddendVisibleProperty: null,
      baseColor: Color.WHITE
    }, providedOptions );

    let addendToggleVisibleProperty = addendVisibleProperty;
    if ( options.secondAddendVisibleProperty ) {
      addendToggleVisibleProperty = new BooleanProperty( addendVisibleProperty.value && options.secondAddendVisibleProperty.value, {
        reentrant: true,
        tandem: options.tandem.createTandem( 'doubleVisibleProperty' )
      } );

      // Track if our addend visible properties are updating to avoid circular updates.
      let updatingAddendVisibleProperties = false;
      addendToggleVisibleProperty.link( value => {
        if ( !updatingAddendVisibleProperties ) {
          updatingAddendVisibleProperties = true;

          // No matter what the addendToggleVisibleProperty is set to, the other Properties must follow suit.
          addendVisibleProperty.value = value;
          options.secondAddendVisibleProperty!.value = value;
          updatingAddendVisibleProperties = false;
        }
      } );

      // If either addendVisibleProperty or secondAddendVisibleProperty changes, update the addendToggleVisibleProperty.
      Multilink.multilink( [ addendVisibleProperty, options.secondAddendVisibleProperty ], ( addendVisible, secondAddendVisible ) => {
        if ( !updatingAddendVisibleProperties ) {
          updatingAddendVisibleProperties = true;
          addendToggleVisibleProperty.set( addendVisible && secondAddendVisible );
          updatingAddendVisibleProperties = false;
        }
      } );
    }
    super( addendToggleVisibleProperty, options );
  }
}

numberPairs.register( 'ShowHideAddendButton', ShowHideAddendButton );