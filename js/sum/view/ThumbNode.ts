// Copyright 2024, University of Colorado Boulder
/**
 * Creates the handle that the user can drag to change the value of the left addend.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import { Circle, Line, Node } from '../../../../scenery/js/imports.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import { NUMBER_LINE_POINT_RADIUS } from './NumberLineNode.js';

const HANDLE_LINE_LENGTH = 28;

export default class ThumbNode extends Node {
  public constructor() {

    const trackPoint = new Circle( NUMBER_LINE_POINT_RADIUS, {
      fill: NumberPairsColors.numberLineLeftAddendColorProperty,
      stroke: 'black'
    } );
    const handleLine = new Line( 0, 0, 0, HANDLE_LINE_LENGTH, {
      stroke: 'black',
      top: trackPoint.bottom
    } );
    const handleKnob = new ShadedSphereNode( NUMBER_LINE_POINT_RADIUS * 2, {
      mainColor: NumberPairsColors.numberLineLeftAddendColorProperty,
      top: handleLine.bottom
    } );
   super( {
     children: [ trackPoint, handleLine, handleKnob ]
   } );
  }
}

numberPairs.register( 'ThumbNode', ThumbNode );