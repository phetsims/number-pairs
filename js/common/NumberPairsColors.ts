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

class NumberPairsColors {

  // Background color for screens in this sim
  public static readonly introScreenBackgroundColorProperty = new ProfileColorProperty( numberPairs, 'introBackground', {
    default: '#FFFAF1'
  } );

  public static readonly tenScreenBackgroundColorProperty = new ProfileColorProperty( numberPairs, 'tenBackground', {
    default: '#FFFAF1'
  } );

  public static readonly twentyScreenBackgroundColorProperty = new ProfileColorProperty( numberPairs, 'twentyBackground', {
    default: '#FFFAFE'
  } );

  public static readonly sumScreenBackgroundColorProperty = new ProfileColorProperty( numberPairs, 'sumBackground', {
    default: '#FAFDF6'
  } );

  public static readonly locationSumColorProperty = new ProfileColorProperty( numberPairs, 'locationSum', {
    default: '#74E2AB'
  } );

  public static readonly locationLeftAddendColorProperty = new ProfileColorProperty( numberPairs, 'locationLeftAddend', {
    default: '#F9FFA8'
  } );

  public static readonly locationRightAddendColorProperty = new ProfileColorProperty( numberPairs, 'locationRightAddend', {
    default: '#A8D4FF'
  } );

  public static readonly numberLineThumbNodeColorProperty = new ProfileColorProperty( numberPairs, 'numberLineThumbNode', {
    default: '#FFE566'
  } );

  public static readonly numberLineLabelBackgroundColorProperty = new ProfileColorProperty( numberPairs, 'numberLineLabelBackground', {
    default: 'rgba( 255, 255, 255, 0.25 )'
  } );

  public static readonly attributeSumColorProperty = new ProfileColorProperty( numberPairs, 'attributeSum', {
    default: '#87D9B0'
  } );

  public static readonly attributeLeftAddendColorProperty = new ProfileColorProperty( numberPairs, 'attributeLeftAddend', {
    default: '#FFEE8C'
  } );

  public static readonly attributeRightAddendColorProperty = new ProfileColorProperty( numberPairs, 'attributeRightAddend', {
    default: '#A5B3EE'
  } );

  public static readonly answerButtonPressedLeftAddendColorProperty = new ProfileColorProperty( numberPairs, 'answerButtonPressedLeftAddend', {
    default: '#FFFAE0'
  } );

  public static readonly answerButtonPressedRightAddendColorProperty = new ProfileColorProperty( numberPairs, 'answerButtonPressedRightAddend', {
    default: '#D7E0F9'
  } );

  public static readonly answerButtonPressedTotalColorProperty = new ProfileColorProperty( numberPairs, 'answerButtonPressedTotal', {
    default: '#D8F3E4'
  } );

  public static readonly numberLineBackgroundColorProperty = new ProfileColorProperty( numberPairs, 'numberLineBackground', {
    default: '#FFFFFF'
  } );

  public static readonly accordionBoxBackgroundColorProperty = new ProfileColorProperty( numberPairs, 'accordionBoxBackground', {
    default: '#EBEBEA'
  } );

  public static readonly numberBondAccordionBoxBackgroundColorProperty = new ProfileColorProperty( numberPairs, 'numberBondAccordionBoxBackground', {
    default: '#F8F8FD'
  } );

  public static readonly kittenPanelBackgroundColorProperty = new ProfileColorProperty( numberPairs, 'kittenPanelBackground', {
    default: 'rgba( 255, 255, 255, 0.5 )'
  } );

  public static readonly wireBaseColorProperty = new ProfileColorProperty( numberPairs, 'wireBaseColor', {
    default: '#C7C7C7'
  } );

  public static readonly wireHighlightColorProperty = new ProfileColorProperty( numberPairs, 'wireHighlightColor', {
    default: '#F2F2F2'
  } );

  public static readonly checkNextButtonColorProperty = new ProfileColorProperty( numberPairs, 'checkNextButtonColor', {
    default: '#85FFF7'
  } );

  // Status bar & level selection colors
  public static readonly level1StatusBarColorProperty = new ProfileColorProperty( numberPairs, 'level1StatusBar', {
    default: '#EFB0AF'
  } );

  public static readonly level234StatusBarColorProperty = new ProfileColorProperty( numberPairs, 'level234StatusBar', {
    default: '#BCA4F7'
  } );

  public static readonly level567StatusBarColorProperty = new ProfileColorProperty( numberPairs, 'level567StatusBar', {
    default: '#96D5E8'
  } );

  public static readonly level8StatusBarColorProperty = new ProfileColorProperty( numberPairs, 'level8StatusBar', {
    default: '#FFA9A3'
  } );

  // Level selection icon palette
  public static readonly levelSelectionIconTotalColorProperty = new ProfileColorProperty( numberPairs, 'levelSelectionIconTotal', {
    default: '#FCE9AE'
  } );

  public static readonly levelSelectionIconLeftAddendColorProperty = new ProfileColorProperty( numberPairs, 'levelSelectionIconLeftAddend', {
    default: '#FCE9AE'
  } );

  public static readonly levelSelectionIconRightAddendColorProperty = new ProfileColorProperty( numberPairs, 'levelSelectionIconRightAddend', {
    default: '#FCE9AE'
  } );

  public static readonly correctMarkColorProperty = new ProfileColorProperty( numberPairs, 'correctMark', {
    default: '#0F710F'
  } );

  public static readonly incorrectColorProperty = new ProfileColorProperty( numberPairs, 'incorrect', {
    default: 'red'
  } );

  public static readonly unansweredColorProperty = new ProfileColorProperty( numberPairs, 'unanswered', {
    default: 'gray'
  } );

  /**
   * Private constructor to prevent instantiation.
   */
  private constructor() {
    // Prevent instantiation
  }
}

numberPairs.register( 'NumberPairsColors', NumberPairsColors );
export default NumberPairsColors;
