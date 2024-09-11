// Copyright 2024, University of Colorado Boulder
/**
 * This accordion box displays an equation that represents the decomposition of a sum into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import SumRepresentationAccordionBox, { SumRepresentationAccordionBoxOptions } from './SumRepresentationAccordionBox.js';
import numberPairs from '../../numberPairs.js';
import { HBox, TColor, Text } from '../../../../scenery/js/imports.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import NumberSquare from './NumberSquare.js';
import NumberPairsModel from '../model/NumberPairsModel.js';

type SelfOptions = {
  addendsOnRight?: boolean;
  sumColorProperty: TReadOnlyProperty<TColor>;
  leftAddendColorProperty: TReadOnlyProperty<TColor>;
  rightAddendColorProperty: TReadOnlyProperty<TColor>;
};
type EquationAccordionBoxOptions = SelfOptions & StrictOmit<SumRepresentationAccordionBoxOptions, 'titleNode'>;

const SQUARE_DIMENSION = 40;
export default class EquationAccordionBox extends SumRepresentationAccordionBox {

  public constructor( model: NumberPairsModel, providedOptions: EquationAccordionBoxOptions ) {

    const titleNode = new Text( NumberPairsStrings.equationStringProperty, {
      font: NumberPairsConstants.TITLE_FONT
    } );
    const options = optionize<EquationAccordionBoxOptions, SelfOptions, SumRepresentationAccordionBoxOptions>()( {
      addendsOnRight: true,
      titleNode: titleNode,
      titleXSpacing: 10,
      contentXMargin: 45,
      contentXSpacing: 0,
      contentYMargin: 25
    }, providedOptions );

    const sumSquare = new NumberSquare( SQUARE_DIMENSION, model.sumProperty, {
      fill: options.sumColorProperty.value,
      cornerRadius: 5
    } );
    options.sumColorProperty.link( sumColor => {
      sumSquare.fill = sumColor;
    } );

    const leftAddendSquare = new NumberSquare( SQUARE_DIMENSION, model.leftAddendNumberProperty, {
      fill: options.leftAddendColorProperty.value,
      cornerRadius: 5
    } );
    options.leftAddendColorProperty.link( leftAddendColor => {
      leftAddendSquare.fill = leftAddendColor;
    } );

    const rightAddendSquare = new NumberSquare( SQUARE_DIMENSION, model.rightAddendNumberProperty, {
      fill: options.rightAddendColorProperty.value,
      cornerRadius: 5
    } );
    options.rightAddendColorProperty.link( rightAddendColor => {
      rightAddendSquare.fill = rightAddendColor;
    } );

    const equalSign = new Text( '=', { font: new PhetFont( 20 ) } );
    const plusSign = new Text( '+', { font: new PhetFont( 20 ) } );

    const contentChildren = options.addendsOnRight ? [ sumSquare, equalSign, leftAddendSquare, plusSign, rightAddendSquare ]
                                                   : [ leftAddendSquare, plusSign, rightAddendSquare, equalSign, sumSquare ];
    const contentNode = new HBox( {
      children: contentChildren,
      spacing: 5
    } );

    super( contentNode, options );
  }
}

numberPairs.register( 'EquationAccordionBox', EquationAccordionBox );