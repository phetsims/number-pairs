// Copyright 2024-2025, University of Colorado Boulder

/**
 * A graphical representation of a number bond which shows the total and two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import NumberCircle from './NumberCircle.js';

type SelfOptions = {
  totalOnTopProperty?: TReadOnlyProperty<boolean> | null;
};
export type NumberBondNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export const NUMBER_BOND_LINE_WIDTH = 1.5;

export type NumberBondDimensions = {
  circleRadius: number;
  fontSize: number;
  horizontalOffset: number;
  verticalOffset: number;
};

export const NORMAL_DIMENSION: NumberBondDimensions = {
  circleRadius: NumberCircle.RADIUS,
  fontSize: NumberCircle.DEFAULT_FONT_SIZE,
  horizontalOffset: 1.4 * NumberCircle.RADIUS,
  verticalOffset: 2.25 * NumberCircle.RADIUS
};

// In the game, things are a bit larger. Do not just scale overall, since that affects line widths.
const GAME_SCALE = 1.25;

export const GAME_DIMENSION: NumberBondDimensions = {
  circleRadius: NORMAL_DIMENSION.circleRadius * GAME_SCALE,
  fontSize: NORMAL_DIMENSION.fontSize * GAME_SCALE,
  horizontalOffset: NORMAL_DIMENSION.horizontalOffset * GAME_SCALE,
  verticalOffset: NORMAL_DIMENSION.verticalOffset * GAME_SCALE
};

export default abstract class NumberBondNode extends Node {

  public readonly leftLine: Line;
  public readonly rightLine: Line;

  protected constructor( total: Node, leftAddend: Node, rightAddend: Node, dimensions: NumberBondDimensions, providedOptions?: NumberBondNodeOptions ) {

    const options = optionize<NumberBondNodeOptions, SelfOptions, NodeOptions>()( {
      totalOnTopProperty: null
    }, providedOptions );

    // Initial horizontal placement relative to total
    leftAddend.centerX = total.centerX - dimensions.horizontalOffset;
    rightAddend.centerX = total.centerX + dimensions.horizontalOffset;

    // Connecting lines
    const leftLine = new Line( total.centerX, total.centerY, leftAddend.centerX, leftAddend.centerY, {
      stroke: 'black',
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );
    const rightLine = new Line( total.centerX, total.centerY, rightAddend.centerX, rightAddend.centerY, {
      stroke: 'black',
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );

    // If the total is on the bottom we want to flip the vertical offset
    if ( options.totalOnTopProperty ) {
      options.totalOnTopProperty.link( totalOnTop => {
        const verticalOffset = totalOnTop ? dimensions.verticalOffset : -dimensions.verticalOffset;
        leftAddend.centerY = total.centerY + verticalOffset;
        rightAddend.centerY = total.centerY + verticalOffset;
        leftLine.setLine( total.centerX, total.centerY, leftAddend.centerX, leftAddend.centerY );
        rightLine.setLine( total.centerX, total.centerY, rightAddend.centerX, rightAddend.centerY );
      } );
    }
    else {
      leftAddend.centerY = total.centerY + dimensions.verticalOffset;
      rightAddend.centerY = total.centerY + dimensions.verticalOffset;
      leftLine.setLine( total.centerX, total.centerY, leftAddend.centerX, leftAddend.centerY );
      rightLine.setLine( total.centerX, total.centerY, rightAddend.centerX, rightAddend.centerY );
    }

    options.children = [ leftLine, rightLine, total, leftAddend, rightAddend ];
    super( options );

    this.leftLine = leftLine;
    this.rightLine = rightLine;
  }
}

numberPairs.register( 'NumberBondNode', NumberBondNode );
