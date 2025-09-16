// Copyright 2024-2025, University of Colorado Boulder

/**
 * GameScreen is the 'Game' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import Text from '../../../scenery/js/nodes/Text.js';
import NumberPairsColors from '../common/NumberPairsColors.js';
import numberPairs from '../numberPairs.js';
import NumberPairsFluent from '../NumberPairsFluent.js';
import GameModel from './model/GameModel.js';
import GameScreenView from './view/GameScreenView.js';

type SelfOptions = EmptySelfOptions;

type GameScreenOptions = SelfOptions & ScreenOptions;

export default class GameScreen extends Screen<GameModel, GameScreenView> {

  public constructor( providedOptions: GameScreenOptions ) {

    const options = optionize<GameScreenOptions, SelfOptions, ScreenOptions>()( {
      name: NumberPairsFluent.screen.gameStringProperty,
      createKeyboardHelpNode: () => new Text( 'hello world' ),

      //TODO add default values for optional SelfOptions here, https://github.com/phetsims/number-pairs/issues/36

      //TODO add default values for optional ScreenOptions here, https://github.com/phetsims/number-pairs/issues/36
      backgroundColorProperty: NumberPairsColors.introScreenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new GameModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new GameScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

numberPairs.register( 'GameScreen', GameScreen );