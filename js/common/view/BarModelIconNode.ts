// Copyright 2024-2025, University of Colorado Boulder

/**
 * An icon version of the bar model that displays simplified rectangles without numbers.
 * Used in radio buttons and preference controls.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import numberPairs from '../../numberPairs.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import BarModelNode, { BarModelDimensions, BarModelNodeOptions, ICON_BAR_MODEL_DIMENSIONS } from './BarModelNode.js';

type SelfOptions = {
  dimensions?: BarModelDimensions;
};

export type BarModelIconNodeOptions = SelfOptions & StrictOmit<BarModelNodeOptions, 'dimensions'>;

export default class BarModelIconNode extends BarModelNode {

  public constructor(
    model: TGenericNumberPairsModel,
    providedOptions?: BarModelIconNodeOptions ) {

    const options = optionize<BarModelIconNodeOptions, SelfOptions, BarModelNodeOptions>()( {
      dimensions: ICON_BAR_MODEL_DIMENSIONS
    }, providedOptions );

    const dimensions = options.dimensions;

    const totalDimension = new Dimension2( dimensions.totalWidth, dimensions.barHeight );
    const leftAddendDimension = new Dimension2( 0, dimensions.barHeight );
    const rightAddendDimension = new Dimension2( 0, dimensions.barHeight );

    const totalRectangle = new Rectangle( {
      rectSize: totalDimension,
      fill: model.totalColorProperty,
      stroke: 'black',
      lineWidth: dimensions.lineWidth
    } );

    const leftAddendRectangle = new Rectangle( {
      rectSize: leftAddendDimension,
      fill: model.leftAddendColorProperty,
      stroke: 'black',
      lineWidth: dimensions.lineWidth
    } );

    const rightAddendRectangle = new Rectangle( {
      rectSize: rightAddendDimension,
      fill: model.rightAddendColorProperty,
      stroke: 'black',
      lineWidth: dimensions.lineWidth
    } );

    super( model, totalRectangle, leftAddendRectangle, rightAddendRectangle, options );
  }
}

numberPairs.register( 'BarModelIconNode', BarModelIconNode );
