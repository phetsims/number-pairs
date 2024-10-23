// Copyright 2024, University of Colorado Boulder

/**
 * IntroScreenView is the top-level view for the 'Intro' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import IntroModel from '../model/IntroModel.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberSentenceAccordionBox from '../../common/view/NumberSentenceAccordionBox.js';
import NumberBondAccordionBox from '../../common/view/NumberBondAccordionBox.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import DecompositionScreenView, { DecompositionScreenViewOptions } from '../../common/view/DecompositionScreenView.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';

type SelfOptions = {
  //TODO add options that are specific to IntroScreenView here
};

type IntroScreenViewOptions = SelfOptions & StrictOmit<DecompositionScreenViewOptions, 'numberSentenceContent' | 'numberBondContent' | 'sceneRange'>
  & PickRequired<DecompositionScreenViewOptions, 'tandem'>;


export default class IntroScreenView extends DecompositionScreenView {

  public constructor( model: IntroModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, DecompositionScreenViewOptions>()( {
      numberSentenceContent: new NumberSentenceAccordionBox( model, {
        numberSentenceStringProperty: NumberPairsStrings.decompositionNumberSentencePatternStringProperty,
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

numberPairs.register( 'IntroScreenView', IntroScreenView );