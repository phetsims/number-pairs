// Copyright 2024, University of Colorado Boulder
/**
 * This accordion box contains a number sentence that describes the decomposition of a sum into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import { RichText, Text } from '../../../../scenery/js/imports.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import SumRepresentationAccordionBox from './SumRepresentationAccordionBox.js';


export default class NumberSentenceAccordionBox extends SumRepresentationAccordionBox {

  public constructor( model: NumberPairsModel ) {
    const numberSentencePatternStringProperty = new PatternStringProperty( NumberPairsStrings.numberSentencePatternStringProperty, {
      sum: model.sumProperty,
      leftAddend: model.leftAddendProperty,
      rightAddend: model.rightAddendProperty
    } );
    const richText = new RichText( numberSentencePatternStringProperty, {
      lineWrap: 250
    } );

    const titleNode = new Text( NumberPairsStrings.numberSentenceStringProperty, {
      font: NumberPairsConstants.TITLE_FONT
    } );
    super( richText, {
      titleNode: titleNode
    } );
  }
}

numberPairs.register( 'NumberSentenceAccordionBox', NumberSentenceAccordionBox );