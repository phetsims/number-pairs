// Copyright 2025, University of Colorado Boulder

/**
 * TenScreenSummaryContent describes the play and control areas, current state, and interaction hint for every
 * Number Pairs screen. Strings are sourced from number-pairs-strings_en.yaml via NumberPairsFluent.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import derived from '../../../../axon/js/derived.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import TenModel from '../model/TenModel.js';
import { numberBondOrBarModelStringProperty } from '../../common/view/numberBondOrBarModelStringProperty.js';

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

    const countingAreaHiddenProperty = NumberPairsFluent.a11y.tenScreen.screenSummary.currentDetails.countingAreaHidden.createProperty( {
      numberBarOrBarModel: numberBondOrBarModelStringProperty
    } );

    const currentDetailsContentProperty = derived( showingAddendsProperty, countingAreaShownProperty, countingAreaHiddenProperty, ( showingAddends, countingAreaShown, countingAreaHidden ) => {
      return showingAddends ? countingAreaShown : countingAreaHidden;
    } );

    const interactionHintContentProperty = derived( model.representationTypeProperty,
      NumberPairsFluent.a11y.tenScreen.screenSummary.interactionHint.beadsStringProperty,
      NumberPairsFluent.a11y.tenScreen.screenSummary.interactionHint.kittensStringProperty,
      NumberPairsFluent.a11y.tenScreen.screenSummary.interactionHint.numberLineStringProperty, ( type, beadsString, kittensString, numberLineString ) => {
        return type === RepresentationType.BEADS ? beadsString :
               type === RepresentationType.KITTENS ? kittensString :
               numberLineString;
      } );

    super( {
      playAreaContent: NumberPairsFluent.a11y.tenScreen.screenSummary.playArea.createProperty( { numberBarOrBarModel: numberBondOrBarModelStringProperty } ),
      controlAreaContent: NumberPairsFluent.a11y.tenScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: currentDetailsContentProperty,
      interactionHintContent: interactionHintContentProperty
    } );
  }
}

numberPairs.register( 'TenScreenSummaryContent', TenScreenSummaryContent );
