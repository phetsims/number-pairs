// Copyright 2024-2025, University of Colorado Boulder

/**
 * This accordion box contains a number bond that represents the decomposition of a total into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsPreferences, { NumberModelType } from '../model/NumberPairsPreferences.js';
import NumberPairsColors from '../NumberPairsColors.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import BarModelNode from './BarModelNode.js';
import NumberBondMutableNode from './NumberBondMutableNode.js';
import { NumberBondNodeOptions } from './NumberBondNode.js';
import TotalRepresentationAccordionBox, { TotalRepresentationAccordionBoxOptions } from './TotalRepresentationAccordionBox.js';

type SelfOptions = {
  numberBondNodeOptions?: NumberBondNodeOptions;
};
type NumberBondAccordionBoxOptions = SelfOptions & StrictOmit<TotalRepresentationAccordionBoxOptions, 'titleNode'>;


export default class NumberBondAccordionBox extends TotalRepresentationAccordionBox {

  public constructor( model: NumberPairsModel, providedOptions: NumberBondAccordionBoxOptions ) {
    const accordionBoxTitleStringProperty = new DerivedProperty( [
        NumberPairsPreferences.numberModelTypeProperty,
        NumberPairsFluent.numberBondStringProperty,
        NumberPairsFluent.barModelStringProperty ],
      ( numberModelType, numberBondString, barModelString ) => {
        return numberModelType === NumberModelType.NUMBER_BOND_MODEL ? numberBondString : barModelString;
      } );
    const titleNode = new Text( accordionBoxTitleStringProperty, NumberPairsConstants.ACCORDION_BOX_TITLE_OPTIONS );

    const representationStringProperty = new DerivedProperty( [
        NumberPairsPreferences.numberModelTypeProperty,
        NumberPairsFluent.a11y.controls.numberModel.numberBondStringProperty,
        NumberPairsFluent.a11y.controls.numberModel.barModelStringProperty ],
      ( numberModelType, numberBondString, barModelString ) => {
        return numberModelType === NumberModelType.NUMBER_BOND_MODEL ? numberBondString : barModelString;
      } );

    const numberBondAccessibleParagraphProperty = NumberPairsFluent.a11y.controls.numberModel.numberBondAccessibleParagraph.createProperty( {
      left: model.leftAddendProperty,
      right: model.rightAddendProperty,
      total: model.totalProperty
    } );
    const proportionStringProperty = new DerivedProperty( [ model.leftAddendProperty, model.rightAddendProperty, model.totalProperty,
        NumberPairsFluent.a11y.controls.numberModel.largerAndSmallerStringProperty,
        NumberPairsFluent.a11y.controls.numberModel.smallerAndLargerStringProperty,
        NumberPairsFluent.a11y.controls.numberModel.equalStringProperty ],
      ( left, right, total, largerAndSmaller, smallerAndLarger, equal ) => {
        return left === right ? equal : left > right ? largerAndSmaller : smallerAndLarger;
      } );
    const barModelAccessibleParagraphProperty = NumberPairsFluent.a11y.controls.numberModel.barModelAccessibleParagraph.createProperty( {
      left: model.leftAddendProperty,
      right: model.rightAddendProperty,
      total: model.totalProperty,
      proportion: proportionStringProperty
    } );
    const accessibleParagraphStringProperty = new DerivedProperty( [
        NumberPairsPreferences.numberModelTypeProperty,
        numberBondAccessibleParagraphProperty,
        barModelAccessibleParagraphProperty ],
      ( numberModelType, numberBondParagraph, barModelParagraph ) => {
        return numberModelType === NumberModelType.NUMBER_BOND_MODEL ? numberBondParagraph : barModelParagraph;
      } );
    const options = optionize<NumberBondAccordionBoxOptions, SelfOptions, TotalRepresentationAccordionBoxOptions>()( {
      numberBondNodeOptions: {},
      titleNode: titleNode,
      titleXSpacing: 10,
      contentXSpacing: 0,
      contentYSpacing: 0,
      showTitleWhenExpanded: true,
      accessibleHelpText: NumberPairsFluent.a11y.controls.numberModel.accessibleHelpText.createProperty( {
        representation: representationStringProperty
      } ),
      accessibleParagraph: accessibleParagraphStringProperty,
      fill: NumberPairsColors.numberBondAccordionBoxBackgroundColorProperty
    }, providedOptions );

    const numberBondOptions = combineOptions<NumberBondNodeOptions>( {
      visibleProperty: DerivedProperty.valueEqualsConstant( NumberPairsPreferences.numberModelTypeProperty, NumberModelType.NUMBER_BOND_MODEL )
    }, options.numberBondNodeOptions );
    const numberBondNode = new NumberBondMutableNode( model, numberBondOptions );
    const barModelNode = new BarModelNode( model, {
      totalOnTopProperty: options.numberBondNodeOptions.totalOnTopProperty, // It should match the number bond
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