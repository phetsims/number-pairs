// Copyright 2025, University of Colorado Boulder
/**
 * NumberModelTypeControl is a radio button group that allows the user to select the type of number model.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import PreferencesControl, { PreferencesControlOptions } from '../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsPreferences, { NumberModelType } from '../model/NumberPairsPreferences.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import BarModelNode from './BarModelNode.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import NumberPairsColors from '../NumberPairsColors.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberBondNode from './NumberBondNode.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import NumberPairsConstants from '../NumberPairsConstants.js';

type NumberModelTypeControlOptions = WithRequired<PreferencesControlOptions, 'tandem'>;
export default class NumberModelTypeControl extends PreferencesControl {

  public constructor( providedOptions: NumberModelTypeControlOptions ) {

    const syntheticNumberPairsModel = {
      totalProperty: new NumberProperty( 10 ),
      totalColorProperty: NumberPairsColors.attributeSumColorProperty,
      totalVisibleProperty: new BooleanProperty( false ),
      leftAddendProperty: new NumberProperty( 7 ),
      leftAddendColorProperty: NumberPairsColors.attributeLeftAddendColorProperty,
      leftAddendVisibleProperty: new BooleanProperty( false ),
      rightAddendProperty: new NumberProperty( 3 ),
      rightAddendColorProperty: NumberPairsColors.attributeRightAddendColorProperty,
      rightAddendVisibleProperty: new BooleanProperty( false )
    };
    const radioButtonGroup = new RectangularRadioButtonGroup( NumberPairsPreferences.numberModelTypeProperty,
      [
        {
          createNode: () => new NumberBondNode( syntheticNumberPairsModel, { iconOnly: true } ),
          value: NumberModelType.NUMBER_BOND_MODEL,
          tandemName: 'numberBondModelRadioButton',
          options: {
            accessibleName: NumberPairsStrings.numberBondStringProperty
          }
        },
        {
          createNode: () => new BarModelNode( syntheticNumberPairsModel, { iconOnly: true } ),
          value: NumberModelType.BAR_MODEL,
          tandemName: 'barModelRadioButton',
          options: {
            accessibleName: NumberPairsStrings.barModelStringProperty
          }
        }
      ], {
        orientation: 'horizontal',
        tandem: providedOptions.tandem.createTandem( 'radioButtonGroup' ),
        isDisposable: false,
        radioButtonOptions: {
          maxWidth: NumberPairsConstants.PREFERENCES_ICON_MAX_WIDTH,
          xMargin: 15,
          baseColor: NumberPairsColors.numberBondAccordionBoxBackgroundColorProperty
        },
        accessibleName: NumberPairsStrings.numberModelTypeStringProperty,
        accessibleHelpText: NumberPairsStrings.numberModelTypeDescriptionStringProperty,

        // Hide or show the entire row, not just the radio button
        phetioVisiblePropertyInstrumented: false
      } );

    super( combineOptions<PreferencesControlOptions>( {
      labelNode: new Text( NumberPairsStrings.numberModelTypeStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
      descriptionNode: new RichText( NumberPairsStrings.numberModelTypeDescriptionStringProperty, PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS ),
      controlNode: radioButtonGroup,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions ) );
  }
}

numberPairs.register( 'NumberModelTypeControl', NumberModelTypeControl );