// Copyright 2025, University of Colorado Boulder

/**
 * GameNumberBondNode renders the number bond representation for the game screen and manages
 * feedback styling for the missing value based on the level state.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import NumberPairsPreferences from '../../common/model/NumberPairsPreferences.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import NumberBondMutableNode, { NumberBondMutableNodeOptions } from '../../common/view/NumberBondMutableNode.js';
import { GAME_DIMENSION } from '../../common/view/NumberBondNode.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import Level from '../model/Level.js';

type SelfOptions = EmptySelfOptions;
export type GameNumberBondNodeOptions = NumberBondMutableNodeOptions;

export default class GameNumberBondNode extends NumberBondMutableNode {

  public constructor( level: Level, providedOptions?: GameNumberBondNodeOptions ) {

    const options = optionize<GameNumberBondNodeOptions, SelfOptions, NumberBondMutableNodeOptions>()( {
      dimensions: GAME_DIMENSION,
      accessibleHeading: NumberPairsFluent.numberBondStringProperty,
      isGameScreen: true,
      leftLineOptions: {
        lineWidth: NumberPairsConstants.GAME_LINE_WIDTH
      },
      rightLineOptions: {
        lineWidth: NumberPairsConstants.GAME_LINE_WIDTH
      }
    }, providedOptions );

    super( level.countingObjectsDelegate, options );

    //REVIEW It seems like these should be options in the NumberBondMutableNode API.
    this.total.lineWidth = NumberPairsConstants.GAME_LINE_WIDTH;
    this.leftAddend.lineWidth = NumberPairsConstants.GAME_LINE_WIDTH;
    this.rightAddend.lineWidth = NumberPairsConstants.GAME_LINE_WIDTH;

    const stylize = ( path: Path, stroke: TColor, lineDash: number[], lineWidth = 1 ) => {
      path.stroke = stroke;
      path.lineDash = lineDash;
      path.lineWidth = lineWidth;
    };

    Multilink.multilink(
      [ level.modeProperty, level.challengeProperty, NumberPairsPreferences.numberModelTypeProperty ],
      ( mode, challenge ) => {

        const missing = challenge.missingComponent;

        [ this.leftAddend, this.rightAddend, this.total ].forEach( circle => stylize( circle, 'black', [] ) );
        [ this.leftLine, this.rightLine ].forEach( line => stylize( line, 'black', [] ) );

        const missingCircle = missing === 'a' ? this.leftAddend : missing === 'b' ? this.rightAddend : this.total;
        const missingLine = missing === 'a' ? this.leftLine : this.rightLine;

        const { stroke, lineDash, lineWidth } = NumberPairsConstants.GAME_FEEDBACK_STYLES[ mode ];

        stylize( missingCircle, stroke, lineDash, lineWidth );
        stylize( missingLine, stroke, lineDash, lineWidth );
      }
    );
  }
}

numberPairs.register( 'GameNumberBondNode', GameNumberBondNode );
