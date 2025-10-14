// Copyright 2025, University of Colorado Boulder

/**
 * Shared layout helpers for game view nodes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import LayoutProxy from '../../../../scenery/js/layout/LayoutProxy.js';
import GameNumberEquationNode from './GameNumberEquationNode.js';


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

  tryAgainProxy.leftCenter = wrongMarkProxy.rightCenter.plusXY( 5, 0 );
}
