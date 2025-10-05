// Copyright 2025, University of Colorado Boulder
/**
 * NumberBondIconNode renders a number bond using simple Circles (icon-only style).
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import Circle from '../../../../scenery/js/nodes/Circle.js';
import numberPairs from '../../numberPairs.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import NumberBondNode, { NUMBER_BOND_LINE_WIDTH, NumberBondNodeOptions } from './NumberBondNode.js';
import NumberCircle from './NumberCircle.js';

export default class NumberBondIconNode extends NumberBondNode {
  public constructor( model: TGenericNumberPairsModel, providedOptions?: NumberBondNodeOptions ) {
    const total = new Circle( NumberCircle.RADIUS, {
      fill: model.totalColorProperty,
      stroke: 'black',
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );
    const leftAddend = new Circle( NumberCircle.RADIUS, {
      fill: model.leftAddendColorProperty,
      stroke: 'black',
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );
    const rightAddend = new Circle( NumberCircle.RADIUS, {
      fill: model.rightAddendColorProperty,
      stroke: 'black',
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );

    super( total, leftAddend, rightAddend, providedOptions );
  }
}

numberPairs.register( 'NumberBondIconNode', NumberBondIconNode );