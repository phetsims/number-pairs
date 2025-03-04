// Copyright 2024-2025, University of Colorado Boulder

/**
 * IntroScreen is the 'Intro' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import RepresentationType from '../common/model/RepresentationType.js';
import NumberPairsColors from '../common/NumberPairsColors.js';
import numberPairs from '../numberPairs.js';
import NumberPairsStrings from '../NumberPairsStrings.js';
import IntroModel from './model/IntroModel.js';
import IntroScreenView from './view/IntroScreenView.js';
import IntroScreenKeyboardHelpNode from './view/IntroScreenKeyboardHelpNode.js';
import IntroScreenIcon from './view/IntroScreenIcon.js';

type SelfOptions = EmptySelfOptions;

type IntroScreenOptions = SelfOptions & ScreenOptions;

export default class IntroScreen extends Screen<IntroModel, IntroScreenView> {

  public constructor( providedOptions: IntroScreenOptions ) {

    const options = optionize<IntroScreenOptions, SelfOptions, ScreenOptions>()( {
      name: NumberPairsStrings.screen.introStringProperty,
      createKeyboardHelpNode: () => new IntroScreenKeyboardHelpNode(),
      homeScreenIcon: new IntroScreenIcon( { size: Screen.MINIMUM_HOME_SCREEN_ICON_SIZE } ),
      navigationBarIcon: new IntroScreenIcon( { size: Screen.MINIMUM_NAVBAR_ICON_SIZE } ),
      backgroundColorProperty: NumberPairsColors.introScreenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new IntroModel( {
        representationTypeValidValues: [
          RepresentationType.APPLES,
          RepresentationType.SOCCER_BALLS,
          RepresentationType.BUTTERFLIES,
          RepresentationType.ONE_CARDS
        ],
        tandem: options.tandem.createTandem( 'model' )
      } ),
      model => new IntroScreenView( model, {
        tandem: options.tandem.createTandem( 'view' )
      } ),
      options
    );
  }
}

numberPairs.register( 'IntroScreen', IntroScreen );