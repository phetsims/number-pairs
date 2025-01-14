// Copyright 2024-2025, University of Colorado Boulder
/**
 * The base class for the model in the Number Pairs simulation.
 * This class keeps track of the total and both addends.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import numberPairs from '../../numberPairs.js';
import { AddendType } from './CountingObject.js';
import NumberPairsModel, { NumberPairsModelOptions } from './NumberPairsModel.js';
import NumberPairsScene from './NumberPairsScene.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import RepresentationType from './RepresentationType.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';


type SelfOptions = {
  initialTotalValue: number;
  sceneRange: Range;
};

export type DecompositionModelOptions = SelfOptions & NumberPairsModelOptions;
export default class DecompositionModel extends NumberPairsModel {


  // Each scene is associated with a readonly total. The selected scene model is determined by the totalProperty.
  // The length of the left/rightAddendCountingObjectsProperty.value must always add up to the totalProperty.value.
  public readonly selectedSceneProperty: Property<NumberPairsScene>;
  public readonly scenes: NumberPairsScene[];

  protected constructor( providedOptions: DecompositionModelOptions ) {

    const options = providedOptions;

    // We need to create a scene model for each scene in the scene range including both the max and min values.
    const sceneModels = [];
    const scenesTandem = options.tandem.createTandem( 'scenes' );
    for ( let total = options.sceneRange.min; total <= options.sceneRange.max; total++ ) {
      let sceneModel: NumberPairsScene;
      const tandem = scenesTandem.createTandem( `sceneModel${total}` );
      const includesBeadRepresentation = options.representationTypeValidValues.includes( RepresentationType.BEADS );
      if ( total === 0 ) {
        sceneModel = new NumberPairsScene( 0, 0, {
          tandem: tandem,
          includesBeadRepresentation: includesBeadRepresentation
        } );
      }
      else {

        // The initial left addend value for each scene is n - 1.
        const leftAddendValue = total - 1;
        const rightAddendValue = 1;
        sceneModel = new NumberPairsScene( leftAddendValue, rightAddendValue, {
          tandem: tandem,
          includesBeadRepresentation: includesBeadRepresentation
        } );
      }
      sceneModels.push( sceneModel );
    }

    const initialSceneModel = sceneModels.find( sceneModel => sceneModel.total === options.initialTotalValue );
    assert && assert( initialSceneModel, `initialSceneModel not found for total: ${options.initialTotalValue}` );
    const selectedSceneModelProperty = new Property( initialSceneModel!, {
      validValues: sceneModels,
      hasListenerOrderDependencies: true,
      phetioValueType: ReferenceIO( IOType.ObjectIO ),
      tandem: options.tandem.createTandem( 'selectedSceneModelProperty' ),
      phetioFeatured: true
    } );

    const totalProperty = new DerivedProperty( [ selectedSceneModelProperty ], sceneModel => sceneModel.total );
    const leftAddendCountingObjectsProperty = new DerivedProperty( [ selectedSceneModelProperty ],
      sceneModel => sceneModel.leftAddendObjects );
    const rightAddendCountingObjectsProperty = new DerivedProperty( [ selectedSceneModelProperty ],
      sceneModel => sceneModel.rightAddendObjects );
    const leftAddendProperty = new DynamicProperty<number, number, NumberPairsScene>( selectedSceneModelProperty, {
      hasListenerOrderDependencies: true,
      derive: 'leftAddendProperty',
      bidirectional: true // This Property needs to be bidirectional because it is set by the slider in the NumberLineNode.
    } );
    const rightAddendProperty = new DynamicProperty<number, number, NumberPairsScene>( selectedSceneModelProperty, {
      derive: 'rightAddendProperty'
    } );
    const beadXPositionsProperty = new DynamicProperty<number[], number[], NumberPairsScene>( selectedSceneModelProperty, {
      derive: 'beadXPositionsProperty',
      bidirectional: true // This Property needs to be bidirectional because it is set by BeadsOnWireNode whenever a bead is dropped.
    } );

    const superOptions = combineOptions<NumberPairsModelOptions>( {}, options );
    super(
      totalProperty,
      leftAddendProperty,
      rightAddendProperty,
      leftAddendCountingObjectsProperty,
      rightAddendCountingObjectsProperty,
      beadXPositionsProperty,
      options.sceneRange.max,
      superOptions
    );

    // Add all the counting objects to the appropriate observable array in each scene.
    sceneModels.forEach( sceneModel => {
      this.registerObservableArrays( sceneModel.leftAddendObjects, sceneModel.rightAddendObjects, sceneModel.inactiveCountingObjects );

      this.countingObjects.forEach( countingObject => {
        sceneModel.inactiveCountingObjects.push( countingObject );
      } );
      _.times( sceneModel.leftAddendProperty.value, () => {
        sceneModel.leftAddendObjects.push( sceneModel.inactiveCountingObjects[ 0 ] );
      } );
      _.times( sceneModel.rightAddendProperty.value, () => {

        // We want to pull from the end of the inactiveCountingObjects array to keep as much consistency as possible
        // between which countingObjects belong to which addend in the initial state.
        sceneModel.rightAddendObjects.push( sceneModel.inactiveCountingObjects[ sceneModel.inactiveCountingObjects.length - 1 ] );
      } );

      assert && assert( sceneModel.leftAddendObjects.length + sceneModel.rightAddendObjects.length === sceneModel.total, 'leftAddendObjects.length + rightAddendObjects.length should equal total' );

      // We only need to update the leftAddendProperty since the rightAddend is derived.
      // This link must be registered after the observable arrays are populated.
      sceneModel.leftAddendObjects.lengthProperty.lazyLink( length => {
        sceneModel.leftAddendProperty.value = length;
      } );
    } );

    selectedSceneModelProperty.link( sceneModel => {
      this.changingScenes = true;

      // Set all the counting objects to inactive so that the objects in each observable array
      // get set to the proper state below.
      this.countingObjects.forEach( countingObject => {
        countingObject.addendTypeProperty.value = AddendType.INACTIVE;
      } );
      sceneModel.leftAddendObjects.forEach( countingObject => {
        countingObject.addendTypeProperty.value = AddendType.LEFT;
      } );
      sceneModel.rightAddendObjects.forEach( countingObject => {
        countingObject.addendTypeProperty.value = AddendType.RIGHT;
      } );

      // Update beadXPositionsProperty to reflect the saved state in the scene.
      sceneModel.getAllCountingObjects().forEach( ( countingObject, i ) => {
        countingObject.beadXPositionProperty.value = sceneModel.beadXPositionsProperty.value[ i ];
      } );

      this.changingScenes = false;
    } );

    // Set the initial positions for location based counting objects.
    this.countingObjects.forEach( countingObject => {
      if ( countingObject.addendTypeProperty.value === AddendType.LEFT &&
           !NumberPairsConstants.LEFT_COUNTING_AREA_BOUNDS.containsPoint( countingObject.locationPositionProperty.value ) ) {
        const gridCoordinates = this.getAvailableGridCoordinates( this.leftAddendCountingObjectsProperty.value, NumberPairsConstants.LEFT_COUNTING_AREA_BOUNDS.dilated( -20 ) );
        countingObject.locationPositionProperty.value = dotRandom.sample( gridCoordinates );
      }
      else if ( countingObject.addendTypeProperty.value === AddendType.RIGHT &&
                !NumberPairsConstants.RIGHT_COUNTING_AREA_BOUNDS.containsPoint( countingObject.locationPositionProperty.value ) ) {
        const gridCoordinates = this.getAvailableGridCoordinates( this.rightAddendCountingObjectsProperty.value, NumberPairsConstants.RIGHT_COUNTING_AREA_BOUNDS.dilated( -20 ) );
        countingObject.locationPositionProperty.value = dotRandom.sample( gridCoordinates );
      }
    } );

    this.createNumberLineEnabledRangeLinks();

    this.selectedSceneProperty = selectedSceneModelProperty;
    this.scenes = sceneModels;

    // Link to the countingObject.addendTypeProperty at the end of construction to avoid triggering duplicate work
    // that is handled manually above.
    this.countingObjects.forEach( countingObject => {
      this.createCountingObjectAddendTypeLinks( countingObject );
    } );
  }

  /**
   * Resets the model.
   */
  public override reset(): void {
    this.selectedSceneProperty.reset();

    super.reset();
    this.representationTypeProperty.reset();

    this.scenes.forEach( scene => {
      scene.reset();
    } );
  }
}

numberPairs.register( 'DecompositionModel', DecompositionModel );