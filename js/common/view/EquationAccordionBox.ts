// Copyright 2024, University of Colorado Boulder
/**
 * This accordion box displays an equation that represents the decomposition of a total into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import TotalRepresentationAccordionBox, { TotalRepresentationAccordionBoxOptions } from './TotalRepresentationAccordionBox.js';
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
  totalColorProperty: TReadOnlyProperty<TColor>;
  leftAddendColorProperty: TReadOnlyProperty<TColor>;
  rightAddendColorProperty: TReadOnlyProperty<TColor>;
};
type EquationAccordionBoxOptions = SelfOptions & StrictOmit<TotalRepresentationAccordionBoxOptions, 'titleNode'>;

const SQUARE_DIMENSION = 40;
export default class EquationAccordionBox extends TotalRepresentationAccordionBox {

  public constructor( model: NumberPairsModel, providedOptions: EquationAccordionBoxOptions ) {

    const titleNode = new Text( NumberPairsStrings.equationStringProperty, {
      font: NumberPairsConstants.TITLE_FONT
    } );
    const options = optionize<EquationAccordionBoxOptions, SelfOptions, TotalRepresentationAccordionBoxOptions>()( {
      addendsOnRight: true,
      titleNode: titleNode,
      titleXSpacing: 10,
      contentXMargin: 45,
      contentXSpacing: 0,
      contentYMargin: 25
    }, providedOptions );

    const totalSquare = new NumberSquare( SQUARE_DIMENSION, model.totalNumberProperty, {
      numberVisibleProperty: model.totalVisibleProperty,
      fill: options.totalColorProperty.value
    } );
    options.totalColorProperty.link( totalColor => {
      totalSquare.fill = totalColor;
    } );

    const leftAddendSquare = new NumberSquare( SQUARE_DIMENSION, model.leftAddendNumberProperty, {
      numberVisibleProperty: model.leftAddendVisibleProperty,
      fill: options.leftAddendColorProperty.value
    } );
    options.leftAddendColorProperty.link( leftAddendColor => {
      leftAddendSquare.fill = leftAddendColor;
    } );

    const rightAddendSquare = new NumberSquare( SQUARE_DIMENSION, model.rightAddendNumberProperty, {
      numberVisibleProperty: model.rightAddendVisibleProperty,
      fill: options.rightAddendColorProperty.value
    } );
    options.rightAddendColorProperty.link( rightAddendColor => {
      rightAddendSquare.fill = rightAddendColor;
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