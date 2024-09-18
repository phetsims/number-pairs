// Copyright 2024, University of Colorado Boulder
/**
 * TODO: describe file
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import { Circle, Line, Node } from '../../../../scenery/js/imports.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';

export const RADIUS = 8;
const HANDLE_LINE_LENGTH = 25;

export default class ThumbNode extends Node {
  public constructor() {

    const trackPoint = new Circle( RADIUS, {
      fill: NumberPairsColors.numberLineLeftAddendColorProperty,
      stroke: 'black'
    } );
    const handleLine = new Line( 0, 0, 0, HANDLE_LINE_LENGTH, {
      stroke: 'black',
      top: trackPoint.bottom
    } );
    const handleKnob = new ShadedSphereNode( RADIUS * 2, {
      mainColor: NumberPairsColors.numberLineLeftAddendColorProperty,
      top: handleLine.bottom
    } );
   super( {
     children: [ trackPoint, handleLine, handleKnob ]
   } );
  }
}

numberPairs.register( 'ThumbNode', ThumbNode );