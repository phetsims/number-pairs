// Copyright 2024, University of Colorado Boulder

/**
 * Creates an arrow node with a curved tail. The arc of the tail can be adjusted so that the arrow
 * takes an elliptical arc shape to get from a starting point to and ending point.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Node, NodeOptions, Path, TColor } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import { Shape } from '../../../../kite/js/imports.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import TriangleNode from '../../../../scenery-phet/js/TriangleNode.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { NUMBER_LINE_POINT_RADIUS } from '../../sum/view/NumberLineNode.js';
import TProperty from '../../../../axon/js/TProperty.js';

type SelfOptions = {
  fill: TColor;
};
type EllipticalArrowNodeOptions = NodeOptions & SelfOptions;

const ELLIPTICAL_Y_RADIUS = 32;
export default class EllipticalArrowNode extends Node {

  private tailPath: Path;

  public constructor( startingValue: TProperty<number>, endingValue: TProperty<number>, private readonly modelViewTransform: ModelViewTransform2, providedOptions: EllipticalArrowNodeOptions ) {


    const tailShape = new Shape();
    const arrowHead = new TriangleNode( {
      triangleWidth: 2 * NUMBER_LINE_POINT_RADIUS,
      triangleHeight: 2 * NUMBER_LINE_POINT_RADIUS,
      fill: providedOptions.fill,
      stroke: null,
      centerX: modelViewTransform.modelToViewX( endingValue.value ) - NUMBER_LINE_POINT_RADIUS
    } );
    const tailPath = new Path( tailShape, {
      stroke: providedOptions.fill,
      lineWidth: 3
    } );

    super( {
      children: [ tailPath, arrowHead ]
    } );

    this.tailPath = tailPath;
    Multilink.multilink( [ startingValue, endingValue ], ( startingValue, endingValue ) => {
      this.updateTailShape( startingValue, endingValue );
      arrowHead.centerX = modelViewTransform.modelToViewX( endingValue ) - NUMBER_LINE_POINT_RADIUS;
    } );
  }

  public updateTailShape( startingValue: number, endingValue: number ): void {

    let tailShape: Shape;
    const startingCenterX = this.modelViewTransform.modelToViewX( ( endingValue - startingValue ) / 2 + startingValue );
    const startingXRadius = this.modelViewTransform.modelToViewX( ( endingValue - startingValue ) / 2 );

    // If the starting value is the same as the ending value, the arrow should appear as if it is looping up and over
    // to the same spot. We do this by positioning the elliptical arc to start slight left of and end slightly right
    // of the point on the number line.
    if ( startingValue === endingValue ) {
      tailShape = new Shape()
        .moveTo( startingCenterX - NUMBER_LINE_POINT_RADIUS / 2, 0 )
        .ellipticalArcTo( NUMBER_LINE_POINT_RADIUS, ELLIPTICAL_Y_RADIUS, 0, true, true, startingCenterX + NUMBER_LINE_POINT_RADIUS / 2, 0 );
    }
    else {
      tailShape = new Shape().ellipticalArc( startingCenterX, 0, startingXRadius, ELLIPTICAL_Y_RADIUS, 0, Math.PI, Math.PI * 1.75 );
    }
    this.tailPath.setShape( tailShape );


  }
}

numberPairs.register( 'EllipticalArrowNode', EllipticalArrowNode );