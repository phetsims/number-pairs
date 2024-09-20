// Copyright 2024, University of Colorado Boulder

/**
 * This is a base class for accordion boxes that contain a representation of a sum decomposed into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import { Node } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

export type SumRepresentationAccordionBoxOptions = WithRequired<AccordionBoxOptions, 'titleNode' | 'tandem'>;

// TODO: Rename to TotalRepresentationAccordionBox
export default class SumRepresentationAccordionBox extends AccordionBox {

  public constructor( contentNode: Node, providedOptions: SumRepresentationAccordionBoxOptions ) {
    const options = optionize<SumRepresentationAccordionBoxOptions, EmptySelfOptions, AccordionBoxOptions>()( {
      showTitleWhenExpanded: false,
      titleYMargin: 10,
      titleAlignX: 'left'
    }, providedOptions );
   super( contentNode, options );
  }
}

numberPairs.register( 'SumRepresentationAccordionBox', SumRepresentationAccordionBox );