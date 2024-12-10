// Copyright 2024, University of Colorado Boulder

/**
 * NumberPairsPreferencesModel is the preferences model for the Number Pairs sim.
 * Note that in number-play and number-compare, this was not factored out into a class, but instead
 * was directly in {REPO}-main.ts.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PreferencesModel from '../../../../joist/js/preferences/PreferencesModel.js';
// eslint-disable-next-line phet/no-view-imported-from-model
import AutoHearControl from '../../../../number-suite-common/js/common/view/AutoHearControl.js';
// eslint-disable-next-line phet/no-view-imported-from-model
import LanguageAndVoiceControl from '../../../../number-suite-common/js/common/view/LanguageAndVoiceControl.js';
import localeProperty from '../../../../joist/js/i18n/localeProperty.js';
import NumberPairsPreferences from './NumberPairsPreferences.js';
// eslint-disable-next-line phet/no-view-imported-from-model
import numberPairsUtteranceQueue from '../view/numberPairsUtteranceQueue.js';
// eslint-disable-next-line phet/no-view-imported-from-model
import numberPairsSpeechSynthesisAnnouncer from '../view/numberPairsSpeechSynthesisAnnouncer.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import numberPairs from '../../numberPairs.js';
// eslint-disable-next-line phet/no-view-imported-from-model
import NumberPairsPreferencesNode from '../view/NumberPairsPreferencesNode.js';

export default class NumberPairsPreferencesModel extends PreferencesModel {

  public constructor() {
    super( {
      isDisposable: false,

      // Preferences > Simulation
      simulationOptions: {
        customPreferences: [ {
          createContent: tandem => new NumberPairsPreferencesNode( {
            tandem: tandem
          } )
        } ]
      },

      // Preferences > Audio
      audioOptions: {
        customPreferences: [ {
          createContent: tandem => new AutoHearControl(
            NumberPairsPreferences.autoHearEnabledProperty,
            numberPairsSpeechSynthesisAnnouncer.hasVoiceProperty,
            NumberPairsStrings.automaticallyHearPhraseStringProperty,
            NumberPairsStrings.automaticallyHearPhraseDescriptionStringProperty, {
              tandem: tandem.createTandem( 'autoHearControl' )
            } )
        } ],

        // speech synthesis is the only sound used in this sim, no general sim sounds
        supportsSound: false
      },

      // Preferences > Localization
      localizationOptions: {
        includeLocalePanel: false,
        customPreferences: [ {
          createContent: tandem => new LanguageAndVoiceControl(
            localeProperty,
            NumberPairsPreferences.primaryVoiceProperty,
            numberPairsUtteranceQueue, {
              tandem: tandem.createTandem( 'languageAndVoiceControl' )
            } )
        } ]
      }
    } );
  }
}

numberPairs.register( 'NumberPairsPreferencesModel', NumberPairsPreferencesModel );