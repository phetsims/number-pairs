// Copyright 2024, University of Colorado Boulder
/**
 * This accordion box displays an equation that represents the decomposition of a total into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Color, HBox, Text } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import NumberRectangle from './NumberRectangle.js';
import TotalRepresentationAccordionBox, { TotalRepresentationAccordionBoxOptions } from './TotalRepresentationAccordionBox.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import NumberSentenceAccordionBox from './NumberSentenceAccordionBox.js';

type SelfOptions = {
  addendsOnRight?: boolean;
  totalColorProperty: TReadOnlyProperty<Color>;
  leftAddendColorProperty: TReadOnlyProperty<Color>;
  rightAddendColorProperty: TReadOnlyProperty<Color>;
};
type EquationAccordionBoxOptions = SelfOptions & StrictOmit<TotalRepresentationAccordionBoxOptions, 'titleNode'>;

const SQUARE_DIMENSION = 40;
export default class EquationAccordionBox extends TotalRepresentationAccordionBox {

  public constructor( model: NumberPairsModel, providedOptions: EquationAccordionBoxOptions ) {

    const titleNode = new Text( NumberPairsStrings.equationStringProperty, NumberPairsConstants.ACCORDION_BOX_TITLE_OPTIONS );
    const options = optionize<EquationAccordionBoxOptions, SelfOptions, TotalRepresentationAccordionBoxOptions>()( {
      addendsOnRight: true,
      titleNode: titleNode,
      contentYMargin: 18,
      minWidth: NumberSentenceAccordionBox.MIN_WIDTH, // Match the minWidth of the NumberSentenceAccordionBox
      expandedDefaultValue: false
    }, providedOptions );

    const totalSquare = new NumberRectangle( new Dimension2( SQUARE_DIMENSION, SQUARE_DIMENSION ), model.totalProperty, {
      numberVisibleProperty: model.totalVisibleProperty,
      fill: options.totalColorProperty.value,
      stroke: options.totalColorProperty.value.darkerColor()
    } );
    options.totalColorProperty.link( totalColor => {
      totalSquare.fill = totalColor;
      totalSquare.stroke = totalColor.darkerColor();
    } );

    const leftAddendSquare = new NumberRectangle( new Dimension2( SQUARE_DIMENSION, SQUARE_DIMENSION ), model.leftAddendProperty, {
      numberVisibleProperty: model.leftAddendVisibleProperty,
      fill: options.leftAddendColorProperty.value,
      stroke: options.leftAddendColorProperty.value.darkerColor()
    } );
    options.leftAddendColorProperty.link( leftAddendColor => {
      leftAddendSquare.fill = leftAddendColor;
      leftAddendSquare.stroke = leftAddendColor.darkerColor();
    } );

    const rightAddendSquare = new NumberRectangle( new Dimension2( SQUARE_DIMENSION, SQUARE_DIMENSION ), model.rightAddendProperty, {
      numberVisibleProperty: model.rightAddendVisibleProperty,
      fill: options.rightAddendColorProperty.value,
      stroke: options.rightAddendColorProperty.value.darkerColor()
    } );
    options.rightAddendColorProperty.link( rightAddendColor => {
      rightAddendSquare.fill = rightAddendColor;
      rightAddendSquare.stroke = rightAddendColor.darkerColor();
    } );

    const equalSign = new Text( '=', { font: new PhetFont( 20 ) } );
    const plusSign = new Text( '+', { font: new PhetFont( 20 ) } );

    const contentChildren = options.addendsOnRight ? [ totalSquare, equalSign, leftAddendSquare, plusSign, rightAddendSquare ]
                                                   : [ leftAddendSquare, plusSign, rightAddendSquare, equalSign, totalSquare ];
    const contentNode = new HBox( {
      children: contentChildren,
      spacing: 5
    } );

    super( contentNode, options );
  }
}

numberPairs.register( 'EquationAccordionBox', EquationAccordionBox );