// Copyright 2025, University of Colorado Boulder

/**
 * Shared layout helpers for game view nodes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import { Layoutable } from '../../../../scenery/js/layout/LayoutProxy.js';
import { MissingComponent } from '../model/Challenge.js';
import GameNumberBarModelNode from './GameNumberBarModelNode.js';
import GameNumberEquationNode from './GameNumberEquationNode.js';

/**
 * Returns the Layoutable Node for the missing component in the equation.
 * @param equationNode
 * @param leftProxy
 * @param rightProxy
 * @param totalProxy
 */
export function getEquationMissingProxy( equationNode: GameNumberEquationNode,
                                         leftProxy: Layoutable,
                                         rightProxy: Layoutable,
                                         totalProxy: Layoutable ): Layoutable {

  const missingSquare = equationNode.getMissingSquare();
  return missingSquare === equationNode.leftAddendSquare ? leftProxy :
         missingSquare === equationNode.rightAddendSquare ? rightProxy :
         totalProxy;
}

/**
 * Layouts the feedback elements (wrong mark, check mark, try again text) for an equation.
 * @param targetProxy
 * @param wrongMarkProxy
 * @param checkMarkProxy
 * @param tryAgainProxy
 * @param wrongOffset
 * @param checkOffset
 */
export function layoutEquationFeedback( targetProxy: Layoutable,
                                        wrongMarkProxy: Layoutable,
                                        checkMarkProxy: Layoutable,
                                        tryAgainProxy: Layoutable,
                                        wrongOffset: number,
                                        checkOffset: number ): void {

  wrongMarkProxy.centerTop = targetProxy.centerBottom.plusXY( 0, wrongOffset );
  checkMarkProxy.centerTop = targetProxy.centerBottom.plusXY( 0, checkOffset );
  tryAgainProxy.leftCenter = wrongMarkProxy.rightCenter.plusXY( 5, 0 );
}

/**
 * Layouts the feedback elements (wrong mark, check mark, try again text) for a number bond.
 * @param bondNode
 * @param missingValue
 * @param wrongMark
 * @param checkMark
 * @param tryAgainTextProxy
 */
export function layoutNumberBondFeedback( bondNode: Layoutable,
                                          missingValue: MissingComponent,
                                          wrongMark: Layoutable,
                                          checkMark: Layoutable,
                                          tryAgainTextProxy: Layoutable ): void {
  wrongMark.bottom = bondNode.bottom - 23; // Manually tuned based on the size of the circles and the height of the text.

  // NumberBond levels cannot have the total missing, so only 'a' or 'b' is possible.
  if ( missingValue === 'a' ) {
    wrongMark.right = bondNode.left - 5;
    tryAgainTextProxy.rightCenter = wrongMark.leftCenter.plusXY( -5, 0 );
  }
  else if ( missingValue === 'b' ) {
    wrongMark.left = bondNode.right + 5;
    tryAgainTextProxy.leftCenter = wrongMark.rightCenter.plusXY( 5, 0 );
  }
  checkMark.center = wrongMark.center; // keep them aligned if one is hidden
}

/**
 * Layouts the feedback elements (wrong mark, check mark, try again text) for a number bar.
 * @param barNode
 * @param missingValue
 * @param wrongMark
 * @param checkMark
 * @param tryAgainText
 */
export function layoutNumberBarFeedback( barNode: GameNumberBarModelNode,
                                         missingValue: MissingComponent,
                                         wrongMark: Layoutable,
                                         checkMark: Layoutable,
                                         tryAgainText: Layoutable ): void {
  const centerX = missingValue === 'a' ? barNode.localToParentBounds( barNode.leftAddendRectangle.bounds ).centerX :
                  missingValue === 'b' ? barNode.localToParentBounds( barNode.rightAddendRectangle.bounds ).centerX :
                  barNode.centerX; // The total spans the entire bar node.
  const y = barNode.bottom;

  wrongMark.centerTop = new Vector2( centerX, y );

  tryAgainText.left = wrongMark.right + 10;
  tryAgainText.centerY = wrongMark.centerY;
  checkMark.center = wrongMark.center; // keep them aligned if one is hidden
}
