// Copyright 2024, University of Colorado Boulder
/**
 * NumberLineSlider is a slider whose track is represented as a number line.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node } from '../../../../scenery/js/imports.js';
import HSlider, { HSliderOptions } from '../../../../sun/js/HSlider.js';
import numberPairs from '../../numberPairs.js';
import { NUMBER_LINE_POINT_RADIUS } from './NumberLineNode.js';
import NumberLineSliderTrack from './NumberLineSliderTrack.js';
import ThumbNode from './ThumbNode.js';

type SelfOptions = {
  numberLineWidth: number;
  numberLineRange: Range;
};
type NumberLineSliderOptions = SelfOptions & PickRequired<HSliderOptions, 'tandem'> &
  StrictOmit<HSliderOptions, 'thumbNode' | 'trackNode' | 'enabledRangeProperty' | 'constrainValue'>;
export default class NumberLineSlider extends HSlider {

  public readonly sliderTickParent: Node;

  public constructor(
    leftAddendNumberProperty: PhetioProperty<number>,
    enabledRangeProperty: TReadOnlyProperty<Range>,
    trackModelViewTransform: ModelViewTransform2,
    tickValuesVisibleProperty: Property<boolean>,
    providedOptions: NumberLineSliderOptions
  ) {

    const trackDimension = new Dimension2( providedOptions.numberLineWidth, 0 );
    const numberLineRange = providedOptions.numberLineRange;
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
        enabledRangeProperty: enabledRangeProperty,
        numberLineRange: numberLineRange,
        tandem: providedOptions.tandem.createTandem( 'trackNode' )
      } );

    const options = optionize<NumberLineSliderOptions, SelfOptions, HSliderOptions>()( {
      thumbNode: thumbNode,
      trackNode: trackNode,
      thumbYOffset: thumbNode.height / 2 - NUMBER_LINE_POINT_RADIUS,
      constrainValue: n => Utils.toFixedNumber( n, 0 ),
      enabledRangeProperty: enabledRangeProperty,
      keyboardStep: 1,
      shiftKeyboardStep: 2
    }, providedOptions );
    super( leftAddendNumberProperty, numberLineRange, options );

    this.sliderTickParent = sliderTickParent;
  }
}


numberPairs.register( 'NumberLineSlider', NumberLineSlider );