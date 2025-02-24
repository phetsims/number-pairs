// Copyright 2024-2025, University of Colorado Boulder
/**
 * This accordion box contains a number sentence that describes the decomposition of a total into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import LocalizedStringProperty from '../../../../chipper/js/browser/LocalizedStringProperty.js';
import NumberSuiteCommonStrings from '../../../../number-suite-common/js/NumberSuiteCommonStrings.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import WithOptional from '../../../../phet-core/js/types/WithOptional.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import numberPairsPreferences from '../model/NumberPairsPreferences.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import TotalRepresentationAccordionBox, { TotalRepresentationAccordionBoxOptions } from './TotalRepresentationAccordionBox.js';

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
NUMBER_TO_WORD_MAP.set( 'someNumber', NumberPairsStrings.someNumberStringProperty );
NUMBER_TO_WORD_MAP.set( 'anotherNumber', NumberPairsStrings.anotherNumberStringProperty );

type SelfOptions = {
  numberPhraseStringProperty: LocalizedStringProperty;
  numberPhraseSpeechStringProperty: LocalizedStringProperty;
  speechDataProperty: TProperty<string>;
};
type NumberPhraseAccordionBoxOptions = SelfOptions & StrictOmit<TotalRepresentationAccordionBoxOptions, 'titleNode'>;

const LINE_WRAP = 240; // empirically determined
export default class NumberPhraseAccordionBox extends TotalRepresentationAccordionBox {

  // We want the accordion box to resize in the Y direction to accommodate the RichText line wrap, however the
  // width should stay the same. In order to do this we must define and control all options that contribute
  // to the width of the accordion box.
  public static readonly MIN_WIDTH = LINE_WRAP + 2 * TotalRepresentationAccordionBox.CONTENT_X_MARGIN + TotalRepresentationAccordionBox.EXPAND_COLLAPSE_SIDE_LENGTH + TotalRepresentationAccordionBox.BUTTON_X_MARGIN;

  public constructor( model: NumberPairsModel, providedOptions: NumberPhraseAccordionBoxOptions ) {

    const options = optionize<NumberPhraseAccordionBoxOptions, SelfOptions, WithOptional<TotalRepresentationAccordionBoxOptions, 'titleNode'>>()( {
      contentXMargin: 20,
      contentYMargin: 20,
      contentAlign: 'left',
      minWidth: NumberPhraseAccordionBox.MIN_WIDTH,
      maxWidth: NumberPhraseAccordionBox.MIN_WIDTH + 10,
      expandedDefaultValue: false
    }, providedOptions );

    /**
     * Create the string Properties that drive the display of the number sentence as well as the speech data.
     */
    const isPrimaryLocaleProperty = numberPairsPreferences.isPrimaryLocaleProperty;
    const secondLocaleStringsProperty = numberPairsPreferences.secondLocaleStringsProperty;

    const createNumberStringProperty = (
      numberProperty: TReadOnlyProperty<number>,
      visibleProperty: TReadOnlyProperty<boolean>,
      shellProperty: Property<string>,
      hiddenNumberKey: 'aNumber' | 'someNumber' | 'anotherNumber' ) => {

      // We want to grab the right string based on the number, visibility, primary vs. secondary locale, second locale strings.
      // and the primary locale strings. We need to listen to each individual StringProperty to make sure our
      // listeners are acting on reliable information.
      const stringPropertyDependencies = NUMBER_TO_WORD_MAP.values();
      return DerivedProperty.deriveAny( [ numberProperty, visibleProperty, isPrimaryLocaleProperty, secondLocaleStringsProperty, ...stringPropertyDependencies ],
        () => {
          const number = numberProperty.value;
          const visible = visibleProperty.value;
          const isPrimaryLocale = isPrimaryLocaleProperty.value;
          const secondLocaleStrings = secondLocaleStringsProperty.value;

          const key = visible ? number : hiddenNumberKey;
          const primaryStringProperty = NUMBER_TO_WORD_MAP.get( key );
          if ( isPrimaryLocale ) {
            return primaryStringProperty;
          }
          else {
            const secondLocaleString = secondLocaleStrings[ primaryStringProperty.localizedString.stringKey ];
            shellProperty.value = secondLocaleString ? secondLocaleString : primaryStringProperty.value;
            return shellProperty;
          }
        } );
    };

    // Shell Properties for the second locale strings to fill in.
    const secondLocaleTotalStringProperty = new Property( '' );
    const secondLocaleLeftAddendStringProperty = new Property( '' );
    const secondLocaleRightAddendStringProperty = new Property( '' );

    const totalStringProperty = createNumberStringProperty( model.totalProperty, model.totalVisibleProperty, secondLocaleTotalStringProperty, 'someNumber' );
    const leftAddendStringProperty = createNumberStringProperty( model.leftAddendProperty, model.leftAddendVisibleProperty, secondLocaleLeftAddendStringProperty, 'aNumber' );
    const rightAddendStringProperty = createNumberStringProperty( model.rightAddendProperty, model.rightAddendVisibleProperty, secondLocaleRightAddendStringProperty, 'anotherNumber' );

    // Nest these in a DynamicProperty to abstract any additional listeners needed to account for translation.
    const totalDynamicProperty = new DynamicProperty( totalStringProperty );
    const leftAddendDynamicProperty = new DynamicProperty( leftAddendStringProperty );
    const rightAddendDynamicProperty = new DynamicProperty( rightAddendStringProperty );

    // Create the PatternStringProperties for primary and secondary locales.
    const primaryLocalePatternStringProperty = new PatternStringProperty( options.numberPhraseStringProperty, {
      total: totalDynamicProperty,
      leftAddend: leftAddendDynamicProperty,
      rightAddend: rightAddendDynamicProperty
    } );
    const secondaryLocaleStringProperty = new DerivedProperty( [ secondLocaleStringsProperty, options.numberPhraseStringProperty ],
      ( secondLocaleStrings, numberPhraseString ) => {
        const secondLocaleString = secondLocaleStrings[ options.numberPhraseSpeechStringProperty.localizedString.stringKey ];

        // If the secondLocaleString is not defined, default to the primary locale string.
        return secondLocaleString ? secondLocaleString : numberPhraseString;
      } );
    const secondaryLocalePatternStringProperty = new PatternStringProperty( secondaryLocaleStringProperty, {
      total: totalDynamicProperty,
      leftAddend: leftAddendDynamicProperty,
      rightAddend: rightAddendDynamicProperty
    } );

    // This is the final Property that the RichText will listen to. At this point all decisions about what locale
    // to display based on translation have been filtered down.
    const numberPhraseStringProperty = new DerivedProperty( [
      isPrimaryLocaleProperty,
      primaryLocalePatternStringProperty,
      secondaryLocalePatternStringProperty
    ], isPrimaryLocale => {
      return isPrimaryLocale ? primaryLocalePatternStringProperty.value : secondaryLocalePatternStringProperty.value;
    } );

    let totalHighlight: Rectangle;
    let leftAddendHighlight: Rectangle;
    let rightAddendHighlight: Rectangle;
    const richText = new RichText( numberPhraseStringProperty, {
      lineWrap: LINE_WRAP,
      maxHeight: 125,
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

    /**
     * Update the speech data
     */
    const primaryLocaleSpeechPatternStringProperty = new PatternStringProperty( options.numberPhraseSpeechStringProperty, {
      total: totalDynamicProperty,
      leftAddend: leftAddendDynamicProperty,
      rightAddend: rightAddendDynamicProperty
    } );
    const secondaryLocaleSpeechStringProperty = new DerivedProperty( [ secondLocaleStringsProperty, options.numberPhraseSpeechStringProperty ],
      ( secondLocaleStrings, numberPhraseSpeechString ) => {
        const secondLocaleString = secondLocaleStrings[ options.numberPhraseSpeechStringProperty.localizedString.stringKey ];

        // If the secondLocaleString is not defined, default to the primary locale string.
        return secondLocaleString ? secondLocaleString : numberPhraseSpeechString;
      } );
    const secondaryLocaleSpeechPatternStringProperty = new PatternStringProperty( secondaryLocaleSpeechStringProperty, {
      total: totalDynamicProperty,
      leftAddend: leftAddendDynamicProperty,
      rightAddend: rightAddendDynamicProperty
    } );
    Multilink.multilink( [ isPrimaryLocaleProperty, primaryLocaleSpeechPatternStringProperty, secondaryLocaleSpeechPatternStringProperty ],
      ( isPrimaryLocale, primaryLocaleSpeechPattern, secondaryLocaleSpeechPattern ) => {
        options.speechDataProperty.value = isPrimaryLocale ? primaryLocaleSpeechPattern : secondaryLocaleSpeechPattern;
      } );

    /**
     * Update the highlight colors as the counting representation changes.
     */
    model.totalColorProperty.link( color => {
      totalHighlight.fill = color;
    } );
    model.leftAddendColorProperty.link( color => {
      leftAddendHighlight.fill = color;
    } );
    model.rightAddendColorProperty.link( color => {
      rightAddendHighlight.fill = color;
    } );

    options.titleNode = new Text( NumberPairsStrings.numberPhraseStringProperty, NumberPairsConstants.ACCORDION_BOX_TITLE_OPTIONS );

    super( richText, options );
  }
}

numberPairs.register( 'NumberPhraseAccordionBox', NumberPhraseAccordionBox );