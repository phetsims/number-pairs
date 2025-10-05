// Copyright 2025, University of Colorado Boulder

/**
 * Utility functions for NumberPairs.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsConstants from '../NumberPairsConstants.js';


export const NumberPairsUtils = {

  /**
   * Splits the bounds in half along the y-axis and returns an array of the two new bounds.
   * @param bounds
   */
  splitBoundsInHalf: ( bounds: Bounds2 ): Bounds2[] => {
    return [
      new Bounds2( bounds.minX, bounds.minY, bounds.centerX, bounds.maxY ),
      new Bounds2( bounds.centerX, bounds.minY, bounds.maxX, bounds.maxY )
    ];
  },

  /**
   * Creates a centered ten frame bounds, eroded along the x-axis so the frame appears centered within the counting area.
   * @param bounds
   */
  createCenteredTenFrameBounds: ( bounds: Bounds2 ): Bounds2 => {
    return bounds.erodedX( bounds.width / 3.5 );
  },

  /**
   * We will make sure that the direction is always -1 or 1, so we can just multiply by the direction to get the
   * correct side of the counting area.
   * @param position
   * @param direction - 1 for right to left, 1 for left to right
   */
  mirrorPositionAcrossCountingArea: ( position: Vector2, direction: number ): Vector2 => {
    direction = Math.sign( direction );
    const countingAreaCenterX = NumberPairsConstants.COUNTING_AREA_BOUNDS.centerX;
    return new Vector2( position.x + direction * ( Math.abs( position.x - countingAreaCenterX ) * 2 ), position.y );
  }
};

numberPairs.register( 'NumberPairsUtils', NumberPairsUtils );
