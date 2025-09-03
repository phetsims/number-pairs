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
import LevelNode from './LevelNode.js';
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

    const returnToLevelSelection = () => {
      model.modeProperty.value = 'levelSelectionScreen';
    };
    const level1Node = new LevelNode( this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection );
    const level2Node = new LevelNode( this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection );
    const level3Node = new LevelNode( this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection );
    const level4Node = new LevelNode( this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection );
    const level5Node = new LevelNode( this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection );
    const level6Node = new LevelNode( this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection );
    const level7Node = new LevelNode( this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection );
    const level8Node = new LevelNode( this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection );

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

    model.modeProperty.link( mode => {
      this.children = [];
      if ( mode === 'levelSelectionScreen' ) {
        this.addChild( levelSelectionNode );
        this.addChild( resetAllButton );
      }

      // TODO: Do not review yet, work in progress, see https://github.com/phetsims/number-pairs/issues/36
      else if ( mode === 'level1' ) {
        this.addChild( level1Node );
      }
      else if ( mode === 'level2' ) {
        this.addChild( level2Node );
      }
      else if ( mode === 'level3' ) {
        this.addChild( level3Node );
      }
      else if ( mode === 'level4' ) {
        this.addChild( level4Node );
      }
      else if ( mode === 'level5' ) {
        this.addChild( level5Node );
      }
      else if ( mode === 'level6' ) {
        this.addChild( level6Node );
      }
      else if ( mode === 'level7' ) {
        this.addChild( level7Node );
      }
      else if ( mode === 'level8' ) {
        this.addChild( level8Node );
      }
    } );
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