// Copyright 2024-2025, University of Colorado Boulder

/**
 * NumberPairsPreferencesNode is the set of controls for preferences that appear in the Simulation tab
 * of the Preferences dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PreferencesPanelContentNode, { PreferencesPanelContentNodeOptions } from '../../../../joist/js/preferences/PreferencesPanelContentNode.js';
import SecondLanguageControl from '../../../../number-suite-common/js/common/view/SecondLanguageControl.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import WithOptional from '../../../../phet-core/js/types/WithOptional.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsPreferences from '../model/NumberPairsPreferences.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import NumberModelOrientationControl from './NumberModelOrientationControl.js';
import NumberModelTypeControl from './NumberModelTypeControl.js';
import numberPairsUtteranceQueue from './numberPairsUtteranceQueue.js';

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

    const numberModelTypeControl = new NumberModelTypeControl( { tandem: options.tandem.createTandem( 'numberModelTypeControl' ) } );
    const sumScreenNumberModelOrientationControl = new NumberModelOrientationControl( { tandem: options.tandem.createTandem( 'sumScreenNumberModelOrientationControl' ) } );
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

    options.content = [ numberModelTypeControl, sumScreenNumberModelOrientationControl, secondLanguageControl ];

    super( options );
  }
}

numberPairs.register( 'NumberPairsPreferencesNode', NumberPairsPreferencesNode );