// Copyright 2025, University of Colorado Boulder
/**
 * NumberModelTypeControl is a radio button group that allows the user to select the type of number model.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import PreferencesControl, { PreferencesControlOptions } from '../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsPreferences, { NumberModelType } from '../model/NumberPairsPreferences.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';

type NumberModelTypeControlOptions = WithRequired<PreferencesControlOptions, 'tandem'>;
export default class NumberModelTypeControl extends PreferencesControl {

  public constructor( providedOptions: NumberModelTypeControlOptions ) {
    const radioButtonGroup = new RectangularRadioButtonGroup( NumberPairsPreferences.numberModelTypeProperty,
      [
        {
          createNode: () => new Text( 'Number Bond', PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
          value: NumberModelType.NUMBER_BOND_MODEL,
          tandemName: 'numberBondModelRadioButton'
        },
        {
          createNode: () => new Text( 'Bar Model', PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
          value: NumberModelType.BAR_MODEL,
          tandemName: 'barModelRadioButton'
        }
      ], {
        orientation: 'horizontal',
        tandem: providedOptions.tandem.createTandem( 'radioButtonGroup' ),
        isDisposable: false,

        // Hide or show the entire row, not just the radio button
        phetioVisiblePropertyInstrumented: false
      } );

    super( combineOptions<PreferencesControlOptions>( {
      labelNode: new Text( NumberPairsStrings.numberModelTypeStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
      descriptionNode: new Text( NumberPairsStrings.numberModelTypeDescriptionStringProperty, PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS ),
      controlNode: radioButtonGroup
    }, providedOptions ) );
  }
}

numberPairs.register( 'NumberModelTypeControl', NumberModelTypeControl );