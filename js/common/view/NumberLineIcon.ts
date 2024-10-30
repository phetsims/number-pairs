// Copyright 2024, University of Colorado Boulder

/**
 * NumberLineIcon creates a track in order to render a number line icon based on specified options.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Property from '../../../../axon/js/Property.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import NumberLineSliderTrack from './NumberLineSliderTrack.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import optionize from '../../../../phet-core/js/optionize.js';
import EllipticalArrowNode, { EllipticalArrowNodeOptions } from './EllipticalArrowNode.js';
import NumberPairsColors from '../NumberPairsColors.js';

type SelfOptions = {
  showRightArrow?: boolean;
  showLeftArrow?: boolean;
};
type NumberLineIconOptions = SelfOptions & NodeOptions;
const ICON_RANGE = new Range( 0, 3 );
export default class NumberLineIcon extends Node {

  public constructor( iconWidth: number, iconNumberLineValue: number, providedOptions: NumberLineIconOptions ) {
    const options = optionize<NumberLineIconOptions, SelfOptions, NodeOptions>()( {
      showRightArrow: false,
      showLeftArrow: false
    }, providedOptions );

    const valueProperty = new NumberProperty( iconNumberLineValue, {
      validValues: [ iconNumberLineValue ]
    } );
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleMapping(
      Vector2.ZERO,
      Vector2.ZERO,
      iconWidth / ICON_RANGE.getLength() );

    super( options );
    const arrowNodeOptions: EllipticalArrowNodeOptions = {
      fill: null,
      arrowTailLineWidth: 1.5,
      ellipseYRadius: 10,
      pointRadius: 1,
      arrowHeadHeight: 5,
      arrowHeadBaseWidth: 6
    };
    if ( options.showRightArrow ) {
      arrowNodeOptions.fill = NumberPairsColors.numberLineRightAddendColorProperty;
      this.addChild( new EllipticalArrowNode(
        new Property( iconNumberLineValue ), new Property( ICON_RANGE.max ), modelViewTransform, arrowNodeOptions ) );
    }

    if ( options.showLeftArrow ) {
      arrowNodeOptions.fill = NumberPairsColors.numberLineLeftAddendColorProperty;
      this.addChild( new EllipticalArrowNode(
        new Property( ICON_RANGE.min ), new Property( iconNumberLineValue ), modelViewTransform, arrowNodeOptions ) );
    }

    const numberLine = new NumberLineSliderTrack( valueProperty, this, modelViewTransform, new Property( false ), {
      size: new Dimension2( iconWidth, 0 ),
      numberLineRange: ICON_RANGE,
      majorTickLength: 14,
      minorTickLength: 9,
      tandem: Tandem.OPT_OUT
    } );
    this.addChild( numberLine );


  }
}

numberPairs.register( 'NumberLineIcon', NumberLineIcon );