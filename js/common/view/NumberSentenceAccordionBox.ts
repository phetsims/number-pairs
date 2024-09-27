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
import TotalRepresentationAccordionBox, { TotalRepresentationAccordionBoxOptions } from './TotalRepresentationAccordionBox.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';

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

type SelfOptions = EmptySelfOptions;
type NumberSentenceAccordionBoxOptions = SelfOptions & StrictOmit<TotalRepresentationAccordionBoxOptions, 'titleNode'>;
export default class NumberSentenceAccordionBox extends TotalRepresentationAccordionBox {

  public constructor( model: NumberPairsModel, providedOptions: NumberSentenceAccordionBoxOptions ) {

    const totalStringProperty = new DerivedProperty( [ model.totalNumberProperty ],
      total => NUMBER_TO_WORD_MAP.get( total ) );
    const leftAddendStringProperty = new DerivedProperty( [ model.leftAddendNumberProperty ],
      leftAddend => NUMBER_TO_WORD_MAP.get( leftAddend ) );
    const rightAddendStringProperty = new DerivedProperty( [ model.rightAddendNumberProperty ],
      rightAddend => NUMBER_TO_WORD_MAP.get( rightAddend ) );

    const numberSentencePatternStringProperty = new PatternStringProperty( NumberPairsStrings.numberSentencePatternStringProperty, {
      total: new DynamicProperty( totalStringProperty ),
      leftAddend: new DynamicProperty( leftAddendStringProperty ),
      rightAddend: new DynamicProperty( rightAddendStringProperty )
    } );

    let totalHighlight: Rectangle;
    let leftAddendHighlight: Rectangle;
    let rightAddendHighlight: Rectangle;
    const richText = new RichText( numberSentencePatternStringProperty, {
      lineWrap: 250,
      leading: 10,
      tags: {
        total: node => {
          totalHighlight = new Rectangle( node.bounds.dilated( 1 ), {
            fill: model.totalColorProperty.value
          } );
          return new Node( {
            children: [
              totalHighlight,
              node
            ]
          } );
        },
        left: node => {
          leftAddendHighlight = new Rectangle( node.bounds.dilated( 1 ), {
            fill: model.leftAddendColorProperty.value
          } );
          return new Node( {
            children: [
              leftAddendHighlight,
              node
            ]
          } );
        },
        right: node => {
          rightAddendHighlight = new Rectangle( node.bounds.dilated( 1 ), {
            fill: model.rightAddendColorProperty.value
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

    const titleNode = new Text( NumberPairsStrings.numberSentenceStringProperty, {
      font: NumberPairsConstants.TITLE_FONT
    } );

    const options = optionize<NumberSentenceAccordionBoxOptions, SelfOptions, TotalRepresentationAccordionBoxOptions>()( {
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