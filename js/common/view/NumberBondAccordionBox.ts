// Copyright 2024, University of Colorado Boulder

/**
 * This accordion box contains a number bond that represents the decomposition of a sum into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import { Text } from '../../../../scenery/js/imports.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import SumRepresentationAccordionBox, { SumRepresentationAccordionBoxOptions } from './SumRepresentationAccordionBox.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberBondNode, { NumberBondNodeOptions } from './NumberBondNode.js';

type SelfOptions = {
  numberBondNodeOptions: NumberBondNodeOptions;
};
type NumberBondAccordionBoxOptions = SelfOptions & StrictOmit<SumRepresentationAccordionBoxOptions, 'titleNode'>;


export default class NumberBondAccordionBox extends SumRepresentationAccordionBox {

  public constructor( model: NumberPairsModel, providedOptions: NumberBondAccordionBoxOptions ) {
    const titleNode = new Text( NumberPairsStrings.numberBondStringProperty, {
      font: NumberPairsConstants.TITLE_FONT
    } );
    const options = optionize<NumberBondAccordionBoxOptions, SelfOptions, SumRepresentationAccordionBoxOptions>()( {
      titleNode: titleNode,
      titleXSpacing: 10,
      contentXMargin: 30,
      contentXSpacing: 0
    }, providedOptions );

    const numberBondNode = new NumberBondNode( model, options.numberBondNodeOptions );
    super( numberBondNode, options );
  }
}

numberPairs.register( 'NumberBondAccordionBox', NumberBondAccordionBox );