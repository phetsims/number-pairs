// Copyright 2024-2025, University of Colorado Boulder

/**
 * Creates an arrow node with a curved tail. The arc of the tail can be adjusted so that the arrow
 * takes an elliptical arc shape to get from a starting point to and ending point.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import Multilink from '../../../../axon/js/Multilink.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Segment, { Cubic, EllipticalArc } from '../../../../kite/js/segments/Segment.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node, { NodeOptions, NodeTransformOptions } from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import numberPairs from '../../numberPairs.js';
import NumberLineNode from './NumberLineNode.js';
import Color from '../../../../scenery/js/util/Color.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type SelfOptions = {
  arrowColorProperty: TReadOnlyProperty<Color> | null;
  addStrokeToArrow?: boolean;
  belowNumberLine?: boolean;
  curveYRadius?: number;
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
const ARROW_HEAD_OFFSET = 2; // The amount we want the arrow head to overlap the number line point graphic

export default class CurvedArrowNode extends Node {

  private readonly tailNode: Path;
  private readonly backgroundTailNode: Path;
  private readonly arrowHeadNode: Path;
  private readonly antiClockwise: boolean;
  private readonly ellipseYRadius: number;
  private _pointsToItself = false;

  public constructor(
    startingValueProperty: TReadOnlyProperty<number>,
    endingValueProperty: TReadOnlyProperty<number>,
    private readonly modelViewTransform: ModelViewTransform2,
    providedOptions: EllipticalArrowNodeOptions ) {

    const options = optionize<EllipticalArrowNodeOptions, SelfOptions, NodeOptions>()( {
      addStrokeToArrow: false,
      belowNumberLine: false,
      curveYRadius: 55,
      arrowTailLineWidth: ARROW_TAIL_LINE_WIDTH,
      pointRadius: NumberLineNode.POINT_RADIUS,
      arrowHeadHeight: ARROW_HEAD_HEIGHT,
      arrowHeadBaseWidth: ARROW_HEAD_BASE_WIDTH
    }, providedOptions );


    options.addStrokeToArrow && assert && assert( options.arrowColorProperty, 'arrowColorProperty is required when addStrokeToArrow is true' );

    const tailShape = new Shape();
    const arrowHeadShape = new Shape();

    let strokeProperty: TReadOnlyProperty<Color> | null = null;
    if ( options.addStrokeToArrow && options.arrowColorProperty ) {
      strokeProperty = new DerivedProperty( [ options.arrowColorProperty ], ( arrowColor: Color ) => {
        return arrowColor.darkerColor( 0.85 );
      } );
    }
    const arrowHeadNode = new Path( arrowHeadShape, {
      fill: options.arrowColorProperty,
      stroke: strokeProperty
    } );

    const tailNode = new Path( tailShape, {
      stroke: options.arrowColorProperty,
      lineWidth: options.arrowTailLineWidth
    } );

    const backgroundTailNode = new Path( tailShape, {
      stroke: strokeProperty,
      lineWidth: options.arrowTailLineWidth + 2
    } );

    options.children = [ backgroundTailNode, tailNode, arrowHeadNode ];
    super( options );

    this.tailNode = tailNode;
    this.backgroundTailNode = backgroundTailNode;
    this.arrowHeadNode = arrowHeadNode;
    this.ellipseYRadius = options.curveYRadius;

    // If the arrow is above the number line, the arrow should be drawn in a clockwise direction.
    this.antiClockwise = options.belowNumberLine;

    Multilink.multilink( [ startingValueProperty, endingValueProperty ], ( startingValue, endingValue ) => {
      this._pointsToItself = startingValue === endingValue;
      const ellipseXRadius = this.modelViewTransform.modelToViewDeltaX( ( endingValue - startingValue ) / 2 );
      const endingValueCenter = new Vector2( this.modelViewTransform.modelToViewX( endingValue ), 0 );

      let tailCurve: Segment;
      let curveCenter: Vector2;
      if ( this._pointsToItself ) {

        // When the arrow is pointing to itself the variable name "curveCenter" is a bit of a misnomer.
        // The x value is indeed the center of the curve (as well as the start and end x values), but the y value
        // describes when the cubic curve connects to itself. This should be at the number line axis, which is 0 and
        // is also still applicable to all the elliptical arc calculations that happen in this class.
        curveCenter = new Vector2( endingValueCenter.x, 0 );
        const cubicHeight = this.antiClockwise ? -1 * this.ellipseYRadius : this.ellipseYRadius;
        const controlPoint1 = new Vector2( curveCenter.x - options.pointRadius * 2, curveCenter.y - cubicHeight );
        const controlPoint2 = new Vector2( curveCenter.x + options.pointRadius * 2, curveCenter.y - cubicHeight );

        // In order to minimize the intersection points between the arcs, the x radius of the tail elliptical arc
        // is adjusted by the half line width of the arrow tail. This also coincides up with the elliptical arc
        // this is rendered.
        tailCurve = new Cubic(
          curveCenter,
          controlPoint1,
          controlPoint2,
          curveCenter
        );
      }
      else {
        curveCenter = new Vector2( this.modelViewTransform.modelToViewX( ( endingValue - startingValue ) / 2 + startingValue ), 0 );
        tailCurve = new EllipticalArc(
          curveCenter,
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
       * arc, and a circle that provides a graphic for a value on the number line. The point of the arrow head should
       * overlap the graphic as long as the point radius is large enough.
       *
       * We only need to create arcs that live above the x-axis, therefore our end angle
       * for both elliptical arcs is PI * 2.
       */
      const pointArcRadius = options.pointRadius <= ARROW_HEAD_OFFSET ? options.pointRadius : options.pointRadius - ARROW_HEAD_OFFSET;
      const numberLinePointArc = new EllipticalArc(
        endingValueCenter,
        pointArcRadius, pointArcRadius,
        0,
        ARROW_START_ANGLE, CALCULATION_ELLIPSE_END_ANGLE,
        this.antiClockwise
      );
      const arrowHeadPoint = this.getIntersection( tailCurve, numberLinePointArc );

      /**
       * CALCULATING THE BASE:
       * Our arrow head base should be a defined distance away from the arrow head point and live on the arrow tail
       * elliptical arc. We can calculate the midpoint of our arrow head base by finding the intersection of our
       * arrow tail elliptical arc, and creating a circle with radius equal to the desired arrow head height,
       * plus the distance between the arrow head point and the number line.
       */
      const baseArcRadius = pointArcRadius + options.arrowHeadHeight;
      const baseMidpointArc = new EllipticalArc(
        endingValueCenter,
        baseArcRadius, baseArcRadius,
        0,
        ARROW_START_ANGLE, CALCULATION_ELLIPSE_END_ANGLE,
        this.antiClockwise
      );
      const baseMidpoint = this.getIntersection( tailCurve, baseMidpointArc );

      // Our arrow tail elliptical arc should end at the arrow head triangle's center, which we can find by
      // by averaging the arrow head point and the base intersection point
      const ellipseEndPoint = baseMidpoint.average( arrowHeadPoint );

      this.updateTailShape( this.pointsToItself, curveCenter, ellipseXRadius, ellipseEndPoint );
      this.updateArrowHeadShape( arrowHeadPoint, baseMidpoint, options.arrowHeadBaseWidth );
    } );
  }

  private updateTailShape( pointsToItself: boolean, curveCenter: Vector2, ellipseXRadius: number, curveEndPoint: Vector2 ): void {

    let tailShape: Shape;

    // If the starting value is the same as the ending value, the arrow should appear as if it is looping up and over
    // to the same spot. To do this we use a cubic curve that starts at the curve center, and ends at the curveEndPoint
    if ( pointsToItself ) {
      const cubicYDirection = this.antiClockwise ? -1 : 1;
      const cubicHeight = this.ellipseYRadius * cubicYDirection;
      const controlPoint1 = new Vector2( curveCenter.x - NumberLineNode.POINT_RADIUS * 2, curveCenter.y - cubicHeight );
      const controlPoint2 = new Vector2( curveCenter.x + NumberLineNode.POINT_RADIUS * 2, curveCenter.y - cubicHeight );
      tailShape = new Shape().moveToPoint( curveCenter ).cubicCurveToPoint( controlPoint1, controlPoint2, curveEndPoint );
    }
    else {

      /**
       * CALCULATING THE ARROW END ANGLE:
       * We find this angle using the parametric equation of an ellipse to find theta (t).
       * x = a*cos(t) and y = b*sin(t) where a is the x radius and b is the y radius.
       * asin( triangleCenter.y / yRadius ) = t ;
       */
      const arrowEndAngle = Math.asin( curveEndPoint.y / this.ellipseYRadius );


      tailShape = new Shape().ellipticalArc(
        curveCenter.x, 0,
        ellipseXRadius, this.ellipseYRadius,
        0,
        ARROW_START_ANGLE, arrowEndAngle,
        this.antiClockwise
      );
    }
    this.tailNode.setShape( tailShape );
    this.backgroundTailNode.setShape( tailShape );
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

  private getIntersection( arcA: Segment, arcB: Segment ): Vector2 {
    const intersections = Segment.intersect( arcA, arcB );
    assert && assert( intersections.length > 0, 'An intersection should be defined' );
    return intersections[ intersections.length - 1 ].point;
  }

  public get pointsToItself(): boolean {
    return this._pointsToItself;
  }
}

numberPairs.register( 'CurvedArrowNode', CurvedArrowNode );