// Copyright 2024-2025, University of Colorado Boulder

/**
 * Creates a bar model that displays the total and two addends as proportional rectangles.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import NumberRectangle from './NumberRectangle.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';

type SelfOptions = {
  totalOnTopProperty?: TReadOnlyProperty<boolean> | null;
  iconOnly?: boolean;
};

type BarModelNodeOptions = SelfOptions & StrictOmit<VBoxOptions, 'children' | 'resize'>;

const BAR_MODEL_WIDTH = 200;
const BAR_HEIGHT = 45;
const LINE_WIDTH = 1;
export default class BarModelNode extends VBox {

  public constructor(
    model: TGenericNumberPairsModel,
    providedOptions?: BarModelNodeOptions ) {

    const options = optionize<BarModelNodeOptions, SelfOptions, VBoxOptions>()( {
      totalOnTopProperty: null,
      iconOnly: false,
      resize: false,
      spacing: 5
    }, providedOptions );

    /**
     * Create the rectangles that represent the total and addends
     */
    const totalWidth = options.iconOnly ? BAR_MODEL_WIDTH * 0.7 : BAR_MODEL_WIDTH;
    const totalDimension = new Dimension2( totalWidth, BAR_HEIGHT );
    const leftAddendDimension = new Dimension2( 0, BAR_HEIGHT );
    const rightAddendDimension = new Dimension2( 0, BAR_HEIGHT );
    let totalRectangle: Rectangle;
    let leftAddendRectangle: Rectangle;
    let rightAddendRectangle: Rectangle;

    if ( options.iconOnly ) {
      totalRectangle = new Rectangle( {
        rectSize: totalDimension,
        fill: model.totalColorProperty,
        stroke: 'black',
        lineWidth: LINE_WIDTH
      } );
      leftAddendRectangle = new Rectangle( {
        rectSize: leftAddendDimension,
        fill: model.leftAddendColorProperty,
        stroke: 'black',
        lineWidth: LINE_WIDTH
      } );
      rightAddendRectangle = new Rectangle( {
        rectSize: rightAddendDimension,
        fill: model.rightAddendColorProperty,
        stroke: 'black',
        lineWidth: LINE_WIDTH
      } );
    }
    else {
      totalRectangle = new NumberRectangle( totalDimension, model.totalProperty, {
        fill: model.totalColorProperty,
        stroke: 'black',
        cornerRadius: 0,
        lineWidth: LINE_WIDTH,
        numberVisibleProperty: model.totalVisibleProperty
      } );
      leftAddendRectangle = new NumberRectangle( leftAddendDimension, model.leftAddendProperty, {
        fill: model.leftAddendColorProperty,
        stroke: 'black',
        cornerRadius: 0,
        lineWidth: LINE_WIDTH,
        numberVisibleProperty: model.leftAddendVisibleProperty
      } );
      rightAddendRectangle = new NumberRectangle( rightAddendDimension, model.rightAddendProperty, {
        fill: model.rightAddendColorProperty,
        stroke: 'black',
        cornerRadius: 0,
        lineWidth: LINE_WIDTH,
        numberVisibleProperty: model.rightAddendVisibleProperty
      } );
    }


    const addendsNode = new Node( {
      children: [ leftAddendRectangle, rightAddendRectangle ],
      excludeInvisibleChildrenFromBounds: true
    } );

    /**
     * Hook up the rectangles to listeners so that they update accordingly
     */
    ManualConstraint.create( addendsNode, [ leftAddendRectangle, rightAddendRectangle ], ( leftAddendRectangleProxy, rightAddendRectangleProxy ) => {

      // Use the rectWidth to calculate because the text bounds may protrude from the rectangle.
      rightAddendRectangleProxy.left = leftAddendRectangleProxy.visible ? leftAddendRectangleProxy.left + leftAddendRectangle.rectWidth : totalRectangle.left;
    } );
    Multilink.multilink( [ model.totalProperty, model.leftAddendProperty, model.rightAddendProperty ], ( total, leftAddend, rightAddend ) => {

      // We need to handle the case where the total is 0, because we can't divide by 0
      if ( total !== 0 ) {
        totalRectangle.fill = model.totalColorProperty;
        leftAddendRectangle.rectWidth = leftAddend / total * totalWidth;
        leftAddendRectangle.fill = model.leftAddendColorProperty;
        leftAddendRectangle.visible = leftAddend > 0;
        rightAddendRectangle.rectWidth = rightAddend / total * totalWidth;
        rightAddendRectangle.visible = rightAddend > 0;
      }
      else {
        totalRectangle.fill = null;
        leftAddendRectangle.rectWidth = totalWidth;
        leftAddendRectangle.fill = null;
        leftAddendRectangle.visible = true;
        rightAddendRectangle.rectWidth = 0;
        rightAddendRectangle.visible = false;
      }
    } );
    options.children = [ totalRectangle, addendsNode ];
    super( options );

    if ( options.totalOnTopProperty ) {
      options.totalOnTopProperty.link( totalOnTop => {
        if ( totalOnTop ) {
          this.children = [ totalRectangle, addendsNode ];

        }
        else {
          this.children = [ addendsNode, totalRectangle ];
        }

        // This VBox needs to be resize: false so that it does not resize as the rectangle sizes change with user interaction.
        // However, we still need to be able to manually update the layout when the totalOnTopProperty changes.
        this.updateLayout();
      } );
    }
  }
}

numberPairs.register( 'BarModelNode', BarModelNode );