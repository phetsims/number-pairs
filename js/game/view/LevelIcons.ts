// Copyright 2025, University of Colorado Boulder

/**
 * LevelIcons are icons representing levels, typically shown in a level selection screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ToggleNode from '../../../../sun/js/ToggleNode.js';
import TGenericNumberPairsModel from '../../common/model/TGenericNumberPairsModel.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import BarModelMutableNode from '../../common/view/BarModelMutableNode.js';
import NumberBondMutableNode from '../../common/view/NumberBondMutableNode.js';
import { GAME_DIMENSION } from '../../common/view/NumberBondNode.js';
import NumberEquationNode from '../../common/view/NumberEquationNode.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
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
      addendsOnRight: addendsOnRight
    } );
    numberEquationNode.rightAddendSquare.children = []; // awkward
    return numberEquationNode;
  }

  private static getNumberLineIcon(): Node {
    const numberLineLength = 95;
    const numberLine = new Line( 0, 0, numberLineLength, 0, {
      stroke: 'black',
      lineWidth: 2
    } );
    const majorTickExtent = 16;
    const minorTickExtent = 11;
    const leftEdge = new Line( 0, -majorTickExtent, 0, majorTickExtent, {
      stroke: 'black',
      lineWidth: 2
    } );
    const rightEdge = new Line( numberLineLength, -majorTickExtent, numberLineLength, majorTickExtent, {
      stroke: 'black',
      lineWidth: 2
    } );

    const leftMidEdge = new Line( numberLineLength / 3, -minorTickExtent, numberLineLength / 3, minorTickExtent, {
      stroke: 'black',
      lineWidth: 2
    } );

    const rightMidEdge = new Line( 2 * numberLineLength / 3, -minorTickExtent, 2 * numberLineLength / 3, minorTickExtent, {
      stroke: 'black',
      lineWidth: 2
    } );

    const circleRadius = 8;
    const circleCenterX = numberLineLength / 3;
    const circle = new Circle( circleRadius, {
      fill: NumberPairsColors.levelSelectionIconLeftAddendColorProperty,
      stroke: 'black',
      lineWidth: 1,
      center: new Vector2( circleCenterX, 0 )
    } );

    const arrowControlYOffset = 24 * 1.2;
    const arrowHeadLength = 12;
    const arrowHeadWidth = 10;
    const arrowControlPoint = new Vector2( ( circleCenterX + numberLineLength ) / 2, -arrowControlYOffset );
    const arrowTip = new Vector2( numberLineLength, 0 );
    const tailShape = new Shape()
      .moveTo( circleCenterX, 0 )
      .quadraticCurveTo( arrowControlPoint.x, arrowControlPoint.y, arrowTip.x, arrowTip.y );
    const arrowTail = new Path( tailShape, {
      stroke: 'black',
      lineWidth: 2,
      lineCap: 'round'
    } );

    const tailDerivative = arrowTip.minus( arrowControlPoint ).timesScalar( 2 );
    const tangentDirection = tailDerivative.normalized();
    const arrowHeadBaseCenter = arrowTip.minus( tangentDirection.timesScalar( arrowHeadLength ) );
    const perpendicular = new Vector2( -tangentDirection.y, tangentDirection.x ).normalized().timesScalar( arrowHeadWidth / 2 );
    const arrowHeadBasePoint1 = arrowHeadBaseCenter.plus( perpendicular );
    const arrowHeadBasePoint2 = arrowHeadBaseCenter.minus( perpendicular );
    const arrowHeadShape = new Shape()
      .moveTo( arrowTip.x, arrowTip.y )
      .lineTo( arrowHeadBasePoint1.x, arrowHeadBasePoint1.y )
      .lineTo( arrowHeadBasePoint2.x, arrowHeadBasePoint2.y )
      .close();
    const arrowHead = new Path( arrowHeadShape, {
      fill: 'black'
    } );

    const questionMark = '?';
    const text = new Text( questionMark, {
      font: new PhetFont( {
        size: 16,
        weight: 'bold'
      } )
    } );

    const node = new Node( {
      children: [ numberLine, leftEdge, rightEdge, leftMidEdge, rightMidEdge, arrowTail, arrowHead, circle, text ]
    } );

    // Update positioning of the question mark, since it is i18nized
    ManualConstraint.create( node, [ text ], textProxy => {
      textProxy.bottom = leftEdge.top - 5;
      textProxy.centerX = rightMidEdge.centerX;
    } );
    return node;
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
