// Copyright 2025, University of Colorado Boulder

/**
 * Styles and constants used for number representations in the game screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import numberPairs from '../../numberPairs.js';

export default class NumberStyles {
  public static readonly DASHED_LINE = [ 6, 6 ];

  public static readonly FEEDBACK_STYLES = {
    idle: { stroke: 'black', lineDash: NumberStyles.DASHED_LINE },
    incorrect: { stroke: 'red', lineDash: NumberStyles.DASHED_LINE },
    correct: { stroke: 'black', lineDash: [] },
    guessSelected: { stroke: 'black', lineDash: NumberStyles.DASHED_LINE }
  };
}

numberPairs.register( 'NumberStyles', NumberStyles );