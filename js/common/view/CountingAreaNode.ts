// Copyright 2024, University of Colorado Boulder

/**
 * Create the counting area where counting representations are placed and can be manipulated by the user.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Node, NodeOptions, Rectangle, TColor } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = {
  backgroundColorProperty: TReadOnlyProperty<TColor>;
};

type CountingAreaNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export const COUNTING_AREA_LINE_WIDTH = 1.5;
export default class CountingAreaNode extends Node {

  public constructor( countingAreaBounds: Bounds2, providedOptions: CountingAreaNodeOptions ) {

    const options = optionize<CountingAreaNodeOptions, SelfOptions, NodeOptions>()( {}, providedOptions );
    const backgroundRectangle = new Rectangle( countingAreaBounds, {
      fill: options.backgroundColorProperty.value,
      stroke: 'black',
      lineWidth: COUNTING_AREA_LINE_WIDTH,
      cornerRadius: NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS
    } );

    options.backgroundColorProperty.link( backgroundColor => {
      backgroundRectangle.fill = backgroundColor;
    } );

    const superOptions = combineOptions<NodeOptions>( {
      children: [ backgroundRectangle ]
    }, options );
    super( superOptions );
  }
}

numberPairs.register( 'CountingAreaNode', CountingAreaNode );