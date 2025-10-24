// Copyright 2025, University of Colorado Boulder

/**
 * Model for a single level in the Number Pairs game that uses a number line representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Color from '../../../../scenery/js/util/Color.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';
import { LevelType } from './GameModel.js';
import InputRange from './InputRange.js';
import Level, { ChallengeType, LevelOptions } from './Level.js';

export default class NumberLineLevel extends Level {
  public readonly showTickNumbersProperty: BooleanProperty;
  public readonly showAddendsProperty: BooleanProperty;

  public constructor(
    levelType: LevelType,
    levelNumber: number, // 1-indexed level number
    color: TReadOnlyProperty<Color>, // Color used for the status bar and level selection button
    description: TReadOnlyProperty<string>, // Appears in the bar at the top of the screen and in the info dialog
    range: InputRange,
    type: ChallengeType,
    createChallenge: ( isFirst: boolean ) => Challenge,
    providedOptions: LevelOptions
  ) {
    super( levelType, levelNumber, color, description, range, type, createChallenge, providedOptions );

    this.showTickNumbersProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'showTickNumbersProperty' ),
      phetioFeatured: true
    } );
    this.showAddendsProperty = new BooleanProperty( true, {
      tandem: providedOptions.tandem.createTandem( 'showAddendsProperty' ),
      phetioFeatured: true
    } );
  }
}

numberPairs.register( 'NumberLineLevel', NumberLineLevel );
