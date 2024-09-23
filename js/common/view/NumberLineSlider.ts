// Copyright 2024, University of Colorado Boulder
/**
 * NumberLineSlider is a slider whose track is represented as a number line.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import HSlider from '../../../../sun/js/HSlider.js';
import numberPairs from '../../numberPairs.js';
import Range from '../../../../dot/js/Range.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import SliderTrack, { SliderTrackOptions } from '../../../../sun/js/SliderTrack.js';
import { Line, Node, Text } from '../../../../scenery/js/imports.js';
import Property from '../../../../axon/js/Property.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import ThumbNode, { RADIUS } from '../../sum/view/ThumbNode.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { SliderOptions } from '../../../../sun/js/Slider.js';

const MINOR_TICK_LENGTH = 16;
const MAJOR_TICK_LENGTH = 24;
const NUMBER_LINE_RANGE = new Range( NumberPairsConstants.TEN_SCENE_RANGE.min, NumberPairsConstants.TWENTY_SCENE_RANGE.max );

type SelfOptions = {
  numberLineWidth: number;
};
type NumberLineSliderOptions = SliderOptions & SelfOptions;
export default class NumberLineSlider extends HSlider {

  public readonly sliderTickParent: Node;

  public constructor(
    leftAddendNumberProperty: NumberProperty,
    sumNumberProperty: Property<number>,
    trackModelViewTransform: ModelViewTransform2,
    providedOptions: NumberLineSliderOptions
  ) {

    const trackDimension = new Dimension2( providedOptions.numberLineWidth, 0 );
    const sliderEnabledRangeProperty = new DerivedProperty( [ sumNumberProperty ], sum => {
      return new Range( NUMBER_LINE_RANGE.min, sum );
    } );
    const thumbNode = new ThumbNode();

    const sliderTickParent = new Node();
    const sliderTrack = new NumberLineSliderTrack( leftAddendNumberProperty, sliderTickParent, trackModelViewTransform, {
      constrainValue: n => Utils.toFixedNumber( n, 0 ),
      size: trackDimension,
      enabledRangeProperty: sliderEnabledRangeProperty
    } );

    const options = combineOptions<NumberLineSliderOptions>( {
      thumbNode: thumbNode,
      trackNode: sliderTrack,
      thumbYOffset: thumbNode.height / 2 - RADIUS,
      constrainValue: n => Utils.toFixedNumber( n, 0 ),
      enabledRangeProperty: sliderEnabledRangeProperty
    }, providedOptions );
    super( leftAddendNumberProperty, NUMBER_LINE_RANGE, options );

    this.sliderTickParent = sliderTickParent;
  }
}

class NumberLineSliderTrack extends SliderTrack {

  public constructor( valueProperty: Property<number>, private readonly sliderTickParent: Node, private readonly trackModelViewTransform: ModelViewTransform2, providedOptions?: SliderTrackOptions ) {

    const options = combineOptions<WithRequired<SliderTrackOptions, 'size' | 'enabledRangeProperty'>>( {
      constrainValue: n => Utils.toFixedNumber( n, 0 )
    }, providedOptions );
    const trackNode = new Line( 0, 0, options.size.width, 0, {
      stroke: 'black'
    } );
    super( valueProperty, trackNode, NUMBER_LINE_RANGE, providedOptions );

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

numberPairs.register( 'NumberLineSlider', NumberLineSlider );