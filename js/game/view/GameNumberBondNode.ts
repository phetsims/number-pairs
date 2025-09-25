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

const FEEDBACK_STYLES = {
  idle: { stroke: '#7f7f7f', lineDash: [ 6, 6 ] },
  incorrect: { stroke: 'red', lineDash: [ 6, 6 ] },
  correct: { stroke: 'black', lineDash: [] },
  guessSelected: { stroke: '#7f7f7f', lineDash: [ 6, 6 ] } // TODO: Factor out? See https://github.com/phetsims/number-pairs/issues/213
};

type FeedbackState = keyof typeof FEEDBACK_STYLES;
export type GameNumberBondNodeOptions = NumberBondNodeOptions;

export default class GameNumberBondNode extends NumberBondMutableNode {

  public constructor( level: Level, providedOptions?: GameNumberBondNodeOptions ) {
    super( level, providedOptions );

    const stylize = ( path: Path, stroke: Color | string, lineDash: number[] ) => {
      path.stroke = stroke;
      path.lineDash = lineDash;
    };

    const updateRepresentation = ( feedbackState: FeedbackState, missing: MissingComponent ) => {

      [ this.leftAddend, this.rightAddend, this.total ].forEach( circle => stylize( circle, 'black', [] ) );
      [ this.leftLine, this.rightLine ].forEach( line => stylize( line, 'black', [] ) );

      const missingCircle = missing === 'a' ? this.leftAddend : missing === 'b' ? this.rightAddend : this.total;
      const missingLine = missing === 'a' ? this.leftLine : this.rightLine;

      const { stroke, lineDash } = FEEDBACK_STYLES[ feedbackState ];

      stylize( missingCircle, stroke, lineDash );
      stylize( missingLine, stroke, lineDash );
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
