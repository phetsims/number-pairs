// Copyright 2024, University of Colorado Boulder

/**
 * IntroScreenView is the top-level view for the 'Intro' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import numberPairs from '../../numberPairs.js';
import IntroModel from '../model/IntroModel.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberSentenceAccordionBox from '../../common/view/NumberSentenceAccordionBox.js';
import { AlignBox } from '../../../../scenery/js/imports.js';
import NumberBondAccordionBox from '../../common/view/NumberBondAccordionBox.js';

type SelfOptions = {
  //TODO add options that are specific to IntroScreenView here
};

type IntroScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class IntroScreenView extends ScreenView {

  public constructor( model: IntroModel, providedOptions: IntroScreenViewOptions ) {

    const options = optionize<IntroScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
      //TODO add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );

    const numberSentenceAlignBox = new AlignBox( new NumberSentenceAccordionBox( model ), {
      alignBounds: this.layoutBounds.dilatedX( -NumberPairsConstants.COUNTING_AREA_X_MARGIN ),
      yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      yAlign: 'top',
      xAlign: 'left'
    } );
    const numberBondAlignBox = new AlignBox( new NumberBondAccordionBox( model ), {
      alignBounds: this.layoutBounds.dilatedX( NumberPairsConstants.COUNTING_AREA_X_MARGIN ),
      yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      yAlign: 'top',
      xAlign: 'center'
    } );

    this.addChild( numberSentenceAlignBox );
    this.addChild( numberBondAlignBox );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    //TODO
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