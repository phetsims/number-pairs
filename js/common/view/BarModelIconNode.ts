// Copyright 2025, University of Colorado Boulder

/**
 * An icon version of the bar model that displays simplified rectangles without numbers.
 * Used in radio buttons and preference controls.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Rectangle, { RectangleOptions } from '../../../../scenery/js/nodes/Rectangle.js';
import Text, { TextOptions } from '../../../../scenery/js/nodes/Text.js';
import numberPairs from '../../numberPairs.js';
import BarModelNode, { BarModelNodeOptions, ICON_BAR_MODEL_DIMENSIONS } from './BarModelNode.js';
import { createIconTextConstraint, IconModel } from './IconHelper.js';
import Node from '../../../../scenery/js/nodes/Node.js';

type SelfOptions = {
  totalRectangleOptions?: RectangleOptions;
  leftAddendRectangleOptions?: RectangleOptions;
  rightAddendRectangleOptions?: RectangleOptions;
};

export type BarModelIconNodeOptions = SelfOptions & BarModelNodeOptions;

export default class BarModelIconNode extends BarModelNode {

  public constructor(
    model: IconModel,
    providedOptions?: BarModelIconNodeOptions ) {

    const options = optionize<BarModelIconNodeOptions, SelfOptions, BarModelNodeOptions>()( {
      dimensions: ICON_BAR_MODEL_DIMENSIONS,
      spacing: ICON_BAR_MODEL_DIMENSIONS.spacing,
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
      }
    }, providedOptions );

    const dimensions = options.dimensions;
    const textOptions = {
      font: new PhetFont( dimensions.numberFontSize )
    };

    // Define rectangle dimensions based on model values
    affirm( model.totalProperty.value !== null, 'Total value must be defined to create BarModelIconNode.' );
    affirm( model.leftAddendProperty.value !== null, 'Left addend value must be defined to create BarModelIconNode.' );
    const totalDimension = new Dimension2( dimensions.totalWidth, dimensions.barHeight );
    const leftAddendDimension = new Dimension2( model.leftAddendProperty.value / model.totalProperty.value * dimensions.totalWidth,
      dimensions.barHeight );
    const rightAddendDimension = new Dimension2( totalDimension.width - leftAddendDimension.width, dimensions.barHeight );

    // Total
    const totalText = new Text( model.totalProperty.value,
      combineOptions<TextOptions>( { visible: model.totalVisibleProperty.value }, textOptions ) );
    const totalRectangleOptions = combineOptions<RectangleOptions>( {
      rectSize: totalDimension,
      lineWidth: dimensions.lineWidth,
      children: [ totalText ]
    }, options.totalRectangleOptions );
    const totalRectangle = new Rectangle( totalRectangleOptions );

    // Left addend
    const leftAddendText = new Text( model.leftAddendProperty.value,
      combineOptions<TextOptions>( { visible: model.leftAddendVisibleProperty.value }, textOptions ) );
    const leftAddendRectangleOptions = combineOptions<RectangleOptions>( {
      rectSize: leftAddendDimension,
      lineWidth: dimensions.lineWidth,
      children: [ leftAddendText ]
    }, options.leftAddendRectangleOptions );
    const leftAddendRectangle = new Rectangle( leftAddendRectangleOptions );

    // Right addend
    const rightAddendText = new Text( model.rightAddendProperty.value === null ? '?' : model.rightAddendProperty.value,
      combineOptions<TextOptions>( { visible: model.rightAddendVisibleProperty.value }, textOptions ) );
    const rightAddendRectangleOptions = combineOptions<RectangleOptions>( {
      rectSize: rightAddendDimension,
      lineWidth: dimensions.lineWidth,
      children: [ rightAddendText ]
    }, options.rightAddendRectangleOptions );
    const rightAddendRectangle = new Rectangle( rightAddendRectangleOptions );

    super( totalRectangle, new Node( { children: [ leftAddendRectangle, rightAddendRectangle ] } ), options );

    /**
     * Set the layout for the rectangles
     */
    ManualConstraint.create( this, [ leftAddendRectangle, rightAddendRectangle ], ( leftAddendRectangleProxy, rightAddendRectangleProxy ) => {

      // Use the rectWidth to calculate because the text bounds may protrude from the rectangle.
      rightAddendRectangleProxy.left = leftAddendRectangleProxy.visible ? leftAddendRectangleProxy.left + leftAddendRectangle.rectWidth : totalRectangle.left;
    } );
    createIconTextConstraint( this, totalRectangle, totalText, leftAddendRectangle,
      leftAddendText, rightAddendRectangle, rightAddendText );
  }
}

numberPairs.register( 'BarModelIconNode', BarModelIconNode );
