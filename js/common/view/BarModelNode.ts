// Copyright 2024-2025, University of Colorado Boulder

/**
 * Abstract base class for bar models that displays the total and two addends as proportional rectangles.
 * Provides shared functionality for both icon and mutable versions.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import numberPairs from '../../numberPairs.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import { GAME_DIMENSION } from './NumberBondNode.js';

type SelfOptions = {
  totalOnTopProperty?: TReadOnlyProperty<boolean> | null;
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

export const DEFAULT_BAR_MODEL_DIMENSIONS: BarModelDimensions = {
  totalWidth: 200,
  barHeight: 45,
  lineWidth: 1,
  spacing: 5,
  numberFontSize: 24
};

export const ICON_BAR_MODEL_DIMENSIONS: BarModelDimensions = {
  totalWidth: DEFAULT_BAR_MODEL_DIMENSIONS.totalWidth * 0.7,
  barHeight: DEFAULT_BAR_MODEL_DIMENSIONS.barHeight,
  lineWidth: DEFAULT_BAR_MODEL_DIMENSIONS.lineWidth,
  spacing: DEFAULT_BAR_MODEL_DIMENSIONS.spacing * 0.7,
  numberFontSize: DEFAULT_BAR_MODEL_DIMENSIONS.numberFontSize
};

const BAR_MODEL_GAME_SCALE = 1.1;

export const GAME_BAR_MODEL_DIMENSIONS: BarModelDimensions = {
  totalWidth: DEFAULT_BAR_MODEL_DIMENSIONS.totalWidth * BAR_MODEL_GAME_SCALE,
  barHeight: DEFAULT_BAR_MODEL_DIMENSIONS.barHeight * BAR_MODEL_GAME_SCALE,
  lineWidth: DEFAULT_BAR_MODEL_DIMENSIONS.lineWidth,
  spacing: DEFAULT_BAR_MODEL_DIMENSIONS.spacing * BAR_MODEL_GAME_SCALE,
  numberFontSize: GAME_DIMENSION.fontSize
};

export default abstract class BarModelNode extends VBox {

  public readonly totalRectangle: Rectangle;
  public readonly leftAddendRectangle: Rectangle;
  public readonly rightAddendRectangle: Rectangle;
  protected readonly addendsNode: Node;

  protected constructor(
    model: TGenericNumberPairsModel,
    totalRectangle: Rectangle,
    leftAddendRectangle: Rectangle,
    rightAddendRectangle: Rectangle,
    providedOptions?: BarModelNodeOptions ) {

    const options = optionize<BarModelNodeOptions, SelfOptions, VBoxOptions>()( {
      totalOnTopProperty: null,
      resize: false,
      spacing: DEFAULT_BAR_MODEL_DIMENSIONS.spacing,
      dimensions: DEFAULT_BAR_MODEL_DIMENSIONS
    }, providedOptions );
    const dimensions = options.dimensions;

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
        leftAddendRectangle.rectWidth = leftAddend / total * dimensions.totalWidth;
        leftAddendRectangle.fill = model.leftAddendColorProperty;
        leftAddendRectangle.visible = leftAddend > 0;
        rightAddendRectangle.rectWidth = rightAddend / total * dimensions.totalWidth;
        rightAddendRectangle.visible = rightAddend > 0;
      }
      else {
        totalRectangle.fill = null;
        leftAddendRectangle.rectWidth = dimensions.totalWidth;
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
    this.addendsNode = addendsNode;

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
