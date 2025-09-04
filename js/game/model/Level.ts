// Copyright 2025, University of Colorado Boulder

/**
 * Model for a single level in the Number Pairs game.
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberPairs from '../../numberPairs.js';

export default class Level {
  public readonly scoreProperty: NumberProperty;
  public readonly isChallengeSolvedProperty: BooleanProperty;
  public readonly attemptsProperty: NumberProperty;

  public constructor( tandem: Tandem ) {
    this.scoreProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'scoreProperty' )
    } );

    this.isChallengeSolvedProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'isChallengeSolvedProperty' )
    } );

    this.attemptsProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'attemptsProperty' )
    } );
  }

  public resetForNewChallenge(): void {
    this.isChallengeSolvedProperty.value = false;
    this.attemptsProperty.value = 0;
  }
}

numberPairs.register( 'Level', Level );