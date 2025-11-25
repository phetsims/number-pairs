// Copyright 2024-2025, University of Colorado Boulder

/**
 * NumberEquationNode displays an equation that represents the decomposition of a total into two addends,
 * without any surrounding accordion UI. This is a base class that accepts pre-constructed rectangle nodes.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import numberPairs from '../../numberPairs.js';
import { GAME_DIMENSION } from './NumberBondNode.js';

type EquationDimensions = {
  squareDimension: number;
  symbolFontSize: number;
  numberFontSize: number;
  lineWidth: number;
  spacing: number;
};
export const DEFAULT_EQUATION_DIMENSIONS: EquationDimensions = {
  squareDimension: 35,
  symbolFontSize: 24,
  numberFontSize: 24,
  lineWidth: 1,
  spacing: 10
};

export const GAME_EQUATION_DIMENSIONS: EquationDimensions = {
  squareDimension: 66,
  symbolFontSize: 46.2,
  numberFontSize: GAME_DIMENSION.fontSize,
  lineWidth: 1,
  spacing: DEFAULT_EQUATION_DIMENSIONS.spacing
};

const ICON_SCALE = 0.42;
export const GAME_ICON_EQUATION_DIMENSIONS: EquationDimensions = {
  squareDimension: GAME_EQUATION_DIMENSIONS.squareDimension * ICON_SCALE,
  symbolFontSize: GAME_EQUATION_DIMENSIONS.symbolFontSize * ICON_SCALE,
  numberFontSize: GAME_EQUATION_DIMENSIONS.numberFontSize * ICON_SCALE,
  lineWidth: 0.5,
  spacing: GAME_EQUATION_DIMENSIONS.spacing * ICON_SCALE
};

type SelfOptions = {
  addendsOnRight?: boolean;
  symbolFontSize?: number;
  spacing?: number;
  resize?: boolean;
};
export type NumberEquationNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class NumberEquationNode extends Node {
  public readonly totalSquare: Rectangle;
  public readonly leftAddendSquare: Rectangle;
  public readonly rightAddendSquare: Rectangle;

  public constructor(
    totalSquare: Rectangle,
    leftAddendSquare: Rectangle,
    rightAddendSquare: Rectangle,
    providedOptions?: NumberEquationNodeOptions ) {

    const options = optionize<NumberEquationNodeOptions, SelfOptions, NodeOptions>()( {
      addendsOnRight: true,
      symbolFontSize: 24,
      spacing: 10,
      resize: false
    }, providedOptions );

    const equalSign = new Text( '=', { font: new PhetFont( options.symbolFontSize ) } );
    const plusSign = new Text( '+', { font: new PhetFont( options.symbolFontSize ) } );

    const contentChildren = options.addendsOnRight ? [ totalSquare, equalSign, leftAddendSquare, plusSign, rightAddendSquare ]
                                                   : [ leftAddendSquare, plusSign, rightAddendSquare, equalSign, totalSquare ];
    const contentNode = new HBox( {
      children: contentChildren,
      spacing: options.spacing,
      resize: options.resize
    } );

    options.children = [ contentNode ];
    super( options );

    // Expose references so callers (e.g., LevelNode) can adjust stroke/lineDash
    this.totalSquare = totalSquare;
    this.leftAddendSquare = leftAddendSquare;
    this.rightAddendSquare = rightAddendSquare;
  }
}

numberPairs.register( 'NumberEquationNode', NumberEquationNode );
