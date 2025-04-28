// Copyright 2024-2025, University of Colorado Boulder
/**
 * DecompositionScreenView is the base class for the Intro, Ten, and Twenty Screens in the Number Pairs simulation.
 * It adds a radio button group that allows users to pick the total they want to interact with.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import Range from '../../../../dot/js/Range.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import DecompositionModel from '../model/DecompositionModel.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import NumberPairsScreenView, { NumberPairsScreenViewOptions } from './NumberPairsScreenView.js';
import SceneSelectionRadioButtonGroup from './SceneSelectionRadioButtonGroup.js';
import LocationCountingObjectNode from './LocationCountingObjectNode.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';

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

    // Whenever the selected scene changes, we want to go through the location and attribute representations to ensure
    // that no overlaps are occurring.
    model.selectedSceneProperty.link( sceneModel => {
      if ( !isSettingPhetioStateProperty.value && !isResettingAllProperty.value ) {
        const leftAddendBounds = NumberPairsConstants.LEFT_COUNTING_AREA_BOUNDS.erodedXY( LocationCountingObjectNode.WIDTH, LocationCountingObjectNode.HEIGHT );
        const rightAddendBounds = NumberPairsConstants.RIGHT_COUNTING_AREA_BOUNDS.erodedXY( LocationCountingObjectNode.WIDTH, LocationCountingObjectNode.HEIGHT );

        // Make a copy of the arrays so that we are not modifying the original arrays while iterating over them.
        const leftAddendLocationPositionProperties = sceneModel.leftAddendObjects.map( countingObject => countingObject.locationPositionProperty );
        const rightAddendLocationPositionProperties = sceneModel.rightAddendObjects.map( countingObject => countingObject.locationPositionProperty );
        this.handlePositionOverlap( leftAddendLocationPositionProperties, leftAddendBounds, 0.75 );
        this.handlePositionOverlap( rightAddendLocationPositionProperties, rightAddendBounds, 0.75 );

        const attributePositionProperties = [
          ...sceneModel.leftAddendObjects.map( countingObject => countingObject.attributePositionProperty ),
          ...sceneModel.rightAddendObjects.map( countingObject => countingObject.attributePositionProperty )
        ];
        const kittenBounds = NumberPairsConstants.COUNTING_AREA_BOUNDS.erodedXY( NumberPairsConstants.KITTEN_PANEL_WIDTH / 2, NumberPairsConstants.KITTEN_PANEL_HEIGHT / 2 );
        this.handlePositionOverlap( attributePositionProperties, kittenBounds, 0.5 );
      }
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