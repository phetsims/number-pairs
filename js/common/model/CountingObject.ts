// Copyright 2024-2025, University of Colorado Boulder
/**
 * CountingObject is the model for the individual objects users can interact with to explore the decomposition of
 * a number.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import numberPairs from '../../numberPairs.js';
import Range from '../../../../dot/js/Range.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';

export class AddendType extends EnumerationValue {
  public static readonly LEFT = new AddendType();
  public static readonly RIGHT = new AddendType();
  public static readonly INACTIVE = new AddendType();

  public static readonly enumeration = new Enumeration( AddendType );

  public constructor() {super();}
}

type CountingObjectStateObject = ReferenceIOState;
type SelfOptions = {
  id: number;
  initialBeadXPosition: number | null;
  initialAttributePosition: Vector2;
  initialLocationPosition: Vector2;
};
type CountingObjectOptions = SelfOptions & StrictOmit<PhetioObjectOptions, 'phetioState'>;

// We will probably need this to be a PhET-iO CountingObject for Group Sort later on.
export default class CountingObject extends PhetioObject {

  // The position Property of Counting Objects when they are in attribute based representations
  // (KITTENS)
  public readonly attributePositionProperty: Property<Vector2>;

  // The position Property of Counting Objects when they are in location based representations
  // (APPLES, ONE_CARDS, SOCCER_BALLS, BUTTERFLIES)
  public readonly locationPositionProperty: Property<Vector2>;
  public readonly locationOpacityProperty: Property<number>;

  // Null if the bead hasn't been positioned yet (most used in the Sum Screen where beads can be added and removed)
  public readonly beadXPositionProperty: Property<number | null>;

  public readonly addendTypeProperty: Property<AddendType>;
  public readonly kittenSelectedProperty: Property<boolean>;
  public readonly id: number;

  public readonly isDraggingProperty: Property<boolean>;

  // This Property determines whether the object should move through the inactiveCountingObjects array when it
  // is removed from a left or right addend array. Used in BeadsOnWireNode, LocationCountingObjectsLayerNode,
  // and KittensLayerNode. When a counting object moves through the inactiveCountingObjects array it's addendType
  // is updated to INACTIVE which toggles visibility and participation in the model. We do not want this to happen
  // when a user is actively interacting with that object and just moving it from one addend side to another. In those
  // scenarios we want the counting object to switch directly between the left or right addend arrays.
  public traverseInactiveObjects = true;

  public constructor( providedOptions: CountingObjectOptions ) {

    const options = optionize<CountingObjectOptions, SelfOptions, PhetioObjectOptions>()( {
      phetioState: false
    }, providedOptions );
    super( options );

    this.attributePositionProperty = new Property( options.initialAttributePosition, {
      phetioValueType: Vector2.Vector2IO,
      tandem: this.tandem.createTandem( 'attributePositionProperty' ),
      phetioReadOnly: true
    } );
    this.locationPositionProperty = new Property( options.initialLocationPosition, {
      phetioValueType: Vector2.Vector2IO,
      tandem: this.tandem.createTandem( 'locationPositionProperty' ),
      phetioReadOnly: true
    } );

    // This Property does not need to be instrumented since it is only used for animation and we do not instrument
    // animations for PhET-iO
    this.locationOpacityProperty = new NumberProperty( 1, {
      range: new Range( 0, 1 )
    } );

    this.beadXPositionProperty = new Property<number | null>( options.initialBeadXPosition, {
      phetioValueType: NullableIO( NumberIO ),
      tandem: this.tandem.createTandem( 'beadXPositionProperty' ),
      phetioReadOnly: true
    } );

    // This Property should not reset. It is managed by the addend array and manually set at the end of the reset call.
    this.addendTypeProperty = new EnumerationProperty( AddendType.INACTIVE, {
      hasListenerOrderDependencies: true,
      tandem: this.tandem.createTandem( 'addendTypeProperty' ),
      phetioReadOnly: true,
      phetioFeatured: false
    } );
    this.kittenSelectedProperty = new BooleanProperty( false, {
      tandem: this.tandem.createTandem( 'focusedProperty' ),
      phetioReadOnly: true
    } );
    this.isDraggingProperty = new BooleanProperty( false, {
      tandem: this.tandem.createTandem( 'isDraggingProperty' ),
      phetioReadOnly: true
    } );

    this.id = options.id;
  }

  public reset(): void {
    this.attributePositionProperty.reset();
    this.locationPositionProperty.reset();
    this.beadXPositionProperty.reset();
    this.locationOpacityProperty.reset();
    this.kittenSelectedProperty.reset();
    this.isDraggingProperty.reset();
  }

  public static readonly CountingObjectIO = new IOType<CountingObject, CountingObjectStateObject>( 'CountingObjectIO', {
    valueType: CountingObject,
    supertype: ReferenceIO( IOType.ObjectIO )
  } );
}

numberPairs.register( 'CountingObject', CountingObject );