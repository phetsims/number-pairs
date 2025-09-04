// Copyright 2024-2025, University of Colorado Boulder

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
import NumberPairsQueryParameters from '../NumberPairsQueryParameters.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';

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


export class NumberModelType extends EnumerationValue {
  public static readonly NUMBER_BOND_MODEL = new NumberModelType();
  public static readonly BAR_MODEL = new NumberModelType();

  public static readonly enumeration = new Enumeration( NumberModelType );
}

const NumberPairsPreferences = {

  // Second locale
  secondLocaleProperty: secondLocaleProperty,

  // Voices for the primary and second locale. At 12/12/24 PhET-iO meeting, we decided that these Properties will
  // not be instrumented for PhET-iO. SpeechSynthesisVoice is a native JavaScript type, so creating an IOType is
  // problematic. And it doesn’t make sense to configure in a wrapper, because available voices are platform specific.
  primaryVoiceProperty: new Property<SpeechSynthesisVoice | null>( null ),
  secondVoiceProperty: new Property<SpeechSynthesisVoice | null>( null ),

  // When true, the phrase will automatically be spoken whenever it changes.
  autoHearEnabledProperty: new BooleanProperty( NumberPairsQueryParameters.autoHear, {
    tandem: Tandem.PREFERENCES.createTandem( 'autoHearEnabledProperty' ),
    phetioFeatured: true
  } ),

  // Whether the second locale feature is enabled.
  secondLocaleEnabledProperty: new BooleanProperty( !!NumberPairsQueryParameters.secondLocale, {
    tandem: Tandem.PREFERENCES.createTandem( 'secondLocaleEnabledProperty' ),
    phetioReadOnly: true
  } ),

  // Whether the sim is using its primary locale or secondary locale on screens that support two languages.
  // NOTE: In https://github.com/phetsims/number-pairs/issues/162 this was designed to be a global, not per-screen.
  isPrimaryLocaleProperty: new BooleanProperty( true, {
    tandem: Tandem.PREFERENCES.createTandem( 'isPrimaryLocaleProperty' ),
    phetioReadOnly: true
  } ),

  numberModelTypeProperty: new EnumerationProperty( NumberPairsQueryParameters.numberModelType === 'numberBond' ? NumberModelType.NUMBER_BOND_MODEL : NumberModelType.BAR_MODEL, {
    tandem: Tandem.PREFERENCES.createTandem( 'numberModelTypeProperty' ),
    phetioFeatured: true
  } ),

  sumScreenTotalOnTopProperty: new BooleanProperty( NumberPairsQueryParameters.sumScreenNumberModelOrientation === 'top', {
    tandem: Tandem.PREFERENCES.createTandem( 'sumScreenTotalOnTopProperty' ),
    phetioFeatured: true
  } )
};

numberPairs.register( 'NumberPairsPreferences', NumberPairsPreferences );
export default NumberPairsPreferences;