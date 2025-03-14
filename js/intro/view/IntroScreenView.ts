// Copyright 2024-2025, University of Colorado Boulder

/**
 * IntroScreenView is the top-level view for the 'Intro' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import DecompositionScreenView, { DecompositionScreenViewOptions } from '../../common/view/DecompositionScreenView.js';
import NumberBondAccordionBox from '../../common/view/NumberBondAccordionBox.js';
import PhraseAccordionBox from '../../common/view/PhraseAccordionBox.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import IntroModel from '../model/IntroModel.js';
import numberPairsUtteranceQueue from '../../common/view/numberPairsUtteranceQueue.js';

type SelfOptions = {
  //TODO add options that are specific to IntroScreenView here
};

type IntroScreenViewOptions = SelfOptions & StrictOmit<DecompositionScreenViewOptions, 'phraseAccordionBox' | 'numberBondAccordionBox' | 'sceneRange'>
  & PickRequired<DecompositionScreenViewOptions, 'tandem'>;


export default class IntroScreenView extends DecompositionScreenView {

  public constructor( model: IntroModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, DecompositionScreenViewOptions>()( {
      phraseAccordionBox: new PhraseAccordionBox( model, {
        phraseStringProperty: NumberPairsStrings.decompositionPhrasePatternStringProperty,
        phraseSpeechStringProperty: NumberPairsStrings.decompositionPhraseSpeechPatternStringProperty,
        speechDataProperty: numberPairsUtteranceQueue.introScreenSpeechDataProperty,
        tandem: providedOptions.tandem.createTandem( 'phraseAccordionBox' )
      } ),
      numberBondAccordionBox: new NumberBondAccordionBox( model, {
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