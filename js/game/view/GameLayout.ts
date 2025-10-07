// Copyright 2025, University of Colorado Boulder

/**
 * Shared layout helpers for game view nodes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import LayoutProxy from '../../../../scenery/js/layout/LayoutProxy.js';
import GameConstants from './GameConstants.js';
import GameNumberEquationNode from './GameNumberEquationNode.js';

const MARGIN = 10;

export function layoutCountingAreaBlock( layoutBounds: Bounds2,
                                         statusBarProxy: LayoutProxy,
                                         tenFrameButtonProxy: LayoutProxy,
                                         countingAreaProxy: LayoutProxy,
                                         kittensLayerProxy: LayoutProxy,
                                         resetButtonProxy: LayoutProxy ): { top: number; bottom: number; middle: number } {

  const top = Math.max( statusBarProxy.bottom + 5, layoutBounds.top + MARGIN );

  tenFrameButtonProxy.left = layoutBounds.left + MARGIN;

  countingAreaProxy.bottom = layoutBounds.bottom - 20;
  countingAreaProxy.left = tenFrameButtonProxy.right + 5;

  const bottom = countingAreaProxy.top;

  resetButtonProxy.rightBottom = countingAreaProxy.rightBottom.plusXY( -5, -5 );
  tenFrameButtonProxy.top = countingAreaProxy.top;

  kittensLayerProxy.x = countingAreaProxy.x;
  kittensLayerProxy.y = countingAreaProxy.y;

  const middle = ( top + bottom ) / 2;

  return { top: top, bottom: bottom, middle: middle };
}

export function layoutCheckAndNextButtons( layoutBounds: Bounds2,
                                           anchorProxy: LayoutProxy,
                                           checkButtonProxy: LayoutProxy,
                                           nextButtonProxy: LayoutProxy ): void {

  checkButtonProxy.centerY = anchorProxy.centerY;
  checkButtonProxy.centerX = GameConstants.getCheckButtonCenterX( layoutBounds );

  nextButtonProxy.center = checkButtonProxy.center;
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

export function layoutEquationFeedbackMarks( targetProxy: LayoutProxy,
                                             wrongMarkProxy: LayoutProxy,
                                             checkMarkProxy: LayoutProxy,
                                             wrongOffset: number,
                                             checkOffset: number ): void {

  wrongMarkProxy.centerTop = targetProxy.centerBottom.plusXY( 0, wrongOffset );
  checkMarkProxy.centerTop = targetProxy.centerBottom.plusXY( 0, checkOffset );
}

export function layoutTryAgainLabel( wrongMarkProxy: LayoutProxy,
                                     tryAgainProxy: LayoutProxy,
                                     verticalOffset: number ): void {

  tryAgainProxy.centerX = wrongMarkProxy.centerX;
  tryAgainProxy.top = wrongMarkProxy.bottom + verticalOffset;
}
