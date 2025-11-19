// Copyright 2024-2025, University of Colorado Boulder

/**
 * GameScreenView is the top-level view for the 'Game' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ToggleNode from '../../../../sun/js/ToggleNode.js';
import GameAudioPlayer from '../../../../vegas/js/GameAudioPlayer.js';
import NumberPairsQueryParameters from '../../common/NumberPairsQueryParameters.js';
import numberPairs from '../../numberPairs.js';
import GameModel, { LevelSelection } from '../model/GameModel.js';
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

    const returnToLevelSelection = () => {
      model.selectedLevelProperty.value = 'levelSelectionScreen';
    };

    const createLevelNode = ( levelNumber: number ) => {
      const level = model.getLevel( levelNumber );
      return level.type === 'bond' ?
             new BondBarLevelNode( levelNumber => model.getLevel( levelNumber ), level, this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection, options.tandem.createTandem( `levelNode${levelNumber}` ) ) :
             ( level.type === 'sumEquation' || level.type === 'decompositionEquation' ) ?
             new EquationLevelNode( levelNumber => model.getLevel( levelNumber ), level, this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection, options.tandem.createTandem( `levelNode${levelNumber}` ) ) :
             new NumberLineLevelNode( levelNumber => model.getLevel( levelNumber ), level as NumberLineLevel, this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection, options.tandem.createTandem( `levelNode${levelNumber}` ) );
    };

    const level1Node = createLevelNode( 1 );
    const level2Node = createLevelNode( 2 );
    const level3Node = createLevelNode( 3 );
    const level4Node = createLevelNode( 4 );
    const level5Node = createLevelNode( 5 );
    const level6Node = createLevelNode( 6 );
    const level7Node = createLevelNode( 7 );
    const level8Node = createLevelNode( 8 );

    const toggleNode = new ToggleNode<LevelSelection, Node>( model.selectedLevelProperty, [
      { value: 'levelSelectionScreen', createNode: () => levelSelectionNode },
      { value: 'level1', createNode: () => level1Node },
      { value: 'level2', createNode: () => level2Node },
      { value: 'level3', createNode: () => level3Node },
      { value: 'level4', createNode: () => level4Node },
      { value: 'level5', createNode: () => level5Node },
      { value: 'level6', createNode: () => level6Node },
      { value: 'level7', createNode: () => level7Node },
      { value: 'level8', createNode: () => level8Node }
    ], {
      alignChildren: ToggleNode.NONE
    } );

    this.addChild( toggleNode );

    this.rewardNode = new NumberPairsRewardNode();
    this.numberPairsRewardDialog = new NumberPairsRewardDialog( model.selectedLevelProperty.derived( mode =>
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
        model.selectedLevelProperty.value = 'levelSelectionScreen';
      }, () => {

        const level = model.selectedLevelProperty.value;
        const levelNode = level === 'level1' ? level1Node :
                          level === 'level2' ? level2Node :
                          level === 'level3' ? level3Node :
                          level === 'level4' ? level4Node :
                          level === 'level5' ? level5Node :
                          level === 'level6' ? level6Node :
                          level === 'level7' ? level7Node :
                          level === 'level8' ? level8Node :
                          null;

        if ( levelNode ) {
          levelNode.nextButton.focus();
        }
      },
      this.rewardNode, NumberPairsQueryParameters.rewardScore, options.tandem.createTandem( 'numberPairsRewardDialog' ) );

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
    //REVIEW Consider calling super.step, in case it's not a no-op in the future.
    if ( this.rewardNode.visible ) {
      this.rewardNode.step( dt );
    }
  }
}

numberPairs.register( 'GameScreenView', GameScreenView );
