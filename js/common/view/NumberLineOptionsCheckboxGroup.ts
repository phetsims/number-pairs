// Copyright 2024, University of Colorado Boulder

/**
 * TODO: describe file
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import { Text } from '../../../../scenery/js/imports.js';
import VerticalCheckboxGroup, { VerticalCheckboxGroupItem, VerticalCheckboxGroupOptions } from '../../../../sun/js/VerticalCheckboxGroup.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsConstants from '../NumberPairsConstants.js';

type NumberLineOptionsCheckboxGroupOptions = WithRequired<VerticalCheckboxGroupOptions, 'tandem'>;
export default class NumberLineOptionsCheckboxGroup extends VerticalCheckboxGroup {

  public constructor( model: NumberPairsModel, countingAreaBounds: Bounds2, providedOptions: NumberLineOptionsCheckboxGroupOptions ) {
    const options = optionize<NumberLineOptionsCheckboxGroupOptions, EmptySelfOptions, VerticalCheckboxGroupOptions>()( {
    }, providedOptions );
    const checkboxGroupItems: VerticalCheckboxGroupItem[] = [
      {
        createNode: () => new Text( NumberPairsStrings.addendsStringProperty, NumberPairsConstants.CHECKBOX_LABEL_OPTIONS ),
        property: model.showNumberLineAddendValuesProperty,
        tandemName: 'addendsCheckbox'
      },
      {
        createNode: () => new Text( NumberPairsStrings.tickNumbersStringProperty, NumberPairsConstants.CHECKBOX_LABEL_OPTIONS ),
        property: model.showTickValuesProperty,
        tandemName: 'tickValuesCheckbox'
      },
      {
        createNode: () => new Text( NumberPairsStrings.totalJumpStringProperty, NumberPairsConstants.CHECKBOX_LABEL_OPTIONS ),
        property: model.showTotalJumpProperty,
        tandemName: 'totalJumpCheckbox'
      }
    ];
    super( checkboxGroupItems, options );
  }
}

numberPairs.register( 'NumberLineOptionsCheckboxGroup', NumberLineOptionsCheckboxGroup );