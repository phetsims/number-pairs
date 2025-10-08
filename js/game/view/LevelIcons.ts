// Copyright 2025, University of Colorado Boulder

/**
 * LevelIcons are icons representing levels, typically shown in a level selection screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
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
    const NUMBER_LINE_LENGTH = 95;
    const numberLine = new Line( 0, 0, NUMBER_LINE_LENGTH, 0, {
      stroke: 'black',
      lineWidth: 2
    } );
    const majorTickExtent = 16;
    const minorTickExtent = 11;
    const leftEdge = new Line( 0, -majorTickExtent, 0, majorTickExtent, {
      stroke: 'black',
      lineWidth: 2
    } );
    const rightEdge = new Line( NUMBER_LINE_LENGTH, -majorTickExtent, NUMBER_LINE_LENGTH, majorTickExtent, {
      stroke: 'black',
      lineWidth: 2
    } );

    const leftMidEdge = new Line( NUMBER_LINE_LENGTH / 3, -minorTickExtent, NUMBER_LINE_LENGTH / 3, minorTickExtent, {
      stroke: 'black',
      lineWidth: 2
    } );

    const rightMidEdge = new Line( 2 * NUMBER_LINE_LENGTH / 3, -minorTickExtent, 2 * NUMBER_LINE_LENGTH / 3, minorTickExtent, {
      stroke: 'black',
      lineWidth: 2
    } );

    const circleRadius = 8;
    const circleCenterX = NUMBER_LINE_LENGTH / 3;
    const circle = new Circle( circleRadius, {
      fill: '#fffec7',
      stroke: 'black',
      lineWidth: 1,
      center: new Vector2( circleCenterX, 0 )
    } );

    const arrowHeadLength = 12;
    const arrowControlYOffset = 40;
    const tailShape = new Shape()
      .moveTo( circleCenterX, 0 )
      .quadraticCurveTo( ( circleCenterX + NUMBER_LINE_LENGTH ) / 2, -arrowControlYOffset, NUMBER_LINE_LENGTH, 0 );
    const arrowTail = new Path( tailShape, {
      stroke: 'black',
      lineWidth: 2,
      lineCap: 'round'
    } );

    const arrowHeadWidth = 10;
    const arrowHeadShape = new Shape()
      .moveTo( NUMBER_LINE_LENGTH, 0 )
      .lineTo( NUMBER_LINE_LENGTH - arrowHeadLength, arrowHeadWidth / 2 )
      .lineTo( NUMBER_LINE_LENGTH - arrowHeadLength, -arrowHeadWidth / 2 )
      .close();
    const arrowHead = new Path( arrowHeadShape, {
      fill: 'black'
    } );

    return new Node( {
      children: [ numberLine, leftEdge, rightEdge, leftMidEdge, rightMidEdge, arrowTail, arrowHead, circle ]
    } );
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
