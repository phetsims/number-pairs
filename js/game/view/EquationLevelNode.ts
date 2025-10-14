// Copyright 2025, University of Colorado Boulder

/**
 * EquationLevelNode is a LevelNode that shows a bond or bar representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import GameModelConstants from '../model/GameModelConstants.js';
import Level from '../model/Level.js';
import CountingAreaLevelNode from './CountingAreaLevelNode.js';
import { getEquationMissingProxy, layoutEquationFeedbackMarks, layoutTryAgainLabel } from './GameLayout.js';
import GameNumberEquationNode from './GameNumberEquationNode.js';
import { LevelNodeOptions } from './LevelNode.js';

export default class EquationLevelNode extends CountingAreaLevelNode {
  public constructor( model: GameModel,
                      level: Level,
                      layoutBounds: Bounds2,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      returnToSelection: () => void,
                      tandem: Tandem,
                      providedOptions?: LevelNodeOptions ) {

    super( model, level, layoutBounds, visibleBoundsProperty, returnToSelection, tandem, providedOptions );

    const equationNode = new GameNumberEquationNode( level );
    this.addChild( equationNode );

    this.challengeResetButton.moveToFront(); // awkward

    ManualConstraint.create( this, [
        equationNode, this.statusBar, this.wrongMark, this.checkMark, this.tryAgainText,
        equationNode.leftAddendSquare, equationNode.rightAddendSquare, equationNode.totalSquare, this.preferencesNode ],
      ( equationNodeProxy, statusBarProxy, wrongMarkProxy, checkMarkProxy, tryAgainTextProxy,
        equationLeftProxy, equationRightProxy, equationTopProxy, preferencesNodeProxy ) => {

        // We want the number bond and bar model to adjust based on the status bar.
        const top = Math.max( statusBarProxy.bottom + 5, layoutBounds.top + NumberPairsConstants.SCREEN_VIEW_Y_MARGIN );
        const bottom = GameModelConstants.GAME_COUNTING_AREA_BOUNDS.top;
        const middle = ( top + bottom ) / 2;

        equationNodeProxy.centerX = layoutBounds.centerX;

        equationNodeProxy.centerY = middle;

        const equationTargetProxy = getEquationMissingProxy( equationNode, equationLeftProxy, equationRightProxy, equationTopProxy );
        layoutEquationFeedbackMarks( equationTargetProxy, wrongMarkProxy, checkMarkProxy, -1, 5 );

        layoutTryAgainLabel( wrongMarkProxy, tryAgainTextProxy, -1 );
      } );
  }
}

numberPairs.register( 'EquationLevelNode', EquationLevelNode );
