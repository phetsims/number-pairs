// Copyright 2024, University of Colorado Boulder
/**
 * The RepresentationType Enumeration defines the types of representations that users can interact with
 * in the Counting Area. Each representation type has a unique set of colors and icons.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsColors from '../NumberPairsColors.js';
import { Color, Image, Line, Node, Rectangle, TColor, Text } from '../../../../scenery/js/imports.js';
import apple_svg from '../../../images/apple_svg.js';
import soccerball_svg from '../../../images/soccerball_svg.js';
import butterfly_svg from '../../../images/butterfly_svg.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import kittenYellow_svg from '../../../images/kittenYellow_svg.js';
import cubeBlueCircle_svg from '../../../images/cubeBlueCircle_svg.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';


const ICON_MAX_WIDTH = 25;
export const ICON_MAX_HEIGHT = 32;

export default class RepresentationType extends EnumerationValue {

  public static readonly APPLES = new RepresentationType(
    'apples',
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new Image( apple_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly SOCCER_BALLS = new RepresentationType(
    'soccerBalls',
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new Image( soccerball_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly BUTTERFLIES = new RepresentationType(
    'butterflies',
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new Image( butterfly_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly ONE_CARDS = new RepresentationType(
    'oneCards',
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new Rectangle( 0, 0, ICON_MAX_WIDTH, ICON_MAX_HEIGHT, {
      cornerRadius: 5,
      fill: Color.WHITE,
      stroke: 'black',
      children: [ new Text( '1', { font: new PhetFont( 18 ), center: new Vector2( ICON_MAX_WIDTH / 2, ICON_MAX_HEIGHT / 2 ) } ) ]
    } )
  );
  public static readonly KITTENS = new RepresentationType(
    'kittens',
    NumberPairsColors.attributeSumColorProperty,
    NumberPairsColors.attributeLeftAddendColorProperty,
    NumberPairsColors.attributeRightAddendColorProperty,
    new Image( kittenYellow_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly CUBES = new RepresentationType(
    'cubes',
    NumberPairsColors.numberLineSumColorProperty,
    NumberPairsColors.numberLineLeftAddendColorProperty,
    NumberPairsColors.numberLineRightAddendColorProperty,
    new Image( cubeBlueCircle_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly NUMBER_LINE = new RepresentationType(
    'numberLine',
    NumberPairsColors.numberLineSumColorProperty,
    NumberPairsColors.numberLineLeftAddendColorProperty,
    NumberPairsColors.numberLineRightAddendColorProperty,
    new Line( 0, 0, ICON_MAX_WIDTH, 0, { stroke: 'black' } )
  );
  public static readonly enumeration = new Enumeration( RepresentationType );

  public constructor(
    public readonly label: string,
    public readonly totalColor: TColor,
    public readonly leftAddendColor: TColor,
    public readonly rightAddendColor: TColor,
    public readonly icon: Node
  ) {
    super();
  }
}

numberPairs.register( 'RepresentationType', RepresentationType );