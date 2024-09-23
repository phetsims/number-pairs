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

type SelfOptions = {
  screenRange: Range;
};
type NumberLineNodeOptions = NodeOptions & SelfOptions;

export const NUMBER_LINE_POINT_RADIUS = 8;
export default class NumberLineNode extends Node {
  public constructor( model: NumberPairsModel, numberLineWidth: number, providedOptions: NumberLineNodeOptions ) {
    const trackModelViewTransform = ModelViewTransform2.createSinglePointScaleMapping(
      Vector2.ZERO,
      Vector2.ZERO,
      numberLineWidth / providedOptions.screenRange.getLength()
    );
    const slider = new NumberLineSlider( model.leftAddendNumberProperty, model.sumNumberProperty, trackModelViewTransform, {
      numberLineRange: providedOptions.screenRange,
      numberLineWidth: numberLineWidth
    } );
    const sumCircle = new Circle( NUMBER_LINE_POINT_RADIUS, {
      fill: NumberPairsColors.numberLineSumColorProperty,
      stroke: 'black'
    } );
    const sumHighlight = new Line( 0, NUMBER_LINE_POINT_RADIUS / 2,
      trackModelViewTransform.modelToViewX( model.sumNumberProperty.value ), NUMBER_LINE_POINT_RADIUS / 2, {
        stroke: NumberPairsColors.numberLineSumColorProperty,
        lineWidth: NUMBER_LINE_POINT_RADIUS
      } );
    const leftAddendHighlight = new Line( 0, -NUMBER_LINE_POINT_RADIUS / 2,
      trackModelViewTransform.modelToViewX( model.leftAddendNumberProperty.value ), -NUMBER_LINE_POINT_RADIUS / 2, {
        stroke: NumberPairsColors.numberLineLeftAddendColorProperty,
        lineWidth: NUMBER_LINE_POINT_RADIUS
      } );
    const rightAddendHighlight = new Line( trackModelViewTransform.modelToViewX( model.leftAddendNumberProperty.value ), -NUMBER_LINE_POINT_RADIUS / 2,
      trackModelViewTransform.modelToViewX( model.sumNumberProperty.value ), -NUMBER_LINE_POINT_RADIUS / 2, {
        stroke: NumberPairsColors.numberLineRightAddendColorProperty,
        lineWidth: NUMBER_LINE_POINT_RADIUS
      } );
    const rightAddendArrow = new EllipticalArrowNode( model.leftAddendNumberProperty, model.sumNumberProperty, trackModelViewTransform, {
      fill: NumberPairsColors.numberLineRightAddendColorProperty
    } );

    Multilink.multilink( [ model.leftAddendNumberProperty, model.rightAddendNumberProperty, model.sumNumberProperty ],
      ( leftAddend, rightAddend, sum ) => {
        leftAddendHighlight.setX2( trackModelViewTransform.modelToViewX( leftAddend ) );
        rightAddendHighlight.setX1( trackModelViewTransform.modelToViewX( leftAddend ) );
        rightAddendHighlight.setX2( trackModelViewTransform.modelToViewX( sum ) );
        sumHighlight.setX2( trackModelViewTransform.modelToViewX( sum ) );
      } );

    const options = optionize<NumberLineNodeOptions, EmptySelfOptions, NodeOptions>()( {
      children: [ leftAddendHighlight, rightAddendHighlight, sumHighlight, rightAddendArrow, slider.sliderTickParent, slider, sumCircle ]
    }, providedOptions );
    super( options );
    model.sumNumberProperty.link( sum => {
      sumCircle.centerX = trackModelViewTransform.modelToViewX( sum );
    } );
  }
}

numberPairs.register( 'NumberLineNode', NumberLineNode );