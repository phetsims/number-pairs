// Copyright 2024, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../numberPairs.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';

const NumberPairsConstants = {

  SCREEN_VIEW_X_MARGIN: 15,
  SCREEN_VIEW_Y_MARGIN: 15,

  TITLE_FONT: new PhetFont( 20 ),

  INTRO_INITIAL_SUM_VALUE: 3,
  INTRO_INITIAL_LEFT_ADDEND_VALUE: 2,
  COUNTING_AREA_X_MARGIN: 100
};

numberPairs.register( 'NumberPairsConstants', NumberPairsConstants );
export default NumberPairsConstants;