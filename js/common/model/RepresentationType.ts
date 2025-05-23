// Copyright 2024-2025, University of Colorado Boulder
/**
 * The RepresentationType Enumeration defines the types of representations that users can interact with
 * in the Counting Area. Each representation type has a unique set of colors and icons.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Color from '../../../../scenery/js/util/Color.js';
import apple_svg from '../../../images/apple_svg.js';
import beadBlue_svg from '../../../images/beadBlue_svg.js';
import butterfly_svg from '../../../images/butterfly_svg.js';
import kittenBlue_svg from '../../../images/kittenBlue_svg.js';
import soccerball_svg from '../../../images/soccerball_svg.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsColors from '../NumberPairsColors.js';

// eslint-disable-next-line phet/no-view-imported-from-model
import NumberLineIcon from '../view/NumberLineIcon.js';
// eslint-disable-next-line phet/no-view-imported-from-model
import OneCard from '../view/OneCard.js';


const ICON_MAX_WIDTH = 25;
const ICON_MAX_HEIGHT = 32;

export default class RepresentationType extends EnumerationValue {
  public static readonly ICON_MAX_HEIGHT = ICON_MAX_HEIGHT;
  public static readonly APPLES = new RepresentationType(
    'apples',
    NumberPairsStrings.a11y.applesStringProperty,
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new Image( apple_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } ),
    NumberPairsStrings.a11y.appleStringProperty
  );
  public static readonly SOCCER_BALLS = new RepresentationType(
    'soccerBalls',
    NumberPairsStrings.a11y.soccerBallsStringProperty,
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new Image( soccerball_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } ),
    NumberPairsStrings.a11y.soccerBallStringProperty
  );
  public static readonly BUTTERFLIES = new RepresentationType(
    'butterflies',
    NumberPairsStrings.a11y.butterfliesStringProperty,
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new Image( butterfly_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } ),
    NumberPairsStrings.a11y.butterflyStringProperty
  );
  public static readonly ONE_CARDS = new RepresentationType(
    'oneCards',
    NumberPairsStrings.a11y.onesStringProperty,
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new OneCard( ICON_MAX_WIDTH, ICON_MAX_HEIGHT, 20 ),
    NumberPairsStrings.a11y.oneStringProperty
  );
  public static readonly KITTENS = new RepresentationType(
    'kittens',
    NumberPairsStrings.a11y.kittensStringProperty,
    NumberPairsColors.attributeSumColorProperty,
    NumberPairsColors.attributeLeftAddendColorProperty,
    NumberPairsColors.attributeRightAddendColorProperty,
    new Image( kittenBlue_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly BEADS = new RepresentationType(
    'beads',
    NumberPairsStrings.a11y.beadsStringProperty,
    NumberPairsColors.attributeSumColorProperty,
    NumberPairsColors.attributeLeftAddendColorProperty,
    NumberPairsColors.attributeRightAddendColorProperty,
    new Image( beadBlue_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } ),
    NumberPairsStrings.a11y.beadStringProperty
  );
  public static readonly NUMBER_LINE = new RepresentationType(
    'numberLine',
    NumberPairsStrings.a11y.numberLineStringProperty,
    NumberPairsColors.attributeSumColorProperty,
    NumberPairsColors.attributeLeftAddendColorProperty,
    NumberPairsColors.attributeRightAddendColorProperty,
    new NumberLineIcon( ICON_MAX_WIDTH, 2, { showHighlight: true } )
  );
  public static readonly enumeration = new Enumeration( RepresentationType );

  public constructor(
    public readonly label: string,
    public readonly accessibleName: TProperty<string>,
    public readonly totalColorProperty: Property<Color>,
    public readonly leftAddendColorProperty: Property<Color>,
    public readonly rightAddendColorProperty: Property<Color>,
    public readonly icon: Node,
    public readonly singularAccessibleName?: TProperty<string>
  ) {
    super();
  }
}

numberPairs.register( 'RepresentationType', RepresentationType );