// Copyright 2024, University of Colorado Boulder

/**
 * TenScreenView is the top-level view for the 'Ten' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import TenModel from '../model/TenModel.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberSentenceAccordionBox from '../../common/view/NumberSentenceAccordionBox.js';
import NumberBondAccordionBox from '../../common/view/NumberBondAccordionBox.js';
import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import DecompositionScreenView, { DecompositionScreenViewOptions } from '../../common/view/DecompositionScreenView.js';

type SelfOptions = {
  //TODO add options that are specific to TenScreenView here
};

type TenScreenViewOptions = SelfOptions & StrictOmit<DecompositionScreenViewOptions, 'numberSentenceContent' | 'numberBondContent' | 'sceneRange'>
  & PickRequired<DecompositionScreenViewOptions, 'tandem'>;

export default class TenScreenView extends DecompositionScreenView {

  public constructor( model: TenModel, providedOptions: TenScreenViewOptions ) {

    const options = optionize<TenScreenViewOptions, SelfOptions, DecompositionScreenViewOptions>()( {
      numberSentenceContent: new NumberSentenceAccordionBox( model, {
        tandem: providedOptions.tandem.createTandem( 'numberSentenceAccordionBox' )
      } ),
      numberBondContent: new NumberBondAccordionBox( model, {
        numberBondNodeOptions: {
          totalColorProperty: model.totalColorProperty,
          leftAddendColorProperty: model.leftAddendColorProperty,
          rightAddendColorProperty: model.rightAddendColorProperty
        },
        tandem: providedOptions.tandem.createTandem( 'numberBondAccordionBox' )
      } ),
      equationContent: new EquationAccordionBox( model, {
        totalColorProperty: model.totalColorProperty,
        leftAddendColorProperty: model.leftAddendColorProperty,
        rightAddendColorProperty: model.rightAddendColorProperty,
        tandem: providedOptions.tandem.createTandem( 'equationAccordionBox' )
      } ),
      sceneRange: NumberPairsConstants.TEN_TOTAL_RANGE
    }, providedOptions );

    super( model, options );
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