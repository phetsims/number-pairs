// Copyright 2024-2025, University of Colorado Boulder
/**
 * Creates the handle that the user can drag to change the value of the left addend.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsColors from '../NumberPairsColors.js';
import NumberLineNode from './NumberLineNode.js';

const HANDLE_LINE_LENGTH = 34;

export default class ThumbNode extends Node {
  public constructor( tandem: Tandem ) {

    const trackPoint = new Circle( NumberLineNode.POINT_RADIUS, {
      fill: NumberPairsColors.numberLineLeftAddendColorProperty,
      stroke: 'black'
    } );
    const handleLine = new Line( 0, 0, 0, HANDLE_LINE_LENGTH, {
      stroke: 'black',
      top: trackPoint.bottom
    } );
    const handleKnob = new ShadedSphereNode( NumberLineNode.POINT_RADIUS * 3, {
      highlightColor: NumberPairsColors.numberLineThumbNodeColorProperty.value.brighterColor( 0.8 ),
      mainColor: NumberPairsColors.numberLineThumbNodeColorProperty,
      top: handleLine.bottom
    } );
    super( {
      children: [ trackPoint, handleLine, handleKnob ],
      tandem: tandem.createTandem( 'thumbNode' )
    } );
  }
}

numberPairs.register( 'ThumbNode', ThumbNode );