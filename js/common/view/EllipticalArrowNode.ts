// Copyright 2024, University of Colorado Boulder

/**
 * Creates an arrow node with a curved tail. The arc of the tail can be adjusted so that the arrow
 * takes an elliptical arc shape to get from a starting point to and ending point.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Node, NodeOptions, NodeTransformOptions, Path, TColor } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import { EllipticalArc, Shape } from '../../../../kite/js/imports.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { NUMBER_LINE_POINT_RADIUS } from './NumberLineNode.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = {
  fill: TColor;
  belowNumberLine?: boolean;
  ellipseYRadius?: number;
  arrowTailLineWidth?: number;
  pointRadius?: number;
  arrowHeadHeight?: number;
  arrowHeadBaseWidth?: number;
};
export type EllipticalArrowNodeOptions = StrictOmit<NodeOptions, 'children' | keyof NodeTransformOptions> & SelfOptions;

// CONSTANTS
const ARROW_START_ANGLE = Math.PI;
const CALCULATION_ELLIPSE_END_ANGLE = Math.PI * 2;
const ARROW_HEAD_BASE_WIDTH = 14;
const ARROW_HEAD_HEIGHT = 16;
const ARROW_TAIL_LINE_WIDTH = 3;

export default class EllipticalArrowNode extends Node {

  private readonly tailNode: Path;
  private readonly arrowHeadNode: Path;
  private readonly antiClockwise: boolean;
  private readonly ellipseYRadius: number;
  private readonly arrowTailLineWidth: number;
  private readonly pointRadius: number;

  public constructor(
    startingValue: TReadOnlyProperty<number>,
    endingValue: TReadOnlyProperty<number>,
    private readonly modelViewTransform: ModelViewTransform2,
    providedOptions: EllipticalArrowNodeOptions ) {

    const options = optionize<EllipticalArrowNodeOptions, SelfOptions, NodeOptions>()( {
      belowNumberLine: false,
      ellipseYRadius: 55,
      arrowTailLineWidth: ARROW_TAIL_LINE_WIDTH,
      pointRadius: NUMBER_LINE_POINT_RADIUS,
      arrowHeadHeight: ARROW_HEAD_HEIGHT,
      arrowHeadBaseWidth: ARROW_HEAD_BASE_WIDTH
    }, providedOptions );

    const tailShape = new Shape();
    const arrowHeadShape = new Shape();
    const arrowHeadNode = new Path( arrowHeadShape, {
      fill: options.fill,
      stroke: null
    } );

    const tailNode = new Path( tailShape, {
      stroke: options.fill,
      lineWidth: options.arrowTailLineWidth
    } );

    options.children = [ tailNode, arrowHeadNode ];
    super( options );

    this.tailNode = tailNode;
    this.arrowHeadNode = arrowHeadNode;
    this.ellipseYRadius = options.ellipseYRadius;
    this.arrowTailLineWidth = options.arrowTailLineWidth;
    this.pointRadius = options.pointRadius;

    // If the arrow is above the number line, the arrow should be drawn in a clockwise direction.
    this.antiClockwise = options.belowNumberLine;

    Multilink.multilink( [ startingValue, endingValue ], ( startingValue, endingValue ) => {
      const pointsToItself = startingValue === endingValue;
      const ellipseXRadius = this.modelViewTransform.modelToViewDeltaX( ( endingValue - startingValue ) / 2 );
      const endingValueCenter = new Vector2( this.modelViewTransform.modelToViewX( endingValue ), 0 );

      let tailEllipticalArc: EllipticalArc;
      let ellipseCenter: Vector2;
      if ( pointsToItself ) {
        ellipseCenter = endingValueCenter;

        // In order to minimize the intersection points between the arcs, the x radius of the tail elliptical arc
        // is adjusted by the half line width of the arrow tail. This also coincides up with the elliptical arc
        // this is rendered.
        tailEllipticalArc = new EllipticalArc(
          ellipseCenter,
          options.pointRadius - options.arrowTailLineWidth / 2, this.ellipseYRadius,
          0,
          ARROW_START_ANGLE, CALCULATION_ELLIPSE_END_ANGLE,
          this.antiClockwise
        );
      }
      else {
        ellipseCenter = new Vector2( this.modelViewTransform.modelToViewX( ( endingValue - startingValue ) / 2 + startingValue ), 0 );
        tailEllipticalArc = new EllipticalArc(
          ellipseCenter,
          ellipseXRadius,
          this.ellipseYRadius,
          0,
          ARROW_START_ANGLE,
          CALCULATION_ELLIPSE_END_ANGLE,
          this.antiClockwise
        );
      }

      /**
       * CALCULATING THE ARROW HEAD POINT:
       * In order to find the arrow head point we want to calculate the intersection between the arrow tails elliptical
       * arc, and a circle that provides a graphic for a value on the number line. We only need to create arcs that live
       * above the x-axis, therefore our end angle for both elliptical arcs is PI * 2.
       */
      const numberLinePointArc = new EllipticalArc(
        endingValueCenter,
        options.pointRadius, options.pointRadius,
        0,
        ARROW_START_ANGLE, CALCULATION_ELLIPSE_END_ANGLE,
        this.antiClockwise
      );
      const arrowHeadPoint = this.getEllipseIntersection( tailEllipticalArc, numberLinePointArc );

      /**
       * CALCULATING THE BASE:
       * Our arrow head base should be a defined distance away from the arrow head point and live on the arrow tail
       * elliptical arc. We can calculate the midpoint of our arrow head base by finding the intersection of our
       * arrow tail elliptical arc, and creating a circle with radius equal to the desired arrow head height,
       * plus the distance between the arrow head point and the number line.
       */
      const baseArcRadius = pointsToItself ? options.pointRadius - options.arrowTailLineWidth / 2 + options.arrowHeadHeight :
                            options.pointRadius + options.arrowHeadHeight;
      const baseMidpointArc = new EllipticalArc(
        endingValueCenter,
        baseArcRadius, baseArcRadius,
        0,
        ARROW_START_ANGLE, CALCULATION_ELLIPSE_END_ANGLE,
        this.antiClockwise
      );
      const baseMidpoint = this.getEllipseIntersection( tailEllipticalArc, baseMidpointArc );

      /**
       * CALCULATING THE ARROW END ANGLE:
       * Our arrow tail elliptical arc should end at the arrow head triangle's center. We find this angle by averaging
       * the arrow head point and the base intersection point, and then use the parametric equation of an ellipse to find
       * theta (t).
       * x = a*cos(t) and y = b*sin(t) where a is the x radius and b is the y radius.
       * asin( triangleCenter.y / yRadius ) = t ;
       */
      const ellipseEndPoint = baseMidpoint.average( arrowHeadPoint );
      const arrowEndAngle = Math.asin( ellipseEndPoint.y / this.ellipseYRadius );

      this.updateTailShape( pointsToItself, ellipseCenter, ellipseXRadius, arrowEndAngle );
      this.updateArrowHeadShape( arrowHeadPoint, baseMidpoint, options.arrowHeadBaseWidth );
    } );
  }

  private updateTailShape( pointsToItself: boolean, ellipseCenter: Vector2, ellipseXRadius: number, arrowEndAngle: number ): void {

    let tailShape: Shape;

    // If the starting value is the same as the ending value, the arrow should appear as if it is looping up and over
    // to the same spot. We do this by positioning the elliptical arc to start slightly left of and end slightly right
    // of the point on the number line.
    if ( pointsToItself ) {
      tailShape = new Shape().ellipticalArc(
        ellipseCenter.x, 0,
        this.pointRadius - this.arrowTailLineWidth / 2, this.ellipseYRadius,
        0,
        ARROW_START_ANGLE, arrowEndAngle,
        this.antiClockwise
      );
    }
    else {
      tailShape = new Shape().ellipticalArc(
        ellipseCenter.x, 0,
        ellipseXRadius, this.ellipseYRadius,
        0,
        ARROW_START_ANGLE, arrowEndAngle,
        this.antiClockwise
      );
    }
    this.tailNode.setShape( tailShape );
  }

  private updateArrowHeadShape( arrowHeadPoint: Vector2, arrowHeadBaseMidPoint: Vector2, arrowHeadBaseWidth: number ): void {
    const basePoint1 = arrowHeadBaseMidPoint.plus( arrowHeadPoint.minus( arrowHeadBaseMidPoint ).perpendicular.normalized().times( arrowHeadBaseWidth / 2 ) );
    const basePoint2 = arrowHeadBaseMidPoint.minus( arrowHeadPoint.minus( arrowHeadBaseMidPoint ).perpendicular.normalized().times( arrowHeadBaseWidth / 2 ) );

    const arrowHeadShape = new Shape()
      .moveTo( basePoint1.x, basePoint1.y )
      .lineTo( arrowHeadPoint.x, arrowHeadPoint.y )
      .lineTo( basePoint2.x, basePoint2.y )
      .lineTo( basePoint1.x, basePoint1.y );
    this.arrowHeadNode.setShape( arrowHeadShape );
  }

  private getEllipseIntersection( arcA: EllipticalArc, arcB: EllipticalArc ): Vector2 {
    const intersections = EllipticalArc.intersect( arcA, arcB );
    assert && assert( intersections.length > 0, 'An intersection should be defined' );
    return intersections[ intersections.length - 1 ].point;
  }
}

numberPairs.register( 'EllipticalArrowNode', EllipticalArrowNode );