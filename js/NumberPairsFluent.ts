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
addToMapIfDefined( 'a11y_phraseHelpText', 'a11y.phraseHelpTextStringProperty' );
addToMapIfDefined( 'a11y_hearPhrase', 'a11y.hearPhraseStringProperty' );
addToMapIfDefined( 'a11y_representationType', 'a11y.representationTypeStringProperty' );
addToMapIfDefined( 'a11y_representationTypeHelpText', 'a11y.representationTypeHelpTextStringProperty' );
addToMapIfDefined( 'a11y_apples', 'a11y.applesStringProperty' );
addToMapIfDefined( 'a11y_apple', 'a11y.appleStringProperty' );
addToMapIfDefined( 'a11y_soccerBalls', 'a11y.soccerBallsStringProperty' );
addToMapIfDefined( 'a11y_soccerBall', 'a11y.soccerBallStringProperty' );
addToMapIfDefined( 'a11y_butterflies', 'a11y.butterfliesStringProperty' );
addToMapIfDefined( 'a11y_butterfly', 'a11y.butterflyStringProperty' );
addToMapIfDefined( 'a11y_ones', 'a11y.onesStringProperty' );
addToMapIfDefined( 'a11y_one', 'a11y.oneStringProperty' );
addToMapIfDefined( 'a11y_locationCountingObjects', 'a11y.locationCountingObjectsStringProperty' );
addToMapIfDefined( 'a11y_locationCountingObjectsHelpText', 'a11y.locationCountingObjectsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_kittens_kittens', 'a11y.kittens.kittensStringProperty' );
addToMapIfDefined( 'a11y_kittens_changeColor', 'a11y.kittens.changeColorStringProperty' );
addToMapIfDefined( 'a11y_kittens_blueKitten', 'a11y.kittens.blueKittenStringProperty' );
addToMapIfDefined( 'a11y_kittens_yellowKitten', 'a11y.kittens.yellowKittenStringProperty' );
addToMapIfDefined( 'a11y_kittens_helpText', 'a11y.kittens.helpTextStringProperty' );
addToMapIfDefined( 'a11y_kittens_jumpToFirstKeyboardHelp', 'a11y.kittens.jumpToFirstKeyboardHelpStringProperty' );
addToMapIfDefined( 'a11y_kittens_jumpToLastKeyboardHelp', 'a11y.kittens.jumpToLastKeyboardHelpStringProperty' );
addToMapIfDefined( 'a11y_kittens_changeColorKeyboardHelp', 'a11y.kittens.changeColorKeyboardHelpStringProperty' );
addToMapIfDefined( 'a11y_beads_beads', 'a11y.beads.beadsStringProperty' );
addToMapIfDefined( 'a11y_beads_bead', 'a11y.beads.beadStringProperty' );
addToMapIfDefined( 'a11y_beads_helpText', 'a11y.beads.helpTextStringProperty' );
addToMapIfDefined( 'a11y_numberLine_numberLine', 'a11y.numberLine.numberLineStringProperty' );
addToMapIfDefined( 'a11y_numberLine_countOn', 'a11y.numberLine.countOnStringProperty' );
addToMapIfDefined( 'a11y_numberLine_countFromZero', 'a11y.numberLine.countFromZeroStringProperty' );
addToMapIfDefined( 'a11y_total_totalOnTop', 'a11y.total.totalOnTopStringProperty' );
addToMapIfDefined( 'a11y_total_totalOnBottom', 'a11y.total.totalOnBottomStringProperty' );
addToMapIfDefined( 'a11y_total_totalNumberPattern', 'a11y.total.totalNumberPatternStringProperty' );
addToMapIfDefined( 'a11y_total_checkboxHelpText', 'a11y.total.checkboxHelpTextStringProperty' );
addToMapIfDefined( 'a11y_total_chooseTotalHelpText', 'a11y.total.chooseTotalHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_organizeObjectsPattern', 'a11y.controls.organizeObjectsPatternStringProperty' );
addToMapIfDefined( 'a11y_controls_organizeObjectsHelpTextPattern', 'a11y.controls.organizeObjectsHelpTextPatternStringProperty' );
addToMapIfDefined( 'a11y_controls_swapAddends', 'a11y.controls.swapAddendsStringProperty' );
addToMapIfDefined( 'a11y_controls_showAddendPattern', 'a11y.controls.showAddendPatternStringProperty' );
addToMapIfDefined( 'a11y_controls_hideAddendPattern', 'a11y.controls.hideAddendPatternStringProperty' );
addToMapIfDefined( 'a11y_controls_showAddends', 'a11y.controls.showAddendsStringProperty' );
addToMapIfDefined( 'a11y_controls_hideAddends', 'a11y.controls.hideAddendsStringProperty' );
addToMapIfDefined( 'a11y_controls_yellowObjects', 'a11y.controls.yellowObjectsStringProperty' );
addToMapIfDefined( 'a11y_controls_blueObjects', 'a11y.controls.blueObjectsStringProperty' );
addToMapIfDefined( 'a11y_controls_countingObjectControlHelpTextPattern', 'a11y.controls.countingObjectControlHelpTextPatternStringProperty' );
addToMapIfDefined( 'a11y_controls_navigatePattern', 'a11y.controls.navigatePatternStringProperty' );
addToMapIfDefined( 'a11y_controls_movePattern', 'a11y.controls.movePatternStringProperty' );
addToMapIfDefined( 'a11y_controls_moveAcrossDescriptionPattern', 'a11y.controls.moveAcrossDescriptionPatternStringProperty' );
addToMapIfDefined( 'a11y_controls_adjustObjectsKeyboardHelp', 'a11y.controls.adjustObjectsKeyboardHelpStringProperty' );

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
  _comment_0: new FluentComment( {"comment":"Total/Number model","associatedKey":"total"} ),
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
    _comment_1: new FluentComment( {"comment":"Phrase and interaction","associatedKey":"phraseHelpText"} ),
    phraseHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_phraseHelpText', _.get( NumberPairsStrings, 'a11y.phraseHelpTextStringProperty' ) ),
    hearPhraseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_hearPhrase', _.get( NumberPairsStrings, 'a11y.hearPhraseStringProperty' ) ),
    _comment_2: new FluentComment( {"comment":"Representation types","associatedKey":"representationType"} ),
    representationTypeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_representationType', _.get( NumberPairsStrings, 'a11y.representationTypeStringProperty' ) ),
    representationTypeHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_representationTypeHelpText', _.get( NumberPairsStrings, 'a11y.representationTypeHelpTextStringProperty' ) ),
    applesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_apples', _.get( NumberPairsStrings, 'a11y.applesStringProperty' ) ),
    appleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_apple', _.get( NumberPairsStrings, 'a11y.appleStringProperty' ) ),
    soccerBallsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soccerBalls', _.get( NumberPairsStrings, 'a11y.soccerBallsStringProperty' ) ),
    soccerBallStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soccerBall', _.get( NumberPairsStrings, 'a11y.soccerBallStringProperty' ) ),
    butterfliesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_butterflies', _.get( NumberPairsStrings, 'a11y.butterfliesStringProperty' ) ),
    butterflyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_butterfly', _.get( NumberPairsStrings, 'a11y.butterflyStringProperty' ) ),
    onesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ones', _.get( NumberPairsStrings, 'a11y.onesStringProperty' ) ),
    oneStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_one', _.get( NumberPairsStrings, 'a11y.oneStringProperty' ) ),
    locationCountingObjectsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_locationCountingObjects', _.get( NumberPairsStrings, 'a11y.locationCountingObjectsStringProperty' ) ),
    locationCountingObjectsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_locationCountingObjectsHelpText', _.get( NumberPairsStrings, 'a11y.locationCountingObjectsHelpTextStringProperty' ) ),
    _comment_3: new FluentComment( {"comment":"Kittens","associatedKey":"kittens"} ),
    kittens: {
      _comment_0: new FluentComment( {"comment":"Kittens","associatedKey":"kittens"} ),
      kittensStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_kittens', _.get( NumberPairsStrings, 'a11y.kittens.kittensStringProperty' ) ),
      changeColorStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_changeColor', _.get( NumberPairsStrings, 'a11y.kittens.changeColorStringProperty' ) ),
      blueKittenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_blueKitten', _.get( NumberPairsStrings, 'a11y.kittens.blueKittenStringProperty' ) ),
      yellowKittenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_yellowKitten', _.get( NumberPairsStrings, 'a11y.kittens.yellowKittenStringProperty' ) ),
      helpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_helpText', _.get( NumberPairsStrings, 'a11y.kittens.helpTextStringProperty' ) ),
      jumpToFirstKeyboardHelpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_jumpToFirstKeyboardHelp', _.get( NumberPairsStrings, 'a11y.kittens.jumpToFirstKeyboardHelpStringProperty' ) ),
      jumpToLastKeyboardHelpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_jumpToLastKeyboardHelp', _.get( NumberPairsStrings, 'a11y.kittens.jumpToLastKeyboardHelpStringProperty' ) ),
      changeColorKeyboardHelpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_changeColorKeyboardHelp', _.get( NumberPairsStrings, 'a11y.kittens.changeColorKeyboardHelpStringProperty' ) )
    },
    _comment_4: new FluentComment( {"comment":"Beads","associatedKey":"beads"} ),
    beads: {
      _comment_0: new FluentComment( {"comment":"Beads","associatedKey":"beads"} ),
      beadsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_beads', _.get( NumberPairsStrings, 'a11y.beads.beadsStringProperty' ) ),
      beadStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_bead', _.get( NumberPairsStrings, 'a11y.beads.beadStringProperty' ) ),
      helpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_helpText', _.get( NumberPairsStrings, 'a11y.beads.helpTextStringProperty' ) )
    },
    _comment_5: new FluentComment( {"comment":"Number line","associatedKey":"numberLine"} ),
    numberLine: {
      _comment_0: new FluentComment( {"comment":"Number line","associatedKey":"numberLine"} ),
      numberLineStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLine_numberLine', _.get( NumberPairsStrings, 'a11y.numberLine.numberLineStringProperty' ) ),
      countOnStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLine_countOn', _.get( NumberPairsStrings, 'a11y.numberLine.countOnStringProperty' ) ),
      countFromZeroStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLine_countFromZero', _.get( NumberPairsStrings, 'a11y.numberLine.countFromZeroStringProperty' ) )
    },
    _comment_6: new FluentComment( {"comment":"Total/Number model","associatedKey":"total"} ),
    total: {
      totalOnTopStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_total_totalOnTop', _.get( NumberPairsStrings, 'a11y.total.totalOnTopStringProperty' ) ),
      totalOnBottomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_total_totalOnBottom', _.get( NumberPairsStrings, 'a11y.total.totalOnBottomStringProperty' ) ),
      totalNumberPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_total_totalNumberPattern', _.get( NumberPairsStrings, 'a11y.total.totalNumberPatternStringProperty' ), [{"name":"value"}] ),
      checkboxHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_total_checkboxHelpText', _.get( NumberPairsStrings, 'a11y.total.checkboxHelpTextStringProperty' ) ),
      chooseTotalHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_total_chooseTotalHelpText', _.get( NumberPairsStrings, 'a11y.total.chooseTotalHelpTextStringProperty' ) )
    },
    _comment_7: new FluentComment( {"comment":"Controls and interactions","associatedKey":"controls"} ),
    controls: {
      organizeObjectsPattern: new FluentPattern<{ representation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_organizeObjectsPattern', _.get( NumberPairsStrings, 'a11y.controls.organizeObjectsPatternStringProperty' ), [{"name":"representation"}] ),
      organizeObjectsHelpTextPattern: new FluentPattern<{ representation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_organizeObjectsHelpTextPattern', _.get( NumberPairsStrings, 'a11y.controls.organizeObjectsHelpTextPatternStringProperty' ), [{"name":"representation"}] ),
      swapAddendsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_swapAddends', _.get( NumberPairsStrings, 'a11y.controls.swapAddendsStringProperty' ) ),
      showAddendPattern: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_showAddendPattern', _.get( NumberPairsStrings, 'a11y.controls.showAddendPatternStringProperty' ), [{"name":"addend"}] ),
      hideAddendPattern: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_hideAddendPattern', _.get( NumberPairsStrings, 'a11y.controls.hideAddendPatternStringProperty' ), [{"name":"addend"}] ),
      showAddendsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_showAddends', _.get( NumberPairsStrings, 'a11y.controls.showAddendsStringProperty' ) ),
      hideAddendsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_hideAddends', _.get( NumberPairsStrings, 'a11y.controls.hideAddendsStringProperty' ) ),
      yellowObjectsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_yellowObjects', _.get( NumberPairsStrings, 'a11y.controls.yellowObjectsStringProperty' ) ),
      blueObjectsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_blueObjects', _.get( NumberPairsStrings, 'a11y.controls.blueObjectsStringProperty' ) ),
      countingObjectControlHelpTextPattern: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_countingObjectControlHelpTextPattern', _.get( NumberPairsStrings, 'a11y.controls.countingObjectControlHelpTextPatternStringProperty' ), [{"name":"addend"}] ),
      navigatePattern: new FluentPattern<{ items: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_navigatePattern', _.get( NumberPairsStrings, 'a11y.controls.navigatePatternStringProperty' ), [{"name":"items"}] ),
      movePattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_movePattern', _.get( NumberPairsStrings, 'a11y.controls.movePatternStringProperty' ), [{"name":"item"}] ),
      moveAcrossDescriptionPattern: new FluentPattern<{ addend: FluentVariable, item: FluentVariable, key: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_moveAcrossDescriptionPattern', _.get( NumberPairsStrings, 'a11y.controls.moveAcrossDescriptionPatternStringProperty' ), [{"name":"addend"},{"name":"item"},{"name":"key"}] ),
      adjustObjectsKeyboardHelpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_adjustObjectsKeyboardHelp', _.get( NumberPairsStrings, 'a11y.controls.adjustObjectsKeyboardHelpStringProperty' ) )
    }
  }
};

export default NumberPairsFluent;

numberPairs.register('NumberPairsFluent', NumberPairsFluent);
