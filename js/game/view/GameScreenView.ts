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
import ToggleNode, { ToggleNodeElement } from '../../../../sun/js/ToggleNode.js';
import GameAudioPlayer from '../../../../vegas/js/GameAudioPlayer.js';
import NumberPairsQueryParameters from '../../common/NumberPairsQueryParameters.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';
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
      model.levelProperty.value = null;
    };

    const createLevelNode = ( levelNumber: number ) => {
      const level = model.getLevel( levelNumber );
      return level.type === 'bond' ?
             new BondBarLevelNode( levelNumber => model.getLevel( levelNumber ), level, this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection, { tandem: options.tandem.createTandem( `levelNode${levelNumber}` ) } ) :
             ( level.type === 'sumEquation' || level.type === 'decompositionEquation' ) ?
             new EquationLevelNode( levelNumber => model.getLevel( levelNumber ), level, this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection, { tandem: options.tandem.createTandem( `levelNode${levelNumber}` ) } ) :
             new NumberLineLevelNode( levelNumber => model.getLevel( levelNumber ), level as NumberLineLevel, this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection, options.tandem.createTandem( `levelNode${levelNumber}` ) );
    };

    //For each level, create a LevelNode and a ToggleNode that displays the LevelNode for the selected level,
    // or the level selection screen if no level is selected.
    const levelNodes: LevelNode[] = [];
    const levelElements: ToggleNodeElement<Level | null>[] = [ { value: null, createNode: () => levelSelectionNode } ];
    model.levels.forEach( ( level, index ) => {
      const levelNode = createLevelNode( index + 1 );
      levelNodes.push( levelNode );
      levelElements.push( { value: level, createNode: () => levelNode } );
    } );

    const toggleNode = new ToggleNode<Level | null, Node>( model.levelProperty, levelElements, {
      alignChildren: ToggleNode.NONE
    } );

    this.addChild( toggleNode );

    this.rewardNode = new NumberPairsRewardNode();
    this.numberPairsRewardDialog = new NumberPairsRewardDialog( model.levelProperty.derived( level =>
        level === null ? 0 : level.levelNumber
      ), () => {
        model.levelProperty.value = null;
      }, () => {

      // Focus the next button of the current level after closing the reward dialog
        const level = model.levelProperty.value;
        if ( level ) {
          levelNodes[ level.levelNumber - 1 ].nextButton.focus();
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
    super.step( dt );
    if ( this.rewardNode.visible ) {
      this.rewardNode.step( dt );
    }
  }
}

numberPairs.register( 'GameScreenView', GameScreenView );
