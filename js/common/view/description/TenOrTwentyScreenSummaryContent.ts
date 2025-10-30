// Copyright 2025, University of Colorado Boulder

/**
 * TenOrTwentyScreenSummaryContent describes the play and control areas, current state, and interaction hint for every
 * Number Pairs screen. Strings are sourced from number-pairs-strings_en.yaml via NumberPairsFluent.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import derived from '../../../../../axon/js/derived.js';
import DynamicProperty from '../../../../../axon/js/DynamicProperty.js';
import ScreenSummaryContent from '../../../../../joist/js/ScreenSummaryContent.js';
import numberPairs from '../../../numberPairs.js';
import NumberPairsFluent from '../../../NumberPairsFluent.js';
import TenModel from '../../../ten/model/TenModel.js';
import RepresentationType from '../../model/RepresentationType.js';
import { numberBondOrBarModelStringProperty } from '../numberBondOrBarModelStringProperty.js';

export default class TenOrTwentyScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: TenModel ) {

    const itemTypeProperty = new DynamicProperty<string, string, RepresentationType>( model.representationTypeProperty, {
      derive: 'accessibleName'
    } );

    const representationTypeProperty = model.representationTypeProperty.derived( representationType =>
      representationType === RepresentationType.NUMBER_LINE ? 'numberLine' :
      representationType === RepresentationType.BEADS ? 'beads' :
      representationType === RepresentationType.KITTENS ? 'kittens' :
      'location' // Location representation all use the same description.
    );

    const currentDetailsProperty = NumberPairsFluent.a11y.tenScreen.screenSummary.currentDetails.createProperty( {
      count: model.totalProperty,
      itemType: itemTypeProperty,
      representationType: representationTypeProperty,
      shownSides: derived( model.leftAddendVisibleProperty, model.rightAddendVisibleProperty, ( leftVisible, rightVisible ) => {
        return leftVisible && !rightVisible ? 'left' :
               !leftVisible && rightVisible ? 'right' :
               leftVisible && rightVisible ? 'both' :
               'none';
      } )
    } );

    const interactionHintContentProperty = NumberPairsFluent.a11y.tenScreen.screenSummary.interactionHint.createProperty( {
      representationType: representationTypeProperty
    } );

    super( {
      playAreaContent: NumberPairsFluent.a11y.tenScreen.screenSummary.playArea.createProperty( {
        representationType: representationTypeProperty,
        numberBarOrBarModel: numberBondOrBarModelStringProperty
      } ),
      controlAreaContent: NumberPairsFluent.a11y.tenScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: currentDetailsProperty,
      interactionHintContent: interactionHintContentProperty
    } );
  }
}

numberPairs.register( 'TenOrTwentyScreenSummaryContent', TenOrTwentyScreenSummaryContent );
