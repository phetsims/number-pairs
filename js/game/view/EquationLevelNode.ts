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
import Level from '../model/Level.js';
import CountingAreaLevelNode from './CountingAreaLevelNode.js';
import { getEquationMissingProxy, layoutEquationFeedback } from './GameLayout.js';
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
    const equationNode = new GameNumberEquationNode( level, {
      center: this.numberModelCenter
    } );
    this.addChild( equationNode );

    // layout feedback when the equation or bounds of the feedback change
    ManualConstraint.create( this, [
        this.wrongMark, this.checkMark, this.tryAgainText, equationNode.leftAddendSquare,
        equationNode.rightAddendSquare, equationNode.totalSquare ],
      ( wrongMarkProxy, checkMarkProxy, tryAgainTextProxy, equationLeftProxy, equationRightProxy, equationTopProxy ) => {
        const equationTargetProxy = getEquationMissingProxy( equationNode, equationLeftProxy, equationRightProxy, equationTopProxy );
        layoutEquationFeedback( equationTargetProxy, wrongMarkProxy, checkMarkProxy, tryAgainTextProxy, -1, 5 );
      } );
  }
}

numberPairs.register( 'EquationLevelNode', EquationLevelNode );
