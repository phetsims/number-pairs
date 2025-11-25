// Copyright 2024-2025, University of Colorado Boulder

/**
 * A graphical representation of a number bond which shows the total and two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Line, { LineOptions } from '../../../../scenery/js/nodes/Line.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import NumberCircle from './NumberCircle.js';

type SelfOptions = {
  totalOnTopProperty?: TReadOnlyProperty<boolean> | null;
  rightLineOptions?: LineOptions;
  leftLineOptions?: LineOptions;
};
export type NumberBondNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export const NUMBER_BOND_LINE_WIDTH = 1.5;

export type NumberBondDimensions = {
  circleRadius: number;
  fontSize: number;
  horizontalOffset: number;
  verticalOffset: number;
};

export const DEFAULT_BOND_DIMENSION: NumberBondDimensions = {
  circleRadius: NumberCircle.RADIUS,
  fontSize: NumberCircle.DEFAULT_FONT_SIZE,
  horizontalOffset: 1.4 * NumberCircle.RADIUS,
  verticalOffset: 2.25 * NumberCircle.RADIUS
};

const ICON_SCALE = 0.5;
export const GAME_ICON_BOND_DIMENSION: NumberBondDimensions = {
  circleRadius: DEFAULT_BOND_DIMENSION.circleRadius * ICON_SCALE,
  fontSize: DEFAULT_BOND_DIMENSION.fontSize * ICON_SCALE,
  horizontalOffset: DEFAULT_BOND_DIMENSION.horizontalOffset * ICON_SCALE,
  verticalOffset: DEFAULT_BOND_DIMENSION.verticalOffset * ICON_SCALE
};

// In the game, things are a bit larger. Do not just scale overall, since that affects line widths.
const GAME_SCALE = 1.25;

export const GAME_DIMENSION: NumberBondDimensions = {
  circleRadius: DEFAULT_BOND_DIMENSION.circleRadius * GAME_SCALE,
  fontSize: DEFAULT_BOND_DIMENSION.fontSize * GAME_SCALE,
  horizontalOffset: DEFAULT_BOND_DIMENSION.horizontalOffset * GAME_SCALE,
  verticalOffset: DEFAULT_BOND_DIMENSION.verticalOffset * GAME_SCALE
};

export default abstract class NumberBondNode extends Node {

  protected readonly leftLine: Line;
  protected readonly rightLine: Line;

  protected constructor( totalNode: Node, leftAddendNode: Node, rightAddendNode: Node, dimensions: NumberBondDimensions, providedOptions?: NumberBondNodeOptions ) {

    const options = optionize<NumberBondNodeOptions, SelfOptions, NodeOptions>()( {
      totalOnTopProperty: null,
      rightLineOptions: {},
      leftLineOptions: {}
    }, providedOptions );

    // Initial horizontal placement relative to total
    leftAddendNode.centerX = totalNode.centerX - dimensions.horizontalOffset;
    rightAddendNode.centerX = totalNode.centerX + dimensions.horizontalOffset;

    // Connecting lines
    const leftLine = new Line( totalNode.centerX, totalNode.centerY, leftAddendNode.centerX, leftAddendNode.centerY,
      combineOptions<LineOptions>( {
      stroke: 'black',
      lineWidth: NUMBER_BOND_LINE_WIDTH
    }, options.leftLineOptions ) );
    const rightLine = new Line( totalNode.centerX, totalNode.centerY, rightAddendNode.centerX, rightAddendNode.centerY,
      combineOptions<LineOptions>( {
      stroke: 'black',
      lineWidth: NUMBER_BOND_LINE_WIDTH
    }, options.rightLineOptions ) );

    // If the total is on the bottom we want to flip the vertical offset
    if ( options.totalOnTopProperty ) {
      options.totalOnTopProperty.link( totalOnTop => {
        const verticalOffset = totalOnTop ? dimensions.verticalOffset : -dimensions.verticalOffset;
        leftAddendNode.centerY = totalNode.centerY + verticalOffset;
        rightAddendNode.centerY = totalNode.centerY + verticalOffset;
        leftLine.setLine( totalNode.centerX, totalNode.centerY, leftAddendNode.centerX, leftAddendNode.centerY );
        rightLine.setLine( totalNode.centerX, totalNode.centerY, rightAddendNode.centerX, rightAddendNode.centerY );
      } );
    }
    else {
      leftAddendNode.centerY = totalNode.centerY + dimensions.verticalOffset;
      rightAddendNode.centerY = totalNode.centerY + dimensions.verticalOffset;
      leftLine.setLine( totalNode.centerX, totalNode.centerY, leftAddendNode.centerX, leftAddendNode.centerY );
      rightLine.setLine( totalNode.centerX, totalNode.centerY, rightAddendNode.centerX, rightAddendNode.centerY );
    }

    options.children = [ leftLine, rightLine, totalNode, leftAddendNode, rightAddendNode ];
    super( options );

    this.leftLine = leftLine;
    this.rightLine = rightLine;
  }
}

numberPairs.register( 'NumberBondNode', NumberBondNode );
