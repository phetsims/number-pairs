// Copyright 2024, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import IntroScreen from './intro/IntroScreen.js';
import NumberPairsStrings from './NumberPairsStrings.js';
import './common/NumberPairsQueryParameters.js';
import SumScreen from './sum/SumScreen.js';
import TenScreen from './ten/TenScreen.js';
import TwentyScreen from './twenty/TwentyScreen.js';
import { Display } from '../../scenery/js/imports.js';
import DerivedProperty from '../../axon/js/DerivedProperty.js';
import isSettingPhetioStateProperty from '../../tandem/js/isSettingPhetioStateProperty.js';
import audioManager from '../../joist/js/audioManager.js';
import numberPairsSpeechSynthesisAnnouncer from './common/view/numberPairsSpeechSynthesisAnnouncer.js';
import numberPairsUtteranceQueue from './common/view/numberPairsUtteranceQueue.js';
import SpeechSynthesisAnnouncer from '../../utterance-queue/js/SpeechSynthesisAnnouncer.js';
import NumberPairsPreferencesModel from './common/model/NumberPairsPreferencesModel.js';

simLauncher.launch( () => {

  const titleStringProperty = NumberPairsStrings[ 'number-pairs' ].titleStringProperty;

  const screens = [
    new IntroScreen( { tandem: Tandem.ROOT.createTandem( 'introScreen' ) } ),
    new TenScreen( { tandem: Tandem.ROOT.createTandem( 'tenScreen' ) } ),
    new TwentyScreen( { tandem: Tandem.ROOT.createTandem( 'twentyScreen' ) } ),
    new SumScreen( { tandem: Tandem.ROOT.createTandem( 'sumScreen' ) } )
    // new GameScreen( { tandem: Tandem.ROOT.createTandem( 'gameScreen' ) } ) // On hold until PhET-iO Game design is ready to continue.
  ];

  const options: SimOptions = {

    //TODO https://github.com/phetsims/number-pairs/issues/3 fill in credits
    credits: {
      leadDesign: '',
      softwareDevelopment: '',
      team: '',
      contributors: '',
      qualityAssurance: '',
      graphicArts: '',
      soundDesign: '',
      thanks: ''
    },
    preferencesModel: new NumberPairsPreferencesModel()
  };

  const sim = new Sim( titleStringProperty, screens, options );
  sim.start();

  // Initialize the speech synthesis feature. This was adapted from number-play-main.ts.
  if ( SpeechSynthesisAnnouncer.isSpeechSynthesisSupported() ) {
    numberPairsSpeechSynthesisAnnouncer.initialize( Display.userGestureEmitter, {

      // Properties that control whether output is allowed with speech synthesis.
      speechAllowedProperty: new DerivedProperty(
        [ sim.isConstructionCompleteProperty, sim.browserTabVisibleProperty, sim.activeProperty,
          isSettingPhetioStateProperty, audioManager.audioEnabledProperty ],
        ( simConstructionComplete, simVisible, simActive, simSettingPhetioState, audioEnabled ) =>
          simConstructionComplete && simVisible && simActive && !simSettingPhetioState && audioEnabled )
    } );
    numberPairsSpeechSynthesisAnnouncer.enabledProperty.value = true;
  }
  numberPairsUtteranceQueue.initialize( sim.selectedScreenProperty );
} );