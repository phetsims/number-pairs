// Copyright 2024-2025, University of Colorado Boulder
/**
 * This button toggles the visibility of the addend (or addends).
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import EyeToggleButton, { EyeToggleButtonOptions } from '../../../../scenery-phet/js/buttons/EyeToggleButton.js';
import Color from '../../../../scenery/js/util/Color.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';

type SelfOptions = {
  secondAddendVisibleProperty?: BooleanProperty | null;
  addendStringProperty?: TReadOnlyProperty<string> | null;
};
type AddendEyeToggleButtonOptions = SelfOptions & WithRequired<EyeToggleButtonOptions, 'tandem'>;

const HEIGHT = 40; // empirically determined
export default class AddendEyeToggleButton extends EyeToggleButton {

  public constructor( addendVisibleProperty: BooleanProperty, providedOptions: AddendEyeToggleButtonOptions ) {

    const options = optionize<AddendEyeToggleButtonOptions, SelfOptions, EyeToggleButtonOptions>()( {
      size: new Dimension2( NumberPairsConstants.RECTANGULAR_PUSH_BUTTON_OPTIONS.size.width, HEIGHT ),
      secondAddendVisibleProperty: null,
      addendStringProperty: null,
      baseColor: Color.WHITE,
      touchAreaXDilation: 5,
      touchAreaYDilation: 5
    }, providedOptions );

    assert && assert( ( options.secondAddendVisibleProperty && options.addendStringProperty === null ) ||
                      ( options.addendStringProperty || options.secondAddendVisibleProperty === null ),
      'Either secondAddendVisibleProperty or addendStringProperty must be provided, but not both' );

    let addendToggleVisibleProperty = addendVisibleProperty;
    let hideAddendPatternStringProperty: TReadOnlyProperty<string> | null = null;
    let showAddendPatternStringProperty: TReadOnlyProperty<string> | null = null;
    if ( options.secondAddendVisibleProperty ) {
      addendToggleVisibleProperty = new BooleanProperty( addendVisibleProperty.value && options.secondAddendVisibleProperty.value, {
        reentrant: true,
        tandem: options.tandem.createTandem( 'doubleVisibleProperty' ),
        phetioFeatured: true
      } );

      // Track if our addend visible properties are updating to avoid circular updates.
      let updatingAddendVisibleProperties = false;
      addendToggleVisibleProperty.link( value => {
        if ( !updatingAddendVisibleProperties ) {
          updatingAddendVisibleProperties = true;

          // No matter what the addendToggleVisibleProperty is set to, the other Properties must follow suit.
          addendVisibleProperty.value = value;
          options.secondAddendVisibleProperty!.value = value;
          updatingAddendVisibleProperties = false;
        }
      } );

      // If either addendVisibleProperty or secondAddendVisibleProperty changes, update the addendToggleVisibleProperty.
      Multilink.multilink( [ addendVisibleProperty, options.secondAddendVisibleProperty ], ( addendVisible, secondAddendVisible ) => {
        if ( !updatingAddendVisibleProperties ) {
          updatingAddendVisibleProperties = true;
          addendToggleVisibleProperty.set( addendVisible && secondAddendVisible );
          updatingAddendVisibleProperties = false;
        }
      } );
    }
    else if ( options.addendStringProperty ) {
      hideAddendPatternStringProperty = new PatternStringProperty( NumberPairsStrings.a11y.hideAddendPatternStringProperty, {
        addend: options.addendStringProperty
      } );
      showAddendPatternStringProperty = new PatternStringProperty( NumberPairsStrings.a11y.showAddendPatternStringProperty, {
        addend: options.addendStringProperty
      } );
    }

    options.accessibleName = hideAddendPatternStringProperty ? hideAddendPatternStringProperty.value : NumberPairsStrings.a11y.hideAddendsStringProperty;
    super( addendToggleVisibleProperty, options );

    addendToggleVisibleProperty.link( visible => {
      if ( options.secondAddendVisibleProperty ) {
        this.accessibleName = visible ? NumberPairsStrings.a11y.hideAddendsStringProperty : NumberPairsStrings.a11y.showAddendsStringProperty;
      }
      else if ( hideAddendPatternStringProperty && showAddendPatternStringProperty ) {
        this.accessibleName = visible ? hideAddendPatternStringProperty : showAddendPatternStringProperty;
      }
    } );
  }
}

numberPairs.register( 'AddendEyeToggleButton', AddendEyeToggleButton );