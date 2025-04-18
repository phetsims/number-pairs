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
  } )
};

numberPairs.register( 'NumberPairsColors', NumberPairsColors );
export default NumberPairsColors;