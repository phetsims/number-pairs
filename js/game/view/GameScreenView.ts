// Copyright 2024-2025, University of Colorado Boulder

/**
 * GameScreenView is the top-level view for the 'Game' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import LevelNode from './LevelNode.js';
import LevelSelectionNode from './LevelSelectionNode.js';

type SelfOptions = EmptySelfOptions;
type GameScreenViewOptions = PickRequired<ScreenViewOptions, 'tandem'>;

export default class GameScreenView extends ScreenView {

  public constructor( model: GameModel, providedOptions: PickRequired<ScreenViewOptions, 'tandem'> ) {

    const options = optionize<GameScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
      // Remove the "normal" PDOM structure Nodes like the screen summary, play area, and control area Nodes from the
      // HomeScreen. The HomeScreen handles its own description.
      includePDOMNodes: false
    }, providedOptions );

    super( options );

    // Level selection UI
    const levelSelectionNode = new LevelSelectionNode( model, this.layoutBounds, options.tandem.createTandem( 'levelSelectionNode' ) );
    this.addChild( levelSelectionNode );

    const returnToLevelSelection = () => {
      model.modeProperty.value = 'levelSelectionScreen';
    };
    const levelNodes = Array.from( { length: model.getLevelCount() }, ( _, i ) =>
      new LevelNode( model, model.getLevel( i + 1 ), this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection, options.tandem.createTandem( `levelNode${i + 1}` ) )
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
      if ( model.modeProperty.value === 'levelSelectionScreen' ) {
        this.addChild( levelSelectionNode );
        this.addChild( resetAllButton );
      }
      else {
        const level = model.modeProperty.value;
        const levelNumber = Number( level.charAt( level.length - 1 ) ); // level is 'levelN' where N is 1,2,...

        affirm( !isNaN( levelNumber ) && levelNumber >= 1 && levelNumber <= model.getLevelCount(), `Unexpected mode: ${level}` );
        affirm( levelNodes[ levelNumber - 1 ], `Missing LevelNode for level ${levelNumber}` );
        // add the level node for the current level

        this.addChild( levelNodes[ levelNumber - 1 ] );
      }
    };
    model.modeProperty.link( render );
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