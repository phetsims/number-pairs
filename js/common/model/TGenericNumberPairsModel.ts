// Copyright 2025, University of Colorado Boulder

/**
 * The Number Pairs Model is required to have the below defined signature. This is used to comply with the necessary
 * type requirements needed in view components that are used in Preferences that do not need a full NumberPairsModel
 * instance. This is the most generic form of a NumberPairsModel.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Color from '../../../../scenery/js/util/Color.js';

type TGenericNumberPairsModel = {
  totalProperty: TReadOnlyProperty<number>;
  totalColorProperty: TReadOnlyProperty<Color>;
  totalVisibleProperty: TReadOnlyProperty<boolean>;
  leftAddendProperty: TReadOnlyProperty<number>;
  leftAddendColorProperty: TReadOnlyProperty<Color>;
  leftAddendVisibleProperty: TReadOnlyProperty<boolean>;
  rightAddendProperty: TReadOnlyProperty<number>;
  rightAddendColorProperty: TReadOnlyProperty<Color>;
  rightAddendVisibleProperty: TReadOnlyProperty<boolean>;
};

export default TGenericNumberPairsModel;