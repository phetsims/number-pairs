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
import NumberPairsScreenView, { NumberPairsScreenViewOptions } from '../../common/view/NumberPairsScreenView.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import SplitCountingAreaNode from './SplitCountingAreaNode.js';

type SelfOptions = {
  //TODO add options that are specific to IntroScreenView here
};

type IntroScreenViewOptions = SelfOptions & StrictOmit<NumberPairsScreenViewOptions, 'numberSentenceContent' | 'numberBondContent'>
  & PickRequired<NumberPairsScreenViewOptions, 'tandem'>;


export default class IntroScreenView extends NumberPairsScreenView {

  public constructor( model: IntroModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, NumberPairsScreenViewOptions>()( {
      numberSentenceContent: new NumberSentenceAccordionBox( model, {
        tandem: providedOptions.tandem.createTandem( 'numberSentenceAccordionBox' )
      } ),
      numberBondContent: new NumberBondAccordionBox( model, {
        numberBondNodeOptions: {
          sumColorProperty: NumberPairsColors.locationSumColorProperty,
          leftAddendColorProperty: NumberPairsColors.locationLeftAddendColorProperty,
          rightAddendColorProperty: NumberPairsColors.locationRightAddendColorProperty
        },
        tandem: providedOptions.tandem.createTandem( 'numberBondAccordionBox' )
      } ),
      sceneRange: NumberPairsConstants.TEN_SCENE_RANGE
    }, providedOptions );

    super( model, options );

    const countingAreaBackgroundNode = new SplitCountingAreaNode( this.countingAreaBounds );
    this.addChild( countingAreaBackgroundNode );
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