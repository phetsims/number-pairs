// Copyright 2024-2025, University of Colorado Boulder
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
import Node from '../../../../scenery/js/nodes/Node.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import CountingObject from '../../common/model/CountingObject.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import numberPairs from '../../numberPairs.js';
import CountingObjectControl, { CountingObjectControlOptions } from './CountingObjectControl.js';

type SelfOptions = {
  countingObjectControlOptions: CountingObjectControlOptions;
};
type AddendSpinnerPanelOptions = PanelOptions & SelfOptions;
export default class AddendControlPanel extends Panel {

  public constructor(
    totalNumberProperty: Property<number>,
    addendCountingObjects: ObservableArray<CountingObject>,
    inactiveCountingObjects: ObservableArray<CountingObject>,
    countingRepresentationTypeProperty: TReadOnlyProperty<RepresentationType>,
    providedOptions: AddendSpinnerPanelOptions
  ) {
    const options = optionize<AddendSpinnerPanelOptions, SelfOptions, PanelOptions>()( {
      yMargin: 4,
      xMargin: 4,
      cornerRadius: 5
    }, providedOptions );

    const countingObjectControl = new CountingObjectControl(
      totalNumberProperty,
      addendCountingObjects,
      inactiveCountingObjects,
      countingRepresentationTypeProperty, options.countingObjectControlOptions );
    const container = new Node( {
      children: [ countingObjectControl ]
    } );
    super( container, options );


  }
}

numberPairs.register( 'AddendControlPanel', AddendControlPanel );