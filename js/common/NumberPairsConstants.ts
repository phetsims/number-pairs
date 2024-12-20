// Copyright 2024, University of Colorado Boulder

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
import Property from '../../../axon/js/Property.js';
import Tandem from '../../../tandem/js/Tandem.js';
import StringIO from '../../../tandem/js/types/StringIO.js';

const TEN_TOTAL_RANGE = new Range( 0, 10 );
const TWENTY_TOTAL_RANGE = new Range( 11, 20 );
const COUNTING_AREA_X_MARGIN = 80;
const COUNTING_AREA_MIN_Y = ScreenView.DEFAULT_LAYOUT_BOUNDS.minY + 200;

const NumberPairsConstants = {

  SCREEN_VIEW_X_MARGIN: 15,
  SCREEN_VIEW_Y_MARGIN: 15,

  TITLE_FONT: new PhetFont( 16 ),

  INTRO_INITIAL_SUM_VALUE: 3,
  INTRO_INITIAL_LEFT_ADDEND_VALUE: 2,
  TEN_INITIAL_SUM_VALUE: 3,
  TEN_INITIAL_LEFT_ADDEND_VALUE: 2,
  TWENTY_INITIAL_SUM_VALUE: 11,
  TWENTY_INITIAL_LEFT_ADDEND_VALUE: 10,
  SUM_INITIAL_RIGHT_ADDEND_VALUE: 1,
  SUM_INITIAL_LEFT_ADDEND_VALUE: 2,
  COUNTING_AREA_X_MARGIN: 80,
  COUNTING_AREA_CORNER_RADIUS: 5,
  COUNTING_AREA_BOUNDS: new Bounds2( ScreenView.DEFAULT_LAYOUT_BOUNDS.minX + COUNTING_AREA_X_MARGIN,
    COUNTING_AREA_MIN_Y, ScreenView.DEFAULT_LAYOUT_BOUNDS.maxX - COUNTING_AREA_X_MARGIN, COUNTING_AREA_MIN_Y + 340 ),
  COUNTING_AREA_INNER_MARGIN: 5,
  TEN_TOTAL_RANGE: TEN_TOTAL_RANGE,
  TEN_NUMBER_LINE_RANGE: new Range( 0, TEN_TOTAL_RANGE.max ),
  TWENTY_TOTAL_RANGE: TWENTY_TOTAL_RANGE,
  TWENTY_NUMBER_LINE_RANGE: new Range( 0, TWENTY_TOTAL_RANGE.max ),

  RECTANGULAR_PUSH_BUTTON_OPTIONS: {
    size: new Dimension2( 50, 50 ),
    baseColor: PhetColorScheme.BUTTON_YELLOW
  },

  LEFTMOST_BEAD_X: 1,
  BEAD_DISTANCE_FROM_SEPARATOR: 1.5,

  NUMBER_MODEL_TYPE_PROPERTY: new Property( 'numberBondModel', {
    tandem: Tandem.PREFERENCES.createTandem( 'numberModelTypeProperty' ),
    phetioValueType: StringIO,
    validValues: [ 'numberBondModel', 'barModel' ]
  } ),

  // URL to the {REPO}_all.html file for this simulation.
  ALL_URL: 'https://phet.colorado.edu/sims/html/number-pairs/latest/number-pairs_all.html'
};

numberPairs.register( 'NumberPairsConstants', NumberPairsConstants );
export default NumberPairsConstants;