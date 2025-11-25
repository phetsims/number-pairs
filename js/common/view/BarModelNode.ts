// Copyright 2024-2025, University of Colorado Boulder

/**
 * Abstract base class for bar models that displays the total and two addends as proportional rectangles.
 * Provides shared functionality for both icon and mutable versions.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import numberPairs from '../../numberPairs.js';

type SelfOptions = {
  totalOnTopProperty?: TReadOnlyProperty<boolean> | null;
  dimensions?: BarModelDimensions;
};

export type BarModelNodeOptions = SelfOptions & StrictOmit<VBoxOptions, 'children'>;

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

const ICON_SCALE = 0.7;
export const ICON_BAR_MODEL_DIMENSIONS: BarModelDimensions = {
  totalWidth: DEFAULT_BAR_MODEL_DIMENSIONS.totalWidth * ICON_SCALE,
  barHeight: DEFAULT_BAR_MODEL_DIMENSIONS.barHeight,
  lineWidth: DEFAULT_BAR_MODEL_DIMENSIONS.lineWidth,
  spacing: DEFAULT_BAR_MODEL_DIMENSIONS.spacing * ICON_SCALE,
  numberFontSize: DEFAULT_BAR_MODEL_DIMENSIONS.numberFontSize
};

const GAME_ICON_SCALE = 0.55;
export const GAME_ICON_BAR_MODEL_DIMENSIONS: BarModelDimensions = {
  totalWidth: DEFAULT_BAR_MODEL_DIMENSIONS.totalWidth * GAME_ICON_SCALE,
  barHeight: DEFAULT_BAR_MODEL_DIMENSIONS.barHeight * GAME_ICON_SCALE,
  lineWidth: 0.5,
  spacing: DEFAULT_BAR_MODEL_DIMENSIONS.spacing * GAME_ICON_SCALE,
  numberFontSize: DEFAULT_BAR_MODEL_DIMENSIONS.numberFontSize * GAME_ICON_SCALE
};

const BAR_MODEL_GAME_SCALE = 1.1;

export const GAME_BAR_MODEL_DIMENSIONS: BarModelDimensions = {
  totalWidth: DEFAULT_BAR_MODEL_DIMENSIONS.totalWidth * BAR_MODEL_GAME_SCALE,
  barHeight: DEFAULT_BAR_MODEL_DIMENSIONS.barHeight * BAR_MODEL_GAME_SCALE,
  lineWidth: DEFAULT_BAR_MODEL_DIMENSIONS.lineWidth,
  spacing: DEFAULT_BAR_MODEL_DIMENSIONS.spacing * BAR_MODEL_GAME_SCALE,
  numberFontSize: 25
};

export default abstract class BarModelNode extends VBox {

  protected constructor(
    public readonly totalRectangle: Rectangle,
    protected readonly addendsNode: Node,
    providedOptions?: BarModelNodeOptions ) {

    const options = optionize<BarModelNodeOptions, SelfOptions, VBoxOptions>()( {
      totalOnTopProperty: null,
      spacing: DEFAULT_BAR_MODEL_DIMENSIONS.spacing,
      dimensions: DEFAULT_BAR_MODEL_DIMENSIONS
    }, providedOptions );

    options.children = [ totalRectangle, addendsNode ];
    super( options );

    this.totalRectangle = totalRectangle;
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
