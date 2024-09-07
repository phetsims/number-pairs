// Copyright 2024, University of Colorado Boulder

/**
 * TenScreenView is the top-level view for the 'Ten' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import TenModel from '../model/TenModel.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberPairsScreenView, { NumberPairsScreenViewOptions } from '../../common/view/NumberPairsScreenView.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberSentenceAccordionBox from '../../common/view/NumberSentenceAccordionBox.js';
import NumberBondAccordionBox from '../../common/view/NumberBondAccordionBox.js';
import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import CountingAreaNode from '../../common/view/CountingAreaNode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type SelfOptions = {
  //TODO add options that are specific to TenScreenView here
};

type TenScreenViewOptions = SelfOptions & StrictOmit<NumberPairsScreenViewOptions, 'numberSentenceContent' | 'numberBondContent'>
  & PickRequired<NumberPairsScreenViewOptions, 'tandem'>;

export default class TenScreenView extends NumberPairsScreenView {

  public constructor( model: TenModel, providedOptions: TenScreenViewOptions ) {

    const options = optionize<TenScreenViewOptions, SelfOptions, NumberPairsScreenViewOptions>()( {
      numberSentenceContent: new NumberSentenceAccordionBox( model, {
        tandem: providedOptions.tandem.createTandem( 'numberSentenceAccordionBox' )
      } ),
      numberBondContent: new NumberBondAccordionBox( model, {
        numberBondNodeOptions: {
          sumColorProperty: NumberPairsColors.attributeSumColorProperty,
          leftAddendColorProperty: NumberPairsColors.attributeLeftAddendColorProperty,
          rightAddendColorProperty: NumberPairsColors.attributeRightAddendColorProperty
        },
        tandem: providedOptions.tandem.createTandem( 'numberBondAccordionBox' )
      } ),
      equationContent: new EquationAccordionBox( model, {
        sumColorProperty: NumberPairsColors.attributeSumColorProperty,
        leftAddendColorProperty: NumberPairsColors.attributeLeftAddendColorProperty,
        rightAddendColorProperty: NumberPairsColors.attributeRightAddendColorProperty,
        tandem: providedOptions.tandem.createTandem( 'equationAccordionBox' )
      } ),
      sceneRange: NumberPairsConstants.TEN_SCENE_RANGE
    }, providedOptions );

    super( model, options );

    const backgroundColorProperty = new DerivedProperty( [ model.countingRepresentationTypeProperty ], countingRepresentation => {
      return countingRepresentation.sumColor;
    } );
    const countingArea = new CountingAreaNode( this.countingAreaBounds, {
      backgroundColorProperty: backgroundColorProperty
    } );
    this.addChild( countingArea );

  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    //TODO
  }
}

numberPairs.register( 'TenScreenView', TenScreenView );