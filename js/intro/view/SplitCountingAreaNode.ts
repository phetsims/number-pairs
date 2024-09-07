// Copyright 2024, University of Colorado Boulder
/**
 * SplitCountingAreaNode is the background for the counting area, which is split into two parts. Each location area
 * determines which addend the object is associated with.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import { Line, Node, NodeOptions, Path, Rectangle } from '../../../../scenery/js/imports.js';
import { Shape } from '../../../../kite/js/imports.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';

const LEFT_ADDEND_COLOR_PROPERTY = NumberPairsColors.locationLeftAddendColorProperty;
const RIGHT_ADDEND_COLOR_PROPERTY = NumberPairsColors.locationRightAddendColorProperty;
const COUNTING_AREA_LINE_WIDTH = 1.5;

export default class SplitCountingAreaNode extends Node {

  public constructor( countingAreaBounds: Bounds2, providedOptions?: NodeOptions ) {

    // Create the counting area background.
    const leftCountingAreaShape = Shape.roundedRectangleWithRadii(
      countingAreaBounds.minX - COUNTING_AREA_LINE_WIDTH / 2,
      countingAreaBounds.minY,
      countingAreaBounds.width / 2,
      countingAreaBounds.height, {
        topLeft: NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS,
        bottomLeft: NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS
      } );
    const leftCountingArea = new Path( leftCountingAreaShape, {
      fill: LEFT_ADDEND_COLOR_PROPERTY
    } );
    const rightCountingAreaShape = Shape.roundedRectangleWithRadii(
      countingAreaBounds.minX + countingAreaBounds.width / 2 - COUNTING_AREA_LINE_WIDTH / 2,
      countingAreaBounds.minY,
      countingAreaBounds.width / 2,
      countingAreaBounds.height, {
        topRight: NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS,
        bottomRight: NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS
      } );
    const rightCountingArea = new Path( rightCountingAreaShape, {
      fill: RIGHT_ADDEND_COLOR_PROPERTY
    } );
    const locationSeparator = new Line(
      countingAreaBounds.centerX - COUNTING_AREA_LINE_WIDTH / 2,
      countingAreaBounds.minY,
      countingAreaBounds.centerX - COUNTING_AREA_LINE_WIDTH / 2,
      countingAreaBounds.maxY, {
        stroke: 'black',
        lineWidth: COUNTING_AREA_LINE_WIDTH,
        lineDash: [ 14, 10 ]
      } );
    const countingAreaOutline = new Rectangle( countingAreaBounds, {
      stroke: 'black',
      lineWidth: 1.5,
      cornerRadius: NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS
    } );

    const options = combineOptions<NodeOptions>( {
      children: [ leftCountingArea, rightCountingArea, locationSeparator, countingAreaOutline ]
    }, providedOptions );
   super( options );
  }
}

numberPairs.register( 'SplitCountingAreaNode', SplitCountingAreaNode );