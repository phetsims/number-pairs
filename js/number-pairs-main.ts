// Copyright 2024-2025, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../axon/js/DerivedProperty.js';
import audioManager from '../../joist/js/audioManager.js';
import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import DisplayGlobals from '../../scenery/js/display/DisplayGlobals.js';
import isSettingPhetioStateProperty from '../../tandem/js/isSettingPhetioStateProperty.js';
import Tandem from '../../tandem/js/Tandem.js';
import SpeechSynthesisAnnouncer from '../../utterance-queue/js/SpeechSynthesisAnnouncer.js';
import NumberPairsPreferencesModel from './common/model/NumberPairsPreferencesModel.js';
import numberPairsSpeechSynthesisAnnouncer from './common/view/numberPairsSpeechSynthesisAnnouncer.js';
import numberPairsUtteranceQueue from './common/view/numberPairsUtteranceQueue.js';
import IntroScreen from './intro/IntroScreen.js';
import NumberPairsStrings from './NumberPairsStrings.js';
import './common/NumberPairsQueryParameters.js';
import SumScreen from './sum/SumScreen.js';
import TenScreen from './ten/TenScreen.js';
import TwentyScreen from './twenty/TwentyScreen.js';

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
      leadDesign: 'Cathy Carter',
      softwareDevelopment: 'Chris Malley, Marla Schulz',
      team: '',
      contributors: '',
      qualityAssurance: '',
      graphicArts: 'Cathy Carter, Amanda McGarry',
      soundDesign: '',
      thanks: ''
    },
    preferencesModel: new NumberPairsPreferencesModel()
  };

  const sim = new Sim( titleStringProperty, screens, options );
  sim.start();

  // Initialize the speech synthesis feature. This was adapted from number-play-main.ts.
  if ( SpeechSynthesisAnnouncer.isSpeechSynthesisSupported() ) {
    numberPairsSpeechSynthesisAnnouncer.initialize( DisplayGlobals.userGestureEmitter, {

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