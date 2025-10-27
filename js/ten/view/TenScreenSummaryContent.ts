// Copyright 2025, University of Colorado Boulder

/**
 * TenScreenSummaryContent describes the play and control areas, current state, and interaction hint for every
 * Number Pairs screen. Strings are sourced from number-pairs-strings_en.yaml via NumberPairsFluent.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import derived from '../../../../axon/js/derived.js';
import derivedMap from '../../../../axon/js/derivedMap.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import { numberBondOrBarModelStringProperty } from '../../common/view/numberBondOrBarModelStringProperty.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import TenModel from '../model/TenModel.js';

export default class TenScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: TenModel, showingAddendsProperty: BooleanProperty ) {

    const itemTypeProperty = new DynamicProperty<string, string, RepresentationType>( model.representationTypeProperty, {
      derive: 'accessibleName'
    } );
    const countingAreaShownProperty = NumberPairsFluent.a11y.tenScreen.screenSummary.currentDetails.countingAreaShown.createProperty( {
      count: model.totalProperty,
      itemType: itemTypeProperty,
      numberBarOrBarModel: numberBondOrBarModelStringProperty
    } );
    const numberLineShownProperty = NumberPairsFluent.a11y.tenScreen.screenSummary.currentDetails.countingAreaShownWithNumberLine.createProperty( {
      numberBarOrBarModel: numberBondOrBarModelStringProperty,
      count: model.totalProperty
    } );

    const countingAreaHiddenProperty = NumberPairsFluent.a11y.tenScreen.screenSummary.currentDetails.countingAreaHidden.createProperty( {
      numberBarOrBarModel: numberBondOrBarModelStringProperty
    } );

    const currentDetailsContentProperty = derived(
      showingAddendsProperty, countingAreaShownProperty, countingAreaHiddenProperty, model.representationTypeProperty, numberLineShownProperty,
      ( showingAddends, countingAreaShown, countingAreaHidden, representationType, numberLineText ) => {
        const shownProperty = representationType === RepresentationType.NUMBER_LINE ? numberLineText : countingAreaShown;
        return showingAddends ? shownProperty : countingAreaHidden;
      } );

    const interactionHintContentProperty = derivedMap( model.representationTypeProperty, new Map( [
      [ RepresentationType.BEADS, NumberPairsFluent.a11y.tenScreen.screenSummary.interactionHint.beadsStringProperty ],
      [ RepresentationType.KITTENS, NumberPairsFluent.a11y.tenScreen.screenSummary.interactionHint.kittensStringProperty ],
      [ RepresentationType.NUMBER_LINE, NumberPairsFluent.a11y.tenScreen.screenSummary.interactionHint.numberLineStringProperty ]
    ] ) );

    const firstSentenceProperty = derived(
      model.representationTypeProperty,
      NumberPairsFluent.a11y.tenScreen.screenSummary.playArea.numberLineStringProperty,
      NumberPairsFluent.a11y.tenScreen.screenSummary.playArea.otherStringProperty,
      ( representationType, numberLineString, otherString ) => {
        return representationType === RepresentationType.NUMBER_LINE ? numberLineString : otherString;
      } );
    super( {
      playAreaContent: NumberPairsFluent.a11y.tenScreen.screenSummary.playArea.description.createProperty( {
        firstSentence: firstSentenceProperty,
        numberBarOrBarModel: numberBondOrBarModelStringProperty
      } ),
      controlAreaContent: NumberPairsFluent.a11y.tenScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: currentDetailsContentProperty,
      interactionHintContent: interactionHintContentProperty
    } );
  }
}

numberPairs.register( 'TenScreenSummaryContent', TenScreenSummaryContent );
