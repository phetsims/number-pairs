// Copyright 2024-2025, University of Colorado Boulder
/**
 * Contains a slider that is decorated to show the decomposition of a number.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsColors from '../NumberPairsColors.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import CurvedArrowNode from './CurvedArrowNode.js';
import NumberLineSlider from './NumberLineSlider.js';
import NumberRectangle from './NumberRectangle.js';

export const NUMBER_LINE_POINT_RADIUS = 8;
const LABEL_DIMENSION = 21;
const LABEL_MARGIN = 5; // distance between the label and the arrow

type SelfOptions = {
  numberLineRange: Range;
  interactive?: boolean; // We use the slider in non-interactive contexts like the GameScreen.
};
export type NumberLineNodeOptions = SelfOptions & WithRequired<NodeOptions, 'tandem'> & StrictOmit<NodeOptions, 'children'>;


export default class NumberLineNode extends Node {
  public static readonly POINT_RADIUS = NUMBER_LINE_POINT_RADIUS;

  public readonly slider: NumberLineSlider;
  protected readonly leftAddendHighlight: Rectangle;
  protected readonly rightAddendHighlight: Rectangle;
  protected readonly leftAddendArrow: CurvedArrowNode;
  protected readonly rightAddendArrow: CurvedArrowNode;

  public constructor( model: Pick<NumberPairsModel, 'leftAddendProperty' | 'numberLineSliderEnabledRangeProperty' |
    'tickValuesVisibleProperty' | 'rightAddendProperty' | 'totalProperty' | 'totalJumpVisibleProperty' |
    'numberLineCountFromZeroProperty' | 'numberLineAddendValuesVisibleProperty' | 'totalVisibleProperty'
  >, numberLineWidth: number, providedOptions: NumberLineNodeOptions ) {

    const options = optionize<NumberLineNodeOptions, SelfOptions, NodeOptions>()( {
      interactive: true
    }, providedOptions );

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
      model.rightAddendProperty,
      model.totalProperty,
      model.totalVisibleProperty,
      model.numberLineSliderEnabledRangeProperty,
      trackModelViewTransform,
      model.tickValuesVisibleProperty,
      model.numberLineAddendValuesVisibleProperty, {
        accessibleName: NumberPairsFluent.a11y.numberLine.addendSplitterKnob.accessibleNameStringProperty,
        accessibleHelpText: NumberPairsFluent.a11y.numberLine.addendSplitterKnob.accessibleHelpTextStringProperty,
        numberLineRange: options.numberLineRange,
        numberLineWidth: numberLineWidth,
        interactive: options.interactive,
        tandem: options.tandem.createTandem( 'slider' )
      } );

    const highlightStrokeWidth = NUMBER_LINE_POINT_RADIUS - 2;

    /**
     * TOTAL
     */
    const totalCircle = new Circle( NUMBER_LINE_POINT_RADIUS, {
      fill: NumberPairsColors.attributeSumColorProperty,
      stroke: 'black'
    } );
    const totalHighlight = new Rectangle( 0, 0,
      trackModelViewTransform.modelToViewX( model.totalProperty.value ), highlightStrokeWidth, {
        fill: NumberPairsColors.attributeSumColorProperty,
        stroke: NumberPairsConstants.GET_DARKER_COLOR( NumberPairsColors.attributeSumColorProperty.value )
      } );
    const totalArrow = new CurvedArrowNode( zeroNumberProperty, model.totalProperty, trackModelViewTransform, {
      arrowColorProperty: NumberPairsColors.attributeSumColorProperty,
      addStrokeToArrow: true,
      belowNumberLine: true,
      curveYRadius: 80,
      visibleProperty: model.totalJumpVisibleProperty
    } );
    const totalLabel = new NumberRectangle( new Dimension2( LABEL_DIMENSION, LABEL_DIMENSION ), model.totalProperty, {
      fill: NumberPairsColors.numberLineLabelBackgroundColorProperty,
      cornerRadius: 5,
      visibleProperty: model.totalJumpVisibleProperty,
      numberFontSize: 20
    } );

    /**
     * LEFT ADDEND
     */
    const leftAddendHighlight = new Rectangle( 0, -highlightStrokeWidth,
      trackModelViewTransform.modelToViewX( model.leftAddendProperty.value ), highlightStrokeWidth, {
        fill: NumberPairsColors.attributeLeftAddendColorProperty,
        stroke: NumberPairsConstants.GET_DARKER_COLOR( NumberPairsColors.attributeLeftAddendColorProperty.value )
      } );
    const leftAddendArrow = new CurvedArrowNode( zeroNumberProperty, model.leftAddendProperty, trackModelViewTransform, {
      arrowColorProperty: NumberPairsColors.attributeLeftAddendColorProperty,
      addStrokeToArrow: true,
      visibleProperty: model.numberLineCountFromZeroProperty
    } );
    const leftAddendLabel = new NumberRectangle( new Dimension2( LABEL_DIMENSION, LABEL_DIMENSION ), model.leftAddendProperty, {
      fill: NumberPairsColors.numberLineLabelBackgroundColorProperty,
      cornerRadius: 5,
      visibleProperty: model.numberLineAddendValuesVisibleProperty,
      numberFontSize: 20
    } );

    /**
     * RIGHT ADDEND
     */
    const rightAddendHighlight = new Rectangle( trackModelViewTransform.modelToViewX( model.leftAddendProperty.value ), -highlightStrokeWidth,
      trackModelViewTransform.modelToViewX( model.totalProperty.value ), highlightStrokeWidth, {
        fill: NumberPairsColors.attributeRightAddendColorProperty,
        stroke: NumberPairsConstants.GET_DARKER_COLOR( NumberPairsColors.attributeRightAddendColorProperty.value )
      } );
    const rightAddendArrow = new CurvedArrowNode( model.leftAddendProperty, model.totalProperty, trackModelViewTransform, {
      arrowColorProperty: NumberPairsColors.attributeRightAddendColorProperty,
      pointsToItselfYRadiusMultiplier: 1.5,
      addStrokeToArrow: true
    } );
    const rightAddendLabel = new NumberRectangle( new Dimension2( LABEL_DIMENSION, LABEL_DIMENSION ), model.rightAddendProperty, {
      fill: NumberPairsColors.numberLineLabelBackgroundColorProperty,
      cornerRadius: 5,
      visibleProperty: model.numberLineAddendValuesVisibleProperty,
      numberFontSize: 20
    } );

    Multilink.multilink( [ model.leftAddendProperty, model.rightAddendProperty, model.totalProperty ],
      ( leftAddend, rightAddend, total ) => {
        leftAddendHighlight.setRectWidth( trackModelViewTransform.modelToViewDeltaX( leftAddend ) );
        rightAddendHighlight.setRectX( trackModelViewTransform.modelToViewX( leftAddend ) );
        rightAddendHighlight.setRectWidth( trackModelViewTransform.modelToViewDeltaX( rightAddend ) );
        totalHighlight.setRectWidth( trackModelViewTransform.modelToViewDeltaX( total ) );
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

    this.leftAddendHighlight = leftAddendHighlight;
    this.rightAddendHighlight = rightAddendHighlight;
    this.leftAddendArrow = leftAddendArrow;
    this.rightAddendArrow = rightAddendArrow;

    // Position the total circle at the total value on the number line.
    model.totalProperty.link( total => {
      totalCircle.centerX = trackModelViewTransform.modelToViewX( total );
    } );

    // Position the total and left/right addend labels.
    ManualConstraint.create( this, [ totalArrow, totalLabel ], ( arrowProxy, labelProxy ) => {
      labelProxy.centerTop = arrowProxy.centerBottom.plusXY( 0, LABEL_MARGIN );
    } );
    Multilink.multilink( [ model.leftAddendProperty, model.numberLineCountFromZeroProperty, leftAddendArrow.boundsProperty ],
      ( leftAddend, countFromZero, bounds ) => {
        if ( !countFromZero ) {
          leftAddendLabel.centerX = trackModelViewTransform.modelToViewX( leftAddend );
          leftAddendLabel.bottom = -NUMBER_LINE_POINT_RADIUS - 8;
        }
        else {
          if ( leftAddendArrow.pointsToItself ) {
            leftAddendLabel.centerBottom = new Vector2( trackModelViewTransform.modelToViewX( leftAddend ), leftAddendArrow.top - LABEL_MARGIN );
          }
          else {
            leftAddendLabel.centerBottom = bounds.centerTop.plusXY( 0, -LABEL_MARGIN );
          }
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

    this.slider = slider;
  }
}

numberPairs.register( 'NumberLineNode', NumberLineNode );
