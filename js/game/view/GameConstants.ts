// Copyright 2025, University of Colorado Boulder

/**
 * Shared constants within the game views.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import numberPairs from '../../numberPairs.js';

export default class GameConstants {

  // position based on the layout bounds so positioning can be consistent across level types
  public static getCheckButtonCenterX( layoutBounds: Bounds2 ): number {
    return layoutBounds.right - 230;
  }

  public static readonly LINE_WIDTH = 2;
}

numberPairs.register( 'GameConstants', GameConstants );