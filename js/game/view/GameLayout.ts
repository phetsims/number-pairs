// Copyright 2025, University of Colorado Boulder

/**
 * Shared layout helpers for game view nodes.
 *
 * Keep these utilities minimal and focused on the existing ManualConstraint usage.
 *
 * @author
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import LayoutProxy from '../../../../scenery/js/layout/LayoutProxy.js';
import GameNumberEquationNode from './GameNumberEquationNode.js';
import numberPairs from '../../numberPairs.js';

const MARGIN = 10;

export function layoutCountingAreaBlock( layoutBounds: Bounds2,
                                         statusBarProxy: LayoutProxy,
                                         tenFrameButtonProxy: LayoutProxy,
                                         countingAreaProxy: LayoutProxy,
                                         kittensLayerProxy: LayoutProxy,
                                         resetButtonProxy: LayoutProxy ): { top: number; bottom: number } {

  const top = Math.max( statusBarProxy.bottom + 5, layoutBounds.top + MARGIN );

  tenFrameButtonProxy.left = layoutBounds.left + MARGIN;

  countingAreaProxy.bottom = layoutBounds.bottom - 20;
  countingAreaProxy.left = tenFrameButtonProxy.right + 5;

  const bottom = countingAreaProxy.top;

  resetButtonProxy.rightBottom = countingAreaProxy.rightBottom.plusXY( -5, -5 );
  tenFrameButtonProxy.top = countingAreaProxy.top;

  kittensLayerProxy.x = countingAreaProxy.x;
  kittensLayerProxy.y = countingAreaProxy.y;

  return { top: top, bottom: bottom };
}

export function getEquationMissingProxy( equationNode: GameNumberEquationNode,
                                         leftProxy: LayoutProxy,
                                         rightProxy: LayoutProxy,
                                         totalProxy: LayoutProxy ): LayoutProxy {

  const missingSquare = equationNode.getMissingSquare();
  return missingSquare === equationNode.leftAddendSquare ? leftProxy :
         missingSquare === equationNode.rightAddendSquare ? rightProxy :
         totalProxy;
}

numberPairs.register( 'GameLayout', {
  layoutCountingAreaBlock: layoutCountingAreaBlock,
  getEquationMissingProxy: getEquationMissingProxy
} );
