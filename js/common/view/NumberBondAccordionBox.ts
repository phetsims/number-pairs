// Copyright 2024-2025, University of Colorado Boulder

/**
 * This accordion box contains a number bond that represents the decomposition of a total into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import SumModel from '../../sum/model/SumModel.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsPreferences, { NumberModelType } from '../model/NumberPairsPreferences.js';
import NumberPairsColors from '../NumberPairsColors.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import BarModelMutableNode from './BarModelMutableNode.js';
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

    // Listen for total even though the value is not used, due to listener order dependencies, make sure we updated when everything settled.
    const proportionsStringProperty = new DerivedProperty( [ model.leftAddendProperty, model.rightAddendProperty, model.totalProperty,
        NumberPairsFluent.a11y.controls.numberModel.largerAndSmallerStringProperty,
        NumberPairsFluent.a11y.controls.numberModel.smallerAndLargerStringProperty,
        NumberPairsFluent.a11y.controls.numberModel.equalStringProperty ],
      ( left, right, total, largerAndSmaller, smallerAndLarger, equal ) => {
        return left === right ? equal : left > right ? largerAndSmaller : smallerAndLarger;
      } );

    const createValueStringProperty = ( valueProperty: TReadOnlyProperty<number>, visibleProperty: TReadOnlyProperty<boolean>, stringProperty: TReadOnlyProperty<string> ) =>
     new DerivedProperty( [ valueProperty, visibleProperty, stringProperty ], ( value, visible, string ) => visible ? value.toString() : string );
    const accessibleParagraphStringProperty = NumberPairsFluent.a11y.controls.numberModel.currentNumberBondOrBarStateAccessibleParagraph.createProperty( {
      left: createValueStringProperty( model.leftAddendProperty, model.leftAddendVisibleProperty, NumberPairsFluent.aNumberStringProperty ),
      right: createValueStringProperty( model.rightAddendProperty, model.rightAddendVisibleProperty, NumberPairsFluent.anotherNumberStringProperty ),
      total: createValueStringProperty( model.totalProperty, model.totalVisibleProperty, NumberPairsFluent.aNumberStringProperty ),
      proportions: proportionsStringProperty,
      screenType: model instanceof SumModel ? 'sumScreen' : 'other',
      totalView: model.totalVisibleProperty.derived( totalVisible => totalVisible ? 'shown' : 'hidden' ),
      barOrBondOrEquation: NumberPairsPreferences.numberModelTypeProperty.derived( numberModelType => numberModelType.id )
    } );

    const options = optionize<NumberBondAccordionBoxOptions, SelfOptions, TotalRepresentationAccordionBoxOptions>()( {
      numberBondNodeOptions: {},
      titleNode: titleNode,
      titleXSpacing: 10,
      contentXSpacing: 0,
      contentYSpacing: 0,
      showTitleWhenExpanded: true,
      accessibleHelpTextCollapsed: NumberPairsFluent.a11y.controls.numberModel.accessibleHelpText.createProperty( {
        numberModelType: NumberPairsPreferences.numberModelTypeProperty.derived( numberModelType => numberModelType.id )
      } ),
      fill: NumberPairsColors.numberBondAccordionBoxBackgroundColorProperty
    }, providedOptions );

    // Create the number bond number model representation.
    const numberBondOptions = combineOptions<NumberBondNodeOptions>( {
      visibleProperty: DerivedProperty.valueEqualsConstant( NumberPairsPreferences.numberModelTypeProperty, NumberModelType.NUMBER_BOND_MODEL ),
      accessibleParagraph: NumberPairsFluent.a11y.controls.numberModel.numberBondAccessibleParagraph.createProperty( {
        screenType: model instanceof SumModel ? 'sumScreen' : 'other'
      } )
    }, options.numberBondNodeOptions );
    const numberBondNode = new NumberBondMutableNode( model, numberBondOptions );

    // Create the bar model number model representation.
    const barModelNode = new BarModelMutableNode( model, {
      totalOnTopProperty: options.numberBondNodeOptions.totalOnTopProperty, // It should match the number bond
      visibleProperty: DerivedProperty.valueEqualsConstant( NumberPairsPreferences.numberModelTypeProperty, NumberModelType.BAR_MODEL ),
      accessibleParagraph: NumberPairsFluent.a11y.controls.numberModel.barModelAccessibleParagraph.createProperty( {
        screenType: model instanceof SumModel ? 'sumScreen' : 'other'
      } )
    } );
    const contentNode = new Node( {
      children: [ new Node( {
        accessibleParagraph: accessibleParagraphStringProperty
      } ), numberBondNode, barModelNode ],
      excludeInvisibleChildrenFromBounds: true
    } );
    super( contentNode, options );
  }
}

numberPairs.register( 'NumberBondAccordionBox', NumberBondAccordionBox );