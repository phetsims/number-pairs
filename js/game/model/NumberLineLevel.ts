// Copyright 2025, University of Colorado Boulder

/**
 * Model for a single level in the Number Pairs game that uses a number line representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import FluentPattern, { type FluentVariable } from '../../../../chipper/js/browser/FluentPattern.js';
import Color from '../../../../scenery/js/util/Color.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';
import InputRange from './InputRange.js';
import Level, { ChallengeType, LevelOptions } from './Level.js';

export default class NumberLineLevel extends Level {
  public readonly tickValuesVisibleProperty: BooleanProperty;
  public readonly numberLineAddendsVisibleProperty: BooleanProperty;

  public constructor(
    levelNumber: number, // 1-indexed level number
    color: TReadOnlyProperty<Color>, // Color used for the status bar and level selection button
    description: TReadOnlyProperty<string>, // Appears in the bar at the top of the screen and in the info dialog
    accessibleHelpText: TReadOnlyProperty<string>,
    accessibleChallengePromptPattern: FluentPattern<{ leftAddend: FluentVariable; rightAddend: FluentVariable; total: FluentVariable }>,
    range: InputRange,
    type: ChallengeType,
    createChallenge: ( isFirst: boolean ) => Challenge,
    providedOptions: LevelOptions
  ) {
    super( levelNumber, color, description, accessibleHelpText, accessibleChallengePromptPattern, range, type, createChallenge, providedOptions );

    this.tickValuesVisibleProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'tickValuesVisibleProperty' ),
      phetioFeatured: true
    } );
    this.numberLineAddendsVisibleProperty = new BooleanProperty( true, {
      tandem: providedOptions.tandem.createTandem( 'numberLineAddendsVisibleProperty' ),
      phetioFeatured: true
    } );
  }
}

numberPairs.register( 'NumberLineLevel', NumberLineLevel );
