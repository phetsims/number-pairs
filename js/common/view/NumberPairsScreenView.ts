// Copyright 2024, University of Colorado Boulder
/**
 * The base screen view for the Intro, Ten, Twenty, and Sum Screens in the Number Pairs simulation.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import numberPairs from '../../numberPairs.js';
import { AlignBox, Node } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import NumberPairsModel from '../model/NumberPairsModel.js';


type SelfOptions = {
  numberSentenceContent: Node;
  numberBondContent: Node;
  equationContent?: Node | null;
};
export type NumberPairsScreenViewOptions = SelfOptions & ScreenViewOptions;
export default class NumberPairsScreenView extends ScreenView {

  public constructor( model: NumberPairsModel, providedOptions: NumberPairsScreenViewOptions ) {
    const options = optionize<NumberPairsScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
      equationContent: null
    }, providedOptions );
    super( options );

    const numberSentenceAlignBox = new AlignBox( options.numberSentenceContent, {
      alignBounds: this.layoutBounds.dilatedX( -NumberPairsConstants.COUNTING_AREA_X_MARGIN ),
      yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      yAlign: 'top',
      xAlign: 'left'
    } );
    const numberBondAlignBox = new AlignBox( options.numberBondContent, {
      alignBounds: this.layoutBounds.dilatedX( NumberPairsConstants.COUNTING_AREA_X_MARGIN ),
      yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      yAlign: 'top',
      xAlign: 'center'
    } );

    if ( options.equationContent ) {
      const equationAlignBox = new AlignBox( options.equationContent, {
        alignBounds: this.layoutBounds.dilatedX( -NumberPairsConstants.COUNTING_AREA_X_MARGIN ),
        yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
        yAlign: 'top',
        xAlign: 'right'
      } );
      this.addChild( equationAlignBox );
    }
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
}

numberPairs.register( 'NumberPairsScreenView', NumberPairsScreenView );