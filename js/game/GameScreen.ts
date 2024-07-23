// Copyright 2024, University of Colorado Boulder

/**
 * GameScreen is the 'Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize from '../../../phet-core/js/optionize.js';
import NumberPairsColors from '../common/NumberPairsColors.js';
import numberPairs from '../numberPairs.js';
import GameModel from './model/GameModel.js';
import GameScreenView from './view/GameScreenView.js';
import NumberPairsStrings from '../NumberPairsStrings.js';

type SelfOptions = {
  //TODO add options that are specific to GameScreen here
};

type GameScreenOptions = SelfOptions & ScreenOptions;

export default class GameScreen extends Screen<GameModel, GameScreenView> {

  public constructor( providedOptions: GameScreenOptions ) {

    const options = optionize<GameScreenOptions, SelfOptions, ScreenOptions>()( {
      name: NumberPairsStrings.screen.gameStringProperty,

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenOptions here
      backgroundColorProperty: NumberPairsColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new GameModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new GameScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

numberPairs.register( 'GameScreen', GameScreen );