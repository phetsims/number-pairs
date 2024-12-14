// Copyright 2024, University of Colorado Boulder
/**
 * The RepresentationType Enumeration defines the types of representations that users can interact with
 * in the Counting Area. Each representation type has a unique set of colors and icons.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import Property from '../../../../axon/js/Property.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import { Color, Image, Node } from '../../../../scenery/js/imports.js';
import apple_svg from '../../../images/apple_svg.js';
import beadBlue_svg from '../../../images/beadBlue_svg.js';
import butterfly_svg from '../../../images/butterfly_svg.js';
import kittenBlue_svg from '../../../images/kittenBlue_svg.js';
import soccerball_svg from '../../../images/soccerball_svg.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsColors from '../NumberPairsColors.js';

// eslint-disable-next-line phet/no-view-imported-from-model
import NumberLineIcon from '../view/NumberLineIcon.js';
// eslint-disable-next-line phet/no-view-imported-from-model
import OneCard from '../view/OneCard.js';


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
    new OneCard( ICON_MAX_WIDTH, ICON_MAX_HEIGHT )
  );
  public static readonly KITTENS = new RepresentationType(
    'kittens',
    NumberPairsColors.attributeSumColorProperty,
    NumberPairsColors.attributeLeftAddendColorProperty,
    NumberPairsColors.attributeRightAddendColorProperty,
    new Image( kittenBlue_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly CUBES = new RepresentationType(
    'cubes',
    NumberPairsColors.numberLineSumColorProperty,
    NumberPairsColors.numberLineLeftAddendColorProperty,
    NumberPairsColors.numberLineRightAddendColorProperty,
    new Image( beadBlue_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly NUMBER_LINE = new RepresentationType(
    'numberLine',
    NumberPairsColors.numberLineSumColorProperty,
    NumberPairsColors.numberLineLeftAddendColorProperty,
    NumberPairsColors.numberLineRightAddendColorProperty,
    new NumberLineIcon( ICON_MAX_WIDTH, 2, { showHighlight: true } )
  );
  public static readonly enumeration = new Enumeration( RepresentationType );

  public constructor(
    public readonly label: string,
    public readonly totalColorProperty: Property<Color>,
    public readonly leftAddendColorProperty: Property<Color>,
    public readonly rightAddendColorProperty: Property<Color>,
    public readonly icon: Node
  ) {
    super();
  }
}

numberPairs.register( 'RepresentationType', RepresentationType );