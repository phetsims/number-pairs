// Copyright 2025, University of Colorado Boulder

/**
 * LevelIcons are icons representing levels, typically shown in a level selection screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ToggleNode from '../../../../sun/js/ToggleNode.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import TGenericNumberPairsModel from '../../common/model/TGenericNumberPairsModel.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import BarModelMutableNode from '../../common/view/BarModelMutableNode.js';
import NumberBondMutableNode from '../../common/view/NumberBondMutableNode.js';
import { GAME_DIMENSION } from '../../common/view/NumberBondNode.js';
import NumberEquationNode from '../../common/view/NumberEquationNode.js';
import NumberLineIcon from '../../common/view/NumberLineIcon.js';
import numberPairs from '../../numberPairs.js';
import NumberStyles from './NumberStyles.js';

export default class LevelIcons {

  private static createModel( total: number, left: number, right: number, leftAddendVisible: boolean, rightAddendVisible: boolean ): TGenericNumberPairsModel {
    return {
      totalProperty: new Property( total ),
      totalColorProperty: NumberPairsColors.levelSelectionIconTotalColorProperty,
      totalVisibleProperty: new Property( true ),
      leftAddendProperty: new Property( left ),
      leftAddendColorProperty: NumberPairsColors.levelSelectionIconLeftAddendColorProperty,
      leftAddendVisibleProperty: new Property( leftAddendVisible ),
      rightAddendProperty: new Property( right ),
      rightAddendColorProperty: NumberPairsColors.levelSelectionIconRightAddendColorProperty,
      rightAddendVisibleProperty: new Property( rightAddendVisible )
    };
  }

  private static getNumberBondIcon( total: number, left: number, right: number ): Node {

    const model = LevelIcons.createModel( total, left, right, true, false );

    const numberBondNode = new NumberBondMutableNode( model, { scale: 0.5 } );
    numberBondNode.leftAddend.children = []; // awkward
    numberBondNode.rightAddend.lineDash = NumberStyles.DASHED_LINE;
    numberBondNode.rightLine.lineDash = NumberStyles.DASHED_LINE;
    return numberBondNode;
  }

  private static getNumberBarIcon( total: number, left: number, right: number ): Node {
    const levelModel = LevelIcons.createModel( total, left, right, true, false );

    const barModelNode = new BarModelMutableNode( levelModel, { scale: 0.55 } );
    barModelNode.leftAddendRectangle.children = []; // awkward

    // Display the known addend value, and keep the unknown addend dashed.
    barModelNode.rightAddendRectangle.lineDash = NumberStyles.DASHED_LINE;

    return barModelNode;
  }

  private static getNumberModelToggleIcon( total: number, left: number, right: number ): Node {
    return new ToggleNode<NumberModelType, Node>( NumberPairsPreferences.numberModelTypeProperty, [
      {
        value: NumberModelType.NUMBER_BOND_MODEL,
        createNode: () => LevelIcons.getNumberBondIcon( total, left, right )
      },
      {
        value: NumberModelType.BAR_MODEL,
        createNode: () => LevelIcons.getNumberBarIcon( total, left, right )
      }
    ], {
      alignChildren: ToggleNode.CENTER
    } );
  }

  private static getNumberEquationIcon( total: number, left: number, right: number, leftAddendVisible: boolean, rightAddendVisible: boolean, addendsOnRight = true ): Node {
    const numberEquationNode = new NumberEquationNode( LevelIcons.createModel( total, left, right, leftAddendVisible, rightAddendVisible ), 66, 46.2, GAME_DIMENSION.fontSize, {
      totalColorProperty: NumberPairsColors.levelSelectionIconTotalColorProperty,
      leftAddendColorProperty: NumberPairsColors.levelSelectionIconLeftAddendColorProperty,
      rightAddendColorProperty: NumberPairsColors.levelSelectionIconRightAddendColorProperty,
      scale: 0.42,
      addendsOnRight: addendsOnRight,

      // Omit description from icons so it doesn't appear in the button, see https://github.com/phetsims/number-pairs/issues/303
      accessibleParagraph: null
    } );
    numberEquationNode.rightAddendSquare.children = []; // awkward
    if ( !leftAddendVisible ) {
      numberEquationNode.leftAddendSquare.lineDash = NumberStyles.DASHED_LINE;
      numberEquationNode.leftAddendSquare.stroke = 'black';
      numberEquationNode.leftAddendSquare.lineWidth = 1.5;
    }
    return numberEquationNode;
  }

  private static getNumberLineIcon(): Node {
    return new NumberLineIcon( 95, 1, {
      showPoint: true,
      showLabels: false,
      trackLineWidth: 2,
      pointFillColor: NumberPairsColors.levelSelectionIconLeftAddendColorProperty,
      isGame: true
    } );
  }

  public static getIcon( levelNumber: number ): Node {
    return levelNumber === 1 ? LevelIcons.getNumberModelToggleIcon( 7, 3, 4 ) :
           levelNumber === 2 ? LevelIcons.getNumberModelToggleIcon( 10, 3, 7 ) :
           levelNumber === 3 ? LevelIcons.getNumberEquationIcon( 10, 3, 7, false, false ) :
           levelNumber === 4 ? LevelIcons.getNumberEquationIcon( 10, 3, 7, false, false, false ) :
           levelNumber === 5 ? LevelIcons.getNumberModelToggleIcon( 15, 3, 12 ) :
           levelNumber === 6 ? LevelIcons.getNumberEquationIcon( 16, 13, 3, false, false ) :
           levelNumber === 7 ? LevelIcons.getNumberEquationIcon( 17, 5, 12, false, false, false ) :
           LevelIcons.getNumberLineIcon();
  }
}

numberPairs.register( 'LevelIcons', LevelIcons );
