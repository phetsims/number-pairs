// Copyright 2024, University of Colorado Boulder

/**
 * IntroScreen is the 'Intro' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize from '../../../phet-core/js/optionize.js';
import NumberPairsColors from '../common/NumberPairsColors.js';
import numberPairs from '../numberPairs.js';
import IntroModel from './model/IntroModel.js';
import IntroScreenView from './view/IntroScreenView.js';
import NumberPairsStrings from '../NumberPairsStrings.js';

type SelfOptions = {
  //TODO add options that are specific to IntroScreen here
};

type IntroScreenOptions = SelfOptions & ScreenOptions;

export default class IntroScreen extends Screen<IntroModel, IntroScreenView> {

  public constructor( providedOptions: IntroScreenOptions ) {

    const options = optionize<IntroScreenOptions, SelfOptions, ScreenOptions>()( {
      name: NumberPairsStrings.screen.introStringProperty,

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenOptions here
      backgroundColorProperty: NumberPairsColors.introScreenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new IntroModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new IntroScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

numberPairs.register( 'IntroScreen', IntroScreen );