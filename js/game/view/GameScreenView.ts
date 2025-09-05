// Copyright 2024-2025, University of Colorado Boulder

/**
 * GameScreenView is the top-level view for the 'Game' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import LevelNode from './LevelNode.js';
import LevelSelectionNode from './LevelSelectionNode.js';

export default class GameScreenView extends ScreenView {

  public constructor( model: GameModel, options: PickRequired<ScreenViewOptions, 'tandem'> ) {

    super( options );

    // Level selection UI
    const levelSelectionNode = new LevelSelectionNode( model, this.layoutBounds, options.tandem.createTandem( 'levelSelectionNode' ) );
    this.addChild( levelSelectionNode );

    const returnToLevelSelection = () => model.showSelection();
    const levelNodes = Array.from( { length: model.getLevelCount() }, ( _, i ) =>
      new LevelNode( model, model.getLevel( i + 1 ), this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection )
    );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
      },
      right: this.layoutBounds.maxX - NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    const render = () => {
      this.children = [];
      if ( model.currentViewProperty.value === 'selection' ) {
        this.addChild( levelSelectionNode );
        this.addChild( resetAllButton );
      }
      else {
        const n = model.getCurrentLevelNumber();
        this.addChild( levelNodes[ n - 1 ] );
      }
    };
    model.currentViewProperty.link( render );
    model.currentLevelNumberProperty.link( () => {
      if ( model.currentViewProperty.value === 'level' ) {
        render();
      }
    } );
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {

    // nothing to animate here
  }
}

numberPairs.register( 'GameScreenView', GameScreenView );