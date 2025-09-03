// Copyright 2025, University of Colorado Boulder

/**
 * Model for a single level in the Number Pairs game.
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberPairs from '../../numberPairs.js';

export default class Level {
  public readonly scoreProperty: NumberProperty;

  public constructor( tandem: Tandem ) {
    this.scoreProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'scoreProperty' )
    } );
  }
}

numberPairs.register( 'Level', Level );