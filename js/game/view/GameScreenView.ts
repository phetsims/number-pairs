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
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';
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
      model.levelProperty.value = null;
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

    const toggleNode = new ToggleNode<Level | null, Node>( model.levelProperty, [
      { value: null, createNode: () => levelSelectionNode },
      { value: model.levels[ 0 ], createNode: () => level1Node },
      { value: model.levels[ 1 ], createNode: () => level2Node },
      { value: model.levels[ 2 ], createNode: () => level3Node },
      { value: model.levels[ 3 ], createNode: () => level4Node },
      { value: model.levels[ 4 ], createNode: () => level5Node },
      { value: model.levels[ 5 ], createNode: () => level6Node },
      { value: model.levels[ 6 ], createNode: () => level7Node },
      { value: model.levels[ 7 ], createNode: () => level8Node }
    ], {
      alignChildren: ToggleNode.NONE
    } );

    this.addChild( toggleNode );

    this.rewardNode = new NumberPairsRewardNode();
    this.numberPairsRewardDialog = new NumberPairsRewardDialog( model.levelProperty.derived( level =>
        level === null ? 0 : level.levelNumber
      ), () => {
        model.levelProperty.value = null;
      }, () => {

        const level = model.levelProperty.value;
        const levelNumber = level ? level.levelNumber : 0;
        const levelNode = levelNumber === 1 ? level1Node :
                          levelNumber === 2 ? level2Node :
                          levelNumber === 3 ? level3Node :
                          levelNumber === 4 ? level4Node :
                          levelNumber === 5 ? level5Node :
                          levelNumber === 6 ? level6Node :
                          levelNumber === 7 ? level7Node :
                          levelNumber === 8 ? level8Node :
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
    super.step( dt );
    if ( this.rewardNode.visible ) {
      this.rewardNode.step( dt );
    }
  }
}

numberPairs.register( 'GameScreenView', GameScreenView );
