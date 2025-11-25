// Copyright 2025, University of Colorado Boulder
/**
 * NumberBondMutableNode renders a number bond using NumberCircle nodes with values and visibility.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import SumModel from '../../sum/model/SumModel.js';
import NumberPairsPreferences from '../model/NumberPairsPreferences.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import Description from './description/Description.js';
import NumberBondNode, { DEFAULT_BOND_DIMENSION, NUMBER_BOND_LINE_WIDTH, NumberBondDimensions, NumberBondNodeOptions } from './NumberBondNode.js';
import NumberCircle from './NumberCircle.js';

type SelfOptions = {
  dimensions?: NumberBondDimensions; //REVIEW Document
  missingNumberStringProperty?: TReadOnlyProperty<string>;
};

export type NumberBondMutableNodeOptions = SelfOptions & StrictOmit<NumberBondNodeOptions, 'accessibleParagraph'>;

export default class NumberBondMutableNode extends NumberBondNode {

  //REVIEW Document fields.
  //REVIEW Uses of total, leftAddend, rightAddend are a bit confusing because they look like model elements. Consider adding a 'Node' suffix.
  protected readonly total: NumberCircle;
  protected readonly leftAddend: NumberCircle;
  protected readonly rightAddend: NumberCircle;

  public constructor( model: TGenericNumberPairsModel, providedOptions?: NumberBondMutableNodeOptions ) {
    const options = optionize<NumberBondMutableNodeOptions, SelfOptions, NumberBondNodeOptions>()( {
      dimensions: DEFAULT_BOND_DIMENSION,
      missingNumberStringProperty: NumberPairsFluent.aNumberStringProperty,
      accessibleParagraph: NumberPairsFluent.a11y.controls.numberModel.numberBondAccessibleParagraph.createProperty( {
        orientation: model instanceof SumModel ? NumberPairsPreferences.sumScreenTotalOnTopProperty.derived(
          isTotalOnTop => isTotalOnTop ? 'totalOnTop' : 'totalOnBottom' ) : 'totalOnTop'
      } )
    }, providedOptions );

    const total = new NumberCircle( model.totalProperty, model.totalVisibleProperty, {
      radius: options.dimensions.circleRadius,
      fontSize: options.dimensions.fontSize,
      fill: model.totalColorProperty,
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );
    const leftAddend = new NumberCircle( model.leftAddendProperty, model.leftAddendVisibleProperty, {
      radius: options.dimensions.circleRadius,
      fontSize: options.dimensions.fontSize,
      fill: model.leftAddendColorProperty,
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );
    const rightAddend = new NumberCircle( model.rightAddendProperty, model.rightAddendVisibleProperty, {
      radius: options.dimensions.circleRadius,
      fontSize: options.dimensions.fontSize,
      fill: model.rightAddendColorProperty,
      lineWidth: NUMBER_BOND_LINE_WIDTH
    } );

    super( total, leftAddend, rightAddend, options.dimensions, options );

    // Expose typed references for clients that need them
    this.total = total;
    this.leftAddend = leftAddend;
    this.rightAddend = rightAddend;

    this.addChild( new Node( {
      accessibleParagraph: NumberPairsFluent.a11y.controls.numberModel.numberBondStateAccessibleParagraph.createProperty( {
        left: Description.getValueStringProperty( model.leftAddendProperty, model.leftAddendVisibleProperty, options.missingNumberStringProperty ),
        right: Description.getValueStringProperty( model.rightAddendProperty, model.rightAddendVisibleProperty, options.missingNumberStringProperty ),
        total: Description.getValueStringProperty( model.totalProperty, model.totalVisibleProperty, options.missingNumberStringProperty ),
        orientation: model instanceof SumModel ? NumberPairsPreferences.sumScreenTotalOnTopProperty.derived(
          isTotalOnTop => isTotalOnTop ? 'totalOnTop' : 'totalOnBottom' ) : 'totalOnTop'
      } )
    } ) );

  }
}

numberPairs.register( 'NumberBondMutableNode', NumberBondMutableNode );
