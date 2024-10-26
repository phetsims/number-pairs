// Copyright 2024, University of Colorado Boulder
/**
 * DecompositionScreenView is the base class for the Intro, Ten, and Twenty Screens in the Number Pairs simulation.
 * It adds a radio button group that allows users to pick the total they want to interact with.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import NumberPairsScreenView, { NumberPairsScreenViewOptions } from './NumberPairsScreenView.js';
import numberPairs from '../../numberPairs.js';
import DecompositionModel from '../model/DecompositionModel.js';
import SceneSelectionRadioButtonGroup from './SceneSelectionRadioButtonGroup.js';
import { AlignBox } from '../../../../scenery/js/imports.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import Range from '../../../../dot/js/Range.js';

type SelfOptions = {
  sceneRange: Range;
};

export type DecompositionScreenViewOptions = NumberPairsScreenViewOptions & SelfOptions;
export default class DecompositionScreenView extends NumberPairsScreenView {

  protected constructor( model: DecompositionModel, providedOptions: DecompositionScreenViewOptions ) {
    super( model, providedOptions );

    // Add the total radio button group if the scene range is provided. Each radio button represents a total value
    // that is associated with a scene state.
    const sceneSelectionRadioButtonGroup = new SceneSelectionRadioButtonGroup( model.selectedSceneModelProperty, model.sceneModels, {
      sceneRange: providedOptions.sceneRange,
      tandem: providedOptions.tandem.createTandem( 'sceneSelectionRadioButtonGroup' )
    } );

    // Sum radio buttons should be center aligned vertically above the reset all button.
    const totalSelectorAlignBox = new AlignBox( sceneSelectionRadioButtonGroup, {
      alignBounds: this.layoutBounds.withOffsets( 0, 0, 0, -this.resetAllButton.height - NumberPairsConstants.SCREEN_VIEW_Y_MARGIN ),
      yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      xMargin: NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      yAlign: 'center',
      xAlign: 'right'
    } );

    this.addChild( totalSelectorAlignBox );
  }
}

numberPairs.register( 'DecompositionScreenView', DecompositionScreenView );