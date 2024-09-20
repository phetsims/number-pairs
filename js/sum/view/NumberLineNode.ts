// Copyright 2024, University of Colorado Boulder
/**
 * Contains a slider that is decorated to show the decomposition of a number.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 * TODO: add this representation to other screens as well
 */

import numberPairs from '../../numberPairs.js';
import { Circle, Line, Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import SumModel from '../model/SumModel.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Utils from '../../../../dot/js/Utils.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ThumbNode, { RADIUS } from './ThumbNode.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import SliderTrack, { SliderTrackOptions } from '../../../../sun/js/SliderTrack.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Range from '../../../../dot/js/Range.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import Property from '../../../../axon/js/Property.js';

type NumberLineNodeOptions = NodeOptions;

const MINOR_TICK_LENGTH = 16;
const MAJOR_TICK_LENGTH = 24;
const NUMBER_LINE_RANGE = new Range( NumberPairsConstants.TEN_SCENE_RANGE.min, NumberPairsConstants.TWENTY_SCENE_RANGE.max );
export default class NumberLineNode extends Node {
  public constructor( model: SumModel, numberLineWidth: number, providedOptions: NumberLineNodeOptions ) {

    const sliderEnabledRangeProperty = new DerivedProperty( [ model.sumProperty ], sum => {
      return new Range( NUMBER_LINE_RANGE.min, sum );
    } );
    const trackDimension = new Dimension2( numberLineWidth, 1 );
    const thumbNode = new ThumbNode();
    const trackModelViewTransform = ModelViewTransform2.createSinglePointScaleMapping(
      Vector2.ZERO,
      Vector2.ZERO,
      trackDimension.width / model.leftAddendNumberProperty.range.getLength()
    );
    const sliderTrack = new NumberLineSliderTrack( model.leftAddendNumberProperty, trackModelViewTransform, {
      constrainValue: n => Utils.toFixedNumber( n, 0 ),
      size: trackDimension,
      enabledRangeProperty: sliderEnabledRangeProperty
    } );
    const decompositionSlider = new HSlider( model.leftAddendNumberProperty, NUMBER_LINE_RANGE, {
      thumbNode: thumbNode,
      trackNode: sliderTrack,
      thumbYOffset: thumbNode.height / 2 - RADIUS,
      constrainValue: n => Utils.toFixedNumber( n, 0 ),
      enabledRangeProperty: sliderEnabledRangeProperty
    } );
    const sumCircle = new Circle( RADIUS, {
      fill: NumberPairsColors.numberLineSumColorProperty,
      stroke: 'black'
    } );

    const options = optionize<NumberLineNodeOptions, EmptySelfOptions, NodeOptions>()( {
      children: [ sliderTrack.sliderTickParent, decompositionSlider, sumCircle ]
    }, providedOptions );
    super( options );
    model.sumProperty.link( sum => {
      sumCircle.centerX = trackModelViewTransform.modelToViewX( sum );
    } );
  }
}

class NumberLineSliderTrack extends SliderTrack {
  public readonly sliderTickParent: Node;

  public constructor( valueProperty: Property<number>, private readonly trackModelViewTransform: ModelViewTransform2, providedOptions?: SliderTrackOptions ) {

    const options = combineOptions<WithRequired<SliderTrackOptions, 'size' | 'enabledRangeProperty'>>( {
      constrainValue: n => Utils.toFixedNumber( n, 0 )
    }, providedOptions );
    const trackNode = new Line( 0, 0, options.size.width, 0, {
      stroke: 'black'
    } );
    super( valueProperty, trackNode, NUMBER_LINE_RANGE, providedOptions );
    this.sliderTickParent = new Node();

    _.times( NUMBER_LINE_RANGE.getLength() + 1, i => {
      i % 10 === 0 ? this.addMajorTick( i ) : this.addMinorTick( i );
    } );
  }

  private addMajorTick( i: number ): void {
    const xPosition = this.trackModelViewTransform.modelToViewX( i );
    this.sliderTickParent.addChild( new Line( xPosition, -MAJOR_TICK_LENGTH / 2, xPosition, MAJOR_TICK_LENGTH / 2, {
      stroke: 'black'
    } ) );
    this.sliderTickParent.addChild( new Text( i, {
      font: new PhetFont( 16 ),
      centerX: xPosition,
      top: MAJOR_TICK_LENGTH / 2 + 5
    } ) );
  }

  private addMinorTick( i: number ): void {
    const xPosition = this.trackModelViewTransform.modelToViewX( i );
    this.sliderTickParent.addChild( new Line( xPosition, -MINOR_TICK_LENGTH / 2, xPosition, MINOR_TICK_LENGTH / 2, {
      stroke: 'black'
    } ) );
    this.sliderTickParent.addChild( new Text( i, {
      font: new PhetFont( 16 ),
      centerX: xPosition,
      top: MAJOR_TICK_LENGTH / 2 + 5 // Should be at the same y position as the MajorTick labels.
    } ) );
  }
}

numberPairs.register( 'NumberLineNode', NumberLineNode );