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
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ToggleNode from '../../../../sun/js/ToggleNode.js';
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

    const levelSelectionNode = new LevelSelectionNode( model, this.layoutBounds, options.tandem.createTandem( 'levelSelectionNode' ) );
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
      },
      right: this.layoutBounds.maxX - NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    const returnToLevelSelection = () => {
      model.modeProperty.value = 'levelSelectionScreen';
    };
    const createLevelNode = ( i: number ) =>
      new LevelNode( model, model.getLevel( i + 1 ), this.layoutBounds, this.visibleBoundsProperty, returnToLevelSelection, options.tandem.createTandem( `levelNode${i + 1}` ) );

    const toggleNode = new ToggleNode( model.modeProperty, [
      {
        value: 'levelSelectionScreen', createNode: () => new Node( {
          children: [ new Node( {
            accessibleParagraph: 'Game Screen. Select a level to begin playing. In each level, find pairs of numbers that add up to the target number.'
          } ), levelSelectionNode, resetAllButton ]
        } )
      },
      { value: 'level1', createNode: () => createLevelNode( 0 ) },
      { value: 'level2', createNode: () => createLevelNode( 1 ) },
      { value: 'level3', createNode: () => createLevelNode( 2 ) },
      { value: 'level4', createNode: () => createLevelNode( 3 ) },
      { value: 'level5', createNode: () => createLevelNode( 4 ) },
      { value: 'level6', createNode: () => createLevelNode( 5 ) },
      { value: 'level7', createNode: () => createLevelNode( 6 ) },
      { value: 'level8', createNode: () => createLevelNode( 7 ) }
    ], {
      alignChildren: ToggleNode.NONE
    } );

    this.addChild( toggleNode );
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