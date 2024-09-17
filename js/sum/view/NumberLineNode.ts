// Copyright 2024, University of Colorado Boulder
/**
 * Contains a slider that is decorated to show the decomposition of a number.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import Slider from '../../../../sun/js/Slider.js';
import SumModel from '../model/SumModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Utils from '../../../../dot/js/Utils.js';

type NumberLineNodeOptions = NodeOptions;

const MAJOR_TICK_VALUES = [ 0, 10, 20 ];
export default class NumberLineNode extends Node {

  public constructor( model: SumModel, numberLineWidth: number, providedOptions: NumberLineNodeOptions ) {

    const trackSize = new Dimension2( numberLineWidth, 2 );
    const decompositionSlider = new Slider( model.leftAddendNumberProperty, model.leftAddendNumberProperty.range, {
      trackSize: trackSize,
      constrainValue: n => Utils.toFixedNumber( n, 0 )
    } );

    _.times( model.sumProperty.rangeProperty.value.getLength() + 1, i => {
      MAJOR_TICK_VALUES.includes( i ) ? decompositionSlider.addMajorTick( i ) : decompositionSlider.addMinorTick( i );
    } );

    const options = optionize<NumberLineNodeOptions, EmptySelfOptions, NodeOptions>()( {
      children: [ decompositionSlider ]
    }, providedOptions );
    super( options );
  }
}

numberPairs.register( 'NumberLineNode', NumberLineNode );