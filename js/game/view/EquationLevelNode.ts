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

    const bondBarCenterY = ( layoutBounds.top + this.statusBar.height + GameModelConstants.GAME_COUNTING_AREA_BOUNDS.top ) / 2;
    const equationNode = new GameNumberEquationNode( level, {
      centerX: GameModelConstants.GAME_COUNTING_AREA_BOUNDS.centerX,
      centerY: bondBarCenterY
    } );
    this.addChild( equationNode );

    ManualConstraint.create( this, [
        this.wrongMark, this.checkMark, this.tryAgainText, equationNode.leftAddendSquare,
        equationNode.rightAddendSquare, equationNode.totalSquare, this.preferencesNode ],
      ( wrongMarkProxy, checkMarkProxy, tryAgainTextProxy,
        equationLeftProxy, equationRightProxy, equationTopProxy, preferencesNodeProxy ) => {

        const equationTargetProxy = getEquationMissingProxy( equationNode, equationLeftProxy, equationRightProxy, equationTopProxy );
        layoutEquationFeedbackMarks( equationTargetProxy, wrongMarkProxy, checkMarkProxy, -1, 5 );

        layoutTryAgainLabel( wrongMarkProxy, tryAgainTextProxy, -1 );
      } );
  }
}

numberPairs.register( 'EquationLevelNode', EquationLevelNode );
