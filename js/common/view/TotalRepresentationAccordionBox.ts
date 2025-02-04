// Copyright 2024-2025, University of Colorado Boulder

/**
 * This is a base class for accordion boxes that contain a representation of a total decomposed into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import { Node } from '../../../../scenery/js/imports.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsColors from '../NumberPairsColors.js';

export type TotalRepresentationAccordionBoxOptions = WithRequired<AccordionBoxOptions, 'titleNode' | 'tandem'>;

const EXPAND_COLLAPSE_SIDE_LENGTH = 20;
const CONTENT_X_MARGIN = 10;
const BUTTON_X_MARGIN = 8;

export default class TotalRepresentationAccordionBox extends AccordionBox {
  public static readonly EXPAND_COLLAPSE_SIDE_LENGTH = EXPAND_COLLAPSE_SIDE_LENGTH;
  public static readonly CONTENT_X_MARGIN = CONTENT_X_MARGIN;
  public static readonly BUTTON_X_MARGIN = BUTTON_X_MARGIN;

  protected constructor( contentNode: Node, providedOptions: TotalRepresentationAccordionBoxOptions ) {
    const options = optionize<TotalRepresentationAccordionBoxOptions, EmptySelfOptions, AccordionBoxOptions>()( {
      showTitleWhenExpanded: false,
      titleYMargin: 10,
      titleAlignX: 'left',
      titleXSpacing: BUTTON_X_MARGIN,
      contentXMargin: CONTENT_X_MARGIN,
      buttonXMargin: BUTTON_X_MARGIN,
      cornerRadius: 5,
      contentXSpacing: 0,
      useExpandedBoundsWhenCollapsed: false,
      fill: NumberPairsColors.accordionBoxBackgroundColorProperty,
      expandCollapseButtonOptions: {
        sideLength: EXPAND_COLLAPSE_SIDE_LENGTH
      }
    }, providedOptions );
    super( contentNode, options );
  }
}

numberPairs.register( 'TotalRepresentationAccordionBox', TotalRepresentationAccordionBox );