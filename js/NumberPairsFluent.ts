// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from number-pairs-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import { TReadOnlyProperty } from '../../axon/js/TReadOnlyProperty.js';
import type { FluentVariable } from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
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
addToMapIfDefined( 'screen_game', 'screen.gameStringProperty' );
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
addToMapIfDefined( 'tryAgain', 'tryAgainStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_playArea', 'a11y.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_controlArea', 'a11y.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_objectsPattern', 'a11y.screenSummary.currentDetails.objectsPatternStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_hiddenAreaPattern', 'a11y.screenSummary.currentDetails.hiddenAreaPatternStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_bothHidden', 'a11y.screenSummary.currentDetails.bothHiddenStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_interactionHint', 'a11y.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_left', 'a11y.leftStringProperty' );
addToMapIfDefined( 'a11y_right', 'a11y.rightStringProperty' );
addToMapIfDefined( 'a11y_leftCapitalized', 'a11y.leftCapitalizedStringProperty' );
addToMapIfDefined( 'a11y_rightCapitalized', 'a11y.rightCapitalizedStringProperty' );
addToMapIfDefined( 'a11y_movableRoleDescription', 'a11y.movableRoleDescriptionStringProperty' );
addToMapIfDefined( 'a11y_countingAreaEmpty', 'a11y.countingAreaEmptyStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_releasedHelpText', 'a11y.grabOrReleaseInteraction.releasedHelpTextStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_grabbedHelpTextPattern', 'a11y.grabOrReleaseInteraction.grabbedHelpTextPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_grabbedAccessibleResponse', 'a11y.grabOrReleaseInteraction.grabbedAccessibleResponseStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_releasedAccessibleResponse', 'a11y.grabOrReleaseInteraction.releasedAccessibleResponseStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_movedAccessibleResponse', 'a11y.grabOrReleaseInteraction.movedAccessibleResponseStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_firstLeftItemPattern', 'a11y.grabOrReleaseInteraction.firstLeftItemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_leftItemPattern', 'a11y.grabOrReleaseInteraction.leftItemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_lastLeftItemPattern', 'a11y.grabOrReleaseInteraction.lastLeftItemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_onlyLeftItemPattern', 'a11y.grabOrReleaseInteraction.onlyLeftItemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_firstRightItemPattern', 'a11y.grabOrReleaseInteraction.firstRightItemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_rightItemPattern', 'a11y.grabOrReleaseInteraction.rightItemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_lastRightItemPattern', 'a11y.grabOrReleaseInteraction.lastRightItemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_onlyRightItemPattern', 'a11y.grabOrReleaseInteraction.onlyRightItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_accessibleHeading', 'a11y.countingArea.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_countingArea_leadingParagraph', 'a11y.countingArea.leadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_countingArea_numberBondLeadingParagraph', 'a11y.countingArea.numberBondLeadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_countingArea_barModelLeadingParagraph', 'a11y.countingArea.barModelLeadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_countingArea_leftSideListItemPattern', 'a11y.countingArea.leftSideListItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_rightSideListItemPattern', 'a11y.countingArea.rightSideListItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_leftCircleListItemPattern', 'a11y.countingArea.leftCircleListItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_rightCircleListItemPattern', 'a11y.countingArea.rightCircleListItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_valueHidden', 'a11y.countingArea.valueHiddenStringProperty' );
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
addToMapIfDefined( 'a11y_kittens_accessibleName', 'a11y.kittens.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_kittens_singularAccessibleName', 'a11y.kittens.singularAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_kittens_changeColorAccessibleName', 'a11y.kittens.changeColorAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_kittens_leftAddendColor', 'a11y.kittens.leftAddendColorStringProperty' );
addToMapIfDefined( 'a11y_kittens_rightAddendColor', 'a11y.kittens.rightAddendColorStringProperty' );
addToMapIfDefined( 'a11y_kittens_leftAddendKitten', 'a11y.kittens.leftAddendKittenStringProperty' );
addToMapIfDefined( 'a11y_kittens_rightAddendKitten', 'a11y.kittens.rightAddendKittenStringProperty' );
addToMapIfDefined( 'a11y_kittens_accessibleHelpText', 'a11y.kittens.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_kittens_withoutAttributeSwitchHelpText', 'a11y.kittens.withoutAttributeSwitchHelpTextStringProperty' );
addToMapIfDefined( 'a11y_beads_accessibleName', 'a11y.beads.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_beads_singularAccessibleName', 'a11y.beads.singularAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_beads_leftAddendBead', 'a11y.beads.leftAddendBeadStringProperty' );
addToMapIfDefined( 'a11y_beads_rightAddendBead', 'a11y.beads.rightAddendBeadStringProperty' );
addToMapIfDefined( 'a11y_beads_accessibleHelpText', 'a11y.beads.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_numberLine_accessibleName', 'a11y.numberLine.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_totalSceneSelection_totalNumberPattern', 'a11y.totalSceneSelection.totalNumberPatternStringProperty' );
addToMapIfDefined( 'a11y_totalSceneSelection_accessibleHelpText', 'a11y.totalSceneSelection.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_totalCheckbox_accessibleHelpText', 'a11y.totalCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_accessibleHeading', 'a11y.controls.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_controls_phrase_accessibleHelpText', 'a11y.controls.phrase.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_speechSynthesis_accessibleName', 'a11y.controls.speechSynthesis.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_speechSynthesis_noVoiceAccessibleName', 'a11y.controls.speechSynthesis.noVoiceAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_speechSynthesis_noVoiceAccessibleParagraph', 'a11y.controls.speechSynthesis.noVoiceAccessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_controls_speechSynthesis_accessibleHelpText', 'a11y.controls.speechSynthesis.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_localeSwitch_accessibleHelpText', 'a11y.controls.localeSwitch.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_numberBond', 'a11y.controls.numberModel.numberBondStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_barModel', 'a11y.controls.numberModel.barModelStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_accessibleHelpText', 'a11y.controls.numberModel.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_numberBondAccessibleParagraph', 'a11y.controls.numberModel.numberBondAccessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_barModelAccessibleParagraph', 'a11y.controls.numberModel.barModelAccessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_largerAndSmaller', 'a11y.controls.numberModel.largerAndSmallerStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_smallerAndLarger', 'a11y.controls.numberModel.smallerAndLargerStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_equal', 'a11y.controls.numberModel.equalStringProperty' );
addToMapIfDefined( 'a11y_controls_tenFrameButton_accessibleName', 'a11y.controls.tenFrameButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_tenFrameButton_accessibleHelpText', 'a11y.controls.tenFrameButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_tenFrameButton_accessibleContextResponse', 'a11y.controls.tenFrameButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_controls_commutativeButton_accessibleName', 'a11y.controls.commutativeButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_commutativeButton_accessibleHelpTextPattern', 'a11y.controls.commutativeButton.accessibleHelpTextPatternStringProperty' );
addToMapIfDefined( 'a11y_controls_commutativeButton_accessibleContextResponse', 'a11y.controls.commutativeButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_controls_addendVisible_accessibleNamePattern', 'a11y.controls.addendVisible.accessibleNamePatternStringProperty' );
addToMapIfDefined( 'a11y_controls_addendVisible_accessibleHelpTextPattern', 'a11y.controls.addendVisible.accessibleHelpTextPatternStringProperty' );
addToMapIfDefined( 'a11y_controls_addendVisible_accessibleContextResponse_hidden', 'a11y.controls.addendVisible.accessibleContextResponse.hiddenStringProperty' );
addToMapIfDefined( 'a11y_controls_addendVisible_accessibleContextResponse_visible', 'a11y.controls.addendVisible.accessibleContextResponse.visibleStringProperty' );
addToMapIfDefined( 'a11y_controls_showAddends_accessibleName', 'a11y.controls.showAddends.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_hideAddends_accessibleName', 'a11y.controls.hideAddends.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_leftObjects_accessibleName', 'a11y.controls.leftObjects.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_rightObjects_accessibleName', 'a11y.controls.rightObjects.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_countingObjectControl_accessibleHelpText', 'a11y.controls.countingObjectControl.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_countFromZeroSwitch_valueAAccessibleName', 'a11y.controls.countFromZeroSwitch.valueAAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_countFromZeroSwitch_valueBAccessibleName', 'a11y.controls.countFromZeroSwitch.valueBAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_totalCheckbox_accessibleHelpText', 'a11y.controls.totalCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_preferences_sumScreenModelOrientation_totalOnTop', 'a11y.preferences.sumScreenModelOrientation.totalOnTopStringProperty' );
addToMapIfDefined( 'a11y_preferences_sumScreenModelOrientation_totalOnBottom', 'a11y.preferences.sumScreenModelOrientation.totalOnBottomStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_moveAcrossDescription_labelInnerContent', 'a11y.keyboardHelpDialog.moveAcrossDescription.labelInnerContentStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_adjustObjectsKeyboard_labelInnerContent', 'a11y.keyboardHelpDialog.adjustObjectsKeyboard.labelInnerContentStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_kittenInteraction_jumpToFirstLabelInnerContent', 'a11y.keyboardHelpDialog.kittenInteraction.jumpToFirstLabelInnerContentStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_kittenInteraction_jumpToLastLabelInnerContent', 'a11y.keyboardHelpDialog.kittenInteraction.jumpToLastLabelInnerContentStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_kittenInteraction_changeColorLabelInnerContent', 'a11y.keyboardHelpDialog.kittenInteraction.changeColorLabelInnerContentStringProperty' );

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
    titleStringProperty: _.get( NumberPairsStrings, 'number-pairs.titleStringProperty' )
  },
  screen: {
    introStringProperty: _.get( NumberPairsStrings, 'screen.introStringProperty' ),
    tenStringProperty: _.get( NumberPairsStrings, 'screen.tenStringProperty' ),
    twentyStringProperty: _.get( NumberPairsStrings, 'screen.twentyStringProperty' ),
    sumStringProperty: _.get( NumberPairsStrings, 'screen.sumStringProperty' ),
    gameStringProperty: _.get( NumberPairsStrings, 'screen.gameStringProperty' )
  },
  _comment_0: new FluentComment( {"comment":"Keyboard help dialog","associatedKey":"keyboardHelpDialog"} ),
  keyboardHelpDialog: {
    objectHeadingStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.objectHeadingStringProperty' ),
    objectStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.objectStringProperty' ),
    beadHeadingStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.beadHeadingStringProperty' ),
    beadStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.beadStringProperty' ),
    countingObjectOrBeadHeadingStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.countingObjectOrBeadHeadingStringProperty' ),
    countingObjectOrBeadStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.countingObjectOrBeadStringProperty' ),
    introScreen: {
      moveGrabbableItemHeadingStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.introScreen.moveGrabbableItemHeadingStringProperty' )
    },
    tenScreen: {
      moveGrabbableItemHeadingStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.tenScreen.moveGrabbableItemHeadingStringProperty' )
    },
    twentyScreen: {
      moveGrabbableItemHeadingStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.twentyScreen.moveGrabbableItemHeadingStringProperty' )
    },
    sumScreen: {
      moveGrabbableItemHeadingStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.sumScreen.moveGrabbableItemHeadingStringProperty' )
    },
    jumpToLastKittenStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.jumpToLastKittenStringProperty' ),
    jumpToFirstKittenStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.jumpToFirstKittenStringProperty' ),
    changeKittenColorStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.changeKittenColorStringProperty' ),
    kittenSectionHeadingStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.kittenSectionHeadingStringProperty' ),
    moveToRightSidePatternStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.moveToRightSidePatternStringProperty' ),
    moveToLeftSidePatternStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.moveToLeftSidePatternStringProperty' ),
    moveGrabbedObjectToOppositeSideStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.moveGrabbedObjectToOppositeSideStringProperty' ),
    moveBeadsToOppositeSideStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.moveBeadsToOppositeSideStringProperty' ),
    adjustObjectsTitleStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.adjustObjectsTitleStringProperty' ),
    numberOfObjectsStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.numberOfObjectsStringProperty' )
  },
  phraseStringProperty: _.get( NumberPairsStrings, 'phraseStringProperty' ),
  numberBondStringProperty: _.get( NumberPairsStrings, 'numberBondStringProperty' ),
  barModelStringProperty: _.get( NumberPairsStrings, 'barModelStringProperty' ),
  equationStringProperty: _.get( NumberPairsStrings, 'equationStringProperty' ),
  decompositionPhrasePatternStringProperty: _.get( NumberPairsStrings, 'decompositionPhrasePatternStringProperty' ),
  decompositionPhraseSpeechPatternStringProperty: _.get( NumberPairsStrings, 'decompositionPhraseSpeechPatternStringProperty' ),
  sumPhrasePatternStringProperty: _.get( NumberPairsStrings, 'sumPhrasePatternStringProperty' ),
  sumPhraseSpeechPatternStringProperty: _.get( NumberPairsStrings, 'sumPhraseSpeechPatternStringProperty' ),
  aNumberStringProperty: _.get( NumberPairsStrings, 'aNumberStringProperty' ),
  someNumberStringProperty: _.get( NumberPairsStrings, 'someNumberStringProperty' ),
  anotherNumberStringProperty: _.get( NumberPairsStrings, 'anotherNumberStringProperty' ),
  addendsStringProperty: _.get( NumberPairsStrings, 'addendsStringProperty' ),
  tickNumbersStringProperty: _.get( NumberPairsStrings, 'tickNumbersStringProperty' ),
  totalJumpStringProperty: _.get( NumberPairsStrings, 'totalJumpStringProperty' ),
  totalStringProperty: _.get( NumberPairsStrings, 'totalStringProperty' ),
  automaticallyHearPhraseStringProperty: _.get( NumberPairsStrings, 'automaticallyHearPhraseStringProperty' ),
  automaticallyHearPhraseDescriptionStringProperty: _.get( NumberPairsStrings, 'automaticallyHearPhraseDescriptionStringProperty' ),
  numberModelTypeStringProperty: _.get( NumberPairsStrings, 'numberModelTypeStringProperty' ),
  numberModelTypeDescriptionStringProperty: _.get( NumberPairsStrings, 'numberModelTypeDescriptionStringProperty' ),
  sumScreenNumberModelOrientationStringProperty: _.get( NumberPairsStrings, 'sumScreenNumberModelOrientationStringProperty' ),
  sumScreenNumberModelOrientationDescriptionStringProperty: _.get( NumberPairsStrings, 'sumScreenNumberModelOrientationDescriptionStringProperty' ),
  tryAgainStringProperty: _.get( NumberPairsStrings, 'tryAgainStringProperty' ),
  levelPatternStringProperty: _.get( NumberPairsStrings, 'levelPatternStringProperty' ),
  a11y: {
    _comment_0: new FluentComment( {"comment":"Screen summary","associatedKey":"screenSummary"} ),
    screenSummary: {
      playArea: new FluentPattern<{ numberBarOrBarModel: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_screenSummary_playArea', _.get( NumberPairsStrings, 'a11y.screenSummary.playAreaStringProperty' ), [{"name":"numberBarOrBarModel"}] ),
      controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_controlArea', _.get( NumberPairsStrings, 'a11y.screenSummary.controlAreaStringProperty' ) ),
      currentDetails: {
        objectsPattern: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_objectsPattern', _.get( NumberPairsStrings, 'a11y.screenSummary.currentDetails.objectsPatternStringProperty' ), [{"name":"count","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        hiddenAreaPattern: new FluentPattern<{ hiddenAddend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_hiddenAreaPattern', _.get( NumberPairsStrings, 'a11y.screenSummary.currentDetails.hiddenAreaPatternStringProperty' ), [{"name":"hiddenAddend"}] ),
        bothHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_bothHidden', _.get( NumberPairsStrings, 'a11y.screenSummary.currentDetails.bothHiddenStringProperty' ) )
      },
      interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_interactionHint', _.get( NumberPairsStrings, 'a11y.screenSummary.interactionHintStringProperty' ) )
    },
    _comment_1: new FluentComment( {"comment":"Basic terms and interactions","associatedKey":"left"} ),
    leftStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_left', _.get( NumberPairsStrings, 'a11y.leftStringProperty' ) ),
    rightStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_right', _.get( NumberPairsStrings, 'a11y.rightStringProperty' ) ),
    leftCapitalizedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_leftCapitalized', _.get( NumberPairsStrings, 'a11y.leftCapitalizedStringProperty' ) ),
    rightCapitalizedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_rightCapitalized', _.get( NumberPairsStrings, 'a11y.rightCapitalizedStringProperty' ) ),
    movableRoleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_movableRoleDescription', _.get( NumberPairsStrings, 'a11y.movableRoleDescriptionStringProperty' ) ),
    countingAreaEmptyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_countingAreaEmpty', _.get( NumberPairsStrings, 'a11y.countingAreaEmptyStringProperty' ) ),
    grabOrReleaseInteraction: {
      releasedHelpText: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_releasedHelpText', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.releasedHelpTextStringProperty' ), [{"name":"item"}] ),
      grabbedHelpTextPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_grabbedHelpTextPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.grabbedHelpTextPatternStringProperty' ), [{"name":"item"}] ),
      grabbedAccessibleResponse: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_grabbedAccessibleResponse', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.grabbedAccessibleResponseStringProperty' ), [{"name":"addend"}] ),
      releasedAccessibleResponse: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_releasedAccessibleResponse', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.releasedAccessibleResponseStringProperty' ), [{"name":"addend"}] ),
      movedAccessibleResponse: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_movedAccessibleResponse', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.movedAccessibleResponseStringProperty' ), [{"name":"addend"}] ),
      firstLeftItemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_firstLeftItemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.firstLeftItemPatternStringProperty' ), [{"name":"item"}] ),
      leftItemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_leftItemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.leftItemPatternStringProperty' ), [{"name":"item"}] ),
      lastLeftItemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_lastLeftItemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.lastLeftItemPatternStringProperty' ), [{"name":"item"}] ),
      onlyLeftItemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_onlyLeftItemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.onlyLeftItemPatternStringProperty' ), [{"name":"item"}] ),
      firstRightItemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_firstRightItemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.firstRightItemPatternStringProperty' ), [{"name":"item"}] ),
      rightItemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_rightItemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.rightItemPatternStringProperty' ), [{"name":"item"}] ),
      lastRightItemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_lastRightItemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.lastRightItemPatternStringProperty' ), [{"name":"item"}] ),
      onlyRightItemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_onlyRightItemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.onlyRightItemPatternStringProperty' ), [{"name":"item"}] )
    },
    countingArea: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_countingArea_accessibleHeading', _.get( NumberPairsStrings, 'a11y.countingArea.accessibleHeadingStringProperty' ) ),
      leadingParagraph: new FluentPattern<{ item: FluentVariable, items: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_leadingParagraph', _.get( NumberPairsStrings, 'a11y.countingArea.leadingParagraphStringProperty' ), [{"name":"item"},{"name":"items"},{"name":"total"}] ),
      numberBondLeadingParagraph: new FluentPattern<{ total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_numberBondLeadingParagraph', _.get( NumberPairsStrings, 'a11y.countingArea.numberBondLeadingParagraphStringProperty' ), [{"name":"total"}] ),
      barModelLeadingParagraph: new FluentPattern<{ total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_barModelLeadingParagraph', _.get( NumberPairsStrings, 'a11y.countingArea.barModelLeadingParagraphStringProperty' ), [{"name":"total"}] ),
      leftSideListItemPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_leftSideListItemPattern', _.get( NumberPairsStrings, 'a11y.countingArea.leftSideListItemPatternStringProperty' ), [{"name":"value"}] ),
      rightSideListItemPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_rightSideListItemPattern', _.get( NumberPairsStrings, 'a11y.countingArea.rightSideListItemPatternStringProperty' ), [{"name":"value"}] ),
      leftCircleListItemPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_leftCircleListItemPattern', _.get( NumberPairsStrings, 'a11y.countingArea.leftCircleListItemPatternStringProperty' ), [{"name":"value"}] ),
      rightCircleListItemPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_rightCircleListItemPattern', _.get( NumberPairsStrings, 'a11y.countingArea.rightCircleListItemPatternStringProperty' ), [{"name":"value"}] ),
      valueHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_countingArea_valueHidden', _.get( NumberPairsStrings, 'a11y.countingArea.valueHiddenStringProperty' ) )
    },
    _comment_2: new FluentComment( {"comment":"Representation types","associatedKey":"representationType"} ),
    representationType: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_representationType_accessibleName', _.get( NumberPairsStrings, 'a11y.representationType.accessibleNameStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"TODO Can we remove the word decomposition here so it can be reused in other screens? https://github.com/phetsims/number-pairs/issues/200","associatedKey":"accessibleHelpText"} ),
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
    kittens: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_accessibleName', _.get( NumberPairsStrings, 'a11y.kittens.accessibleNameStringProperty' ) ),
      singularAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_singularAccessibleName', _.get( NumberPairsStrings, 'a11y.kittens.singularAccessibleNameStringProperty' ) ),
      changeColorAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_changeColorAccessibleName', _.get( NumberPairsStrings, 'a11y.kittens.changeColorAccessibleNameStringProperty' ) ),
      leftAddendColorStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_leftAddendColor', _.get( NumberPairsStrings, 'a11y.kittens.leftAddendColorStringProperty' ) ),
      rightAddendColorStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_rightAddendColor', _.get( NumberPairsStrings, 'a11y.kittens.rightAddendColorStringProperty' ) ),
      leftAddendKittenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_leftAddendKitten', _.get( NumberPairsStrings, 'a11y.kittens.leftAddendKittenStringProperty' ) ),
      rightAddendKittenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_rightAddendKitten', _.get( NumberPairsStrings, 'a11y.kittens.rightAddendKittenStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"TODO Can we remove the word decomposition here so it can be reused in other screens? https://github.com/phetsims/number-pairs/issues/200","associatedKey":"accessibleHelpText"} ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.kittens.accessibleHelpTextStringProperty' ) ),
      withoutAttributeSwitchHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_withoutAttributeSwitchHelpText', _.get( NumberPairsStrings, 'a11y.kittens.withoutAttributeSwitchHelpTextStringProperty' ) )
    },
    beads: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_accessibleName', _.get( NumberPairsStrings, 'a11y.beads.accessibleNameStringProperty' ) ),
      singularAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_singularAccessibleName', _.get( NumberPairsStrings, 'a11y.beads.singularAccessibleNameStringProperty' ) ),
      leftAddendBeadStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_leftAddendBead', _.get( NumberPairsStrings, 'a11y.beads.leftAddendBeadStringProperty' ) ),
      rightAddendBeadStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_rightAddendBead', _.get( NumberPairsStrings, 'a11y.beads.rightAddendBeadStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"TODO Can we remove the word decomposition here so it can be reused in other screens? https://github.com/phetsims/number-pairs/issues/200","associatedKey":"accessibleHelpText"} ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.beads.accessibleHelpTextStringProperty' ) )
    },
    _comment_3: new FluentComment( {"comment":"Number line","associatedKey":"numberLine"} ),
    numberLine: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLine_accessibleName', _.get( NumberPairsStrings, 'a11y.numberLine.accessibleNameStringProperty' ) )
    },
    _comment_4: new FluentComment( {"comment":"Total/Number model","associatedKey":"totalSceneSelection"} ),
    totalSceneSelection: {
      totalNumberPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_totalSceneSelection_totalNumberPattern', _.get( NumberPairsStrings, 'a11y.totalSceneSelection.totalNumberPatternStringProperty' ), [{"name":"value"}] ),
      _comment_0: new FluentComment( {"comment":"TODO Can we remove the word decomposition here so it can be reused in other screens? https://github.com/phetsims/number-pairs/issues/200","associatedKey":"accessibleHelpText"} ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_totalSceneSelection_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.totalSceneSelection.accessibleHelpTextStringProperty' ) )
    },
    totalCheckbox: {
      _comment_0: new FluentComment( {"comment":"TODO Can we remove the word decomposition here so it can be reused in other screens? https://github.com/phetsims/number-pairs/issues/200","associatedKey":"accessibleHelpText"} ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_totalCheckbox_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.totalCheckbox.accessibleHelpTextStringProperty' ) )
    },
    _comment_5: new FluentComment( {"comment":"Controls and interactions","associatedKey":"controls"} ),
    controls: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_accessibleHeading', _.get( NumberPairsStrings, 'a11y.controls.accessibleHeadingStringProperty' ) ),
      phrase: {
        _comment_0: new FluentComment( {"comment":"TODO Can we remove the word decomposition here so it can be reused in other screens? https://github.com/phetsims/number-pairs/issues/200","associatedKey":"accessibleHelpText"} ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_phrase_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.phrase.accessibleHelpTextStringProperty' ) )
      },
      speechSynthesis: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_speechSynthesis_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.speechSynthesis.accessibleNameStringProperty' ) ),
        noVoiceAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_speechSynthesis_noVoiceAccessibleName', _.get( NumberPairsStrings, 'a11y.controls.speechSynthesis.noVoiceAccessibleNameStringProperty' ) ),
        noVoiceAccessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_speechSynthesis_noVoiceAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.controls.speechSynthesis.noVoiceAccessibleParagraphStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"TODO Can we remove the word decomposition here so it can be reused in other screens? https://github.com/phetsims/number-pairs/issues/200","associatedKey":"accessibleHelpText"} ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_speechSynthesis_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.speechSynthesis.accessibleHelpTextStringProperty' ) )
      },
      localeSwitch: {
        _comment_0: new FluentComment( {"comment":"TODO Can we remove the word decomposition here so it can be reused in other screens? https://github.com/phetsims/number-pairs/issues/200","associatedKey":"accessibleHelpText"} ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_localeSwitch_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.localeSwitch.accessibleHelpTextStringProperty' ) )
      },
      numberModel: {
        numberBondStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_numberBond', _.get( NumberPairsStrings, 'a11y.controls.numberModel.numberBondStringProperty' ) ),
        barModelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_barModel', _.get( NumberPairsStrings, 'a11y.controls.numberModel.barModelStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"TODO Can we remove the word decomposition here so it can be reused in other screens? https://github.com/phetsims/number-pairs/issues/200","associatedKey":"accessibleHelpText"} ),
        accessibleHelpText: new FluentPattern<{ representation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_numberModel_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.numberModel.accessibleHelpTextStringProperty' ), [{"name":"representation"}] ),
        numberBondAccessibleParagraph: new FluentPattern<{ left: FluentVariable, right: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_numberModel_numberBondAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.controls.numberModel.numberBondAccessibleParagraphStringProperty' ), [{"name":"left"},{"name":"right"},{"name":"total"}] ),
        barModelAccessibleParagraph: new FluentPattern<{ left: FluentVariable, proportion: FluentVariable, right: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_numberModel_barModelAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.controls.numberModel.barModelAccessibleParagraphStringProperty' ), [{"name":"left"},{"name":"proportion"},{"name":"right"},{"name":"total"}] ),
        largerAndSmallerStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_largerAndSmaller', _.get( NumberPairsStrings, 'a11y.controls.numberModel.largerAndSmallerStringProperty' ) ),
        smallerAndLargerStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_smallerAndLarger', _.get( NumberPairsStrings, 'a11y.controls.numberModel.smallerAndLargerStringProperty' ) ),
        equalStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_equal', _.get( NumberPairsStrings, 'a11y.controls.numberModel.equalStringProperty' ) )
      },
      tenFrameButton: {
        accessibleName: new FluentPattern<{ representation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_tenFrameButton_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.tenFrameButton.accessibleNameStringProperty' ), [{"name":"representation"}] ),
        _comment_0: new FluentComment( {"comment":"TODO Can we remove the word decomposition here so it can be reused in other screens? https://github.com/phetsims/number-pairs/issues/200","associatedKey":"accessibleHelpText"} ),
        accessibleHelpText: new FluentPattern<{ representation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_tenFrameButton_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.tenFrameButton.accessibleHelpTextStringProperty' ), [{"name":"representation"}] ),
        accessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_tenFrameButton_accessibleContextResponse', _.get( NumberPairsStrings, 'a11y.controls.tenFrameButton.accessibleContextResponseStringProperty' ) )
      },
      commutativeButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_commutativeButton_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.commutativeButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextPattern: new FluentPattern<{ items: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_commutativeButton_accessibleHelpTextPattern', _.get( NumberPairsStrings, 'a11y.controls.commutativeButton.accessibleHelpTextPatternStringProperty' ), [{"name":"items"}] ),
        accessibleContextResponse: new FluentPattern<{ leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_commutativeButton_accessibleContextResponse', _.get( NumberPairsStrings, 'a11y.controls.commutativeButton.accessibleContextResponseStringProperty' ), [{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] )
      },
      addendVisible: {
        accessibleNamePattern: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_addendVisible_accessibleNamePattern', _.get( NumberPairsStrings, 'a11y.controls.addendVisible.accessibleNamePatternStringProperty' ), [{"name":"addend"}] ),
        accessibleHelpTextPattern: new FluentPattern<{ addend: FluentVariable, modelRepresentation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_addendVisible_accessibleHelpTextPattern', _.get( NumberPairsStrings, 'a11y.controls.addendVisible.accessibleHelpTextPatternStringProperty' ), [{"name":"addend"},{"name":"modelRepresentation"}] ),
        accessibleContextResponse: {
          hiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_addendVisible_accessibleContextResponse_hidden', _.get( NumberPairsStrings, 'a11y.controls.addendVisible.accessibleContextResponse.hiddenStringProperty' ) ),
          visibleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_addendVisible_accessibleContextResponse_visible', _.get( NumberPairsStrings, 'a11y.controls.addendVisible.accessibleContextResponse.visibleStringProperty' ) )
        }
      },
      showAddends: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_showAddends_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.showAddends.accessibleNameStringProperty' ) )
      },
      hideAddends: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_hideAddends_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.hideAddends.accessibleNameStringProperty' ) )
      },
      leftObjects: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_leftObjects_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.leftObjects.accessibleNameStringProperty' ) )
      },
      rightObjects: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_rightObjects_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.rightObjects.accessibleNameStringProperty' ) )
      },
      countingObjectControl: {
        _comment_0: new FluentComment( {"comment":"TODO Can we remove the word decomposition here so it can be reused in other screens? https://github.com/phetsims/number-pairs/issues/200","associatedKey":"accessibleHelpText"} ),
        accessibleHelpText: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_countingObjectControl_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.countingObjectControl.accessibleHelpTextStringProperty' ), [{"name":"addend"}] )
      },
      countFromZeroSwitch: {
        valueAAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_countFromZeroSwitch_valueAAccessibleName', _.get( NumberPairsStrings, 'a11y.controls.countFromZeroSwitch.valueAAccessibleNameStringProperty' ) ),
        valueBAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_countFromZeroSwitch_valueBAccessibleName', _.get( NumberPairsStrings, 'a11y.controls.countFromZeroSwitch.valueBAccessibleNameStringProperty' ) )
      },
      totalCheckbox: {
        _comment_0: new FluentComment( {"comment":"TODO Can we remove the word decomposition here so it can be reused in other screens? https://github.com/phetsims/number-pairs/issues/200","associatedKey":"accessibleHelpText"} ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_totalCheckbox_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.totalCheckbox.accessibleHelpTextStringProperty' ) )
      }
    },
    _comment_6: new FluentComment( {"comment":"Preferences","associatedKey":"preferences"} ),
    preferences: {
      sumScreenModelOrientation: {
        totalOnTopStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_preferences_sumScreenModelOrientation_totalOnTop', _.get( NumberPairsStrings, 'a11y.preferences.sumScreenModelOrientation.totalOnTopStringProperty' ) ),
        totalOnBottomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_preferences_sumScreenModelOrientation_totalOnBottom', _.get( NumberPairsStrings, 'a11y.preferences.sumScreenModelOrientation.totalOnBottomStringProperty' ) )
      }
    },
    _comment_7: new FluentComment( {"comment":"Keyboard help dialog","associatedKey":"keyboardHelpDialog"} ),
    keyboardHelpDialog: {
      moveAcrossDescription: {
        labelInnerContent: new FluentPattern<{ addend: FluentVariable, item: FluentVariable, key: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_moveAcrossDescription_labelInnerContent', _.get( NumberPairsStrings, 'a11y.keyboardHelpDialog.moveAcrossDescription.labelInnerContentStringProperty' ), [{"name":"addend"},{"name":"item"},{"name":"key"}] )
      },
      adjustObjectsKeyboard: {
        labelInnerContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_adjustObjectsKeyboard_labelInnerContent', _.get( NumberPairsStrings, 'a11y.keyboardHelpDialog.adjustObjectsKeyboard.labelInnerContentStringProperty' ) )
      },
      kittenInteraction: {
        jumpToFirstLabelInnerContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_kittenInteraction_jumpToFirstLabelInnerContent', _.get( NumberPairsStrings, 'a11y.keyboardHelpDialog.kittenInteraction.jumpToFirstLabelInnerContentStringProperty' ) ),
        jumpToLastLabelInnerContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_kittenInteraction_jumpToLastLabelInnerContent', _.get( NumberPairsStrings, 'a11y.keyboardHelpDialog.kittenInteraction.jumpToLastLabelInnerContentStringProperty' ) ),
        changeColorLabelInnerContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_kittenInteraction_changeColorLabelInnerContent', _.get( NumberPairsStrings, 'a11y.keyboardHelpDialog.kittenInteraction.changeColorLabelInnerContentStringProperty' ) )
      }
    }
  }
};

export default NumberPairsFluent;

numberPairs.register('NumberPairsFluent', NumberPairsFluent);
