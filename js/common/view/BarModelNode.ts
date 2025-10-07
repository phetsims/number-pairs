// Copyright 2024-2025, University of Colorado Boulder

/**
 * Creates a bar model that displays the total and two addends as proportional rectangles.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import numberPairs from '../../numberPairs.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import { GAME_DIMENSION } from './NumberBondNode.js';
import NumberRectangle from './NumberRectangle.js';

type SelfOptions = {
  totalOnTopProperty?: TReadOnlyProperty<boolean> | null;
  iconOnly?: boolean;
  displayTotalNumberProperty?: TReadOnlyProperty<number> | null;
  displayLeftAddendNumberProperty?: TReadOnlyProperty<number> | null;
  displayRightAddendNumberProperty?: TReadOnlyProperty<number> | null;
  dimensions?: BarModelDimensions;
};

export type BarModelNodeOptions = SelfOptions & StrictOmit<VBoxOptions, 'children' | 'resize'>;

export type BarModelDimensions = {
  totalWidth: number;
  barHeight: number;
  lineWidth: number;
  spacing: number;
  numberFontSize: number;
};

export const NORMAL_BAR_MODEL_DIMENSIONS: BarModelDimensions = {
  totalWidth: 200,
  barHeight: 45,
  lineWidth: 1,
  spacing: 5,
  numberFontSize: 24
};

const BAR_MODEL_GAME_SCALE = GAME_DIMENSION.fontSize / NORMAL_BAR_MODEL_DIMENSIONS.numberFontSize;

export const GAME_BAR_MODEL_DIMENSIONS: BarModelDimensions = {
  totalWidth: NORMAL_BAR_MODEL_DIMENSIONS.totalWidth * BAR_MODEL_GAME_SCALE,
  barHeight: NORMAL_BAR_MODEL_DIMENSIONS.barHeight * BAR_MODEL_GAME_SCALE,
  lineWidth: NORMAL_BAR_MODEL_DIMENSIONS.lineWidth,
  spacing: NORMAL_BAR_MODEL_DIMENSIONS.spacing * BAR_MODEL_GAME_SCALE,
  numberFontSize: GAME_DIMENSION.fontSize
};
export default class BarModelNode extends VBox {

  public readonly totalRectangle: Rectangle;
  public readonly leftAddendRectangle: Rectangle;
  public readonly rightAddendRectangle: Rectangle;

  public constructor(
    model: TGenericNumberPairsModel,
    providedOptions?: BarModelNodeOptions ) {

    const options = optionize<BarModelNodeOptions, SelfOptions, VBoxOptions>()( {
      totalOnTopProperty: null,
      iconOnly: false,
      displayTotalNumberProperty: null,
      displayLeftAddendNumberProperty: null,
      displayRightAddendNumberProperty: null,
      resize: false,
      spacing: NORMAL_BAR_MODEL_DIMENSIONS.spacing,
      dimensions: NORMAL_BAR_MODEL_DIMENSIONS
    }, providedOptions );

    const dimensions = options.dimensions;

    /**
     * Create the rectangles that represent the total and addends
     */
    const totalWidth = options.iconOnly ? dimensions.totalWidth * 0.7 : dimensions.totalWidth;
    const totalDimension = new Dimension2( totalWidth, dimensions.barHeight );
    const leftAddendDimension = new Dimension2( 0, dimensions.barHeight );
    const rightAddendDimension = new Dimension2( 0, dimensions.barHeight );
    let totalRectangle: Rectangle;
    let leftAddendRectangle: Rectangle;
    let rightAddendRectangle: Rectangle;

    if ( options.iconOnly ) {
      totalRectangle = new Rectangle( {
        rectSize: totalDimension,
        fill: model.totalColorProperty,
        stroke: 'black',
        lineWidth: dimensions.lineWidth
      } );
      leftAddendRectangle = new Rectangle( {
        rectSize: leftAddendDimension,
        fill: model.leftAddendColorProperty,
        stroke: 'black',
        lineWidth: dimensions.lineWidth
      } );
      rightAddendRectangle = new Rectangle( {
        rectSize: rightAddendDimension,
        fill: model.rightAddendColorProperty,
        stroke: 'black',
        lineWidth: dimensions.lineWidth
      } );
    }
    else {
      const displayTotalNumberProperty = options.displayTotalNumberProperty || model.totalProperty;
      const displayLeftAddendNumberProperty = options.displayLeftAddendNumberProperty || model.leftAddendProperty;
      const displayRightAddendNumberProperty = options.displayRightAddendNumberProperty || model.rightAddendProperty;

      totalRectangle = new NumberRectangle( totalDimension, displayTotalNumberProperty, {
        fill: model.totalColorProperty,
        stroke: 'black',
        cornerRadius: 0,
        lineWidth: dimensions.lineWidth,
        numberVisibleProperty: model.totalVisibleProperty,
        numberFontSize: dimensions.numberFontSize
      } );
      leftAddendRectangle = new NumberRectangle( leftAddendDimension, displayLeftAddendNumberProperty, {
        fill: model.leftAddendColorProperty,
        stroke: 'black',
        cornerRadius: 0,
        lineWidth: dimensions.lineWidth,
        numberVisibleProperty: model.leftAddendVisibleProperty,
        numberFontSize: dimensions.numberFontSize
      } );
      rightAddendRectangle = new NumberRectangle( rightAddendDimension, displayRightAddendNumberProperty, {
        fill: model.rightAddendColorProperty,
        stroke: 'black',
        cornerRadius: 0,
        lineWidth: dimensions.lineWidth,
        numberVisibleProperty: model.rightAddendVisibleProperty,
        numberFontSize: dimensions.numberFontSize
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

    this.totalRectangle = totalRectangle;
    this.leftAddendRectangle = leftAddendRectangle;
    this.rightAddendRectangle = rightAddendRectangle;

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
