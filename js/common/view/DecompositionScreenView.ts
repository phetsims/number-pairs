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
import Vector2 from '../../../../dot/js/Vector2.js';
import Property from '../../../../axon/js/Property.js';

type SelfOptions = {
  sceneRange: Range;
};

export type DecompositionScreenViewOptions = NumberPairsScreenViewOptions & SelfOptions;
export default class DecompositionScreenView extends NumberPairsScreenView {
  private recursionDepth = 0;

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
    } );

    this.addChild( totalSelectorAlignBox );

    this.numberPairsSetPDOMOrder( sceneSelectionRadioButtonGroup );
  }

  /**
   * A recursive function that ensures that no two counting objects overlap in the location representation.
   * @param positionProperties - An array of position properties that we want to check for overlaps.
   * @param validBounds - The bounds in which a position must stay within.
   * @param minWidthRatio - Define the minimum panel width ratio that we want positions to potentially move over.
   */
  private handlePositionOverlap( positionProperties: Property<Vector2>[], validBounds: Bounds2, minWidthRatio: number ): CountingObject[] {
    this.recursionDepth += 1;
    assert && assert( this.recursionDepth < 100, 'infinite recursion detected' );

    // Our base case is when there is only one or zero counting objects left.
    // We also want to gracefully stop trying to handle overlap if we're stuck in an infinite recursion.
    if ( positionProperties.length <= 1 || this.recursionDepth > 100 ) {
      this.recursionDepth = 0;
      return [];
    }
    else {

      // keep track of the counting object we are currently on and it's position.
      const currentPositionProperty = positionProperties[ 0 ];
      const currentPosition = currentPositionProperty.value;
      const dropZoneBounds = NumberPairsConstants.GET_DROP_ZONE_BOUNDS( currentPosition );

      // Find any counting objects that may be overlapping and move them to a new position.
      const overlappingPositions = positionProperties.filter( positionProperty => dropZoneBounds.containsPoint( positionProperty.value ) );
      overlappingPositions.length > 1 && overlappingPositions.forEach( overlappingPosition => {
        overlappingPosition.value = CountingAreaNode.getEmptyPoint( currentPosition, overlappingPosition.value, validBounds, minWidthRatio );
      } );

      // If there was only one overlapping object, we can move on to the next counting object.
      if ( overlappingPositions.length <= 1 ) {
        return this.handlePositionOverlap( positionProperties.slice( 1 ), validBounds, minWidthRatio );
      }
      else {

        // If there were multiple overlapping objects, we need to move the first counting object to the back of the array
        // So that we can check for future overlaps again.
        positionProperties.shift();
        positionProperties.push( currentPositionProperty );
        return this.handlePositionOverlap( positionProperties, validBounds, minWidthRatio );
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