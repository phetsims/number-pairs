// Copyright 2024-2025, University of Colorado Boulder

/**
 * A singleton UtteranceQueue for speech synthesis in the Number Pairs sim, adapted from numberPlayUtteranceQueue.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import TProperty from '../../../../axon/js/TProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import NumberSuiteCommonUtteranceQueue from '../../../../number-suite-common/js/common/view/NumberSuiteCommonUtteranceQueue.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsPreferences from '../model/NumberPairsPreferences.js';
import numberPairsSpeechSynthesisAnnouncer from './numberPairsSpeechSynthesisAnnouncer.js';

class NumberPairsUtteranceQueue extends NumberSuiteCommonUtteranceQueue {

  // Speech data for each screen that has the speech synthesis feature. Should be updated in the screen's model.
  public readonly introScreenSpeechDataProperty: TProperty<string>;
  public readonly tenScreenSpeechDataProperty: TProperty<string>;
  public readonly twentyScreenSpeechDataProperty: TProperty<string>;
  public readonly sumScreenSpeechDataProperty: TProperty<string>;

  public constructor() {
    super(
      numberPairsSpeechSynthesisAnnouncer,
      NumberPairsPreferences.isPrimaryLocaleProperty,
      NumberPairsPreferences.primaryVoiceProperty,
      NumberPairsPreferences.secondVoiceProperty,
      NumberPairsPreferences.autoHearEnabledProperty
    );

    this.introScreenSpeechDataProperty = new StringProperty( '' );
    this.tenScreenSpeechDataProperty = new StringProperty( '' );
    this.twentyScreenSpeechDataProperty = new StringProperty( '' );
    this.sumScreenSpeechDataProperty = new StringProperty( '' );
  }

  /**
   * Starts the initialization process by using the provided selectedScreenProperty to determine which speechData
   * to use for a given screen that the user is viewing. This is needed because selectedScreenProperty doesn't exist
   * yet during the creation of this singleton.
   */
  public initialize( selectedScreenProperty: TReadOnlyProperty<unknown> ): void {

    const speechDataProperty = new DerivedProperty(
      [ this.introScreenSpeechDataProperty, this.tenScreenSpeechDataProperty, this.twentyScreenSpeechDataProperty,
        this.sumScreenSpeechDataProperty, selectedScreenProperty ],
      ( introScreenSpeechData, tenScreenSpeechData, twentyScreenSpeechData, sumScreenSpeechData, selectedScreen ) => {

        // We want the speech data to reflect the selected screen. Returns null for screens that do not support speech
        // synthesis.
        return selectedScreen instanceof phet.numberPairs.IntroScreen ? introScreenSpeechData :
               selectedScreen instanceof phet.numberPairs.TenScreen ? tenScreenSpeechData :
               selectedScreen instanceof phet.numberPairs.TwentyScreen ? twentyScreenSpeechData :
               selectedScreen instanceof phet.numberPairs.SumScreen ? sumScreenSpeechData :
               null;
      } );

    // Notify listeners on speechDataProperty so if autoHear is turned on, the data is spoken whenever the selected
    // screen changes. The DerivedProperty above covers most, but not all, cases when changing screens.
    // See https://github.com/phetsims/number-play/issues/217.
    selectedScreenProperty.lazyLink( () => {

      // Cancel any speech currently in progress when changing screens.
      this.cancelSpeechDataSpeaking();
      speechDataProperty.value && speechDataProperty.notifyListenersStatic();
    } );

    this.initializeNumberSuiteCommonUtteranceQueue( speechDataProperty );
  }
}

const numberPairsUtteranceQueue = new NumberPairsUtteranceQueue();

numberPairs.register( 'numberPairsUtteranceQueue', numberPairsUtteranceQueue );
export default numberPairsUtteranceQueue;