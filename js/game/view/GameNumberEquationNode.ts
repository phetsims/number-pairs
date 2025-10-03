// Copyright 2025, University of Colorado Boulder

/**
 * GameNumberEquationNode renders the equation representation for the game screen and manages
 * feedback styling for the missing value based on the level state.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import TNumberPairsModel from '../../common/model/TNumberPairsModel.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberEquationNode from '../../common/view/NumberEquationNode.js';
import numberPairs from '../../numberPairs.js';
import { ChallengeType } from '../model/Level.js';

export default class GameNumberEquationNode extends NumberEquationNode {
  public constructor( model: TNumberPairsModel, levelType: ChallengeType ) {
    super( model, 66, 46.2, 39.6, {
      addendsOnRight: levelType === 'decompositionEquation',
      totalColorProperty: NumberPairsColors.attributeSumColorProperty,
      leftAddendColorProperty: NumberPairsColors.attributeLeftAddendColorProperty,
      rightAddendColorProperty: NumberPairsColors.attributeRightAddendColorProperty,
      visible: levelType === 'decompositionEquation' || levelType === 'sumEquation'
    } );
  }
}

numberPairs.register( 'GameNumberEquationNode', GameNumberEquationNode );