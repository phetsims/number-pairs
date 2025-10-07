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
import GameConstants from './GameConstants.js';
import { getEquationMissingProxy, layoutCountingAreaBlock } from './GameLayout.js';
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
        equationNode, this.statusBar, this.wrongMark, this.checkMark, this.tryAgainText, this.challengeResetButton,
        this.tenFrameButton, this.countingAreaNode, this.kittensLayerNode,
        equationNode.leftAddendSquare, equationNode.rightAddendSquare, equationNode.totalSquare,
        this.preferencesNode, this.checkButton, this.nextButton ],
      ( equationNodeProxy, statusBarProxy, wrongMarkProxy, checkMarkProxy, tryAgainTextProxy,
        resetButtonProxy, myTenFrameButtonProxy, countingAreaNodeProxy, myKittensLayerNodeProxy,
        equationLeftProxy, equationRightProxy, equationTopProxy,
        preferencesNodeProxy, checkButtonProxy, nextButtonProxy ) => {

        equationNodeProxy.centerX = layoutBounds.centerX;

        const { top, bottom } = layoutCountingAreaBlock(
          layoutBounds,
          statusBarProxy,
          myTenFrameButtonProxy,
          countingAreaNodeProxy,
          myKittensLayerNodeProxy,
          resetButtonProxy
        );

        equationNodeProxy.centerY = ( bottom + top ) / 2;

        const proxy = getEquationMissingProxy( equationNode, equationLeftProxy, equationRightProxy, equationTopProxy );
        wrongMarkProxy.centerTop = proxy.centerBottom.plusXY( 0, -1 );
        checkMarkProxy.centerTop = proxy.centerBottom.plusXY( 0, 5 );

        tryAgainTextProxy.centerX = wrongMarkProxy.centerX;
        tryAgainTextProxy.top = wrongMarkProxy.bottom - 1;

        checkButtonProxy.centerY = equationNodeProxy.centerY;
        checkButtonProxy.centerX = GameConstants.getCheckButtonCenterX( layoutBounds );

        nextButtonProxy.centerY = checkButtonProxy.centerY;
        nextButtonProxy.right = checkButtonProxy.right;
      } );
  }
}

numberPairs.register( 'EquationLevelNode', EquationLevelNode );
