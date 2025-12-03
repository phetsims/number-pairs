// Copyright 2025, University of Colorado Boulder
/**
 * NumberBondMutableNode renders a number bond using NumberCircle nodes with values and visibility.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import SumModel from '../../sum/model/SumModel.js';
import NumberPairsPreferences from '../model/NumberPairsPreferences.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';
import Description from './description/Description.js';
import NumberBondNode, { DEFAULT_BOND_DIMENSION, NUMBER_BOND_LINE_WIDTH, NumberBondNodeOptions } from './NumberBondNode.js';
import NumberCircle from './NumberCircle.js';

type SelfOptions = {

  // Indicates whether this number bond is being used in the game screen, which affects the a11y description
  isGameScreen?: boolean;

  // option to pass the line width for all of the circle nodes in the number bond.
  numberCircleLineWidth?: number;
};

export type NumberBondMutableNodeOptions = SelfOptions & StrictOmit<NumberBondNodeOptions, 'accessibleParagraph'>;

export default class NumberBondMutableNode extends NumberBondNode {

  /**
   * The NumberCircle node that displays the total value in the number bond.
   * Protected to allow subclasses like GameNumberBondNode to access and modify styling properties.
   */
  protected readonly totalNode: NumberCircle;

  /**
   * The NumberCircle node that displays the left addend value in the number bond.
   * Protected to allow subclasses like GameNumberBondNode to access and modify styling properties.
   */
  protected readonly leftAddendNode: NumberCircle;

  /**
   * The NumberCircle node that displays the right addend value in the number bond.
   * Protected to allow subclasses like GameNumberBondNode to access and modify styling properties.
   */
  protected readonly rightAddendNode: NumberCircle;

  public constructor( model: TGenericNumberPairsModel, providedOptions?: NumberBondMutableNodeOptions ) {
    const options = optionize<NumberBondMutableNodeOptions, SelfOptions, WithRequired<NumberBondNodeOptions, 'dimensions'>>()( {
      dimensions: DEFAULT_BOND_DIMENSION,
      numberCircleLineWidth: NUMBER_BOND_LINE_WIDTH,
      isGameScreen: false,
      accessibleParagraph: NumberPairsFluent.a11y.controls.numberModel.numberBondAccessibleParagraph.createProperty( {
        orientation: model instanceof SumModel ? NumberPairsPreferences.sumScreenTotalOnTopProperty.derived(
          isTotalOnTop => isTotalOnTop ? 'totalOnTop' : 'totalOnBottom' ) : 'totalOnTop'
      } )
    }, providedOptions );

    const total = new NumberCircle( model.totalProperty, model.totalVisibleProperty, {
      radius: options.dimensions.circleRadius,
      fontSize: options.dimensions.fontSize,
      fill: model.totalColorProperty,
      lineWidth: options.numberCircleLineWidth
    } );
    const leftAddend = new NumberCircle( model.leftAddendProperty, model.leftAddendVisibleProperty, {
      radius: options.dimensions.circleRadius,
      fontSize: options.dimensions.fontSize,
      fill: model.leftAddendColorProperty,
      lineWidth: options.numberCircleLineWidth
    } );
    const rightAddend = new NumberCircle( model.rightAddendProperty, model.rightAddendVisibleProperty, {
      radius: options.dimensions.circleRadius,
      fontSize: options.dimensions.fontSize,
      fill: model.rightAddendColorProperty,
      lineWidth: options.numberCircleLineWidth
    } );

    super( total, leftAddend, rightAddend, options );

    // Expose typed references for clients that need them
    this.totalNode = total;
    this.leftAddendNode = leftAddend;
    this.rightAddendNode = rightAddend;

    // Add an accessible paragraph that describes the number bond with its current values
    const missingStringProperties = Description.getMissingValueStringProperties( options.isGameScreen );
    this.addChild( new Node( {
      accessibleParagraph: NumberPairsFluent.a11y.controls.numberModel.numberBondStateAccessibleParagraph.createProperty( {
        left: Description.getValueStringProperty( model.leftAddendProperty, model.leftAddendVisibleProperty, missingStringProperties.leftAddendStringProperty ),
        right: Description.getValueStringProperty( model.rightAddendProperty, model.rightAddendVisibleProperty, missingStringProperties.rightAddendStringProperty ),
        total: Description.getValueStringProperty( model.totalProperty, model.totalVisibleProperty, missingStringProperties.totalStringProperty ),
        orientation: model instanceof SumModel ? NumberPairsPreferences.sumScreenTotalOnTopProperty.derived(
          isTotalOnTop => isTotalOnTop ? 'totalOnTop' : 'totalOnBottom' ) : 'totalOnTop'
      } )
    } ) );

  }
}

numberPairs.register( 'NumberBondMutableNode', NumberBondMutableNode );
