// Copyright 2024, University of Colorado Boulder
/**
 * Contains a slider that is decorated to show the decomposition of a number.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 * TODO: add this representation to other screens as well
 */

import numberPairs from '../../numberPairs.js';
import { Circle, Line, Node, NodeOptions } from '../../../../scenery/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import NumberLineSlider from '../../common/view/NumberLineSlider.js';
import Multilink from '../../../../axon/js/Multilink.js';
import EllipticalArrowNode from '../../common/view/EllipticalArrowNode.js';
import NumberPairsModel from '../../common/model/NumberPairsModel.js';
import Range from '../../../../dot/js/Range.js';
import Property from '../../../../axon/js/Property.js';

type SelfOptions = {
  numberLineRange: Range;
};
type NumberLineNodeOptions = NodeOptions & SelfOptions;

export const NUMBER_LINE_POINT_RADIUS = 8;

export default class NumberLineNode extends Node {
  public constructor( model: NumberPairsModel, numberLineWidth: number, providedOptions: NumberLineNodeOptions ) {

    // EllipticalArrowNode needs the starting and ending values to be Property<number> instances. Even though
    // the starting value for the leftAddendArrow and totalArrow will always be 0.
    const zeroNumberProperty = new Property( providedOptions.numberLineRange.min );

    const trackModelViewTransform = ModelViewTransform2.createSinglePointScaleMapping(
      Vector2.ZERO,
      Vector2.ZERO,
      numberLineWidth / providedOptions.numberLineRange.getLength()
    );
    const slider = new NumberLineSlider( model.leftAddendNumberProperty, model.totalNumberProperty, trackModelViewTransform, {
      numberLineRange: providedOptions.numberLineRange,
      numberLineWidth: numberLineWidth
    } );
    const totalCircle = new Circle( NUMBER_LINE_POINT_RADIUS, {
      fill: NumberPairsColors.numberLineSumColorProperty,
      stroke: 'black'
    } );
    const totalHighlight = new Line( 0, NUMBER_LINE_POINT_RADIUS / 2,
      trackModelViewTransform.modelToViewX( model.totalNumberProperty.value ), NUMBER_LINE_POINT_RADIUS / 2, {
        stroke: NumberPairsColors.numberLineSumColorProperty,
        lineWidth: NUMBER_LINE_POINT_RADIUS
      } );
    const totalArrow = new EllipticalArrowNode( zeroNumberProperty, model.totalNumberProperty, trackModelViewTransform, {
      fill: NumberPairsColors.numberLineSumColorProperty,
      belowNumberLine: true,
      ellipseYRadius: 80
    } );

    const leftAddendHighlight = new Line( 0, -NUMBER_LINE_POINT_RADIUS / 2,
      trackModelViewTransform.modelToViewX( model.leftAddendNumberProperty.value ), -NUMBER_LINE_POINT_RADIUS / 2, {
        stroke: NumberPairsColors.numberLineLeftAddendColorProperty,
        lineWidth: NUMBER_LINE_POINT_RADIUS
      } );
    const leftAddendArrow = new EllipticalArrowNode( zeroNumberProperty, model.leftAddendNumberProperty, trackModelViewTransform, {
      fill: NumberPairsColors.numberLineLeftAddendColorProperty
    } );

    const rightAddendHighlight = new Line( trackModelViewTransform.modelToViewX( model.leftAddendNumberProperty.value ), -NUMBER_LINE_POINT_RADIUS / 2,
      trackModelViewTransform.modelToViewX( model.totalNumberProperty.value ), -NUMBER_LINE_POINT_RADIUS / 2, {
        stroke: NumberPairsColors.numberLineRightAddendColorProperty,
        lineWidth: NUMBER_LINE_POINT_RADIUS
      } );
    const rightAddendArrow = new EllipticalArrowNode( model.leftAddendNumberProperty, model.totalNumberProperty, trackModelViewTransform, {
      fill: NumberPairsColors.numberLineRightAddendColorProperty
    } );

    Multilink.multilink( [ model.leftAddendNumberProperty, model.rightAddendNumberProperty, model.totalNumberProperty ],
      ( leftAddend, rightAddend, total ) => {
        leftAddendHighlight.setX2( trackModelViewTransform.modelToViewX( leftAddend ) );
        rightAddendHighlight.setX1( trackModelViewTransform.modelToViewX( leftAddend ) );
        rightAddendHighlight.setX2( trackModelViewTransform.modelToViewX( total ) );
        totalHighlight.setX2( trackModelViewTransform.modelToViewX( total ) );
      } );

    const options = optionize<NumberLineNodeOptions, EmptySelfOptions, NodeOptions>()( {
      children: [ leftAddendHighlight, rightAddendHighlight, totalHighlight, rightAddendArrow, leftAddendArrow, totalArrow, slider.sliderTickParent, slider, totalCircle ]
    }, providedOptions );
    super( options );
    model.totalNumberProperty.link( total => {
      totalCircle.centerX = trackModelViewTransform.modelToViewX( total );
    } );
  }
}

numberPairs.register( 'NumberLineNode', NumberLineNode );