// Copyright 2024, University of Colorado Boulder

/**
 * TenScreen is the 'Ten' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize from '../../../phet-core/js/optionize.js';
import NumberPairsColors from '../common/NumberPairsColors.js';
import numberPairs from '../numberPairs.js';
import TenModel from './model/TenModel.js';
import TenScreenView from './view/TenScreenView.js';
import NumberPairsStrings from '../NumberPairsStrings.js';

type SelfOptions = {
  //TODO add options that are specific to TenScreen here
};

type TenScreenOptions = SelfOptions & ScreenOptions;

export default class TenScreen extends Screen<TenModel, TenScreenView> {

  public constructor( providedOptions: TenScreenOptions ) {

    const options = optionize<TenScreenOptions, SelfOptions, ScreenOptions>()( {
      name: NumberPairsStrings.screen.tenStringProperty,

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenOptions here
      backgroundColorProperty: NumberPairsColors.tenScreenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new TenModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new TenScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

numberPairs.register( 'TenScreen', TenScreen );