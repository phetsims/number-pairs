// Copyright 2025, University of Colorado Boulder
/**
 * This file factors out functions that create and manage counting objects.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import BeadManager from './BeadManager.js';
import CountingObject, { AddendType } from './CountingObject.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';

export const CountingObjectsManager = {

  /**
   * Returns grid coordinates based on the provided bounds.
   * This function assumes that we want the coordinates for a ten frame based grid which means there are 5 columns.
   * @param bounds
   * @param leftMargin
   * @param rightMargin
   * @param columnNumber
   */
  getGridCoordinates: ( bounds: Bounds2, leftMargin: number, rightMargin: number, columnNumber = 5 ): Vector2[] => {
    const rowNumber = 4;
    const topMargin = 11;
    const bottomMargin = 56;
    affirm( columnNumber * rowNumber >= NumberPairsConstants.TWENTY_TOTAL_RANGE.max, 'There are not enough cells for the possible amount of counting objects.' );

    const columnWidth = ( bounds.width - rightMargin - leftMargin ) / columnNumber;
    const rowHeight = ( bounds.height - bottomMargin - topMargin ) / rowNumber;

    const cellCenterCoordinates: Vector2[] = [];

    for ( let i = 0; i < rowNumber; i++ ) {
      for ( let j = 0; j < columnNumber; j++ ) {
        const x = bounds.minX + j * columnWidth + columnWidth / 2;
        const y = bounds.minY + i * rowHeight + rowHeight / 2;
        cellCenterCoordinates.push( new Vector2( x + leftMargin, y + topMargin ) );
      }
    }
    return cellCenterCoordinates;
  },
  setAddendType: ( leftCountingObjects: CountingObject[], rightCountingObjects: CountingObject[], inactiveCountingObjects: CountingObject[] ): void => {
  leftCountingObjects.forEach( countingObject => { countingObject.addendTypeProperty.value = AddendType.LEFT; } );
  rightCountingObjects.forEach( countingObject => { countingObject.addendTypeProperty.value = AddendType.RIGHT; } );
  inactiveCountingObjects.forEach( countingObject => { countingObject.addendTypeProperty.value = AddendType.INACTIVE; } );
},
  /**
   * Creates and places the counting objects for the screen based on the provided paramters
   * @param numberOfCountingObjects
   * @param initialLeftAddend
   * @param initialRightAddend
   * @param tandem
   */
  createCountingObjects: ( numberOfCountingObjects: number, initialLeftAddend: number, initialRightAddend: number, tandem: Tandem ): CountingObject[] => {
    // Constants
    const countingAreaBounds = NumberPairsConstants.COUNTING_AREA_BOUNDS;
    const leftCountingAreaBounds = NumberPairsConstants.LEFT_COUNTING_AREA_BOUNDS;
    const rightCountingAreaBounds = NumberPairsConstants.RIGHT_COUNTING_AREA_BOUNDS;
    const countingAreaInnerMargin = NumberPairsConstants.COUNTING_AREA_INNER_MARGIN;
    const kittenPanelWidth = NumberPairsConstants.KITTEN_PANEL_WIDTH;

    // We can have up to 40 counting objects in the game screen and will need more columns to fit them all in the counting area.
    const attributeColumns = numberOfCountingObjects > 20 ? 10 : 8;

    // Get the possible positions for each representation.
    const availableAttributeGridPositions = CountingObjectsManager.getGridCoordinates( countingAreaBounds, kittenPanelWidth, kittenPanelWidth, attributeColumns );
    const availableLeftLocationGridPositions = CountingObjectsManager.getGridCoordinates( leftCountingAreaBounds, countingAreaInnerMargin, countingAreaInnerMargin, 6 );
    const availableRightLocationGridPositions = CountingObjectsManager.getGridCoordinates( rightCountingAreaBounds, countingAreaInnerMargin, countingAreaInnerMargin, 6 );
    const beadXPositions = BeadManager.getDefaultBeadPositions( initialLeftAddend, initialRightAddend );

    // Find and set the initial positions for each counting object.
    const countingObjects: CountingObject[] = [];
    const countingObjectsTandem = tandem.createTandem( 'countingObjects' );
    _.times( numberOfCountingObjects, i => {
      const countingObjectID = i + 1;
      const initialAttributePosition = dotRandom.sample( availableAttributeGridPositions );
      availableAttributeGridPositions.splice( availableAttributeGridPositions.indexOf( initialAttributePosition ), 1 );

      let initialBeadXPosition;
      let initialLocationPosition;
      if ( i < initialLeftAddend ) {
        initialBeadXPosition = beadXPositions.leftAddendXPositions[ i ];
        initialLocationPosition = dotRandom.sample( availableLeftLocationGridPositions );
        availableLeftLocationGridPositions.splice( availableLeftLocationGridPositions.indexOf( initialLocationPosition ), 1 );
      }
      else if ( numberOfCountingObjects - i <= initialRightAddend ) {
        initialBeadXPosition = beadXPositions.rightAddendXPositions[ numberOfCountingObjects - i - 1 ];
        initialLocationPosition = dotRandom.sample( availableRightLocationGridPositions );
        availableRightLocationGridPositions.splice( availableRightLocationGridPositions.indexOf( initialLocationPosition ), 1 );
      }
      else {
        initialBeadXPosition = -1; // negative value indicates that the bead should not be placed.
        initialLocationPosition = new Vector2( 0, 0 );
      }
      countingObjects.push( new CountingObject( {
        id: countingObjectID,
        initialBeadXPosition: initialBeadXPosition,
        initialAttributePosition: initialAttributePosition,
        initialLocationPosition: initialLocationPosition,
        tandem: countingObjectsTandem.createTandem( `countingObject${countingObjectID}` )
      } ) );
    } );

    return countingObjects;
  }
};