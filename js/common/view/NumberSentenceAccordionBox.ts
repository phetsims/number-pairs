// Copyright 2024, University of Colorado Boulder
/**
 * This accordion box contains a number sentence that describes the decomposition of a total into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import WithOptional from '../../../../phet-core/js/types/WithOptional.js';
import { Node, Rectangle, RichText, Text } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import TotalRepresentationAccordionBox, { BUTTON_X_MARGIN, CONTENT_X_MARGIN, EXPAND_COLLAPSE_SIDE_LENGTH, TotalRepresentationAccordionBoxOptions } from './TotalRepresentationAccordionBox.js';
import NumberSuiteCommonStrings from '../../../../number-suite-common/js/NumberSuiteCommonStrings.js';
import TProperty from '../../../../axon/js/TProperty.js';

const NUMBER_TO_WORD_MAP = new Map();
NUMBER_TO_WORD_MAP.set( 0, NumberSuiteCommonStrings.zeroStringProperty );
NUMBER_TO_WORD_MAP.set( 1, NumberSuiteCommonStrings.oneStringProperty );
NUMBER_TO_WORD_MAP.set( 2, NumberSuiteCommonStrings.twoStringProperty );
NUMBER_TO_WORD_MAP.set( 3, NumberSuiteCommonStrings.threeStringProperty );
NUMBER_TO_WORD_MAP.set( 4, NumberSuiteCommonStrings.fourStringProperty );
NUMBER_TO_WORD_MAP.set( 5, NumberSuiteCommonStrings.fiveStringProperty );
NUMBER_TO_WORD_MAP.set( 6, NumberSuiteCommonStrings.sixStringProperty );
NUMBER_TO_WORD_MAP.set( 7, NumberSuiteCommonStrings.sevenStringProperty );
NUMBER_TO_WORD_MAP.set( 8, NumberSuiteCommonStrings.eightStringProperty );
NUMBER_TO_WORD_MAP.set( 9, NumberSuiteCommonStrings.nineStringProperty );
NUMBER_TO_WORD_MAP.set( 10, NumberSuiteCommonStrings.tenStringProperty );
NUMBER_TO_WORD_MAP.set( 11, NumberSuiteCommonStrings.elevenStringProperty );
NUMBER_TO_WORD_MAP.set( 12, NumberSuiteCommonStrings.twelveStringProperty );
NUMBER_TO_WORD_MAP.set( 13, NumberSuiteCommonStrings.thirteenStringProperty );
NUMBER_TO_WORD_MAP.set( 14, NumberSuiteCommonStrings.fourteenStringProperty );
NUMBER_TO_WORD_MAP.set( 15, NumberSuiteCommonStrings.fifteenStringProperty );
NUMBER_TO_WORD_MAP.set( 16, NumberSuiteCommonStrings.sixteenStringProperty );
NUMBER_TO_WORD_MAP.set( 17, NumberSuiteCommonStrings.seventeenStringProperty );
NUMBER_TO_WORD_MAP.set( 18, NumberSuiteCommonStrings.eighteenStringProperty );
NUMBER_TO_WORD_MAP.set( 19, NumberSuiteCommonStrings.nineteenStringProperty );
NUMBER_TO_WORD_MAP.set( 20, NumberSuiteCommonStrings.twentyStringProperty );
NUMBER_TO_WORD_MAP.set( 'aNumber', NumberPairsStrings.aNumberStringProperty );
NUMBER_TO_WORD_MAP.set( 'anotherNumber', NumberPairsStrings.anotherNumberStringProperty );

type SelfOptions = {
  numberSentenceStringProperty: TReadOnlyProperty<string>;
  numberPhraseSpeechStringProperty: TReadOnlyProperty<string>;
  speechDataProperty: TProperty<string>;
};
type NumberSentenceAccordionBoxOptions = SelfOptions & StrictOmit<TotalRepresentationAccordionBoxOptions, 'titleNode'>;

const LINE_WRAP = 240;

// We want the accordion box to resize in the Y direction to accommodate the RichText line wrap, however the
// width should stay the same. In order to do this we must define and control all options that contribute
// to the width of the accordion box.
export const ACCORDION_BOX_WIDTH = LINE_WRAP + 2 * CONTENT_X_MARGIN + EXPAND_COLLAPSE_SIDE_LENGTH + BUTTON_X_MARGIN;

export default class NumberSentenceAccordionBox extends TotalRepresentationAccordionBox {

  public constructor( model: NumberPairsModel, providedOptions: NumberSentenceAccordionBoxOptions ) {

    const options = optionize<NumberSentenceAccordionBoxOptions, SelfOptions, WithOptional<TotalRepresentationAccordionBoxOptions, 'titleNode'>>()( {
      contentXMargin: 20,
      contentYMargin: 20,
      contentAlign: 'left',
      minWidth: ACCORDION_BOX_WIDTH,
      expandedDefaultValue: false
    }, providedOptions );

    const totalStringProperty = new DerivedProperty( [ model.totalProperty, model.totalVisibleProperty ],
      ( total, visible ) => {
        const key = visible ? total : 'aNumber';
        return NUMBER_TO_WORD_MAP.get( key );
      } );
    const leftAddendStringProperty = new DerivedProperty( [ model.leftAddendProperty, model.leftAddendVisibleProperty ],
      ( total, visible ) => {
        const key = visible ? total : 'aNumber';
        return NUMBER_TO_WORD_MAP.get( key );
      } );
    const rightAddendStringProperty = new DerivedProperty( [ model.rightAddendProperty, model.rightAddendVisibleProperty ],
      ( total, visible ) => {
        const key: number | string = visible ? total : 'anotherNumber';
        return NUMBER_TO_WORD_MAP.get( key );
      } );

    const totalDynamicProperty = new DynamicProperty( totalStringProperty );
    const leftAddendDynamicProperty = new DynamicProperty( leftAddendStringProperty );
    const rightAddendDynamicProperty = new DynamicProperty( rightAddendStringProperty );
    const numberSentencePatternStringProperty = new PatternStringProperty( options.numberSentenceStringProperty, {
      total: totalDynamicProperty,
      leftAddend: leftAddendDynamicProperty,
      rightAddend: rightAddendDynamicProperty
    } );
    const numberPhraseSpeechPatternStringProperty = new PatternStringProperty( options.numberPhraseSpeechStringProperty, {
      total: totalDynamicProperty,
      leftAddend: leftAddendDynamicProperty,
      rightAddend: rightAddendDynamicProperty
    } );
    numberPhraseSpeechPatternStringProperty.link( speechString => {
      options.speechDataProperty.value = speechString;
    } );

    let totalHighlight: Rectangle;
    let leftAddendHighlight: Rectangle;
    let rightAddendHighlight: Rectangle;
    const richText = new RichText( numberSentencePatternStringProperty, {
      lineWrap: LINE_WRAP,
      leading: 10,
      tags: {
        total: node => {
          totalHighlight = new Rectangle( node.bounds.dilated( 2 ), {
            fill: model.totalColorProperty.value,
            cornerRadius: 4
          } );
          return new Node( {
            children: [
              totalHighlight,
              node
            ]
          } );
        },
        left: node => {
          leftAddendHighlight = new Rectangle( node.bounds.dilated( 2 ), {
            fill: model.leftAddendColorProperty.value,
            cornerRadius: 4
          } );
          return new Node( {
            children: [
              leftAddendHighlight,
              node
            ]
          } );
        },
        right: node => {
          rightAddendHighlight = new Rectangle( node.bounds.dilated( 2 ), {
            fill: model.rightAddendColorProperty.value,
            cornerRadius: 4
          } );
          return new Node( {
            children: [
              rightAddendHighlight,
              node
            ]
          } );
        }
      }
    } );

    model.totalColorProperty.link( color => {
      totalHighlight.fill = color;
    } );
    model.leftAddendColorProperty.link( color => {
      leftAddendHighlight.fill = color;
    } );
    model.rightAddendColorProperty.link( color => {
      rightAddendHighlight.fill = color;
    } );

    options.titleNode = new Text( NumberPairsStrings.numberSentenceStringProperty, {
      font: NumberPairsConstants.TITLE_FONT
    } );

    super( richText, options );
  }
}

numberPairs.register( 'NumberSentenceAccordionBox', NumberSentenceAccordionBox );