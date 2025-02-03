// Copyright 2024-2025, University of Colorado Boulder
/**
 * DecompositionScreenView is the base class for the Intro, Ten, and Twenty Screens in the Number Pairs simulation.
 * It adds a radio button group that allows users to pick the total they want to interact with.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import Range from '../../../../dot/js/Range.js';
import { AlignBox, Node } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import DecompositionModel from '../model/DecompositionModel.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import NumberPairsScreenView, { NumberPairsScreenViewOptions } from './NumberPairsScreenView.js';
import SceneSelectionRadioButtonGroup from './SceneSelectionRadioButtonGroup.js';

type SelfOptions = {
  sceneRange: Range;
};

export type DecompositionScreenViewOptions = NumberPairsScreenViewOptions & SelfOptions;
export default class DecompositionScreenView extends NumberPairsScreenView {

  protected constructor( model: DecompositionModel, providedOptions: DecompositionScreenViewOptions ) {
    super( model, providedOptions );

    // Add the total radio button group if the scene range is provided. Each radio button represents a total value
    // that is associated with a scene state.
    const sceneSelectionRadioButtonGroup = new SceneSelectionRadioButtonGroup( model.selectedSceneProperty, model.scenes, {
      sceneRange: providedOptions.sceneRange,
      radioButtonOptions: {
        baseColor: model.totalColorProperty
      },
      tandem: providedOptions.tandem.createTandem( 'sceneSelectionRadioButtonGroup' )
    } );
    model.changingScenesProperty.link( changingScenes => {
      changingScenes && this.interruptSubtreeInput();
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

    this.numberPairsSetPDOMOrder( sceneSelectionRadioButtonGroup );
  }

  /**
   * Set the traversal order for the screen.
   * @param totalInteractionNode
   */
  private numberPairsSetPDOMOrder( totalInteractionNode: Node ): void {
    this.pdomPlayAreaNode.setPDOMOrder( [
        ...this.representationNodes,
        this.representationRadioButtonGroup,
        this.countingAreaButtonsVBox,
        ...this.countingAreaNodes
      ]
    );

    this.pdomControlAreaNode.setPDOMOrder( [
      ...this.controlNodes,
      totalInteractionNode,
      this.resetAllButton
    ] );
  }
}

numberPairs.register( 'DecompositionScreenView', DecompositionScreenView );