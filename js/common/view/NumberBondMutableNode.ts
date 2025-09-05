// Copyright 2025, University of Colorado Boulder
/**
 * NumberBondMutableNode renders a number bond using NumberCircle nodes with values and visibility.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import numberPairs from '../../numberPairs.js';
import NumberBondNode, { NUMBER_BOND_LINE_WIDTH, NumberBondNodeOptions } from './NumberBondNode.js';
import NumberCircle from './NumberCircle.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';

export default class NumberBondMutableNode extends NumberBondNode {
  public readonly total: NumberCircle;
  public readonly leftAddend: NumberCircle;
  public readonly rightAddend: NumberCircle;

  public constructor( model: TGenericNumberPairsModel, providedOptions?: NumberBondNodeOptions ) {
    const total = new NumberCircle( model.totalProperty, model.totalVisibleProperty, {
      fill: model.totalColorProperty,
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );
    const leftAddend = new NumberCircle( model.leftAddendProperty, model.leftAddendVisibleProperty, {
      fill: model.leftAddendColorProperty,
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );
    const rightAddend = new NumberCircle( model.rightAddendProperty, model.rightAddendVisibleProperty, {
      fill: model.rightAddendColorProperty,
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );

    super( total, leftAddend, rightAddend, providedOptions );

    // Expose typed references for clients that need them
    this.total = total;
    this.leftAddend = leftAddend;
    this.rightAddend = rightAddend;
  }
}

numberPairs.register( 'NumberBondMutableNode', NumberBondMutableNode );