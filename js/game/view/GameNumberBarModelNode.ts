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
import BarModelNode from '../../common/view/BarModelNode.js';
import numberPairs from '../../numberPairs.js';
import Level from '../model/Level.js';
import BarLevelDisplay from './BarLevelDisplay.js';
import NumberStyles from './NumberStyles.js';

export default class GameNumberBarModelNode extends BarModelNode {

  public constructor( level: Level ) {

    const barLevelDisplay = new BarLevelDisplay( level, level.selectedGuessProperty );

    super( barLevelDisplay, {
      displayTotalNumberProperty: level.countingObjectsDelegate.totalProperty,
      displayLeftAddendNumberProperty: level.countingObjectsDelegate.leftAddendProperty,
      displayRightAddendNumberProperty: level.countingObjectsDelegate.rightAddendProperty,
      visibleProperty: derived( NumberPairsPreferences.numberModelTypeProperty, numberModelType => {
        return ( level.type !== 'decompositionEquation' && level.type !== 'sumEquation' ) && numberModelType === NumberModelType.BAR_MODEL;
      } )
    } );

    const stylize = ( rectangle: Rectangle, stroke: string, lineDash: number[], lineWidth: number ) => {
      rectangle.stroke = stroke;
      rectangle.lineDash = lineDash;
      rectangle.lineWidth = lineWidth;
    };

    const setDefaultStyle = ( rectangle: Rectangle ) => stylize( rectangle, 'black', [], 1 );

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
