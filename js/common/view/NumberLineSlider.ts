// Copyright 2024-2025, University of Colorado Boulder
/**
 * NumberLineSlider is a slider whose track is represented as a number line.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import HSlider, { HSliderOptions } from '../../../../sun/js/HSlider.js';
import numberPairs from '../../numberPairs.js';
import NumberLineContextResponse from './description/NumberLineContextResponse.js';
import NumberLineNode from './NumberLineNode.js';
import NumberLineSliderTrack from './NumberLineSliderTrack.js';
import ThumbNode from './ThumbNode.js';

type SelfOptions = {
  numberLineWidth: number;
  numberLineRange: Range;
  interactive: boolean; // We use the slider in non-interactive contexts like the GameScreen.
};
type NumberLineSliderOptions = SelfOptions & PickRequired<HSliderOptions, 'tandem'> &
  StrictOmit<HSliderOptions, 'thumbNode' | 'trackNode' | 'enabledRangeProperty' | 'constrainValue'>;
export default class NumberLineSlider extends HSlider {

  public readonly sliderTickParent: Node;
  public readonly thumbNode: ThumbNode;

  public constructor(
    leftAddendProperty: PhetioProperty<number>,
    rightAddendProperty: TReadOnlyProperty<number>,
    totalProperty: TReadOnlyProperty<number>,
    enabledRangeProperty: TReadOnlyProperty<Range>,
    trackModelViewTransform: ModelViewTransform2,
    tickValuesVisibleProperty: Property<boolean>,
    numberLineAddendValuesVisibleProperty: Property<boolean>,
    providedOptions: NumberLineSliderOptions
  ) {

    const trackDimension = new Dimension2( providedOptions.numberLineWidth, 0 );
    const numberLineRange = providedOptions.numberLineRange;
    const thumbNode = new ThumbNode( {
      tandem: providedOptions.tandem.createTandem( 'thumbNode' ),
      phetioVisiblePropertyInstrumented: providedOptions.interactive
    } );

    const sliderTickParent = new Node();
    const trackNode = new NumberLineSliderTrack(
      leftAddendProperty,
      sliderTickParent,
      trackModelViewTransform,
      tickValuesVisibleProperty,
      {
        constrainValue: n => toFixedNumber( n, 0 ),
        size: trackDimension,
        enabledRangeProperty: enabledRangeProperty,
        numberLineRange: numberLineRange,
        phetioVisiblePropertyInstrumented: false,
        pickable: false,
        tandem: providedOptions.tandem.createTandem( 'trackNode' )
      } );

    const numberLineContextResponse = new NumberLineContextResponse( {
      leftAddendProperty: leftAddendProperty,
      rightAddendProperty: rightAddendProperty,
      totalProperty: totalProperty,
      numberLineAddendValuesVisibleProperty: numberLineAddendValuesVisibleProperty
    } );

    const options = optionize<NumberLineSliderOptions, SelfOptions, HSliderOptions>()( {
      thumbNode: thumbNode,
      trackNode: trackNode,
      thumbYOffset: thumbNode.height / 2 - NumberLineNode.POINT_RADIUS,
      constrainValue: n => toFixedNumber( n, 0 ),
      enabledRangeProperty: enabledRangeProperty,
      keyboardStep: 1,
      shiftKeyboardStep: 2,
      pageKeyboardStep: 3,
      valueChangeSoundGeneratorOptions: {
        numberOfMiddleThresholds: numberLineRange.getLength()
      },
      phetioVisiblePropertyInstrumented: false,
      phetioEnabledPropertyInstrumented: providedOptions.interactive,

      // Hide a11y view items for the non-interactive slider, see https://github.com/phetsims/number-pairs/issues/336
      pdomVisible: providedOptions.interactive,
      drag: () => {
        numberLineContextResponse.sliderDragged( this );
      }
    }, providedOptions );
    super( leftAddendProperty, numberLineRange, options );

    this.sliderTickParent = sliderTickParent;
    this.thumbNode = thumbNode;
  }
}


numberPairs.register( 'NumberLineSlider', NumberLineSlider );