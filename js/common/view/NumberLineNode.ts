// Copyright 2024, University of Colorado Boulder
/**
 * Contains a slider that is decorated to show the decomposition of a number.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import numberPairs from '../../numberPairs.js';
import { Circle, Line, ManualConstraint, Node, NodeOptions } from '../../../../scenery/js/imports.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import NumberPairsColors from '../NumberPairsColors.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import NumberLineSlider from './NumberLineSlider.js';
import Multilink from '../../../../axon/js/Multilink.js';
import EllipticalArrowNode from './EllipticalArrowNode.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import Range from '../../../../dot/js/Range.js';
import Property from '../../../../axon/js/Property.js';
import NumberSquare from './NumberSquare.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';

type SelfOptions = {
  numberLineRange: Range;
};
type NumberLineNodeOptions = WithRequired<NodeOptions, 'tandem'> & SelfOptions;

export const NUMBER_LINE_POINT_RADIUS = 8;
const LABEL_DIMENSION = 28;


export default class NumberLineNode extends Node {
  public constructor( model: NumberPairsModel, numberLineWidth: number, providedOptions: NumberLineNodeOptions ) {

    const options = optionize<NumberLineNodeOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

    // EllipticalArrowNode needs the starting and ending values to be Property<number> instances. Even though
    // the starting value for the leftAddendArrow and totalArrow will always be 0.
    const zeroNumberProperty = new Property( options.numberLineRange.min );

    const trackModelViewTransform = ModelViewTransform2.createSinglePointScaleMapping(
      Vector2.ZERO,
      Vector2.ZERO,
      numberLineWidth / options.numberLineRange.getLength()
    );

    const slider = new NumberLineSlider(
      model.leftAddendNumberProperty,
      model.numberLineSliderEnabledRangeProperty,
      trackModelViewTransform,
      model.showTickValuesProperty,
      {
        numberLineRange: options.numberLineRange,
        numberLineWidth: numberLineWidth,
        tandem: options.tandem.createTandem( 'slider' )
      } );

    /**
     * TOTAL
     */
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
      ellipseYRadius: 80,
      visibleProperty: model.showTotalJumpProperty
    } );
    const totalLabel = new NumberSquare( LABEL_DIMENSION, model.totalNumberProperty, {
      fill: NumberPairsColors.numberLineSumColorProperty,
      cornerRadius: 5,
      visibleProperty: model.showTotalJumpProperty,
      numberFontSize: 20
    } );

    /**
     * LEFT ADDEND
     */
    const leftAddendHighlight = new Line( 0, -NUMBER_LINE_POINT_RADIUS / 2,
      trackModelViewTransform.modelToViewX( model.leftAddendNumberProperty.value ), -NUMBER_LINE_POINT_RADIUS / 2, {
        stroke: NumberPairsColors.numberLineLeftAddendColorProperty,
        lineWidth: NUMBER_LINE_POINT_RADIUS
      } );
    const leftAddendArrow = new EllipticalArrowNode( zeroNumberProperty, model.leftAddendNumberProperty, trackModelViewTransform, {
      fill: NumberPairsColors.numberLineLeftAddendColorProperty
    } );
    const leftAddendLabel = new NumberSquare( LABEL_DIMENSION, model.leftAddendNumberProperty, {
      fill: NumberPairsColors.numberLineLeftAddendColorProperty,
      cornerRadius: 5,
      visibleProperty: model.showAddendValuesProperty,
      numberFontSize: 20
    } );

    /**
     * RIGHT ADDEND
     */
    const rightAddendHighlight = new Line( trackModelViewTransform.modelToViewX( model.leftAddendNumberProperty.value ), -NUMBER_LINE_POINT_RADIUS / 2,
      trackModelViewTransform.modelToViewX( model.totalNumberProperty.value ), -NUMBER_LINE_POINT_RADIUS / 2, {
        stroke: NumberPairsColors.numberLineRightAddendColorProperty,
        lineWidth: NUMBER_LINE_POINT_RADIUS
      } );
    const rightAddendArrow = new EllipticalArrowNode( model.leftAddendNumberProperty, model.totalNumberProperty, trackModelViewTransform, {
      fill: NumberPairsColors.numberLineRightAddendColorProperty
    } );
    const rightAddendLabel = new NumberSquare( LABEL_DIMENSION, model.rightAddendNumberProperty, {
      fill: NumberPairsColors.numberLineRightAddendColorProperty,
      cornerRadius: 5,
      visibleProperty: model.showAddendValuesProperty,
      numberFontSize: 20
    } );

    Multilink.multilink( [ model.leftAddendNumberProperty, model.rightAddendNumberProperty, model.totalNumberProperty ],
      ( leftAddend, rightAddend, total ) => {
        leftAddendHighlight.setX2( trackModelViewTransform.modelToViewX( leftAddend ) );
        rightAddendHighlight.setX1( trackModelViewTransform.modelToViewX( leftAddend ) );
        rightAddendHighlight.setX2( trackModelViewTransform.modelToViewX( total ) );
        totalHighlight.setX2( trackModelViewTransform.modelToViewX( total ) );
      } );

    const superOptions = combineOptions<NodeOptions>( {
      children: [
        leftAddendHighlight,
        rightAddendHighlight,
        totalHighlight,
        rightAddendArrow,
        leftAddendArrow,
        totalArrow,
        slider.sliderTickParent,
        slider,
        totalCircle,
        rightAddendLabel,
        leftAddendLabel,
        totalLabel
      ]
    }, providedOptions );
    super( superOptions );

    // Position the total circle at the total value on the number line.
    model.totalNumberProperty.link( total => {
      totalCircle.centerX = trackModelViewTransform.modelToViewX( total );
    } );

    // Position the total and left/right addend labels.
    ManualConstraint.create( this, [ totalArrow, totalLabel ], ( arrowProxy, labelProxy ) => {
      labelProxy.centerTop = arrowProxy.centerBottom.plusXY( 0, 5 );
    } );
    Multilink.multilink( [ model.leftAddendNumberProperty, model.leftAddendLabelPlacementProperty, leftAddendArrow.boundsProperty ],
      ( leftAddend, placement, bounds ) => {
        if ( placement === 'handle' ) {
          leftAddendLabel.centerX = trackModelViewTransform.modelToViewX( leftAddend );
          leftAddendLabel.top = NUMBER_LINE_POINT_RADIUS + 4;
        }
        else {
          leftAddendLabel.centerBottom = bounds.centerTop.plusXY( 0, -5 );
        }
      } );
    ManualConstraint.create( this, [ rightAddendArrow, rightAddendLabel ], ( arrowProxy, labelProxy ) => {
      labelProxy.centerBottom = arrowProxy.centerTop.plusXY( 0, -5 );
    } );
  }
}

numberPairs.register( 'NumberLineNode', NumberLineNode );