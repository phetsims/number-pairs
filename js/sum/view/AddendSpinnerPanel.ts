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
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import CountingObject from '../../common/model/CountingObject.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';

type AddendSpinnerPanelOptions = WithRequired<PanelOptions, 'tandem'>;
export default class AddendSpinnerPanel extends Panel {

  public constructor(
    addendObservableArray: ObservableArray<CountingObject>,
    inactiveCountingObjects: ObservableArray<CountingObject>,
    addendNumberProperty: Property<number>,
    addendRangeProperty: TReadOnlyProperty<Range>,
    addendsStableProperty: Property<boolean>,
    providedOptions: AddendSpinnerPanelOptions
  ) {

    addendsStableProperty.value = false;

    // We create a proxy for the NumberSpinner since the model is powered by ObservableArrays.
    const addendNumberProxyProperty = new NumberProperty( addendNumberProperty.value, {
      numberType: 'Integer'
    } );
    const numberSpinner = new NumberSpinner( addendNumberProxyProperty, addendRangeProperty, {
      numberDisplayOptions: {
        backgroundStroke: null
      },
      tandem: providedOptions.tandem.createTandem( 'numberSpinner' )
    } );
    const container = new Node( {
      children: [ numberSpinner ]
    } );

    super( container );

    addendNumberProxyProperty.lazyLink( ( newValue, oldValue ) => {
      const delta = newValue - oldValue;
      if ( addendsStableProperty.value ) {
        if ( delta > 0 ) {
          addendsStableProperty.value = false;
          _.times( delta, () => {
            const countingObject = inactiveCountingObjects.shift();
            assert && assert( countingObject, 'no more inactive counting objects' );
            addendObservableArray.push( countingObject! );
          } );
        }
        else if ( delta < 0 ) {
          addendsStableProperty.value = false;
          _.times( -delta, () => {
            const countingObject = addendObservableArray.pop();
            assert && assert( countingObject, 'no more counting objects in addend' );
            inactiveCountingObjects.push( countingObject! );
          } );
        }
        addendsStableProperty.value = true;
      }
    } );

    addendsStableProperty.value = true;
  }
}

numberPairs.register( 'AddendSpinnerPanel', AddendSpinnerPanel );