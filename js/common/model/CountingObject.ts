// Copyright 2024-2025, University of Colorado Boulder
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import optionize from '../../../../phet-core/js/optionize.js';
/**
 * CountingObject is the model for the individual objects users can interact with to explore the decomposition of
 * a number.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import numberPairs from '../../numberPairs.js';

export class AddendType extends EnumerationValue {
  public static readonly LEFT = new AddendType();
  public static readonly RIGHT = new AddendType();
  public static readonly INACTIVE = new AddendType();

  public static readonly enumeration = new Enumeration( AddendType );

  public constructor() {super();}
}

type SelfOptions = {
  id: number;
  initialBeadXPosition: number;
};
type CountingObjectOptions = SelfOptions & PhetioObjectOptions;

export const KITTEN_PANEL_WIDTH = 56;
export const KITTEN_PANEL_HEIGHT = 82;
export const KITTEN_PANEL_MARGIN = 3;

// We will probably need this to be a PhET-iO CountingObject for Group Sort later on.
export default class CountingObject extends PhetioObject {

  // The position Property of Counting Objects when they are in attribute based representations
  // (KITTENS)
  public readonly attributePositionProperty: Property<Vector2>;

  // The position Property of Counting Objects when they are in location based representations
  // (APPLES, ONE_CARDS, SOCCER_BALLS, BUTTERFLIES)
  public readonly locationPositionProperty: Property<Vector2>;

  public readonly beadXPositionProperty: Property<number>;

  public readonly addendTypeProperty: Property<AddendType>;
  public readonly kittenSelectedProperty: Property<boolean>;
  public readonly id: number;

  public readonly draggingProperty: Property<boolean>;

  // This Property determines whether the object should move through the inactiveCountingObjects array when it
  // is removed from a left or right addend array. Used in BeadsOnWireNode, LocationCountingObjectsLayerNode,
  // and KittensLayerNode.
  public traverseInactiveObjects = true;

  public constructor( providedOptions: CountingObjectOptions ) {

    const options = optionize<CountingObjectOptions, SelfOptions, PhetioObjectOptions>()( {
      phetioType: CountingObject.CountingObjectIO,
      phetioState: false // TODO, this needs to be set to true
    }, providedOptions );
    super( options );

    this.attributePositionProperty = new Property( new Vector2( 0, 0 ), {
      phetioValueType: Vector2.Vector2IO,
      tandem: this.tandem.createTandem( 'attributePositionProperty' )
    } );
    this.locationPositionProperty = new Property( new Vector2( 0, 0 ), {
      phetioValueType: Vector2.Vector2IO,
      tandem: this.tandem.createTandem( 'locationPositionProperty' )
    } );

    // This Property should not reset. It will be managed by the NumberPairsModel.beadXPositionsProperty.
    this.beadXPositionProperty = new NumberProperty( options.initialBeadXPosition, {
      tandem: this.tandem.createTandem( 'beadXPositionProperty' )
    } );

    // This Property should not reset. It is managed by the addend array when added or removed.O
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
    this.draggingProperty = new BooleanProperty( false, {
      tandem: this.tandem.createTandem( 'isDraggingProperty' ),
      phetioReadOnly: true
    } );

    this.id = options.id;
  }

  public reset(): void {
    this.attributePositionProperty.reset();
    this.locationPositionProperty.reset();
    this.kittenSelectedProperty.reset();
    this.draggingProperty.reset();
  }

  public static CountingObjectIO = new IOType( 'CountingObjectIO', {
    valueType: CountingObject
  } );
}

numberPairs.register( 'CountingObject', CountingObject );