// Copyright 2024, University of Colorado Boulder
/**
 * This accordion box displays an equation that represents the decomposition of a sum into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import SumRepresentationAccordionBox, { SumRepresentationAccordionBoxOptions } from './SumRepresentationAccordionBox.js';
import numberPairs from '../../numberPairs.js';
import { Text } from '../../../../scenery/js/imports.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;
type EquationAccordionBoxOptions = SelfOptions & StrictOmit<SumRepresentationAccordionBoxOptions, 'titleNode'>;
export default class EquationAccordionBox extends SumRepresentationAccordionBox {

  public constructor( providedOptions: EquationAccordionBoxOptions ) {
    const contentNode = new Text( '+' );
    const titleNode = new Text( NumberPairsStrings.equationStringProperty, {
      font: NumberPairsConstants.TITLE_FONT
    } );
    const options = optionize<EquationAccordionBoxOptions, SelfOptions, SumRepresentationAccordionBoxOptions>()( {
      titleNode: titleNode
    }, providedOptions );
    super( contentNode, options );
  }
}

numberPairs.register( 'EquationAccordionBox', EquationAccordionBox );