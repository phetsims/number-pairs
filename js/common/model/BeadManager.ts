// Copyright 2025, University of Colorado Boulder
/**
 * Manages the positions of the beads on the wires.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */
import numberPairs from '../../numberPairs.js';
import NumberPairsModel, { BeadXPositionsTypes } from './NumberPairsModel.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import Range from '../../../../dot/js/Range.js';
import CountingObject from './CountingObject.js';
import NumberPairsScene from './NumberPairsScene.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';


export default class BeadManager {
  private readonly beadXRange: Range;

  // BEAD_WIDTH is closely intertwined with the placement of the bead separator. Anything greater than 21.5 at the time
  // of this writing will cause spacing issues along the wire if other adjustments are not made.
  public static readonly BEAD_WIDTH = 21.5;
  public static readonly BEAD_HEIGHT = 80;

  public constructor(
    private readonly leftAddendCountingObjectsProperty: TReadOnlyProperty<CountingObject[]>,
    private readonly rightAddendCountingObjectsProperty: TReadOnlyProperty<CountingObject[]>,
    public readonly beadXPositionsProperty: TReadOnlyProperty<BeadXPositionsTypes>,
    private readonly isSumScreen: boolean ) {
    const numberOfSpotsOnWire = Math.floor( NumberPairsConstants.COUNTING_AREA_BOUNDS.width / BeadManager.BEAD_WIDTH );
    this.beadXRange = new Range( NumberPairsConstants.LEFTMOST_BEAD_X, numberOfSpotsOnWire - 1 );
  }

  public saveBeadPositions( scene: NumberPairsScene ): void {
    scene.beadXPositionsProperty.value = {
      leftAddendXPositions: scene.leftAddendObjects.filter( countingObject => countingObject.beadXPositionProperty.value !== null )
        .map( countingObject => countingObject.beadXPositionProperty.value! ),
      rightAddendXPositions: scene.rightAddendObjects.filter( countingObject => countingObject.beadXPositionProperty.value !== null )
        .map( countingObject => countingObject.beadXPositionProperty.value! )
    };

    // We are gracefully handling a null value above, and we want to make sure that none were able to sneak through.
    assert && assert( _.every( scene.leftAddendObjects, countingObject => countingObject.beadXPositionProperty.value !== null ), 'All left addend beads should have an x position' );
    assert && assert( _.every( scene.rightAddendObjects, countingObject => countingObject.beadXPositionProperty.value !== null ), 'All right addend beads should have an x position' );
  }

  /**
   * Update the positions of the beads on the wire based on the addend values. We may have to account for a bead being
   * added or removed.
   * @param leftAddend
   */
  public updateBeadPositions( leftAddend: number ): void {
    const leftAddendBeads = this.leftAddendCountingObjectsProperty.value;
    const rightAddendBeads = this.rightAddendCountingObjectsProperty.value;
    const positions = {
      leftAddendXPositions: leftAddendBeads.filter( countingObject => countingObject.beadXPositionProperty.value !== null )
        .map( countingObject => countingObject.beadXPositionProperty.value! ),
      rightAddendXPositions: rightAddendBeads.filter( countingObject => countingObject.beadXPositionProperty.value !== null )
        .map( countingObject => countingObject.beadXPositionProperty.value! )
    };
    assert && assert( _.every( positions.leftAddendXPositions, x => x !== null ), 'All left addend positions should be a number' );
    assert && assert( _.every( positions.rightAddendXPositions, x => x !== null ), 'All right addend positions should be a number' );
    let leftAddendXPositions = positions.leftAddendXPositions.sort( ( a, b ) => a - b );
    let rightAddendXPositions = positions.rightAddendXPositions.sort( ( a, b ) => a - b );

    const separatorXPosition = NumberPairsModel.calculateBeadSeparatorXPosition( leftAddend );
    const beadDistanceFromSeparator = NumberPairsConstants.BEAD_DISTANCE_FROM_SEPARATOR;

    // Adjust any beads that may be on the wrong side due to the separator's new position
    if ( _.some( leftAddendXPositions, x => x >= separatorXPosition ) ) {
      leftAddendXPositions = this.shiftXPositions( leftAddendXPositions.reverse(), -1, separatorXPosition - beadDistanceFromSeparator ).reverse();
    }
    if ( _.some( rightAddendXPositions, x => x <= separatorXPosition ) ) {
      rightAddendXPositions = this.shiftXPositions( rightAddendXPositions, 1, separatorXPosition + beadDistanceFromSeparator );
    }

    /**
     * Handle adding or removing a bead
     */
    if ( leftAddendBeads.length > leftAddendXPositions.length ) {
      while ( leftAddendBeads.length > leftAddendXPositions.length ) {
        leftAddendXPositions = this.addBeadPositionToWire( leftAddendXPositions, 1, leftAddendBeads.length, rightAddendBeads.length );
      }
    }
    else if ( leftAddendBeads.length < leftAddendXPositions.length ) {
      while ( leftAddendBeads.length < leftAddendXPositions.length ) {
        // when a bead is removed we want to take the furthest one to the left
        leftAddendXPositions.shift();
      }
    }
    if ( rightAddendBeads.length > rightAddendXPositions.length ) {
      while ( rightAddendBeads.length > rightAddendXPositions.length ) {
        rightAddendXPositions = this.addBeadPositionToWire( rightAddendXPositions.slice().reverse(), -1, leftAddendBeads.length, rightAddendBeads.length );
      }
    }
    else if ( rightAddendBeads.length < rightAddendXPositions.length ) {
      while ( rightAddendBeads.length < rightAddendXPositions.length ) {
        // when a bead is removed we want to take the furthest one to the right
        rightAddendXPositions.pop();
      }
    }

    /**
     * Handle movement of the separator that may cause overlap with a bead
     */
    const separatorRange = new Range( separatorXPosition - beadDistanceFromSeparator,
      separatorXPosition + beadDistanceFromSeparator );
    const leftAddendBeadOverlap = _.some( leftAddendXPositions, x => separatorRange.contains( x ) );
    const rightAddendBeadOverlap = _.some( rightAddendXPositions, x => separatorRange.contains( x ) );
    if ( leftAddendBeadOverlap ) {
      leftAddendXPositions = this.shiftXPositions( leftAddendXPositions.reverse(), -1, separatorXPosition - beadDistanceFromSeparator ).reverse();
    }
    if ( rightAddendBeadOverlap ) {
      rightAddendXPositions = this.shiftXPositions( rightAddendXPositions, 1, separatorXPosition + beadDistanceFromSeparator );
    }

    assert && assert( leftAddendBeads.length === leftAddendXPositions.length, 'leftAddendObjects.length should match beadXPositionsProperty.leftAddendXPositions.length' );
    assert && assert( rightAddendBeads.length === rightAddendXPositions.length, 'rightAddendObjects.length should match beadXPositionsProperty.rightAddendXPositions.length' );
    this.setBeadXPositions( leftAddendBeads, rightAddendBeads, leftAddendXPositions, rightAddendXPositions );
    assert && assert( _.every( leftAddendBeads, bead => bead.beadXPositionProperty.value !== null ), 'All left addend objects should have a bead X Position' );
    assert && assert( _.every( rightAddendBeads, bead => bead.beadXPositionProperty.value !== null ), 'All right addend objects should have a bead X Position' );
  }

  /**
   * We want to add beads from the outside in. This function returns an array of x positions based on adding an
   * x position to the provided array and handles the logic of updating other x positions to meet the space
   * requirements along the wire.
   *
   * @param existingXPositions - in traversal order ( outside in).
   * @param direction - a negative direction is adding a bead to the right (since beads will need to shift left),
   * a positive direction is adding a bead to the left (since beads will need to shift right).
   * @param leftAddend
   * @param rightAddend
   */
  private addBeadPositionToWire( existingXPositions: number[], direction: number, leftAddend: number, rightAddend: number ): number[] {

    // we only want the sign, we will traverse by one.
    direction = Math.sign( direction );

    // If there are no xPositions provided then go to the default.
    if ( existingXPositions.length === 0 ) {
      const defaultBeadPositions = BeadManager.getDefaultBeadPositions( leftAddend, rightAddend );
      return direction > 0 ? defaultBeadPositions.leftAddendXPositions : defaultBeadPositions.rightAddendXPositions;
    }
    else {
      let newXPositions;
      const proposedNewBeadPosition = existingXPositions[ 0 ] - direction;
      const newBeadInRange = this.beadXRange.contains( proposedNewBeadPosition );
      if ( newBeadInRange ) {
        existingXPositions.unshift( proposedNewBeadPosition );
        newXPositions = existingXPositions;
      }

        // If the proposed position for the new bead is not within range, we need to constrain the position and
      // adjust any neighboring beads to make room.
      else {
        const startingValue = direction > 0 ? this.beadXRange.min : this.beadXRange.max;
        existingXPositions.unshift( proposedNewBeadPosition );
        newXPositions = this.shiftXPositions( existingXPositions, direction, startingValue );
      }

      // When adding a bead to the right we were given xPosition values in traversal order (right to left) because we
      // add beads to the outside. But we want to return values in bead order (left to right) since that is how
      // we store the beads in the model.
      direction < 0 && newXPositions.reverse();
      return newXPositions;
    }
  }

  /**
   * @param xPositions
   * @param direction - positive when we want to shift to the right, negative when we want to shift to the left.
   * @param startingValue
   */
  private shiftXPositions( xPositions: number[], direction: number, startingValue: number ): number[] {
    direction = Math.sign( direction );
    const shiftedPositions: number[] = [];
    xPositions.reduce( ( previousX, currentX ) => {
      const x = direction > 0 ? Math.max( currentX, previousX + direction ) : Math.min( currentX, previousX + direction );
      shiftedPositions.push( x );
      return x;
    }, startingValue - direction ); // we want the first xPosition to be at the starting value.
    return shiftedPositions;
  }

  /**
   * Set the bead x positions of the counting objects based on the provided left and right x positions.
   * @param leftXPositions
   * @param rightXPositions
   * @param leftAddendObjects - prevent incorrect intermediary values by using the same counting objects as the call site.
   * @param rightAddendObjects
   */
  public setBeadXPositions( leftAddendObjects: CountingObject[], rightAddendObjects: CountingObject[], leftXPositions: number[], rightXPositions: number[] ): void {
    leftAddendObjects.forEach( ( countingObject, index ) => {
      countingObject.beadXPositionProperty.value = leftXPositions[ index ];
    } );
    rightAddendObjects.forEach( ( countingObject, index ) => {
      countingObject.beadXPositionProperty.value = rightXPositions[ index ];
    } );
  }

  /**
   * Position the beads on the wire according to the left and right addend values. This function puts beads
   * in their default starting positions, all grouped together on either the left or right side of the wire depending
   * on their addend type.
   */
  public static getDefaultBeadPositions( leftAddendValue: number, rightAddendValue: number ): BeadXPositionsTypes {
    const distanceFromSeparator = NumberPairsConstants.BEAD_DISTANCE_FROM_SEPARATOR;
    const beadSeparatorXPosition = NumberPairsModel.calculateBeadSeparatorXPosition( leftAddendValue );

    return {
      leftAddendXPositions: _.times( leftAddendValue, i => beadSeparatorXPosition - i - distanceFromSeparator ),
      rightAddendXPositions: _.times( rightAddendValue, i => i + beadSeparatorXPosition + distanceFromSeparator )
    };
  }

  public reset(): void {
    // Do I need to reset anything?
  }
}

numberPairs.register( 'BeadManager', BeadManager );