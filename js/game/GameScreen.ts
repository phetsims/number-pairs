// Copyright 2024-2025, University of Colorado Boulder

/**
 * GameScreen is the 'Game' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import PickRequired from '../../../phet-core/js/types/PickRequired.js';
import StarNode from '../../../scenery-phet/js/StarNode.js';
import Rectangle from '../../../scenery/js/nodes/Rectangle.js';
import NumberPairsColors from '../common/NumberPairsColors.js';
import NumberPairsConstants from '../common/NumberPairsConstants.js';
import numberPairs from '../numberPairs.js';
import NumberPairsFluent from '../NumberPairsFluent.js';
import GameModel from './model/GameModel.js';
import GameScreenKeyboardHelpNode from './view/GameScreenKeyboardHelpNode.js';
import GameScreenView from './view/GameScreenView.js';

type SelfOptions = EmptySelfOptions;
type GameScreenOptions = SelfOptions & PickRequired<ScreenOptions, 'tandem'>;

export default class GameScreen extends Screen<GameModel, GameScreenView> {

  public constructor( providedOptions: GameScreenOptions ) {

    const options = optionize<GameScreenOptions, SelfOptions, ScreenOptions>()( {
      name: NumberPairsFluent.screen.gameStringProperty,
      createKeyboardHelpNode: () => new GameScreenKeyboardHelpNode(),
      backgroundColorProperty: NumberPairsColors.introScreenBackgroundColorProperty,
      homeScreenIcon: new ScreenIcon( new Rectangle( 0, 0, 100, 100, {
        fill: null, stroke: null, children: [
          new StarNode( {
            scale: 2.5,
            centerX: 50, centerY: 50
          } )
        ]
      } ) ),
      screenButtonsHelpText: NumberPairsFluent.a11y.screenButtonsHelpText.game.createProperty( {
        min: NumberPairsConstants.GAME_TWENTY_RANGE.min,
        max: NumberPairsConstants.GAME_TWENTY_RANGE.max
      } )
    }, providedOptions );

    super(
      () => new GameModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new GameScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

numberPairs.register( 'GameScreen', GameScreen );