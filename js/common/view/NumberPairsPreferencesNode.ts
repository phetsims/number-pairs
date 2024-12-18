// Copyright 2024, University of Colorado Boulder

/**
 * NumberPairsPreferencesNode is the set of controls for preferences that appear in the Simulation tab
 * of the Preferences dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import { Text } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import SecondLanguageControl from '../../../../number-suite-common/js/common/view/SecondLanguageControl.js';
import NumberPairsPreferences from '../model/NumberPairsPreferences.js';
import numberPairsUtteranceQueue from './numberPairsUtteranceQueue.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PreferencesControl from '../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import PreferencesPanelContentNode, { PreferencesPanelContentNodeOptions } from '../../../../joist/js/preferences/PreferencesPanelContentNode.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import WithOptional from '../../../../phet-core/js/types/WithOptional.js';

type SelfOptions = {
  secondLanguageControlVisible?: boolean; // should the 'Second Language' control be visible?
};

export type NumberPairsPreferencesNodeOptions = SelfOptions &
  StrictOmit<PreferencesPanelContentNodeOptions, 'content'> &
  PickRequired<PreferencesPanelContentNodeOptions, 'tandem'>;

export default class NumberPairsPreferencesNode extends PreferencesPanelContentNode {

  public constructor( providedOptions: NumberPairsPreferencesNodeOptions ) {

    const options = optionize<NumberPairsPreferencesNodeOptions, SelfOptions, WithOptional<PreferencesPanelContentNodeOptions, 'content'>>()( {

      // SelfOptions
      secondLanguageControlVisible: true,

      // PreferencesPanelContentNodeOptions
      isDisposable: false,
      fill: 'white'
    }, providedOptions );

    const numberModelRadioButtonGroup = new RectangularRadioButtonGroup( NumberPairsConstants.NUMBER_MODEL_TYPE_PROPERTY,
      [
        {
          createNode: () => new Text( 'Number Bond', PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
          value: 'numberBondModel',
          tandemName: 'numberBondModelRadioButton'
        },
        {
          createNode: () => new Text( 'Bar Model', PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
          value: 'barModel',
          tandemName: 'barModelRadioButton'
        }
      ], {
        orientation: 'horizontal',
        tandem: options.tandem.createTandem( 'numberModelRadioButtonGroup' ),
        isDisposable: false,

        // Hide or show the entire row, not just the radio button
        phetioVisiblePropertyInstrumented: false
      } );
    const numberModelControl = new PreferencesControl( {
      labelNode: new Text( 'Number Model Type', PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
      controlNode: numberModelRadioButtonGroup
    } );
    const secondLanguageControl = new SecondLanguageControl(
      NumberPairsPreferences.secondLocaleProperty,
      NumberPairsPreferences.secondVoiceProperty,
      NumberPairsPreferences.secondLocaleEnabledProperty,
      NumberPairsPreferences.isPrimaryLocaleProperty,
      NumberPairsConstants.ALL_URL,
      numberPairsUtteranceQueue, {
        visible: options.secondLanguageControlVisible,
        tandem: options.tandem.createTandem( 'secondLanguageControl' )
      } );

    options.content = [ numberModelControl, secondLanguageControl ];

    super( options );
  }
}

numberPairs.register( 'NumberPairsPreferencesNode', NumberPairsPreferencesNode );