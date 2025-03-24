// Copyright 2025, University of Colorado Boulder
/**
 * NumberModelOrientationControl is a radio button group that allows the user to select the orientation of the number
 * model on the sum screen.
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
import NumberBondNode from './NumberBondNode.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import NumberPairsColors from '../NumberPairsColors.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import ToggleNode from '../../../../sun/js/ToggleNode.js';
import BarModelNode from './BarModelNode.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import NumberPairsConstants from '../NumberPairsConstants.js';

type NumberModelTypeControlOptions = WithRequired<PreferencesControlOptions, 'tandem'>;
export default class NumberModelOrientationControl extends PreferencesControl {

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

    const radioButtonGroup = new RectangularRadioButtonGroup( NumberPairsPreferences.sumScreenTotalOnTopProperty,
      [
        {
          createNode: () => new ToggleNode( NumberPairsPreferences.numberModelTypeProperty, [
            {
              createNode: () => new NumberBondNode( syntheticNumberPairsModel, {
                iconOnly: true,
                totalOnTopProperty: new BooleanProperty( false )
              } ),
              value: NumberModelType.NUMBER_BOND_MODEL
            },
            {
              createNode: () => new BarModelNode( syntheticNumberPairsModel, {
                iconOnly: true,
                totalOnTopProperty: new BooleanProperty( false )
              } ),
              value: NumberModelType.BAR_MODEL
            }
          ] ),
          value: false,
          tandemName: 'totalOnBottomRadioButton'
        },
        {
          createNode: () => new ToggleNode( NumberPairsPreferences.numberModelTypeProperty, [
            {
              createNode: () => new NumberBondNode( syntheticNumberPairsModel, {
                iconOnly: true
              } ),
              value: NumberModelType.NUMBER_BOND_MODEL
            },
            {
              createNode: () => new BarModelNode( syntheticNumberPairsModel, {
                iconOnly: true
              } ),
              value: NumberModelType.BAR_MODEL
            }
          ] ),
          value: true,
          tandemName: 'totalOnTopRadioButton'
        }
      ], {
        radioButtonOptions: {
          maxWidth: NumberPairsConstants.PREFERENCES_ICON_MAX_WIDTH,
          xMargin: 15,
          baseColor: NumberPairsColors.numberBondAccordionBoxBackgroundColorProperty
        },
        orientation: 'horizontal',
        tandem: providedOptions.tandem.createTandem( 'radioButtonGroup' ),
        isDisposable: false,

        // Hide or show the entire row, not just the radio button
        phetioVisiblePropertyInstrumented: false
      } );
    super( combineOptions<PreferencesControlOptions>( {
      labelNode: new Text( NumberPairsStrings.sumScreenNumberModelOrientationStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
      descriptionNode: new RichText( NumberPairsStrings.sumScreenNumberModelOrientationDescriptionStringProperty, PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS ),
      controlNode: radioButtonGroup
    }, providedOptions ) );
  }
}

numberPairs.register( 'NumberModelOrientationControl', NumberModelOrientationControl );