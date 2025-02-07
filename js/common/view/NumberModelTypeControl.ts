// Copyright 2025, University of Colorado Boulder
/**
 * NumberModelTypeControl is a radio button group that allows the user to select the type of number model.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import PreferencesControl, { PreferencesControlOptions } from '../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsConstants from '../NumberPairsConstants.js';

type NumberModelTypeControlOptions = WithRequired<PreferencesControlOptions, 'tandem'>;
export default class NumberModelTypeControl extends PreferencesControl {

  public constructor( providedOptions: NumberModelTypeControlOptions ) {
    const numberModelTypeRadioButtonGroup = new RectangularRadioButtonGroup( NumberPairsConstants.NUMBER_MODEL_TYPE_PROPERTY,
      [
        {
          createNode: () => new Text( 'Number Bond', PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
          value: NumberModelType.NUMBER_BOND_MODEL,
          tandemName: 'numberBondModelRadioButton'
        },
        {
          createNode: () => new Text( 'Bar Model', PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
          value: NumberModelType.BAR_MODEL,
          tandemName: 'barModelRadioButton'
        }
      ], {
        orientation: 'horizontal',
        tandem: providedOptions.tandem.createTandem( 'numberModelTypeRadioButtonGroup' ),
        isDisposable: false,

        // Hide or show the entire row, not just the radio button
        phetioVisiblePropertyInstrumented: false
      } );
   super( combineOptions<PreferencesControlOptions>( {
     labelNode: new Text( 'Number Model Type', PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
     controlNode: numberModelTypeRadioButtonGroup
   }, providedOptions ) );
  }
}

export class NumberModelType extends EnumerationValue {
  public static readonly NUMBER_BOND_MODEL = new NumberModelType();
  public static readonly BAR_MODEL = new NumberModelType();

  public static readonly enumeration = new Enumeration( NumberModelType );
}

numberPairs.register( 'NumberModelTypeControl', NumberModelTypeControl );