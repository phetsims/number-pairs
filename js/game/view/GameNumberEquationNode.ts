// Copyright 2025, University of Colorado Boulder

/**
 * GameNumberEquationNode renders the equation representation for the game screen and manages
 * feedback styling for the missing value based on the level state.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberEquationNode from '../../common/view/NumberEquationNode.js';
import numberPairs from '../../numberPairs.js';
import Level from '../model/Level.js';
import NumberStyles from './NumberStyles.js';

export default class GameNumberEquationNode extends NumberEquationNode {
  public constructor( level: Level ) {
    super( level.countingObjectsDelegate, 66, 46.2, 39.6, {
      addendsOnRight: level.type === 'decompositionEquation',
      totalColorProperty: NumberPairsColors.attributeSumColorProperty,
      leftAddendColorProperty: NumberPairsColors.attributeLeftAddendColorProperty,
      rightAddendColorProperty: NumberPairsColors.attributeRightAddendColorProperty,
      visible: level.type === 'decompositionEquation' || level.type === 'sumEquation'
    } );

    const setDefaultStyle = ( square: Rectangle ) => {
      square.stroke = 'black';
      square.lineDash = [];
      square.lineWidth = 1;
    };

    Multilink.multilink(
      [ level.modeProperty, level.challengeProperty ],
      ( mode, challenge ) => {
        [ this.leftAddendSquare, this.rightAddendSquare, this.totalSquare ].forEach( setDefaultStyle );

        const missingSquare = challenge.missing === 'a' ? this.leftAddendSquare : challenge.missing === 'b' ? this.rightAddendSquare : this.totalSquare;
        const { stroke, lineDash, lineWidth } = NumberStyles.FEEDBACK_STYLES[ mode ];

        missingSquare.stroke = stroke;
        missingSquare.lineDash = lineDash;
        missingSquare.lineWidth = lineWidth;
      }
    );
  }
}

numberPairs.register( 'GameNumberEquationNode', GameNumberEquationNode );
