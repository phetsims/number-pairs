// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from number-pairs-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import { TReadOnlyProperty } from '../../axon/js/TReadOnlyProperty.js';
import type { FluentVariable } from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentComment from '../../chipper/js/browser/FluentComment.js';
import numberPairs from './numberPairs.js';
import NumberPairsStrings from './NumberPairsStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, path: string ) => {
  const sp = _.get( NumberPairsStrings, path );
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'number_pairs_title', 'number-pairs.titleStringProperty' );
addToMapIfDefined( 'screen_intro', 'screen.introStringProperty' );
addToMapIfDefined( 'screen_ten', 'screen.tenStringProperty' );
addToMapIfDefined( 'screen_twenty', 'screen.twentyStringProperty' );
addToMapIfDefined( 'screen_sum', 'screen.sumStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_objectHeading', 'keyboardHelpDialog.objectHeadingStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_object', 'keyboardHelpDialog.objectStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_beadHeading', 'keyboardHelpDialog.beadHeadingStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_bead', 'keyboardHelpDialog.beadStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_countingObjectOrBeadHeading', 'keyboardHelpDialog.countingObjectOrBeadHeadingStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_countingObjectOrBead', 'keyboardHelpDialog.countingObjectOrBeadStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_introScreen_moveGrabbableItemHeading', 'keyboardHelpDialog.introScreen.moveGrabbableItemHeadingStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_tenScreen_moveGrabbableItemHeading', 'keyboardHelpDialog.tenScreen.moveGrabbableItemHeadingStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_twentyScreen_moveGrabbableItemHeading', 'keyboardHelpDialog.twentyScreen.moveGrabbableItemHeadingStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_sumScreen_moveGrabbableItemHeading', 'keyboardHelpDialog.sumScreen.moveGrabbableItemHeadingStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_jumpToLastKitten', 'keyboardHelpDialog.jumpToLastKittenStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_jumpToFirstKitten', 'keyboardHelpDialog.jumpToFirstKittenStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_changeKittenColor', 'keyboardHelpDialog.changeKittenColorStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_kittenSectionHeading', 'keyboardHelpDialog.kittenSectionHeadingStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveGrabbedObjectToOppositeSide', 'keyboardHelpDialog.moveGrabbedObjectToOppositeSideStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveBeadsToOppositeSide', 'keyboardHelpDialog.moveBeadsToOppositeSideStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_adjustObjectsTitle', 'keyboardHelpDialog.adjustObjectsTitleStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_numberOfObjects', 'keyboardHelpDialog.numberOfObjectsStringProperty' );
addToMapIfDefined( 'phrase', 'phraseStringProperty' );
addToMapIfDefined( 'numberBond', 'numberBondStringProperty' );
addToMapIfDefined( 'barModel', 'barModelStringProperty' );
addToMapIfDefined( 'equation', 'equationStringProperty' );
addToMapIfDefined( 'aNumber', 'aNumberStringProperty' );
addToMapIfDefined( 'someNumber', 'someNumberStringProperty' );
addToMapIfDefined( 'anotherNumber', 'anotherNumberStringProperty' );
addToMapIfDefined( 'addends', 'addendsStringProperty' );
addToMapIfDefined( 'tickNumbers', 'tickNumbersStringProperty' );
addToMapIfDefined( 'totalJump', 'totalJumpStringProperty' );
addToMapIfDefined( 'total', 'totalStringProperty' );
addToMapIfDefined( 'automaticallyHearPhrase', 'automaticallyHearPhraseStringProperty' );
addToMapIfDefined( 'automaticallyHearPhraseDescription', 'automaticallyHearPhraseDescriptionStringProperty' );
addToMapIfDefined( 'numberModelType', 'numberModelTypeStringProperty' );
addToMapIfDefined( 'numberModelTypeDescription', 'numberModelTypeDescriptionStringProperty' );
addToMapIfDefined( 'sumScreenNumberModelOrientation', 'sumScreenNumberModelOrientationStringProperty' );
addToMapIfDefined( 'sumScreenNumberModelOrientationDescription', 'sumScreenNumberModelOrientationDescriptionStringProperty' );
addToMapIfDefined( 'a11y_yellow', 'a11y.yellowStringProperty' );
addToMapIfDefined( 'a11y_blue', 'a11y.blueStringProperty' );
addToMapIfDefined( 'a11y_left', 'a11y.leftStringProperty' );
addToMapIfDefined( 'a11y_right', 'a11y.rightStringProperty' );
addToMapIfDefined( 'a11y_home', 'a11y.homeStringProperty' );
addToMapIfDefined( 'a11y_end', 'a11y.endStringProperty' );
addToMapIfDefined( 'a11y_phrase_accessibleName', 'a11y.phrase.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_phrase_accessibleHelpText', 'a11y.phrase.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_representationType_accessibleName', 'a11y.representationType.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_representationType_accessibleHelpText', 'a11y.representationType.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_apples_accessibleName', 'a11y.apples.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_apples_singularAccessibleName', 'a11y.apples.singularAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_soccerBalls_accessibleName', 'a11y.soccerBalls.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_soccerBalls_singularAccessibleName', 'a11y.soccerBalls.singularAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_butterflies_accessibleName', 'a11y.butterflies.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_butterflies_singularAccessibleName', 'a11y.butterflies.singularAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_ones_accessibleName', 'a11y.ones.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_ones_singularAccessibleName', 'a11y.ones.singularAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_locationCountingObjects_accessibleName', 'a11y.locationCountingObjects.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_locationCountingObjects_accessibleHelpText', 'a11y.locationCountingObjects.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_kittens_accessibleName', 'a11y.kittens.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_kittens_changeColorAccessibleName', 'a11y.kittens.changeColorAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_kittens_blueKitten', 'a11y.kittens.blueKittenStringProperty' );
addToMapIfDefined( 'a11y_kittens_yellowKitten', 'a11y.kittens.yellowKittenStringProperty' );
addToMapIfDefined( 'a11y_kittens_accessibleHelpText', 'a11y.kittens.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_kittens_jumpToFirstLabelInnerContent', 'a11y.kittens.jumpToFirstLabelInnerContentStringProperty' );
addToMapIfDefined( 'a11y_kittens_jumpToLastLabelInnerContent', 'a11y.kittens.jumpToLastLabelInnerContentStringProperty' );
addToMapIfDefined( 'a11y_kittens_changeColorLabelInnerContent', 'a11y.kittens.changeColorLabelInnerContentStringProperty' );
addToMapIfDefined( 'a11y_beads_accessibleName', 'a11y.beads.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_beads_singularAccessibleName', 'a11y.beads.singularAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_beads_accessibleHelpText', 'a11y.beads.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_numberLine_accessibleName', 'a11y.numberLine.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_numberLine_countOn', 'a11y.numberLine.countOnStringProperty' );
addToMapIfDefined( 'a11y_numberLine_countFromZero', 'a11y.numberLine.countFromZeroStringProperty' );
addToMapIfDefined( 'a11y_total_totalOnTop', 'a11y.total.totalOnTopStringProperty' );
addToMapIfDefined( 'a11y_total_totalOnBottom', 'a11y.total.totalOnBottomStringProperty' );
addToMapIfDefined( 'a11y_total_totalNumberPattern', 'a11y.total.totalNumberPatternStringProperty' );
addToMapIfDefined( 'a11y_total_accessibleHelpText', 'a11y.total.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_total_chooseTotalAccessibleHelpText', 'a11y.total.chooseTotalAccessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_organizeObjects_accessibleName', 'a11y.controls.organizeObjects.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_organizeObjects_accessibleHelpText', 'a11y.controls.organizeObjects.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_swapAddends_accessibleName', 'a11y.controls.swapAddends.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_showAddend_accessibleName', 'a11y.controls.showAddend.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_hideAddend_accessibleName', 'a11y.controls.hideAddend.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_showAddends_accessibleName', 'a11y.controls.showAddends.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_hideAddends_accessibleName', 'a11y.controls.hideAddends.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_yellowObjects_accessibleName', 'a11y.controls.yellowObjects.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_blueObjects_accessibleName', 'a11y.controls.blueObjects.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_countingObjectControl_accessibleHelpText', 'a11y.controls.countingObjectControl.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_navigate_accessibleName', 'a11y.controls.navigate.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_move_accessibleName', 'a11y.controls.move.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_moveAcrossDescription_labelInnerContent', 'a11y.controls.moveAcrossDescription.labelInnerContentStringProperty' );
addToMapIfDefined( 'a11y_controls_adjustObjectsKeyboard_labelInnerContent', 'a11y.controls.adjustObjectsKeyboard.labelInnerContentStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${stringProperty.value.replace('\n','\n ')}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const NumberPairsFluent = {
  "number-pairs": {
    titleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'number_pairs_title', _.get( NumberPairsStrings, 'number-pairs.titleStringProperty' ) )
  },
  screen: {
    introStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_intro', _.get( NumberPairsStrings, 'screen.introStringProperty' ) ),
    tenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_ten', _.get( NumberPairsStrings, 'screen.tenStringProperty' ) ),
    twentyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_twenty', _.get( NumberPairsStrings, 'screen.twentyStringProperty' ) ),
    sumStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_sum', _.get( NumberPairsStrings, 'screen.sumStringProperty' ) )
  },
  keyboardHelpDialog: {
    objectHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_objectHeading', _.get( NumberPairsStrings, 'keyboardHelpDialog.objectHeadingStringProperty' ) ),
    objectStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_object', _.get( NumberPairsStrings, 'keyboardHelpDialog.objectStringProperty' ) ),
    beadHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_beadHeading', _.get( NumberPairsStrings, 'keyboardHelpDialog.beadHeadingStringProperty' ) ),
    beadStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_bead', _.get( NumberPairsStrings, 'keyboardHelpDialog.beadStringProperty' ) ),
    countingObjectOrBeadHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_countingObjectOrBeadHeading', _.get( NumberPairsStrings, 'keyboardHelpDialog.countingObjectOrBeadHeadingStringProperty' ) ),
    countingObjectOrBeadStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_countingObjectOrBead', _.get( NumberPairsStrings, 'keyboardHelpDialog.countingObjectOrBeadStringProperty' ) ),
    introScreen: {
      moveGrabbableItemHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_introScreen_moveGrabbableItemHeading', _.get( NumberPairsStrings, 'keyboardHelpDialog.introScreen.moveGrabbableItemHeadingStringProperty' ) )
    },
    tenScreen: {
      moveGrabbableItemHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_tenScreen_moveGrabbableItemHeading', _.get( NumberPairsStrings, 'keyboardHelpDialog.tenScreen.moveGrabbableItemHeadingStringProperty' ) )
    },
    twentyScreen: {
      moveGrabbableItemHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_twentyScreen_moveGrabbableItemHeading', _.get( NumberPairsStrings, 'keyboardHelpDialog.twentyScreen.moveGrabbableItemHeadingStringProperty' ) )
    },
    sumScreen: {
      moveGrabbableItemHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_sumScreen_moveGrabbableItemHeading', _.get( NumberPairsStrings, 'keyboardHelpDialog.sumScreen.moveGrabbableItemHeadingStringProperty' ) )
    },
    jumpToLastKittenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_jumpToLastKitten', _.get( NumberPairsStrings, 'keyboardHelpDialog.jumpToLastKittenStringProperty' ) ),
    jumpToFirstKittenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_jumpToFirstKitten', _.get( NumberPairsStrings, 'keyboardHelpDialog.jumpToFirstKittenStringProperty' ) ),
    changeKittenColorStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_changeKittenColor', _.get( NumberPairsStrings, 'keyboardHelpDialog.changeKittenColorStringProperty' ) ),
    kittenSectionHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_kittenSectionHeading', _.get( NumberPairsStrings, 'keyboardHelpDialog.kittenSectionHeadingStringProperty' ) ),
    moveToRightSidePatternStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.moveToRightSidePatternStringProperty' ),
    moveToLeftSidePatternStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.moveToLeftSidePatternStringProperty' ),
    moveGrabbedObjectToOppositeSideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_moveGrabbedObjectToOppositeSide', _.get( NumberPairsStrings, 'keyboardHelpDialog.moveGrabbedObjectToOppositeSideStringProperty' ) ),
    moveBeadsToOppositeSideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_moveBeadsToOppositeSide', _.get( NumberPairsStrings, 'keyboardHelpDialog.moveBeadsToOppositeSideStringProperty' ) ),
    adjustObjectsTitleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_adjustObjectsTitle', _.get( NumberPairsStrings, 'keyboardHelpDialog.adjustObjectsTitleStringProperty' ) ),
    numberOfObjectsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelpDialog_numberOfObjects', _.get( NumberPairsStrings, 'keyboardHelpDialog.numberOfObjectsStringProperty' ) )
  },
  _comment_0: new FluentComment( {"comment":"Phrase and interaction","associatedKey":"phrase"} ),
  phraseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'phrase', _.get( NumberPairsStrings, 'phraseStringProperty' ) ),
  numberBondStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'numberBond', _.get( NumberPairsStrings, 'numberBondStringProperty' ) ),
  barModelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'barModel', _.get( NumberPairsStrings, 'barModelStringProperty' ) ),
  equationStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'equation', _.get( NumberPairsStrings, 'equationStringProperty' ) ),
  decompositionPhrasePatternStringProperty: _.get( NumberPairsStrings, 'decompositionPhrasePatternStringProperty' ),
  decompositionPhraseSpeechPatternStringProperty: _.get( NumberPairsStrings, 'decompositionPhraseSpeechPatternStringProperty' ),
  sumPhrasePatternStringProperty: _.get( NumberPairsStrings, 'sumPhrasePatternStringProperty' ),
  sumPhraseSpeechPatternStringProperty: _.get( NumberPairsStrings, 'sumPhraseSpeechPatternStringProperty' ),
  aNumberStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'aNumber', _.get( NumberPairsStrings, 'aNumberStringProperty' ) ),
  someNumberStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'someNumber', _.get( NumberPairsStrings, 'someNumberStringProperty' ) ),
  anotherNumberStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'anotherNumber', _.get( NumberPairsStrings, 'anotherNumberStringProperty' ) ),
  addendsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'addends', _.get( NumberPairsStrings, 'addendsStringProperty' ) ),
  tickNumbersStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'tickNumbers', _.get( NumberPairsStrings, 'tickNumbersStringProperty' ) ),
  totalJumpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'totalJump', _.get( NumberPairsStrings, 'totalJumpStringProperty' ) ),
  _comment_1: new FluentComment( {"comment":"Total/Number model","associatedKey":"total"} ),
  totalStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'total', _.get( NumberPairsStrings, 'totalStringProperty' ) ),
  automaticallyHearPhraseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'automaticallyHearPhrase', _.get( NumberPairsStrings, 'automaticallyHearPhraseStringProperty' ) ),
  automaticallyHearPhraseDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'automaticallyHearPhraseDescription', _.get( NumberPairsStrings, 'automaticallyHearPhraseDescriptionStringProperty' ) ),
  numberModelTypeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'numberModelType', _.get( NumberPairsStrings, 'numberModelTypeStringProperty' ) ),
  numberModelTypeDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'numberModelTypeDescription', _.get( NumberPairsStrings, 'numberModelTypeDescriptionStringProperty' ) ),
  sumScreenNumberModelOrientationStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sumScreenNumberModelOrientation', _.get( NumberPairsStrings, 'sumScreenNumberModelOrientationStringProperty' ) ),
  sumScreenNumberModelOrientationDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sumScreenNumberModelOrientationDescription', _.get( NumberPairsStrings, 'sumScreenNumberModelOrientationDescriptionStringProperty' ) ),
  a11y: {
    _comment_0: new FluentComment( {"comment":"Colors and basic terms","associatedKey":"yellow"} ),
    yellowStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yellow', _.get( NumberPairsStrings, 'a11y.yellowStringProperty' ) ),
    blueStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_blue', _.get( NumberPairsStrings, 'a11y.blueStringProperty' ) ),
    leftStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_left', _.get( NumberPairsStrings, 'a11y.leftStringProperty' ) ),
    rightStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_right', _.get( NumberPairsStrings, 'a11y.rightStringProperty' ) ),
    homeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_home', _.get( NumberPairsStrings, 'a11y.homeStringProperty' ) ),
    endStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_end', _.get( NumberPairsStrings, 'a11y.endStringProperty' ) ),
    _comment_1: new FluentComment( {"comment":"Phrase and interaction","associatedKey":"phrase"} ),
    phrase: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_phrase_accessibleName', _.get( NumberPairsStrings, 'a11y.phrase.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_phrase_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.phrase.accessibleHelpTextStringProperty' ) )
    },
    _comment_2: new FluentComment( {"comment":"Representation types","associatedKey":"representationType"} ),
    representationType: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_representationType_accessibleName', _.get( NumberPairsStrings, 'a11y.representationType.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_representationType_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.representationType.accessibleHelpTextStringProperty' ) )
    },
    apples: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_apples_accessibleName', _.get( NumberPairsStrings, 'a11y.apples.accessibleNameStringProperty' ) ),
      singularAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_apples_singularAccessibleName', _.get( NumberPairsStrings, 'a11y.apples.singularAccessibleNameStringProperty' ) )
    },
    soccerBalls: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soccerBalls_accessibleName', _.get( NumberPairsStrings, 'a11y.soccerBalls.accessibleNameStringProperty' ) ),
      singularAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soccerBalls_singularAccessibleName', _.get( NumberPairsStrings, 'a11y.soccerBalls.singularAccessibleNameStringProperty' ) )
    },
    butterflies: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_butterflies_accessibleName', _.get( NumberPairsStrings, 'a11y.butterflies.accessibleNameStringProperty' ) ),
      singularAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_butterflies_singularAccessibleName', _.get( NumberPairsStrings, 'a11y.butterflies.singularAccessibleNameStringProperty' ) )
    },
    ones: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ones_accessibleName', _.get( NumberPairsStrings, 'a11y.ones.accessibleNameStringProperty' ) ),
      singularAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ones_singularAccessibleName', _.get( NumberPairsStrings, 'a11y.ones.singularAccessibleNameStringProperty' ) )
    },
    locationCountingObjects: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_locationCountingObjects_accessibleName', _.get( NumberPairsStrings, 'a11y.locationCountingObjects.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_locationCountingObjects_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.locationCountingObjects.accessibleHelpTextStringProperty' ) )
    },
    _comment_3: new FluentComment( {"comment":"Kittens","associatedKey":"kittens"} ),
    kittens: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_accessibleName', _.get( NumberPairsStrings, 'a11y.kittens.accessibleNameStringProperty' ) ),
      changeColorAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_changeColorAccessibleName', _.get( NumberPairsStrings, 'a11y.kittens.changeColorAccessibleNameStringProperty' ) ),
      blueKittenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_blueKitten', _.get( NumberPairsStrings, 'a11y.kittens.blueKittenStringProperty' ) ),
      yellowKittenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_yellowKitten', _.get( NumberPairsStrings, 'a11y.kittens.yellowKittenStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.kittens.accessibleHelpTextStringProperty' ) ),
      jumpToFirstLabelInnerContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_jumpToFirstLabelInnerContent', _.get( NumberPairsStrings, 'a11y.kittens.jumpToFirstLabelInnerContentStringProperty' ) ),
      jumpToLastLabelInnerContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_jumpToLastLabelInnerContent', _.get( NumberPairsStrings, 'a11y.kittens.jumpToLastLabelInnerContentStringProperty' ) ),
      changeColorLabelInnerContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_changeColorLabelInnerContent', _.get( NumberPairsStrings, 'a11y.kittens.changeColorLabelInnerContentStringProperty' ) )
    },
    _comment_4: new FluentComment( {"comment":"Beads","associatedKey":"beads"} ),
    beads: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_accessibleName', _.get( NumberPairsStrings, 'a11y.beads.accessibleNameStringProperty' ) ),
      singularAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_singularAccessibleName', _.get( NumberPairsStrings, 'a11y.beads.singularAccessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.beads.accessibleHelpTextStringProperty' ) )
    },
    _comment_5: new FluentComment( {"comment":"Number line","associatedKey":"numberLine"} ),
    numberLine: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLine_accessibleName', _.get( NumberPairsStrings, 'a11y.numberLine.accessibleNameStringProperty' ) ),
      countOnStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLine_countOn', _.get( NumberPairsStrings, 'a11y.numberLine.countOnStringProperty' ) ),
      countFromZeroStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLine_countFromZero', _.get( NumberPairsStrings, 'a11y.numberLine.countFromZeroStringProperty' ) )
    },
    _comment_6: new FluentComment( {"comment":"Total/Number model","associatedKey":"total"} ),
    total: {
      totalOnTopStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_total_totalOnTop', _.get( NumberPairsStrings, 'a11y.total.totalOnTopStringProperty' ) ),
      totalOnBottomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_total_totalOnBottom', _.get( NumberPairsStrings, 'a11y.total.totalOnBottomStringProperty' ) ),
      totalNumberPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_total_totalNumberPattern', _.get( NumberPairsStrings, 'a11y.total.totalNumberPatternStringProperty' ), [{"name":"value"}] ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_total_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.total.accessibleHelpTextStringProperty' ) ),
      chooseTotalAccessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_total_chooseTotalAccessibleHelpText', _.get( NumberPairsStrings, 'a11y.total.chooseTotalAccessibleHelpTextStringProperty' ) )
    },
    _comment_7: new FluentComment( {"comment":"Controls and interactions","associatedKey":"controls"} ),
    controls: {
      organizeObjects: {
        accessibleName: new FluentPattern<{ representation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_organizeObjects_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.organizeObjects.accessibleNameStringProperty' ), [{"name":"representation"}] ),
        accessibleHelpText: new FluentPattern<{ representation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_organizeObjects_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.organizeObjects.accessibleHelpTextStringProperty' ), [{"name":"representation"}] )
      },
      swapAddends: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_swapAddends_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.swapAddends.accessibleNameStringProperty' ) )
      },
      showAddend: {
        accessibleName: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_showAddend_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.showAddend.accessibleNameStringProperty' ), [{"name":"addend"}] )
      },
      hideAddend: {
        accessibleName: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_hideAddend_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.hideAddend.accessibleNameStringProperty' ), [{"name":"addend"}] )
      },
      showAddends: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_showAddends_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.showAddends.accessibleNameStringProperty' ) )
      },
      hideAddends: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_hideAddends_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.hideAddends.accessibleNameStringProperty' ) )
      },
      yellowObjects: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_yellowObjects_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.yellowObjects.accessibleNameStringProperty' ) )
      },
      blueObjects: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_blueObjects_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.blueObjects.accessibleNameStringProperty' ) )
      },
      countingObjectControl: {
        accessibleHelpText: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_countingObjectControl_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.countingObjectControl.accessibleHelpTextStringProperty' ), [{"name":"addend"}] )
      },
      navigate: {
        accessibleName: new FluentPattern<{ items: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_navigate_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.navigate.accessibleNameStringProperty' ), [{"name":"items"}] )
      },
      move: {
        accessibleName: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_move_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.move.accessibleNameStringProperty' ), [{"name":"item"}] )
      },
      moveAcrossDescription: {
        labelInnerContent: new FluentPattern<{ addend: FluentVariable, item: FluentVariable, key: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_moveAcrossDescription_labelInnerContent', _.get( NumberPairsStrings, 'a11y.controls.moveAcrossDescription.labelInnerContentStringProperty' ), [{"name":"addend"},{"name":"item"},{"name":"key"}] )
      },
      adjustObjectsKeyboard: {
        labelInnerContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_adjustObjectsKeyboard_labelInnerContent', _.get( NumberPairsStrings, 'a11y.controls.adjustObjectsKeyboard.labelInnerContentStringProperty' ) )
      }
    }
  }
};

export default NumberPairsFluent;

numberPairs.register('NumberPairsFluent', NumberPairsFluent);
