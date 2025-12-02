// Copyright 2025, University of Colorado Boulder

/**
 * Model for a single level in the Number Pairs game that uses a number line representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import numberPairs from '../../numberPairs.js';
import Challenge from './Challenge.js';
import Level, { ChallengeType, LevelOptions } from './Level.js';
import LevelDefinition from './LevelDefinition.js';

export default class NumberLineLevel extends Level {

  // Model property for whether the tick values are visible as text. There is a checkbox to change this value.
  public readonly tickValuesVisibleProperty: BooleanProperty;

  // Model property for whether the addend values are visible as text. There is a checkbox to change this value.
  public readonly numberLineAddendsVisibleProperty: BooleanProperty;

  public constructor(
    levelDefinition: LevelDefinition,
    type: ChallengeType,
    createChallenge: ( isFirst: boolean ) => Challenge,
    providedOptions: LevelOptions
  ) {
    super( levelDefinition, type, createChallenge, RepresentationType.NUMBER_LINE, providedOptions );

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
