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
import Range from '../../../../dot/js/Range.js';
import TotalRadioButtonGroup from './TotalRadioButtonGroup.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import NumberPairsModel from '../model/NumberPairsModel.js';


type SelfOptions = {
  numberSentenceContent: Node;
  numberBondContent: Node;
  countingRepresentationContent: Node;
  equationContent?: Node | null;
  sceneRange?: Range | null;
};
export type NumberPairsScreenViewOptions = SelfOptions & ScreenViewOptions;

const COUNTING_AREA_Y_MARGIN = 15; // empirically determined
export default class NumberPairsScreenView extends ScreenView {

  protected readonly countingAreaBounds: Bounds2;

  public constructor( model: NumberPairsModel, providedOptions: NumberPairsScreenViewOptions ) {
    const options = optionize<NumberPairsScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
      equationContent: null,
      sceneRange: null,
      children: [ providedOptions.countingRepresentationContent ]
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
    this.addChild( numberSentenceAlignBox );
    this.addChild( numberBondAlignBox );

    if ( options.equationContent ) {
      const equationAlignBox = new AlignBox( options.equationContent, {
        alignBounds: this.layoutBounds.dilatedX( -NumberPairsConstants.COUNTING_AREA_X_MARGIN ),
        yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
        yAlign: 'top',
        xAlign: 'right'
      } );
      this.addChild( equationAlignBox );
    }

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

    // Add the total radio button group if the scene range is provided. Each radio button represents a total value
    // that is associated with a scene state.
    if ( options.sceneRange ) {
      const totalRadioButtonGroup = new TotalRadioButtonGroup( model.totalNumberProperty, {
        sceneRange: options.sceneRange
      } );

      // Sum radio buttons should be center aligned vertically above the reset all button.
      const totalSelectorAlignBox = new AlignBox( totalRadioButtonGroup, {
        alignBounds: this.layoutBounds.withOffsets( 0, 0, 0, -resetAllButton.height - NumberPairsConstants.SCREEN_VIEW_Y_MARGIN ),
        yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
        xMargin: NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
        yAlign: 'center',
        xAlign: 'right'
      } );

      this.addChild( totalSelectorAlignBox );
    }

    const countingAreaMinX = this.layoutBounds.minX + NumberPairsConstants.COUNTING_AREA_X_MARGIN;
    const countingAreaMinY = this.layoutBounds.minY + NumberPairsConstants.SCREEN_VIEW_Y_MARGIN
                             + options.numberBondContent.bounds.height + COUNTING_AREA_Y_MARGIN;
    const countingAreaMaxX = this.layoutBounds.maxX - NumberPairsConstants.COUNTING_AREA_X_MARGIN;
    const countingAreaMaxY = countingAreaMinY + 340; // empirically determined
    this.countingAreaBounds = new Bounds2( countingAreaMinX, countingAreaMinY,
      countingAreaMaxX, countingAreaMaxY );

    // Position the counting representation radio buttons below the counting area.
    options.countingRepresentationContent.centerTop = new Vector2( this.countingAreaBounds.centerX, this.countingAreaBounds.maxY + COUNTING_AREA_Y_MARGIN );
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    //TODO
  }
}

numberPairs.register( 'NumberPairsScreenView', NumberPairsScreenView );