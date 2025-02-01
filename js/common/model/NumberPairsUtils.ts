// Copyright 2025, University of Colorado Boulder

/**
 * Utility functions for NumberPairs.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import numberPairs from '../../numberPairs.js';


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
  }
};

numberPairs.register( 'NumberPairsUtils', NumberPairsUtils );