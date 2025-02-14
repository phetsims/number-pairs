// Copyright 2024-2025, University of Colorado Boulder

/**
 * NumberLineIcon creates a track in order to render a number line icon based on specified options.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Color from '../../../../scenery/js/util/Color.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsColors from '../NumberPairsColors.js';
import CurvedArrowNode, { EllipticalArrowNodeOptions } from './CurvedArrowNode.js';
import NumberLineSliderTrack from './NumberLineSliderTrack.js';
import NumberRectangle, { NumberSquareOptions } from './NumberRectangle.js';

type SelfOptions = {
  showRightArrow?: boolean;
  showLeftArrow?: boolean;
  showHighlight?: boolean;
};
type NumberLineIconOptions = SelfOptions & StrictOmit<NodeOptions, 'children' | 'excludeInvisibleChildrenFromBounds'>;
const ICON_RANGE = new Range( 0, 3 );
const NUMBER_SQUARE_DIMENSION = 7;
const MAJOR_TICK_LENGTH = 14;
const MINOR_TICK_LENGTH = 9;
const NUMBER_SQUARE_MARGIN = 2;
const ARROW_NODE_OPTIONS: EllipticalArrowNodeOptions = {
  fill: null,
  arrowTailLineWidth: 1.5,
  curveYRadius: 10,
  pointRadius: 1,
  arrowHeadHeight: 5,
  arrowHeadBaseWidth: 6
};
const NUMBER_SQUARE_OPTIONS: NumberSquareOptions = {
  numberFontSize: 5,
  cornerRadius: 2
};
export default class NumberLineIcon extends Node {

  public constructor( iconWidth: number, iconNumberLineValue: number, providedOptions: NumberLineIconOptions ) {
    const options = optionize<NumberLineIconOptions, SelfOptions, NodeOptions>()( {
      showRightArrow: false,
      showLeftArrow: false,
      showHighlight: false,
      excludeInvisibleChildrenFromBounds: true,
      pickable: false // This is an icon so it should not be pickable
    }, providedOptions );

    const valueProperty = new NumberProperty( iconNumberLineValue, {
      validValues: [ iconNumberLineValue ]
    } );
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleMapping(
      Vector2.ZERO,
      Vector2.ZERO,
      iconWidth / ICON_RANGE.getLength() );

    super( options );

    /**
     * Create the number line decorators.
     */
    if ( options.showRightArrow ) {
      ARROW_NODE_OPTIONS.fill = NumberPairsColors.numberLineRightAddendColorProperty;
      const startingValueProperty = new Property( iconNumberLineValue );
      const rightAddendValueProperty = new Property( ICON_RANGE.max - iconNumberLineValue );
      const arrowNode = new CurvedArrowNode(
        startingValueProperty, new Property( ICON_RANGE.max ), modelViewTransform, ARROW_NODE_OPTIONS );
      this.addChild( arrowNode );

      const numberSquareOptions = combineOptions<NumberSquareOptions>( {
        centerX: arrowNode.centerX,
        bottom: arrowNode.top - NUMBER_SQUARE_MARGIN,
        fill: NumberPairsColors.numberLineRightAddendColorProperty
      }, NUMBER_SQUARE_OPTIONS );
      this.addChild( new NumberRectangle( new Dimension2( NUMBER_SQUARE_DIMENSION, NUMBER_SQUARE_DIMENSION ), rightAddendValueProperty, numberSquareOptions ) );
    }

    if ( options.showLeftArrow ) {
      ARROW_NODE_OPTIONS.fill = NumberPairsColors.numberLineLeftAddendColorProperty;
      const arrowNode = new CurvedArrowNode(
        new Property( ICON_RANGE.min ), new Property( iconNumberLineValue ), modelViewTransform, ARROW_NODE_OPTIONS );
      this.addChild( arrowNode );

      const numberSquareOptions = combineOptions<NumberSquareOptions>( {
        centerX: arrowNode.centerX,
        bottom: arrowNode.top - NUMBER_SQUARE_MARGIN,
        fill: NumberPairsColors.numberLineLeftAddendColorProperty
      }, NUMBER_SQUARE_OPTIONS );
      this.addChild( new NumberRectangle( new Dimension2( NUMBER_SQUARE_DIMENSION, NUMBER_SQUARE_DIMENSION ), new Property( iconNumberLineValue ), numberSquareOptions ) );

    }

    // We only want to show the left addend number square on the bottom of the number line if there is no
    // arrow for the left addend.
    if ( options.showRightArrow && !options.showLeftArrow ) {
      const numberSquareOptions = combineOptions<NumberSquareOptions>( {
        centerX: modelViewTransform.modelToViewX( iconNumberLineValue ),
        fill: NumberPairsColors.numberLineLeftAddendColorProperty,
        top: MINOR_TICK_LENGTH / 2 + NUMBER_SQUARE_MARGIN
      }, NUMBER_SQUARE_OPTIONS );
      this.addChild( new NumberRectangle( new Dimension2( NUMBER_SQUARE_DIMENSION, NUMBER_SQUARE_DIMENSION ), new Property( iconNumberLineValue ), numberSquareOptions ) );
    }

    if ( options.showHighlight ) {
      const highlightHeight = 4;
      const valueX = modelViewTransform.modelToViewX( iconNumberLineValue );
      const highlightRectangle = new Rectangle( 0, -highlightHeight / 2, valueX, highlightHeight, {
        fill: NumberPairsColors.numberLineSumColorProperty
      } );
      this.addChild( highlightRectangle );
    }

    const numberLine = new NumberLineSliderTrack( valueProperty, this, modelViewTransform, new Property( false ), {
      size: new Dimension2( iconWidth, 0 ),
      numberLineRange: ICON_RANGE,
      majorTickLength: MAJOR_TICK_LENGTH,
      minorTickLength: MINOR_TICK_LENGTH,
      tandem: Tandem.OPT_OUT
    } );
    this.addChild( numberLine );

    if ( options.showHighlight ) {
      const valuePoint = new Circle( 3, {
        fill: NumberPairsColors.numberLineSumColorProperty,
        stroke: Color.BLACK,
        lineWidth: 0.5,
        centerX: modelViewTransform.modelToViewX( iconNumberLineValue )
      } );
      this.addChild( valuePoint );
    }
  }
}

numberPairs.register( 'NumberLineIcon', NumberLineIcon );