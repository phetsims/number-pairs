// Copyright 2025, University of Colorado Boulder

/**
 * GameNumberEquationNode renders the equation representation for the game screen and manages
 * feedback styling for the missing value based on the level state.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import { GAME_DIMENSION } from '../../common/view/NumberBondNode.js';
import NumberEquationNode, { NumberEquationNodeOptions } from '../../common/view/NumberEquationNode.js';
import numberPairs from '../../numberPairs.js';
import Level from '../model/Level.js';
import NumberStyles from './NumberStyles.js';

type GameNumberEquationNodeOptions = StrictOmit<NumberEquationNodeOptions, 'addendsOnRight' | 'totalColorProperty' | 'leftAddendColorProperty' | 'rightAddendColorProperty'>;
export default class GameNumberEquationNode extends NumberEquationNode {
  public constructor( private readonly level: Level, providedOptions?: GameNumberEquationNodeOptions ) {
    const options = optionize<GameNumberEquationNodeOptions, EmptySelfOptions, NumberEquationNodeOptions>()( {
      addendsOnRight: level.type === 'decompositionEquation',
      totalColorProperty: NumberPairsColors.attributeSumColorProperty,
      leftAddendColorProperty: NumberPairsColors.attributeLeftAddendColorProperty,
      rightAddendColorProperty: NumberPairsColors.attributeRightAddendColorProperty
    }, providedOptions );
    super( level.countingObjectsDelegate, 66, 46.2, GAME_DIMENSION.fontSize, options );

    const setDefaultStyle = ( square: Rectangle ) => {
      square.stroke = 'black';
      square.lineDash = [];
      square.lineWidth = 1;
    };

    Multilink.multilink(
      [ level.modeProperty, level.challengeProperty ],
      ( mode, challenge ) => {
        [ this.leftAddendSquare, this.rightAddendSquare, this.totalSquare ].forEach( setDefaultStyle );

        const missingSquare = this.getMissingSquare();
        const { stroke, lineDash, lineWidth } = NumberStyles.FEEDBACK_STYLES[ mode ];

        missingSquare.stroke = stroke;
        missingSquare.lineDash = lineDash;
        missingSquare.lineWidth = lineWidth;
      }
    );

    this.accessibleParagraph = null;
  }

  public getMissingSquare(): Rectangle {
    const challenge = this.level.challengeProperty.value;
    return challenge.missing === 'a' ? this.leftAddendSquare : challenge.missing === 'b' ? this.rightAddendSquare : this.totalSquare;
  }
}

numberPairs.register( 'GameNumberEquationNode', GameNumberEquationNode );
