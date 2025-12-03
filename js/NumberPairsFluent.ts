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
addToMapIfDefined( 'a11y_numberBondOrBarModel', 'a11y.numberBondOrBarModelStringProperty' );
addToMapIfDefined( 'a11y_numberBondOrBarModelLowercase', 'a11y.numberBondOrBarModelLowercaseStringProperty' );
addToMapIfDefined( 'a11y_playAreaIntroSentence', 'a11y.playAreaIntroSentenceStringProperty' );
addToMapIfDefined( 'a11y_screenButtonsHelpText_intro', 'a11y.screenButtonsHelpText.introStringProperty' );
addToMapIfDefined( 'a11y_screenButtonsHelpText_ten', 'a11y.screenButtonsHelpText.tenStringProperty' );
addToMapIfDefined( 'a11y_screenButtonsHelpText_twenty', 'a11y.screenButtonsHelpText.twentyStringProperty' );
addToMapIfDefined( 'a11y_screenButtonsHelpText_sum', 'a11y.screenButtonsHelpText.sumStringProperty' );
addToMapIfDefined( 'a11y_screenButtonsHelpText_game', 'a11y.screenButtonsHelpText.gameStringProperty' );
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
addToMapIfDefined( 'a11y_leftCapitalized', 'a11y.leftCapitalizedStringProperty' );
addToMapIfDefined( 'a11y_right', 'a11y.rightStringProperty' );
addToMapIfDefined( 'a11y_rightCapitalized', 'a11y.rightCapitalizedStringProperty' );
addToMapIfDefined( 'a11y_leftAddendColor', 'a11y.leftAddendColorStringProperty' );
addToMapIfDefined( 'a11y_rightAddendColor', 'a11y.rightAddendColorStringProperty' );
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
addToMapIfDefined( 'a11y_countingArea_leftSideListItemPattern', 'a11y.countingArea.leftSideListItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_rightSideListItemPattern', 'a11y.countingArea.rightSideListItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_leftSideBeadsPattern', 'a11y.countingArea.leftSideBeadsPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_rightSideBeadsPattern', 'a11y.countingArea.rightSideBeadsPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_yellowListItemPattern', 'a11y.countingArea.yellowListItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_blueListItemPattern', 'a11y.countingArea.blueListItemPatternStringProperty' );
addToMapIfDefined( 'a11y_countingArea_addendValueHidden', 'a11y.countingArea.addendValueHiddenStringProperty' );
addToMapIfDefined( 'a11y_equationAccordionBox_accessibleHelpTextCollapsed', 'a11y.equationAccordionBox.accessibleHelpTextCollapsedStringProperty' );
addToMapIfDefined( 'a11y_equationAccordionBox_addendsOnRightAccessibleParagraph', 'a11y.equationAccordionBox.addendsOnRightAccessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_equationAccordionBox_addendsOnLeftAccessibleParagraph', 'a11y.equationAccordionBox.addendsOnLeftAccessibleParagraphStringProperty' );
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
addToMapIfDefined( 'a11y_kittens_accessibleHelpText', 'a11y.kittens.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_kittens_changeColorAccessibleName', 'a11y.kittens.changeColorAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_kittens_kittenPattern', 'a11y.kittens.kittenPatternStringProperty' );
addToMapIfDefined( 'a11y_beads_accessibleName', 'a11y.beads.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_beads_singularAccessibleName', 'a11y.beads.singularAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_beads_leftAddendBead', 'a11y.beads.leftAddendBeadStringProperty' );
addToMapIfDefined( 'a11y_beads_rightAddendBead', 'a11y.beads.rightAddendBeadStringProperty' );
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
addToMapIfDefined( 'a11y_controls_phrase_accessibleHelpTextCollapsed', 'a11y.controls.phrase.accessibleHelpTextCollapsedStringProperty' );
addToMapIfDefined( 'a11y_controls_speechSynthesis_accessibleName', 'a11y.controls.speechSynthesis.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_speechSynthesis_noVoiceAccessibleName', 'a11y.controls.speechSynthesis.noVoiceAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_speechSynthesis_noVoiceAccessibleParagraph', 'a11y.controls.speechSynthesis.noVoiceAccessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_controls_speechSynthesis_accessibleHelpText', 'a11y.controls.speechSynthesis.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_localeSwitch_accessibleHelpText', 'a11y.controls.localeSwitch.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_numberBond', 'a11y.controls.numberModel.numberBondStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_barModel', 'a11y.controls.numberModel.barModelStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_accessibleHelpText', 'a11y.controls.numberModel.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_totalHidden', 'a11y.controls.numberModel.totalHiddenStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_totalMissing', 'a11y.controls.numberModel.totalMissingStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_leftAddendMissing', 'a11y.controls.numberModel.leftAddendMissingStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_rightAddendMissing', 'a11y.controls.numberModel.rightAddendMissingStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_numberBondAccessibleParagraph', 'a11y.controls.numberModel.numberBondAccessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_numberBondStateAccessibleParagraph', 'a11y.controls.numberModel.numberBondStateAccessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_barModelStateAccessibleParagraph', 'a11y.controls.numberModel.barModelStateAccessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_sumEquation', 'a11y.controls.numberModel.sumEquationStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_decompositionEquation', 'a11y.controls.numberModel.decompositionEquationStringProperty' );
addToMapIfDefined( 'a11y_controls_numberModel_barModelAccessibleParagraph', 'a11y.controls.numberModel.barModelAccessibleParagraphStringProperty' );
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
addToMapIfDefined( 'a11y_controls_countingObjectControl_accessibleName', 'a11y.controls.countingObjectControl.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_countingObjectControl_accessibleHelpText', 'a11y.controls.countingObjectControl.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_countingObjectControl_incrementContextResponse', 'a11y.controls.countingObjectControl.incrementContextResponseStringProperty' );
addToMapIfDefined( 'a11y_controls_countingObjectControl_decrementContextResponse', 'a11y.controls.countingObjectControl.decrementContextResponseStringProperty' );
addToMapIfDefined( 'a11y_controls_countFromZeroSwitch_valueAAccessibleName', 'a11y.controls.countFromZeroSwitch.valueAAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_countFromZeroSwitch_valueBAccessibleName', 'a11y.controls.countFromZeroSwitch.valueBAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controls_countFromZeroSwitch_accessibleHelpText', 'a11y.controls.countFromZeroSwitch.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_totalCheckbox_accessibleHelpText', 'a11y.controls.totalCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_totalCheckbox_accessibleContextResponseChecked', 'a11y.controls.totalCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_controls_totalCheckbox_accessibleContextResponseUnchecked', 'a11y.controls.totalCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_controls_addendsCheckbox_accessibleHelpText', 'a11y.controls.addendsCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_addendsCheckbox_accessibleContextResponseChecked', 'a11y.controls.addendsCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_controls_addendsCheckbox_accessibleContextResponseUnchecked', 'a11y.controls.addendsCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_controls_tickNumbersCheckbox_accessibleHelpText', 'a11y.controls.tickNumbersCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_tickNumbersCheckbox_accessibleContextResponseChecked', 'a11y.controls.tickNumbersCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_controls_tickNumbersCheckbox_accessibleContextResponseUnchecked', 'a11y.controls.tickNumbersCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_controls_totalJumpCheckbox_accessibleHelpText', 'a11y.controls.totalJumpCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controls_totalJumpCheckbox_accessibleContextResponseChecked', 'a11y.controls.totalJumpCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_controls_totalJumpCheckbox_accessibleContextResponseUnchecked', 'a11y.controls.totalJumpCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_whatNumber', 'a11y.gameScreen.whatNumberStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_questionMark', 'a11y.gameScreen.questionMarkStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_missingValue', 'a11y.gameScreen.missingValueStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challengePrompt', 'a11y.gameScreen.challengePromptStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_countingArea_accessibleHeading', 'a11y.gameScreen.countingArea.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_countingArea_numberLineLeftAddendColor', 'a11y.gameScreen.countingArea.numberLineLeftAddendColorStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_countingArea_numberLineRightAddendColor', 'a11y.gameScreen.countingArea.numberLineRightAddendColorStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_countingArea_numberLineSentence', 'a11y.gameScreen.countingArea.numberLineSentenceStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_countingArea_numberLineAddends', 'a11y.gameScreen.countingArea.numberLineAddendsStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_countingArea_numberLineTickMarks', 'a11y.gameScreen.countingArea.numberLineTickMarksStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_countingArea_hiddenAccessibleParagraph', 'a11y.gameScreen.countingArea.hiddenAccessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_countingArea_accessibleParagraph', 'a11y.gameScreen.countingArea.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_testCurrentAnswerSection_accessibleHeading', 'a11y.gameScreen.testCurrentAnswerSection.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_testCurrentAnswerSection_accessibleParagraph', 'a11y.gameScreen.testCurrentAnswerSection.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_answerChoices', 'a11y.gameScreen.answerChoicesStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challengeType', 'a11y.gameScreen.challengeTypeStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challengeSupports_accessibleHeading', 'a11y.gameScreen.challengeSupports.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_bothAddendsEyeToggleButton_accessibleHelpText', 'a11y.gameScreen.bothAddendsEyeToggleButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_bothAddendsEyeToggleButton_accessibleContextResponseOff', 'a11y.gameScreen.bothAddendsEyeToggleButton.accessibleContextResponseOffStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_bothAddendsEyeToggleButton_accessibleContextResponseOn', 'a11y.gameScreen.bothAddendsEyeToggleButton.accessibleContextResponseOnStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level_accessibleHelpText', 'a11y.gameScreen.level.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_level_accessibleHeading', 'a11y.gameScreen.level.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_answerButton_wrongAccessibleName', 'a11y.gameScreen.answerButton.wrongAccessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_answerButtonGroup_accessibleHeading', 'a11y.gameScreen.answerButtonGroup.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_answerButtonGroup_accessibleHelpText', 'a11y.gameScreen.answerButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_tenFrameButton_accessibleHelpText', 'a11y.gameScreen.tenFrameButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_responses_answerSelected', 'a11y.gameScreen.responses.answerSelectedStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_responses_answerCleared', 'a11y.gameScreen.responses.answerClearedStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_responses_correctAnswer', 'a11y.gameScreen.responses.correctAnswerStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_responses_incorrectAnswer', 'a11y.gameScreen.responses.incorrectAnswerStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_responses_correctAnswerOnFirstTry', 'a11y.gameScreen.responses.correctAnswerOnFirstTryStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_responses__correctAnswerScore', 'a11y.gameScreen.responses._correctAnswerScoreStringProperty' );
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
  _comment_1: new FluentComment( {"comment":"Game","associatedKey":"gameScreen"} ),
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
    numberBondOrBarModel: new FluentPattern<{ numberModelType: 'numberBond' | 'barModel' | TReadOnlyProperty<'numberBond' | 'barModel'> }>( fluentSupport.bundleProperty, 'a11y_numberBondOrBarModel', _.get( NumberPairsStrings, 'a11y.numberBondOrBarModelStringProperty' ), [{"name":"numberModelType","variants":["numberBond","barModel"]}] ),
    numberBondOrBarModelLowercase: new FluentPattern<{ numberModelType: 'numberBond' | 'barModel' | TReadOnlyProperty<'numberBond' | 'barModel'> }>( fluentSupport.bundleProperty, 'a11y_numberBondOrBarModelLowercase', _.get( NumberPairsStrings, 'a11y.numberBondOrBarModelLowercaseStringProperty' ), [{"name":"numberModelType","variants":["numberBond","barModel"]}] ),
    playAreaIntroSentenceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_playAreaIntroSentence', _.get( NumberPairsStrings, 'a11y.playAreaIntroSentenceStringProperty' ) ),
    screenButtonsHelpText: {
      intro: new FluentPattern<{ max: FluentVariable, min: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_screenButtonsHelpText_intro', _.get( NumberPairsStrings, 'a11y.screenButtonsHelpText.introStringProperty' ), [{"name":"max"},{"name":"min"}] ),
      ten: new FluentPattern<{ max: FluentVariable, min: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_screenButtonsHelpText_ten', _.get( NumberPairsStrings, 'a11y.screenButtonsHelpText.tenStringProperty' ), [{"name":"max"},{"name":"min"}] ),
      twenty: new FluentPattern<{ max: FluentVariable, min: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_screenButtonsHelpText_twenty', _.get( NumberPairsStrings, 'a11y.screenButtonsHelpText.twentyStringProperty' ), [{"name":"max"},{"name":"min"}] ),
      sum: new FluentPattern<{ max: FluentVariable, min: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_screenButtonsHelpText_sum', _.get( NumberPairsStrings, 'a11y.screenButtonsHelpText.sumStringProperty' ), [{"name":"max"},{"name":"min"}] ),
      game: new FluentPattern<{ max: FluentVariable, min: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_screenButtonsHelpText_game', _.get( NumberPairsStrings, 'a11y.screenButtonsHelpText.gameStringProperty' ), [{"name":"max"},{"name":"min"}] )
    },
    introScreen: {
      screenSummary: {
        playArea: new FluentPattern<{ max: FluentVariable, min: FluentVariable, numberModelType: 'numberBond' | 'barModel' | TReadOnlyProperty<'numberBond' | 'barModel'> }>( fluentSupport.bundleProperty, 'a11y_introScreen_screenSummary_playArea', _.get( NumberPairsStrings, 'a11y.introScreen.screenSummary.playAreaStringProperty' ), [{"name":"max"},{"name":"min"},{"name":"numberModelType","variants":["numberBond","barModel"]}] ),
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
        playArea: new FluentPattern<{ max: FluentVariable, min: FluentVariable, numberModelType: 'numberBond' | 'barModel' | TReadOnlyProperty<'numberBond' | 'barModel'>, representationType: 'numberLine' | 'beads' | 'kittens' | 'location' | TReadOnlyProperty<'numberLine' | 'beads' | 'kittens' | 'location'> }>( fluentSupport.bundleProperty, 'a11y_tenOrTwentyScreen_screenSummary_playArea', _.get( NumberPairsStrings, 'a11y.tenOrTwentyScreen.screenSummary.playAreaStringProperty' ), [{"name":"max"},{"name":"min"},{"name":"numberModelType","variants":["numberBond","barModel"]},{"name":"representationType","variants":["numberLine","beads","kittens","location"]}] ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tenOrTwentyScreen_screenSummary_controlArea', _.get( NumberPairsStrings, 'a11y.tenOrTwentyScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetails: new FluentPattern<{ itemType: FluentVariable, representationType: 'numberLine' | 'beads' | 'kittens' | 'location' | TReadOnlyProperty<'numberLine' | 'beads' | 'kittens' | 'location'>, shownSides: 'none' | 'right' | 'left' | 'both' | TReadOnlyProperty<'none' | 'right' | 'left' | 'both'>, total: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_tenOrTwentyScreen_screenSummary_currentDetails', _.get( NumberPairsStrings, 'a11y.tenOrTwentyScreen.screenSummary.currentDetailsStringProperty' ), [{"name":"itemType"},{"name":"representationType","variants":["numberLine","beads","kittens","location"]},{"name":"shownSides","variants":["none","right","left","both"]},{"name":"total","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        interactionHint: new FluentPattern<{ representationType: 'beads' | 'kittens' | 'numberLine' | 'location' | TReadOnlyProperty<'beads' | 'kittens' | 'numberLine' | 'location'> }>( fluentSupport.bundleProperty, 'a11y_tenOrTwentyScreen_screenSummary_interactionHint', _.get( NumberPairsStrings, 'a11y.tenOrTwentyScreen.screenSummary.interactionHintStringProperty' ), [{"name":"representationType","variants":["beads","kittens","numberLine","location"]}] )
      }
    },
    sumScreen: {
      screenSummary: {
        playArea: new FluentPattern<{ max: FluentVariable, min: FluentVariable, numberModelType: 'numberBond' | 'barModel' | TReadOnlyProperty<'numberBond' | 'barModel'>, representation: FluentVariable, representationType: 'numberLine' | number | 'other' | TReadOnlyProperty<'numberLine' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_sumScreen_screenSummary_playArea', _.get( NumberPairsStrings, 'a11y.sumScreen.screenSummary.playAreaStringProperty' ), [{"name":"max"},{"name":"min"},{"name":"numberModelType","variants":["numberBond","barModel"]},{"name":"representation"},{"name":"representationType","variants":["numberLine",{"type":"number","value":"other"}]}] ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_sumScreen_screenSummary_controlArea', _.get( NumberPairsStrings, 'a11y.sumScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetails: new FluentPattern<{ itemType: FluentVariable, representationType: 'numberLine' | number | 'other' | number | 'other' | TReadOnlyProperty<'numberLine' | number | 'other' | number | 'other'>, shown: 'none' | 'total' | 'countingArea' | 'all' | TReadOnlyProperty<'none' | 'total' | 'countingArea' | 'all'>, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_sumScreen_screenSummary_currentDetails', _.get( NumberPairsStrings, 'a11y.sumScreen.screenSummary.currentDetailsStringProperty' ), [{"name":"itemType"},{"name":"representationType","variants":["numberLine",{"type":"number","value":"other"},{"type":"number","value":"other"}]},{"name":"shown","variants":["none","total","countingArea","all"]},{"name":"total"}] ),
        interactionHint: new FluentPattern<{ representationType: 'beads' | 'kittens' | 'numberLine' | TReadOnlyProperty<'beads' | 'kittens' | 'numberLine'> }>( fluentSupport.bundleProperty, 'a11y_sumScreen_screenSummary_interactionHint', _.get( NumberPairsStrings, 'a11y.sumScreen.screenSummary.interactionHintStringProperty' ), [{"name":"representationType","variants":["beads","kittens","numberLine"]}] )
      }
    },
    _comment_0: new FluentComment( {"comment":"Basic terms and interactions","associatedKey":"left"} ),
    leftStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_left', _.get( NumberPairsStrings, 'a11y.leftStringProperty' ) ),
    leftCapitalizedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_leftCapitalized', _.get( NumberPairsStrings, 'a11y.leftCapitalizedStringProperty' ) ),
    rightStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_right', _.get( NumberPairsStrings, 'a11y.rightStringProperty' ) ),
    rightCapitalizedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_rightCapitalized', _.get( NumberPairsStrings, 'a11y.rightCapitalizedStringProperty' ) ),
    leftAddendColorStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_leftAddendColor', _.get( NumberPairsStrings, 'a11y.leftAddendColorStringProperty' ) ),
    rightAddendColorStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_rightAddendColor', _.get( NumberPairsStrings, 'a11y.rightAddendColorStringProperty' ) ),
    movableRoleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_movableRoleDescription', _.get( NumberPairsStrings, 'a11y.movableRoleDescriptionStringProperty' ) ),
    countingAreaEmptyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_countingAreaEmpty', _.get( NumberPairsStrings, 'a11y.countingAreaEmptyStringProperty' ) ),
    unknownNumberStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_unknownNumber', _.get( NumberPairsStrings, 'a11y.unknownNumberStringProperty' ) ),
    grabOrReleaseInteraction: {
      releasedHelpText: new FluentPattern<{ item: FluentVariable, key: 'enter' | 'return' | TReadOnlyProperty<'enter' | 'return'> }>( fluentSupport.bundleProperty, 'a11y_grabOrReleaseInteraction_releasedHelpText', _.get( NumberPairsStrings, 'a11y.grabOrReleaseInteraction.releasedHelpTextStringProperty' ), [{"name":"item"},{"name":"key","variants":["enter","return"]}] ),
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
      leadingParagraph: new FluentPattern<{ item: FluentVariable, items: FluentVariable, total: 1 | number | 'other' | TReadOnlyProperty<1 | number | 'other'>, totalVisible: 'hidden' | 'shown' | TReadOnlyProperty<'hidden' | 'shown'> }>( fluentSupport.bundleProperty, 'a11y_countingArea_leadingParagraph', _.get( NumberPairsStrings, 'a11y.countingArea.leadingParagraphStringProperty' ), [{"name":"item"},{"name":"items"},{"name":"total","variants":[1,{"type":"number","value":"other"}]},{"name":"totalVisible","variants":["hidden","shown"]}] ),
      leftSideListItemPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_leftSideListItemPattern', _.get( NumberPairsStrings, 'a11y.countingArea.leftSideListItemPatternStringProperty' ), [{"name":"value"}] ),
      rightSideListItemPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_rightSideListItemPattern', _.get( NumberPairsStrings, 'a11y.countingArea.rightSideListItemPatternStringProperty' ), [{"name":"value"}] ),
      leftSideBeadsPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_leftSideBeadsPattern', _.get( NumberPairsStrings, 'a11y.countingArea.leftSideBeadsPatternStringProperty' ), [{"name":"value"}] ),
      rightSideBeadsPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_rightSideBeadsPattern', _.get( NumberPairsStrings, 'a11y.countingArea.rightSideBeadsPatternStringProperty' ), [{"name":"value"}] ),
      yellowListItemPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_yellowListItemPattern', _.get( NumberPairsStrings, 'a11y.countingArea.yellowListItemPatternStringProperty' ), [{"name":"value"}] ),
      blueListItemPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_countingArea_blueListItemPattern', _.get( NumberPairsStrings, 'a11y.countingArea.blueListItemPatternStringProperty' ), [{"name":"value"}] ),
      addendValueHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_countingArea_addendValueHidden', _.get( NumberPairsStrings, 'a11y.countingArea.addendValueHiddenStringProperty' ) )
    },
    equationAccordionBox: {
      accessibleHelpTextCollapsed: new FluentPattern<{ screenType: number | 'other' | 'sumScreen' | TReadOnlyProperty<number | 'other' | 'sumScreen'> }>( fluentSupport.bundleProperty, 'a11y_equationAccordionBox_accessibleHelpTextCollapsed', _.get( NumberPairsStrings, 'a11y.equationAccordionBox.accessibleHelpTextCollapsedStringProperty' ), [{"name":"screenType","variants":[{"type":"number","value":"other"},"sumScreen"]}] ),
      addendsOnRightAccessibleParagraph: new FluentPattern<{ leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_equationAccordionBox_addendsOnRightAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.equationAccordionBox.addendsOnRightAccessibleParagraphStringProperty' ), [{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] ),
      addendsOnLeftAccessibleParagraph: new FluentPattern<{ leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_equationAccordionBox_addendsOnLeftAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.equationAccordionBox.addendsOnLeftAccessibleParagraphStringProperty' ), [{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] )
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
      accessibleHelpText: new FluentPattern<{ key: 'enter' | 'return' | TReadOnlyProperty<'enter' | 'return'> }>( fluentSupport.bundleProperty, 'a11y_kittens_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.kittens.accessibleHelpTextStringProperty' ), [{"name":"key","variants":["enter","return"]}] ),
      changeColorAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_kittens_changeColorAccessibleName', _.get( NumberPairsStrings, 'a11y.kittens.changeColorAccessibleNameStringProperty' ) ),
      kittenPattern: new FluentPattern<{ color: FluentVariable, descriptor: 'first' | 'last' | 'only' | number | 'other' | TReadOnlyProperty<'first' | 'last' | 'only' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_kittens_kittenPattern', _.get( NumberPairsStrings, 'a11y.kittens.kittenPatternStringProperty' ), [{"name":"color"},{"name":"descriptor","variants":["first","last","only",{"type":"number","value":"other"}]}] )
    },
    beads: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_accessibleName', _.get( NumberPairsStrings, 'a11y.beads.accessibleNameStringProperty' ) ),
      singularAccessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_singularAccessibleName', _.get( NumberPairsStrings, 'a11y.beads.singularAccessibleNameStringProperty' ) ),
      leftAddendBeadStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_leftAddendBead', _.get( NumberPairsStrings, 'a11y.beads.leftAddendBeadStringProperty' ) ),
      rightAddendBeadStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_beads_rightAddendBead', _.get( NumberPairsStrings, 'a11y.beads.rightAddendBeadStringProperty' ) ),
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
      totalNumberPatternStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_totalSceneSelection_totalNumberPattern', _.get( NumberPairsStrings, 'a11y.totalSceneSelection.totalNumberPatternStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_totalSceneSelection_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.totalSceneSelection.accessibleHelpTextStringProperty' ) )
    },
    _comment_4: new FluentComment( {"comment":"Controls and interactions","associatedKey":"controls"} ),
    controls: {
      phrase: {
        accessibleHelpTextCollapsed: new FluentPattern<{ screenType: 'sumScreen' | number | 'other' | TReadOnlyProperty<'sumScreen' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_controls_phrase_accessibleHelpTextCollapsed', _.get( NumberPairsStrings, 'a11y.controls.phrase.accessibleHelpTextCollapsedStringProperty' ), [{"name":"screenType","variants":["sumScreen",{"type":"number","value":"other"}]}] )
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
        barModelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_barModel', _.get( NumberPairsStrings, 'a11y.controls.numberModel.barModelStringProperty' ) ),
        accessibleHelpText: new FluentPattern<{ numberModelType: 'numberBond' | 'barModel' | TReadOnlyProperty<'numberBond' | 'barModel'> }>( fluentSupport.bundleProperty, 'a11y_controls_numberModel_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.numberModel.accessibleHelpTextStringProperty' ), [{"name":"numberModelType","variants":["numberBond","barModel"]}] ),
        totalHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_totalHidden', _.get( NumberPairsStrings, 'a11y.controls.numberModel.totalHiddenStringProperty' ) ),
        totalMissingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_totalMissing', _.get( NumberPairsStrings, 'a11y.controls.numberModel.totalMissingStringProperty' ) ),
        leftAddendMissingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_leftAddendMissing', _.get( NumberPairsStrings, 'a11y.controls.numberModel.leftAddendMissingStringProperty' ) ),
        rightAddendMissingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_numberModel_rightAddendMissing', _.get( NumberPairsStrings, 'a11y.controls.numberModel.rightAddendMissingStringProperty' ) ),
        numberBondAccessibleParagraph: new FluentPattern<{ orientation: 'totalOnBottom' | 'totalOnTop' | TReadOnlyProperty<'totalOnBottom' | 'totalOnTop'> }>( fluentSupport.bundleProperty, 'a11y_controls_numberModel_numberBondAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.controls.numberModel.numberBondAccessibleParagraphStringProperty' ), [{"name":"orientation","variants":["totalOnBottom","totalOnTop"]}] ),
        numberBondStateAccessibleParagraph: new FluentPattern<{ left: FluentVariable, orientation: 'totalOnTop' | 'totalOnBottom' | TReadOnlyProperty<'totalOnTop' | 'totalOnBottom'>, right: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_numberModel_numberBondStateAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.controls.numberModel.numberBondStateAccessibleParagraphStringProperty' ), [{"name":"left"},{"name":"orientation","variants":["totalOnTop","totalOnBottom"]},{"name":"right"},{"name":"total"}] ),
        barModelStateAccessibleParagraph: new FluentPattern<{ left: FluentVariable, orientation: 'totalOnTop' | 'totalOnBottom' | TReadOnlyProperty<'totalOnTop' | 'totalOnBottom'>, proportions: FluentVariable, right: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_numberModel_barModelStateAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.controls.numberModel.barModelStateAccessibleParagraphStringProperty' ), [{"name":"left"},{"name":"orientation","variants":["totalOnTop","totalOnBottom"]},{"name":"proportions"},{"name":"right"},{"name":"total"}] ),
        _comment_0: new FluentComment( {"comment":"Sum equation (levels 4, 7, 8)","associatedKey":"sumEquation"} ),
        sumEquation: new FluentPattern<{ left: FluentVariable, right: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_numberModel_sumEquation', _.get( NumberPairsStrings, 'a11y.controls.numberModel.sumEquationStringProperty' ), [{"name":"left"},{"name":"right"},{"name":"total"}] ),
        decompositionEquation: new FluentPattern<{ left: FluentVariable, right: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_numberModel_decompositionEquation', _.get( NumberPairsStrings, 'a11y.controls.numberModel.decompositionEquationStringProperty' ), [{"name":"left"},{"name":"right"},{"name":"total"}] ),
        barModelAccessibleParagraph: new FluentPattern<{ orientation: 'totalOnTop' | 'totalOnBottom' | TReadOnlyProperty<'totalOnTop' | 'totalOnBottom'> }>( fluentSupport.bundleProperty, 'a11y_controls_numberModel_barModelAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.controls.numberModel.barModelAccessibleParagraphStringProperty' ), [{"name":"orientation","variants":["totalOnTop","totalOnBottom"]}] ),
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
        accessibleContextResponse: new FluentPattern<{ leftAddend: FluentVariable, representationType: 'attribute' | 'numberLine' | number | 'other' | TReadOnlyProperty<'attribute' | 'numberLine' | number | 'other'>, rightAddend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_commutativeButton_accessibleContextResponse', _.get( NumberPairsStrings, 'a11y.controls.commutativeButton.accessibleContextResponseStringProperty' ), [{"name":"leftAddend"},{"name":"representationType","variants":["attribute","numberLine",{"type":"number","value":"other"}]},{"name":"rightAddend"}] )
      },
      bothAddendsVisibleButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_bothAddendsVisibleButton_accessibleName', _.get( NumberPairsStrings, 'a11y.controls.bothAddendsVisibleButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextPattern: new FluentPattern<{ numberModelType: 'numberBond' | 'barModel' | TReadOnlyProperty<'numberBond' | 'barModel'> }>( fluentSupport.bundleProperty, 'a11y_controls_bothAddendsVisibleButton_accessibleHelpTextPattern', _.get( NumberPairsStrings, 'a11y.controls.bothAddendsVisibleButton.accessibleHelpTextPatternStringProperty' ), [{"name":"numberModelType","variants":["numberBond","barModel"]}] )
      },
      addendVisibleButton: {
        accessibleNamePattern: new FluentPattern<{ addend: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_addendVisibleButton_accessibleNamePattern', _.get( NumberPairsStrings, 'a11y.controls.addendVisibleButton.accessibleNamePatternStringProperty' ), [{"name":"addend"}] ),
        accessibleHelpTextPattern: new FluentPattern<{ addend: FluentVariable, numberModelType: 'numberBond' | 'barModel' | TReadOnlyProperty<'numberBond' | 'barModel'> }>( fluentSupport.bundleProperty, 'a11y_controls_addendVisibleButton_accessibleHelpTextPattern', _.get( NumberPairsStrings, 'a11y.controls.addendVisibleButton.accessibleHelpTextPatternStringProperty' ), [{"name":"addend"},{"name":"numberModelType","variants":["numberBond","barModel"]}] ),
        accessibleContextResponseOnStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_addendVisibleButton_accessibleContextResponseOn', _.get( NumberPairsStrings, 'a11y.controls.addendVisibleButton.accessibleContextResponseOnStringProperty' ) ),
        accessibleContextResponseOffStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_addendVisibleButton_accessibleContextResponseOff', _.get( NumberPairsStrings, 'a11y.controls.addendVisibleButton.accessibleContextResponseOffStringProperty' ) )
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
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_totalCheckbox_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.controls.totalCheckbox.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_totalCheckbox_accessibleContextResponseChecked', _.get( NumberPairsStrings, 'a11y.controls.totalCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_totalCheckbox_accessibleContextResponseUnchecked', _.get( NumberPairsStrings, 'a11y.controls.totalCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
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
        accessibleContextResponseChecked: new FluentPattern<{ total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_totalJumpCheckbox_accessibleContextResponseChecked', _.get( NumberPairsStrings, 'a11y.controls.totalJumpCheckbox.accessibleContextResponseCheckedStringProperty' ), [{"name":"total"}] ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_totalJumpCheckbox_accessibleContextResponseUnchecked', _.get( NumberPairsStrings, 'a11y.controls.totalJumpCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
      }
    },
    _comment_5: new FluentComment( {"comment":"Game","associatedKey":"gameScreen"} ),
    gameScreen: {
      whatNumberStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_whatNumber', _.get( NumberPairsStrings, 'a11y.gameScreen.whatNumberStringProperty' ) ),
      questionMarkStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_questionMark', _.get( NumberPairsStrings, 'a11y.gameScreen.questionMarkStringProperty' ) ),
      missingValueStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_missingValue', _.get( NumberPairsStrings, 'a11y.gameScreen.missingValueStringProperty' ) ),
      challengePrompt: new FluentPattern<{ decompositionOrSum: 'decomposition' | 'sum' | TReadOnlyProperty<'decomposition' | 'sum'>, leftAddend: FluentVariable, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challengePrompt', _.get( NumberPairsStrings, 'a11y.gameScreen.challengePromptStringProperty' ), [{"name":"decompositionOrSum","variants":["decomposition","sum"]},{"name":"leftAddend"},{"name":"rightAddend"},{"name":"total"}] ),
      countingArea: {
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_countingArea_accessibleHeading', _.get( NumberPairsStrings, 'a11y.gameScreen.countingArea.accessibleHeadingStringProperty' ) ),
        numberLineLeftAddendColor: new FluentPattern<{ leftAddendMissing: 'missing' | 'notMissing' | TReadOnlyProperty<'missing' | 'notMissing'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_countingArea_numberLineLeftAddendColor', _.get( NumberPairsStrings, 'a11y.gameScreen.countingArea.numberLineLeftAddendColorStringProperty' ), [{"name":"leftAddendMissing","variants":["missing","notMissing"]}] ),
        numberLineRightAddendColor: new FluentPattern<{ rightAddendMissing: 'missing' | 'notMissing' | TReadOnlyProperty<'missing' | 'notMissing'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_countingArea_numberLineRightAddendColor', _.get( NumberPairsStrings, 'a11y.gameScreen.countingArea.numberLineRightAddendColorStringProperty' ), [{"name":"rightAddendMissing","variants":["missing","notMissing"]}] ),
        numberLineSentence: new FluentPattern<{ leftAddendMissing: 'missing' | 'notMissing' | TReadOnlyProperty<'missing' | 'notMissing'>, rightAddendMissing: 'missing' | 'notMissing' | TReadOnlyProperty<'missing' | 'notMissing'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_countingArea_numberLineSentence', _.get( NumberPairsStrings, 'a11y.gameScreen.countingArea.numberLineSentenceStringProperty' ), [{"name":"leftAddendMissing","variants":["missing","notMissing"]},{"name":"rightAddendMissing","variants":["missing","notMissing"]}] ),
        numberLineAddends: new FluentPattern<{ leftAddend: FluentVariable, leftAddendMissing: 'missing' | 'notMissing' | TReadOnlyProperty<'missing' | 'notMissing'>, rightAddend: FluentVariable, rightAddendMissing: 'missing' | 'notMissing' | TReadOnlyProperty<'missing' | 'notMissing'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_countingArea_numberLineAddends', _.get( NumberPairsStrings, 'a11y.gameScreen.countingArea.numberLineAddendsStringProperty' ), [{"name":"leftAddend"},{"name":"leftAddendMissing","variants":["missing","notMissing"]},{"name":"rightAddend"},{"name":"rightAddendMissing","variants":["missing","notMissing"]}] ),
        numberLineTickMarks: new FluentPattern<{ total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_countingArea_numberLineTickMarks', _.get( NumberPairsStrings, 'a11y.gameScreen.countingArea.numberLineTickMarksStringProperty' ), [{"name":"total"}] ),
        hiddenAccessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_countingArea_hiddenAccessibleParagraph', _.get( NumberPairsStrings, 'a11y.gameScreen.countingArea.hiddenAccessibleParagraphStringProperty' ) ),
        accessibleParagraph: new FluentPattern<{ leftAddend: FluentVariable, leftAddendMissing: 'missing' | 'notMissing' | TReadOnlyProperty<'missing' | 'notMissing'>, rightAddend: FluentVariable, rightAddendMissing: 'missing' | 'notMissing' | TReadOnlyProperty<'missing' | 'notMissing'>, total: FluentVariable, type: 'kittens' | 'numberLine' | TReadOnlyProperty<'kittens' | 'numberLine'>, visible: 'none' | 'addends' | 'tickMarks' | 'both' | TReadOnlyProperty<'none' | 'addends' | 'tickMarks' | 'both'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_countingArea_accessibleParagraph', _.get( NumberPairsStrings, 'a11y.gameScreen.countingArea.accessibleParagraphStringProperty' ), [{"name":"leftAddend"},{"name":"leftAddendMissing","variants":["missing","notMissing"]},{"name":"rightAddend"},{"name":"rightAddendMissing","variants":["missing","notMissing"]},{"name":"total"},{"name":"type","variants":["kittens","numberLine"]},{"name":"visible","variants":["none","addends","tickMarks","both"]}] )
      },
      testCurrentAnswerSection: {
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_testCurrentAnswerSection_accessibleHeading', _.get( NumberPairsStrings, 'a11y.gameScreen.testCurrentAnswerSection.accessibleHeadingStringProperty' ) ),
        accessibleParagraph: new FluentPattern<{ left: FluentVariable, levelType: 'bondBar' | 'decomposition' | 'sumEquation' | TReadOnlyProperty<'bondBar' | 'decomposition' | 'sumEquation'>, right: FluentVariable, theirGuess: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_testCurrentAnswerSection_accessibleParagraph', _.get( NumberPairsStrings, 'a11y.gameScreen.testCurrentAnswerSection.accessibleParagraphStringProperty' ), [{"name":"left"},{"name":"levelType","variants":["bondBar","decomposition","sumEquation"]},{"name":"right"},{"name":"theirGuess"},{"name":"total"}] )
      },
      answerChoices: new FluentPattern<{ challengeType: 'leftAddend' | 'rightAddend' | 'total' | TReadOnlyProperty<'leftAddend' | 'rightAddend' | 'total'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_answerChoices', _.get( NumberPairsStrings, 'a11y.gameScreen.answerChoicesStringProperty' ), [{"name":"challengeType","variants":["leftAddend","rightAddend","total"]}] ),
      challengeType: new FluentPattern<{ challengeType: 'leftAddend' | 'rightAddend' | 'total' | TReadOnlyProperty<'leftAddend' | 'rightAddend' | 'total'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challengeType', _.get( NumberPairsStrings, 'a11y.gameScreen.challengeTypeStringProperty' ), [{"name":"challengeType","variants":["leftAddend","rightAddend","total"]}] ),
      challengeSupports: {
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challengeSupports_accessibleHeading', _.get( NumberPairsStrings, 'a11y.gameScreen.challengeSupports.accessibleHeadingStringProperty' ) )
      },
      _comment_0: new FluentComment( {"comment":"Overrides the values above, for the game","associatedKey":"bothAddendsEyeToggleButton"} ),
      bothAddendsEyeToggleButton: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_bothAddendsEyeToggleButton_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.bothAddendsEyeToggleButton.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseOff: new FluentPattern<{ levelType: 'kittens' | 'numberLine' | TReadOnlyProperty<'kittens' | 'numberLine'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_bothAddendsEyeToggleButton_accessibleContextResponseOff', _.get( NumberPairsStrings, 'a11y.gameScreen.bothAddendsEyeToggleButton.accessibleContextResponseOffStringProperty' ), [{"name":"levelType","variants":["kittens","numberLine"]}] ),
        accessibleContextResponseOn: new FluentPattern<{ levelType: 'kittens' | 'numberLine' | TReadOnlyProperty<'kittens' | 'numberLine'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_bothAddendsEyeToggleButton_accessibleContextResponseOn', _.get( NumberPairsStrings, 'a11y.gameScreen.bothAddendsEyeToggleButton.accessibleContextResponseOnStringProperty' ), [{"name":"levelType","variants":["kittens","numberLine"]}] )
      },
      level: {
        accessibleHelpText: new FluentPattern<{ levelNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | TReadOnlyProperty<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>, numberModelType: 'numberBond' | 'barModel' | TReadOnlyProperty<'numberBond' | 'barModel'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_level_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.level.accessibleHelpTextStringProperty' ), [{"name":"levelNumber","variants":[1,2,3,4,5,6,7,8]},{"name":"numberModelType","variants":["numberBond","barModel"]}] ),
        accessibleHeading: new FluentPattern<{ levelType: 'decompositionEquation' | 'sumEquation' | 'bondOrBarModel' | TReadOnlyProperty<'decompositionEquation' | 'sumEquation' | 'bondOrBarModel'>, numberModelType: 'numberBond' | 'barModel' | TReadOnlyProperty<'numberBond' | 'barModel'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_level_accessibleHeading', _.get( NumberPairsStrings, 'a11y.gameScreen.level.accessibleHeadingStringProperty' ), [{"name":"levelType","variants":["decompositionEquation","sumEquation","bondOrBarModel"]},{"name":"numberModelType","variants":["numberBond","barModel"]}] )
      },
      answerButton: {
        wrongAccessibleName: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_answerButton_wrongAccessibleName', _.get( NumberPairsStrings, 'a11y.gameScreen.answerButton.wrongAccessibleNameStringProperty' ), [{"name":"value"}] )
      },
      answerButtonGroup: {
        accessibleHeading: new FluentPattern<{ challengeType: 'leftAddend' | 'rightAddend' | 'total' | TReadOnlyProperty<'leftAddend' | 'rightAddend' | 'total'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_answerButtonGroup_accessibleHeading', _.get( NumberPairsStrings, 'a11y.gameScreen.answerButtonGroup.accessibleHeadingStringProperty' ), [{"name":"challengeType","variants":["leftAddend","rightAddend","total"]}] ),
        accessibleHelpText: new FluentPattern<{ addendOrSum: 'addend' | 'sum' | TReadOnlyProperty<'addend' | 'sum'>, challengeType: 'leftAddend' | 'rightAddend' | 'total' | TReadOnlyProperty<'leftAddend' | 'rightAddend' | 'total'>, color: FluentVariable, levelType: 'kittens' | 'numberLine' | TReadOnlyProperty<'kittens' | 'numberLine'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_answerButtonGroup_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.answerButtonGroup.accessibleHelpTextStringProperty' ), [{"name":"addendOrSum","variants":["addend","sum"]},{"name":"challengeType","variants":["leftAddend","rightAddend","total"]},{"name":"color"},{"name":"levelType","variants":["kittens","numberLine"]}] )
      },
      tenFrameButton: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_tenFrameButton_accessibleHelpText', _.get( NumberPairsStrings, 'a11y.gameScreen.tenFrameButton.accessibleHelpTextStringProperty' ) )
      },
      responses: {
        answerSelected: new FluentPattern<{ challengeType: 'leftAddend' | 'rightAddend' | 'total' | TReadOnlyProperty<'leftAddend' | 'rightAddend' | 'total'>, color: FluentVariable, representationType: 'kittens' | 'numberLine' | 'sum' | TReadOnlyProperty<'kittens' | 'numberLine' | 'sum'>, value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_responses_answerSelected', _.get( NumberPairsStrings, 'a11y.gameScreen.responses.answerSelectedStringProperty' ), [{"name":"challengeType","variants":["leftAddend","rightAddend","total"]},{"name":"color"},{"name":"representationType","variants":["kittens","numberLine","sum"]},{"name":"value"}] ),
        answerClearedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_responses_answerCleared', _.get( NumberPairsStrings, 'a11y.gameScreen.responses.answerClearedStringProperty' ) ),
        correctAnswer: new FluentPattern<{ leftAddend: FluentVariable, levelType: 'decomposition' | 'sum' | TReadOnlyProperty<'decomposition' | 'sum'>, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_responses_correctAnswer', _.get( NumberPairsStrings, 'a11y.gameScreen.responses.correctAnswerStringProperty' ), [{"name":"leftAddend"},{"name":"levelType","variants":["decomposition","sum"]},{"name":"rightAddend"},{"name":"total"}] ),
        incorrectAnswer: new FluentPattern<{ leftAddend: FluentVariable, levelType: 'decomposition' | 'sum' | TReadOnlyProperty<'decomposition' | 'sum'>, rightAddend: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_responses_incorrectAnswer', _.get( NumberPairsStrings, 'a11y.gameScreen.responses.incorrectAnswerStringProperty' ), [{"name":"leftAddend"},{"name":"levelType","variants":["decomposition","sum"]},{"name":"rightAddend"},{"name":"total"}] ),
        correctAnswerOnFirstTry: new FluentPattern<{ leftAddend: FluentVariable, levelType: 'sum' | 'decomposition' | TReadOnlyProperty<'sum' | 'decomposition'>, rightAddend: FluentVariable, total: FluentVariable, totalScore: 1 | number | 'other' | TReadOnlyProperty<1 | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_responses_correctAnswerOnFirstTry', _.get( NumberPairsStrings, 'a11y.gameScreen.responses.correctAnswerOnFirstTryStringProperty' ), [{"name":"leftAddend"},{"name":"levelType","variants":["sum","decomposition"]},{"name":"rightAddend"},{"name":"total"},{"name":"totalScore","variants":[1,{"type":"number","value":"other"}]}] ),
        _comment_0: new FluentComment( {"comment":"There is no scoring logic here, we are just reporting the total accumulated score after the user gets a correct answer on the first try","associatedKey":"_correctAnswerScore"} ),
        _correctAnswerScore: new FluentPattern<{ totalScore: 1 | number | 'other' | TReadOnlyProperty<1 | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_responses__correctAnswerScore', _.get( NumberPairsStrings, 'a11y.gameScreen.responses._correctAnswerScoreStringProperty' ), [{"name":"totalScore","variants":[1,{"type":"number","value":"other"}]}] )
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
        changeColorLabelInnerContent: new FluentPattern<{ key: 'enter' | 'return' | TReadOnlyProperty<'enter' | 'return'> }>( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_kittenInteraction_changeColorLabelInnerContent', _.get( NumberPairsStrings, 'a11y.keyboardHelpDialog.kittenInteraction.changeColorLabelInnerContentStringProperty' ), [{"name":"key","variants":["enter","return"]}] )
      }
    }
  }
};

export default NumberPairsFluent;

numberPairs.register('NumberPairsFluent', NumberPairsFluent);
