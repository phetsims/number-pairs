// Copyright 2024, University of Colorado Boulder

/**
 * SumScreenView is the top-level view for the 'Sum' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import SumModel from '../model/SumModel.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberPairsScreenView, { NumberPairsScreenViewOptions } from '../../common/view/NumberPairsScreenView.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberSentenceAccordionBox from '../../common/view/NumberSentenceAccordionBox.js';
import NumberBondAccordionBox from '../../common/view/NumberBondAccordionBox.js';
import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';

type SelfOptions = {
  //TODO add options that are specific to SumScreenView here
};

type SumScreenViewOptions = SelfOptions & StrictOmit<NumberPairsScreenViewOptions, 'numberSentenceContent' | 'numberBondContent'>
  & PickRequired<NumberPairsScreenViewOptions, 'tandem'>;
export default class SumScreenView extends NumberPairsScreenView {

  public constructor( model: SumModel, providedOptions: SumScreenViewOptions ) {

    const options = optionize<SumScreenViewOptions, SelfOptions, NumberPairsScreenViewOptions>()( {
      numberSentenceContent: new NumberSentenceAccordionBox( model, {
        tandem: providedOptions.tandem.createTandem( 'numberSentenceAccordionBox' )
      } ),
      numberBondContent: new NumberBondAccordionBox( model, {
        numberBondNodeOptions: {
          sumColorProperty: NumberPairsColors.numberLineSumColorProperty,
          leftAddendColorProperty: NumberPairsColors.numberLineLeftAddendColorProperty,
          rightAddendColorProperty: NumberPairsColors.numberLineRightAddendColorProperty,
          sumOnTop: false
        },
        tandem: providedOptions.tandem.createTandem( 'numberBondAccordionBox' )
      } ),
      equationContent: new EquationAccordionBox( model, {
        sumColorProperty: NumberPairsColors.numberLineSumColorProperty,
        leftAddendColorProperty: NumberPairsColors.numberLineLeftAddendColorProperty,
        rightAddendColorProperty: NumberPairsColors.numberLineRightAddendColorProperty,
        addendsOnRight: false,
        tandem: providedOptions.tandem.createTandem( 'equationAccordionBox' )
      } )
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

numberPairs.register( 'SumScreenView', SumScreenView );