// Copyright 2025, University of Colorado Boulder

/**
 * GameNumberBarModelNode renders the bar model representation for the game screen and manages
 * feedback styling for the missing value based on the level state.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Color from '../../../../scenery/js/util/Color.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import BarModelMutableNode, { BarModelMutableNodeOptions } from '../../common/view/BarModelMutableNode.js';
import { GAME_BAR_MODEL_DIMENSIONS } from '../../common/view/BarModelNode.js';
import numberPairs from '../../numberPairs.js';
import Level from '../model/Level.js';
import BarLevelDisplay from './BarLevelDisplay.js';
import NumberStyles from './NumberStyles.js';

type GameNumberBarModelNodeOptions = StrictOmit<BarModelMutableNodeOptions, 'dimensions' | 'displayTotalNumberProperty' | 'displayLeftAddendNumberProperty' | 'displayRightAddendNumberProperty'>;
export default class GameNumberBarModelNode extends BarModelMutableNode {

  public constructor( level: Level, providedOptions?: GameNumberBarModelNodeOptions ) {
    const options = optionize<GameNumberBarModelNodeOptions, EmptySelfOptions, BarModelMutableNodeOptions>()( {
      dimensions: GAME_BAR_MODEL_DIMENSIONS,
      displayTotalNumberProperty: level.countingObjectsDelegate.totalProperty,
      displayLeftAddendNumberProperty: level.countingObjectsDelegate.leftAddendProperty,
      displayRightAddendNumberProperty: level.countingObjectsDelegate.rightAddendProperty
    }, providedOptions );
    const barLevelDisplay = new BarLevelDisplay( level, level.selectedGuessProperty );

    super( barLevelDisplay, options );

    this.totalRectangle.lineWidth = NumberPairsConstants.GAME_LINE_WIDTH;
    this.leftAddendRectangle.lineWidth = NumberPairsConstants.GAME_LINE_WIDTH;
    this.rightAddendRectangle.lineWidth = NumberPairsConstants.GAME_LINE_WIDTH;

    const stylize = ( rectangle: Rectangle, stroke: TColor, lineDash: number[], lineWidth = 1 ) => {
      rectangle.stroke = stroke;
      rectangle.lineDash = lineDash;
      rectangle.lineWidth = lineWidth;
    };

    const setDefaultStyle = ( rectangle: Rectangle ) => stylize( rectangle, Color.BLACK, [] );

    Multilink.multilink( [ level.modeProperty, level.challengeProperty ], ( mode, challenge ) => {
      [ this.totalRectangle, this.leftAddendRectangle, this.rightAddendRectangle ].forEach( setDefaultStyle );

      const missingRectangle = challenge.missing === 'a' ? this.leftAddendRectangle :
                               challenge.missing === 'b' ? this.rightAddendRectangle :
                               this.totalRectangle;

      const { stroke, lineDash, lineWidth } = NumberStyles.FEEDBACK_STYLES[ mode ];

      stylize( missingRectangle, stroke, lineDash, lineWidth );
    } );
  }
}

numberPairs.register( 'GameNumberBarModelNode', GameNumberBarModelNode );
