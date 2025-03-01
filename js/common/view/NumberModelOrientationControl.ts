// Copyright 2025, University of Colorado Boulder
/**
 * NumberModelOrientationControl is a radio button group that allows the user to select the orientation of the number
 * model on the sum screen.
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
import NumberPairsPreferences from '../model/NumberPairsPreferences.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';

type NumberModelTypeControlOptions = WithRequired<PreferencesControlOptions, 'tandem'>;
export default class NumberModelOrientationControl extends PreferencesControl {

  public constructor( providedOptions: NumberModelTypeControlOptions ) {
    const radioButtonGroup = new RectangularRadioButtonGroup( NumberPairsPreferences.sumScreenTotalOnTopProperty,
      [
        {
          createNode: () => new Text( 'Bottom', PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
          value: false,
          tandemName: 'totalOnBottomRadioButton'
        },
        {
          createNode: () => new Text( 'Top', PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
          value: true,
          tandemName: 'totalOnTopRadioButton'
        }
      ], {
        orientation: 'horizontal',
        tandem: providedOptions.tandem.createTandem( 'radioButtonGroup' ),
        isDisposable: false,

        // Hide or show the entire row, not just the radio button
        phetioVisiblePropertyInstrumented: false
      } );
    super( combineOptions<PreferencesControlOptions>( {
      labelNode: new Text( NumberPairsStrings.sumScreenNumberModelOrientationStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
      descriptionNode: new Text( NumberPairsStrings.sumScreenNumberModelOrientationDescriptionStringProperty, PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS ),
      controlNode: radioButtonGroup
    }, providedOptions ) );
  }
}

numberPairs.register( 'NumberModelOrientationControl', NumberModelOrientationControl );