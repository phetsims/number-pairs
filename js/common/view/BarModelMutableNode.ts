// Copyright 2025, University of Colorado Boulder

/**
 * A mutable bar model that displays the total and two addends as proportional rectangles with numbers.
 * Used in interactive screens where users can change values.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import SumModel from '../../sum/model/SumModel.js';
import NumberPairsPreferences from '../model/NumberPairsPreferences.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import BarModelNode, { BarModelDimensions, BarModelNodeOptions, DEFAULT_BAR_MODEL_DIMENSIONS } from './BarModelNode.js';
import Description from './description/Description.js';
import NumberRectangle from './NumberRectangle.js';

type SelfOptions = {

  // If provided, the value to display for the total, left addend, and right addend. If not provided, the model properties will be used.
  displayTotalNumberProperty?: TReadOnlyProperty<number> | null;

  // If provided, the value to display for the left addend. If not provided, the model property will be used.
  displayLeftAddendNumberProperty?: TReadOnlyProperty<number> | null;

  // If provided, the value to display for the right addend. If not provided, the model property will be used.
  displayRightAddendNumberProperty?: TReadOnlyProperty<number> | null;

  dimensions?: BarModelDimensions;
  isIcon?: boolean; // Omits description for icon use.
  missingNumberStringProperty?: TReadOnlyProperty<string>;
};

export type BarModelMutableNodeOptions = SelfOptions & StrictOmit<BarModelNodeOptions, 'dimensions' | 'accessibleParagraph'>;

export default class BarModelMutableNode extends BarModelNode {

  public constructor(
    model: TGenericNumberPairsModel,
    providedOptions?: BarModelMutableNodeOptions ) {

    const options = optionize<BarModelMutableNodeOptions, SelfOptions, BarModelNodeOptions>()( {
      isIcon: false,
      missingNumberStringProperty: NumberPairsFluent.aNumberStringProperty,
      displayTotalNumberProperty: null,
      displayLeftAddendNumberProperty: null,
      displayRightAddendNumberProperty: null,
      dimensions: DEFAULT_BAR_MODEL_DIMENSIONS,
      accessibleParagraph: providedOptions?.isIcon ? null : NumberPairsFluent.a11y.controls.numberModel.barModelAccessibleParagraph.createProperty( {
        orientation: model instanceof SumModel ? NumberPairsPreferences.sumScreenTotalOnTopProperty.derived(
          isTotalOnTop => isTotalOnTop ? 'totalOnTop' : 'totalOnBottom' ) : 'totalOnTop'
      } )
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

    if ( !options.isIcon ) {
      // Listen for total even though the value is not used, due to listener order dependencies, make sure we updated
      // when everything settled.
      const proportionsStringProperty = new DerivedProperty( [ model.leftAddendProperty, model.rightAddendProperty,
          model.totalProperty,
          NumberPairsFluent.a11y.controls.numberModel.largerAndSmallerStringProperty,
          NumberPairsFluent.a11y.controls.numberModel.smallerAndLargerStringProperty,
          NumberPairsFluent.a11y.controls.numberModel.equalStringProperty ],
        ( left, right, total, largerAndSmaller, smallerAndLarger, equal ) => {
          return left === right ? equal : left > right ? largerAndSmaller : smallerAndLarger;
        } );
      this.addChild( new Node( {
        accessibleParagraph: NumberPairsFluent.a11y.controls.numberModel.barModelStateAccessibleParagraph.createProperty( {
          left: Description.getValueStringProperty( model.leftAddendProperty, model.leftAddendVisibleProperty, options.missingNumberStringProperty ),
          right: Description.getValueStringProperty( model.rightAddendProperty, model.rightAddendVisibleProperty, options.missingNumberStringProperty ),
          total: Description.getValueStringProperty( model.totalProperty, model.totalVisibleProperty, options.missingNumberStringProperty ),
          proportions: proportionsStringProperty,
          orientation: model instanceof SumModel ? NumberPairsPreferences.sumScreenTotalOnTopProperty.derived(
            isTotalOnTop => isTotalOnTop ? 'totalOnTop' : 'totalOnBottom' ) : 'totalOnTop'
        } )
      } ) );
    }
  }
}

numberPairs.register( 'BarModelMutableNode', BarModelMutableNode );
