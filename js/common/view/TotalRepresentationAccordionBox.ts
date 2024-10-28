// Copyright 2024, University of Colorado Boulder

/**
 * This is a base class for accordion boxes that contain a representation of a total decomposed into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import { Node } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import NumberPairsColors from '../NumberPairsColors.js';

export type TotalRepresentationAccordionBoxOptions = WithRequired<AccordionBoxOptions, 'titleNode' | 'tandem'>;

export default class TotalRepresentationAccordionBox extends AccordionBox {

  protected constructor( contentNode: Node, providedOptions: TotalRepresentationAccordionBoxOptions ) {
    const options = optionize<TotalRepresentationAccordionBoxOptions, EmptySelfOptions, AccordionBoxOptions>()( {
      showTitleWhenExpanded: false,
      titleYMargin: 10,
      titleAlignX: 'left',
      fill: NumberPairsColors.accordionBoxBackgroundColorProperty
    }, providedOptions );
   super( contentNode, options );
  }
}

numberPairs.register( 'TotalRepresentationAccordionBox', TotalRepresentationAccordionBox );