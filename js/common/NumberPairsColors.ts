// Copyright 2024-2025, University of Colorado Boulder

/**
 * Defines the colors for this sim.
 *
 * All simulations should have a Colors.js file, see https://github.com/phetsims/scenery-phet/issues/642.
 *
 * For static colors that are used in more than one place, add them here.
 *
 * For dynamic colors that can be controlled via colorProfileProperty.js, add instances of ProfileColorProperty here,
 * each of which is required to have a default color. Note that dynamic colors can be edited by running the sim from
 * phetmarks using the "Color Edit" mode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import numberPairs from '../numberPairs.js';

//REVIEW Consider converting to class with static constants and private constructor.
const NumberPairsColors = {

  // Background color for screens in this sim
  introScreenBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'introBackground', {
    default: '#FFFAF1'
  } ),
  tenScreenBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'tenBackground', {
    default: '#FFFAF1'
  } ),
  twentyScreenBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'twentyBackground', {
    default: '#FFFAFE'
  } ),
  sumScreenBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'sumBackground', {
    default: '#FAFDF6'
  } ),
  locationSumColorProperty: new ProfileColorProperty( numberPairs, 'locationSum', {
    default: '#74E2AB'
  } ),
  locationLeftAddendColorProperty: new ProfileColorProperty( numberPairs, 'locationLeftAddend', {
    default: '#F9FFA8'
  } ),
  locationRightAddendColorProperty: new ProfileColorProperty( numberPairs, 'locationRightAddend', {
    default: '#A8D4FF'
  } ),
  numberLineThumbNodeColorProperty: new ProfileColorProperty( numberPairs, 'numberLineThumbNode', {
    default: '#FFE566'
  } ),
  numberLineLabelBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'numberLineLabelBackground', {
    default: 'rgba( 255, 255, 255, 0.25 )'
  } ),
  attributeSumColorProperty: new ProfileColorProperty( numberPairs, 'attributeSum', {
    default: '#87D9B0'
  } ),
  attributeLeftAddendColorProperty: new ProfileColorProperty( numberPairs, 'attributeLeftAddend', {
    default: '#FFEE8C'
  } ),
  attributeRightAddendColorProperty: new ProfileColorProperty( numberPairs, 'attributeRightAddend', {
    default: '#A5B3EE'
  } ),
  answerButtonPressedLeftAddendColorProperty: new ProfileColorProperty( numberPairs, 'answerButtonPressedLeftAddend', {
    default: '#FFF6C2'
  } ),
  answerButtonPressedRightAddendColorProperty: new ProfileColorProperty( numberPairs, 'answerButtonPressedRightAddend', {
    default: '#D7E0F9'
  } ),
  answerButtonPressedTotalColorProperty: new ProfileColorProperty( numberPairs, 'answerButtonPressedTotal', {
    default: '#D8F3E4'
  } ),
  numberLineBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'numberLineBackground', {
    default: '#FFFFFF'
  } ),
  accordionBoxBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'accordionBoxBackground', {
    default: '#EBEBEA'
  } ),
  numberBondAccordionBoxBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'numberBondAccordionBoxBackground', {
    default: '#F8F8FD'
  } ),
  kittenPanelBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'kittenPanelBackground', {
    default: 'rgba( 255, 255, 255, 0.5 )'
  } ),
  wireBaseColorProperty: new ProfileColorProperty( numberPairs, 'wireBaseColor', {
    default: '#C7C7C7'
  } ),
  wireHighlightColorProperty: new ProfileColorProperty( numberPairs, 'wireHighlightColor', {
    default: '#F2F2F2'
  } ),
  checkNextButtonColorProperty: new ProfileColorProperty( numberPairs, 'checkNextButtonColor', {
    default: '#85FFF7'
  } ),

  // Status bar & level selection colors
  level1StatusBarColorProperty: new ProfileColorProperty( numberPairs, 'level1StatusBar', {
    default: '#EFB0AF'
  } ),
  level234StatusBarColorProperty: new ProfileColorProperty( numberPairs, 'level234StatusBar', {
    default: '#BCA4F7'
  } ),
  level567StatusBarColorProperty: new ProfileColorProperty( numberPairs, 'level567StatusBar', {
    default: '#96D5E8'
  } ),
  level8StatusBarColorProperty: new ProfileColorProperty( numberPairs, 'level8StatusBar', {
    default: '#FFA9A3'
  } ),

  // Level selection icon palette
  levelSelectionIconTotalColorProperty: new ProfileColorProperty( numberPairs, 'levelSelectionIconTotal', {
    default: '#FCE9AE'
  } ),
  levelSelectionIconLeftAddendColorProperty: new ProfileColorProperty( numberPairs, 'levelSelectionIconLeftAddend', {
    default: '#FCE9AE'
  } ),
  levelSelectionIconRightAddendColorProperty: new ProfileColorProperty( numberPairs, 'levelSelectionIconRightAddend', {
    default: '#FCE9AE'
  } ),

  correctMarkColorProperty: new ProfileColorProperty( numberPairs, 'correctMark', {
    default: '#0F710F'
  } ),
  incorrectColorProperty: new ProfileColorProperty( numberPairs, 'incorrect', {
    default: 'red'
  } ),
  unansweredColorProperty: new ProfileColorProperty( numberPairs, 'unanswered', {
    default: 'gray'
  } )
};

numberPairs.register( 'NumberPairsColors', NumberPairsColors );
export default NumberPairsColors;
