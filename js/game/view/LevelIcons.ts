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
import TGenericNumberPairsModel from '../../common/model/TGenericNumberPairsModel.js';
import NumberBondMutableNode from '../../common/view/NumberBondMutableNode.js';
import { GAME_DIMENSION } from '../../common/view/NumberBondNode.js';
import NumberEquationNode from '../../common/view/NumberEquationNode.js';
import numberPairs from '../../numberPairs.js';
import NumberStyles from './NumberStyles.js';

export default class LevelIcons {

  private static createModel( total: number ): TGenericNumberPairsModel {
    return {
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
  }

  private static getNumberBondIcon( total: number ): Node {

    const level1Icon = new NumberBondMutableNode( LevelIcons.createModel( total ), { scale: 0.5 } );
    level1Icon.leftAddend.children = []; // awkward
    level1Icon.rightAddend.lineDash = NumberStyles.DASHED_LINE;
    level1Icon.rightLine.lineDash = NumberStyles.DASHED_LINE;
    return level1Icon;
  }

  private static getNumberEquationIcon( total: number, addendsOnRight = true ): Node {
    const numberEquationNode = new NumberEquationNode( LevelIcons.createModel( total ), 66, 46.2, GAME_DIMENSION.fontSize, {
      totalColorProperty: new Property( new Color( '#9ffda9' ) ),
      leftAddendColorProperty: new Property( new Color( '#fffec7' ) ),
      rightAddendColorProperty: new Property( new Color( '#fffec7' ) ),
      scale: 0.42,
      addendsOnRight: addendsOnRight
    } );
    numberEquationNode.rightAddendSquare.children = []; // awkward
    return numberEquationNode;
  }

  public static getIcon( levelNumber: number ): Node {
    return levelNumber === 1 ? LevelIcons.getNumberBondIcon( 7 ) :
           levelNumber === 2 ? LevelIcons.getNumberBondIcon( 10 ) :
           levelNumber === 3 ? LevelIcons.getNumberEquationIcon( 10 ) :
           levelNumber === 4 ? LevelIcons.getNumberEquationIcon( 10, false ) :
           levelNumber === 5 ? LevelIcons.getNumberBondIcon( 15 ) :
           levelNumber === 6 ? LevelIcons.getNumberEquationIcon( 16 ) :
           levelNumber === 7 ? LevelIcons.getNumberEquationIcon( 17, false ) :
           new Rectangle( 0, 0, 40, 40, { fill: 'blue' } );
  }
}

numberPairs.register( 'LevelIcons', LevelIcons );
