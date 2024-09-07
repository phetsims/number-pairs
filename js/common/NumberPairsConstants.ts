// Copyright 2024, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../numberPairs.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import Range from '../../../dot/js/Range.js';

const NumberPairsConstants = {

  SCREEN_VIEW_X_MARGIN: 15,
  SCREEN_VIEW_Y_MARGIN: 15,

  TITLE_FONT: new PhetFont( 20 ),

  INTRO_INITIAL_SUM_VALUE: 3,
  INTRO_INITIAL_LEFT_ADDEND_VALUE: 2,
  TEN_INITIAL_SUM_VALUE: 3,
  TEN_INITIAL_LEFT_ADDEND_VALUE: 2,
  TWENTY_INITIAL_SUM_VALUE: 11,
  TWENTY_INITIAL_LEFT_ADDEND_VALUE: 10,
  SUM_INITIAL_SUM_VALUE: 3,
  SUM_INITIAL_LEFT_ADDEND_VALUE: 2,
  COUNTING_AREA_X_MARGIN: 100,
  COUNTING_AREA_CORNER_RADIUS: 10,

  TEN_SCENE_RANGE: new Range( 0, 10 ),
  TWENTY_SCENE_RANGE: new Range( 11, 20 )
};

numberPairs.register( 'NumberPairsConstants', NumberPairsConstants );
export default NumberPairsConstants;