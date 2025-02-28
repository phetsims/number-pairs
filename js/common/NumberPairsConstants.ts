// Copyright 2024-2025, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../dot/js/Dimension2.js';
import Range from '../../../dot/js/Range.js';
import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import numberPairs from '../numberPairs.js';
import Bounds2 from '../../../dot/js/Bounds2.js';
import ScreenView from '../../../joist/js/ScreenView.js';

const TEN_TOTAL_RANGE = new Range( 0, 10 );
const TWENTY_TOTAL_RANGE = new Range( 11, 20 );
const COUNTING_AREA_X_MARGIN = 80;
const COUNTING_AREA_MIN_Y = ScreenView.DEFAULT_LAYOUT_BOUNDS.minY + 200;
const COUNTING_AREA_BOUNDS = new Bounds2( ScreenView.DEFAULT_LAYOUT_BOUNDS.minX + COUNTING_AREA_X_MARGIN,
  COUNTING_AREA_MIN_Y, ScreenView.DEFAULT_LAYOUT_BOUNDS.maxX - COUNTING_AREA_X_MARGIN, COUNTING_AREA_MIN_Y + 340 );

const NumberPairsConstants = {

  SCREEN_VIEW_X_MARGIN: 15,
  SCREEN_VIEW_Y_MARGIN: 15,

  ACCORDION_BOX_TITLE_OPTIONS: {
    font: new PhetFont( 16 ),
    maxWidth: 200
  },

  // Initial values:
  INTRO_INITIAL_SUM_VALUE: 3,
  INTRO_INITIAL_LEFT_ADDEND_VALUE: 2,
  TEN_INITIAL_SUM_VALUE: 3,
  TEN_INITIAL_LEFT_ADDEND_VALUE: 2,
  TWENTY_INITIAL_SUM_VALUE: 11,
  TWENTY_INITIAL_LEFT_ADDEND_VALUE: 10,
  SUM_INITIAL_RIGHT_ADDEND_VALUE: 1,
  SUM_INITIAL_LEFT_ADDEND_VALUE: 2,

  // Counting area layout and dimension values:
  COUNTING_AREA_X_MARGIN: 80,
  COUNTING_AREA_CORNER_RADIUS: 5,
  COUNTING_AREA_LINE_WIDTH: 1.5,
  COUNTING_AREA_BOUNDS: COUNTING_AREA_BOUNDS,
  LEFT_COUNTING_AREA_BOUNDS: COUNTING_AREA_BOUNDS.withOffsets( 0, 0, -COUNTING_AREA_BOUNDS.width / 2, 0 ),
  RIGHT_COUNTING_AREA_BOUNDS: COUNTING_AREA_BOUNDS.withOffsets( -COUNTING_AREA_BOUNDS.width / 2, 0, 0, 0 ),
  COUNTING_AREA_Y_MARGIN: 15,
  COUNTING_AREA_INNER_MARGIN: 5,
  COUNTING_AREA_CHECKBOX_MARGIN: 8,

  // Ranges:
  TEN_TOTAL_RANGE: TEN_TOTAL_RANGE,
  TEN_NUMBER_LINE_RANGE: new Range( 0, TEN_TOTAL_RANGE.max ),
  TWENTY_TOTAL_RANGE: TWENTY_TOTAL_RANGE,
  TWENTY_NUMBER_LINE_RANGE: new Range( 0, TWENTY_TOTAL_RANGE.max ),

  RECTANGULAR_PUSH_BUTTON_OPTIONS: {
    size: new Dimension2( 50, 50 ),
    baseColor: PhetColorScheme.BUTTON_YELLOW
  },
  CHECKBOX_LABEL_OPTIONS: {
    font: new PhetFont( 16 ),
    maxWidth: 127
  },

  // Bead specific values:
  LEFTMOST_BEAD_X: 1,
  BEAD_DISTANCE_FROM_SEPARATOR: 1.5,

  // Kitten specific values:
  KITTEN_PANEL_WIDTH: 56,
  KITTEN_PANEL_HEIGHT: 86,
  KITTEN_PANEL_MARGIN: 3,

  // URL to the {REPO}_all.html file for this simulation.
  ALL_URL: 'https://phet.colorado.edu/sims/html/number-pairs/latest/number-pairs_all.html'
};

numberPairs.register( 'NumberPairsConstants', NumberPairsConstants );
export default NumberPairsConstants;