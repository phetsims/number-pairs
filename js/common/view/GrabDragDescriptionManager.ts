// Copyright 2025, University of Colorado Boulder
/**
 * This file manages the creation of the a11y description strings for grab and drag interactions in Number Pairs.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';


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
  /**
   *
   * @param leftItemProperty - the string used to describe items that are part of the left addend
   * @param rightItemProperty - the string used to describe items that are part of the right addend
   * @param itemsProperty - the string used to describe plural items
   */
  public constructor( leftItemProperty: TReadOnlyProperty<string>, rightItemProperty: TReadOnlyProperty<string>, itemsProperty: TReadOnlyProperty<string> ) {

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
      item: itemsProperty
    } );
    this.releasedHelpTextStringProperty = NumberPairsFluent.a11y.grabOrReleaseInteraction.releasedHelpTextStringProperty;
  }

  public createItemDescriptionProperty( selectedGroupItemProperty: TReadOnlyProperty<CountingObject | null>,
                                               getLeftAddendCountingObjects: () => CountingObject[],
                                               getRightAddendCountingObjects: () => CountingObject[],
                                               leftAddendProperty: TReadOnlyProperty<number>,
                                               rightAddendProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {

    // We set the value as null at startup. Once a group item is selected, the description will be set appropriately,
    // and if the selected item is cleared, the description will remain as it was (until another item is selected).
    let stringProperty: TReadOnlyProperty<string> = new Property( 'null' );
    stringProperty = new DerivedProperty( [ leftAddendProperty, rightAddendProperty,
        selectedGroupItemProperty,
        this.onlyLeftItemDescriptionProperty, this.onlyRightItemDescriptionProperty,
        this.lastLeftItemDescriptionProperty, this.lastRightItemDescriptionProperty,
        this.firstLeftItemDescriptionProperty, this.firstRightItemDescriptionProperty,
        this.leftItemDescriptionProperty, this.rightItemDescriptionProperty ],
      ( leftAddend, rightAddend, selectedObject,
        onlyLeftItem, onlyRightItem, lastLeftItem, lastRightItem, firstLeftItem, firstRightItem, leftItem, rightItem ) => {
        if ( selectedObject ) {
          const leftAddendCountingObjects = getLeftAddendCountingObjects();
          const rightAddendCountingObjects = getRightAddendCountingObjects();
          const selectedAddendCountingObjects = selectedObject.addendTypeProperty.value === AddendType.LEFT ? leftAddendCountingObjects : rightAddendCountingObjects;
          if ( selectedAddendCountingObjects.length === 1 ) {
            return selectedObject.addendTypeProperty.value === AddendType.LEFT ? onlyLeftItem : onlyRightItem;
          }
          else {
            const index = selectedAddendCountingObjects.indexOf( selectedObject );
            return index === 0 ? ( selectedObject.addendTypeProperty.value === AddendType.LEFT ? firstLeftItem : firstRightItem ) :
                   index === selectedAddendCountingObjects.length - 1 ? ( selectedObject.addendTypeProperty.value === AddendType.LEFT ? lastLeftItem : lastRightItem ) :
                   selectedObject.addendTypeProperty.value === AddendType.LEFT ? leftItem : rightItem;
          }
        }
        else if ( leftAddend === 0 && rightAddend === 0 ) {
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