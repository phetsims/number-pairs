// Copyright 2024, University of Colorado Boulder
/**
 * Contains a slider that is decorated to show the decomposition of a number.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import { Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import SumModel from '../model/SumModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Utils from '../../../../dot/js/Utils.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';

type NumberLineNodeOptions = NodeOptions;

const MAJOR_TICK_VALUES = [ 0, 10, 20 ];
export default class NumberLineNode extends Node {

  public constructor( model: SumModel, numberLineWidth: number, providedOptions: NumberLineNodeOptions ) {

    const trackSize = new Dimension2( numberLineWidth, 1 );
    const decompositionSlider = new HSlider( model.leftAddendNumberProperty, model.leftAddendNumberProperty.range, {
      trackSize: trackSize,
      constrainValue: n => Utils.toFixedNumber( n, 0 ),
      setTickInitialPoint: ( trackBounds, tickLength ) => new Vector2( 0, trackBounds.centerY + tickLength / 2 ),
      positionLabel: ( label, tickBounds ) => {
        label.centerX = tickBounds.centerX;
        label.top = tickBounds.bottom + 10;
      }
    } );

    _.times( model.sumProperty.rangeProperty.value.getLength() + 1, i => {
      const label = new Text( i, { font: new PhetFont( 12 ) } );
      MAJOR_TICK_VALUES.includes( i ) ? decompositionSlider.addMajorTick( i, label ) : decompositionSlider.addMinorTick( i, label );
    } );

    const options = optionize<NumberLineNodeOptions, EmptySelfOptions, NodeOptions>()( {
      children: [ decompositionSlider ]
    }, providedOptions );
    super( options );
  }
}

numberPairs.register( 'NumberLineNode', NumberLineNode );