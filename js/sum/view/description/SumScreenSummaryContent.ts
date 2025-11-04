// Copyright 2025, University of Colorado Boulder

/**
 * SumScreenSummaryContent describes the play and control areas, current state, and interaction hint for the
 * Sum screen. Strings are sourced from number-pairs-strings_en.yaml via NumberPairsFluent.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import derived from '../../../../../axon/js/derived.js';
import DynamicProperty from '../../../../../axon/js/DynamicProperty.js';
import ScreenSummaryContent from '../../../../../joist/js/ScreenSummaryContent.js';
import numberPairs from '../../../numberPairs.js';
import NumberPairsFluent from '../../../NumberPairsFluent.js';
import RepresentationType from '../../../common/model/RepresentationType.js';
import { numberBondOrBarModelStringProperty } from '../../../common/view/numberBondOrBarModelStringProperty.js';
import SumModel from '../../model/SumModel.js';

export default class SumScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: SumModel ) {

    const itemTypeProperty = new DynamicProperty<string, string, RepresentationType>( model.representationTypeProperty, {
      derive: 'accessibleName'
    } );

    const representationTypeForPlayAreaProperty = model.representationTypeProperty.derived( representationType =>
      representationType === RepresentationType.NUMBER_LINE ? 'numberLine' : 'other'
    );

    const representationTypeForInteractionHintProperty = model.representationTypeProperty.derived( representationType =>
      representationType === RepresentationType.NUMBER_LINE ? 'numberLine' :
      representationType === RepresentationType.BEADS ? 'beads' :
      'kittens'
    );

    const currentDetailsProperty = NumberPairsFluent.a11y.sumScreen.screenSummary.currentDetails.createProperty( {
      total: model.totalProperty,
      itemType: itemTypeProperty,
      representationType: representationTypeForPlayAreaProperty,
      shownSides: derived( model.leftAddendVisibleProperty, model.rightAddendVisibleProperty, ( leftVisible, rightVisible ) => {
        return leftVisible && rightVisible ? 'both' : 'none';
      } )
    } );

    const interactionHintContentProperty = NumberPairsFluent.a11y.sumScreen.screenSummary.interactionHint.createProperty( {
      representationType: representationTypeForInteractionHintProperty
    } );

    super( {
      playAreaContent: NumberPairsFluent.a11y.sumScreen.screenSummary.playArea.createProperty( {
        representation: new DynamicProperty( model.representationTypeProperty, {
          derive: 'accessibleName'
        } ),
        representationType: representationTypeForPlayAreaProperty,
        numberBarOrBarModel: numberBondOrBarModelStringProperty
      } ),
      controlAreaContent: NumberPairsFluent.a11y.sumScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: currentDetailsProperty,
      interactionHintContent: interactionHintContentProperty
    } );
  }
}

numberPairs.register( 'SumScreenSummaryContent', SumScreenSummaryContent );
