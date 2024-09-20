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
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Utils from '../../../../dot/js/Utils.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ThumbNode, { RADIUS } from './ThumbNode.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import SliderTrack from '../../../../sun/js/SliderTrack.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';

type NumberLineNodeOptions = NodeOptions;

const MINOR_TICK_LENGTH = 5;
const MAJOR_TICK_LENGTH = 10;
export default class NumberLineNode extends Node {
  private readonly sliderTickParent;
  private readonly sliderTrack: SliderTrack;
  private trackModelViewTransform: ModelViewTransform2;

  public constructor( model: SumModel, numberLineWidth: number, providedOptions: NumberLineNodeOptions ) {

    const trackDimension = new Dimension2( numberLineWidth, 1 );
    const thumbNode = new ThumbNode();
    const trackModelViewTransform = ModelViewTransform2.createSinglePointScaleMapping(
      Vector2.ZERO,
      Vector2.ZERO,
      trackDimension.width / model.leftAddendNumberProperty.range.getLength()
    );
    const trackLine = new Line( 0, 0, trackDimension.width, 0, {
      stroke: 'black'
    } );
    const sliderTrack = new SliderTrack( model.leftAddendNumberProperty, trackLine, model.leftAddendNumberProperty.range, {
      constrainValue: n => Utils.toFixedNumber( n, 0 ),
      size: trackDimension
    } );
    const sliderTickParent = new Node( {
      left: sliderTrack.left
    } );
    const decompositionSlider = new HSlider( model.leftAddendNumberProperty, model.leftAddendNumberProperty.range, {
      thumbNode: thumbNode,
      trackNode: sliderTrack,
      thumbYOffset: thumbNode.height / 2 - RADIUS,
      constrainValue: n => Utils.toFixedNumber( n, 0 )
    } );

    const sumCircle = new Circle( RADIUS, {
      fill: NumberPairsColors.numberLineSumColorProperty,
      stroke: 'black'
    } );

    const options = optionize<NumberLineNodeOptions, EmptySelfOptions, NodeOptions>()( {
      children: [ sliderTickParent, decompositionSlider, sumCircle ]
    }, providedOptions );
    super( options );

    this.sliderTrack = sliderTrack;
    this.sliderTickParent = sliderTickParent;
    this.trackModelViewTransform = trackModelViewTransform;
    _.times( model.sumProperty.rangeProperty.value.getLength() + 1, i => {
      i % 10 === 0 ? this.addMajorTick( i ) : this.addMinorTick( i );
    } );

    model.sumProperty.link( sum => {
      sumCircle.centerX = this.trackModelViewTransform.modelToViewX( sum );
    } );
  }

  private addMajorTick( i: number ): void {
    const xPosition = this.trackModelViewTransform.modelToViewX( i );
    this.sliderTickParent.addChild( new Line( xPosition, 0, xPosition, MAJOR_TICK_LENGTH, {
      stroke: 'black'
    } ) );
    this.sliderTickParent.addChild( new Text( i, {
      font: new PhetFont( 16 ),
      centerX: xPosition,
      top: MAJOR_TICK_LENGTH + 5
    } ) );

  }

  private addMinorTick( i: number ): void {
    const xPosition = this.trackModelViewTransform.modelToViewX( i );
    this.sliderTickParent.addChild( new Line( xPosition, 0, xPosition, MINOR_TICK_LENGTH, {
      stroke: 'black'
    } ) );
    this.sliderTickParent.addChild( new Text( i, {
      font: new PhetFont( 16 ),
      centerX: xPosition,
      top: MAJOR_TICK_LENGTH + 5 // Should be at the same y position as the MajorTick labels.
    } ) );
  }
}

numberPairs.register( 'NumberLineNode', NumberLineNode );