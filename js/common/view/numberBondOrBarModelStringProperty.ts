// Copyright 2025, University of Colorado Boulder

/**
 * String which can be passed to fluent to say either "number bond" or "bar model", depending on the current
 * Number Model preference.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import derived from '../../../../axon/js/derived.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import NumberPairsPreferences, { NumberModelType } from '../model/NumberPairsPreferences.js';

export const numberBondOrBarModelStringProperty = derived(
  NumberPairsPreferences.numberModelTypeProperty,
  NumberPairsFluent.numberBondStringProperty,
  NumberPairsFluent.barModelStringProperty,
  numberModelType => numberModelType === NumberModelType.NUMBER_BOND_MODEL ?
                     NumberPairsFluent.numberBondStringProperty.value :
                     NumberPairsFluent.barModelStringProperty.value
);