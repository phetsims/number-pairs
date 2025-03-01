// Copyright 2024-2025, University of Colorado Boulder

/**
 * A graphical representation of a number bond which shows the total and two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberCircle from './NumberCircle.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = {
  totalOnTopProperty?: TReadOnlyProperty<boolean> | null;
};
export type NumberBondNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

const HORIZONTAL_OFFSET = 1.4 * NumberCircle.RADIUS;
const VERTICAL_OFFSET = 2.25 * NumberCircle.RADIUS;
const NUMBER_BOND_LINE_WIDTH = 1.5;

export default class NumberBondNode extends Node {

  public constructor( model: NumberPairsModel, providedOptions: NumberBondNodeOptions ) {

    const options = optionize<NumberBondNodeOptions, SelfOptions, NodeOptions>()( {
      totalOnTopProperty: null
    }, providedOptions );

    const total = new NumberCircle( model.totalProperty, model.totalVisibleProperty, {
      fill: model.totalColorProperty,
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );


    const leftAddend = new NumberCircle( model.leftAddendProperty, model.leftAddendVisibleProperty, {
      fill: model.leftAddendColorProperty,
      centerX: total.centerX - HORIZONTAL_OFFSET,
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );

    const rightAddend = new NumberCircle( model.rightAddendProperty, model.rightAddendVisibleProperty, {
      fill: model.rightAddendColorProperty,
      centerX: total.centerX + HORIZONTAL_OFFSET,
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );

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
        const verticalOffset = totalOnTop ? VERTICAL_OFFSET : -VERTICAL_OFFSET;
        leftAddend.centerY = total.centerY + verticalOffset;
        rightAddend.centerY = total.centerY + verticalOffset;
        leftLine.setLine( total.centerX, total.centerY, leftAddend.centerX, leftAddend.centerY );
        rightLine.setLine( total.centerX, total.centerY, rightAddend.centerX, rightAddend.centerY );
      } );
    }
    else {
      leftAddend.centerY = total.centerY + VERTICAL_OFFSET;
      rightAddend.centerY = total.centerY + VERTICAL_OFFSET;
      leftLine.setLine( total.centerX, total.centerY, leftAddend.centerX, leftAddend.centerY );
      rightLine.setLine( total.centerX, total.centerY, rightAddend.centerX, rightAddend.centerY );
    }

    options.children = [ leftLine, rightLine, total, leftAddend, rightAddend ];
    super( options );
  }
}

numberPairs.register( 'NumberBondNode', NumberBondNode );