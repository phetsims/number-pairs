// Copyright 2025, University of Colorado Boulder

/**
 * GameModelConstants contains constants shared by multiple game screens for the model.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';

// Reduce size to fit in the game area. It is smaller since the double rows of number buttons takes up horizontal space.
const COUNTING_AREA_SCALE = 0.95;

// Make room for the extra buttons on the sides of the counting area, and shift down to make room for the status bar.
const scaleBounds = ( bounds: Bounds2, xScale: number, leftOffset: number ): Bounds2 => {
  return new Bounds2( ( bounds.minX * xScale ) - leftOffset, bounds.minY + 60, bounds.maxX * xScale, bounds.maxY + 60 );
};

// Reduce size to fit in the game area. It is smaller since the double rows of number buttons takes up horizontal space.
const DEFAULT_COUNTING_AREA_BOUNDS = scaleBounds( NumberPairsConstants.COUNTING_AREA_BOUNDS, COUNTING_AREA_SCALE, 0 );
const NUMBER_LINE_COUNTING_AREA_BOUNDS = scaleBounds( NumberPairsConstants.COUNTING_AREA_BOUNDS, COUNTING_AREA_SCALE, 50 );

export default class GameModelConstants {

  public static readonly DEFAULT_COUNTING_AREA_BOUNDS = DEFAULT_COUNTING_AREA_BOUNDS;
  public static readonly NUMBER_LINE_COUNTING_AREA_BOUNDS = NUMBER_LINE_COUNTING_AREA_BOUNDS;
}

numberPairs.register( 'GameModelConstants', GameModelConstants );