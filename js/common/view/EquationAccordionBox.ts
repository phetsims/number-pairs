// Copyright 2024-2025, University of Colorado Boulder
/**
 * This accordion box displays an equation that represents the decomposition of a total into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import PhraseAccordionBox from './PhraseAccordionBox.js';
import NumberRectangle from './NumberRectangle.js';
import TotalRepresentationAccordionBox, { TotalRepresentationAccordionBoxOptions } from './TotalRepresentationAccordionBox.js';

// Font for the '=' and '+' symbols.
const SYMBOL_FONT = new PhetFont( 28 );

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
      minWidth: PhraseAccordionBox.MIN_WIDTH, // Match the minWidth of the PhraseAccordionBox
      expandedDefaultValue: false
    }, providedOptions );

    const totalSquare = new NumberRectangle( new Dimension2( SQUARE_DIMENSION, SQUARE_DIMENSION ), model.totalProperty, {
      numberVisibleProperty: model.totalVisibleProperty
    } );
    options.totalColorProperty.link( totalColor => {
      totalSquare.fill = totalColor;
      totalSquare.stroke = totalColor.darkerColor();
    } );

    const leftAddendSquare = new NumberRectangle( new Dimension2( SQUARE_DIMENSION, SQUARE_DIMENSION ), model.leftAddendProperty, {
      numberVisibleProperty: model.leftAddendVisibleProperty
    } );
    options.leftAddendColorProperty.link( leftAddendColor => {
      leftAddendSquare.fill = leftAddendColor;
      leftAddendSquare.stroke = leftAddendColor.darkerColor();
    } );

    const rightAddendSquare = new NumberRectangle( new Dimension2( SQUARE_DIMENSION, SQUARE_DIMENSION ), model.rightAddendProperty, {
      numberVisibleProperty: model.rightAddendVisibleProperty
    } );
    options.rightAddendColorProperty.link( rightAddendColor => {
      rightAddendSquare.fill = rightAddendColor;
      rightAddendSquare.stroke = rightAddendColor.darkerColor();
    } );

    const equalSign = new Text( '=', { font: SYMBOL_FONT } );
    const plusSign = new Text( '+', { font: SYMBOL_FONT } );

    const contentChildren = options.addendsOnRight ? [ totalSquare, equalSign, leftAddendSquare, plusSign, rightAddendSquare ]
                                                   : [ leftAddendSquare, plusSign, rightAddendSquare, equalSign, totalSquare ];
    const contentNode = new HBox( {
      children: contentChildren,
      spacing: 10
    } );

    super( contentNode, options );
  }
}

numberPairs.register( 'EquationAccordionBox', EquationAccordionBox );