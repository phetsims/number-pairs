// Copyright 2024-2025, University of Colorado Boulder
/**
 * NumberPairsScene is the model for the scene in the Number Pairs simulation.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import createObservableArray, { ObservableArray, ObservableArrayIO } from '../../../../axon/js/createObservableArray.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import numberPairs from '../../numberPairs.js';
import CountingObject from './CountingObject.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import optionize from '../../../../phet-core/js/optionize.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import NumberPairsModel from './NumberPairsModel.js';

type SelfOptions = {
  includesBeadRepresentation: boolean;
};
type NumberPairsSceneOptions = SelfOptions & WithRequired<PhetioObjectOptions, 'tandem'>;
export default class NumberPairsScene extends PhetioObject {

  // The total as initialized by the values provided to the constructor. This is a constant.
  public readonly total: number;

  public readonly leftAddendProperty: Property<number>;

  // The right addend number is derived from the total and left addend number and is used to update
  // the counting objects in each array as it changes.
  public readonly rightAddendProperty: TReadOnlyProperty<number>;
  public readonly leftAddendObjects: ObservableArray<CountingObject>;
  public readonly rightAddendObjects: ObservableArray<CountingObject>;
  public readonly inactiveCountingObjects: ObservableArray<CountingObject>;

  public readonly beadXPositionsProperty: Property<number[]>;

  public constructor( inactiveCountingObjects: CountingObject[], leftAddendCountingObjects: CountingObject[], rightAddendCountingObjects: CountingObject[], providedOptions: NumberPairsSceneOptions ) {
    const options = optionize<NumberPairsSceneOptions, SelfOptions, PhetioObjectOptions>()( {
      phetioState: false
    }, providedOptions );
    super( options );
    this.total = leftAddendCountingObjects.length + rightAddendCountingObjects.length;
    const sceneRange = new Range( 0, this.total );
    this.inactiveCountingObjects = createObservableArray( {
      elements: inactiveCountingObjects,
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'inactiveCountingObjects' )
    } );
    this.leftAddendProperty = new NumberProperty( leftAddendCountingObjects.length, {
      range: sceneRange,
      hasListenerOrderDependencies: true,
      numberType: 'Integer',
      tandem: options.tandem.createTandem( 'leftAddendProperty' )
    } );
    this.leftAddendObjects = createObservableArray( {
      elements: leftAddendCountingObjects,
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'leftAddendObjects' )
    } );

    this.rightAddendProperty = new DerivedProperty( [ this.leftAddendProperty ], leftAddendValue => {
      return this.total - leftAddendValue;
    } );
    this.rightAddendObjects = createObservableArray( {
      elements: rightAddendCountingObjects,
      phetioType: ObservableArrayIO( CountingObject.CountingObjectIO ),
      tandem: options.tandem.createTandem( 'rightAddendObjects' )
    } );

    const initialBeadXPositions = NumberPairsModel.getDefaultBeadPositions( this.leftAddendObjects.length, this.rightAddendObjects.length );
    this.beadXPositionsProperty = new Property( [ ...initialBeadXPositions.leftAddendXPositions, ...initialBeadXPositions.rightAddendXPositions ], {
      tandem: options.includesBeadRepresentation ? options.tandem.createTandem( 'beadXPositionsProperty' ) : Tandem.OPT_OUT,
      phetioValueType: ArrayIO( NumberIO )
    } );

    // Listen to the rightAddendNumberProperty since it is derived and will therefore be updated last.
    // We manually handle counting object distribution during construction.
    this.rightAddendProperty.lazyLink( rightAddendValue => {
      if ( isResettingAllProperty.value || isSettingPhetioStateProperty.value ) {
        // No_op. We can rely on our observable arrays and Properties to have the correct state. This link fires before
        // counting objects have been distributed to observable arrays properly.
        return;
      }
      const leftAddendDelta = this.leftAddendProperty.value - this.leftAddendObjects.length;
      const rightAddendDelta = rightAddendValue - this.rightAddendObjects.length;

      if ( leftAddendDelta + rightAddendDelta === 0 ) {
        if ( leftAddendDelta > 0 ) {
          assert && assert( this.rightAddendObjects.length >= leftAddendDelta, 'not enough right addend objects' );
          this.leftAddendObjects.push( ...this.rightAddendObjects.splice( 0, leftAddendDelta ) );

        }
        else if ( rightAddendDelta > 0 ) {
          assert && assert( this.leftAddendObjects.length >= rightAddendDelta, 'not enough left addend objects' );
          this.rightAddendObjects.push( ...this.leftAddendObjects.splice( 0, rightAddendDelta ) );
        }
      }
      else {
        if ( rightAddendDelta > 0 ) {
          assert && assert( this.inactiveCountingObjects.length >= rightAddendDelta, 'not enough inactive counting objects' );

          // We use the immutable `slice` here because removing and item from the inactiveCountingObjects array
          // should be handled by the addend specific ObservableArray.
          this.rightAddendObjects.push( ...this.inactiveCountingObjects.slice( 0, rightAddendDelta ) );
        }
        else if ( rightAddendDelta < 0 ) {
          assert && assert( this.rightAddendObjects.length >= Math.abs( rightAddendDelta ), 'not enough right addend objects' );
          this.rightAddendObjects.splice( rightAddendDelta, -rightAddendDelta );
        }

        if ( leftAddendDelta > 0 ) {
          assert && assert( this.inactiveCountingObjects.length >= rightAddendDelta, 'not enough inactive counting objects' );

          this.leftAddendObjects.push( ...this.inactiveCountingObjects.slice( 0, leftAddendDelta ) );
        }
        else if ( leftAddendDelta < 0 ) {
          assert && assert( this.leftAddendObjects.length >= Math.abs( rightAddendDelta ), 'not enough left addend objects' );
          this.leftAddendObjects.splice( leftAddendDelta, -leftAddendDelta );
        }
      }

      assert && assert( this.leftAddendProperty.value === this.leftAddendObjects.length, 'leftAddendNumberProperty should match leftAddendObjects length' );
      assert && assert( this.rightAddendProperty.value === this.rightAddendObjects.length, 'rightAddendNumberProperty should match rightAddendObjects length' );
      assert && assert( this.leftAddendObjects.length + this.rightAddendObjects.length === this.total, 'leftAddendObjects.length + rightAddendObjects.length should equal total' );
    } );
  }

  public getAllCountingObjects(): CountingObject[] {
    return [ ...this.leftAddendObjects, ...this.rightAddendObjects ];
  }

  public reset(): void {
    this.leftAddendProperty.reset();
    this.inactiveCountingObjects.reset();
    this.leftAddendObjects.reset();
    this.rightAddendObjects.reset();
  }
}

numberPairs.register( 'NumberPairsScene', NumberPairsScene );