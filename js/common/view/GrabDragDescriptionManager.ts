// Copyright 2025, University of Colorado Boulder
/**
 * This file manages the creation of the a11y description strings for grab and drag interactions in Number Pairs.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';


export default class GrabDragDescriptionManager {

  // Pattern string Properties used for describing the selected item based on its position in the addend
  private readonly firstLeftItemDescriptionProperty: TReadOnlyProperty<string>;
  private readonly firstRightItemDescriptionProperty: TReadOnlyProperty<string>;
  private readonly leftItemDescriptionProperty: TReadOnlyProperty<string>;
  private readonly rightItemDescriptionProperty: TReadOnlyProperty<string>;
  private readonly lastLeftItemDescriptionProperty: TReadOnlyProperty<string>;
  private readonly lastRightItemDescriptionProperty: TReadOnlyProperty<string>;
  private readonly onlyLeftItemDescriptionProperty: TReadOnlyProperty<string>;
  private readonly onlyRightItemDescriptionProperty: TReadOnlyProperty<string>;

  // String Properties used for describing the help text when an item is grabbed or released
  private readonly grabbedHelpTextStringProperty: TReadOnlyProperty<string>;
  private readonly releasedHelpTextStringProperty: TReadOnlyProperty<string>;

  private static readonly noItemSelectedStringProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.noItemSelectedStringProperty;

  /**
   *
   * @param leftItemProperty - the string used to describe items that are part of the left addend
   * @param rightItemProperty - the string used to describe items that are part of the right addend
   * @param itemProperty - the string used to describe a singular item
   */
  public constructor( leftItemProperty: TReadOnlyProperty<string>, rightItemProperty: TReadOnlyProperty<string>, itemProperty: TReadOnlyProperty<string> ) {

    this.firstLeftItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.firstLeftItemPattern.createProperty( {
      item: leftItemProperty
    } );
    this.leftItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.leftItemPattern.createProperty( {
      item: leftItemProperty
    } );
    this.lastLeftItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.lastLeftItemPattern.createProperty( {
      item: leftItemProperty
    } );
    this.onlyLeftItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.onlyLeftItemPattern.createProperty( {
      item: leftItemProperty
    } );

    this.firstRightItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.firstRightItemPattern.createProperty( {
      item: rightItemProperty
    } );
    this.rightItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.rightItemPattern.createProperty( {
      item: rightItemProperty
    } );
    this.lastRightItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.lastRightItemPattern.createProperty( {
      item: rightItemProperty
    } );
    this.onlyRightItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.onlyRightItemPattern.createProperty( {
      item: rightItemProperty
    } );

    this.grabbedHelpTextStringProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.grabbedHelpTextPattern.createProperty( {
      item: itemProperty
    } );
    this.releasedHelpTextStringProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.releasedHelpText.createProperty( {
      item: itemProperty
    } );
  }

  public createItemDescriptionProperty( selectedGroupItemProperty: TReadOnlyProperty<CountingObject | null>,
                                        getLeftAddendCountingObjects: () => CountingObject[],
                                        getRightAddendCountingObjects: () => CountingObject[],
                                        leftAddendObjectsLengthProperty: TReadOnlyProperty<number>,
                                        rightAddendObjectsLengthProperty: TReadOnlyProperty<number>,
                                        addendTypeProperties: TReadOnlyProperty<AddendType>[]
  ): TReadOnlyProperty<string> {

    // Once a group item is selected, the description will be set appropriately,
    // and if the selected item is cleared, the description will remain as it was (until another item is selected).
    let stringProperty: TReadOnlyProperty<string> = GrabDragDescriptionManager.noItemSelectedStringProperty;

    // Must use deriveAny here because addendTypeProperties is of unknown length.
    stringProperty = DerivedProperty.deriveAny( [
        leftAddendObjectsLengthProperty,
        rightAddendObjectsLengthProperty,
        selectedGroupItemProperty,
        this.onlyLeftItemDescriptionProperty, this.onlyRightItemDescriptionProperty,
        this.lastLeftItemDescriptionProperty, this.lastRightItemDescriptionProperty,
        this.firstLeftItemDescriptionProperty, this.firstRightItemDescriptionProperty,
        this.leftItemDescriptionProperty, this.rightItemDescriptionProperty,
        ...addendTypeProperties ],
      () => {

        // Convenience variables for the DerivedProperty dependencies
        const leftAddendObjectsLength = leftAddendObjectsLengthProperty.value;
        const rightAddendObjectsLength = rightAddendObjectsLengthProperty.value;
        const selectedObject = selectedGroupItemProperty.value;
        const onlyLeftItem = this.onlyLeftItemDescriptionProperty.value;
        const onlyRightItem = this.onlyRightItemDescriptionProperty.value;
        const lastLeftItem = this.lastLeftItemDescriptionProperty.value;
        const lastRightItem = this.lastRightItemDescriptionProperty.value;
        const firstLeftItem = this.firstLeftItemDescriptionProperty.value;
        const firstRightItem = this.firstRightItemDescriptionProperty.value;
        const leftItem = this.leftItemDescriptionProperty.value;
        const rightItem = this.rightItemDescriptionProperty.value;

        const leftAddendCountingObjects = getLeftAddendCountingObjects();
        const rightAddendCountingObjects = getRightAddendCountingObjects();

        if ( selectedObject ) {

          // Do not use selectedObject.addendTypeProperty here, because the object may be in transition between addends
          // due to listener order. Instead, check which addend array it is currently in.
          const isInLeftAddend = leftAddendCountingObjects.includes( selectedObject );
          const selectedAddendCountingObjects = isInLeftAddend ? leftAddendCountingObjects : rightAddendCountingObjects;
          if ( selectedAddendCountingObjects.length === 1 ) {
            return isInLeftAddend ? onlyLeftItem : onlyRightItem;
          }
          else {
            const index = selectedAddendCountingObjects.indexOf( selectedObject );
            return index === 0 ? ( isInLeftAddend ? firstLeftItem : firstRightItem ) :
                   index === selectedAddendCountingObjects.length - 1 ? ( isInLeftAddend ? lastLeftItem : lastRightItem ) :
                   isInLeftAddend ? leftItem : rightItem;
          }
        }
        else if ( leftAddendObjectsLength === 0 && rightAddendObjectsLength === 0 ) {

          // TODO: https://github.com/phetsims/number-pairs/issues/200 We must add NumberPairsFluent.a11y.countingAreaEmptyStringProperty as a dependency
          // so this will be re-evaluated when that string changes, otherwise we could end up with a stale string value
          return NumberPairsFluent.a11y.countingAreaEmptyStringProperty.value;
        }
        else {
          return stringProperty.value; // keep the previous value
        }
      } );
    return stringProperty;
  }

  public createHelpTextProperty( isGroupItemKeyboardGrabbedProperty: TReadOnlyProperty<boolean> ): TReadOnlyProperty<string> {
    return new DerivedProperty( [ isGroupItemKeyboardGrabbedProperty, this.grabbedHelpTextStringProperty, this.releasedHelpTextStringProperty ],
      ( isGrabbed, grabbedHelpText, releasedHelpText ) => {
        return isGrabbed ? grabbedHelpText : releasedHelpText;
      } );
  }
}

numberPairs.register( 'GrabDragDescriptionManager', GrabDragDescriptionManager );