// Copyright 2025, University of Colorado Boulder

/**
 * An icon version of the bar model that displays simplified rectangles without numbers.
 * Used in radio buttons and preference controls.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Rectangle, { RectangleOptions } from '../../../../scenery/js/nodes/Rectangle.js';
import Text, { TextOptions } from '../../../../scenery/js/nodes/Text.js';
import numberPairs from '../../numberPairs.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import BarModelNode, { BarModelNodeOptions, DEFAULT_BAR_MODEL_DIMENSIONS } from './BarModelNode.js';

type SelfOptions = {
  totalRectangleOptions?: RectangleOptions;
  leftAddendRectangleOptions?: RectangleOptions;
  rightAddendRectangleOptions?: RectangleOptions;
  showQuestionMarks?: boolean;
};

export type BarModelIconNodeOptions = SelfOptions & BarModelNodeOptions;

export default class BarModelIconNode extends BarModelNode {

  public constructor(
    model: TGenericNumberPairsModel,
    providedOptions?: BarModelIconNodeOptions ) {

    const options = optionize<BarModelIconNodeOptions, SelfOptions, BarModelNodeOptions>()( {
      dimensions: DEFAULT_BAR_MODEL_DIMENSIONS,
      spacing: DEFAULT_BAR_MODEL_DIMENSIONS.spacing / 2,
      resize: true, // to allow for proper scaling in buttons
      totalRectangleOptions: {
        fill: model.totalColorProperty,
        stroke: 'black'
      },
      leftAddendRectangleOptions: {
        fill: model.leftAddendColorProperty,
        stroke: 'black'
      },
      rightAddendRectangleOptions: {
        fill: model.rightAddendColorProperty,
        stroke: 'black'
      },
      showQuestionMarks: false
    }, providedOptions );

    const dimensions = options.dimensions;
    const textOptions = {
      font: new PhetFont( dimensions.numberFontSize )
    };

    const totalDimension = new Dimension2( dimensions.totalWidth, dimensions.barHeight );
    const leftAddendDimension = new Dimension2( 0, dimensions.barHeight );
    const rightAddendDimension = new Dimension2( 0, dimensions.barHeight );

    // Total
    const totalText = new Text( model.totalProperty.value,
      combineOptions<TextOptions>( { visible: model.totalVisibleProperty.value }, textOptions ) );
    const totalQuestionMark = new Text( '?',
      combineOptions<TextOptions>( { visible: options.showQuestionMarks && !model.totalVisibleProperty.value }, textOptions ) );
    const totalRectangleOptions = combineOptions<RectangleOptions>( {
      rectSize: totalDimension,
      lineWidth: dimensions.lineWidth,
      children: [ totalText, totalQuestionMark ]
    }, options.totalRectangleOptions );
    const totalRectangle = new Rectangle( totalRectangleOptions );
    totalText.center = totalRectangle.center;
    totalQuestionMark.center = totalRectangle.center;

    // Left addend
    const leftAddendText = new Text( model.leftAddendProperty.value,
      combineOptions<TextOptions>( { visible: model.leftAddendVisibleProperty.value }, textOptions ) );
    const leftAddendQuestionMark = new Text( '?',
      combineOptions<TextOptions>( { visible: options.showQuestionMarks && !model.leftAddendVisibleProperty.value }, textOptions ) );
    const leftAddendRectangleOptions = combineOptions<RectangleOptions>( {
      rectSize: leftAddendDimension,
      lineWidth: dimensions.lineWidth,
      children: [ leftAddendText, leftAddendQuestionMark ]
    }, options.leftAddendRectangleOptions );
    const leftAddendRectangle = new Rectangle( leftAddendRectangleOptions );
    leftAddendText.center = leftAddendRectangle.center;
    leftAddendQuestionMark.center = leftAddendRectangle.center;

    // Right addend
    const rightAddendText = new Text( model.rightAddendProperty.value,
      combineOptions<TextOptions>( { visible: model.rightAddendVisibleProperty.value }, textOptions ) );
    const rightAddendQuestionMark = new Text( '?',
      combineOptions<TextOptions>( { visible: options.showQuestionMarks && !model.rightAddendVisibleProperty.value }, textOptions ) );
    const rightAddendRectangleOptions = combineOptions<RectangleOptions>( {
      rectSize: rightAddendDimension,
      lineWidth: dimensions.lineWidth,
      children: [ rightAddendText, rightAddendQuestionMark ]
    }, options.rightAddendRectangleOptions );
    const rightAddendRectangle = new Rectangle( rightAddendRectangleOptions );


    super( model, totalRectangle, leftAddendRectangle, rightAddendRectangle, options );

    // Center the texts and question marks
    totalText.center = totalRectangle.parentToLocalBounds( totalRectangle.bounds ).center;
    totalQuestionMark.center = totalRectangle.parentToLocalBounds( totalRectangle.bounds ).center;
    leftAddendText.center = leftAddendRectangle.parentToLocalBounds( leftAddendRectangle.bounds ).center;
    leftAddendQuestionMark.center = leftAddendRectangle.parentToLocalBounds( leftAddendRectangle.bounds ).center;
    rightAddendText.center = rightAddendRectangle.parentToLocalBounds( rightAddendRectangle.bounds ).center;
    rightAddendQuestionMark.center = rightAddendRectangle.parentToLocalBounds( rightAddendRectangle.bounds ).center;
  }
}

numberPairs.register( 'BarModelIconNode', BarModelIconNode );
