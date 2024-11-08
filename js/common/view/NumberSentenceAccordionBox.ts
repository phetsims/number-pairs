// Copyright 2024, University of Colorado Boulder
/**
 * This accordion box contains a number sentence that describes the decomposition of a total into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import { Node, Rectangle, RichText, Text } from '../../../../scenery/js/imports.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import TotalRepresentationAccordionBox, { BUTTON_X_MARGIN, CONTENT_X_MARGIN, EXPAND_COLLAPSE_SIDE_LENGTH, TotalRepresentationAccordionBoxOptions } from './TotalRepresentationAccordionBox.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

const NUMBER_TO_WORD_MAP = new Map();
NUMBER_TO_WORD_MAP.set( 0, NumberPairsStrings.zeroStringProperty );
NUMBER_TO_WORD_MAP.set( 1, NumberPairsStrings.oneStringProperty );
NUMBER_TO_WORD_MAP.set( 2, NumberPairsStrings.twoStringProperty );
NUMBER_TO_WORD_MAP.set( 3, NumberPairsStrings.threeStringProperty );
NUMBER_TO_WORD_MAP.set( 4, NumberPairsStrings.fourStringProperty );
NUMBER_TO_WORD_MAP.set( 5, NumberPairsStrings.fiveStringProperty );
NUMBER_TO_WORD_MAP.set( 6, NumberPairsStrings.sixStringProperty );
NUMBER_TO_WORD_MAP.set( 7, NumberPairsStrings.sevenStringProperty );
NUMBER_TO_WORD_MAP.set( 8, NumberPairsStrings.eightStringProperty );
NUMBER_TO_WORD_MAP.set( 9, NumberPairsStrings.nineStringProperty );
NUMBER_TO_WORD_MAP.set( 10, NumberPairsStrings.tenStringProperty );
NUMBER_TO_WORD_MAP.set( 11, NumberPairsStrings.elevenStringProperty );
NUMBER_TO_WORD_MAP.set( 12, NumberPairsStrings.twelveStringProperty );
NUMBER_TO_WORD_MAP.set( 13, NumberPairsStrings.thirteenStringProperty );
NUMBER_TO_WORD_MAP.set( 14, NumberPairsStrings.fourteenStringProperty );
NUMBER_TO_WORD_MAP.set( 15, NumberPairsStrings.fifteenStringProperty );
NUMBER_TO_WORD_MAP.set( 16, NumberPairsStrings.sixteenStringProperty );
NUMBER_TO_WORD_MAP.set( 17, NumberPairsStrings.seventeenStringProperty );
NUMBER_TO_WORD_MAP.set( 18, NumberPairsStrings.eighteenStringProperty );
NUMBER_TO_WORD_MAP.set( 19, NumberPairsStrings.nineteenStringProperty );
NUMBER_TO_WORD_MAP.set( 20, NumberPairsStrings.twentyStringProperty );
NUMBER_TO_WORD_MAP.set( 'aNumber', NumberPairsStrings.aNumberStringProperty );
NUMBER_TO_WORD_MAP.set( 'anotherNumber', NumberPairsStrings.anotherNumberStringProperty );

type SelfOptions = {
  numberSentenceStringProperty: TReadOnlyProperty<string>;
};
type NumberSentenceAccordionBoxOptions = SelfOptions & StrictOmit<TotalRepresentationAccordionBoxOptions, 'titleNode'>;

const LINE_WRAP = 240;

// We want the accordion box to resize in the Y direction to accommodate the RichText line wrap, however the
// width should stay the same. In order to do this we must define and control all options that contribute
// to the width of the accordion box.
export const ACCORDION_BOX_WIDTH = LINE_WRAP + 2 * CONTENT_X_MARGIN + EXPAND_COLLAPSE_SIDE_LENGTH + BUTTON_X_MARGIN;

export default class NumberSentenceAccordionBox extends TotalRepresentationAccordionBox {

  public constructor( model: NumberPairsModel, providedOptions: NumberSentenceAccordionBoxOptions ) {

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
        const key = visible ? total : 'anotherNumber';
        return NUMBER_TO_WORD_MAP.get( key );
      } );

    const numberSentencePatternStringProperty = new PatternStringProperty( providedOptions.numberSentenceStringProperty, {
      total: new DynamicProperty( totalStringProperty ),
      leftAddend: new DynamicProperty( leftAddendStringProperty ),
      rightAddend: new DynamicProperty( rightAddendStringProperty )
    } );

    let totalHighlight: Rectangle;
    let leftAddendHighlight: Rectangle;
    let rightAddendHighlight: Rectangle;
    const richText = new RichText( numberSentencePatternStringProperty, {
      lineWrap: LINE_WRAP,
      leading: 10,
      tags: {
        total: node => {
          totalHighlight = new Rectangle( node.bounds.dilated( 1.5 ), {
            fill: model.totalColorProperty.value,
            stroke: model.totalColorProperty.value.darkerColor()
          } );
          return new Node( {
            children: [
              totalHighlight,
              node
            ]
          } );
        },
        left: node => {
          leftAddendHighlight = new Rectangle( node.bounds.dilated( 1.5 ), {
            fill: model.leftAddendColorProperty.value,
            stroke: model.leftAddendColorProperty.value.darkerColor()
          } );
          return new Node( {
            children: [
              leftAddendHighlight,
              node
            ]
          } );
        },
        right: node => {
          rightAddendHighlight = new Rectangle( node.bounds.dilated( 1.5 ), {
            fill: model.rightAddendColorProperty.value,
            stroke: model.rightAddendColorProperty.value.darkerColor()
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
      totalHighlight.stroke = color.darkerColor();
    } );
    model.leftAddendColorProperty.link( color => {
      leftAddendHighlight.fill = color;
      leftAddendHighlight.stroke = color.darkerColor();
    } );
    model.rightAddendColorProperty.link( color => {
      rightAddendHighlight.fill = color;
      rightAddendHighlight.stroke = color.darkerColor();
    } );

    const titleNode = new Text( NumberPairsStrings.numberSentenceStringProperty, {
      font: NumberPairsConstants.TITLE_FONT
    } );

    const options = optionize<NumberSentenceAccordionBoxOptions, SelfOptions, TotalRepresentationAccordionBoxOptions>()( {
      titleNode: titleNode,
      contentXMargin: 20,
      contentYMargin: 20,
      contentAlign: 'left',
      minWidth: ACCORDION_BOX_WIDTH
    }, providedOptions );
    super( richText, options );
  }
}

numberPairs.register( 'NumberSentenceAccordionBox', NumberSentenceAccordionBox );