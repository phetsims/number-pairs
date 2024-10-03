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
import SliderTrack, { SliderTrackOptions } from '../../../../sun/js/SliderTrack.js';
import { Line, Node, Text } from '../../../../scenery/js/imports.js';
import Property from '../../../../axon/js/Property.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import ThumbNode from './ThumbNode.js';
import { SliderOptions } from '../../../../sun/js/Slider.js';
import { NUMBER_LINE_POINT_RADIUS } from './NumberLineNode.js';
import TProperty from '../../../../axon/js/TProperty.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

const MINOR_TICK_LENGTH = 16;
const MAJOR_TICK_LENGTH = 24;

type SelfOptions = {
  numberLineWidth: number;
  numberLineRange: Range;
};
type NumberLineSliderOptions = WithRequired<SliderOptions, 'tandem'> & SelfOptions;
export default class NumberLineSlider extends HSlider {

  public readonly sliderTickParent: Node;

  public constructor(
    leftAddendNumberProperty: PhetioProperty<number>,
    totalNumberProperty: TReadOnlyProperty<number>,
    trackModelViewTransform: ModelViewTransform2,
    tickValuesVisibleProperty: Property<boolean>,
    providedOptions: NumberLineSliderOptions
  ) {

    const trackDimension = new Dimension2( providedOptions.numberLineWidth, 0 );
    const numberLineRange = providedOptions.numberLineRange;
    const sliderEnabledRangeProperty = new DerivedProperty( [ totalNumberProperty ], total => {
      return new Range( numberLineRange.min, total );
    } );
    const thumbNode = new ThumbNode( providedOptions.tandem );

    const sliderTickParent = new Node();
    const trackNode = new NumberLineSliderTrack(
      leftAddendNumberProperty,
      sliderTickParent,
      trackModelViewTransform,
      tickValuesVisibleProperty,
      {
        constrainValue: n => Utils.toFixedNumber( n, 0 ),
        size: trackDimension,
        enabledRangeProperty: sliderEnabledRangeProperty,
        numberLineRange: numberLineRange,
        tandem: providedOptions.tandem.createTandem( 'trackNode' )
      } );

    const options = combineOptions<NumberLineSliderOptions>( {
      thumbNode: thumbNode,
      trackNode: trackNode,
      thumbYOffset: thumbNode.height / 2 - NUMBER_LINE_POINT_RADIUS,
      constrainValue: n => Utils.toFixedNumber( n, 0 ),
      enabledRangeProperty: sliderEnabledRangeProperty
    }, providedOptions );
    super( leftAddendNumberProperty, numberLineRange, options );

    this.sliderTickParent = sliderTickParent;
  }
}

type TrackSelfOptions = {
  numberLineRange: Range;
};
type NumberLineSliderTrackOptions = WithRequired<SliderTrackOptions, 'size' | 'enabledRangeProperty'> & TrackSelfOptions;

class NumberLineSliderTrack extends SliderTrack {

  public constructor(
    valueProperty: TProperty<number>,
    private readonly sliderTickParent: Node,
    private readonly trackModelViewTransform: ModelViewTransform2,
    private readonly tickValuesVisibleProperty: Property<boolean>,
    providedOptions?: NumberLineSliderTrackOptions ) {

    const options = optionize<NumberLineSliderTrackOptions, TrackSelfOptions, SliderTrackOptions>()( {
      constrainValue: n => Utils.toFixedNumber( n, 0 )
    }, providedOptions );
    const trackNode = new Line( 0, 0, options.size.width, 0, {
      stroke: 'black'
    } );
    super( valueProperty, trackNode, options.numberLineRange, providedOptions );

    _.times( options.numberLineRange.getLength() + 1, i => {
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
      top: MAJOR_TICK_LENGTH / 2 + 5,
      visibleProperty: this.tickValuesVisibleProperty
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
      top: MAJOR_TICK_LENGTH / 2 + 5, // Should be at the same y position as the MajorTick labels.
      visibleProperty: this.tickValuesVisibleProperty
    } ) );
  }
}

numberPairs.register( 'NumberLineSlider', NumberLineSlider );