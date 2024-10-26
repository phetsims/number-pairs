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
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';

const CHECKBOX_LABEL_OPTIONS = {
  font: new PhetFont( 16 )
};

type NumberLineOptionsCheckboxGroupOptions = WithRequired<VerticalCheckboxGroupOptions, 'tandem'>;
export default class NumberLineOptionsCheckboxGroup extends VerticalCheckboxGroup {

  public constructor( model: NumberPairsModel, countingAreaBounds: Bounds2, providedOptions: NumberLineOptionsCheckboxGroupOptions ) {
    const options = optionize<NumberLineOptionsCheckboxGroupOptions, EmptySelfOptions, VerticalCheckboxGroupOptions>()( {
      bottom: countingAreaBounds.top - 8,
      right: countingAreaBounds.right
    }, providedOptions );
    const checkboxGroupItems: VerticalCheckboxGroupItem[] = [
      {
        createNode: () => new Text( NumberPairsStrings.addendsStringProperty, CHECKBOX_LABEL_OPTIONS ),
        property: model.showNumberLineAddendValuesProperty,
        tandemName: 'addendsCheckbox'
      },
      {
        createNode: () => new Text( NumberPairsStrings.tickNumbersStringProperty, CHECKBOX_LABEL_OPTIONS ),
        property: model.showTickValuesProperty,
        tandemName: 'tickValuesCheckbox'
      },
      {
        createNode: () => new Text( NumberPairsStrings.totalJumpStringProperty, CHECKBOX_LABEL_OPTIONS ),
        property: model.showTotalJumpProperty,
        tandemName: 'totalJumpCheckbox'
      }
    ];
    super( checkboxGroupItems, options );
  }
}

numberPairs.register( 'NumberLineOptionsCheckboxGroup', NumberLineOptionsCheckboxGroup );