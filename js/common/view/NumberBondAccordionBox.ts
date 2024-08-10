// Copyright 2024, University of Colorado Boulder

/**
 * This accordion box contains a number bond that represents the decomposition of a sum into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import { Circle, Text } from '../../../../scenery/js/imports.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import SumRepresentationAccordionBox from './SumRepresentationAccordionBox.js';


export default class NumberBondAccordionBox extends SumRepresentationAccordionBox {

  public constructor( model: NumberPairsModel ) {

    const contentNode = new Circle( 40, {
      fill: 'yellow',
      stroke: 'black'
    } );
    const titleNode = new Text( NumberPairsStrings.numberBondStringProperty, {
      font: NumberPairsConstants.TITLE_FONT
    } );
    super( contentNode, {
      titleNode: titleNode
    } );
  }
}

numberPairs.register( 'NumberBondAccordionBox', NumberBondAccordionBox );