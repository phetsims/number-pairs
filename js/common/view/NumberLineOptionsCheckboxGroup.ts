// Copyright 2024-2025, University of Colorado Boulder

/**
 * This checkbox group contains options to turn on decorators that are only applicable to the number line representation.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VerticalCheckboxGroup, { VerticalCheckboxGroupItem, VerticalCheckboxGroupOptions } from '../../../../sun/js/VerticalCheckboxGroup.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsConstants from '../NumberPairsConstants.js';

type NumberLineOptionsCheckboxGroupOptions = WithRequired<VerticalCheckboxGroupOptions, 'tandem'>;
export default class NumberLineOptionsCheckboxGroup extends VerticalCheckboxGroup {

  // We want to explicitly state the width and spacing (even if they are default values), so that we can
  // rely on these sizes elsewhere for layout.
  public static readonly CHECKBOX_OPTIONS = {
    boxWidth: 21,
    spacing: 5
  };

  public constructor( model: NumberPairsModel, providedOptions: NumberLineOptionsCheckboxGroupOptions ) {
    const options = optionize<NumberLineOptionsCheckboxGroupOptions, EmptySelfOptions, VerticalCheckboxGroupOptions>()( {
      checkboxOptions: NumberLineOptionsCheckboxGroup.CHECKBOX_OPTIONS
    }, providedOptions );
    const checkboxGroupItems: VerticalCheckboxGroupItem[] = [
      {

        // TODO: Duplicated between here and NumberLineLevelNode, factor out, see https://github.com/phetsims/number-pairs/issues/316
        createNode: () => new Text( NumberPairsFluent.addendsStringProperty, NumberPairsConstants.CHECKBOX_LABEL_OPTIONS ),
        property: model.numberLineAddendValuesVisibleProperty,
        tandemName: 'addendsCheckbox',
        options: {
          accessibleHelpText: NumberPairsFluent.a11y.controls.addendsCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: NumberPairsFluent.a11y.controls.addendsCheckbox.accessibleContextResponseChecked.createProperty( {
            leftAddend: model.leftAddendProperty,
            rightAddend: model.rightAddendProperty
          } ),
          accessibleContextResponseUnchecked: NumberPairsFluent.a11y.controls.addendsCheckbox.accessibleContextResponseUncheckedStringProperty
        }
      },
      {
        createNode: () => new Text( NumberPairsFluent.tickNumbersStringProperty, NumberPairsConstants.CHECKBOX_LABEL_OPTIONS ),
        property: model.tickValuesVisibleProperty,
        tandemName: 'tickValuesCheckbox',
        options: {
          accessibleHelpText: NumberPairsFluent.a11y.controls.tickNumbersCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: NumberPairsFluent.a11y.controls.tickNumbersCheckbox.accessibleContextResponseCheckedStringProperty,
          accessibleContextResponseUnchecked: NumberPairsFluent.a11y.controls.tickNumbersCheckbox.accessibleContextResponseUncheckedStringProperty
        }
      },
      {
        createNode: () => new Text( NumberPairsFluent.totalJumpStringProperty, NumberPairsConstants.CHECKBOX_LABEL_OPTIONS ),
        property: model.totalJumpVisibleProperty,
        tandemName: 'totalJumpCheckbox',
        options: {
          accessibleHelpText: NumberPairsFluent.a11y.controls.totalJumpCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: NumberPairsFluent.a11y.controls.totalJumpCheckbox.accessibleContextResponseCheckedStringProperty,
          accessibleContextResponseUnchecked: NumberPairsFluent.a11y.controls.totalJumpCheckbox.accessibleContextResponseUncheckedStringProperty
        }
      }
    ];
    super( checkboxGroupItems, options );
  }
}

numberPairs.register( 'NumberLineOptionsCheckboxGroup', NumberLineOptionsCheckboxGroup );
