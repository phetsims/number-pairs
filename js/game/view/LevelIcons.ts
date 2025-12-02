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
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import BarModelIconNode from '../../common/view/BarModelIconNode.js';
import { GAME_ICON_BAR_MODEL_DIMENSIONS } from '../../common/view/BarModelNode.js';
import { IconModel } from '../../common/view/IconHelper.js';
import NumberBondIconNode from '../../common/view/NumberBondIconNode.js';
import { GAME_ICON_BOND_DIMENSION } from '../../common/view/NumberBondNode.js';
import NumberEquationIconNode from '../../common/view/NumberEquationIconNode.js';
import NumberLineIcon from '../../common/view/NumberLineIcon.js';
import numberPairs from '../../numberPairs.js';

export default class LevelIcons {

  /**
   *  Creates a synthetic model than can be used to satisfy the interface for number model type icons.
   */
  private static createModel(
    total: number | null, left: number | null, right: number | null,
    leftAddendVisible: boolean, rightAddendVisible: boolean, totalVisible: boolean
  ): IconModel {
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

  private static getNumberBondIcon( total: number ): Node {
    const model = LevelIcons.createModel( total, null, null, false, true, true );
    return new NumberBondIconNode( model, {
      dimensions: GAME_ICON_BOND_DIMENSION,
      rightAddendCircleOptions: {
        lineDash: NumberPairsConstants.GAME_ICON_DASHED_LINE,
        lineWidth: GAME_ICON_BOND_DIMENSION.lineWidth
      },
      leftAddendCircleOptions: {
        lineWidth: GAME_ICON_BOND_DIMENSION.lineWidth
      },
      totalCircleOptions: {
        lineWidth: GAME_ICON_BOND_DIMENSION.lineWidth
      },
      leftLineOptions: {
        lineWidth: GAME_ICON_BOND_DIMENSION.lineWidth
      },
      rightLineOptions: {
        lineWidth: GAME_ICON_BOND_DIMENSION.lineWidth,
        lineDash: NumberPairsConstants.GAME_ICON_DASHED_LINE
      }
    } );
  }

  private static getNumberBarIcon( total: number, left: number ): Node {
    const levelModel = LevelIcons.createModel( total, left, null, false, true, true );

    return new BarModelIconNode( levelModel, {
      dimensions: GAME_ICON_BAR_MODEL_DIMENSIONS,
      spacing: GAME_ICON_BAR_MODEL_DIMENSIONS.spacing,
      rightAddendRectangleOptions: {
        lineWidth: GAME_ICON_BAR_MODEL_DIMENSIONS.lineWidth,
        lineDash: NumberPairsConstants.GAME_ICON_DASHED_LINE
      }
    } );
  }

  private static getNumberModelToggleIcon( total: number, left: number ): Node {
    return new ToggleNode<NumberModelType, Node>( NumberPairsPreferences.numberModelTypeProperty, [
      {
        value: NumberModelType.NUMBER_BOND_MODEL,
        createNode: () => LevelIcons.getNumberBondIcon( total )
      },
      {
        value: NumberModelType.BAR_MODEL,
        createNode: () => LevelIcons.getNumberBarIcon( total, left )
      }
    ], {
      alignChildren: ToggleNode.CENTER
    } );
  }

  private static getNumberEquationIcon( total: number | null, left: number | null, right: number, addendsOnRight = true ): Node {
    const leftAddendRectangleOptions = left === null ? {
      lineDash: NumberPairsConstants.GAME_ICON_DASHED_LINE,
      stroke: 'black'
    } : {};
    const totalRectangleOptions = total === null ? {
      lineDash: NumberPairsConstants.GAME_ICON_DASHED_LINE,
      stroke: 'black'
    } : {};
    return new NumberEquationIconNode(
      LevelIcons.createModel( total, left, right, true, false, true ),
      {
        addendsOnRight: addendsOnRight,
        leftAddendRectangleOptions: leftAddendRectangleOptions,
        totalRectangleOptions: totalRectangleOptions
      } );
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
    return levelNumber === 1 ? LevelIcons.getNumberModelToggleIcon( 7, 3 ) :
           levelNumber === 2 ? LevelIcons.getNumberModelToggleIcon( 10, 3 ) :
           levelNumber === 3 ? LevelIcons.getNumberEquationIcon( 10, null, 7 ) :
           levelNumber === 4 ? LevelIcons.getNumberEquationIcon( 10, null, 7, false ) :
           levelNumber === 5 ? LevelIcons.getNumberModelToggleIcon( 15, 3 ) :
           levelNumber === 6 ? LevelIcons.getNumberEquationIcon( 16, null, 3 ) :
           levelNumber === 7 ? LevelIcons.getNumberEquationIcon( null, 11, 6, false ) :
           LevelIcons.getNumberLineIcon();
  }
}

numberPairs.register( 'LevelIcons', LevelIcons );
