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
    }
  };

  const sim = new Sim( titleStringProperty, screens, options );
  sim.start();
} );