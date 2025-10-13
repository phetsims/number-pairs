// Copyright 2025, University of Colorado Boulder

/**
 * GameNumberBarModelNode renders the bar model representation for the game screen and manages
 * feedback styling for the missing value based on the level state.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import derived from '../../../../axon/js/derived.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import BarModelMutableNode from '../../common/view/BarModelMutableNode.js';
import { GAME_BAR_MODEL_DIMENSIONS } from '../../common/view/BarModelNode.js';
import numberPairs from '../../numberPairs.js';
import Level from '../model/Level.js';
import BarLevelDisplay from './BarLevelDisplay.js';
import GameConstants from './GameConstants.js';
import NumberStyles from './NumberStyles.js';

export default class GameNumberBarModelNode extends BarModelMutableNode {

  public constructor( level: Level ) {

    const barLevelDisplay = new BarLevelDisplay( level, level.selectedGuessProperty );

    super( barLevelDisplay, {
      dimensions: GAME_BAR_MODEL_DIMENSIONS,
      displayTotalNumberProperty: level.countingObjectsDelegate.totalProperty,
      displayLeftAddendNumberProperty: level.countingObjectsDelegate.leftAddendProperty,
      displayRightAddendNumberProperty: level.countingObjectsDelegate.rightAddendProperty,
      visibleProperty: derived( NumberPairsPreferences.numberModelTypeProperty, numberModelType => {
        return ( level.type !== 'decompositionEquation' && level.type !== 'sumEquation' ) && numberModelType === NumberModelType.BAR_MODEL;
      } )
    } );

    this.totalRectangle.lineWidth = GameConstants.LINE_WIDTH;
    this.leftAddendRectangle.lineWidth = GameConstants.LINE_WIDTH;
    this.rightAddendRectangle.lineWidth = GameConstants.LINE_WIDTH;

    const stylize = ( rectangle: Rectangle, stroke: string, lineDash: number[] ) => {
      rectangle.stroke = stroke;
      rectangle.lineDash = lineDash;
    };

    const setDefaultStyle = ( rectangle: Rectangle ) => stylize( rectangle, 'black', [] );

    Multilink.multilink( [ level.modeProperty, level.challengeProperty ], ( mode, challenge ) => {
      [ this.totalRectangle, this.leftAddendRectangle, this.rightAddendRectangle ].forEach( setDefaultStyle );

      const missingRectangle = challenge.missing === 'a' ? this.leftAddendRectangle :
                               challenge.missing === 'b' ? this.rightAddendRectangle :
                               this.totalRectangle;

      const { stroke, lineDash } = NumberStyles.FEEDBACK_STYLES[ mode ];

      stylize( missingRectangle, stroke, lineDash );
    } );
  }
}

numberPairs.register( 'GameNumberBarModelNode', GameNumberBarModelNode );
