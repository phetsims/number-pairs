// Copyright 2025, University of Colorado Boulder

/**
 * TenScreenSummaryContent describes the play and control areas, current state, and interaction hint for every
 * Number Pairs screen. Strings are sourced from number-pairs-strings_en.yaml via NumberPairsFluent.
 *
 * TODO: Used in both Ten Screen and Twenty Screen, see https://github.com/phetsims/number-pairs/issues/314
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import derived from '../../../../axon/js/derived.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import { numberBondOrBarModelStringProperty } from '../../common/view/numberBondOrBarModelStringProperty.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import TenModel from '../model/TenModel.js';

export default class TenScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: TenModel ) {

    const itemTypeProperty = new DynamicProperty<string, string, RepresentationType>( model.representationTypeProperty, {
      derive: 'accessibleName'
    } );

    const representationTypeProperty = derived( model.representationTypeProperty,
      representationType => representationType === RepresentationType.NUMBER_LINE ? 'numberLine' :
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

numberPairs.register( 'TenScreenSummaryContent', TenScreenSummaryContent );
