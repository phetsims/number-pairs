// Copyright 2024-2025, University of Colorado Boulder

/**
 * This accordion box contains a number bond that represents the decomposition of a total into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsColors from '../NumberPairsColors.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import BarModelNode from './BarModelNode.js';
import NumberBondNode, { NumberBondNodeOptions } from './NumberBondNode.js';
import TotalRepresentationAccordionBox, { TotalRepresentationAccordionBoxOptions } from './TotalRepresentationAccordionBox.js';
import NumberPairsPreferences, { NumberModelType } from '../model/NumberPairsPreferences.js';

type SelfOptions = {
  numberBondNodeOptions?: NumberBondNodeOptions;
};
type NumberBondAccordionBoxOptions = SelfOptions & StrictOmit<TotalRepresentationAccordionBoxOptions, 'titleNode'>;


export default class NumberBondAccordionBox extends TotalRepresentationAccordionBox {

  public constructor( model: NumberPairsModel, providedOptions: NumberBondAccordionBoxOptions ) {
    const accordionBoxTitleStringProperty = new DerivedProperty( [ NumberPairsPreferences.numberModelTypeProperty, NumberPairsStrings.numberBondStringProperty, NumberPairsStrings.barModelStringProperty ],
      ( numberModelType, numberBondString, barModelString ) => {
        return numberModelType === NumberModelType.NUMBER_BOND_MODEL ? numberBondString : barModelString;
      } );
    const titleNode = new Text( accordionBoxTitleStringProperty, NumberPairsConstants.ACCORDION_BOX_TITLE_OPTIONS );
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
      visibleProperty: DerivedProperty.valueEqualsConstant( NumberPairsPreferences.numberModelTypeProperty, NumberModelType.NUMBER_BOND_MODEL )
    }, options.numberBondNodeOptions );
    const numberBondNode = new NumberBondNode( model, numberBondOptions );
    const barModelNode = new BarModelNode( model, {
      totalOnTop: options.numberBondNodeOptions.totalOnTop, // It should match the number bond
      visibleProperty: DerivedProperty.valueEqualsConstant( NumberPairsPreferences.numberModelTypeProperty, NumberModelType.BAR_MODEL )
    } );
    const contentNode = new Node( {
      children: [ numberBondNode, barModelNode ],
      excludeInvisibleChildrenFromBounds: true
    } );
    super( contentNode, options );
  }
}

numberPairs.register( 'NumberBondAccordionBox', NumberBondAccordionBox );