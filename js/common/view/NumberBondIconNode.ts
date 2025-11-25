// Copyright 2025, University of Colorado Boulder
/**
 * NumberBondIconNode renders a number bond using simple Circles (icon-only style).
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Circle, { CircleOptions } from '../../../../scenery/js/nodes/Circle.js';
import Text, { TextOptions } from '../../../../scenery/js/nodes/Text.js';
import numberPairs from '../../numberPairs.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import NumberBondNode, { DEFAULT_BOND_DIMENSION, NumberBondDimensions, NumberBondNodeOptions } from './NumberBondNode.js';

type SelfOptions = {
  dimensions?: NumberBondDimensions;
  totalCircleOptions?: CircleOptions;
  leftAddendCircleOptions?: CircleOptions;
  rightAddendCircleOptions?: CircleOptions;
  showQuestionMarks?: boolean;
};

export type NumberBondIconNodeOptions = SelfOptions & NumberBondNodeOptions;

export default class NumberBondIconNode extends NumberBondNode {
  public constructor( model: TGenericNumberPairsModel, providedOptions?: NumberBondIconNodeOptions ) {
    const options = optionize<NumberBondIconNodeOptions, SelfOptions, NumberBondNodeOptions>()( {
      dimensions: DEFAULT_BOND_DIMENSION,
      totalCircleOptions: {
        fill: model.totalColorProperty,
        stroke: 'black'
      },
      leftAddendCircleOptions: {
        fill: model.leftAddendColorProperty,
        stroke: 'black'
      },
      rightAddendCircleOptions: {
        fill: model.rightAddendColorProperty,
        stroke: 'black'
      },
      showQuestionMarks: false
    }, providedOptions );

    const textOptions = {
      font: new PhetFont( options.dimensions.fontSize )
    };

    // Total
    const totalText = new Text( model.totalProperty.value,
      combineOptions<TextOptions>( { visible: model.totalVisibleProperty.value }, textOptions ) );
    const totalQuestionMark = new Text( '?',
      combineOptions<TextOptions>( { visible: options.showQuestionMarks && !model.totalVisibleProperty.value }, textOptions ) );
    const totalCircleOptions = combineOptions<CircleOptions>( { children: [ totalText, totalQuestionMark ] }, options.totalCircleOptions );
    const total = new Circle( options.dimensions.circleRadius, totalCircleOptions );
    totalText.center = total.center;
    totalQuestionMark.center = total.center;

    // Left addend
    const leftAddendText = new Text( model.leftAddendProperty.value,
      combineOptions<TextOptions>( { visible: model.leftAddendVisibleProperty.value }, textOptions ) );
    const leftAddendQuestionMark = new Text( '?',
      combineOptions<TextOptions>( { visible: options.showQuestionMarks && !model.leftAddendVisibleProperty.value }, textOptions ) );
    const leftAddendCircleOptions = combineOptions<CircleOptions>( {
      children: [ leftAddendText, leftAddendQuestionMark ]
    }, options.leftAddendCircleOptions );
    const leftAddend = new Circle( options.dimensions.circleRadius, leftAddendCircleOptions );
    leftAddendText.center = leftAddend.center;
    leftAddendQuestionMark.center = leftAddend.center;

    // right addend
    const rightAddendText = new Text( model.rightAddendProperty.value,
      combineOptions<TextOptions>( { visible: model.rightAddendVisibleProperty.value }, textOptions ) );
    const rightAddendQuestionMark = new Text( '?',
      combineOptions<TextOptions>( { visible: options.showQuestionMarks && !model.rightAddendVisibleProperty.value }, textOptions ) );
    const rightAddendCircleOptions = combineOptions<CircleOptions>( {
      children: [ rightAddendText, rightAddendQuestionMark ]
    }, options.rightAddendCircleOptions );
    const rightAddend = new Circle( options.dimensions.circleRadius, rightAddendCircleOptions );
    rightAddendText.center = rightAddend.center;
    rightAddendQuestionMark.center = rightAddend.center;

    super( total, leftAddend, rightAddend, options.dimensions, options );
  }
}

numberPairs.register( 'NumberBondIconNode', NumberBondIconNode );
