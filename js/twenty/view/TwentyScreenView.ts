// Copyright 2024-2025, University of Colorado Boulder

/**
 * TwentyScreenView is the top-level view for the 'Twenty' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import DecompositionScreenView, { DecompositionScreenViewOptions } from '../../common/view/DecompositionScreenView.js';
import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import NumberBondAccordionBox from '../../common/view/NumberBondAccordionBox.js';
import NumberPhraseAccordionBox from '../../common/view/NumberPhraseAccordionBox.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import TwentyModel from '../model/TwentyModel.js';
import numberPairsUtteranceQueue from '../../common/view/numberPairsUtteranceQueue.js';

type SelfOptions = {
  //TODO add options that are specific to TwentyScreenView here
};

type TwentyScreenViewOptions = SelfOptions & StrictOmit<DecompositionScreenViewOptions, 'numberPhraseContent' | 'numberBondContent' | 'sceneRange'>
  & PickRequired<DecompositionScreenViewOptions, 'tandem'>;

export default class TwentyScreenView extends DecompositionScreenView {

  public constructor( model: TwentyModel, providedOptions: TwentyScreenViewOptions ) {

    const options = optionize<TwentyScreenViewOptions, SelfOptions, DecompositionScreenViewOptions>()( {
      numberPhraseContent: new NumberPhraseAccordionBox( model, {
        numberPhraseStringProperty: NumberPairsStrings.decompositionNumberPhrasePatternStringProperty,
        numberPhraseSpeechStringProperty: NumberPairsStrings.decompositionNumberPhraseSpeechPatternStringProperty,
        speechDataProperty: numberPairsUtteranceQueue.twentyScreenSpeechDataProperty,
        tandem: providedOptions.tandem.createTandem( 'numberPhraseAccordionBox' )
      } ),
      numberBondContent: new NumberBondAccordionBox( model, {
        tandem: providedOptions.tandem.createTandem( 'numberBondAccordionBox' )
      } ),
      equationContent: new EquationAccordionBox( model, {
        totalColorProperty: model.totalColorProperty,
        leftAddendColorProperty: model.leftAddendColorProperty,
        rightAddendColorProperty: model.rightAddendColorProperty,
        tandem: providedOptions.tandem.createTandem( 'equationAccordionBox' )
      } ),
      sceneRange: NumberPairsConstants.TWENTY_TOTAL_RANGE
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

numberPairs.register( 'TwentyScreenView', TwentyScreenView );