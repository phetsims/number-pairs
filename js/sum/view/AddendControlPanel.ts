// Copyright 2024, University of Colorado Boulder
/**
 * Creates a counting object control inside a panel that adjusts the respective addend.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import { Node } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import CountingObject from '../../common/model/CountingObject.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import numberPairs from '../../numberPairs.js';
import CountingObjectControl from './CountingObjectControl.js';

type SelfOptions = {
  addendNumberProperty?: Property<number> | null;
};
type AddendSpinnerPanelOptions = WithRequired<PanelOptions, 'tandem'> & SelfOptions;
export default class AddendControlPanel extends Panel {

  public constructor(
    totalNumberProperty: Property<number>,
    addendCountingObjects: ObservableArray<CountingObject>,
    inactiveCountingObjects: ObservableArray<CountingObject>,
    countingRepresentationTypeProperty: TReadOnlyProperty<RepresentationType>,
    providedOptions: AddendSpinnerPanelOptions
  ) {

    const options = optionize<AddendSpinnerPanelOptions, SelfOptions, PanelOptions>()( {
      addendNumberProperty: null,
      yMargin: 4,
      xMargin: 4,
      cornerRadius: 5
    }, providedOptions );
    const countingObjectControl = new CountingObjectControl(
      totalNumberProperty,
      addendCountingObjects,
      inactiveCountingObjects,
      countingRepresentationTypeProperty, {
        tandem: providedOptions.tandem.createTandem( 'countingObjectControl' ),
        addendNumberProperty: options.addendNumberProperty // TODO: Add documentation about this option (if null we're a right addend)
      } );
    const container = new Node( {
      children: [ countingObjectControl ]
    } );
    super( container, options );

    // TODO: Add grouped alt-input behavior
  }
}

numberPairs.register( 'AddendControlPanel', AddendControlPanel );