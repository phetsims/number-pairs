// Copyright 2024-2025, University of Colorado Boulder

/**
 * This checkbox group contains options to turn on decorators that are only applicable to the number line representation.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VerticalCheckboxGroup, { VerticalCheckboxGroupItem, VerticalCheckboxGroupOptions } from '../../../../sun/js/VerticalCheckboxGroup.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import { createAddendsCheckboxItem, createTickNumbersCheckboxItem } from './NumberLineCheckboxItems.js';

type SelfOptions = {
  totalJumpVisibleProperty?: Property<boolean> | null;
};
type NumberLineOptionsCheckboxGroupOptions = WithRequired<VerticalCheckboxGroupOptions, 'tandem'> & SelfOptions;
export default class NumberLineOptionsCheckboxGroup extends VerticalCheckboxGroup {

  // We want to explicitly state the width and spacing (even if they are default values), so that we can
  // rely on these sizes elsewhere for layout.
  public static readonly CHECKBOX_OPTIONS = {
    boxWidth: 21,
    spacing: 5
  };

  public constructor( addendValuesVisibleProperty: Property<boolean>, leftAddendProperty: PhetioProperty<number>,
                      rightAddendProperty: TReadOnlyProperty<number>, tickValuesVisibleProperty: Property<boolean>,
                      providedOptions: NumberLineOptionsCheckboxGroupOptions ) {
    const options = optionize<NumberLineOptionsCheckboxGroupOptions, SelfOptions, VerticalCheckboxGroupOptions>()( {
      totalJumpVisibleProperty: null,
      checkboxOptions: NumberLineOptionsCheckboxGroup.CHECKBOX_OPTIONS
    }, providedOptions );
    const checkboxGroupItems: VerticalCheckboxGroupItem[] = [
      createAddendsCheckboxItem( {
        property: addendValuesVisibleProperty,
        textOptions: NumberPairsConstants.CHECKBOX_LABEL_OPTIONS,
        leftAddendProperty: leftAddendProperty,
        rightAddendProperty: rightAddendProperty
      } ),
      createTickNumbersCheckboxItem( {
        property: tickValuesVisibleProperty,
        textOptions: NumberPairsConstants.CHECKBOX_LABEL_OPTIONS
      } ),
      ...( options.totalJumpVisibleProperty ? [
        {
          createNode: () => new Text( NumberPairsFluent.totalJumpStringProperty, NumberPairsConstants.CHECKBOX_LABEL_OPTIONS ),
          property: options.totalJumpVisibleProperty,
          tandemName: 'totalJumpCheckbox',
          options: {
            accessibleHelpText: NumberPairsFluent.a11y.controls.totalJumpCheckbox.accessibleHelpTextStringProperty,
            accessibleContextResponseChecked: NumberPairsFluent.a11y.controls.totalJumpCheckbox.accessibleContextResponseCheckedStringProperty,
            accessibleContextResponseUnchecked: NumberPairsFluent.a11y.controls.totalJumpCheckbox.accessibleContextResponseUncheckedStringProperty
          }
        }
      ] : [] )

    ];
    super( checkboxGroupItems, options );
  }
}

numberPairs.register( 'NumberLineOptionsCheckboxGroup', NumberLineOptionsCheckboxGroup );
