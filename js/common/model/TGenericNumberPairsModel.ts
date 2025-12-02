// Copyright 2025, University of Colorado Boulder

/**
 * The Number Pairs Model is required to have the below defined signature. This is used to comply with the necessary
 * type requirements needed in view components that are used in Preferences that do not need a full NumberPairsModel
 * instance. This is the most generic form of a NumberPairsModel.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Color from '../../../../scenery/js/util/Color.js';

type TGenericNumberPairsModel = {

  // The total value (sum of left and right addends).
  totalProperty: TReadOnlyProperty<number>;

  // The color used to represent the total.
  totalColorProperty: TReadOnlyProperty<Color>;

  // Whether the total is visible in the representation.
  totalVisibleProperty: TReadOnlyProperty<boolean>;

  // The value of the left addend.
  leftAddendProperty: TReadOnlyProperty<number>;

  // The color used to represent the left addend.
  leftAddendColorProperty: TReadOnlyProperty<Color>;

  // Whether the left addend is visible in the representation.
  leftAddendVisibleProperty: TReadOnlyProperty<boolean>;

  // The value of the right addend.
  rightAddendProperty: TReadOnlyProperty<number>;

  // The color used to represent the right addend.
  rightAddendColorProperty: TReadOnlyProperty<Color>;

  // Whether the right addend is visible in the representation.
  rightAddendVisibleProperty: TReadOnlyProperty<boolean>;
};

export default TGenericNumberPairsModel;