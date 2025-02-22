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
    default: '#FFFFFF'
  } ),
  tenScreenBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'tenBackground', {
    default: '#FFF7E8'
  } ),
  twentyScreenBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'twentyBackground', {
    default: '#FFF7E8'
  } ),
  sumScreenBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'sumBackground', {
    default: '#FFF7E8'
  } ),
  locationSumColorProperty: new ProfileColorProperty( numberPairs, 'locationSum', {
    default: '#7bffa0'
  } ),
  locationLeftAddendColorProperty: new ProfileColorProperty( numberPairs, 'locationLeftAddend', {
    default: '#ffffc0'
  } ),
  locationRightAddendColorProperty: new ProfileColorProperty( numberPairs, 'locationRightAddend', {
    default: '#76e1ff'
  } ),
  numberLineSumColorProperty: new ProfileColorProperty( numberPairs, 'numberLineSum', {
    default: '#D0BDFB'
  } ),
  numberLineLeftAddendColorProperty: new ProfileColorProperty( numberPairs, 'numberLineLeftAddend', {
    default: '#F8BDDD'
  } ),
  numberLineThumbNodeColorProperty: new ProfileColorProperty( numberPairs, 'numberLineThumbNode', {
    default: '#F8BDDD'
  } ),
  numberLineRightAddendColorProperty: new ProfileColorProperty( numberPairs, 'numberLineRightAddend', {
    default: '#A7CFFE'
  } ),
  numberLineLabelBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'numberLineLabelBackground', {
    default: 'rgba( 255, 255, 255, 1 )'
  } ),
  attributeSumColorProperty: new ProfileColorProperty( numberPairs, 'attributeSum', {
    default: '#AFDDC6'
  } ),
  attributeLeftAddendColorProperty: new ProfileColorProperty( numberPairs, 'attributeLeftAddend', {
    default: '#ffee8c'
  } ),
  attributeRightAddendColorProperty: new ProfileColorProperty( numberPairs, 'attributeRightAddend', {
    default: '#A3ADDD'
  } ),
  numberLineBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'numberLineBackground', {
    default: 'white'
  } ),
  accordionBoxBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'accordionBoxBackground', {
    default: '#F9E5CE'
  } ),
  numberBondAccordionBoxBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'numberBondAccordionBoxBackground', {
    default: '#F8F8FD'
  } ),
  kittenPanelBackgroundColorProperty: new ProfileColorProperty( numberPairs, 'kittenPanelBackground', {
    default: 'rgba( 255, 255, 255, 0.5 )'
  } ),
  wireBaseColorProperty: new ProfileColorProperty( numberPairs, 'wireBaseColor', {
    default: '#B3B3B3'
  } ),
  wireHighlightColorProperty: new ProfileColorProperty( numberPairs, 'wireHighlightColor', {
    default: '#F2F2F2'
  } )
};

numberPairs.register( 'NumberPairsColors', NumberPairsColors );
export default NumberPairsColors;