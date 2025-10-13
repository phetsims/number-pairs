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
import NumberBondMutableNode, { NumberBondMutableNodeOptions } from '../../common/view/NumberBondMutableNode.js';
import { GAME_DIMENSION } from '../../common/view/NumberBondNode.js';
import numberPairs from '../../numberPairs.js';
import Level from '../model/Level.js';
import GameConstants from './GameConstants.js';
import NumberStyles from './NumberStyles.js';

export type GameNumberBondNodeOptions = NumberBondMutableNodeOptions;

export default class GameNumberBondNode extends NumberBondMutableNode {

  public constructor( level: Level, providedOptions?: GameNumberBondNodeOptions ) {
    const options: GameNumberBondNodeOptions = {
      dimensions: GAME_DIMENSION
    };
    if ( providedOptions ) {
      Object.assign( options, providedOptions );
    }

    super( level.countingObjectsDelegate, options );

    this.total.lineWidth = GameConstants.LINE_WIDTH;
    this.leftAddend.lineWidth = GameConstants.LINE_WIDTH;
    this.rightAddend.lineWidth = GameConstants.LINE_WIDTH;
    this.leftLine.lineWidth = GameConstants.LINE_WIDTH;
    this.rightLine.lineWidth = GameConstants.LINE_WIDTH;

    const stylize = ( path: Path, stroke: Color | string, lineDash: number[] ) => {
      path.stroke = stroke;
      path.lineDash = lineDash;
    };

    Multilink.multilink(
      [ level.modeProperty, level.challengeProperty, NumberPairsPreferences.numberModelTypeProperty ],
      ( mode, challenge ) => {

        const missing = challenge.missing;

        [ this.leftAddend, this.rightAddend, this.total ].forEach( circle => stylize( circle, 'black', [] ) );
        [ this.leftLine, this.rightLine ].forEach( line => stylize( line, 'black', [] ) );

        const missingCircle = missing === 'a' ? this.leftAddend : missing === 'b' ? this.rightAddend : this.total;
        const missingLine = missing === 'a' ? this.leftLine : this.rightLine;

        const { stroke, lineDash } = NumberStyles.FEEDBACK_STYLES[ mode ];

        stylize( missingCircle, stroke, lineDash );
        stylize( missingLine, stroke, lineDash );
      }
    );
  }
}

numberPairs.register( 'GameNumberBondNode', GameNumberBondNode );
