// Copyright 2024-2026, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../dot/js/Bounds2.js';
import Dimension2 from '../../../dot/js/Dimension2.js';
import Range from '../../../dot/js/Range.js';
import Vector2 from '../../../dot/js/Vector2.js';
import ScreenView from '../../../joist/js/ScreenView.js';
import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import Color from '../../../scenery/js/util/Color.js';
import NumberPairsColors from './NumberPairsColors.js';
import numberPairs from '../numberPairs.js';

class NumberPairsConstants {

  public static readonly SCREEN_VIEW_X_MARGIN = 15;
  public static readonly SCREEN_VIEW_Y_MARGIN = 15;

  public static readonly ACCORDION_BOX_TITLE_OPTIONS = {
    font: new PhetFont( 16 ),
    maxWidth: 200
  };

  public static readonly RECTANGULAR_PUSH_BUTTON_OPTIONS = {
    size: new Dimension2( 50, 50 ),
    baseColor: PhetColorScheme.BUTTON_YELLOW
  };

  public static readonly CHECKBOX_LABEL_OPTIONS = {
    font: new PhetFont( 16 ),
    maxWidth: 124
  };

  public static readonly GET_DARKER_COLOR = ( color: TReadOnlyProperty<Color> | Color ): Color => {
    const colorValue = color instanceof Color ? color : color.value;
    return colorValue.darkerColor( 0.625 );
  };

  public static readonly PREFERENCES_ICON_MAX_WIDTH = 70;

  // Initial values:
  public static readonly INTRO_INITIAL_SUM_VALUE = 3;
  public static readonly INTRO_INITIAL_LEFT_ADDEND_VALUE = 2;
  public static readonly TEN_INITIAL_SUM_VALUE = 3;
  public static readonly TEN_INITIAL_LEFT_ADDEND_VALUE = 2;
  public static readonly TWENTY_INITIAL_SUM_VALUE = 11;
  public static readonly TWENTY_INITIAL_LEFT_ADDEND_VALUE = 10;
  public static readonly SUM_INITIAL_RIGHT_ADDEND_VALUE = 1;
  public static readonly SUM_INITIAL_LEFT_ADDEND_VALUE = 2;

  // Counting area layout and dimension values:
  public static readonly COUNTING_AREA_X_MARGIN = 80;
  public static readonly COUNTING_AREA_CORNER_RADIUS = 5;
  public static readonly COUNTING_AREA_LINE_WIDTH = 1.5;
  private static readonly COUNTING_AREA_MIN_Y = ScreenView.DEFAULT_LAYOUT_BOUNDS.minY + 200;
  public static readonly COUNTING_AREA_BOUNDS = new Bounds2(
    ScreenView.DEFAULT_LAYOUT_BOUNDS.minX + NumberPairsConstants.COUNTING_AREA_X_MARGIN,
    NumberPairsConstants.COUNTING_AREA_MIN_Y,
    ScreenView.DEFAULT_LAYOUT_BOUNDS.maxX - NumberPairsConstants.COUNTING_AREA_X_MARGIN,
    NumberPairsConstants.COUNTING_AREA_MIN_Y + 340
  );
  public static readonly LEFT_COUNTING_AREA_BOUNDS = NumberPairsConstants.COUNTING_AREA_BOUNDS.withOffsets( 0, 0, -NumberPairsConstants.COUNTING_AREA_BOUNDS.width / 2, 0 );
  public static readonly RIGHT_COUNTING_AREA_BOUNDS = NumberPairsConstants.COUNTING_AREA_BOUNDS.withOffsets( -NumberPairsConstants.COUNTING_AREA_BOUNDS.width / 2, 0, 0, 0 );
  public static readonly COUNTING_AREA_Y_MARGIN = 15;
  public static readonly COUNTING_AREA_INNER_MARGIN = 5;
  public static readonly COUNTING_AREA_CHECKBOX_MARGIN = 8;
  public static readonly COUNTING_AREA_CHECKBOX_MARGIN_GAME = 11;

  // Ranges:
  public static readonly TEN_TOTAL_RANGE = new Range( 0, 10 );
  public static readonly TEN_NUMBER_LINE_RANGE = new Range( 0, NumberPairsConstants.TEN_TOTAL_RANGE.max );
  public static readonly TWENTY_TOTAL_RANGE = new Range( 11, 20 );
  public static readonly TWENTY_NUMBER_LINE_RANGE = new Range( 0, NumberPairsConstants.TWENTY_TOTAL_RANGE.max );
  public static readonly GAME_TEN_RANGE = new Range( 0, 10 );
  public static readonly GAME_TWENTY_RANGE = new Range( 0, 20 );
  public static readonly SUM_TOTAL_RANGE = new Range( NumberPairsConstants.TEN_TOTAL_RANGE.min, NumberPairsConstants.TWENTY_TOTAL_RANGE.max );

  // Bead specific values:
  public static readonly LEFTMOST_BEAD_X = 1;
  public static readonly BEAD_DISTANCE_FROM_SEPARATOR = 1.5;

  // Kitten specific values:
  public static readonly KITTEN_PANEL_WIDTH = 56;
  public static readonly KITTEN_PANEL_HEIGHT = 84;
  public static readonly KITTEN_PANEL_MARGIN = 3;

  // Number line specific values:
  public static readonly NUMBER_LINE_X_MARGIN = 40;

  public static readonly GET_DROP_ZONE_BOUNDS = ( zoneCenter: Vector2 ): Bounds2 => {
    const margin = NumberPairsConstants.KITTEN_PANEL_WIDTH / 2;
    return new Bounds2(
      zoneCenter.x - margin,
      zoneCenter.y - margin,
      zoneCenter.x + margin,
      zoneCenter.y + margin
    );
  };

  // Game screen specific values
  public static readonly GAME_LINE_WIDTH = 3;
  public static readonly GAME_DASHED_LINE = [ 6, 6 ];
  public static readonly GAME_ICON_DASHED_LINE = NumberPairsConstants.GAME_DASHED_LINE.map( value => value / 2 );
  public static readonly GAME_FEEDBACK_STYLES = {
    idle: { stroke: NumberPairsColors.unansweredColorProperty, lineWidth: NumberPairsConstants.GAME_LINE_WIDTH, lineDash: NumberPairsConstants.GAME_DASHED_LINE },
    incorrect: { stroke: NumberPairsColors.incorrectColorProperty, lineWidth: NumberPairsConstants.GAME_LINE_WIDTH, lineDash: NumberPairsConstants.GAME_DASHED_LINE },
    correct: { stroke: Color.BLACK, lineWidth: 1, lineDash: [] },
    guessSelected: { stroke: NumberPairsColors.unansweredColorProperty, lineWidth: NumberPairsConstants.GAME_LINE_WIDTH, lineDash: NumberPairsConstants.GAME_DASHED_LINE }
  };

  // URL to the {REPO}_all.html file for this simulation.
  public static readonly ALL_URL = 'https://phet.colorado.edu/sims/html/number-pairs/latest/number-pairs_all.html';

  /**
   * Private constructor to prevent instantiation.
   */
  private constructor() {
    // Prevent instantiation
  }
}

numberPairs.register( 'NumberPairsConstants', NumberPairsConstants );
export default NumberPairsConstants;
