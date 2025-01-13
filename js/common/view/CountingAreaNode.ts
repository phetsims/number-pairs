// Copyright 2024-2025, University of Colorado Boulder

/**
 * Create the counting area where counting representations are placed and can be manipulated by the user.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, NodeOptions, Rectangle, TColor, Text } from '../../../../scenery/js/imports.js';
import SplitCountingAreaNode from '../../intro/view/SplitCountingAreaNode.js';
import numberPairs from '../../numberPairs.js';
import RepresentationType from '../model/RepresentationType.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import ShowHideAddendButton from './ShowHideAddendButton.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';

type SelfOptions = {
  backgroundColorProperty: TReadOnlyProperty<TColor>;
  countingRepresentationTypeProperty: Property<RepresentationType>;
};

type CountingAreaNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'> & PickRequired<NodeOptions, 'tandem'>;

export const COUNTING_AREA_LINE_WIDTH = 1.5;
const COUNTING_AREA_MARGIN = NumberPairsConstants.COUNTING_AREA_INNER_MARGIN;
export default class CountingAreaNode extends Node {

  public constructor(
    leftAddendVisibleProperty: BooleanProperty,
    rightAddendVisibleProperty: BooleanProperty,
    countingAreaBounds: Bounds2,
    providedOptions: CountingAreaNodeOptions ) {

    const options = optionize<CountingAreaNodeOptions, SelfOptions, NodeOptions>()( {
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );
    super( options );

    // The split counting area is only visible when we are in a location based counting representation.
    // i.e. Apples, Soccer Balls, Butterflies, One Cards
    const splitCountingAreaVisibleProperty = new DerivedProperty( [ options.countingRepresentationTypeProperty ],
      countingRepresentationType => {
        return countingRepresentationType === RepresentationType.APPLES ||
               countingRepresentationType === RepresentationType.ONE_CARDS ||
               countingRepresentationType === RepresentationType.SOCCER_BALLS ||
               countingRepresentationType === RepresentationType.BUTTERFLIES;
      } );

    const backgroundRectangle = new Rectangle( countingAreaBounds, {
      fill: options.backgroundColorProperty.value,
      stroke: 'black',
      lineWidth: COUNTING_AREA_LINE_WIDTH,
      cornerRadius: NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS
    } );
    const addendsNotVisibleNode = new Text( '?', {
      font: new PhetFont( 80 ),
      center: backgroundRectangle.center,
      visibleProperty: new DerivedProperty( [ leftAddendVisibleProperty, rightAddendVisibleProperty ],
        ( leftAddendVisible, rightAddendVisible ) => {
          return !leftAddendVisible || !rightAddendVisible;
        } )
    } );
    backgroundRectangle.addChild( addendsNotVisibleNode );
    options.backgroundColorProperty.link( backgroundColor => {
      backgroundRectangle.fill = backgroundColor;
    } );

    const showHideBothAddendsButton = new ShowHideAddendButton( leftAddendVisibleProperty, {
      left: countingAreaBounds.minX + COUNTING_AREA_MARGIN,
      bottom: countingAreaBounds.maxY - COUNTING_AREA_MARGIN,
      secondAddendVisibleProperty: rightAddendVisibleProperty,
      visibleProperty: DerivedProperty.not( splitCountingAreaVisibleProperty ),
      tandem: options.tandem.createTandem( 'showHideBothAddendsButton' )
    } );
    this.addChild( backgroundRectangle );
    this.addChild( showHideBothAddendsButton );

    const splitCountingAreaBackground = new SplitCountingAreaNode(
      countingAreaBounds, leftAddendVisibleProperty, rightAddendVisibleProperty, {
        visibleProperty: splitCountingAreaVisibleProperty,
        tandem: options.countingRepresentationTypeProperty.validValues?.includes( RepresentationType.ONE_CARDS ) ?
                options.tandem.createTandem( 'splitCountingAreaBackground' ) : Tandem.OPT_OUT
      } );

    this.addChild( splitCountingAreaBackground );
  }
}

numberPairs.register( 'CountingAreaNode', CountingAreaNode );