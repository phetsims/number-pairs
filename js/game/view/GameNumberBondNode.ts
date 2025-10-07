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

    const stylize = ( path: Path, stroke: Color | string, lineDash: number[], lineWidth: number ) => {
      path.stroke = stroke;
      path.lineDash = lineDash;
      path.lineWidth = lineWidth;
    };

    Multilink.multilink(
      [ level.modeProperty, level.challengeProperty, NumberPairsPreferences.numberModelTypeProperty ],
      ( mode, challenge ) => {

        const missing = challenge.missing;

        [ this.leftAddend, this.rightAddend, this.total ].forEach( circle => stylize( circle, 'black', [], 1 ) );
        [ this.leftLine, this.rightLine ].forEach( line => stylize( line, 'black', [], 1 ) );

        const missingCircle = missing === 'a' ? this.leftAddend : missing === 'b' ? this.rightAddend : this.total;
        const missingLine = missing === 'a' ? this.leftLine : this.rightLine;

        const { stroke, lineDash, lineWidth } = NumberStyles.FEEDBACK_STYLES[ mode ];

        stylize( missingCircle, stroke, lineDash, lineWidth );
        stylize( missingLine, stroke, lineDash, lineWidth );
      }
    );
  }
}

numberPairs.register( 'GameNumberBondNode', GameNumberBondNode );
