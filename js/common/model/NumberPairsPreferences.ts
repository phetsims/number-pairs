// Copyright 2024, University of Colorado Boulder

/**
 * NumberPairsPreferences is the model for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, affect all screens, and are not affected by 'reset all'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import localeProperty, { Locale, LocaleProperty } from '../../../../joist/js/i18n/localeProperty.js';
import Property from '../../../../axon/js/Property.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberPairsQueryParameters from '../NumberPairsQueryParameters.js';
import Tandem from '../../../../tandem/js/Tandem.js';

//TODO https://github.com/phetsims/number-pairs/issues/22 second or secondary? Other sims in the suite are very inconsistent.

// As with the primary locale, use initialize-globals checkAndRemapLocale() to check validity of the second locale.
// This potentially either falls back to 'en', or remaps from 3-character locales to PhET locales.
let secondLocale = NumberPairsQueryParameters.secondLocale;
if ( secondLocale !== null ) {
  const remappedLocale = phet.chipper.remapLocale( secondLocale, false );
  secondLocale = phet.chipper.getValidRuntimeLocale( remappedLocale );
}

const secondLocaleProperty = new LocaleProperty( secondLocale as Locale || localeProperty.value, {
  tandem: Tandem.PREFERENCES.createTandem( 'secondLocaleProperty' ),
  phetioFeatured: true
} );

const NumberPairsPreferences = {

  // Second locale
  secondLocaleProperty: secondLocaleProperty,

  // Voice for the primary locale
  primaryVoiceProperty: new Property<SpeechSynthesisVoice | null>( null ),

  // Voice for the second locale
  secondVoiceProperty: new Property<SpeechSynthesisVoice | null>( null ),

  // When true, the phrase will automatically be spoken whenever it changes.
  autoHearEnabledProperty: new BooleanProperty( false, {
    tandem: Tandem.PREFERENCES.createTandem( 'autoHearEnabledProperty' ),
    phetioFeatured: true
  } ),

  // Whether the second locale feature is enabled.
  secondLocaleEnabledProperty: new BooleanProperty( !!NumberPairsQueryParameters.secondLocale, {
    tandem: Tandem.PREFERENCES.createTandem( 'secondLocaleEnabledProperty' ),
    phetioReadOnly: true
  } ),

  // Strings for the current secondLocale.
  secondLocaleStringsProperty: new DerivedProperty( [ secondLocaleProperty ], secondLocale => {
    return phet.chipper.strings[ secondLocale ];
  } ),

  // Whether the sim is using its primary locale or secondary locale on screens that support two languages.
  //TODO https://github.com/phetsims/number-pairs/issues/22 Shouldn't this be specific to each screen? How about Reset All behavior?
  isPrimaryLocaleProperty: new BooleanProperty( true, {
    tandem: Tandem.PREFERENCES.createTandem( 'isPrimaryLocaleProperty' ),
    phetioReadOnly: true
  } )
};

numberPairs.register( 'NumberPairsPreferences', NumberPairsPreferences );
export default NumberPairsPreferences;