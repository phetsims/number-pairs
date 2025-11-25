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
import { createIconTextConstraint, IconModel } from './IconHelper.js';
import NumberBondNode, { DEFAULT_BOND_DIMENSION, NumberBondDimensions, NumberBondNodeOptions } from './NumberBondNode.js';

type SelfOptions = {
  dimensions?: NumberBondDimensions;
  totalCircleOptions?: CircleOptions;
  leftAddendCircleOptions?: CircleOptions;
  rightAddendCircleOptions?: CircleOptions;
};

export type NumberBondIconNodeOptions = SelfOptions & NumberBondNodeOptions;

export default class NumberBondIconNode extends NumberBondNode {
  public constructor( model: IconModel, providedOptions?: NumberBondIconNodeOptions ) {
    const options = optionize<NumberBondIconNodeOptions, SelfOptions, NumberBondNodeOptions>()( {
      dimensions: DEFAULT_BOND_DIMENSION,
      totalCircleOptions: {
        fill: model.totalColorProperty,
        stroke: 'black',
        lineWidth: DEFAULT_BOND_DIMENSION.lineWidth
      },
      leftAddendCircleOptions: {
        fill: model.leftAddendColorProperty,
        stroke: 'black',
        lineWidth: DEFAULT_BOND_DIMENSION.lineWidth
      },
      rightAddendCircleOptions: {
        fill: model.rightAddendColorProperty,
        stroke: 'black',
        lineWidth: DEFAULT_BOND_DIMENSION.lineWidth
      }
    }, providedOptions );

    const textOptions = {
      font: new PhetFont( options.dimensions.fontSize )
    };

    // Total
    const totalText = new Text( model.totalProperty.value === null ? '?' : model.totalProperty.value,
      combineOptions<TextOptions>( { visible: model.totalVisibleProperty.value }, textOptions ) );
    const totalCircleOptions = combineOptions<CircleOptions>( { children: [ totalText ] }, options.totalCircleOptions );
    const total = new Circle( options.dimensions.circleRadius, totalCircleOptions );
    totalText.center = total.center;

    // Left addend
    const leftAddendText = new Text( model.leftAddendProperty.value === null ? '?' : model.leftAddendProperty.value,
      combineOptions<TextOptions>( { visible: model.leftAddendVisibleProperty.value }, textOptions ) );
    const leftAddendCircleOptions = combineOptions<CircleOptions>( {
      children: [ leftAddendText ]
    }, options.leftAddendCircleOptions );
    const leftAddend = new Circle( options.dimensions.circleRadius, leftAddendCircleOptions );
    leftAddendText.center = leftAddend.center;

    // right addend
    const rightAddendText = new Text( model.rightAddendProperty.value === null ? '?' : model.rightAddendProperty.value,
      combineOptions<TextOptions>( { visible: model.rightAddendVisibleProperty.value }, textOptions ) );
    const rightAddendCircleOptions = combineOptions<CircleOptions>( {
      children: [ rightAddendText ]
    }, options.rightAddendCircleOptions );
    const rightAddend = new Circle( options.dimensions.circleRadius, rightAddendCircleOptions );
    rightAddendText.center = rightAddend.center;

    super( total, leftAddend, rightAddend, options );

    createIconTextConstraint( this, total, totalText, leftAddend, leftAddendText, rightAddend, rightAddendText );
  }
}

numberPairs.register( 'NumberBondIconNode', NumberBondIconNode );
