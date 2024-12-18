// Copyright 2024, University of Colorado Boulder

/**
 * This accordion box contains a number bond that represents the decomposition of a total into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { Text, Node } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsColors from '../NumberPairsColors.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import NumberBondNode, { NumberBondNodeOptions } from './NumberBondNode.js';
import TotalRepresentationAccordionBox, { TotalRepresentationAccordionBoxOptions } from './TotalRepresentationAccordionBox.js';
import BarModelNode from './BarModelNode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type SelfOptions = {
  numberBondNodeOptions?: NumberBondNodeOptions;
};
type NumberBondAccordionBoxOptions = SelfOptions & StrictOmit<TotalRepresentationAccordionBoxOptions, 'titleNode'>;


export default class NumberBondAccordionBox extends TotalRepresentationAccordionBox {

  public constructor( model: NumberPairsModel, providedOptions: NumberBondAccordionBoxOptions ) {
    const titleNode = new Text( NumberPairsStrings.numberBondStringProperty, {
      font: NumberPairsConstants.TITLE_FONT
    } );
    const options = optionize<NumberBondAccordionBoxOptions, SelfOptions, TotalRepresentationAccordionBoxOptions>()( {
      numberBondNodeOptions: {},
      titleNode: titleNode,
      titleXSpacing: 10,
      contentXSpacing: 0,
      contentYSpacing: 0,
      showTitleWhenExpanded: true,
      fill: NumberPairsColors.numberBondAccordionBoxBackgroundColorProperty
    }, providedOptions );

    const numberBondOptions = combineOptions<NumberBondNodeOptions>( {
      visibleProperty: DerivedProperty.valueEqualsConstant( NumberPairsConstants.NUMBER_MODEL_TYPE_PROPERTY, 'numberBondModel' )
    }, options.numberBondNodeOptions );
    const numberBondNode = new NumberBondNode( model, numberBondOptions );
    const barModelNode = new BarModelNode( model, {
      visibleProperty: DerivedProperty.valueEqualsConstant( NumberPairsConstants.NUMBER_MODEL_TYPE_PROPERTY, 'barModel' )
    } );
    const contentNode = new Node( {
      children: [ numberBondNode, barModelNode ],
      excludeInvisibleChildrenFromBounds: true
    } );
    super( contentNode, options );
  }
}

numberPairs.register( 'NumberBondAccordionBox', NumberBondAccordionBox );