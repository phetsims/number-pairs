// Copyright 2024, University of Colorado Boulder

/**
 * A graphical representation of a number bond which shows the sum and two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Color, Line, Node, NodeOptions } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import NumberCircle from './NumberCircle.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = {
  sumColorProperty: TReadOnlyProperty<Color>;
  leftAddendColorProperty: TReadOnlyProperty<Color>;
  rightAddendColorProperty: TReadOnlyProperty<Color>;
  sumOnTop?: boolean;
};
export type NumberBondNodeOptions = StrictOmit<NodeOptions, 'children'> & SelfOptions;

const CIRCLE_RADIUS = 20;
const HORIZONTAL_OFFSET = 1.5 * CIRCLE_RADIUS;
const VERTICAL_OFFSET = 3 * CIRCLE_RADIUS;

export default class NumberBondNode extends Node {

  public constructor( model: Pick<NumberPairsModel, 'sumProperty' | 'leftAddendProperty' | 'rightAddendProperty'>, providedOptions: NumberBondNodeOptions ) {

    const options = optionize<NumberBondNodeOptions, SelfOptions, NodeOptions>()( {
      sumOnTop: true
    }, providedOptions );

    // If the sum is on the bottom we want to flip the vertical offset
    const verticalOffset = options.sumOnTop ? VERTICAL_OFFSET : -VERTICAL_OFFSET;

    const sum = new NumberCircle( CIRCLE_RADIUS, model.sumProperty, {
      fill: options.sumColorProperty
    } );
    const leftAddend = new NumberCircle( CIRCLE_RADIUS, model.leftAddendProperty, {
      fill: options.leftAddendColorProperty,
      centerX: sum.centerX - HORIZONTAL_OFFSET,
      centerY: sum.centerY + verticalOffset
    } );
    const rightAddend = new NumberCircle( CIRCLE_RADIUS, model.rightAddendProperty, {
      fill: options.rightAddendColorProperty,
      centerX: sum.centerX + HORIZONTAL_OFFSET,
      centerY: sum.centerY + verticalOffset
    } );
    const leftLine = new Line( sum.centerX, sum.centerY, leftAddend.centerX, leftAddend.centerY, {
      stroke: 'black'
    } );
    const rightLine = new Line( sum.centerX, sum.centerY, rightAddend.centerX, rightAddend.centerY, {
      stroke: 'black'
    } );

    const superOptions = combineOptions<NodeOptions>( {
      children: [ leftLine, rightLine, sum, leftAddend, rightAddend ]
    }, options );
   super( superOptions );
  }
}

numberPairs.register( 'NumberBondNode', NumberBondNode );