// Copyright 2025, University of Colorado Boulder
/**
 * NumberModelTypeControl is a radio button group that allows the user to select the type of number model.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import PreferencesControl, { PreferencesControlOptions } from '../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import NumberPairsPreferences, { NumberModelType } from '../model/NumberPairsPreferences.js';
import NumberPairsColors from '../NumberPairsColors.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import BarModelIconNode from './BarModelIconNode.js';
import NumberBondIconNode from './NumberBondIconNode.js';

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
          createNode: () => new NumberBondIconNode( syntheticNumberPairsModel, {} ),
          value: NumberModelType.NUMBER_BOND_MODEL,
          tandemName: 'numberBondModelRadioButton',
          options: {
            accessibleName: NumberPairsFluent.numberBondStringProperty
          }
        },
        {

          // We have to wrap BarModelMutableNode in a Node to avoid a layout bug that we were unable to diagnose.
          // See: https://github.com/phetsims/number-pairs/issues/410#issuecomment-3604802055
          // There is probably some combination of options that would avoid this, but we were unable to identify it, and
          // no longer worth the time investment.
          createNode: () => new Node( { children: [ new BarModelIconNode( syntheticNumberPairsModel, {} ) ] } ),
          value: NumberModelType.BAR_MODEL,
          tandemName: 'barModelRadioButton',
          options: {
            accessibleName: NumberPairsFluent.barModelStringProperty
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
        accessibleName: NumberPairsFluent.numberModelTypeStringProperty,
        accessibleHelpText: NumberPairsFluent.numberModelTypeDescriptionStringProperty,

        // Hide or show the entire row, not just the radio button
        phetioVisiblePropertyInstrumented: false
      } );

    super( combineOptions<PreferencesControlOptions>( {
      labelNode: new Text( NumberPairsFluent.numberModelTypeStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
      descriptionNode: new RichText( NumberPairsFluent.numberModelTypeDescriptionStringProperty, PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS ),
      controlNode: radioButtonGroup,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions ) );
  }
}

numberPairs.register( 'NumberModelTypeControl', NumberModelTypeControl );