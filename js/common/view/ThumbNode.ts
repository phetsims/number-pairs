// Copyright 2024-2025, University of Colorado Boulder
/**
 * Creates the handle that the user can drag to change the value of the left addend.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsColors from '../NumberPairsColors.js';
import NumberLineNode from './NumberLineNode.js';

const HANDLE_LINE_LENGTH = 30;

type SelfOptions = EmptySelfOptions;
type ThumbNodeOptions = PickRequired<NodeOptions, 'tandem'> & StrictOmit<NodeOptions, 'children'>;
export default class ThumbNode extends Node {
  public constructor( providedOptions: ThumbNodeOptions ) {


    const trackPoint = new Circle( NumberLineNode.POINT_RADIUS, {
      fill: NumberPairsColors.attributeLeftAddendColorProperty,
      stroke: 'black'
    } );
    const handleLine = new Line( 0, 0, 0, HANDLE_LINE_LENGTH, {
      stroke: 'black',
      top: trackPoint.bottom,
      lineWidth: 1
    } );
    const handleKnob = new ShadedSphereNode( NumberLineNode.POINT_RADIUS * 3, {
      highlightColor: NumberPairsColors.numberLineThumbNodeColorProperty.value.brighterColor( 0.8 ),
      mainColor: NumberPairsColors.numberLineThumbNodeColorProperty,
      stroke: 'black',
      top: handleLine.bottom
    } );

    const options = optionize<ThumbNodeOptions, SelfOptions, NodeOptions>()( {
      children: [ trackPoint, handleLine, handleKnob ],
      cursor: 'pointer',
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions );
    super( options );

    this.mouseArea = this.bounds.dilated( 2 );
    this.touchArea = this.bounds.dilated( 10 );
  }
}

numberPairs.register( 'ThumbNode', ThumbNode );