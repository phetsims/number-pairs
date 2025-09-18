// Copyright 2025, University of Colorado Boulder

/**
 * SimpleLevelDisplay is a thin adapter that exposes TGenericNumberPairsModel-compatible
 * read-only properties derived from the Level model and current grid selection.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Color from '../../../../scenery/js/util/Color.js';
import TGenericNumberPairsModel from '../../common/model/TGenericNumberPairsModel.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import numberPairs from '../../numberPairs.js';
import Level from '../model/Level.js';

export default class SimpleLevelDisplay implements TGenericNumberPairsModel {
  public readonly totalProperty: TReadOnlyProperty<number>;
  public readonly totalColorProperty: TReadOnlyProperty<Color> = NumberPairsColors.attributeSumColorProperty;
  public readonly totalVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly leftAddendProperty: TReadOnlyProperty<number>;
  public readonly leftAddendColorProperty: TReadOnlyProperty<Color> = NumberPairsColors.attributeLeftAddendColorProperty;
  public readonly leftAddendVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly rightAddendProperty: TReadOnlyProperty<number>;
  public readonly rightAddendColorProperty: TReadOnlyProperty<Color> = NumberPairsColors.attributeRightAddendColorProperty;
  public readonly rightAddendVisibleProperty: TReadOnlyProperty<boolean>;

  public constructor( level: Level, selectedGuessProperty: TReadOnlyProperty<number | null> ) {

    this.totalProperty = new DerivedProperty( [ level.challengeProperty ], challenge => challenge.y );
    this.totalVisibleProperty = new DerivedProperty( [ level.challengeProperty ], challenge => challenge.missing !== 'y' );

    this.leftAddendProperty = new DerivedProperty( [ level.challengeProperty, selectedGuessProperty ], ( challenge, selectedGuess ) => {
      return challenge.missing === 'a' && selectedGuess !== null ? selectedGuess : challenge.a;
    } );
    this.leftAddendVisibleProperty = new DerivedProperty( [ level.challengeProperty, selectedGuessProperty ], ( challenge, selectedGuess ) => {
      return ( challenge.missing === 'a' && selectedGuess !== null ) || challenge.missing !== 'a';
    } );

    this.rightAddendProperty = new DerivedProperty( [ level.challengeProperty, selectedGuessProperty ], ( challenge, selectedGuess ) => {
      return challenge.missing === 'b' && selectedGuess !== null ? selectedGuess : challenge.b;
    } );
    this.rightAddendVisibleProperty = new DerivedProperty( [ level.challengeProperty, selectedGuessProperty ], ( challenge, selectedGuess ) => {
      return ( challenge.missing === 'b' && selectedGuess !== null ) || challenge.missing !== 'b';
    } );
  }
}

numberPairs.register( 'SimpleLevelDisplay', SimpleLevelDisplay );
