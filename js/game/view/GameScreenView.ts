// Copyright 2024-2025, University of Colorado Boulder

/**
 * GameScreenView is the top-level view for the 'Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import optionize from '../../../../phet-core/js/optionize.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import LevelSelectionNode from './LevelSelectionNode.js';

type SelfOptions = {
  //TODO add options that are specific to GameScreenView here https://github.com/phetsims/number-pairs/issues/36
};

type GameScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class GameScreenView extends ScreenView {

  public constructor( model: GameModel, providedOptions: GameScreenViewOptions ) {

    const options = optionize<GameScreenViewOptions, SelfOptions, ScreenViewOptions>()( {

      //TODO add default values for optional SelfOptions here https://github.com/phetsims/number-pairs/issues/36

      //TODO add default values for optional ScreenViewOptions here https://github.com/phetsims/number-pairs/issues/36
    }, providedOptions );

    super( options );

    // Level selection UI
    const levelSelectionNode = new LevelSelectionNode( model, this.layoutBounds, options.tandem.createTandem( 'levelSelectionNode' ) );
    this.addChild( levelSelectionNode );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    //TODO https://github.com/phetsims/number-pairs/issues/36
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    //TODO https://github.com/phetsims/number-pairs/issues/36
  }
}

numberPairs.register( 'GameScreenView', GameScreenView );