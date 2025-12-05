// Copyright 2025, University of Colorado Boulder
/**
 * This file manages the creation of the a11y description strings for grab and drag interactions in Number Pairs.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import derivedTernary from '../../../../../axon/js/derivedTernary.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import numberPairs from '../../../numberPairs.js';
import NumberPairsFluent from '../../../NumberPairsFluent.js';
import CountingObject, { AddendType } from '../../model/CountingObject.js';
import RepresentationType from '../../model/RepresentationType.js';

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
   * @param itemsProperty - the string used to describe multiple items
   * @param representationTypeProperty - the representation type property, used to determine specific wording for certain representations
   */
  public constructor( leftItemProperty: TReadOnlyProperty<string>, rightItemProperty: TReadOnlyProperty<string>,
                      itemProperty: TReadOnlyProperty<string>, itemsProperty: TReadOnlyProperty<string>,
                      representationTypeProperty: TReadOnlyProperty<RepresentationType> ) {

    this.firstLeftItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.leftSide.firstItemPattern.createProperty( {
      item: leftItemProperty
    } );
    this.leftItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.leftSide.itemPattern.createProperty( {
      item: leftItemProperty
    } );
    this.lastLeftItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.leftSide.lastItemPattern.createProperty( {
      item: leftItemProperty
    } );
    this.onlyLeftItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.leftSide.onlyItemPattern.createProperty( {
      item: leftItemProperty
    } );

    this.firstRightItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.rightSide.firstItemPattern.createProperty( {
      item: rightItemProperty
    } );
    this.rightItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.rightSide.itemPattern.createProperty( {
      item: rightItemProperty
    } );
    this.lastRightItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.rightSide.lastItemPattern.createProperty( {
      item: rightItemProperty
    } );
    this.onlyRightItemDescriptionProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.rightSide.onlyItemPattern.createProperty( {
      item: rightItemProperty
    } );

    // Used to satisfy the fluent selector pattern.
    const representationTypeSelectProperty = representationTypeProperty.derived( representationType => representationType === RepresentationType.BEADS ? 'beads' : 'other' );
    this.grabbedHelpTextStringProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.grabbedHelpTextPattern.createProperty( {
      representationType: representationTypeSelectProperty,
      item: itemProperty
    } );
    this.releasedHelpTextStringProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.releasedHelpText.createProperty( {
      representationType: representationTypeSelectProperty,
      representation: itemsProperty
    } );
  }

  /**
   * Creates a derived property that provides a context-aware description of the currently selected item.
   * The description varies based on the item's position within its addend (first, middle, last, or only item)
   * and which addend (left or right) the item belongs to.
   *
   * The method uses DerivedProperty.deriveAny to monitor all relevant dependencies, including the dynamic
   * addendTypeProperties array. When the selected item changes, it determines:
   * 1. Which addend the item is currently in (left or right)
   * 2. The item's position within that addend (first, middle, last, or only)
   * 3. Returns the appropriate description string based on these factors
   *
   * Special behaviors:
   * - If no item is selected and both addends are empty, returns the "counting area empty" message
   * - If no item is selected but addends have items, retains the previous description
   * - Uses the actual addend arrays (not addendTypeProperty) to avoid listener order issues during transitions
   *
   * @param selectedGroupItemProperty - The currently selected counting object, or null if none is selected
   * @param getLeftAddendCountingObjects - Function that returns the array of counting objects in the left addend
   * @param getRightAddendCountingObjects - Function that returns the array of counting objects in the right addend
   * @param leftAddendObjectsLengthProperty - The number of objects in the left addend
   * @param rightAddendObjectsLengthProperty - The number of objects in the right addend
   * @param addendTypeProperties - Array of properties tracking the addend type for each counting object
   */
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
        NumberPairsFluent.a11y.countingAreaEmptyStringProperty,
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
          return NumberPairsFluent.a11y.countingAreaEmptyStringProperty.value;
        }
        else {
          return stringProperty.value; // keep the previous value
        }
      } );
    return stringProperty;
  }

  /**
   * Creates a derived property that provides context-sensitive help text based on whether an item is currently grabbed.
   * Returns grabbed help text when an item is keyboard-grabbed, and released help text when an item is not grabbed.
   *
   * @param isGroupItemKeyboardGrabbedProperty - Property indicating whether a group item is currently keyboard-grabbed
   */
  public createHelpTextProperty( isGroupItemKeyboardGrabbedProperty: TReadOnlyProperty<boolean> ): TReadOnlyProperty<string> {
    return derivedTernary( isGroupItemKeyboardGrabbedProperty, {
      true: this.grabbedHelpTextStringProperty,
      false: this.releasedHelpTextStringProperty
    } );
  }
}

numberPairs.register( 'GrabDragDescriptionManager', GrabDragDescriptionManager );