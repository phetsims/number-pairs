// Copyright 2024-2025, University of Colorado Boulder
/**
 * This accordion box contains a phrase that describes the decomposition of a total into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import TProperty from '../../../../axon/js/TProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import FluentConstant from '../../../../chipper/js/browser/FluentConstant.js';
import LocalizedStringProperty from '../../../../chipper/js/browser/LocalizedStringProperty.js';
import NumberSuiteCommonStrings from '../../../../number-suite-common/js/NumberSuiteCommonStrings.js';
import optionize, { EmptySelfOptions, optionize3 } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import WithOptional from '../../../../phet-core/js/types/WithOptional.js';
import FlowBox from '../../../../scenery/js/layout/nodes/FlowBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text, { TextOptions } from '../../../../scenery/js/nodes/Text.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsPreferences from '../model/NumberPairsPreferences.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import TotalRepresentationAccordionBox, { TotalRepresentationAccordionBoxOptions } from './TotalRepresentationAccordionBox.js';

const NUMBER_TO_WORD_MAP = new Map<number | 'aNumber' | 'someNumber' | 'anotherNumber', LocalizedStringProperty | FluentConstant>();
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
NUMBER_TO_WORD_MAP.set( 'aNumber', NumberPairsFluent.aNumberStringProperty );
NUMBER_TO_WORD_MAP.set( 'someNumber', NumberPairsFluent.someNumberStringProperty );
NUMBER_TO_WORD_MAP.set( 'anotherNumber', NumberPairsFluent.anotherNumberStringProperty );

type SelfOptions = {
  phraseStringProperty: LocalizedStringProperty;
  phraseSpeechStringProperty: LocalizedStringProperty;
  speechDataProperty: TProperty<string>;
};
type PhraseAccordionBoxOptions = SelfOptions & StrictOmit<TotalRepresentationAccordionBoxOptions, 'titleNode'>;

const LINE_WRAP = 250; // empirically determined
export default class PhraseAccordionBox extends TotalRepresentationAccordionBox {

  // We want the accordion box to resize in the Y direction to accommodate the RichText line wrap, however the
  // width should stay the same. In order to do this we must define and control all options that contribute
  // to the width of the accordion box.
  public static readonly WIDTH = LINE_WRAP + 2 * TotalRepresentationAccordionBox.CONTENT_X_MARGIN + TotalRepresentationAccordionBox.EXPAND_COLLAPSE_SIDE_LENGTH + TotalRepresentationAccordionBox.BUTTON_X_MARGIN;

  public constructor( model: NumberPairsModel, providedOptions: PhraseAccordionBoxOptions ) {

    const options = optionize<PhraseAccordionBoxOptions, SelfOptions, WithOptional<TotalRepresentationAccordionBoxOptions, 'titleNode'>>()( {
      contentXMargin: 20,
      contentYMargin: 20,
      contentAlign: 'left',
      minWidth: PhraseAccordionBox.WIDTH,
      maxWidth: PhraseAccordionBox.WIDTH,
      expandedDefaultValue: false
    }, providedOptions );

    /**
     * Create the string Properties that drive the display of the number sentence as well as the speech data.
     */
    const isPrimaryLocaleProperty = NumberPairsPreferences.isPrimaryLocaleProperty;
    const secondLocaleProperty = NumberPairsPreferences.secondLocaleProperty;

    const createNumberStringProperty = (
      numberProperty: TReadOnlyProperty<number>,
      visibleProperty: TReadOnlyProperty<boolean>,
      hiddenNumberKey: 'aNumber' | 'someNumber' | 'anotherNumber' ): TReadOnlyProperty<string> => {

      // We want to grab the right string based on the number, visibility, primary vs. secondary locale, second locale strings.
      // and the primary locale strings. We need to listen to each individual StringProperty to make sure our
      // listeners are acting on reliable information.
      const stringPropertyDependencies = NUMBER_TO_WORD_MAP.values();
      return new DynamicProperty( DerivedProperty.deriveAny( [ numberProperty, visibleProperty, isPrimaryLocaleProperty, secondLocaleProperty, ...stringPropertyDependencies ],
        () => {
          const number = numberProperty.value;
          const visible = visibleProperty.value;
          const isPrimaryLocale = isPrimaryLocaleProperty.value;

          const key = visible ? number : hiddenNumberKey;
          const primaryStringProperty = NUMBER_TO_WORD_MAP.get( key );
          if ( isPrimaryLocale ) {
            return primaryStringProperty;
          }
          else {
            return primaryStringProperty?.getTranslatedStringProperty( secondLocaleProperty.value ) ?? primaryStringProperty;
          }
        } ) );
    };

    const totalDynamicProperty = createNumberStringProperty( model.totalProperty, model.totalVisibleProperty, 'someNumber' );
    const leftAddendDynamicProperty = createNumberStringProperty( model.leftAddendProperty, model.leftAddendVisibleProperty, 'aNumber' );
    const rightAddendDynamicProperty = createNumberStringProperty( model.rightAddendProperty, model.rightAddendVisibleProperty, 'anotherNumber' );

    // Create the PatternStringProperties for primary and secondary locales.
    const primaryLocalePatternStringProperty = new PatternStringProperty( options.phraseStringProperty, {
      total: totalDynamicProperty,
      leftAddend: leftAddendDynamicProperty,
      rightAddend: rightAddendDynamicProperty
    } );
    const secondaryLocaleStringProperty: TReadOnlyProperty<string> = new DynamicProperty( new DerivedProperty( [ secondLocaleProperty ], secondLocale => {
      return options.phraseStringProperty.getTranslatedStringProperty( secondLocale );
    } ) );
    const secondaryLocalePatternStringProperty = new PatternStringProperty( secondaryLocaleStringProperty, {
      total: totalDynamicProperty,
      leftAddend: leftAddendDynamicProperty,
      rightAddend: rightAddendDynamicProperty
    } );

    // This is the final Property that the RichText will listen to. At this point all decisions about what locale
    // to display based on translation have been filtered down.
    const phraseStringProperty = new DerivedProperty( [
      isPrimaryLocaleProperty,
      primaryLocalePatternStringProperty,
      secondaryLocalePatternStringProperty
    ], ( isPrimaryLocale, primaryLocalePatternString, secondaryLocalePatternString ) => {
      return isPrimaryLocale ? primaryLocalePatternString : secondaryLocalePatternString;
    } );

    let totalHighlight: Rectangle;
    let leftAddendHighlight: Rectangle;
    let rightAddendHighlight: Rectangle;
    const richText = new RichText( phraseStringProperty, {
      lineWrap: LINE_WRAP,
      maxHeight: 115,
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
    const phraseNode = new FlowBox( {
      children: [ richText ],
      minContentHeight: 70,
      align: 'top'
    } );

    /**
     * Update the speech data
     */
    const primaryLocaleSpeechPatternStringProperty = new PatternStringProperty( options.phraseSpeechStringProperty, {
      total: totalDynamicProperty,
      leftAddend: leftAddendDynamicProperty,
      rightAddend: rightAddendDynamicProperty
    } );
    const secondaryLocaleSpeechStringProperty: TReadOnlyProperty<string> = new DynamicProperty( new DerivedProperty( [ secondLocaleProperty ], secondLocale => {
      return options.phraseSpeechStringProperty.getTranslatedStringProperty( secondLocale );
    } ) );
    const secondaryLocaleSpeechPatternStringProperty = new PatternStringProperty( secondaryLocaleSpeechStringProperty, {
      total: totalDynamicProperty,
      leftAddend: leftAddendDynamicProperty,
      rightAddend: rightAddendDynamicProperty
    } );
    Multilink.multilink( [ isPrimaryLocaleProperty, primaryLocaleSpeechPatternStringProperty, secondaryLocaleSpeechPatternStringProperty,
        model.leftAddendProperty, model.rightAddendProperty, model.totalProperty ],
      ( isPrimaryLocale, primaryLocaleSpeechPattern, secondaryLocaleSpeechPattern, leftAddend, rightAddend, total ) => {

        // We only want to update the speechDataProperty if the math checks out.
        if ( leftAddend + rightAddend === total ) {
          options.speechDataProperty.value = isPrimaryLocale ? primaryLocaleSpeechPattern : secondaryLocaleSpeechPattern;
        }
      } );

    /**
     * Update the highlight colors as the counting representation changes.
     * Ensure that the highlights exist in scenarios where translations or string changes remove the appropriate tags.
     */
    model.totalColorProperty.link( color => {
      if ( totalHighlight ) {
        totalHighlight.fill = color;
      }
    } );
    model.leftAddendColorProperty.link( color => {
      if ( leftAddendHighlight ) {
        leftAddendHighlight.fill = color;
      }
    } );
    model.rightAddendColorProperty.link( color => {
      if ( rightAddendHighlight ) {
        rightAddendHighlight.fill = color;
      }
    } );

    const titleTextOptions = optionize3<TextOptions, EmptySelfOptions, TextOptions>()( {},
      NumberPairsConstants.ACCORDION_BOX_TITLE_OPTIONS, {
        // The accordion box itself has a maxWidth. Having both defined causes the scaling down to compound. Therefore, we
        // want to only define the maxWidth of the accordion box.
        maxWidth: null
      } );
    options.titleNode = new Text( NumberPairsFluent.phraseStringProperty, titleTextOptions );

    super( phraseNode, options );
  }
}

numberPairs.register( 'PhraseAccordionBox', PhraseAccordionBox );