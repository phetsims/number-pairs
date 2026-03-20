// Copyright 2024-2026, University of Colorado Boulder

/**
 * A singleton Announcer for speech synthesis in the Number Pairs sim, adapted from numberPlaySpeechSynthesisAnnouncer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberSuiteCommonSpeechSynthesisAnnouncer from '../../../../number-suite-common/js/common/view/NumberSuiteCommonSpeechSynthesisAnnouncer.js';
import NumberPairsPreferences from '../model/NumberPairsPreferences.js';

const numberPlaySpeechSynthesisAnnouncer = new NumberSuiteCommonSpeechSynthesisAnnouncer(
  NumberPairsPreferences.isPrimaryLocaleProperty,
  NumberPairsPreferences.secondLocaleProperty,
  NumberPairsPreferences.primaryVoiceProperty,
  NumberPairsPreferences.secondVoiceProperty
);

export default numberPlaySpeechSynthesisAnnouncer;
