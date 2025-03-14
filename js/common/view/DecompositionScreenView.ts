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
import CountingObject from '../model/CountingObject.js';
import CountingAreaNode from './CountingAreaNode.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import LocationCountingObjectNode from './LocationCountingObjectNode.js';

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

    // Whenever the selected scene changes we want to go through the location and attribute representations to ensure
    // that no overlaps are occurring.
    model.selectedSceneProperty.link( sceneModel => {
      const leftAddendBounds = NumberPairsConstants.LEFT_COUNTING_AREA_BOUNDS.erodedXY( LocationCountingObjectNode.WIDTH, LocationCountingObjectNode.HEIGHT );
      const rightAddendBounds = NumberPairsConstants.RIGHT_COUNTING_AREA_BOUNDS.erodedXY( LocationCountingObjectNode.WIDTH, LocationCountingObjectNode.HEIGHT );
      this.handleLocationOverlap( sceneModel.leftAddendObjects, leftAddendBounds );
      this.handleLocationOverlap( sceneModel.rightAddendObjects, rightAddendBounds );
      this.handleKittenOverlap( [ ...sceneModel.leftAddendObjects, ...sceneModel.rightAddendObjects ] );
    } );

    this.addChild( totalSelectorAlignBox );

    this.numberPairsSetPDOMOrder( sceneSelectionRadioButtonGroup );
  }

  /**
   * A recursive function that ensures that no two counting objects overlap in the location representation.
   * @param countingObjects
   * @param validBounds
   */
  private handleLocationOverlap( countingObjects: CountingObject[], validBounds: Bounds2 ): CountingObject[] {
    if ( countingObjects.length <= 1 ) {
      return [];
    }
    else {
      const currentPosition = countingObjects[ 0 ].locationPositionProperty.value;
      const dropZoneBounds = NumberPairsConstants.GET_DROP_ZONE_BOUNDS( currentPosition );
      const overlappingObjects = countingObjects.filter( countingObject => dropZoneBounds.containsPoint( countingObject.locationPositionProperty.value ) );
      overlappingObjects.length > 1 && overlappingObjects.forEach( overlappingObject => {
        overlappingObject.locationPositionProperty.value = CountingAreaNode.getEmptyPoint( currentPosition, overlappingObject.locationPositionProperty.value, validBounds );
      } );
      if ( overlappingObjects.length > 0 ) {
        return overlappingObjects;
      }
      else {
        return this.handleLocationOverlap( countingObjects.slice( 1 ), validBounds );
      }
    }
  }

  private handleKittenOverlap( countingObjects: CountingObject[] ): CountingObject[] {
    const kittenBounds = NumberPairsConstants.COUNTING_AREA_BOUNDS.erodedXY( NumberPairsConstants.KITTEN_PANEL_WIDTH / 2, NumberPairsConstants.KITTEN_PANEL_HEIGHT / 2 );
    if ( countingObjects.length <= 1 ) {
      return [];
    }
    else {
      const currentPosition = countingObjects[ 0 ].attributePositionProperty.value;
      const dropZoneBounds = NumberPairsConstants.GET_DROP_ZONE_BOUNDS( currentPosition );
      const overlappingObjects = countingObjects.filter( countingObject => dropZoneBounds.containsPoint( countingObject.attributePositionProperty.value ) );
      overlappingObjects.length > 1 && overlappingObjects.forEach( overlappingObject => {
        overlappingObject.attributePositionProperty.value = CountingAreaNode.getEmptyPoint( currentPosition, overlappingObject.attributePositionProperty.value, kittenBounds );
      } );
      if ( overlappingObjects.length > 0 ) {
        return overlappingObjects;
      }
      else {
        return this.handleLocationOverlap( countingObjects.slice( 1 ), kittenBounds );
      }
    }
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