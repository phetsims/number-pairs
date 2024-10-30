// Copyright 2024, University of Colorado Boulder

/**
 * NumberLineSliderTrack is a slider track that represents a number line.
 * It is used for both the NumberLineSlider and related icons.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import Range from '../../../../dot/js/Range.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import SliderTrack, { SliderTrackOptions } from '../../../../sun/js/SliderTrack.js';
import TProperty from '../../../../axon/js/TProperty.js';
import { Line, Node, Text } from '../../../../scenery/js/imports.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Property from '../../../../axon/js/Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import numberPairs from '../../numberPairs.js';

type TrackSelfOptions = {
  numberLineRange: Range;
  majorTickLength?: number;
  minorTickLength?: number;
};
type NumberLineSliderTrackOptions = WithRequired<SliderTrackOptions, 'size'> & TrackSelfOptions;

const MINOR_TICK_LENGTH = 16;
const MAJOR_TICK_LENGTH = 24;

export default class NumberLineSliderTrack extends SliderTrack {
  private readonly majorTickLength: number;
  private readonly minorTickLength: number;

  public constructor(
    valueProperty: TProperty<number>,
    private readonly sliderTickParent: Node,
    private readonly trackModelViewTransform: ModelViewTransform2,
    private readonly tickValuesVisibleProperty: Property<boolean>,
    providedOptions: NumberLineSliderTrackOptions ) {

    const options = optionize<NumberLineSliderTrackOptions, TrackSelfOptions, SliderTrackOptions>()( {
      constrainValue: n => Utils.toFixedNumber( n, 0 ),
      majorTickLength: MAJOR_TICK_LENGTH,
      minorTickLength: MINOR_TICK_LENGTH
    }, providedOptions );
    const trackNode = new Line( 0, 0, options.size.width, 0, {
      stroke: 'black'
    } );
    super( valueProperty, trackNode, options.numberLineRange, providedOptions );

    this.majorTickLength = options.majorTickLength;
    this.minorTickLength = options.minorTickLength;

    const numberLineRangeLength = options.numberLineRange.getLength();
    _.times( numberLineRangeLength + 1, i => {
      i % 10 === 0 || i === numberLineRangeLength ? this.addMajorTick( i ) : this.addMinorTick( i );
    } );
  }

  private addMajorTick( i: number ): void {
    const xPosition = this.trackModelViewTransform.modelToViewX( i );
    this.sliderTickParent.addChild( new Line( xPosition, -this.majorTickLength / 2, xPosition, this.majorTickLength / 2, {
      stroke: 'black'
    } ) );
    this.sliderTickParent.addChild( new Text( i, {
      font: new PhetFont( 16 ),
      centerX: xPosition,
      top: this.majorTickLength / 2 + 5,
      visibleProperty: this.tickValuesVisibleProperty
    } ) );
  }

  private addMinorTick( i: number ): void {
    const xPosition = this.trackModelViewTransform.modelToViewX( i );
    this.sliderTickParent.addChild( new Line( xPosition, -this.minorTickLength / 2, xPosition, this.minorTickLength / 2, {
      stroke: 'black'
    } ) );
    this.sliderTickParent.addChild( new Text( i, {
      font: new PhetFont( 16 ),
      centerX: xPosition,
      top: this.majorTickLength / 2 + 5, // Should be at the same y position as the MajorTick labels.
      visibleProperty: this.tickValuesVisibleProperty
    } ) );
  }
}

numberPairs.register( 'NumberLineSliderTrack', NumberLineSliderTrack );