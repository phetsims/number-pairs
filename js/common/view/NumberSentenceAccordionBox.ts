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
import SumRepresentationAccordionBox, { SumRepresentationAccordionBoxOptions } from './SumRepresentationAccordionBox.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

const LOWERCASE_NUMBER_TO_WORD_MAP = new Map();
LOWERCASE_NUMBER_TO_WORD_MAP.set( 1, NumberPairsStrings.oneStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 2, NumberPairsStrings.twoStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 3, NumberPairsStrings.threeStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 4, NumberPairsStrings.fourStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 5, NumberPairsStrings.fiveStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 6, NumberPairsStrings.sixStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 7, NumberPairsStrings.sevenStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 8, NumberPairsStrings.eightStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 9, NumberPairsStrings.nineStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 10, NumberPairsStrings.tenStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 11, NumberPairsStrings.elevenStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 12, NumberPairsStrings.twelveStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 13, NumberPairsStrings.thirteenStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 14, NumberPairsStrings.fourteenStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 15, NumberPairsStrings.fifteenStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 16, NumberPairsStrings.sixteenStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 17, NumberPairsStrings.seventeenStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 18, NumberPairsStrings.eighteenStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 19, NumberPairsStrings.nineteenStringProperty );
LOWERCASE_NUMBER_TO_WORD_MAP.set( 20, NumberPairsStrings.twentyStringProperty );

const UPPERCASE_NUMBER_TO_WORD_MAP = new Map();
UPPERCASE_NUMBER_TO_WORD_MAP.set( 1, NumberPairsStrings.uppercaseOneStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 2, NumberPairsStrings.uppercaseTwoStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 3, NumberPairsStrings.uppercaseThreeStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 4, NumberPairsStrings.uppercaseFourStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 5, NumberPairsStrings.uppercaseFiveStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 6, NumberPairsStrings.uppercaseSixStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 7, NumberPairsStrings.uppercaseSevenStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 8, NumberPairsStrings.uppercaseEightStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 9, NumberPairsStrings.uppercaseNineStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 10, NumberPairsStrings.uppercaseTenStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 11, NumberPairsStrings.uppercaseElevenStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 12, NumberPairsStrings.uppercaseTwelveStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 13, NumberPairsStrings.uppercaseThirteenStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 14, NumberPairsStrings.uppercaseFourteenStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 15, NumberPairsStrings.uppercaseFifteenStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 16, NumberPairsStrings.uppercaseSixteenStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 17, NumberPairsStrings.uppercaseSeventeenStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 18, NumberPairsStrings.uppercaseEighteenStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 19, NumberPairsStrings.uppercaseNineteenStringProperty );
UPPERCASE_NUMBER_TO_WORD_MAP.set( 20, NumberPairsStrings.uppercaseTwentyStringProperty );

type SelfOptions = EmptySelfOptions;
type NumberSentenceAccordionBoxOptions = SelfOptions & StrictOmit<SumRepresentationAccordionBoxOptions, 'titleNode'>;
export default class NumberSentenceAccordionBox extends SumRepresentationAccordionBox {

  public constructor( model: NumberPairsModel, providedOptions: NumberSentenceAccordionBoxOptions ) {

    const numberSentencePatternStringProperty = new PatternStringProperty( NumberPairsStrings.numberSentencePatternStringProperty, {
      sum: model.sumProperty,
      leftAddend: model.leftAddendProperty,
      rightAddend: model.rightAddendProperty
    }, {
      maps: {

        // TODO: Pretty sure this will not work with translations. Didn't have time to address yet. Will tackle next.
        //  https://github.com/phetsims/number-pairs/issues/4
        //  I would like to chat with CM about this. I think it needs to be a DerivedProperty that passes through all the possible
        //  string Properties, but that sounds annoying...
        sum: value => UPPERCASE_NUMBER_TO_WORD_MAP.get( value ).value,
        leftAddend: value => LOWERCASE_NUMBER_TO_WORD_MAP.get( value ).value,
        rightAddend: value => LOWERCASE_NUMBER_TO_WORD_MAP.get( value ).value
      }
    } );
    const richText = new RichText( numberSentencePatternStringProperty, {
      lineWrap: 250
    } );

    const titleNode = new Text( NumberPairsStrings.numberSentenceStringProperty, {
      font: NumberPairsConstants.TITLE_FONT
    } );

    const options = optionize<NumberSentenceAccordionBoxOptions, SelfOptions, SumRepresentationAccordionBoxOptions>()( {
      titleNode: titleNode,
      titleXSpacing: 10,
      contentXMargin: 30,
      contentXSpacing: 0,
      contentYMargin: 20
    }, providedOptions );
    super( richText, options );
  }
}

numberPairs.register( 'NumberSentenceAccordionBox', NumberSentenceAccordionBox );