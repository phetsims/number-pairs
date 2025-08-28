// Copyright 2024-2025, University of Colorado Boulder
/**
 * Creates a counting object control inside a panel that adjusts the respective addend.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import CountingObject from '../../common/model/CountingObject.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import numberPairs from '../../numberPairs.js';
import CountingObjectControl, { CountingObjectControlOptions } from './CountingObjectControl.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = {
  countingObjectControlOptions: StrictOmit<CountingObjectControlOptions, 'tandem'>;
};
type AddendControlPanelOptions = WithRequired<PanelOptions, 'tandem'> & SelfOptions;
export default class AddendControlPanel extends Panel {
  public readonly countingObjectControl: CountingObjectControl;
  public constructor(
    totalProperty: NumberProperty,
    addendCountingObjects: ObservableArray<CountingObject>,
    inactiveCountingObjects: ObservableArray<CountingObject>,
    countingRepresentationTypeProperty: TReadOnlyProperty<RepresentationType>,
    providedOptions: AddendControlPanelOptions
  ) {
    const options = optionize<AddendControlPanelOptions, SelfOptions, PanelOptions>()( {
      yMargin: 4,
      xMargin: 4,
      cornerRadius: 5,
      phetioVisiblePropertyInstrumented: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions );

    const countingObjectControlOptions = combineOptions<CountingObjectControlOptions>( {
      tandem: options.tandem.createTandem( 'control' )
    }, options.countingObjectControlOptions );

    const countingObjectControl = new CountingObjectControl(
      totalProperty,
      addendCountingObjects,
      inactiveCountingObjects,
      countingRepresentationTypeProperty, countingObjectControlOptions );
    const container = new Node( {
      children: [ countingObjectControl ]
    } );
    super( container, options );
    this.countingObjectControl = countingObjectControl;

  }
}

numberPairs.register( 'AddendControlPanel', AddendControlPanel );