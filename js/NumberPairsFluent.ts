// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from number-pairs-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
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
addToMapIfDefined( 'a11y_changeColor', 'a11y.changeColorStringProperty' );
addToMapIfDefined( 'a11y_yellow', 'a11y.yellowStringProperty' );
addToMapIfDefined( 'a11y_blue', 'a11y.blueStringProperty' );
addToMapIfDefined( 'a11y_totalOnTop', 'a11y.totalOnTopStringProperty' );
addToMapIfDefined( 'a11y_totalOnBottom', 'a11y.totalOnBottomStringProperty' );
addToMapIfDefined( 'a11y_phraseHelpText', 'a11y.phraseHelpTextStringProperty' );
addToMapIfDefined( 'a11y_totalNumberPattern', 'a11y.totalNumberPatternStringProperty' );
addToMapIfDefined( 'a11y_representationType', 'a11y.representationTypeStringProperty' );
addToMapIfDefined( 'a11y_hearPhrase', 'a11y.hearPhraseStringProperty' );
addToMapIfDefined( 'a11y_organizeObjectsPattern', 'a11y.organizeObjectsPatternStringProperty' );
addToMapIfDefined( 'a11y_swapAddends', 'a11y.swapAddendsStringProperty' );
addToMapIfDefined( 'a11y_showAddendPattern', 'a11y.showAddendPatternStringProperty' );
addToMapIfDefined( 'a11y_hideAddendPattern', 'a11y.hideAddendPatternStringProperty' );
addToMapIfDefined( 'a11y_showAddends', 'a11y.showAddendsStringProperty' );
addToMapIfDefined( 'a11y_hideAddends', 'a11y.hideAddendsStringProperty' );
addToMapIfDefined( 'a11y_apples', 'a11y.applesStringProperty' );
addToMapIfDefined( 'a11y_apple', 'a11y.appleStringProperty' );
addToMapIfDefined( 'a11y_soccerBalls', 'a11y.soccerBallsStringProperty' );
addToMapIfDefined( 'a11y_soccerBall', 'a11y.soccerBallStringProperty' );
addToMapIfDefined( 'a11y_butterflies', 'a11y.butterfliesStringProperty' );
addToMapIfDefined( 'a11y_butterfly', 'a11y.butterflyStringProperty' );
addToMapIfDefined( 'a11y_ones', 'a11y.onesStringProperty' );
addToMapIfDefined( 'a11y_one', 'a11y.oneStringProperty' );
addToMapIfDefined( 'a11y_kittens', 'a11y.kittensStringProperty' );
addToMapIfDefined( 'a11y_beads', 'a11y.beadsStringProperty' );
addToMapIfDefined( 'a11y_bead', 'a11y.beadStringProperty' );
addToMapIfDefined( 'a11y_numberLine', 'a11y.numberLineStringProperty' );
addToMapIfDefined( 'a11y_countOn', 'a11y.countOnStringProperty' );
addToMapIfDefined( 'a11y_countFromZero', 'a11y.countFromZeroStringProperty' );
addToMapIfDefined( 'a11y_locationCountingObjects', 'a11y.locationCountingObjectsStringProperty' );
addToMapIfDefined( 'a11y_totalCheckboxHelpText', 'a11y.totalCheckboxHelpTextStringProperty' );
addToMapIfDefined( 'a11y_chooseTotalHelpText', 'a11y.chooseTotalHelpTextStringProperty' );
addToMapIfDefined( 'a11y_representationTypeHelpText', 'a11y.representationTypeHelpTextStringProperty' );
addToMapIfDefined( 'a11y_organizeObjectsHelpTextPattern', 'a11y.organizeObjectsHelpTextPatternStringProperty' );
addToMapIfDefined( 'a11y_locationCountingObjectsHelpText', 'a11y.locationCountingObjectsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_beadsHelpText', 'a11y.beadsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_blueKitten', 'a11y.blueKittenStringProperty' );
addToMapIfDefined( 'a11y_yellowKitten', 'a11y.yellowKittenStringProperty' );
addToMapIfDefined( 'a11y_kittensHelpText', 'a11y.kittensHelpTextStringProperty' );
addToMapIfDefined( 'a11y_yellowObjects', 'a11y.yellowObjectsStringProperty' );
addToMapIfDefined( 'a11y_blueObjects', 'a11y.blueObjectsStringProperty' );
addToMapIfDefined( 'a11y_countingObjectControlHelpTextPattern', 'a11y.countingObjectControlHelpTextPatternStringProperty' );
addToMapIfDefined( 'a11y_left', 'a11y.leftStringProperty' );
addToMapIfDefined( 'a11y_right', 'a11y.rightStringProperty' );
addToMapIfDefined( 'a11y_navigatePattern', 'a11y.navigatePatternStringProperty' );
addToMapIfDefined( 'a11y_movePattern', 'a11y.movePatternStringProperty' );
addToMapIfDefined( 'a11y_home', 'a11y.homeStringProperty' );
addToMapIfDefined( 'a11y_end', 'a11y.endStringProperty' );
addToMapIfDefined( 'a11y_moveAcrossDescriptionPattern', 'a11y.moveAcrossDescriptionPatternStringProperty' );
addToMapIfDefined( 'a11y_jumpToFirstKittenKeyboardHelp', 'a11y.jumpToFirstKittenKeyboardHelpStringProperty' );
addToMapIfDefined( 'a11y_jumpToLastKittenKeyboardHelp', 'a11y.jumpToLastKittenKeyboardHelpStringProperty' );
addToMapIfDefined( 'a11y_changeColorKeyboardHelp', 'a11y.changeColorKeyboardHelpStringProperty' );
addToMapIfDefined( 'a11y_adjustObjectsKeyboardHelp', 'a11y.adjustObjectsKeyboardHelpStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${stringProperty.value}\n`;
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
  totalStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'total', _.get( NumberPairsStrings, 'totalStringProperty' ) ),
  automaticallyHearPhraseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'automaticallyHearPhrase', _.get( NumberPairsStrings, 'automaticallyHearPhraseStringProperty' ) ),
  automaticallyHearPhraseDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'automaticallyHearPhraseDescription', _.get( NumberPairsStrings, 'automaticallyHearPhraseDescriptionStringProperty' ) ),
  numberModelTypeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'numberModelType', _.get( NumberPairsStrings, 'numberModelTypeStringProperty' ) ),
  numberModelTypeDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'numberModelTypeDescription', _.get( NumberPairsStrings, 'numberModelTypeDescriptionStringProperty' ) ),
  sumScreenNumberModelOrientationStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sumScreenNumberModelOrientation', _.get( NumberPairsStrings, 'sumScreenNumberModelOrientationStringProperty' ) ),
  sumScreenNumberModelOrientationDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sumScreenNumberModelOrientationDescription', _.get( NumberPairsStrings, 'sumScreenNumberModelOrientationDescriptionStringProperty' ) ),
  a11y: {
    changeColorStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_changeColor', _.get( NumberPairsStrings, 'a11y.changeColorStringProperty' ) ),
    yellowStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yellow', _.get( NumberPairsStrings, 'a11y.yellowStringProperty' ) ),
    blueStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_blue', _.get( NumberPairsStrings, 'a11y.blueStringProperty' ) ),
    totalOnTopStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_totalOnTop', _.get( NumberPairsStrings, 'a11y.totalOnTopStringProperty' ) ),
    totalOnBottomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_totalOnBottom', _.get( NumberPairsStrings, 'a11y.totalOnBottomStringProperty' ) ),
    phraseHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_phraseHelpText', _.get( NumberPairsStrings, 'a11y.phraseHelpTextStringProperty' ) ),
    totalNumberPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_totalNumberPattern', _.get( NumberPairsStrings, 'a11y.totalNumberPatternStringProperty' ), [{"name":"value"}] ),
    representationTypeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_representationType', _.get( NumberPairsStrings, 'a11y.representationTypeStringProperty' ) ),
    hearPhraseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_hearPhrase', _.get( NumberPairsStrings, 'a11y.hearPhraseStringProperty' ) ),
    organizeObjectsPattern: new FluentPattern<{ representation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_organizeObjectsPattern', _.get( NumberPairsStrings, 'a11y.organizeObjectsPatternStringProperty' ), [{"name":"representation"}] ),
    swapAddendsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_swapAddends', _.get( NumberPairsStrings, 'a11y.swapAddendsStringProperty' ) ),
    showAddendPattern: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showAddendPattern', _.get( NumberPairsStrings, 'a11y.showAddendPatternStringProperty' ), [{"name":"addend"}] ),
    hideAddendPattern: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_hideAddendPattern', _.get( NumberPairsStrings, 'a11y.hideAddendPatternStringProperty' ), [{"name":"addend"}] ),
    showAddendsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_showAddends', _.get( NumberPairsStrings, 'a11y.showAddendsStringProperty' ) ),
    hideAddendsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_hideAddends', _.get( NumberPairsStrings, 'a11y.hideAddendsStringProperty' ) ),
    applesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_apples', _.get( NumberPairsStrings, 'a11y.applesStringProperty' ) ),
    appleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_apple', _.get( NumberPairsStrings, 'a11y.appleStringProperty' ) ),
    soccerBallsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soccerBalls', _.get( NumberPairsStrings, 'a11y.soccerBallsStringProperty' ) ),
    soccerBallStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soccerBall', _.get( NumberPairsStrings, 'a11y.soccerBallStringProperty' ) ),
    butterfliesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_butterflies', _.get( NumberPairsStrings, 'a11y.butterfliesStringProperty' ) ),
    butterflyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_butterfly', _.get( NumberPairsStrings, 'a11y.butterflyStringProperty' ) ),
    onesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ones', _.get( NumberPairsStrings, 'a11y.onesStringProperty' ) ),
    oneStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_one', _.get( NumberPairsStrings, 'a11y.oneStringProperty' ) ),
    kittensStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens', _.get( NumberPairsStrings, 'a11y.kittensStringProperty' ) ),
    beadsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads', _.get( NumberPairsStrings, 'a11y.beadsStringProperty' ) ),
    beadStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_bead', _.get( NumberPairsStrings, 'a11y.beadStringProperty' ) ),
    numberLineStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLine', _.get( NumberPairsStrings, 'a11y.numberLineStringProperty' ) ),
    countOnStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_countOn', _.get( NumberPairsStrings, 'a11y.countOnStringProperty' ) ),
    countFromZeroStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_countFromZero', _.get( NumberPairsStrings, 'a11y.countFromZeroStringProperty' ) ),
    locationCountingObjectsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_locationCountingObjects', _.get( NumberPairsStrings, 'a11y.locationCountingObjectsStringProperty' ) ),
    totalCheckboxHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_totalCheckboxHelpText', _.get( NumberPairsStrings, 'a11y.totalCheckboxHelpTextStringProperty' ) ),
    chooseTotalHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_chooseTotalHelpText', _.get( NumberPairsStrings, 'a11y.chooseTotalHelpTextStringProperty' ) ),
    representationTypeHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_representationTypeHelpText', _.get( NumberPairsStrings, 'a11y.representationTypeHelpTextStringProperty' ) ),
    organizeObjectsHelpTextPattern: new FluentPattern<{ representation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_organizeObjectsHelpTextPattern', _.get( NumberPairsStrings, 'a11y.organizeObjectsHelpTextPatternStringProperty' ), [{"name":"representation"}] ),
    locationCountingObjectsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_locationCountingObjectsHelpText', _.get( NumberPairsStrings, 'a11y.locationCountingObjectsHelpTextStringProperty' ) ),
    beadsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beadsHelpText', _.get( NumberPairsStrings, 'a11y.beadsHelpTextStringProperty' ) ),
    blueKittenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_blueKitten', _.get( NumberPairsStrings, 'a11y.blueKittenStringProperty' ) ),
    yellowKittenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yellowKitten', _.get( NumberPairsStrings, 'a11y.yellowKittenStringProperty' ) ),
    kittensHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittensHelpText', _.get( NumberPairsStrings, 'a11y.kittensHelpTextStringProperty' ) ),
    yellowObjectsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yellowObjects', _.get( NumberPairsStrings, 'a11y.yellowObjectsStringProperty' ) ),
    blueObjectsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_blueObjects', _.get( NumberPairsStrings, 'a11y.blueObjectsStringProperty' ) ),
    countingObjectControlHelpTextPattern: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingObjectControlHelpTextPattern', _.get( NumberPairsStrings, 'a11y.countingObjectControlHelpTextPatternStringProperty' ), [{"name":"addend"}] ),
    leftStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_left', _.get( NumberPairsStrings, 'a11y.leftStringProperty' ) ),
    rightStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_right', _.get( NumberPairsStrings, 'a11y.rightStringProperty' ) ),
    navigatePattern: new FluentPattern<{ items: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_navigatePattern', _.get( NumberPairsStrings, 'a11y.navigatePatternStringProperty' ), [{"name":"items"}] ),
    movePattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_movePattern', _.get( NumberPairsStrings, 'a11y.movePatternStringProperty' ), [{"name":"item"}] ),
    homeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_home', _.get( NumberPairsStrings, 'a11y.homeStringProperty' ) ),
    endStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_end', _.get( NumberPairsStrings, 'a11y.endStringProperty' ) ),
    moveAcrossDescriptionPattern: new FluentPattern<{ addend: FluentVariable, item: FluentVariable, key: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_moveAcrossDescriptionPattern', _.get( NumberPairsStrings, 'a11y.moveAcrossDescriptionPatternStringProperty' ), [{"name":"addend"},{"name":"item"},{"name":"key"}] ),
    jumpToFirstKittenKeyboardHelpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_jumpToFirstKittenKeyboardHelp', _.get( NumberPairsStrings, 'a11y.jumpToFirstKittenKeyboardHelpStringProperty' ) ),
    jumpToLastKittenKeyboardHelpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_jumpToLastKittenKeyboardHelp', _.get( NumberPairsStrings, 'a11y.jumpToLastKittenKeyboardHelpStringProperty' ) ),
    changeColorKeyboardHelpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_changeColorKeyboardHelp', _.get( NumberPairsStrings, 'a11y.changeColorKeyboardHelpStringProperty' ) ),
    adjustObjectsKeyboardHelpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_adjustObjectsKeyboardHelp', _.get( NumberPairsStrings, 'a11y.adjustObjectsKeyboardHelpStringProperty' ) )
  }
};

export default NumberPairsFluent;

numberPairs.register('NumberPairsFluent', NumberPairsFluent);
