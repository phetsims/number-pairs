// Copyright 2024-2025, University of Colorado Boulder

/**
 * This checkbox group contains options to turn on decorators that are only applicable to the number line representation.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VerticalCheckboxGroup, { VerticalCheckboxGroupItem, VerticalCheckboxGroupOptions } from '../../../../sun/js/VerticalCheckboxGroup.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
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
        createNode: () => new Text( NumberPairsStrings.addendsStringProperty, NumberPairsConstants.CHECKBOX_LABEL_OPTIONS ),
        property: model.numberLineAddendValuesVisibleProperty,
        tandemName: 'addendsCheckbox'
      },
      {
        createNode: () => new Text( NumberPairsStrings.tickNumbersStringProperty, NumberPairsConstants.CHECKBOX_LABEL_OPTIONS ),
        property: model.tickValuesVisibleProperty,
        tandemName: 'tickValuesCheckbox'
      },
      {
        createNode: () => new Text( NumberPairsStrings.totalJumpStringProperty, NumberPairsConstants.CHECKBOX_LABEL_OPTIONS ),
        property: model.totalJumpVisibleProperty,
        tandemName: 'totalJumpCheckbox'
      }
    ];
    super( checkboxGroupItems, options );
  }
}

numberPairs.register( 'NumberLineOptionsCheckboxGroup', NumberLineOptionsCheckboxGroup );