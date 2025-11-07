// Copyright 2025, University of Colorado Boulder

/**
 * IntroScreenSummaryContent describes the play and control areas, current state, and interaction hint for every
 * Number Pairs screen. Strings are sourced from number-pairs-strings_en.yaml via NumberPairsFluent.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import derived from '../../../../axon/js/derived.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import NumberPairsModel from '../../common/model/NumberPairsModel.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import { numberBondOrBarModelStringProperty } from '../../common/view/numberBondOrBarModelStringProperty.js';

export default class IntroScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: NumberPairsModel ) {

    const objectsPatternStringProperty = NumberPairsFluent.a11y.introScreen.screenSummary.currentDetails.objectsPattern.createProperty( {
      total: model.totalProperty
    } );

    const hiddenLeftStringProperty = NumberPairsFluent.a11y.introScreen.screenSummary.currentDetails.hiddenAreaPattern.createProperty( {
      hiddenAddend: NumberPairsFluent.a11y.leftStringProperty,
      total: model.totalProperty
    } );

    const hiddenRightStringProperty = NumberPairsFluent.a11y.introScreen.screenSummary.currentDetails.hiddenAreaPattern.createProperty( {
      hiddenAddend: NumberPairsFluent.a11y.rightStringProperty,
      total: model.totalProperty
    } );
    const bothHiddenStringProperty = NumberPairsFluent.a11y.introScreen.screenSummary.currentDetails.bothHidden.createProperty( {
      total: model.totalProperty
    } );

    const currentDetailsContentProperty = derived(
      model.leftAddendVisibleProperty,
      model.rightAddendVisibleProperty,
      objectsPatternStringProperty,
      hiddenLeftStringProperty,
      hiddenRightStringProperty,
      bothHiddenStringProperty,
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
      playAreaContent: NumberPairsFluent.a11y.introScreen.screenSummary.playArea.createProperty( { numberBondOrBarModel: numberBondOrBarModelStringProperty } ),
      controlAreaContent: NumberPairsFluent.a11y.introScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: currentDetailsContentProperty,
      interactionHintContent: NumberPairsFluent.a11y.introScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

numberPairs.register( 'IntroScreenSummaryContent', IntroScreenSummaryContent );
