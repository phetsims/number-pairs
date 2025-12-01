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
import NumberPairsFluent from '../../../NumberPairsFluent.js';


const Description = {

  /*
  * Returns the missing value string Properties for left, right, and total numbers.
  * Each value should have a custom missing string based on its addend type. In the game screen
  * we want to provide a common missing string for all numbers because only one number will be missing at a time.
  */
  getMissingValueStringProperties: ( isGameScreen: boolean ): {
    leftAddendStringProperty: TReadOnlyProperty<string>;
    rightAddendStringProperty: TReadOnlyProperty<string>;
    totalStringProperty: TReadOnlyProperty<string>;
  } => {
    const gameScreenMissingStringProperty = NumberPairsFluent.a11y.gameScreen.missingValueStringProperty;
    return {
      leftAddendStringProperty: isGameScreen ? gameScreenMissingStringProperty : NumberPairsFluent.a11y.controls.numberModel.leftAddendMissingStringProperty,
      rightAddendStringProperty: isGameScreen ? gameScreenMissingStringProperty : NumberPairsFluent.a11y.controls.numberModel.rightAddendMissingStringProperty,
      totalStringProperty: isGameScreen ? gameScreenMissingStringProperty : NumberPairsFluent.a11y.controls.numberModel.totalMissingStringProperty
    };
  },

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
