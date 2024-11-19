// Copyright 2024, University of Colorado Boulder
/**
 * Contains a slider that is decorated to show the decomposition of a number.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import numberPairs from '../../numberPairs.js';
import { Circle, Line, ManualConstraint, Node, NodeOptions } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import NumberPairsColors from '../NumberPairsColors.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import NumberLineSlider from './NumberLineSlider.js';
import Multilink from '../../../../axon/js/Multilink.js';
import CurvedArrowNode from './CurvedArrowNode.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import Range from '../../../../dot/js/Range.js';
import Property from '../../../../axon/js/Property.js';
import NumberSquare from './NumberSquare.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type SelfOptions = {
  numberLineRange: Range;
};
type NumberLineNodeOptions = SelfOptions & WithRequired<NodeOptions, 'tandem'> & StrictOmit<NodeOptions, 'children'>;

export const NUMBER_LINE_POINT_RADIUS = 8;
const LABEL_DIMENSION = 28;
const LABEL_MARGIN = 5; // distance between the label and the arrow


export default class NumberLineNode extends Node {
  public constructor( model: NumberPairsModel, numberLineWidth: number, providedOptions: NumberLineNodeOptions ) {

    const options = optionize<NumberLineNodeOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

    // CurvedArrowNode needs the starting and ending values to be Property<number> instances. Even though
    // the starting value for the leftAddendArrow and totalArrow will always be 0.
    const zeroNumberProperty = new Property( options.numberLineRange.min, {
      isValidValue: value => value === options.numberLineRange.min
    } );

    const trackModelViewTransform = ModelViewTransform2.createSinglePointScaleMapping(
      Vector2.ZERO,
      Vector2.ZERO,
      numberLineWidth / options.numberLineRange.getLength()
    );

    const slider = new NumberLineSlider(
      model.leftAddendProperty,
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
      trackModelViewTransform.modelToViewX( model.totalProperty.value ), NUMBER_LINE_POINT_RADIUS / 2, {
        stroke: NumberPairsColors.numberLineSumColorProperty,
        lineWidth: NUMBER_LINE_POINT_RADIUS
      } );
    const totalArrow = new CurvedArrowNode( zeroNumberProperty, model.totalProperty, trackModelViewTransform, {
      fill: NumberPairsColors.numberLineSumColorProperty,
      belowNumberLine: true,
      curveYRadius: 80,
      visibleProperty: model.showTotalJumpProperty
    } );
    const totalLabel = new NumberSquare( LABEL_DIMENSION, model.totalProperty, {
      fill: NumberPairsColors.numberLineSumColorProperty,
      cornerRadius: 5,
      visibleProperty: model.showTotalJumpProperty,
      numberFontSize: 20
    } );

    /**
     * LEFT ADDEND
     */
    const leftAddendHighlight = new Line( 0, -NUMBER_LINE_POINT_RADIUS / 2,
      trackModelViewTransform.modelToViewX( model.leftAddendProperty.value ), -NUMBER_LINE_POINT_RADIUS / 2, {
        stroke: NumberPairsColors.numberLineLeftAddendColorProperty,
        lineWidth: NUMBER_LINE_POINT_RADIUS
      } );
    const leftAddendArrow = new CurvedArrowNode( zeroNumberProperty, model.leftAddendProperty, trackModelViewTransform, {
      fill: NumberPairsColors.numberLineLeftAddendColorProperty,
      visibleProperty: DerivedProperty.valueEqualsConstant( model.leftAddendLabelPlacementProperty, 'arrow' )
    } );
    const leftAddendLabel = new NumberSquare( LABEL_DIMENSION, model.leftAddendProperty, {
      fill: NumberPairsColors.numberLineLeftAddendColorProperty,
      cornerRadius: 5,
      visibleProperty: model.showNumberLineAddendValuesProperty,
      numberFontSize: 20
    } );

    /**
     * RIGHT ADDEND
     */
    const rightAddendHighlight = new Line( trackModelViewTransform.modelToViewX( model.leftAddendProperty.value ), -NUMBER_LINE_POINT_RADIUS / 2,
      trackModelViewTransform.modelToViewX( model.totalProperty.value ), -NUMBER_LINE_POINT_RADIUS / 2, {
        stroke: NumberPairsColors.numberLineRightAddendColorProperty,
        lineWidth: NUMBER_LINE_POINT_RADIUS
      } );
    const rightAddendArrow = new CurvedArrowNode( model.leftAddendProperty, model.totalProperty, trackModelViewTransform, {
      fill: NumberPairsColors.numberLineRightAddendColorProperty
    } );
    const rightAddendLabel = new NumberSquare( LABEL_DIMENSION, model.rightAddendProperty, {
      fill: NumberPairsColors.numberLineRightAddendColorProperty,
      cornerRadius: 5,
      visibleProperty: model.showNumberLineAddendValuesProperty,
      numberFontSize: 20
    } );

    Multilink.multilink( [ model.leftAddendProperty, model.rightAddendProperty, model.totalProperty ],
      ( leftAddend, rightAddend, total ) => {
        leftAddendHighlight.setX2( trackModelViewTransform.modelToViewX( leftAddend ) );
        rightAddendHighlight.setX1( trackModelViewTransform.modelToViewX( leftAddend ) );
        rightAddendHighlight.setX2( trackModelViewTransform.modelToViewX( total ) );
        totalHighlight.setX2( trackModelViewTransform.modelToViewX( total ) );
      } );

    options.children = [
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
    ];
    super( options );

    // Position the total circle at the total value on the number line.
    model.totalProperty.link( total => {
      totalCircle.centerX = trackModelViewTransform.modelToViewX( total );
    } );

    // Position the total and left/right addend labels.
    ManualConstraint.create( this, [ totalArrow, totalLabel ], ( arrowProxy, labelProxy ) => {
      labelProxy.centerTop = arrowProxy.centerBottom.plusXY( 0, LABEL_MARGIN );
    } );
    Multilink.multilink( [ model.leftAddendProperty, model.leftAddendLabelPlacementProperty, leftAddendArrow.boundsProperty ],
      ( leftAddend, placement, bounds ) => {
        if ( placement === 'handle' ) {
          leftAddendLabel.centerX = trackModelViewTransform.modelToViewX( leftAddend );
          leftAddendLabel.top = NUMBER_LINE_POINT_RADIUS + 4;
        }
        else {
          leftAddendLabel.centerBottom = bounds.centerTop.plusXY( 0, -LABEL_MARGIN );
        }
      } );

    // Center the right addend label on the left addend number line value if the arrow points to itself,
    // otherwise place the label above the arrow.
    ManualConstraint.create( this, [ rightAddendArrow, rightAddendLabel ], ( arrowProxy, labelProxy ) => {
      if ( rightAddendArrow.pointsToItself ) {
      labelProxy.centerBottom = new Vector2( trackModelViewTransform.modelToViewX( model.leftAddendProperty.value ), arrowProxy.top - LABEL_MARGIN );
      }
      else {
        labelProxy.centerBottom = arrowProxy.centerTop.plusXY( 0, -LABEL_MARGIN );
      }
    } );
  }
}

numberPairs.register( 'NumberLineNode', NumberLineNode );