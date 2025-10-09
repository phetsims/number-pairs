// Copyright 2024-2025, University of Colorado Boulder

/**
 * A mutable bar model that displays the total and two addends as proportional rectangles with numbers.
 * Used in interactive screens where users can change values.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import numberPairs from '../../numberPairs.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import BarModelNode, { BarModelDimensions, BarModelNodeOptions, DEFAULT_BAR_MODEL_DIMENSIONS } from './BarModelNode.js';
import NumberRectangle from './NumberRectangle.js';

type SelfOptions = {

  // If provided, the value to display for the total, left addend, and right addend. If not provided, the model properties will be used.
  displayTotalNumberProperty?: TReadOnlyProperty<number> | null;

  // If provided, the value to display for the left addend. If not provided, the model property will be used.
  displayLeftAddendNumberProperty?: TReadOnlyProperty<number> | null;

  // If provided, the value to display for the right addend. If not provided, the model property will be used.
  displayRightAddendNumberProperty?: TReadOnlyProperty<number> | null;

  dimensions?: BarModelDimensions;
};

export type BarModelMutableNodeOptions = SelfOptions & StrictOmit<BarModelNodeOptions, 'dimensions'>;

export default class BarModelMutableNode extends BarModelNode {

  public constructor(
    model: TGenericNumberPairsModel,
    providedOptions?: BarModelMutableNodeOptions ) {

    const options = optionize<BarModelMutableNodeOptions, SelfOptions, BarModelNodeOptions>()( {
      displayTotalNumberProperty: null,
      displayLeftAddendNumberProperty: null,
      displayRightAddendNumberProperty: null,
      dimensions: DEFAULT_BAR_MODEL_DIMENSIONS
    }, providedOptions );

    const dimensions = options.dimensions;
    const totalWidth = dimensions.totalWidth;

    // Use the provided display properties, or fall back to the model properties
    const displayTotalNumberProperty = options.displayTotalNumberProperty || model.totalProperty;
    const displayLeftAddendNumberProperty = options.displayLeftAddendNumberProperty || model.leftAddendProperty;
    const displayRightAddendNumberProperty = options.displayRightAddendNumberProperty || model.rightAddendProperty;

    const totalDimension = new Dimension2( totalWidth, dimensions.barHeight );
    const leftAddendDimension = new Dimension2( 0, dimensions.barHeight );
    const rightAddendDimension = new Dimension2( 0, dimensions.barHeight );

    const totalRectangle = new NumberRectangle( totalDimension, displayTotalNumberProperty, {
      fill: model.totalColorProperty,
      stroke: 'black',
      cornerRadius: 0,
      lineWidth: dimensions.lineWidth,
      numberVisibleProperty: model.totalVisibleProperty,
      numberFontSize: dimensions.numberFontSize
    } );

    const leftAddendRectangle = new NumberRectangle( leftAddendDimension, displayLeftAddendNumberProperty, {
      fill: model.leftAddendColorProperty,
      stroke: 'black',
      cornerRadius: 0,
      lineWidth: dimensions.lineWidth,
      numberVisibleProperty: model.leftAddendVisibleProperty,
      numberFontSize: dimensions.numberFontSize
    } );

    const rightAddendRectangle = new NumberRectangle( rightAddendDimension, displayRightAddendNumberProperty, {
      fill: model.rightAddendColorProperty,
      stroke: 'black',
      cornerRadius: 0,
      lineWidth: dimensions.lineWidth,
      numberVisibleProperty: model.rightAddendVisibleProperty,
      numberFontSize: dimensions.numberFontSize
    } );

    super( model, totalRectangle, leftAddendRectangle, rightAddendRectangle, options );
  }
}

numberPairs.register( 'BarModelMutableNode', BarModelMutableNode );
