// Copyright 2024, University of Colorado Boulder
/**
 * This accordion box displays an equation that represents the decomposition of a sum into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import SumRepresentationAccordionBox from './SumRepresentationAccordionBox.js';
import numberPairs from '../../numberPairs.js';
import { Text } from '../../../../scenery/js/imports.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsConstants from '../NumberPairsConstants.js';


export default class EquationAccordionBox extends SumRepresentationAccordionBox {

  public constructor() {
    const contentNode = new Text( '+' );
    const titleNode = new Text( NumberPairsStrings.equationStringProperty, {
      font: NumberPairsConstants.TITLE_FONT
    } );
   super( contentNode, {
     titleNode: titleNode
   } );
  }
}

numberPairs.register( 'EquationAccordionBox', EquationAccordionBox );