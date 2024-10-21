// Copyright 2024, University of Colorado Boulder
/**
 * Creates a counting object control inside a panel that adjusts the respective addend.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import numberPairs from '../../numberPairs.js';
import { Node } from '../../../../scenery/js/imports.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import CountingObjectControl from './CountingObjectControl.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import CountingObject, { AddendType } from '../../common/model/CountingObject.js';
import { CountingRepresentationType } from '../../common/model/NumberPairsModel.js';
import Property from '../../../../axon/js/Property.js';

type SelfOptions = {
  addendType: AddendType;
};
type AddendSpinnerPanelOptions = WithRequired<PanelOptions, 'tandem'> & SelfOptions;
export default class AddendControlPanel extends Panel {

  public constructor(
    totalNumberProperty: Property<number>,
    addendCountingObjects: ObservableArray<CountingObject>,
    inactiveCountingObjects: ObservableArray<CountingObject>,
    countingRepresentationTypeProperty: TReadOnlyProperty<CountingRepresentationType>,
    providedOptions: AddendSpinnerPanelOptions
  ) {

    const countingObjectControl = new CountingObjectControl(
      totalNumberProperty,
      addendCountingObjects,
      inactiveCountingObjects,
      countingRepresentationTypeProperty, {
      tandem: providedOptions.tandem.createTandem( 'countingObjectControl' ),
      addendType: providedOptions.addendType
    } );
    const container = new Node( {
      children: [ countingObjectControl ]
    } );

    super( container, providedOptions );

    // TODO: Add grouped alt-input behavior
  }
}

numberPairs.register( 'AddendControlPanel', AddendControlPanel );