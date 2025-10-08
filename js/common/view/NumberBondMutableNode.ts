// Copyright 2025, University of Colorado Boulder
/**
 * NumberBondMutableNode renders a number bond using NumberCircle nodes with values and visibility.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import numberPairs from '../../numberPairs.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import NumberBondNode, { NORMAL_DIMENSION, NUMBER_BOND_LINE_WIDTH, NumberBondDimensions, NumberBondNodeOptions } from './NumberBondNode.js';
import NumberCircle from './NumberCircle.js';

type SelfOptions = {
  dimensions?: NumberBondDimensions;
};

export type NumberBondMutableNodeOptions = SelfOptions & NumberBondNodeOptions;

export default class NumberBondMutableNode extends NumberBondNode {
  public readonly total: NumberCircle;
  public readonly leftAddend: NumberCircle;
  public readonly rightAddend: NumberCircle;

  public constructor( model: TGenericNumberPairsModel, providedOptions?: NumberBondMutableNodeOptions ) {
    const options = optionize<NumberBondMutableNodeOptions, SelfOptions, NumberBondNodeOptions>()( {
      dimensions: NORMAL_DIMENSION
    }, providedOptions );

    const total = new NumberCircle( model.totalProperty, model.totalVisibleProperty, {
      radius: options.dimensions.circleRadius,
      fontSize: options.dimensions.fontSize,
      fill: model.totalColorProperty,
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );
    const leftAddend = new NumberCircle( model.leftAddendProperty, model.leftAddendVisibleProperty, {
      radius: options.dimensions.circleRadius,
      fontSize: options.dimensions.fontSize,
      fill: model.leftAddendColorProperty,
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );
    const rightAddend = new NumberCircle( model.rightAddendProperty, model.rightAddendVisibleProperty, {
      radius: options.dimensions.circleRadius,
      fontSize: options.dimensions.fontSize,
      fill: model.rightAddendColorProperty,
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );

    super( total, leftAddend, rightAddend, options.dimensions, options );

    // Expose typed references for clients that need them
    this.total = total;
    this.leftAddend = leftAddend;
    this.rightAddend = rightAddend;
  }
}

numberPairs.register( 'NumberBondMutableNode', NumberBondMutableNode );
