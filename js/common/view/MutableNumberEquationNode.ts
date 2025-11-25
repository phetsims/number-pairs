// Copyright 2024-2025, University of Colorado Boulder

/**
 * MutableNumberEquationNode displays an equation that represents the decomposition of a total into two addends,
 * with mutable NumberRectangle instances that react to model changes. This is the version used in screens
 * where numbers update dynamically.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Color from '../../../../scenery/js/util/Color.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import Description from './description/Description.js';
import NumberEquationNode, { DEFAULT_EQUATION_DIMENSIONS, NumberEquationNodeOptions } from './NumberEquationNode.js';
import NumberRectangle from './NumberRectangle.js';

type SelfOptions = {
  totalColorProperty: TReadOnlyProperty<Color>;
  leftAddendColorProperty: TReadOnlyProperty<Color>;
  rightAddendColorProperty: TReadOnlyProperty<Color>;
  missingNumberStringProperty?: TReadOnlyProperty<string>;
  squareDimension?: number;
  numberFontSize?: number;
};

export type MutableNumberEquationNodeOptions = SelfOptions & NumberEquationNodeOptions;

export default class MutableNumberEquationNode extends NumberEquationNode {

  public constructor( model: TGenericNumberPairsModel, providedOptions: MutableNumberEquationNodeOptions ) {

    const options = optionize<MutableNumberEquationNodeOptions, SelfOptions, NumberEquationNodeOptions>()( {
      missingNumberStringProperty: NumberPairsFluent.aNumberStringProperty,
      squareDimension: 35,
      numberFontSize: 24,
      symbolFontSize: 24,
      spacing: 10,
      resize: false
    }, providedOptions );

    const totalSquare = new NumberRectangle( new Dimension2( options.squareDimension, options.squareDimension ), model.totalProperty, {
      numberVisibleProperty: model.totalVisibleProperty,
      lineWidth: DEFAULT_EQUATION_DIMENSIONS.lineWidth,
      numberFontSize: options.numberFontSize
    } );
    options.totalColorProperty.link( totalColor => {
      totalSquare.fill = totalColor;
      totalSquare.stroke = totalColor.darkerColor();
    } );

    const leftAddendSquare = new NumberRectangle( new Dimension2( options.squareDimension, options.squareDimension ), model.leftAddendProperty, {
      numberVisibleProperty: model.leftAddendVisibleProperty,
      lineWidth: DEFAULT_EQUATION_DIMENSIONS.lineWidth,
      numberFontSize: options.numberFontSize
    } );
    options.leftAddendColorProperty.link( leftAddendColor => {
      leftAddendSquare.fill = leftAddendColor;
      leftAddendSquare.stroke = leftAddendColor.darkerColor();
    } );

    const rightAddendSquare = new NumberRectangle( new Dimension2( options.squareDimension, options.squareDimension ), model.rightAddendProperty, {
      numberVisibleProperty: model.rightAddendVisibleProperty,
      lineWidth: DEFAULT_EQUATION_DIMENSIONS.lineWidth,
      numberFontSize: options.numberFontSize
    } );
    options.rightAddendColorProperty.link( rightAddendColor => {
      rightAddendSquare.fill = rightAddendColor;
      rightAddendSquare.stroke = rightAddendColor.darkerColor();
    } );

    super( totalSquare, leftAddendSquare, rightAddendSquare, options );

    // Set up accessibility
    const accessibleParagraphPattern = options.addendsOnRight ?
                                       NumberPairsFluent.a11y.equationAccordionBox.addendsOnRightAccessibleParagraph :
                                       NumberPairsFluent.a11y.equationAccordionBox.addendsOnLeftAccessibleParagraph;
    this.accessibleParagraph = accessibleParagraphPattern.createProperty( {
      total: Description.getValueStringProperty( model.totalProperty, model.totalVisibleProperty, options.missingNumberStringProperty ),
      leftAddend: Description.getValueStringProperty( model.leftAddendProperty, model.leftAddendVisibleProperty, options.missingNumberStringProperty ),
      rightAddend: Description.getValueStringProperty( model.rightAddendProperty, model.rightAddendVisibleProperty, options.missingNumberStringProperty )
    } );
  }
}

numberPairs.register( 'MutableNumberEquationNode', MutableNumberEquationNode );

