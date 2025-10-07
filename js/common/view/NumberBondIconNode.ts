// Copyright 2025, University of Colorado Boulder
/**
 * NumberBondIconNode renders a number bond using simple Circles (icon-only style).
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import numberPairs from '../../numberPairs.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import NumberBondNode, { NORMAL_DIMENSION, NUMBER_BOND_LINE_WIDTH, NumberBondDimensions, NumberBondNodeOptions } from './NumberBondNode.js';

type SelfOptions = {
  dimensions?: NumberBondDimensions;
};

export type NumberBondIconNodeOptions = SelfOptions & NumberBondNodeOptions;

export default class NumberBondIconNode extends NumberBondNode {
  public constructor( model: TGenericNumberPairsModel, providedOptions?: NumberBondIconNodeOptions ) {
    const options = optionize<NumberBondIconNodeOptions, SelfOptions, NumberBondNodeOptions>()( {
      dimensions: NORMAL_DIMENSION
    }, providedOptions );

    const { dimensions, ...numberBondOptions } = options;

    const total = new Circle( dimensions.circleRadius, {
      fill: model.totalColorProperty,
      stroke: 'black',
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );
    const leftAddend = new Circle( dimensions.circleRadius, {
      fill: model.leftAddendColorProperty,
      stroke: 'black',
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );
    const rightAddend = new Circle( dimensions.circleRadius, {
      fill: model.rightAddendColorProperty,
      stroke: 'black',
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );

    super( total, leftAddend, rightAddend, dimensions, numberBondOptions as NumberBondNodeOptions );
  }
}

numberPairs.register( 'NumberBondIconNode', NumberBondIconNode );
