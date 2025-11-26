// Copyright 2025, University of Colorado Boulder

/**
 * Shared description helpers for number pairs view nodes.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import numberPairs from '../../../numberPairs.js';


const Description = {
  /**
   * Returns a string Property for describing a number value, taking visibility into account.
   */
  getValueStringProperty: ( valueProperty: TReadOnlyProperty<number>,
                          visibleProperty: TReadOnlyProperty<boolean>,
                          missingStringProperty: TReadOnlyProperty<string> ): TReadOnlyProperty<string> => {
    return new DerivedProperty( [ valueProperty, visibleProperty, missingStringProperty ],
      ( value, visible, missingString ) => visible ? value.toString() : missingString );
  }
};

numberPairs.register( 'Description', Description );
export default Description;
