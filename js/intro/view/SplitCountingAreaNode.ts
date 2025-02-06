// Copyright 2024-2025, University of Colorado Boulder
/**
 * SplitCountingAreaNode is the background for the counting area, which is split into two parts. Each location area
 * determines which addend the object is associated with.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { Shape } from '../../../../kite/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Line, Node, NodeOptions, Path, Rectangle, Text } from '../../../../scenery/js/imports.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import ShowHideAddendButton from '../../common/view/ShowHideAddendButton.js';
import numberPairs from '../../numberPairs.js';
import { NumberPairsUtils } from '../../common/model/NumberPairsUtils.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';

const LEFT_ADDEND_COLOR_PROPERTY = NumberPairsColors.locationLeftAddendColorProperty;
const RIGHT_ADDEND_COLOR_PROPERTY = NumberPairsColors.locationRightAddendColorProperty;
const COUNTING_AREA_MARGIN = NumberPairsConstants.COUNTING_AREA_INNER_MARGIN;

type SplitCountingAreaNodeOptions = PickRequired<NodeOptions, 'tandem'> & StrictOmit<NodeOptions, 'children'>;
export default class SplitCountingAreaNode extends Node {

  public constructor(
    countingAreaBounds: Bounds2,
    leftAddendVisibleProperty: BooleanProperty,
    rightAddendVisibleProperty: BooleanProperty,
    providedOptions: SplitCountingAreaNodeOptions
  ) {

    // Create the counting area background.
    const splitBounds = NumberPairsUtils.splitBoundsInHalf( countingAreaBounds );
    const leftBounds = splitBounds[ 0 ];
    const rightBounds = splitBounds[ 1 ];
    const leftCountingAreaShape = Shape.roundedRectangleWithRadii(
      leftBounds.minX - NumberPairsConstants.COUNTING_AREA_LINE_WIDTH / 2,
      leftBounds.minY,
      leftBounds.width,
      leftBounds.height, {
        topLeft: NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS,
        bottomLeft: NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS
      } );
    const leftCountingArea = new Path( leftCountingAreaShape, {
      fill: LEFT_ADDEND_COLOR_PROPERTY
    } );
    const rightCountingAreaShape = Shape.roundedRectangleWithRadii(
      rightBounds.minX - NumberPairsConstants.COUNTING_AREA_LINE_WIDTH / 2,
      rightBounds.minY,
      rightBounds.width,
      rightBounds.height, {
        topRight: NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS,
        bottomRight: NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS
      } );
    const rightCountingArea = new Path( rightCountingAreaShape, {
      fill: RIGHT_ADDEND_COLOR_PROPERTY
    } );
    const locationSeparator = new Line(
      countingAreaBounds.centerX - NumberPairsConstants.COUNTING_AREA_LINE_WIDTH / 2,
      countingAreaBounds.minY,
      countingAreaBounds.centerX - NumberPairsConstants.COUNTING_AREA_LINE_WIDTH / 2,
      countingAreaBounds.maxY, {
        stroke: 'black',
        lineWidth: NumberPairsConstants.COUNTING_AREA_LINE_WIDTH,
        lineDash: [ 14, 10 ]
      } );
    const countingAreaOutline = new Rectangle( countingAreaBounds, {
      stroke: 'black',
      lineWidth: 1.5,
      cornerRadius: NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS
    } );

    // Create the question marks that are displayed when either addend is not visible.
    const leftAddendNotVisibleNode = new Text( '?', {
      font: new PhetFont( 80 ),
      center: leftCountingArea.center,
      visibleProperty: DerivedProperty.not( leftAddendVisibleProperty )
    } );
    const rightAddendNotVisibleNode = new Text( '?', {
      font: new PhetFont( 80 ),
      center: rightCountingArea.center,
      visibleProperty: DerivedProperty.not( rightAddendVisibleProperty )
    } );

    const options = optionize<SplitCountingAreaNodeOptions, EmptySelfOptions, NodeOptions>()( {
      children: [ leftCountingArea, leftAddendNotVisibleNode, rightCountingArea,
        rightAddendNotVisibleNode, locationSeparator, countingAreaOutline ]
    }, providedOptions );
    super( options );

    const leftShowHideAddendButton = new ShowHideAddendButton( leftAddendVisibleProperty, {
      accessibleName: NumberPairsStrings.showOrHideAddendStringProperty,
      left: countingAreaBounds.minX + COUNTING_AREA_MARGIN,
      bottom: countingAreaBounds.maxY - COUNTING_AREA_MARGIN,
      tandem: options.tandem.createTandem( 'leftShowHideAddendButton' )
    } );
    const rightShowHideAddendButton = new ShowHideAddendButton( rightAddendVisibleProperty, {
      accessibleName: NumberPairsStrings.showOrHideAddendStringProperty,
      right: countingAreaBounds.maxX - COUNTING_AREA_MARGIN,
      bottom: countingAreaBounds.maxY - COUNTING_AREA_MARGIN,
      tandem: options.tandem.createTandem( 'rightShowHideAddendButton' )
    } );
    this.addChild( leftShowHideAddendButton );
    this.addChild( rightShowHideAddendButton );

  }
}

numberPairs.register( 'SplitCountingAreaNode', SplitCountingAreaNode );