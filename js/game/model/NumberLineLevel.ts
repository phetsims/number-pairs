// Copyright 2025, University of Colorado Boulder

/**
 * Model for a single level in the Number Pairs game that uses a number line representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';
import InputRange from './InputRange.js';
import Level, { ChallengeType, LevelOptions } from './Level.js';

export default class NumberLineLevel extends Level {
  public readonly showTickNumbersProperty: BooleanProperty;
  public readonly showAddendsProperty: BooleanProperty;

  public constructor(
    levelNumber: number, // 1-indexed level number
    color: string, // Color used for the status bar and level selection button
    description: string, // Appears in the bar at the top of the screen
    range: InputRange,
    type: ChallengeType,
    createChallenge: ( isFirst: boolean ) => Challenge,
    providedOptions: LevelOptions
  ) {
    super( levelNumber, color, description, range, type, createChallenge, providedOptions );

    this.showTickNumbersProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'showTickNumbersProperty' ),
      phetioFeatured: true
    } );
    this.showAddendsProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'showAddendsProperty' ),
      phetioFeatured: true
    } );
  }
}

numberPairs.register( 'NumberLineLevel', NumberLineLevel );