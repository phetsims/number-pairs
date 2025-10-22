// Copyright 2024-2025, University of Colorado Boulder

/**
 * NumberEquationNode displays an equation that represents the decomposition of a total into two addends,
 * without any surrounding accordion UI. Intended for reuse in places that need only the equation visuals.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import derived from '../../../../axon/js/derived.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import NumberRectangle from './NumberRectangle.js';

type SelfOptions = {
  addendsOnRight?: boolean;
  totalColorProperty: TReadOnlyProperty<Color>;
  leftAddendColorProperty: TReadOnlyProperty<Color>;
  rightAddendColorProperty: TReadOnlyProperty<Color>;
};
export type NumberEquationNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class NumberEquationNode extends Node {
  public readonly totalSquare: NumberRectangle;
  public readonly leftAddendSquare: NumberRectangle;
  public readonly rightAddendSquare: NumberRectangle;

  public constructor( model: TGenericNumberPairsModel, squareDimension: number, symbolFontSize: number, numberFontSize: number, providedOptions: NumberEquationNodeOptions ) {

    const options = optionize<NumberEquationNodeOptions, SelfOptions, NodeOptions>()( {
      addendsOnRight: true
    }, providedOptions );

    const totalSquare = new NumberRectangle( new Dimension2( squareDimension, squareDimension ), model.totalProperty, {
      numberVisibleProperty: model.totalVisibleProperty,
      numberFontSize: numberFontSize
    } );
    options.totalColorProperty.link( totalColor => {
      totalSquare.fill = totalColor;
      totalSquare.stroke = totalColor.darkerColor();
    } );

    const leftAddendSquare = new NumberRectangle( new Dimension2( squareDimension, squareDimension ), model.leftAddendProperty, {
      numberVisibleProperty: model.leftAddendVisibleProperty,
      numberFontSize: numberFontSize
    } );
    options.leftAddendColorProperty.link( leftAddendColor => {
      leftAddendSquare.fill = leftAddendColor;
      leftAddendSquare.stroke = leftAddendColor.darkerColor();
    } );

    const rightAddendSquare = new NumberRectangle( new Dimension2( squareDimension, squareDimension ), model.rightAddendProperty, {
      numberVisibleProperty: model.rightAddendVisibleProperty,
      numberFontSize: numberFontSize
    } );
    options.rightAddendColorProperty.link( rightAddendColor => {
      rightAddendSquare.fill = rightAddendColor;
      rightAddendSquare.stroke = rightAddendColor.darkerColor();
    } );

    const equalSign = new Text( '=', { font: new PhetFont( symbolFontSize ) } );
    const plusSign = new Text( '+', { font: new PhetFont( symbolFontSize ) } );

    const accessibleParagraphVisibleProperty = NumberPairsFluent.a11y.equation.accessibleParagraphPattern.createProperty( {
      total: model.totalProperty,
      leftAddend: model.leftAddendProperty,
      rightAddend: model.rightAddendProperty
    } );
    const accessibleParagraphHiddenProperty = NumberPairsFluent.a11y.equation.accessibleParagraphHiddenPattern.createProperty( {
      total: model.totalProperty,
      leftPlaceholder: NumberPairsFluent.aNumberStringProperty,
      rightPlaceholder: NumberPairsFluent.anotherNumberStringProperty
    } );
    const accessibleParagraphProperty = derived(
      model.leftAddendVisibleProperty, model.rightAddendVisibleProperty, accessibleParagraphVisibleProperty, accessibleParagraphHiddenProperty,
      ( leftVisible, rightVisible, visibleParagraph, hiddenParagraph ) => {
        return leftVisible && rightVisible ? visibleParagraph : hiddenParagraph;
      } );

    const contentChildren = options.addendsOnRight ? [ totalSquare, equalSign, leftAddendSquare, plusSign, rightAddendSquare ]
                                                   : [ leftAddendSquare, plusSign, rightAddendSquare, equalSign, totalSquare ];
    const contentNode = new HBox( {
      children: contentChildren,
      spacing: 10,

      // Do not relayout when the stroke changes on the game screen.
      resize: false
    } );

    options.accessibleParagraph = accessibleParagraphProperty;
    options.children = [ contentNode ];
    super( options );

    // Expose references so callers (e.g., LevelNode) can adjust stroke/lineDash
    this.totalSquare = totalSquare;
    this.leftAddendSquare = leftAddendSquare;
    this.rightAddendSquare = rightAddendSquare;
  }
}

numberPairs.register( 'NumberEquationNode', NumberEquationNode );
