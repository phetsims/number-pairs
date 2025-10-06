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
import GameNumberEquationNode from './GameNumberEquationNode.js';
import { LevelNodeOptions } from './LevelNode.js';

// TODO: factor out, see https://github.com/phetsims/number-pairs/issues/232
const MARGIN = 10;

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

        const top = Math.max( statusBarProxy.bottom + 5, layoutBounds.top + MARGIN );

        // Center between the top and the counting area if it exists, but don't let it get too far away from the counting area

        myTenFrameButtonProxy.left = layoutBounds.left + MARGIN;

        countingAreaNodeProxy.bottom = layoutBounds.bottom - 20;
        countingAreaNodeProxy.left = myTenFrameButtonProxy.right + 5;

        const bottom = countingAreaNodeProxy.top;

        resetButtonProxy.rightBottom = countingAreaNodeProxy.rightBottom.plusXY( -5, -5 );
        myTenFrameButtonProxy.top = countingAreaNodeProxy.top;

        myKittensLayerNodeProxy.x = countingAreaNodeProxy.x;
        myKittensLayerNodeProxy.y = countingAreaNodeProxy.y;
        equationNodeProxy.centerY = ( bottom + top ) / 2;

        const missingSquare = equationNode.getMissingSquare();
        const proxy = missingSquare === equationNode.leftAddendSquare ? equationLeftProxy :
                      missingSquare === equationNode.rightAddendSquare ? equationRightProxy :
                      equationTopProxy;
        wrongMarkProxy.centerTop = proxy.centerBottom.plusXY( 0, -1 );
        checkMarkProxy.centerTop = proxy.centerBottom.plusXY( 0, 5 );

        tryAgainTextProxy.centerX = wrongMarkProxy.centerX;
        tryAgainTextProxy.top = wrongMarkProxy.bottom - 1;

        checkButtonProxy.centerY = equationNodeProxy.centerY;
        checkButtonProxy.right = countingAreaNodeProxy.right;

        nextButtonProxy.centerY = checkButtonProxy.centerY;
        nextButtonProxy.right = checkButtonProxy.right;
      } );
  }
}

numberPairs.register( 'EquationLevelNode', EquationLevelNode );
