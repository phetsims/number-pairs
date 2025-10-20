// Copyright 2024-2025, University of Colorado Boulder

/**
 * TenScreenView is the top-level view for the 'Ten' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import DecompositionScreenView, { DecompositionScreenViewOptions } from '../../common/view/DecompositionScreenView.js';
import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import NumberBondAccordionBox from '../../common/view/NumberBondAccordionBox.js';
import IntroScreenSummaryContent from '../../intro/view/IntroScreenSummaryContent.js';
import numberPairsUtteranceQueue from '../../common/view/numberPairsUtteranceQueue.js';
import PhraseAccordionBox from '../../common/view/PhraseAccordionBox.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import TenModel from '../model/TenModel.js';

type SelfOptions = EmptySelfOptions;
type TenScreenViewOptions = SelfOptions & StrictOmit<DecompositionScreenViewOptions, 'phraseAccordionBox' | 'numberBondAccordionBox' | 'sceneRange' | 'screenSummaryContent'>
  & PickRequired<DecompositionScreenViewOptions, 'tandem'>;

export default class TenScreenView extends DecompositionScreenView {

  public constructor( model: TenModel, providedOptions: TenScreenViewOptions ) {

    const options = optionize<TenScreenViewOptions, SelfOptions, DecompositionScreenViewOptions>()( {
      phraseAccordionBox: new PhraseAccordionBox( model, {
        phraseStringProperty: NumberPairsFluent.decompositionPhrasePatternStringProperty,
        phraseSpeechStringProperty: NumberPairsFluent.decompositionPhraseSpeechPatternStringProperty,
        speechDataProperty: numberPairsUtteranceQueue.tenScreenSpeechDataProperty,
        tandem: providedOptions.tandem.createTandem( 'phraseAccordionBox' )
      } ),
      numberBondAccordionBox: new NumberBondAccordionBox( model, {
        tandem: providedOptions.tandem.createTandem( 'numberBondAccordionBox' )
      } ),
      equationAccordionBox: new EquationAccordionBox( model, {
        totalColorProperty: model.totalColorProperty,
        leftAddendColorProperty: model.leftAddendColorProperty,
        rightAddendColorProperty: model.rightAddendColorProperty,
        tandem: providedOptions.tandem.createTandem( 'equationAccordionBox' )
      } ),
      sceneRange: NumberPairsConstants.TEN_TOTAL_RANGE,
      screenSummaryContent: new IntroScreenSummaryContent( model )
    }, providedOptions );

    super( model, options );
  }
}

numberPairs.register( 'TenScreenView', TenScreenView );