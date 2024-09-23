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
import SumModel from '../model/SumModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { RADIUS } from './ThumbNode.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import NumberLineSlider from '../../common/view/NumberLineSlider.js';
import Multilink from '../../../../axon/js/Multilink.js';

type NumberLineNodeOptions = NodeOptions;

const HIGHLIGHT_LINE_WIDTH = RADIUS;
export default class NumberLineNode extends Node {
  public constructor( model: SumModel, numberLineWidth: number, providedOptions: NumberLineNodeOptions ) {
    const trackModelViewTransform = ModelViewTransform2.createSinglePointScaleMapping(
      Vector2.ZERO,
      Vector2.ZERO,
      numberLineWidth / model.leftAddendNumberProperty.range.getLength()
    );
    const slider = new NumberLineSlider( model.leftAddendNumberProperty, model.sumProperty, trackModelViewTransform, {
      numberLineWidth: numberLineWidth
    } );
    const sumCircle = new Circle( RADIUS, {
      fill: NumberPairsColors.numberLineSumColorProperty,
      stroke: 'black'
    } );
    const sumHighlight = new Line( 0, HIGHLIGHT_LINE_WIDTH / 2,
      trackModelViewTransform.modelToViewX( model.sumProperty.value ), HIGHLIGHT_LINE_WIDTH / 2, {
        stroke: NumberPairsColors.numberLineSumColorProperty,
        lineWidth: HIGHLIGHT_LINE_WIDTH
      } );
    const leftAddendHighlight = new Line( 0, -HIGHLIGHT_LINE_WIDTH / 2,
      trackModelViewTransform.modelToViewX( model.leftAddendNumberProperty.value ), -HIGHLIGHT_LINE_WIDTH / 2, {
        stroke: NumberPairsColors.numberLineLeftAddendColorProperty,
        lineWidth: HIGHLIGHT_LINE_WIDTH
      } );
    const rightAddendHighlight = new Line( trackModelViewTransform.modelToViewX( model.leftAddendNumberProperty.value ), -HIGHLIGHT_LINE_WIDTH / 2,
      trackModelViewTransform.modelToViewX( model.sumProperty.value ), -HIGHLIGHT_LINE_WIDTH / 2, {
        stroke: NumberPairsColors.numberLineRightAddendColorProperty,
        lineWidth: HIGHLIGHT_LINE_WIDTH
      } );

    Multilink.multilink( [ model.leftAddendNumberProperty, model.rightAddendNumberProperty, model.sumProperty ],
      ( leftAddend, rightAddend, sum ) => {
        leftAddendHighlight.setX2( trackModelViewTransform.modelToViewX( leftAddend ) );
        rightAddendHighlight.setX1( trackModelViewTransform.modelToViewX( leftAddend ) );
        rightAddendHighlight.setX2( trackModelViewTransform.modelToViewX( sum ) );
        sumHighlight.setX2( trackModelViewTransform.modelToViewX( sum ) );
    } );

    const options = optionize<NumberLineNodeOptions, EmptySelfOptions, NodeOptions>()( {
      children: [ leftAddendHighlight, rightAddendHighlight, sumHighlight, slider.sliderTickParent, slider, sumCircle ]
    }, providedOptions );
    super( options );
    model.sumProperty.link( sum => {
      sumCircle.centerX = trackModelViewTransform.modelToViewX( sum );
    } );
  }
}

numberPairs.register( 'NumberLineNode', NumberLineNode );