// Copyright 2025, University of Colorado Boulder

/**
 * TenScreenSummaryContent describes the play and control areas, current state, and interaction hint for every
 * Number Pairs screen. Strings are sourced from number-pairs-strings_en.yaml via NumberPairsFluent.
 *
 * TODO: Used in both Ten Screen and Twenty Screen, see https://github.com/phetsims/number-pairs/issues/314
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import derived from '../../../../axon/js/derived.js';
import derivedMap from '../../../../axon/js/derivedMap.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
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

    const representationTypeProperty = derived( model.representationTypeProperty,
      representationType => representationType === RepresentationType.NUMBER_LINE ? 'numberLine' :
                            representationType === RepresentationType.APPLES ? 'apples' :
                            representationType === RepresentationType.ONE_CARDS ? 'oneCards' :
                            'other'
    );

    const countingAreaShownProperty = NumberPairsFluent.a11y.tenScreen.screenSummary.currentDetails.countingAreaShown.createProperty( {
      count: model.totalProperty,
      itemType: itemTypeProperty,
      representationType: representationTypeProperty
    } );

    const countingAreaHiddenProperty = NumberPairsFluent.a11y.tenScreen.screenSummary.currentDetails.countingAreaHiddenStringProperty;

    const currentDetailsContentProperty = derived(
      showingAddendsProperty, countingAreaShownProperty, countingAreaHiddenProperty, model.representationTypeProperty,
      ( showingAddends, countingAreaShown, countingAreaHidden ) => {
        return showingAddends ? countingAreaShown : countingAreaHidden;
      } );

    const interactionHintContentProperty = derivedMap( model.representationTypeProperty, new Map<RepresentationType, TReadOnlyProperty<string>>( [
      [ RepresentationType.BEADS, NumberPairsFluent.a11y.tenScreen.screenSummary.interactionHint.beadsStringProperty ],
      [ RepresentationType.KITTENS, NumberPairsFluent.a11y.tenScreen.screenSummary.interactionHint.kittensStringProperty ],
      [ RepresentationType.NUMBER_LINE, NumberPairsFluent.a11y.tenScreen.screenSummary.interactionHint.numberLineStringProperty ],
      [ RepresentationType.APPLES, NumberPairsFluent.a11y.tenScreen.screenSummary.interactionHint.applesStringProperty ],
      [ RepresentationType.ONE_CARDS, NumberPairsFluent.a11y.tenScreen.screenSummary.interactionHint.applesStringProperty ]
    ] ) );

    super( {
      playAreaContent: NumberPairsFluent.a11y.tenScreen.screenSummary.playArea.createProperty( {
        representationType: representationTypeProperty,
        numberBarOrBarModel: numberBondOrBarModelStringProperty
      } ),
      controlAreaContent: NumberPairsFluent.a11y.tenScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: currentDetailsContentProperty,
      interactionHintContent: interactionHintContentProperty
    } );
  }
}

numberPairs.register( 'TenScreenSummaryContent', TenScreenSummaryContent );
