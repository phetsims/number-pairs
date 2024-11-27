// Copyright 2024, University of Colorado Boulder

/**
 * A graphical representation of a number bond which shows the total and two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { Line, Node, NodeOptions, TColor } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberCircle, { CIRCLE_RADIUS } from './NumberCircle.js';

type SelfOptions = {
  totalColorProperty: TReadOnlyProperty<TColor>;
  leftAddendColorProperty: TReadOnlyProperty<TColor>;
  rightAddendColorProperty: TReadOnlyProperty<TColor>;
  totalOnTop?: boolean;
};
export type NumberBondNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

const HORIZONTAL_OFFSET = 1.5 * CIRCLE_RADIUS;
const VERTICAL_OFFSET = 3 * CIRCLE_RADIUS;

export default class NumberBondNode extends Node {

  public constructor( model: NumberPairsModel, providedOptions: NumberBondNodeOptions ) {

    const options = optionize<NumberBondNodeOptions, SelfOptions, NodeOptions>()( {
      totalOnTop: true
    }, providedOptions );

    // If the total is on the bottom we want to flip the vertical offset
    const verticalOffset = options.totalOnTop ? VERTICAL_OFFSET : -VERTICAL_OFFSET;

    const total = new NumberCircle( model.totalProperty, model.totalVisibleProperty, {
      fill: options.totalColorProperty.value
    } );
    options.totalColorProperty.link( totalColor => {
      total.fill = totalColor;
    } );

    const leftAddend = new NumberCircle( model.leftAddendProperty, model.leftAddendVisibleProperty, {
      fill: options.leftAddendColorProperty.value,
      centerX: total.centerX - HORIZONTAL_OFFSET,
      centerY: total.centerY + verticalOffset
    } );
    options.leftAddendColorProperty.link( leftAddendColor => {
      leftAddend.fill = leftAddendColor;
    } );

    const rightAddend = new NumberCircle( model.rightAddendProperty, model.rightAddendVisibleProperty, {
      fill: options.rightAddendColorProperty.value,
      centerX: total.centerX + HORIZONTAL_OFFSET,
      centerY: total.centerY + verticalOffset
    } );
    options.rightAddendColorProperty.link( rightAddendColor => {
      rightAddend.fill = rightAddendColor;
    } );

    const leftLine = new Line( total.centerX, total.centerY, leftAddend.centerX, leftAddend.centerY, {
      stroke: 'black'
    } );
    const rightLine = new Line( total.centerX, total.centerY, rightAddend.centerX, rightAddend.centerY, {
      stroke: 'black'
    } );

    options.children = [ leftLine, rightLine, total, leftAddend, rightAddend ];
    super( options );
  }
}

numberPairs.register( 'NumberBondNode', NumberBondNode );