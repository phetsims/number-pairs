// Copyright 2024, University of Colorado Boulder
/**
 * Creates a numberSpinner inside of a panel that adjusts the respective addend.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import numberPairs from '../../numberPairs.js';
import { Node } from '../../../../scenery/js/imports.js';
import Property from '../../../../axon/js/Property.js';
import NumberSpinner from '../../../../sun/js/NumberSpinner.js';
import Range from '../../../../dot/js/Range.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';

type AddendSpinnerPanelOptions = WithRequired<PanelOptions, 'tandem'>;
export default class AddendSpinnerPanel extends Panel {

  public constructor(
    addendNumberProperty: Property<number>,
    totalRangeProperty: TReadOnlyProperty<Range>,
    providedOptions: AddendSpinnerPanelOptions
  ) {

    const numberSpinner = new NumberSpinner( addendNumberProperty, totalRangeProperty, {
      numberDisplayOptions: {
        backgroundStroke: null
      },
      tandem: providedOptions.tandem.createTandem( 'numberSpinner' )
    } );
    const container = new Node( {
      children: [ numberSpinner ]
    } );

    super( container );
  }
}

numberPairs.register( 'AddendSpinnerPanel', AddendSpinnerPanel );