// Copyright 2024-2025, University of Colorado Boulder
/**
 * This accordion box displays an equation that represents the decomposition of a total into two addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import NumberEquationNode from './NumberEquationNode.js';
import PhraseAccordionBox from './PhraseAccordionBox.js';
import TotalRepresentationAccordionBox, { TotalRepresentationAccordionBoxOptions } from './TotalRepresentationAccordionBox.js';

type SelfOptions = {
  addendsOnRight?: boolean;
  totalColorProperty: TReadOnlyProperty<Color>;
  leftAddendColorProperty: TReadOnlyProperty<Color>;
  rightAddendColorProperty: TReadOnlyProperty<Color>;
};
type EquationAccordionBoxOptions = SelfOptions & StrictOmit<TotalRepresentationAccordionBoxOptions, 'titleNode'>;

export default class EquationAccordionBox extends TotalRepresentationAccordionBox {

  public constructor( model: NumberPairsModel, providedOptions: EquationAccordionBoxOptions ) {

    const titleNode = new Text( NumberPairsFluent.equationStringProperty, NumberPairsConstants.ACCORDION_BOX_TITLE_OPTIONS );
    const options = optionize<EquationAccordionBoxOptions, SelfOptions, TotalRepresentationAccordionBoxOptions>()( {
      addendsOnRight: true,
      titleNode: titleNode,
      contentYMargin: 18,
      minWidth: PhraseAccordionBox.WIDTH, // Match the minWidth of the PhraseAccordionBox
      expandedDefaultValue: false,
      accessibleHelpText: NumberPairsFluent.a11y.equationAccordionBox.accessibleHelpTextStringProperty
    }, providedOptions );

    const equationNode = new NumberEquationNode( model, 40, 28, 24, {
      addendsOnRight: options.addendsOnRight,
      totalColorProperty: options.totalColorProperty,
      leftAddendColorProperty: options.leftAddendColorProperty,
      rightAddendColorProperty: options.rightAddendColorProperty
    } );

    super( equationNode, options );
  }
}

numberPairs.register( 'EquationAccordionBox', EquationAccordionBox );