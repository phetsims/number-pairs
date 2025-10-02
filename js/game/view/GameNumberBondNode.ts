// Copyright 2025, University of Colorado Boulder

/**
 * GameNumberBondNode renders the number bond representation for the game screen and manages
 * feedback styling for the missing value based on the level state.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Color from '../../../../scenery/js/util/Color.js';
import NumberPairsPreferences from '../../common/model/NumberPairsPreferences.js';
import NumberBondMutableNode from '../../common/view/NumberBondMutableNode.js';
import { NumberBondNodeOptions } from '../../common/view/NumberBondNode.js';
import numberPairs from '../../numberPairs.js';
import type { MissingComponent } from '../model/Challenge.js';
import Level from '../model/Level.js';

const DASHED_LINE = [ 6, 6 ];
const DASHED_LINE_WIDTH = 2.5;
const GRAY = '#7f7f7f';

const FEEDBACK_STYLES = {
  idle: { stroke: GRAY, lineDash: DASHED_LINE, lineWidth: DASHED_LINE_WIDTH },
  incorrect: { stroke: 'red', lineDash: DASHED_LINE, lineWidth: DASHED_LINE_WIDTH },
  correct: { stroke: 'black', lineDash: [], lineWidth: 1 },
  guessSelected: { stroke: GRAY, lineDash: DASHED_LINE, lineWidth: DASHED_LINE_WIDTH }
};

type FeedbackState = keyof typeof FEEDBACK_STYLES;
export type GameNumberBondNodeOptions = NumberBondNodeOptions;

export default class GameNumberBondNode extends NumberBondMutableNode {

  public constructor( level: Level, providedOptions?: GameNumberBondNodeOptions ) {
    super( level, providedOptions );

    const stylize = ( path: Path, stroke: Color | string, lineDash: number[], lineWidth: number ) => {
      path.stroke = stroke;
      path.lineDash = lineDash;
      path.lineWidth = lineWidth;
    };

    const updateRepresentation = ( feedbackState: FeedbackState, missing: MissingComponent ) => {

      [ this.leftAddend, this.rightAddend, this.total ].forEach( circle => stylize( circle, 'black', [], 1 ) );
      [ this.leftLine, this.rightLine ].forEach( line => stylize( line, 'black', [], 1 ) );

      const missingCircle = missing === 'a' ? this.leftAddend : missing === 'b' ? this.rightAddend : this.total;
      const missingLine = missing === 'a' ? this.leftLine : this.rightLine;

      const { stroke, lineDash, lineWidth } = FEEDBACK_STYLES[ feedbackState ];

      stylize( missingCircle, stroke, lineDash, lineWidth );
      stylize( missingLine, stroke, lineDash, lineWidth );
    };

    Multilink.multilink(
      [ level.modeProperty, level.challengeProperty, NumberPairsPreferences.numberModelTypeProperty ],
      ( feedbackState, challenge ) => {
        updateRepresentation( feedbackState, challenge.missing );

      }
    );
  }
}

numberPairs.register( 'GameNumberBondNode', GameNumberBondNode );
