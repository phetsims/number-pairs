// Copyright 2024, University of Colorado Boulder
/**
 * This accordion box displays an equation that represents the decomposition of a sum into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import SumRepresentationAccordionBox, { SumRepresentationAccordionBoxOptions } from './SumRepresentationAccordionBox.js';
import numberPairs from '../../numberPairs.js';
import { Color, HBox, Text } from '../../../../scenery/js/imports.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import NumberSquare from './NumberSquare.js';

type SelfOptions = {
  addendsOnRight?: boolean;
  sumColorProperty: TReadOnlyProperty<Color>;
  leftAddendColorProperty: TReadOnlyProperty<Color>;
  rightAddendColorProperty: TReadOnlyProperty<Color>;
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
      fill: options.sumColorProperty,
      cornerRadius: 5
    } );
    const leftAddendSquare = new NumberSquare( SQUARE_DIMENSION, model.leftAddendProperty, {
      fill: options.leftAddendColorProperty,
      cornerRadius: 5
    } );
    const rightAddendSquare = new NumberSquare( SQUARE_DIMENSION, model.rightAddendProperty, {
      fill: options.rightAddendColorProperty,
      cornerRadius: 5
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