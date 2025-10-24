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
import Node from '../../../../scenery/js/nodes/Node.js';
import ToggleNode from '../../../../sun/js/ToggleNode.js';
import GameAudioPlayer from '../../../../vegas/js/GameAudioPlayer.js';
import NumberPairsQueryParameters from '../../common/NumberPairsQueryParameters.js';
import numberPairs from '../../numberPairs.js';
import GameModel, { LevelSelection } from '../model/GameModel.js';
import NumberLineLevel from '../model/NumberLineLevel.js';
import BondBarLevelNode from './BondBarLevelNode.js';
import EquationLevelNode from './EquationLevelNode.js';
import LevelNode from './LevelNode.js';
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
             new BondBarLevelNode( model, level, this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection, options.tandem.createTandem( `levelNode${levelNumber}` ) ) :
             ( level.type === 'sumEquation' || level.type === 'decompositionEquation' ) ?
             new EquationLevelNode( model, level, this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection, options.tandem.createTandem( `levelNode${levelNumber}` ) ) :
             new NumberLineLevelNode( model, level as NumberLineLevel, this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection, options.tandem.createTandem( `levelNode${levelNumber}` ) );
    };

    const toggleNode = new ToggleNode<LevelSelection, Node>( model.selectedLevelProperty, [
      { value: 'levelSelectionScreen', createNode: () => levelSelectionNode },
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

    this.rewardNode = new NumberPairsRewardNode();
    this.numberPairsRewardDialog = new NumberPairsRewardDialog( derived( model.selectedLevelProperty, mode =>
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

        // TODO: Better way to move focus to the level button? Possibly pre-allocating level nodes.
        //   See https://github.com/phetsims/number-pairs/issues/282.
        ( toggleNode.children.find( child => child.visible ) as LevelNode ).nextButton.focus();
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
    if ( this.rewardNode.visible ) {
      this.rewardNode.step( dt );
    }
  }
}

numberPairs.register( 'GameScreenView', GameScreenView );
