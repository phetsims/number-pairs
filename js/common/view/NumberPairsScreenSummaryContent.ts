// Copyright 2025, University of Colorado Boulder

/**
 * NumberPairsScreenSummaryContent describes the play and control areas, current state, and interaction hint for every
 * Number Pairs screen. Strings are sourced from number-pairs-strings_en.yaml via NumberPairsFluent.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import derived from '../../../../axon/js/derived.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import NumberPairsModel from '../model/NumberPairsModel.js';

export default class NumberPairsScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: NumberPairsModel ) {

    const objectsPatternStringProperty = NumberPairsFluent.a11y.screenSummary.currentDetails.objectsPattern.createProperty( {
      count: model.totalProperty
    } );

    const hiddenLeftStringProperty = NumberPairsFluent.a11y.screenSummary.currentDetails.hiddenAreaPattern.createProperty( {
      hiddenAddend: NumberPairsFluent.a11y.leftStringProperty
    } );

    const hiddenRightStringProperty = NumberPairsFluent.a11y.screenSummary.currentDetails.hiddenAreaPattern.createProperty( {
      hiddenAddend: NumberPairsFluent.a11y.rightStringProperty
    } );

    const currentDetailsContentProperty = derived(
      model.leftAddendVisibleProperty,
      model.rightAddendVisibleProperty,
      objectsPatternStringProperty,
      hiddenLeftStringProperty,
      hiddenRightStringProperty,
      NumberPairsFluent.a11y.screenSummary.currentDetails.bothHiddenStringProperty,
      ( leftVisible, rightVisible, objectsString, hiddenLeftString, hiddenRightString, bothHiddenString ) => {
        if ( leftVisible && rightVisible ) {
          return objectsString;
        }
        else if ( leftVisible && !rightVisible ) {
          return hiddenRightString;
        }
        else if ( !leftVisible && rightVisible ) {
          return hiddenLeftString;
        }
        else {
          return bothHiddenString;
        }
      } );

    super( {
      playAreaContent: NumberPairsFluent.a11y.screenSummary.playAreaStringProperty,
      controlAreaContent: NumberPairsFluent.a11y.screenSummary.controlAreaStringProperty,
      currentDetailsContent: currentDetailsContentProperty,
      interactionHintContent: NumberPairsFluent.a11y.screenSummary.interactionHintStringProperty
    } );
  }
}

numberPairs.register( 'NumberPairsScreenSummaryContent', NumberPairsScreenSummaryContent );
