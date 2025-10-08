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
      fill: '#fffec7',
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
    return levelNumber === 1 ? LevelIcons.getNumberBondIcon( 7 ) :
           levelNumber === 2 ? LevelIcons.getNumberBondIcon( 10 ) :
           levelNumber === 3 ? LevelIcons.getNumberEquationIcon( 10 ) :
           levelNumber === 4 ? LevelIcons.getNumberEquationIcon( 10, false ) :
           levelNumber === 5 ? LevelIcons.getNumberBondIcon( 15 ) :
           levelNumber === 6 ? LevelIcons.getNumberEquationIcon( 16 ) :
           levelNumber === 7 ? LevelIcons.getNumberEquationIcon( 17, false ) :
           LevelIcons.getNumberLineIcon();
  }
}

numberPairs.register( 'LevelIcons', LevelIcons );
