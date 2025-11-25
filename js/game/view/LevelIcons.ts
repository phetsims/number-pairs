// Copyright 2025, University of Colorado Boulder

/**
 * LevelIcons are icons representing levels, typically shown in a level selection screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ToggleNode from '../../../../sun/js/ToggleNode.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import TGenericNumberPairsModel from '../../common/model/TGenericNumberPairsModel.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import BarModelIconNode from '../../common/view/BarModelIconNode.js';
import { GAME_ICON_BAR_MODEL_DIMENSIONS } from '../../common/view/BarModelNode.js';
import NumberBondIconNode from '../../common/view/NumberBondIconNode.js';
import { GAME_DIMENSION, GAME_ICON_BOND_DIMENSION } from '../../common/view/NumberBondNode.js';
import NumberEquationNode from '../../common/view/NumberEquationNode.js';
import NumberLineIcon from '../../common/view/NumberLineIcon.js';
import numberPairs from '../../numberPairs.js';

const ICON_LINE_WIDTH = 0.75;
export default class LevelIcons {

  private static createModel( total: number, left: number, right: number, leftAddendVisible: boolean, rightAddendVisible: boolean, totalVisible: boolean ): TGenericNumberPairsModel {
    return {
      totalProperty: new Property( total ),
      totalColorProperty: NumberPairsColors.levelSelectionIconTotalColorProperty,
      totalVisibleProperty: new Property( totalVisible ),
      leftAddendProperty: new Property( left ),
      leftAddendColorProperty: NumberPairsColors.levelSelectionIconLeftAddendColorProperty,
      leftAddendVisibleProperty: new Property( leftAddendVisible ),
      rightAddendProperty: new Property( right ),
      rightAddendColorProperty: NumberPairsColors.levelSelectionIconRightAddendColorProperty,
      rightAddendVisibleProperty: new Property( rightAddendVisible )
    };
  }

  private static getNumberBondIcon( total: number, left: number, right: number ): Node {
    // TODO: left addend should be completely blank https://github.com/phetsims/number-pairs/issues/410
    const model = LevelIcons.createModel( total, left, right, true, false, true );
    return new NumberBondIconNode( model, {
      dimensions: GAME_ICON_BOND_DIMENSION,
      rightAddendCircleOptions: {
        lineDash: NumberPairsConstants.GAME_DASHED_LINE,
        lineWidth: ICON_LINE_WIDTH
      },
      leftAddendCircleOptions: {
        lineWidth: ICON_LINE_WIDTH
      },
      totalCircleOptions: {
        lineWidth: ICON_LINE_WIDTH
      },
      leftLineOptions: {
        lineWidth: ICON_LINE_WIDTH
      },
      rightLineOptions: {
        lineWidth: ICON_LINE_WIDTH,
        lineDash: NumberPairsConstants.GAME_DASHED_LINE
      },
      showQuestionMarks: true
    } );
  }

  private static getNumberBarIcon( total: number, left: number, right: number ): Node {
    const levelModel = LevelIcons.createModel( total, left, right, true, false, true );

    return new BarModelIconNode( levelModel, {
      dimensions: GAME_ICON_BAR_MODEL_DIMENSIONS,
      spacing: GAME_ICON_BAR_MODEL_DIMENSIONS.spacing,
      rightAddendRectangleOptions: {
        lineWidth: ICON_LINE_WIDTH,
        lineDash: NumberPairsConstants.GAME_DASHED_LINE
      },
      showQuestionMarks: true
    } );
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

  private static getNumberEquationIcon( total: number, left: number, right: number, leftAddendVisible: boolean, totalVisible: boolean, addendsOnRight = true ): Node {
    const numberEquationNode = new NumberEquationNode(
      LevelIcons.createModel( total, left, right, leftAddendVisible, false, totalVisible ),
      66, 46.2, GAME_DIMENSION.fontSize,
      {
        totalColorProperty: NumberPairsColors.levelSelectionIconTotalColorProperty,
        leftAddendColorProperty: NumberPairsColors.levelSelectionIconLeftAddendColorProperty,
        rightAddendColorProperty: NumberPairsColors.levelSelectionIconRightAddendColorProperty,
        scale: 0.42,
        addendsOnRight: addendsOnRight,

        // Omit description from icons so it doesn't appear in the button, see https://github.com/phetsims/number-pairs/issues/303
        accessibleParagraph: null
      } );
    numberEquationNode.rightAddendSquare.children = []; // awkward
    const numberEquationSquareNode = !leftAddendVisible ? numberEquationNode.leftAddendSquare :
                                     !totalVisible ? numberEquationNode.totalSquare : null;
    affirm( numberEquationSquareNode, 'One of left addend or total should be invisible' );
    numberEquationSquareNode.lineDash = NumberPairsConstants.GAME_DASHED_LINE;
    numberEquationSquareNode.stroke = 'black';
    numberEquationSquareNode.lineWidth = 1.5;
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
    affirm( Number.isInteger( levelNumber ), 'levelNumber should be an integer' );
    affirm( levelNumber >= 1 && levelNumber <= 8, 'levelNumber should be between 1 and 8, inclusive' );
    return levelNumber === 1 ? LevelIcons.getNumberModelToggleIcon( 7, 3, 4 ) :
           levelNumber === 2 ? LevelIcons.getNumberModelToggleIcon( 10, 3, 7 ) :
           levelNumber === 3 ? LevelIcons.getNumberEquationIcon( 10, 3, 7, false, true ) :
           levelNumber === 4 ? LevelIcons.getNumberEquationIcon( 10, 3, 7, false, true, false ) :
           levelNumber === 5 ? LevelIcons.getNumberModelToggleIcon( 15, 3, 12 ) :
           levelNumber === 6 ? LevelIcons.getNumberEquationIcon( 16, 13, 3, false, true ) :
           levelNumber === 7 ? LevelIcons.getNumberEquationIcon( 17, 11, 6, true, false, false ) :
           LevelIcons.getNumberLineIcon();
  }
}

numberPairs.register( 'LevelIcons', LevelIcons );
