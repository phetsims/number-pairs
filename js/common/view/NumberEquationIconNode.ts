// Copyright 2025, University of Colorado Boulder

/**
 * NumberEquationIconNode renders a number equation using simple Rectangles (icon-only style).
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
import { createIconTextConstraint, IconModel } from './IconHelper.js';
import NumberEquationNode, { GAME_ICON_EQUATION_DIMENSIONS, NumberEquationNodeOptions } from './NumberEquationNode.js';

type SelfOptions = {
  squareDimension?: number;
  numberFontSize?: number;
  totalRectangleOptions?: RectangleOptions;
  leftAddendRectangleOptions?: RectangleOptions;
  rightAddendRectangleOptions?: RectangleOptions;
  showQuestionMarks?: boolean;
};

export type NumberEquationIconNodeOptions = SelfOptions & NumberEquationNodeOptions;

export default class NumberEquationIconNode extends NumberEquationNode {

  public constructor( model: IconModel, providedOptions?: NumberEquationIconNodeOptions ) {

    const options = optionize<NumberEquationIconNodeOptions, SelfOptions, NumberEquationNodeOptions>()( {
      squareDimension: GAME_ICON_EQUATION_DIMENSIONS.squareDimension,
      numberFontSize: GAME_ICON_EQUATION_DIMENSIONS.numberFontSize,
      symbolFontSize: GAME_ICON_EQUATION_DIMENSIONS.symbolFontSize,
      spacing: GAME_ICON_EQUATION_DIMENSIONS.spacing,
      resize: true, // to allow for proper scaling in buttons
      totalRectangleOptions: {
        fill: model.totalColorProperty,
        stroke: model.totalColorProperty.value.darkerColor(),
        lineWidth: GAME_ICON_EQUATION_DIMENSIONS.lineWidth
      },
      leftAddendRectangleOptions: {
        fill: model.leftAddendColorProperty,
        stroke: model.leftAddendColorProperty.value.darkerColor(),
        lineWidth: GAME_ICON_EQUATION_DIMENSIONS.lineWidth
      },
      rightAddendRectangleOptions: {
        fill: model.rightAddendColorProperty,
        stroke: model.rightAddendColorProperty.value.darkerColor(),
        lineWidth: GAME_ICON_EQUATION_DIMENSIONS.lineWidth
      },
      showQuestionMarks: false
    }, providedOptions );

    const squareDimension = new Dimension2( options.squareDimension, options.squareDimension );
    const textOptions = {
      font: new PhetFont( options.numberFontSize )
    };

    // Total
    const totalText = new Text( model.totalProperty.value === null ? '?' : model.totalProperty.value,
      combineOptions<TextOptions>( { visible: model.totalVisibleProperty.value }, textOptions ) );
    const totalRectangleOptions = combineOptions<RectangleOptions>( {
      rectSize: squareDimension,
      cornerRadius: 3,
      children: [ totalText ]
    }, options.totalRectangleOptions );
    const totalRectangle = new Rectangle( totalRectangleOptions );

    // Left addend
    const leftAddendText = new Text( model.leftAddendProperty.value === null ? '?' : model.leftAddendProperty.value,
      combineOptions<TextOptions>( { visible: model.leftAddendVisibleProperty.value }, textOptions ) );
    const leftAddendRectangleOptions = combineOptions<RectangleOptions>( {
      rectSize: squareDimension,
      cornerRadius: 3,
      children: [ leftAddendText ]
    }, options.leftAddendRectangleOptions );
    const leftAddendRectangle = new Rectangle( leftAddendRectangleOptions );

    // Right addend
    const rightAddendText = new Text( model.rightAddendProperty.value === null ? '?' : model.rightAddendProperty.value,
      combineOptions<TextOptions>( { visible: model.rightAddendVisibleProperty.value }, textOptions ) );
    const rightAddendRectangleOptions = combineOptions<RectangleOptions>( {
      rectSize: squareDimension,
      cornerRadius: 3,
      children: [ rightAddendText ]
    }, options.rightAddendRectangleOptions );
    const rightAddendRectangle = new Rectangle( rightAddendRectangleOptions );

    super( totalRectangle, leftAddendRectangle, rightAddendRectangle, options );
    createIconTextConstraint( this, totalRectangle, totalText, leftAddendRectangle,
      leftAddendText, rightAddendRectangle, rightAddendText );
  }
}

numberPairs.register( 'NumberEquationIconNode', NumberEquationIconNode );

