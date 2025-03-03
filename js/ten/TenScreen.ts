// Copyright 2024, University of Colorado Boulder

/**
 * TenScreen is the 'Ten' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import RepresentationType from '../common/model/RepresentationType.js';
import NumberPairsColors from '../common/NumberPairsColors.js';
import numberPairs from '../numberPairs.js';
import NumberPairsStrings from '../NumberPairsStrings.js';
import TenModel from './model/TenModel.js';
import TenScreenView from './view/TenScreenView.js';
import TenScreenKeyboardHelpNode from './view/TenScreenKeyboardHelpNode.js';
import TenScreenIcon from './view/TenScreenIcon.js';

type SelfOptions = EmptySelfOptions;

type TenScreenOptions = SelfOptions & ScreenOptions;

export default class TenScreen extends Screen<TenModel, TenScreenView> {

  public constructor( providedOptions: TenScreenOptions ) {

    const options = optionize<TenScreenOptions, SelfOptions, ScreenOptions>()( {
      name: NumberPairsStrings.screen.tenStringProperty,
      createKeyboardHelpNode: () => new TenScreenKeyboardHelpNode(),
      homeScreenIcon: new TenScreenIcon( { size: Screen.MINIMUM_HOME_SCREEN_ICON_SIZE } ),
      navigationBarIcon: new TenScreenIcon( { size: Screen.MINIMUM_NAVBAR_ICON_SIZE } ),
      backgroundColorProperty: NumberPairsColors.tenScreenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new TenModel( {
        representationTypeValidValues: [
          RepresentationType.BEADS,
          RepresentationType.KITTENS,
          RepresentationType.NUMBER_LINE
        ],
        tandem: options.tandem.createTandem( 'model' )
      } ),
      model => new TenScreenView( model, {
        tandem: options.tandem.createTandem( 'view' )
      } ),
      options
    );
  }
}

numberPairs.register( 'TenScreen', TenScreen );