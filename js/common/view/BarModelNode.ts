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
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberRectangle from './NumberRectangle.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = {
  totalOnTopProperty?: TReadOnlyProperty<boolean> | null;
};

type BarModelNodeOptions = SelfOptions & StrictOmit<VBoxOptions, 'children' | 'resize'>;

const TOTAL_WIDTH = 200;
const BAR_HEIGHT = 45;
const LINE_WIDTH = 1;
export default class BarModelNode extends VBox {

  public constructor(
    model: NumberPairsModel,
    providedOptions?: BarModelNodeOptions ) {

    const options = optionize<BarModelNodeOptions, SelfOptions, VBoxOptions>()( {
      totalOnTopProperty: null,
      resize: false,
      spacing: 5
    }, providedOptions );

    /**
     * Create the rectangles that represent the total and addends
     */
    const totalRectangle = new NumberRectangle( new Dimension2( TOTAL_WIDTH, BAR_HEIGHT ), model.totalProperty, {
      fill: model.totalColorProperty,
      stroke: 'black',
      cornerRadius: 0,
      lineWidth: LINE_WIDTH,
      numberVisibleProperty: model.totalVisibleProperty
    } );
    const leftAddendRectangle = new NumberRectangle( new Dimension2( 0, BAR_HEIGHT ), model.leftAddendProperty, {
      fill: model.leftAddendColorProperty,
      stroke: 'black',
      cornerRadius: 0,
      lineWidth: LINE_WIDTH,
      numberVisibleProperty: model.leftAddendVisibleProperty
    } );
    const rightAddendRectangle = new NumberRectangle( new Dimension2( 0, BAR_HEIGHT ), model.rightAddendProperty, {
      fill: model.rightAddendColorProperty,
      stroke: 'black',
      cornerRadius: 0,
      lineWidth: LINE_WIDTH,
      numberVisibleProperty: model.rightAddendVisibleProperty
    } );
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
        leftAddendRectangle.rectWidth = leftAddend / total * TOTAL_WIDTH;
        leftAddendRectangle.fill = model.leftAddendColorProperty;
        leftAddendRectangle.visible = leftAddend > 0;
        rightAddendRectangle.rectWidth = rightAddend / total * TOTAL_WIDTH;
        rightAddendRectangle.visible = rightAddend > 0;
      }
      else {
        totalRectangle.fill = null;
        leftAddendRectangle.rectWidth = TOTAL_WIDTH;
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

        // This VBox needs to be resize:false so that it does not resize as the rectangle sizes change with user interaction.
        // However, we still need to be able to manually update the layout when the totalOnTopProperty changes.
        this.updateLayout();
      } );
    }
  }
}

numberPairs.register( 'BarModelNode', BarModelNode );