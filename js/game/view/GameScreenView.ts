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
import { getPDOMFocusedNode } from '../../../../scenery/js/accessibility/pdomFocusProperty.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ToggleNode from '../../../../sun/js/ToggleNode.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';
import type { Mode } from '../model/GameModel.js';
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

    const focusNodes: Record<Mode, Node | null> = {
      level1: null,
      level2: null,
      level3: null,
      level4: null,
      level5: null,
      level6: null,
      level7: null,
      level8: null,
      levelSelectionScreen: null
    };

    // Keep track of the last focused Node within each mode so that when we return to it, focus goes back to where it was.
    // NOTE: Must be done before the ToggleNode is created, so that we capture the focus before the Node is removed from the PDOM.
    model.modeProperty.lazyLink( ( mode, oldMode ) => {
      focusNodes[ oldMode ] = getPDOMFocusedNode();
    } );

    const toggleNode = new ToggleNode( model.modeProperty, [
      {
        value: 'levelSelectionScreen', createNode: () => new Node( {
          children: [ new Node( {
            accessibleParagraph: 'Game Screen. Select a level to begin playing. Choose the number that adds to the target number for each challenge.'
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

    // Restore the last focused Node for the mode that became active after the ToggleNode is created.
    // NOTE: Must be done after the ToggleNode is created, so that we restore the focus after the Node is added to the PDOM.
    model.modeProperty.lazyLink( mode => {
      focusNodes[ mode ]?.focus();
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
