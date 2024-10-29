// Copyright 2024, University of Colorado Boulder
/**
 * CountingObject is the model for the individual objects users can interact with to explore the decomposition of
 * a number.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import numberPairs from '../../numberPairs.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';

export class AddendType extends EnumerationValue {
  public static readonly LEFT = new AddendType();
  public static readonly RIGHT = new AddendType();
  public static readonly INACTIVE = new AddendType();

  public static readonly enumeration = new Enumeration( AddendType );

  public constructor() {super();}
}

type SelfOptions = {
  id: number;
};
type CountingObjectOptions = SelfOptions & PhetioObjectOptions;

export const KITTEN_PANEL_WIDTH = 56;
export const KITTEN_PANEL_HEIGHT = 78;
export const KITTEN_PANEL_MARGIN = 3;

// We will probably need this to be a PhET-iO CountingObject for Group Sort later on.
export default class CountingObject extends PhetioObject {

  // The position Property of Counting Objects when they are in attribute based representations
  // (KITTENS)
  public readonly attributePositionProperty: Property<Vector2>;

  // The position Property of Counting Objects when they are in location based representations
  // (APPLES, ONE_CARDS, SOCCER_BALLS, BUTTERFLIES)
  public readonly locationPositionProperty: Property<Vector2>;
  public readonly addendTypeProperty: Property<AddendType>;
  public readonly focusedProperty: Property<boolean>;
  public readonly id: number;

  public readonly draggingProperty: Property<boolean>;

  // This Property determines whether the object should move through the inactiveCountingObjects array when it
  // is removed from a left or right addend array. Used in CubesOnWireNode, LocationCountingObjectsLayerNode,
  // and KittensLayerNode.
  public traverseInactiveObjects = true;

  public constructor( providedOptions: CountingObjectOptions ) {

    const options = optionize<CountingObjectOptions, SelfOptions, PhetioObjectOptions>()( {
      phetioType: CountingObject.CountingObjectIO,
      phetioState: false // TODO, this needs to be set to true
    }, providedOptions );
    super( options );

    this.attributePositionProperty = new Property( Vector2.ZERO, {
      phetioValueType: Vector2.Vector2IO,
      tandem: this.tandem.createTandem( 'positionProperty' )
    } );
    this.locationPositionProperty = new Property( Vector2.ZERO, {
      phetioValueType: Vector2.Vector2IO,
      tandem: this.tandem.createTandem( 'locationPositionProperty' )
    } );
    this.addendTypeProperty = new EnumerationProperty( AddendType.INACTIVE, {
      tandem: this.tandem.createTandem( 'addendTypeProperty' ),
      phetioReadOnly: false,
      phetioFeatured: false
    } );
    this.focusedProperty = new BooleanProperty( false, {
      tandem: this.tandem.createTandem( 'focusedProperty' )
    } );
    this.draggingProperty = new BooleanProperty( false, {
      tandem: this.tandem.createTandem( 'isDraggingProperty' )
    } );

    this.id = options.id;

  }

  public reset(): void {
    this.attributePositionProperty.reset();
    this.locationPositionProperty.reset();
    this.focusedProperty.reset();
    this.draggingProperty.reset();
  }

  public static CountingObjectIO = new IOType( 'CountingObjectIO', {
    valueType: CountingObject
  } );
}

numberPairs.register( 'CountingObject', CountingObject );