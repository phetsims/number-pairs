// Copyright 2025, University of Colorado Boulder

/**
 * Styles and constants used for number representations in the game screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import numberPairs from '../../numberPairs.js';

export default class NumberStyles {
  public static readonly DASHED_LINE = [ 6, 6 ];
  public static readonly DASHED_LINE_WIDTH = 2.5;
  public static readonly GRAY = '#7f7f7f';

  public static readonly FEEDBACK_STYLES = {
    idle: { stroke: NumberStyles.GRAY, lineDash: NumberStyles.DASHED_LINE, lineWidth: NumberStyles.DASHED_LINE_WIDTH },
    incorrect: { stroke: 'red', lineDash: NumberStyles.DASHED_LINE, lineWidth: NumberStyles.DASHED_LINE_WIDTH },
    correct: { stroke: 'black', lineDash: [], lineWidth: 1 },
    guessSelected: { stroke: NumberStyles.GRAY, lineDash: NumberStyles.DASHED_LINE, lineWidth: NumberStyles.DASHED_LINE_WIDTH }
  };
}

numberPairs.register( 'NumberStyles', NumberStyles );