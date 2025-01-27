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
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from './CountingObject.js';
import NumberPairsModel, { BeadXPositionsTypes, NumberPairsModelOptions } from './NumberPairsModel.js';
import NumberPairsScene from './NumberPairsScene.js';
import RepresentationType from './RepresentationType.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import BeadManager from './BeadManager.js';

const INITIAL_VALUES_DIFFERENCE = 1;
type SelfOptions = {
  initialTotalValue: number;
  sceneRange: Range;
};

export type DecompositionModelOptions = SelfOptions & StrictOmit<NumberPairsModelOptions, 'numberOfCountingObjects'>;
export default class DecompositionModel extends NumberPairsModel {


  // Each scene is associated with a readonly total. The selected scene model is determined by the totalProperty.
  // The length of the left/rightAddendCountingObjectsProperty.value must always add up to the totalProperty.value.
  public readonly selectedSceneProperty: Property<NumberPairsScene>;
  public readonly scenes: NumberPairsScene[];

  protected constructor( providedOptions: DecompositionModelOptions ) {

    const options = optionize<DecompositionModelOptions, SelfOptions, NumberPairsModelOptions>()( {
      numberOfCountingObjects: providedOptions.sceneRange.max
    }, providedOptions );

    const countingObjects = NumberPairsModel.createCountingObjects(
      options.sceneRange.max, options.initialTotalValue - INITIAL_VALUES_DIFFERENCE, INITIAL_VALUES_DIFFERENCE, options.tandem );

    // We need to create a scene model for each scene in the scene range including both the max and min values.
    const sceneModels = [];
    const scenesTandem = options.tandem.createTandem( 'scenes' );

    for ( let total = options.sceneRange.min; total <= options.sceneRange.max; total++ ) {
      let sceneModel: NumberPairsScene;
      const tandem = scenesTandem.createTandem( `sceneModel${total}` );
      const includesBeadRepresentation = options.representationTypeValidValues.includes( RepresentationType.BEADS );
      if ( total === 0 ) {
        sceneModel = new NumberPairsScene( countingObjects, [], [], {
          tandem: tandem,
          includesBeadRepresentation: includesBeadRepresentation
        } );
      }
      else {
        const inactiveCountingObjects = countingObjects.slice();
        const leftAddendObjects: CountingObject[] = [];
        const rightAddendObjects: CountingObject[] = [];

        // The initial left addend value for each scene is n - INITIAL_VALUES_DIFFERENCE.
        const leftAddendValue = total - INITIAL_VALUES_DIFFERENCE;
        const rightAddendValue = INITIAL_VALUES_DIFFERENCE;

        _.times( leftAddendValue, () => {
          const countingObject = inactiveCountingObjects.shift();
          leftAddendObjects.push( countingObject! );
        } );
        _.times( rightAddendValue, () => {

          // We want to pull from the end of the inactiveCountingObjects array to keep as much consistency as possible
          // between which countingObjects belong to which addend in the initial state.
          const countingObject = inactiveCountingObjects.pop();
          rightAddendObjects.push( countingObject! );
        } );
        sceneModel = new NumberPairsScene( inactiveCountingObjects, leftAddendObjects, rightAddendObjects, {
          tandem: tandem,
          includesBeadRepresentation: includesBeadRepresentation
        } );
      }
      sceneModels.push( sceneModel );
    }

    const initialSceneModel = sceneModels.find( sceneModel => sceneModel.total === options.initialTotalValue );
    assert && assert( initialSceneModel, `initialSceneModel not found for total: ${options.initialTotalValue}` );
    const changingScenesProperty = new BooleanProperty( false ); // does not need to be isntrumented.
    const selectedSceneModelProperty = new Property( initialSceneModel!, {
      validValues: sceneModels,
      hasListenerOrderDependencies: true, // we need to set the changing scenes flags at the right times.
      phetioValueType: ReferenceIO( IOType.ObjectIO ),
      tandem: options.tandem.createTandem( 'selectedSceneModelProperty' ),
      phetioFeatured: true
    } );

    // This must be the first listener added to the selectedSceneModelProperty.
    selectedSceneModelProperty.link( ( newScene, oldScene ) => {
      if ( options.representationTypeValidValues.includes( RepresentationType.BEADS ) && oldScene
           && !isResettingAllProperty.value && !isSettingPhetioStateProperty.value ) {

        // All counting object positions should be set by now, but if they are not gracefully handle during scene change.
        // A fuzz error kept coming up where the beadXPositionProperty was null for some counting objects during scene change.
        // This was not possible to reproduce manually and was rare to be caught in fuzz testing. It makes more sense
        // to handle this case gracefully instead of continue to spend dev time on it.
        oldScene.leftAddendObjects.forEach( countingObject => {
          countingObject.beadXPositionProperty.value === null && countingObject.beadXPositionProperty.set( 0 );
        } );
        oldScene.rightAddendObjects.forEach( countingObject => {
          countingObject.beadXPositionProperty.value === null && countingObject.beadXPositionProperty.set( 0 );
        } );
        assert && assert( _.every( oldScene.leftAddendObjects, countingObject => countingObject.beadXPositionProperty.value !== null ), 'All left addend beads should have an x position' );
        assert && assert( _.every( oldScene.rightAddendObjects, countingObject => countingObject.beadXPositionProperty.value !== null ), 'All right addend beads should have an x position' );

        // Save the state when we switch scenes.
        this.beadManager.saveBeadPositions( oldScene );
      }
      changingScenesProperty.value = true;
    } );

    NumberPairsModel.setAddendType( initialSceneModel!.leftAddendObjects, initialSceneModel!.rightAddendObjects, initialSceneModel!.inactiveCountingObjects );

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
    const beadXPositionsProperty = new DynamicProperty<BeadXPositionsTypes, BeadXPositionsTypes, NumberPairsScene>( selectedSceneModelProperty, {
      derive: 'beadXPositionsProperty'
    } );
    const beadManager = new BeadManager( leftAddendCountingObjectsProperty, rightAddendCountingObjectsProperty, beadXPositionsProperty, false );

    const superOptions = combineOptions<NumberPairsModelOptions>( {
      numberOfCountingObjects: options.sceneRange.max
    }, options );
    super(
      totalProperty,
      leftAddendProperty,
      rightAddendProperty,
      leftAddendCountingObjectsProperty,
      rightAddendCountingObjectsProperty,
      beadManager,
      countingObjects,
      changingScenesProperty,
      superOptions
    );

    // Register the observable arrays in each scene to properly update Counting Object state as necesssary.
    sceneModels.forEach( sceneModel => {
      this.registerObservableArrays( sceneModel.leftAddendObjects, sceneModel.rightAddendObjects, sceneModel.inactiveCountingObjects );

      assert && assert( sceneModel.leftAddendObjects.length + sceneModel.rightAddendObjects.length === sceneModel.total, 'leftAddendObjects.length + rightAddendObjects.length should equal total' );

      // We only need to update the leftAddendProperty since the rightAddend is derived.
      // This link must be registered after the observable arrays are populated.
      sceneModel.leftAddendObjects.lengthProperty.lazyLink( length => {
        sceneModel.leftAddendProperty.value = length;
      } );
    } );

    selectedSceneModelProperty.link( sceneModel => {
      if ( !isResettingAllProperty.value ) {
        this.changingScenesProperty.value = true;

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

        if ( options.representationTypeValidValues.includes( RepresentationType.BEADS ) ) {

          // Update each beads x position based on the scene model's beadXPositionsProperty.
          this.beadManager.setBeadXPositions( sceneModel.leftAddendObjects, sceneModel.rightAddendObjects,
            sceneModel.beadXPositionsProperty.value.leftAddendXPositions, sceneModel.beadXPositionsProperty.value.rightAddendXPositions );
          this.changingScenesProperty.value = false;
        }

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

    // Set the proper Counting Object values for the currently select scene at the end of reset.
    const leftAddendObjects = this.selectedSceneProperty.value.leftAddendObjects;
    const rightAddendObjects = this.selectedSceneProperty.value.rightAddendObjects;
    const inactiveCountingObjects = this.selectedSceneProperty.value.inactiveCountingObjects;
    const beadXPositions = this.selectedSceneProperty.value.beadXPositionsProperty.value;
    NumberPairsModel.setAddendType( leftAddendObjects, rightAddendObjects, inactiveCountingObjects );
    this.beadManager.setBeadXPositions( leftAddendObjects, rightAddendObjects,
      beadXPositions.leftAddendXPositions, beadXPositions.rightAddendXPositions );
  }
}

numberPairs.register( 'DecompositionModel', DecompositionModel );