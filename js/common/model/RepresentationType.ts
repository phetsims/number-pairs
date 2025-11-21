// Copyright 2024-2025, University of Colorado Boulder
/**
 * The RepresentationType Enumeration defines the types of representations that users can interact with
 * in the Counting Area. Each representation type has a unique set of colors and icons.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
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
import NumberPairsFluent from '../../NumberPairsFluent.js';
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
    NumberPairsFluent.a11y.apples.accessibleNameStringProperty,
    NumberPairsFluent.a11y.apples.singularAccessibleNameStringProperty,
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new Image( apple_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly SOCCER_BALLS = new RepresentationType(
    'soccerBalls',
    NumberPairsFluent.a11y.soccerBalls.accessibleNameStringProperty,
    NumberPairsFluent.a11y.soccerBalls.singularAccessibleNameStringProperty,
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new Image( soccerball_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly BUTTERFLIES = new RepresentationType(
    'butterflies',
    NumberPairsFluent.a11y.butterflies.accessibleNameStringProperty,
    NumberPairsFluent.a11y.butterflies.singularAccessibleNameStringProperty,
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new Image( butterfly_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly ONE_CARDS = new RepresentationType(
    'oneCards',
    NumberPairsFluent.a11y.ones.accessibleNameStringProperty,
    NumberPairsFluent.a11y.ones.singularAccessibleNameStringProperty,
    NumberPairsColors.locationSumColorProperty,
    NumberPairsColors.locationLeftAddendColorProperty,
    NumberPairsColors.locationRightAddendColorProperty,
    new OneCard( ICON_MAX_WIDTH, ICON_MAX_HEIGHT, 20 )
  );
  public static readonly KITTENS = new RepresentationType(
    'kittens',
    NumberPairsFluent.a11y.kittens.accessibleNameStringProperty,
    NumberPairsFluent.a11y.kittens.singularAccessibleNameStringProperty,
    NumberPairsColors.attributeSumColorProperty,
    NumberPairsColors.attributeLeftAddendColorProperty,
    NumberPairsColors.attributeRightAddendColorProperty,
    new Image( kittenBlue_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly BEADS = new RepresentationType(
    'beads',
    NumberPairsFluent.a11y.beads.accessibleNameStringProperty,
    NumberPairsFluent.a11y.beads.singularAccessibleNameStringProperty,
    NumberPairsColors.attributeSumColorProperty,
    NumberPairsColors.attributeLeftAddendColorProperty,
    NumberPairsColors.attributeRightAddendColorProperty,
    new Image( beadBlue_svg, { maxWidth: ICON_MAX_WIDTH, maxHeight: ICON_MAX_HEIGHT } )
  );
  public static readonly NUMBER_LINE = new RepresentationType(
    'numberLine',
    NumberPairsFluent.a11y.numberLine.accessibleNameStringProperty,
    // Note that for the number line, we use the singular for the plural because there is only one number line
    NumberPairsFluent.a11y.numberLine.accessibleNameStringProperty,
    NumberPairsColors.attributeSumColorProperty,
    NumberPairsColors.attributeLeftAddendColorProperty,
    NumberPairsColors.attributeRightAddendColorProperty,
    new NumberLineIcon( ICON_MAX_WIDTH, 2, { showHighlight: true } )
  );
  public static readonly enumeration = new Enumeration( RepresentationType );

  public constructor(
    public readonly label: string,
    public readonly accessibleName: TReadOnlyProperty<string>,
    public readonly singularAccessibleName: TReadOnlyProperty<string>,
    public readonly totalColorProperty: Property<Color>,
    public readonly leftAddendColorProperty: Property<Color>,
    public readonly rightAddendColorProperty: Property<Color>,
    public readonly icon: Node
  ) {
    super();
  }
}

numberPairs.register( 'RepresentationType', RepresentationType );