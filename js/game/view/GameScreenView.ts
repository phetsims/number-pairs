// Copyright 2024-2025, University of Colorado Boulder

/**
 * GameScreenView is the top-level view for the 'Game' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import derived from '../../../../axon/js/derived.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import { getPDOMFocusedNode } from '../../../../scenery/js/accessibility/pdomFocusProperty.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ToggleNode from '../../../../sun/js/ToggleNode.js';
import GameAudioPlayer from '../../../../vegas/js/GameAudioPlayer.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import NumberPairsQueryParameters from '../../common/NumberPairsQueryParameters.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import NumberLineLevel from '../model/NumberLineLevel.js';
import BondBarLevelNode from './BondBarLevelNode.js';
import EquationLevelNode from './EquationLevelNode.js';
import LevelSelectionNode from './LevelSelectionNode.js';
import NumberLineLevelNode from './NumberLineLevelNode.js';
import NumberPairsRewardDialog from './NumberPairsRewardDialog.js';
import NumberPairsRewardNode from './NumberPairsRewardNode.js';

type SelfOptions = EmptySelfOptions;
type GameScreenViewOptions = PickRequired<ScreenViewOptions, 'tandem'>;

const gameAudioPlayer = new GameAudioPlayer();

export default class GameScreenView extends ScreenView {
  private readonly rewardNode: NumberPairsRewardNode;
  private readonly numberPairsRewardDialog: NumberPairsRewardDialog;

  public constructor( model: GameModel, providedOptions: PickRequired<ScreenViewOptions, 'tandem'> ) {

    const options = optionize<GameScreenViewOptions, SelfOptions, ScreenViewOptions>()( {

      // Remove the "normal" PDOM structure Nodes like the screen summary, play area, and control area Nodes from the
      // HomeScreen. The HomeScreen handles its own description.
      includeAccessibleSectionNodes: false
    }, providedOptions );

    super( options );

    const levelSelectionNode = new LevelSelectionNode( model, this.layoutBounds, options.tandem.createTandem( 'levelSelectionNode' ) );
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
      },
      right: this.layoutBounds.maxX - NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    const returnToLevelSelection = () => {
      model.modeProperty.value = 'levelSelectionScreen';
    };

    const createLevelNode = ( levelNumber: number ) => {
      const level = model.getLevel( levelNumber );
      return level.type === 'bond' ?
             new BondBarLevelNode( model, level, this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection, options.tandem.createTandem( `levelNode${levelNumber}` ) ) :
             ( level.type === 'sumEquation' || level.type === 'decompositionEquation' ) ?
             new EquationLevelNode( model, level, this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection, options.tandem.createTandem( `levelNode${levelNumber}` ) ) :
             new NumberLineLevelNode( model, level as NumberLineLevel, this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection, options.tandem.createTandem( `levelNode${levelNumber}` ) );
    };

    // Keep track of the last focused Node on the level selection screen to restore focus when you return.
    // NOTE: Must be done before the ToggleNode is created, so that we capture the focus before the Node is removed from the PDOM.
    let levelSelectionScreenFocus: Node | null = null;
    model.modeProperty.lazyLink( ( mode, oldMode ) => {
      if ( oldMode === 'levelSelectionScreen' ) {
        levelSelectionScreenFocus = getPDOMFocusedNode();
      }
    } );

    const toggleNode = new ToggleNode( model.modeProperty, [
      {
        value: 'levelSelectionScreen', createNode: () => new Node( {
          children: [ new Node( {
            accessibleParagraph: 'Game Screen. Select a level to begin playing. Choose the number that adds to the target number for each challenge.'
          } ), levelSelectionNode, resetAllButton ]
        } )
      },
      { value: 'level1', createNode: () => createLevelNode( 1 ) },
      { value: 'level2', createNode: () => createLevelNode( 2 ) },
      { value: 'level3', createNode: () => createLevelNode( 3 ) },
      { value: 'level4', createNode: () => createLevelNode( 4 ) },
      { value: 'level5', createNode: () => createLevelNode( 5 ) },
      { value: 'level6', createNode: () => createLevelNode( 6 ) },
      { value: 'level7', createNode: () => createLevelNode( 7 ) },
      { value: 'level8', createNode: () => createLevelNode( 8 ) }
    ], {
      alignChildren: ToggleNode.NONE
    } );

    this.addChild( toggleNode );

    // Restore the last focused Node for the mode that became active after the ToggleNode is created.
    // NOTE: Must be done after the ToggleNode is created, so that we restore the focus after the Node is added to the PDOM.
    model.modeProperty.lazyLink( mode => {
      if ( mode === 'levelSelectionScreen' ) {
        levelSelectionScreenFocus?.focus();
      }
    } );

    this.rewardNode = new NumberPairsRewardNode();
    this.numberPairsRewardDialog = new NumberPairsRewardDialog( derived( model.modeProperty, mode =>
      mode === 'level1' ? 1 :
      mode === 'level2' ? 2 :
      mode === 'level3' ? 3 :
      mode === 'level4' ? 4 :
      mode === 'level5' ? 5 :
      mode === 'level6' ? 6 :
      mode === 'level7' ? 7 :
      mode === 'level8' ? 8 :
      0
    ), () => {
      model.modeProperty.value = 'levelSelectionScreen';
    }, this.rewardNode, NumberPairsQueryParameters.rewardScore, options.tandem.createTandem( 'numberPairsRewardDialog' ) );

    this.addChild( this.rewardNode );

    model.levelAnswerFeedbackEmitter.addListener( ( feedback, _level ) => {
      if ( feedback === 'correct' ) {
        gameAudioPlayer.correctAnswer();
      }
      else {
        gameAudioPlayer.wrongAnswer();
      }
    } );

    model.rewardAchievedEmitter.addListener( () => {
      gameAudioPlayer.gameOverPerfectScore();
      this.numberPairsRewardDialog.show();
    } );
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    if ( this.rewardNode.visible ) {
      this.rewardNode.step( dt );
    }
  }
}

numberPairs.register( 'GameScreenView', GameScreenView );
