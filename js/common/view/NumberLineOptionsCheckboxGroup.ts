// Copyright 2024, University of Colorado Boulder

/**
 * TODO: describe file
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import VerticalCheckboxGroup, { VerticalCheckboxGroupItem, VerticalCheckboxGroupOptions } from '../../../../sun/js/VerticalCheckboxGroup.js';
import { Text } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';

const CHECKBOX_LABEL_OPTIONS = {
  font: new PhetFont( 16 )
};
export default class NumberLineOptionsCheckboxGroup extends VerticalCheckboxGroup {

  public constructor( model: NumberPairsModel, countingAreaBounds: Bounds2, providedOptions: VerticalCheckboxGroupOptions ) {
    const options = combineOptions<VerticalCheckboxGroupOptions>( {
      bottom: countingAreaBounds.top - 8,
      right: countingAreaBounds.right
    }, providedOptions );
    const checkboxGroupItems: VerticalCheckboxGroupItem[] = [
      {
        createNode: () => new Text( NumberPairsStrings.addendsStringProperty, CHECKBOX_LABEL_OPTIONS ),
        property: model.showAddendValuesProperty
      },
      {
        createNode: () => new Text( NumberPairsStrings.tickNumbersStringProperty, CHECKBOX_LABEL_OPTIONS ),
        property: model.showTickValuesProperty
      },
      {
        createNode: () => new Text( NumberPairsStrings.totalJumpStringProperty, CHECKBOX_LABEL_OPTIONS ),
        property: model.showTotalJumpProperty
      }
    ];
    super( checkboxGroupItems, options );
  }
}

numberPairs.register( 'NumberLineOptionsCheckboxGroup', NumberLineOptionsCheckboxGroup );