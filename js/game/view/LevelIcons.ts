// Copyright 2025, University of Colorado Boulder

/**
 * LevelIcons are icons representing levels, typically shown in a level selection screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Color from '../../../../scenery/js/util/Color.js';
import NumberBondMutableNode from '../../common/view/NumberBondMutableNode.js';
import numberPairs from '../../numberPairs.js';
import NumberStyles from './NumberStyles.js';

export default class LevelIcons {

  private static getNumberBondIcon( total: number ): Node {
    const model = {
      totalProperty: new Property( total ),
      totalColorProperty: new Property( new Color( '#9ffda9' ) ),
      totalVisibleProperty: new Property( true ),
      leftAddendProperty: new Property( 3 ),
      leftAddendColorProperty: new Property( new Color( '#fffec7' ) ),
      leftAddendVisibleProperty: new Property( false ),
      rightAddendProperty: new Property( 4 ),
      rightAddendColorProperty: new Property( new Color( '#fffec7' ) ),
      rightAddendVisibleProperty: new Property( false )
    };
    const level1Icon = new NumberBondMutableNode( model, { scale: 0.5 } );
    level1Icon.leftAddend.children = []; // awkward
    level1Icon.rightAddend.lineDash = NumberStyles.DASHED_LINE;
    level1Icon.rightLine.lineDash = NumberStyles.DASHED_LINE;
    return level1Icon;
  }

  public static getIcon( levelNumber: number ): Node {
    if ( levelNumber === 1 ) {
      return LevelIcons.getNumberBondIcon( 7 );
    }
    else if ( levelNumber === 2 ) {
      return LevelIcons.getNumberBondIcon( 10 );
    }
    else if ( levelNumber === 5 ) {
      return LevelIcons.getNumberBondIcon( 15 );
    }

    return new Rectangle( 0, 0, 40, 40, { fill: 'blue' } );
  }
}

numberPairs.register( 'LevelIcons', LevelIcons );