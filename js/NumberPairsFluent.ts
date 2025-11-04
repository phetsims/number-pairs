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
addToMapIfDefined( 'keyboardHelpDialog_gameScreen_moveKittenItemHeading', 'keyboardHelpDialog.gameScreen.moveKittenItemHeadingStringProperty' );
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
addToMapIfDefined( 'numberBondLowercase', 'numberBondLowercaseStringProperty' );
addToMapIfDefined( 'barModel', 'barModelStringProperty' );
addToMapIfDefined( 'barModelLowercase', 'barModelLowercaseStringProperty' );
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
addToMapIfDefined( 'gameScreen_levelDescriptions_level3', 'gameScreen.levelDescriptions.level3StringProperty' );
addToMapIfDefined( 'gameScreen_levelDescriptions_level4', 'gameScreen.levelDescriptions.level4StringProperty' );
addToMapIfDefined( 'gameScreen_levelDescriptions_level6', 'gameScreen.levelDescriptions.level6StringProperty' );
addToMapIfDefined( 'gameScreen_levelDescriptions_level7', 'gameScreen.levelDescriptions.level7StringProperty' );
addToMapIfDefined( 'gameScreen_levelDescriptions_level8', 'gameScreen.levelDescriptions.level8StringProperty' );
addToMapIfDefined( 'a11y_playAreaIntroSentence', 'a11y.playAreaIntroSentenceStringProperty' );
addToMapIfDefined( 'a11y_introScreen_screenSummary_playArea', 'a11y.introScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_introScreen_screenSummary_controlArea', 'a11y.introScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_introScreen_screenSummary_currentDetails_objectsPattern', 'a11y.introScreen.screenSummary.currentDetails.objectsPatternStringProperty' );
addToMapIfDefined( 'a11y_introScreen_screenSummary_currentDetails_hiddenAreaPattern', 'a11y.introScreen.screenSummary.currentDetails.hiddenAreaPatternStringProperty' );
addToMapIfDefined( 'a11y_introScreen_screenSummary_currentDetails_bothHidden', 'a11y.introScreen.screenSummary.currentDetails.bothHiddenStringProperty' );
addToMapIfDefined( 'a11y_introScreen_screenSummary_interactionHint', 'a11y.introScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_tenOrTwentyScreen_screenSummary_playArea', 'a11y.tenOrTwentyScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_tenOrTwentyScreen_screenSummary_controlArea', 'a11y.tenOrTwentyScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_tenOrTwentyScreen_screenSummary_currentDetails', 'a11y.tenOrTwentyScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_tenOrTwentyScreen_screenSummary_interactionHint', 'a11y.tenOrTwentyScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_sumScreen_screenSummary_playArea', 'a11y.sumScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_sumScreen_screenSummary_controlArea', 'a11y.sumScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_sumScreen_screenSummary_currentDetails', 'a11y.sumScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_sumScreen_screenSummary_interactionHint', 'a11y.sumScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_left', 'a11y.leftStringProperty' );
addToMapIfDefined( 'a11y_right', 'a11y.rightStringProperty' );
addToMapIfDefined( 'a11y_leftAddendColor', 'a11y.leftAddendColorStringProperty' );
addToMapIfDefined( 'a11y_rightAddendColor', 'a11y.rightAddendColorStringProperty' );
addToMapIfDefined( 'a11y_leftCapitalized', 'a11y.leftCapitalizedStringProperty' );
addToMapIfDefined( 'a11y_rightCapitalized', 'a11y.rightCapitalizedStringProperty' );
addToMapIfDefined( 'a11y_movableRoleDescription', 'a11y.movableRoleDescriptionStringProperty' );
addToMapIfDefined( 'a11y_countingAreaEmpty', 'a11y.countingAreaEmptyStringProperty' );
addToMapIfDefined( 'a11y_unknownNumber', 'a11y.unknownNumberStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_releasedHelpText', 'a11y.grabOrReleaseInteraction.releasedHelpTextStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_grabbedHelpTextPattern', 'a11y.grabOrReleaseInteraction.grabbedHelpTextPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_grabbedAccessibleResponse', 'a11y.grabOrReleaseInteraction.grabbedAccessibleResponseStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_releasedAccessibleResponse', 'a11y.grabOrReleaseInteraction.releasedAccessibleResponseStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_movedAccessibleResponse', 'a11y.grabOrReleaseInteraction.movedAccessibleResponseStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_leftSide_firstItemPattern', 'a11y.grabOrReleaseInteraction.leftSide.firstItemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_leftSide_itemPattern', 'a11y.grabOrReleaseInteraction.leftSide.itemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_leftSide_lastItemPattern', 'a11y.grabOrReleaseInteraction.leftSide.lastItemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_leftSide_onlyItemPattern', 'a11y.grabOrReleaseInteraction.leftSide.onlyItemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_rightSide_firstItemPattern', 'a11y.grabOrReleaseInteraction.rightSide.firstItemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_rightSide_itemPattern', 'a11y.grabOrReleaseInteraction.rightSide.itemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_rightSide_lastItemPattern', 'a11y.grabOrReleaseInteraction.rightSide.lastItemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_rightSide_onlyItemPattern', 'a11y.grabOrReleaseInteraction.rightSide.onlyItemPatternStringProperty' );
addToMapIfDefined( 'a11y_grabOrReleaseInteraction_noItemSelected', 'a11y.grabOrReleaseInteraction.noItemSelectedStringProperty' );
addToMapIfDefined( 'a11y_countingArea_accessibleHeading', 'a11y.countingArea.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_countingArea_leadingParagraph', 'a11y.countingArea.leadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_countingArea_numberBondLeadingParagraph', 'a11y.countingArea.numberBondLeadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_countingArea_barModelLeadingParagraph', 'a11y.countingArea.barModelLeadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_countingArea_leftSideListItemPattern', 'a11y.countingArea.leftSideListItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_rightSideListItemPattern', 'a11y.countingArea.rightSideListItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_leftSideBeadsPattern', 'a11y.countingArea.leftSideBeadsPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_rightSideBeadsPattern', 'a11y.countingArea.rightSideBeadsPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_yellowListItemPattern', 'a11y.countingArea.yellowListItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_blueListItemPattern', 'a11y.countingArea.blueListItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_leftCircleListItemPattern', 'a11y.countingArea.leftCircleListItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_rightCircleListItemPattern', 'a11y.countingArea.rightCircleListItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_addendValueHidden', 'a11y.countingArea.addendValueHiddenStringProperty' );
addToMapIfDefined( 'a11y_countingArea_totalValueHidden', 'a11y.countingArea.totalValueHiddenStringProperty' );
addToMapIfDefined( 'a11y_equationAccordionBox_accessibleHelpTextCollapsed', 'a11y.equationAccordionBox.accessibleHelpTextCollapsedStringProperty' );
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
addToMapIfDefined( 'a11y_kittens_kittenPattern', 'a11y.kittens.kittenPatternStringProperty' );
addToMapIfDefined( 'a11y_kittens_accessibleHelpText_withoutAttributeSwitch', 'a11y.kittens.accessibleHelpText.withoutAttributeSwitchStringProperty' );
addToMapIfDefined( 'a11y_beads_accessibleName', 'a11y.beads.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_beads_singularAccessibleName', 'a11y.beads.singularAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_beads_leftAddendBead', 'a11y.beads.leftAddendBeadStringProperty' );
addToMapIfDefined( 'a11y_beads_rightAddendBead', 'a11y.beads.rightAddendBeadStringProperty' );
addToMapIfDefined( 'a11y_beads_accessibleHelpText', 'a11y.beads.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_beads_contextResponse', 'a11y.beads.contextResponseStringProperty' );
addToMapIfDefined( 'a11y_beads_crossedDividerContextResponse', 'a11y.beads.crossedDividerContextResponseStringProperty' );
addToMapIfDefined( 'a11y_numberLine_accessibleName', 'a11y.numberLine.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_numberLine_addendSplitterKnob_accessibleName', 'a11y.numberLine.addendSplitterKnob.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_numberLine_addendSplitterKnob_accessibleHelpText', 'a11y.numberLine.addendSplitterKnob.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_numberLine_contextResponse', 'a11y.numberLine.contextResponseStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_leadingCountOn', 'a11y.numberLineDescription.leadingCountOnStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_leadingCountFromZero', 'a11y.numberLineDescription.leadingCountFromZeroStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_leadingHidden', 'a11y.numberLineDescription.leadingHiddenStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_totalStartsPattern', 'a11y.numberLineDescription.totalStartsPatternStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_totalSpansPattern', 'a11y.numberLineDescription.totalSpansPatternStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_knobIsAtPattern', 'a11y.numberLineDescription.knobIsAtPatternStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_knobSplits', 'a11y.numberLineDescription.knobSplitsStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_leftEdgeLabel', 'a11y.numberLineDescription.leftEdgeLabelStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_totalLabel', 'a11y.numberLineDescription.totalLabelStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_knobLabel', 'a11y.numberLineDescription.knobLabelStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_countOnLeftAddendPattern', 'a11y.numberLineDescription.countOnLeftAddendPatternStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_countOnJumpPattern', 'a11y.numberLineDescription.countOnJumpPatternStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_countFromZeroLeftAddendPattern', 'a11y.numberLineDescription.countFromZeroLeftAddendPatternStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_countFromZeroRightAddendPattern', 'a11y.numberLineDescription.countFromZeroRightAddendPatternStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_countOnTotalJumpPattern', 'a11y.numberLineDescription.countOnTotalJumpPatternStringProperty' );
addToMapIfDefined( 'a11y_numberLineDescription_countFromZeroTotalJumpPattern', 'a11y.numberLineDescription.countFromZeroTotalJumpPatternStringProperty' );
addToMapIfDefined( 'a11y_totalSceneSelection_totalNumberPattern', 'a11y.totalSceneSelection.totalNumberPatternStringProperty' );
addToMapIfDefined( 'a11y_totalSceneSelection_accessibleHelpText', 'a11y.totalSceneSelection.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_accessibleHeading', 'a11y.controls.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_controls_phrase_accessibleHelpTextCollapsed', 'a11y.controls.phrase.accessibleHelpTextCollapsedStringProperty' );
addToMapIfDefined( 'a11y_controls_speechSynthesis_accessibleName', 'a11y.controls.speechSynthesis.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_speechSynthesis_noVoiceAccessibleName', 'a11y.controls.speechSynthesis.noVoiceAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_speechSynthesis_noVoiceAccessibleParagraph', 'a11y.controls.speechSynthesis.noVoiceAccessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_controls_speechSynthesis_accessibleHelpText', 'a11y.controls.speechSynthesis.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_localeSwitch_accessibleHelpText', 'a11y.controls.localeSwitch.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_numberBond', 'a11y.controls.numberModel.numberBondStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_barModel', 'a11y.controls.numberModel.barModelStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_accessibleHelpText', 'a11y.controls.numberModel.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_numberBondAccessibleParagraph', 'a11y.controls.numberModel.numberBondAccessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_currentNumberBondStateAccessibleParagraph', 'a11y.controls.numberModel.currentNumberBondStateAccessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_barModelAccessibleParagraph', 'a11y.controls.numberModel.barModelAccessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_currentBarModelStateAccessibleParagraph', 'a11y.controls.numberModel.currentBarModelStateAccessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_largerAndSmaller', 'a11y.controls.numberModel.largerAndSmallerStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_smallerAndLarger', 'a11y.controls.numberModel.smallerAndLargerStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_equal', 'a11y.controls.numberModel.equalStringProperty' );
addToMapIfDefined( 'a11y_controls_tenFrameButton_accessibleName', 'a11y.controls.tenFrameButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_tenFrameButton_accessibleHelpText', 'a11y.controls.tenFrameButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_tenFrameButton_sumDistribution', 'a11y.controls.tenFrameButton.sumDistributionStringProperty' );
addToMapIfDefined( 'a11y_controls_tenFrameButton_decompositionDistribution', 'a11y.controls.tenFrameButton.decompositionDistributionStringProperty' );
addToMapIfDefined( 'a11y_controls_tenFrameButton_accessibleContextResponse', 'a11y.controls.tenFrameButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_controls_tenFrameButton_accessibleContextResponseGameCombined', 'a11y.controls.tenFrameButton.accessibleContextResponseGameCombinedStringProperty' );
addToMapIfDefined( 'a11y_controls_tenFrameButton_accessibleContextResponseGameSeparate', 'a11y.controls.tenFrameButton.accessibleContextResponseGameSeparateStringProperty' );
addToMapIfDefined( 'a11y_controls_commutativeButton_accessibleName', 'a11y.controls.commutativeButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_commutativeButton_accessibleHelpText', 'a11y.controls.commutativeButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_commutativeButton_accessibleContextResponse', 'a11y.controls.commutativeButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_controls_bothAddendsVisibleButton_accessibleName', 'a11y.controls.bothAddendsVisibleButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_bothAddendsVisibleButton_accessibleHelpTextPattern', 'a11y.controls.bothAddendsVisibleButton.accessibleHelpTextPatternStringProperty' );
addToMapIfDefined( 'a11y_controls_addendVisibleButton_accessibleNamePattern', 'a11y.controls.addendVisibleButton.accessibleNamePatternStringProperty' );
addToMapIfDefined( 'a11y_controls_addendVisibleButton_accessibleHelpTextPattern', 'a11y.controls.addendVisibleButton.accessibleHelpTextPatternStringProperty' );
addToMapIfDefined( 'a11y_controls_addendVisibleButton_accessibleContextResponseOn', 'a11y.controls.addendVisibleButton.accessibleContextResponseOnStringProperty' );
addToMapIfDefined( 'a11y_controls_addendVisibleButton_accessibleContextResponseOff', 'a11y.controls.addendVisibleButton.accessibleContextResponseOffStringProperty' );
addToMapIfDefined( 'a11y_controls_showAddends_accessibleName', 'a11y.controls.showAddends.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_hideAddends_accessibleName', 'a11y.controls.hideAddends.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_leftObjects_accessibleName', 'a11y.controls.leftObjects.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_rightObjects_accessibleName', 'a11y.controls.rightObjects.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_countingObjectControl_accessibleName', 'a11y.controls.countingObjectControl.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_countingObjectControl_accessibleHelpText', 'a11y.controls.countingObjectControl.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_countingObjectControl_incrementContextResponse', 'a11y.controls.countingObjectControl.incrementContextResponseStringProperty' );
addToMapIfDefined( 'a11y_controls_countingObjectControl_decrementContextResponse', 'a11y.controls.countingObjectControl.decrementContextResponseStringProperty' );
addToMapIfDefined( 'a11y_controls_countFromZeroSwitch_valueAAccessibleName', 'a11y.controls.countFromZeroSwitch.valueAAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_countFromZeroSwitch_valueBAccessibleName', 'a11y.controls.countFromZeroSwitch.valueBAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_countFromZeroSwitch_accessibleHelpText', 'a11y.controls.countFromZeroSwitch.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_totalCheckbox_accessibleHelpText', 'a11y.controls.totalCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_addendsCheckbox_accessibleHelpText', 'a11y.controls.addendsCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_addendsCheckbox_accessibleContextResponseChecked', 'a11y.controls.addendsCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_controls_addendsCheckbox_accessibleContextResponseUnchecked', 'a11y.controls.addendsCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_controls_tickNumbersCheckbox_accessibleHelpText', 'a11y.controls.tickNumbersCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_tickNumbersCheckbox_accessibleContextResponseChecked', 'a11y.controls.tickNumbersCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_controls_tickNumbersCheckbox_accessibleContextResponseUnchecked', 'a11y.controls.tickNumbersCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_controls_totalJumpCheckbox_accessibleHelpText', 'a11y.controls.totalJumpCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_totalJumpCheckbox_accessibleContextResponseChecked', 'a11y.controls.totalJumpCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_controls_totalJumpCheckbox_accessibleContextResponseUnchecked', 'a11y.controls.totalJumpCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_equation_accessibleParagraphPattern', 'a11y.equation.accessibleParagraphPatternStringProperty' );
addToMapIfDefined( 'a11y_equation_accessibleParagraphHiddenPattern', 'a11y.equation.accessibleParagraphHiddenPatternStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_whatNumber', 'a11y.gameScreen.whatNumberStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_decompositionChallengePrompt', 'a11y.gameScreen.decompositionChallengePromptStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challengeSumPrompt', 'a11y.gameScreen.challengeSumPromptStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_accessibleChallengePromptFinalSentence', 'a11y.gameScreen.accessibleChallengePromptFinalSentenceStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challengeSupports_accessibleHeading', 'a11y.gameScreen.challengeSupports.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_bothAddendsEyeToggleButton_accessibleHelpText', 'a11y.gameScreen.bothAddendsEyeToggleButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_bothAddendsEyeToggleButton_accessibleContextResponseOff', 'a11y.gameScreen.bothAddendsEyeToggleButton.accessibleContextResponseOffStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_bothAddendsEyeToggleButton_accessibleContextResponseOn', 'a11y.gameScreen.bothAddendsEyeToggleButton.accessibleContextResponseOnStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level1_accessibleHelpText', 'a11y.gameScreen.level1.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level1_accessibleChallengePrompt', 'a11y.gameScreen.level1.accessibleChallengePromptStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level2_accessibleHelpText', 'a11y.gameScreen.level2.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level2_accessibleChallengePrompt', 'a11y.gameScreen.level2.accessibleChallengePromptStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level3_accessibleHelpText', 'a11y.gameScreen.level3.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level3_accessibleChallengePrompt', 'a11y.gameScreen.level3.accessibleChallengePromptStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level4_accessibleHelpText', 'a11y.gameScreen.level4.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level4_accessibleChallengePrompt', 'a11y.gameScreen.level4.accessibleChallengePromptStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level5_accessibleHelpText', 'a11y.gameScreen.level5.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level5_accessibleChallengePrompt', 'a11y.gameScreen.level5.accessibleChallengePromptStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level6_accessibleHelpText', 'a11y.gameScreen.level6.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level6_accessibleChallengePrompt', 'a11y.gameScreen.level6.accessibleChallengePromptStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level7_accessibleHelpText', 'a11y.gameScreen.level7.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level7_accessibleChallengePrompt', 'a11y.gameScreen.level7.accessibleChallengePromptStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level8_accessibleHelpText', 'a11y.gameScreen.level8.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level8_accessibleChallengePrompt', 'a11y.gameScreen.level8.accessibleChallengePromptStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_answerButton_wrongAccessibleName', 'a11y.gameScreen.answerButton.wrongAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_answerButtonGroup_accessibleHeading', 'a11y.gameScreen.answerButtonGroup.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_answerButtonGroup_accessibleName', 'a11y.gameScreen.answerButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_answerButtonGroup_accessibleHelpText', 'a11y.gameScreen.answerButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_tenFrameButton_accessibleHelpText', 'a11y.gameScreen.tenFrameButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_responses_correctAnswer', 'a11y.gameScreen.responses.correctAnswerStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_responses_incorrectAnswer', 'a11y.gameScreen.responses.incorrectAnswerStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_responses_correctAnswerOnFirstTry', 'a11y.gameScreen.responses.correctAnswerOnFirstTryStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_resetChallengeButton_accessibleName', 'a11y.gameScreen.resetChallengeButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_resetChallengeButton_accessibleHelpText', 'a11y.gameScreen.resetChallengeButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_resetChallengeButton_accessibleContextResponse', 'a11y.gameScreen.resetChallengeButton.accessibleContextResponseStringProperty' );
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
    _comment_0: new FluentComment( {"comment":"Game","associatedKey":"gameScreen"} ),
    gameScreen: {
      moveKittenItemHeadingStringProperty: _.get( NumberPairsStrings, 'keyboardHelpDialog.gameScreen.moveKittenItemHeadingStringProperty' )
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
  numberBondLowercaseStringProperty: _.get( NumberPairsStrings, 'numberBondLowercaseStringProperty' ),
  _comment_1: new FluentComment( {"comment":"TODO https://github.com/phetsims/number-pairs/issues/200 this value doesn't match the key","associatedKey":"barModel"} ),
  barModelStringProperty: _.get( NumberPairsStrings, 'barModelStringProperty' ),
  barModelLowercaseStringProperty: _.get( NumberPairsStrings, 'barModelLowercaseStringProperty' ),
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
  _comment_2: new FluentComment( {"comment":"Game","associatedKey":"gameScreen"} ),
  gameScreen: {
    levelDescriptions: {
      level1StringProperty: _.get( NumberPairsStrings, 'gameScreen.levelDescriptions.level1StringProperty' ),
      level2StringProperty: _.get( NumberPairsStrings, 'gameScreen.levelDescriptions.level2StringProperty' ),
      level3StringProperty: _.get( NumberPairsStrings, 'gameScreen.levelDescriptions.level3StringProperty' ),
      level4StringProperty: _.get( NumberPairsStrings, 'gameScreen.levelDescriptions.level4StringProperty' ),
      level5StringProperty: _.get( NumberPairsStrings, 'gameScreen.levelDescriptions.level5StringProperty' ),
      level6StringProperty: _.get( NumberPairsStrings, 'gameScreen.levelDescriptions.level6StringProperty' ),
      level7StringProperty: _.get( NumberPairsStrings, 'gameScreen.levelDescriptions.level7StringProperty' ),
      level8StringProperty: _.get( NumberPairsStrings, 'gameScreen.levelDescriptions.level8StringProperty' )
    },
    infoDialog: {
      levelWithDescriptionStringProperty: _.get( NumberPairsStrings, 'gameScreen.infoDialog.levelWithDescriptionStringProperty' )
    }
  },
  a11y: {
    playAreaIntroSentenceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_playAreaIntroSentence', _.get( NumberPairsStrings, 'a11y.playAreaIntroSentenceStringProperty' ) ),
    introScreen: {
      screenSummary: {
        playArea: new FluentPattern<{ numberBarOrBarModel: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_introScreen_screenSummary_playArea', _.get( NumberPairsStrings, 'a11y.introScreen.screenSummary.playAreaStringProperty' ), [{"name":"numberBarOrBarModel"}] ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_introScreen_screenSummary_controlArea', _.get( NumberPairsStrings, 'a11y.introScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetails: {
          objectsPattern: new FluentPattern<{ total: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_introScreen_screenSummary_currentDetails_objectsPattern', _.get( NumberPairsStrings, 'a11y.introScreen.screenSummary.currentDetails.objectsPatternStringProperty' ), [{"name":"total","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
          hiddenAreaPattern: new FluentPattern<{ hiddenAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_introScreen_screenSummary_currentDetails_hiddenAreaPattern', _.get( NumberPairsStrings, 'a11y.introScreen.screenSummary.currentDetails.hiddenAreaPatternStringProperty' ), [{"name":"hiddenAddend"},{"name":"total"}] ),
          bothHidden: new FluentPattern<{ total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_introScreen_screenSummary_currentDetails_bothHidden', _.get( NumberPairsStrings, 'a11y.introScreen.screenSummary.currentDetails.bothHiddenStringProperty' ), [{"name":"total"}] )
        },
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_introScreen_screenSummary_interactionHint', _.get( NumberPairsStrings, 'a11y.introScreen.screenSummary.interactionHintStringProperty' ) )
      }
    },
    tenOrTwentyScreen: {
      screenSummary: {
        playArea: new FluentPattern<{ numberBarOrBarModel: FluentVariable, representationType: 'numberLine' | 'beads' | 'kittens' | 'location' | TReadOnlyProperty<'numberLine' | 'beads' | 'kittens' | 'location'> }>( fluentSupport.bundleProperty, 'a11y_tenOrTwentyScreen_screenSummary_playArea', _.get( NumberPairsStrings, 'a11y.tenOrTwentyScreen.screenSummary.playAreaStringProperty' ), [{"name":"numberBarOrBarModel"},{"name":"representationType","variants":["numberLine","beads","kittens","location"]}] ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tenOrTwentyScreen_screenSummary_controlArea', _.get( NumberPairsStrings, 'a11y.tenOrTwentyScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetails: new FluentPattern<{ itemType: FluentVariable, representationType: 'numberLine' | 'beads' | 'kittens' | 'location' | TReadOnlyProperty<'numberLine' | 'beads' | 'kittens' | 'location'>, shownSides: 'none' | 'right' | 'left' | 'both' | TReadOnlyProperty<'none' | 'right' | 'left' | 'both'>, total: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_tenOrTwentyScreen_screenSummary_currentDetails', _.get( NumberPairsStrings, 'a11y.tenOrTwentyScreen.screenSummary.currentDetailsStringProperty' ), [{"name":"itemType"},{"name":"representationType","variants":["numberLine","beads","kittens","location"]},{"name":"shownSides","variants":["none","right","left","both"]},{"name":"total","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        interactionHint: new FluentPattern<{ representationType: 'beads' | 'kittens' | 'numberLine' | 'location' | TReadOnlyProperty<'beads' | 'kittens' | 'numberLine' | 'location'> }>( fluentSupport.bundleProperty, 'a11y_tenOrTwentyScreen_screenSummary_interactionHint', _.get( NumberPairsStrings, 'a11y.tenOrTwentyScreen.screenSummary.interactionHintStringProperty' ), [{"name":"representationType","variants":["beads","kittens","numberLine","location"]}] )
      }
    },
    sumScreen: {
      screenSummary: {
        playArea: new FluentPattern<{ numberBarOrBarModel: FluentVariable, representation: FluentVariable, representationType: 'numberLine' | number | 'other' | TReadOnlyProperty<'numberLine' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_sumScreen_screenSummary_playArea', _.get( NumberPairsStrings, 'a11y.sumScreen.screenSummary.playAreaStringProperty' ), [{"name":"numberBarOrBarModel"},{"name":"representation"},{"name":"representationType","variants":["numberLine",{"type":"number","value":"other"}]}] ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_sumScreen_screenSummary_controlArea', _.get( NumberPairsStrings, 'a11y.sumScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetails: new FluentPattern<{ itemType: FluentVariable, representationType: 'numberLine' | number | 'other' | TReadOnlyProperty<'numberLine' | number | 'other'>, shownSides: 'none' | 'both' | TReadOnlyProperty<'none' | 'both'>, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_sumScreen_screenSummary_currentDetails', _.get( NumberPairsStrings, 'a11y.sumScreen.screenSummary.currentDetailsStringProperty' ), [{"name":"itemType"},{"name":"representationType","variants":["numberLine",{"type":"number","value":"other"}]},{"name":"shownSides","variants":["none","both"]},{"name":"total"}] ),
        interactionHint: new FluentPattern<{ representationType: 'beads' | 'kittens' | 'numberLine' | TReadOnlyProperty<'beads' | 'kittens' | 'numberLine'> }>( fluentSupport.bundleProperty, 'a11y_sumScreen_screenSummary_interactionHint', _.get( NumberPairsStrings, 'a11y.sumScreen.screenSummary.interactionHintStringProperty' ), [{"name":"representationType","variants":["beads","kittens","numberLine"]}] )
      }
    },
    _comment_0: new FluentComment( {"comment":"Basic terms and interactions","associatedKey":"left"} ),
    leftStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_left', _.get( NumberPairsStrings, 'a11y.leftStringProperty' ) ),
    rightStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_right', _.get( NumberPairsStrings, 'a11y.rightStringProperty' ) ),
    leftAddendColorStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_leftAddendColor', _.get( NumberPairsStrings, 'a11y.leftAddendColorStringProperty' ) ),
    rightAddendColorStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_rightAddendColor', _.get( NumberPairsStrings, 'a11y.rightAddendColorStringProperty' ) ),
    leftCapitalizedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_leftCapitalized', _.get( NumberPairsStrings, 'a11y.leftCapitalizedStringProperty' ) ),
    rightCapitalizedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_rightCapitalized', _.get( NumberPairsStrings, 'a11y.rightCapitalizedStringProperty' ) ),
    movableRoleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_movableRoleDescription', _.get( NumberPairsStrings, 'a11y.movableRoleDescriptionStringProperty' ) ),
    countingAreaEmptyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_countingAreaEmpty', _.get( NumberPairsStrings, 'a11y.countingAreaEmptyStringProperty' ) ),
    unknownNumberStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_unknownNumber', _.get( NumberPairsStrings, 'a11y.unknownNumberStringProperty' ) ),
    grabOrReleaseInteraction: {
      releasedHelpText: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_releasedHelpText', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.releasedHelpTextStringProperty' ), [{"name":"item"}] ),
      grabbedHelpTextPattern: new FluentPattern<{ item: FluentVariable, representationType: 'beads' | number | 'other' | TReadOnlyProperty<'beads' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_grabbedHelpTextPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.grabbedHelpTextPatternStringProperty' ), [{"name":"item"},{"name":"representationType","variants":["beads",{"type":"number","value":"other"}]}] ),
      grabbedAccessibleResponse: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_grabbedAccessibleResponse', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.grabbedAccessibleResponseStringProperty' ), [{"name":"addend"}] ),
      releasedAccessibleResponse: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_releasedAccessibleResponse', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.releasedAccessibleResponseStringProperty' ), [{"name":"addend"}] ),
      movedAccessibleResponse: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_movedAccessibleResponse', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.movedAccessibleResponseStringProperty' ), [{"name":"addend"}] ),
      leftSide: {
        firstItemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_leftSide_firstItemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.leftSide.firstItemPatternStringProperty' ), [{"name":"item"}] ),
        itemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_leftSide_itemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.leftSide.itemPatternStringProperty' ), [{"name":"item"}] ),
        lastItemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_leftSide_lastItemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.leftSide.lastItemPatternStringProperty' ), [{"name":"item"}] ),
        onlyItemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_leftSide_onlyItemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.leftSide.onlyItemPatternStringProperty' ), [{"name":"item"}] )
      },
      rightSide: {
        firstItemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_rightSide_firstItemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.rightSide.firstItemPatternStringProperty' ), [{"name":"item"}] ),
        itemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_rightSide_itemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.rightSide.itemPatternStringProperty' ), [{"name":"item"}] ),
        lastItemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_rightSide_lastItemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.rightSide.lastItemPatternStringProperty' ), [{"name":"item"}] ),
        onlyItemPattern: new FluentPattern<{ item: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_rightSide_onlyItemPattern', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.rightSide.onlyItemPatternStringProperty' ), [{"name":"item"}] )
      },
      noItemSelectedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_noItemSelected', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.noItemSelectedStringProperty' ) )
    },
    countingArea: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_countingArea_accessibleHeading', _.get( NumberPairsStrings, 'a11y.countingArea.accessibleHeadingStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"Use the NUMBER syntax so fluent can handle a string of a number instead of just a number type.","associatedKey":"leadingParagraph"} ),
      leadingParagraph: new FluentPattern<{ item: FluentVariable, items: FluentVariable, total: 1 | number | 'other' | TReadOnlyProperty<1 | number | 'other'>, totalVisible: 'hidden' | 'shown' | TReadOnlyProperty<'hidden' | 'shown'> }>( fluentSupport.bundleProperty, 'a11y_countingArea_leadingParagraph', _.get( NumberPairsStrings, 'a11y.countingArea.leadingParagraphStringProperty' ), [{"name":"item"},{"name":"items"},{"name":"total","variants":[1,{"type":"number","value":"other"}]},{"name":"totalVisible","variants":["hidden","shown"]}] ),
      numberBondLeadingParagraph: new FluentPattern<{ total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_numberBondLeadingParagraph', _.get( NumberPairsStrings, 'a11y.countingArea.numberBondLeadingParagraphStringProperty' ), [{"name":"total"}] ),
      barModelLeadingParagraph: new FluentPattern<{ total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_barModelLeadingParagraph', _.get( NumberPairsStrings, 'a11y.countingArea.barModelLeadingParagraphStringProperty' ), [{"name":"total"}] ),
      leftSideListItemPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_leftSideListItemPattern', _.get( NumberPairsStrings, 'a11y.countingArea.leftSideListItemPatternStringProperty' ), [{"name":"value"}] ),
      rightSideListItemPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_rightSideListItemPattern', _.get( NumberPairsStrings, 'a11y.countingArea.rightSideListItemPatternStringProperty' ), [{"name":"value"}] ),
      leftSideBeadsPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_leftSideBeadsPattern', _.get( NumberPairsStrings, 'a11y.countingArea.leftSideBeadsPatternStringProperty' ), [{"name":"value"}] ),
      rightSideBeadsPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_rightSideBeadsPattern', _.get( NumberPairsStrings, 'a11y.countingArea.rightSideBeadsPatternStringProperty' ), [{"name":"value"}] ),
      yellowListItemPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_yellowListItemPattern', _.get( NumberPairsStrings, 'a11y.countingArea.yellowListItemPatternStringProperty' ), [{"name":"value"}] ),
      blueListItemPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_blueListItemPattern', _.get( NumberPairsStrings, 'a11y.countingArea.blueListItemPatternStringProperty' ), [{"name":"value"}] ),
      leftCircleListItemPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_leftCircleListItemPattern', _.get( NumberPairsStrings, 'a11y.countingArea.leftCircleListItemPatternStringProperty' ), [{"name":"value"}] ),
      rightCircleListItemPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_rightCircleListItemPattern', _.get( NumberPairsStrings, 'a11y.countingArea.rightCircleListItemPatternStringProperty' ), [{"name":"value"}] ),
      addendValueHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_countingArea_addendValueHidden', _.get( NumberPairsStrings, 'a11y.countingArea.addendValueHiddenStringProperty' ) ),
      totalValueHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_countingArea_totalValueHidden', _.get( NumberPairsStrings, 'a11y.countingArea.totalValueHiddenStringProperty' ) )
    },
    equationAccordionBox: {
      accessibleHelpTextCollapsedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equationAccordionBox_accessibleHelpTextCollapsed', _.get( NumberPairsStrings, 'a11y.equationAccordionBox.accessibleHelpTextCollapsedStringProperty' ) )
    },
    _comment_1: new FluentComment( {"comment":"Representation types","associatedKey":"representationType"} ),
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
    kittens: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_accessibleName', _.get( NumberPairsStrings, 'a11y.kittens.accessibleNameStringProperty' ) ),
      singularAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_singularAccessibleName', _.get( NumberPairsStrings, 'a11y.kittens.singularAccessibleNameStringProperty' ) ),
      changeColorAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_changeColorAccessibleName', _.get( NumberPairsStrings, 'a11y.kittens.changeColorAccessibleNameStringProperty' ) ),
      kittenPattern: new FluentPattern<{ color: FluentVariable, descriptor: 'first' | 'last' | 'only' | number | 'other' | TReadOnlyProperty<'first' | 'last' | 'only' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_kittens_kittenPattern', _.get( NumberPairsStrings, 'a11y.kittens.kittenPatternStringProperty' ), [{"name":"color"},{"name":"descriptor","variants":["first","last","only",{"type":"number","value":"other"}]}] ),
      accessibleHelpText: {
        withoutAttributeSwitchStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_accessibleHelpText_withoutAttributeSwitch', _.get( NumberPairsStrings, 'a11y.kittens.accessibleHelpText.withoutAttributeSwitchStringProperty' ) )
      }
    },
    beads: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_accessibleName', _.get( NumberPairsStrings, 'a11y.beads.accessibleNameStringProperty' ) ),
      singularAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_singularAccessibleName', _.get( NumberPairsStrings, 'a11y.beads.singularAccessibleNameStringProperty' ) ),
      leftAddendBeadStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_leftAddendBead', _.get( NumberPairsStrings, 'a11y.beads.leftAddendBeadStringProperty' ) ),
      rightAddendBeadStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_rightAddendBead', _.get( NumberPairsStrings, 'a11y.beads.rightAddendBeadStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.beads.accessibleHelpTextStringProperty' ) ),
      contextResponse: new FluentPattern<{ grabbedOrReleased: 'grabbed' | 'released' | TReadOnlyProperty<'grabbed' | 'released'>, side: 'left' | 'right' | TReadOnlyProperty<'left' | 'right'> }>( fluentSupport.bundleProperty, 'a11y_beads_contextResponse', _.get( NumberPairsStrings, 'a11y.beads.contextResponseStringProperty' ), [{"name":"grabbedOrReleased","variants":["grabbed","released"]},{"name":"side","variants":["left","right"]}] ),
      crossedDividerContextResponse: new FluentPattern<{ side: 'left' | 'right' | TReadOnlyProperty<'left' | 'right'> }>( fluentSupport.bundleProperty, 'a11y_beads_crossedDividerContextResponse', _.get( NumberPairsStrings, 'a11y.beads.crossedDividerContextResponseStringProperty' ), [{"name":"side","variants":["left","right"]}] )
    },
    _comment_2: new FluentComment( {"comment":"Number line","associatedKey":"numberLine"} ),
    numberLine: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLine_accessibleName', _.get( NumberPairsStrings, 'a11y.numberLine.accessibleNameStringProperty' ) ),
      addendSplitterKnob: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLine_addendSplitterKnob_accessibleName', _.get( NumberPairsStrings, 'a11y.numberLine.addendSplitterKnob.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLine_addendSplitterKnob_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.numberLine.addendSplitterKnob.accessibleHelpTextStringProperty' ) )
      },
      contextResponse: new FluentPattern<{ addendsShowing: 'addendsVisible' | 'addendsHidden' | TReadOnlyProperty<'addendsVisible' | 'addendsHidden'>, left: FluentVariable, right: FluentVariable, sections: 'smallerAndLarger' | 'equal' | 'largerAndSmaller' | TReadOnlyProperty<'smallerAndLarger' | 'equal' | 'largerAndSmaller'>, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_numberLine_contextResponse', _.get( NumberPairsStrings, 'a11y.numberLine.contextResponseStringProperty' ), [{"name":"addendsShowing","variants":["addendsVisible","addendsHidden"]},{"name":"left"},{"name":"right"},{"name":"sections","variants":["smallerAndLarger","equal","largerAndSmaller"]},{"name":"total"}] )
    },
    numberLineDescription: {
      leadingCountOnStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLineDescription_leadingCountOn', _.get( NumberPairsStrings, 'a11y.numberLineDescription.leadingCountOnStringProperty' ) ),
      leadingCountFromZeroStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLineDescription_leadingCountFromZero', _.get( NumberPairsStrings, 'a11y.numberLineDescription.leadingCountFromZeroStringProperty' ) ),
      leadingHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLineDescription_leadingHidden', _.get( NumberPairsStrings, 'a11y.numberLineDescription.leadingHiddenStringProperty' ) ),
      totalStartsPattern: new FluentPattern<{ end: FluentVariable, start: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_numberLineDescription_totalStartsPattern', _.get( NumberPairsStrings, 'a11y.numberLineDescription.totalStartsPatternStringProperty' ), [{"name":"end"},{"name":"start"}] ),
      totalSpansPattern: new FluentPattern<{ end: FluentVariable, start: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_numberLineDescription_totalSpansPattern', _.get( NumberPairsStrings, 'a11y.numberLineDescription.totalSpansPatternStringProperty' ), [{"name":"end"},{"name":"start"}] ),
      knobIsAtPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_numberLineDescription_knobIsAtPattern', _.get( NumberPairsStrings, 'a11y.numberLineDescription.knobIsAtPatternStringProperty' ), [{"name":"value"}] ),
      knobSplitsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLineDescription_knobSplits', _.get( NumberPairsStrings, 'a11y.numberLineDescription.knobSplitsStringProperty' ) ),
      leftEdgeLabelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLineDescription_leftEdgeLabel', _.get( NumberPairsStrings, 'a11y.numberLineDescription.leftEdgeLabelStringProperty' ) ),
      totalLabelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLineDescription_totalLabel', _.get( NumberPairsStrings, 'a11y.numberLineDescription.totalLabelStringProperty' ) ),
      knobLabelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_numberLineDescription_knobLabel', _.get( NumberPairsStrings, 'a11y.numberLineDescription.knobLabelStringProperty' ) ),
      countOnLeftAddendPattern: new FluentPattern<{ left: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_numberLineDescription_countOnLeftAddendPattern', _.get( NumberPairsStrings, 'a11y.numberLineDescription.countOnLeftAddendPatternStringProperty' ), [{"name":"left"}] ),
      countOnJumpPattern: new FluentPattern<{ right: FluentVariable, start: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_numberLineDescription_countOnJumpPattern', _.get( NumberPairsStrings, 'a11y.numberLineDescription.countOnJumpPatternStringProperty' ), [{"name":"right"},{"name":"start"}] ),
      countFromZeroLeftAddendPattern: new FluentPattern<{ left: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_numberLineDescription_countFromZeroLeftAddendPattern', _.get( NumberPairsStrings, 'a11y.numberLineDescription.countFromZeroLeftAddendPatternStringProperty' ), [{"name":"left"}] ),
      countFromZeroRightAddendPattern: new FluentPattern<{ right: FluentVariable, start: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_numberLineDescription_countFromZeroRightAddendPattern', _.get( NumberPairsStrings, 'a11y.numberLineDescription.countFromZeroRightAddendPatternStringProperty' ), [{"name":"right"},{"name":"start"}] ),
      countOnTotalJumpPattern: new FluentPattern<{ total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_numberLineDescription_countOnTotalJumpPattern', _.get( NumberPairsStrings, 'a11y.numberLineDescription.countOnTotalJumpPatternStringProperty' ), [{"name":"total"}] ),
      countFromZeroTotalJumpPattern: new FluentPattern<{ total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_numberLineDescription_countFromZeroTotalJumpPattern', _.get( NumberPairsStrings, 'a11y.numberLineDescription.countFromZeroTotalJumpPatternStringProperty' ), [{"name":"total"}] )
    },
    _comment_3: new FluentComment( {"comment":"Total/Number model","associatedKey":"totalSceneSelection"} ),
    totalSceneSelection: {
      totalNumberPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_totalSceneSelection_totalNumberPattern', _.get( NumberPairsStrings, 'a11y.totalSceneSelection.totalNumberPatternStringProperty' ), [{"name":"value"}] ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_totalSceneSelection_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.totalSceneSelection.accessibleHelpTextStringProperty' ) )
    },
    _comment_4: new FluentComment( {"comment":"Controls and interactions","associatedKey":"controls"} ),
    controls: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_accessibleHeading', _.get( NumberPairsStrings, 'a11y.controls.accessibleHeadingStringProperty' ) ),
      phrase: {
        accessibleHelpTextCollapsedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_phrase_accessibleHelpTextCollapsed', _.get( NumberPairsStrings, 'a11y.controls.phrase.accessibleHelpTextCollapsedStringProperty' ) )
      },
      speechSynthesis: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_speechSynthesis_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.speechSynthesis.accessibleNameStringProperty' ) ),
        noVoiceAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_speechSynthesis_noVoiceAccessibleName', _.get( NumberPairsStrings, 'a11y.controls.speechSynthesis.noVoiceAccessibleNameStringProperty' ) ),
        noVoiceAccessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_speechSynthesis_noVoiceAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.controls.speechSynthesis.noVoiceAccessibleParagraphStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_speechSynthesis_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.speechSynthesis.accessibleHelpTextStringProperty' ) )
      },
      localeSwitch: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_localeSwitch_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.localeSwitch.accessibleHelpTextStringProperty' ) )
      },
      numberModel: {
        numberBondStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_numberBond', _.get( NumberPairsStrings, 'a11y.controls.numberModel.numberBondStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"TODO https://github.com/phetsims/number-pairs/issues/200 this value doesn't match the key","associatedKey":"barModel"} ),
        barModelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_barModel', _.get( NumberPairsStrings, 'a11y.controls.numberModel.barModelStringProperty' ) ),
        accessibleHelpText: new FluentPattern<{ representation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_numberModel_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.numberModel.accessibleHelpTextStringProperty' ), [{"name":"representation"}] ),
        numberBondAccessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_numberBondAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.controls.numberModel.numberBondAccessibleParagraphStringProperty' ) ),
        currentNumberBondStateAccessibleParagraph: new FluentPattern<{ left: FluentVariable, right: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_numberModel_currentNumberBondStateAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.controls.numberModel.currentNumberBondStateAccessibleParagraphStringProperty' ), [{"name":"left"},{"name":"right"},{"name":"total"}] ),
        barModelAccessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_barModelAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.controls.numberModel.barModelAccessibleParagraphStringProperty' ) ),
        currentBarModelStateAccessibleParagraph: new FluentPattern<{ left: FluentVariable, proportions: FluentVariable, right: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_numberModel_currentBarModelStateAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.controls.numberModel.currentBarModelStateAccessibleParagraphStringProperty' ), [{"name":"left"},{"name":"proportions"},{"name":"right"},{"name":"total"}] ),
        largerAndSmallerStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_largerAndSmaller', _.get( NumberPairsStrings, 'a11y.controls.numberModel.largerAndSmallerStringProperty' ) ),
        smallerAndLargerStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_smallerAndLarger', _.get( NumberPairsStrings, 'a11y.controls.numberModel.smallerAndLargerStringProperty' ) ),
        equalStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_equal', _.get( NumberPairsStrings, 'a11y.controls.numberModel.equalStringProperty' ) )
      },
      tenFrameButton: {
        accessibleName: new FluentPattern<{ representation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_tenFrameButton_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.tenFrameButton.accessibleNameStringProperty' ), [{"name":"representation"}] ),
        accessibleHelpText: new FluentPattern<{ representation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_tenFrameButton_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.tenFrameButton.accessibleHelpTextStringProperty' ), [{"name":"representation"}] ),
        sumDistributionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_tenFrameButton_sumDistribution', _.get( NumberPairsStrings, 'a11y.controls.tenFrameButton.sumDistributionStringProperty' ) ),
        decompositionDistributionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_tenFrameButton_decompositionDistribution', _.get( NumberPairsStrings, 'a11y.controls.tenFrameButton.decompositionDistributionStringProperty' ) ),
        accessibleContextResponse: new FluentPattern<{ distribution: FluentVariable, representationType: 'kittens' | 'beads' | number | 'other' | TReadOnlyProperty<'kittens' | 'beads' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_controls_tenFrameButton_accessibleContextResponse', _.get( NumberPairsStrings, 'a11y.controls.tenFrameButton.accessibleContextResponseStringProperty' ), [{"name":"distribution"},{"name":"representationType","variants":["kittens","beads",{"type":"number","value":"other"}]}] ),
        accessibleContextResponseGameCombinedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_tenFrameButton_accessibleContextResponseGameCombined', _.get( NumberPairsStrings, 'a11y.controls.tenFrameButton.accessibleContextResponseGameCombinedStringProperty' ) ),
        accessibleContextResponseGameSeparateStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_tenFrameButton_accessibleContextResponseGameSeparate', _.get( NumberPairsStrings, 'a11y.controls.tenFrameButton.accessibleContextResponseGameSeparateStringProperty' ) )
      },
      commutativeButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_commutativeButton_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.commutativeButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_commutativeButton_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.commutativeButton.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponse: new FluentPattern<{ leftAddend: FluentVariable, representationType: 'attribute' | 'numberLine' | number | 'other' | TReadOnlyProperty<'attribute' | 'numberLine' | number | 'other'>, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_commutativeButton_accessibleContextResponse', _.get( NumberPairsStrings, 'a11y.controls.commutativeButton.accessibleContextResponseStringProperty' ), [{"name":"leftAddend"},{"name":"representationType","variants":["attribute","numberLine",{"type":"number","value":"other"}]},{"name":"rightAddend"},{"name":"total"}] )
      },
      bothAddendsVisibleButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_bothAddendsVisibleButton_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.bothAddendsVisibleButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextPattern: new FluentPattern<{ modelRepresentation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_bothAddendsVisibleButton_accessibleHelpTextPattern', _.get( NumberPairsStrings, 'a11y.controls.bothAddendsVisibleButton.accessibleHelpTextPatternStringProperty' ), [{"name":"modelRepresentation"}] )
      },
      addendVisibleButton: {
        accessibleNamePattern: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_addendVisibleButton_accessibleNamePattern', _.get( NumberPairsStrings, 'a11y.controls.addendVisibleButton.accessibleNamePatternStringProperty' ), [{"name":"addend"}] ),
        accessibleHelpTextPattern: new FluentPattern<{ addend: FluentVariable, modelRepresentation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_addendVisibleButton_accessibleHelpTextPattern', _.get( NumberPairsStrings, 'a11y.controls.addendVisibleButton.accessibleHelpTextPatternStringProperty' ), [{"name":"addend"},{"name":"modelRepresentation"}] ),
        accessibleContextResponseOnStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_addendVisibleButton_accessibleContextResponseOn', _.get( NumberPairsStrings, 'a11y.controls.addendVisibleButton.accessibleContextResponseOnStringProperty' ) ),
        accessibleContextResponseOffStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_addendVisibleButton_accessibleContextResponseOff', _.get( NumberPairsStrings, 'a11y.controls.addendVisibleButton.accessibleContextResponseOffStringProperty' ) )
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
        accessibleName: new FluentPattern<{ color: FluentVariable, representationType: 'kittens' | 'beads' | number | 'other' | TReadOnlyProperty<'kittens' | 'beads' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_controls_countingObjectControl_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.countingObjectControl.accessibleNameStringProperty' ), [{"name":"color"},{"name":"representationType","variants":["kittens","beads",{"type":"number","value":"other"}]}] ),
        accessibleHelpText: new FluentPattern<{ addend: FluentVariable, color: FluentVariable, representationType: 'kittens' | 'beads' | number | 'other' | TReadOnlyProperty<'kittens' | 'beads' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_controls_countingObjectControl_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.countingObjectControl.accessibleHelpTextStringProperty' ), [{"name":"addend"},{"name":"color"},{"name":"representationType","variants":["kittens","beads",{"type":"number","value":"other"}]}] ),
        incrementContextResponse: new FluentPattern<{ addend: FluentVariable, color: FluentVariable, representationType: 'kittens' | 'beads' | number | 'other' | TReadOnlyProperty<'kittens' | 'beads' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_controls_countingObjectControl_incrementContextResponse', _.get( NumberPairsStrings, 'a11y.controls.countingObjectControl.incrementContextResponseStringProperty' ), [{"name":"addend"},{"name":"color"},{"name":"representationType","variants":["kittens","beads",{"type":"number","value":"other"}]}] ),
        decrementContextResponse: new FluentPattern<{ addend: FluentVariable, color: FluentVariable, representationType: 'kittens' | 'beads' | number | 'other' | TReadOnlyProperty<'kittens' | 'beads' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_controls_countingObjectControl_decrementContextResponse', _.get( NumberPairsStrings, 'a11y.controls.countingObjectControl.decrementContextResponseStringProperty' ), [{"name":"addend"},{"name":"color"},{"name":"representationType","variants":["kittens","beads",{"type":"number","value":"other"}]}] )
      },
      countFromZeroSwitch: {
        valueAAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_countFromZeroSwitch_valueAAccessibleName', _.get( NumberPairsStrings, 'a11y.controls.countFromZeroSwitch.valueAAccessibleNameStringProperty' ) ),
        valueBAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_countFromZeroSwitch_valueBAccessibleName', _.get( NumberPairsStrings, 'a11y.controls.countFromZeroSwitch.valueBAccessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_countFromZeroSwitch_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.countFromZeroSwitch.accessibleHelpTextStringProperty' ) )
      },
      totalCheckbox: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_totalCheckbox_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.totalCheckbox.accessibleHelpTextStringProperty' ) )
      },
      addendsCheckbox: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_addendsCheckbox_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.addendsCheckbox.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseChecked: new FluentPattern<{ leftAddend: FluentVariable, rightAddend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_addendsCheckbox_accessibleContextResponseChecked', _.get( NumberPairsStrings, 'a11y.controls.addendsCheckbox.accessibleContextResponseCheckedStringProperty' ), [{"name":"leftAddend"},{"name":"rightAddend"}] ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_addendsCheckbox_accessibleContextResponseUnchecked', _.get( NumberPairsStrings, 'a11y.controls.addendsCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
      },
      tickNumbersCheckbox: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_tickNumbersCheckbox_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.tickNumbersCheckbox.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_tickNumbersCheckbox_accessibleContextResponseChecked', _.get( NumberPairsStrings, 'a11y.controls.tickNumbersCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_tickNumbersCheckbox_accessibleContextResponseUnchecked', _.get( NumberPairsStrings, 'a11y.controls.tickNumbersCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
      },
      totalJumpCheckbox: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_totalJumpCheckbox_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.totalJumpCheckbox.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_totalJumpCheckbox_accessibleContextResponseChecked', _.get( NumberPairsStrings, 'a11y.controls.totalJumpCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_totalJumpCheckbox_accessibleContextResponseUnchecked', _.get( NumberPairsStrings, 'a11y.controls.totalJumpCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
      }
    },
    equation: {
      accessibleParagraphPattern: new FluentPattern<{ leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_equation_accessibleParagraphPattern', _.get( NumberPairsStrings, 'a11y.equation.accessibleParagraphPatternStringProperty' ), [{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] ),
      accessibleParagraphHiddenPattern: new FluentPattern<{ leftPlaceholder: FluentVariable, rightPlaceholder: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_equation_accessibleParagraphHiddenPattern', _.get( NumberPairsStrings, 'a11y.equation.accessibleParagraphHiddenPatternStringProperty' ), [{"name":"leftPlaceholder"},{"name":"rightPlaceholder"},{"name":"total"}] )
    },
    _comment_5: new FluentComment( {"comment":"Game","associatedKey":"gameScreen"} ),
    gameScreen: {
      whatNumberStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_whatNumber', _.get( NumberPairsStrings, 'a11y.gameScreen.whatNumberStringProperty' ) ),
      decompositionChallengePrompt: new FluentPattern<{ addendOrSum: 'addend' | 'sum' | TReadOnlyProperty<'addend' | 'sum'>, leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_decompositionChallengePrompt', _.get( NumberPairsStrings, 'a11y.gameScreen.decompositionChallengePromptStringProperty' ), [{"name":"addendOrSum","variants":["addend","sum"]},{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] ),
      challengeSumPrompt: new FluentPattern<{ addendOrSum: 'addend' | 'sum' | TReadOnlyProperty<'addend' | 'sum'>, leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challengeSumPrompt', _.get( NumberPairsStrings, 'a11y.gameScreen.challengeSumPromptStringProperty' ), [{"name":"addendOrSum","variants":["addend","sum"]},{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] ),
      accessibleChallengePromptFinalSentence: new FluentPattern<{ addendOrSum: 'addend' | 'sum' | TReadOnlyProperty<'addend' | 'sum'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_accessibleChallengePromptFinalSentence', _.get( NumberPairsStrings, 'a11y.gameScreen.accessibleChallengePromptFinalSentenceStringProperty' ), [{"name":"addendOrSum","variants":["addend","sum"]}] ),
      challengeSupports: {
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challengeSupports_accessibleHeading', _.get( NumberPairsStrings, 'a11y.gameScreen.challengeSupports.accessibleHeadingStringProperty' ) )
      },
      _comment_0: new FluentComment( {"comment":"Overrides the values above, for the game","associatedKey":"bothAddendsEyeToggleButton"} ),
      bothAddendsEyeToggleButton: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_bothAddendsEyeToggleButton_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.bothAddendsEyeToggleButton.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseOffStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_bothAddendsEyeToggleButton_accessibleContextResponseOff', _.get( NumberPairsStrings, 'a11y.gameScreen.bothAddendsEyeToggleButton.accessibleContextResponseOffStringProperty' ) ),
        accessibleContextResponseOnStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_bothAddendsEyeToggleButton_accessibleContextResponseOn', _.get( NumberPairsStrings, 'a11y.gameScreen.bothAddendsEyeToggleButton.accessibleContextResponseOnStringProperty' ) )
      },
      level1: {
        accessibleHelpText: new FluentPattern<{ numberModelType: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_level1_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.level1.accessibleHelpTextStringProperty' ), [{"name":"numberModelType"}] ),
        accessibleChallengePrompt: new FluentPattern<{ addendOrSum: 'addend' | 'sum' | TReadOnlyProperty<'addend' | 'sum'>, leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_level1_accessibleChallengePrompt', _.get( NumberPairsStrings, 'a11y.gameScreen.level1.accessibleChallengePromptStringProperty' ), [{"name":"addendOrSum","variants":["addend","sum"]},{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] )
      },
      level2: {
        accessibleHelpText: new FluentPattern<{ numberModelType: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_level2_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.level2.accessibleHelpTextStringProperty' ), [{"name":"numberModelType"}] ),
        accessibleChallengePrompt: new FluentPattern<{ addendOrSum: 'addend' | 'sum' | TReadOnlyProperty<'addend' | 'sum'>, leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_level2_accessibleChallengePrompt', _.get( NumberPairsStrings, 'a11y.gameScreen.level2.accessibleChallengePromptStringProperty' ), [{"name":"addendOrSum","variants":["addend","sum"]},{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] )
      },
      level3: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_level3_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.level3.accessibleHelpTextStringProperty' ) ),
        accessibleChallengePrompt: new FluentPattern<{ addendOrSum: 'addend' | 'sum' | TReadOnlyProperty<'addend' | 'sum'>, leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_level3_accessibleChallengePrompt', _.get( NumberPairsStrings, 'a11y.gameScreen.level3.accessibleChallengePromptStringProperty' ), [{"name":"addendOrSum","variants":["addend","sum"]},{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] )
      },
      level4: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_level4_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.level4.accessibleHelpTextStringProperty' ) ),
        accessibleChallengePrompt: new FluentPattern<{ addendOrSum: 'addend' | 'sum' | TReadOnlyProperty<'addend' | 'sum'>, leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_level4_accessibleChallengePrompt', _.get( NumberPairsStrings, 'a11y.gameScreen.level4.accessibleChallengePromptStringProperty' ), [{"name":"addendOrSum","variants":["addend","sum"]},{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] )
      },
      level5: {
        accessibleHelpText: new FluentPattern<{ numberModelType: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_level5_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.level5.accessibleHelpTextStringProperty' ), [{"name":"numberModelType"}] ),
        accessibleChallengePrompt: new FluentPattern<{ addendOrSum: 'addend' | 'sum' | TReadOnlyProperty<'addend' | 'sum'>, leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_level5_accessibleChallengePrompt', _.get( NumberPairsStrings, 'a11y.gameScreen.level5.accessibleChallengePromptStringProperty' ), [{"name":"addendOrSum","variants":["addend","sum"]},{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] )
      },
      level6: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_level6_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.level6.accessibleHelpTextStringProperty' ) ),
        accessibleChallengePrompt: new FluentPattern<{ addendOrSum: 'addend' | 'sum' | TReadOnlyProperty<'addend' | 'sum'>, leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_level6_accessibleChallengePrompt', _.get( NumberPairsStrings, 'a11y.gameScreen.level6.accessibleChallengePromptStringProperty' ), [{"name":"addendOrSum","variants":["addend","sum"]},{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] )
      },
      level7: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_level7_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.level7.accessibleHelpTextStringProperty' ) ),
        accessibleChallengePrompt: new FluentPattern<{ addendOrSum: 'addend' | 'sum' | TReadOnlyProperty<'addend' | 'sum'>, leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_level7_accessibleChallengePrompt', _.get( NumberPairsStrings, 'a11y.gameScreen.level7.accessibleChallengePromptStringProperty' ), [{"name":"addendOrSum","variants":["addend","sum"]},{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] )
      },
      level8: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_level8_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.level8.accessibleHelpTextStringProperty' ) ),
        accessibleChallengePrompt: new FluentPattern<{ addendOrSum: 'addend' | 'sum' | TReadOnlyProperty<'addend' | 'sum'>, leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_level8_accessibleChallengePrompt', _.get( NumberPairsStrings, 'a11y.gameScreen.level8.accessibleChallengePromptStringProperty' ), [{"name":"addendOrSum","variants":["addend","sum"]},{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] )
      },
      answerButton: {
        wrongAccessibleName: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_answerButton_wrongAccessibleName', _.get( NumberPairsStrings, 'a11y.gameScreen.answerButton.wrongAccessibleNameStringProperty' ), [{"name":"value"}] )
      },
      answerButtonGroup: {
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_answerButtonGroup_accessibleHeading', _.get( NumberPairsStrings, 'a11y.gameScreen.answerButtonGroup.accessibleHeadingStringProperty' ) ),
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_answerButtonGroup_accessibleName', _.get( NumberPairsStrings, 'a11y.gameScreen.answerButtonGroup.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_answerButtonGroup_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.answerButtonGroup.accessibleHelpTextStringProperty' ) )
      },
      tenFrameButton: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_tenFrameButton_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.tenFrameButton.accessibleHelpTextStringProperty' ) )
      },
      responses: {
        correctAnswer: new FluentPattern<{ leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_responses_correctAnswer', _.get( NumberPairsStrings, 'a11y.gameScreen.responses.correctAnswerStringProperty' ), [{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] ),
        incorrectAnswer: new FluentPattern<{ leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_responses_incorrectAnswer', _.get( NumberPairsStrings, 'a11y.gameScreen.responses.incorrectAnswerStringProperty' ), [{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] ),
        correctAnswerOnFirstTry: new FluentPattern<{ leftAddend: FluentVariable, rightAddend: FluentVariable, score: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_responses_correctAnswerOnFirstTry', _.get( NumberPairsStrings, 'a11y.gameScreen.responses.correctAnswerOnFirstTryStringProperty' ), [{"name":"leftAddend"},{"name":"rightAddend"},{"name":"score"},{"name":"total"}] )
      },
      resetChallengeButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_resetChallengeButton_accessibleName', _.get( NumberPairsStrings, 'a11y.gameScreen.resetChallengeButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_resetChallengeButton_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.resetChallengeButton.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_resetChallengeButton_accessibleContextResponse', _.get( NumberPairsStrings, 'a11y.gameScreen.resetChallengeButton.accessibleContextResponseStringProperty' ) )
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
