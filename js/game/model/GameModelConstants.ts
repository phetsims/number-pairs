// Copyright 2025, University of Colorado Boulder

/**
 * GameModelConstants contains constants shared by multiple game screens for the model.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';

// Make room for the extra buttons on the sides of the counting area, and shift down to make room for the status bar.
const scaleBounds = ( leftOffset: number ): Bounds2 => {
  const bounds = NumberPairsConstants.COUNTING_AREA_BOUNDS;

  // Reduce size to fit in the game area. It is smaller since the double rows of number buttons takes up horizontal space.
  const xScale = 0.95;
  return new Bounds2( ( bounds.minX * xScale ) - leftOffset, bounds.minY + 60, bounds.maxX * xScale, bounds.maxY + 60 );
};

export default class GameModelConstants {

  public static readonly DEFAULT_COUNTING_AREA_BOUNDS = scaleBounds( 0 );

  // Reduce size to fit in the game area. It is smaller since the double rows of number buttons takes up horizontal space.
  public static readonly NUMBER_LINE_COUNTING_AREA_BOUNDS = scaleBounds( 50 );
}

numberPairs.register( 'GameModelConstants', GameModelConstants );