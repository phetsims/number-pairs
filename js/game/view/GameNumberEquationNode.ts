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
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import { GAME_DIMENSION } from '../../common/view/NumberBondNode.js';
import NumberEquationNode, { NumberEquationNodeOptions } from '../../common/view/NumberEquationNode.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import Level from '../model/Level.js';

type SelfOptions = EmptySelfOptions;
type GameNumberEquationNodeOptions = StrictOmit<NumberEquationNodeOptions, 'addendsOnRight' | 'totalColorProperty' | 'leftAddendColorProperty' | 'rightAddendColorProperty'>;

export default class GameNumberEquationNode extends NumberEquationNode {
  public constructor( private readonly level: Level, providedOptions?: GameNumberEquationNodeOptions ) {

    const options = optionize<GameNumberEquationNodeOptions, SelfOptions, NumberEquationNodeOptions>()( {
      accessibleHeading: NumberPairsFluent.equationStringProperty,
      missingNumberStringProperty: NumberPairsFluent.a11y.gameScreen.questionMarkStringProperty,
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
        const { stroke, lineDash, lineWidth } = NumberPairsConstants.GAME_FEEDBACK_STYLES[ mode ];

        missingSquare.stroke = stroke;
        missingSquare.lineDash = lineDash;
        missingSquare.lineWidth = lineWidth;
      }
    );
  }

  // Return the node corresponding to the missing component in the challenge prompt, so that it can be highlighted accordingly.
  // public since it is also used by GameLayout.ts for positioning feedback labels.
  public getMissingSquare(): Rectangle {
    const challenge = this.level.challengeProperty.value;
    return challenge.missingComponent === 'a' ? this.leftAddendSquare : challenge.missingComponent === 'b' ? this.rightAddendSquare : this.totalSquare;
  }
}

numberPairs.register( 'GameNumberEquationNode', GameNumberEquationNode );
