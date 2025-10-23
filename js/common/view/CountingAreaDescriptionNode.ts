// Copyright 2025, University of Colorado Boulder

/**
 * CountingAreaDescriptionNode provides the accessibility description for the Counting Area.
 * It includes an accessible heading and switches between the general counting area list and the number line description.
 * Counting representation nodes should be added as children to maintain proper PDOM structure.
 *
 * TODO: https://github.com/phetsims/number-pairs/issues/200 Move into description/, preserving git history
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import derived from '../../../../axon/js/derived.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import AccessibleListNode from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import RepresentationType from '../model/RepresentationType.js';
import NumberLineDescription from './description/NumberLineDescription.js';

type SelfOptions = {
  leftAddendProperty: TReadOnlyProperty<number>;
  leftAddendVisibleProperty: TReadOnlyProperty<boolean>;
  rightAddendProperty: TReadOnlyProperty<number>;
  rightAddendVisibleProperty: TReadOnlyProperty<boolean>;
  representationTypeProperty: Property<RepresentationType>;
  totalProperty: TReadOnlyProperty<number>;
  numberLineRepresentationVisibleProperty: TReadOnlyProperty<boolean>;
  numberLineVisibleProperty: TReadOnlyProperty<boolean>;
  numberLineCountFromZeroProperty: TReadOnlyProperty<boolean>;
  numberLineAddendValuesVisibleProperty: TReadOnlyProperty<boolean>;
  numberLineTickValuesVisibleProperty: TReadOnlyProperty<boolean>;
  totalJumpVisibleProperty: TReadOnlyProperty<boolean>;
};

type CountingAreaDescriptionNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class CountingAreaDescriptionNode extends Node {

  public readonly leftValueStringProperty: TReadOnlyProperty<string>;
  public readonly rightValueStringProperty: TReadOnlyProperty<string>;

  public constructor( locationLayerVisibleProperty: TReadOnlyProperty<boolean>, providedOptions: CountingAreaDescriptionNodeOptions ) {

    // TODO: https://github.com/phetsims/number-pairs/issues/200 Use derived?
    const leftValueStringProperty = new DerivedProperty(
      [ providedOptions.leftAddendProperty, providedOptions.leftAddendVisibleProperty, NumberPairsFluent.a11y.countingArea.valueHiddenStringProperty ],

      // TODO: https://github.com/phetsims/number-pairs/issues/200 omit redundant type declarations
      ( leftAddend: number, leftAddendVisible: boolean, valueHiddenString: string ) => leftAddendVisible ? leftAddend.toString() : valueHiddenString
    );

    // TODO: https://github.com/phetsims/number-pairs/issues/200 Use derived
    // TODO: https://github.com/phetsims/number-pairs/issues/200 ok to `derived` instead of new DerivedProperty throughout the whole sim?
    const rightValueStringProperty = new DerivedProperty(
      [ providedOptions.rightAddendProperty, providedOptions.rightAddendVisibleProperty, NumberPairsFluent.a11y.countingArea.valueHiddenStringProperty ],

      // TODO: https://github.com/phetsims/number-pairs/issues/200 omit redundant type declarations
      ( rightAddend: number, rightAddendVisible: boolean, valueHiddenString: string ) => rightAddendVisible ? rightAddend.toString() : valueHiddenString
    );

    const showObjectLocationsProperty = derived( providedOptions.representationTypeProperty, locationLayerVisibleProperty, ( representationType, locationLayerVisible ) => representationType !== RepresentationType.BEADS && locationLayerVisible );
    const showObjectSidesProperty = derived( providedOptions.representationTypeProperty, locationLayerVisibleProperty, ( representationType, locationLayerVisible ) => representationType !== RepresentationType.BEADS && !locationLayerVisible );
    const showBeadsProperty = derived( providedOptions.representationTypeProperty, representationType => representationType === RepresentationType.BEADS );

    const countingAreaAccessibleListVisibleProperty = DerivedProperty.not( providedOptions.numberLineRepresentationVisibleProperty );

    const countingAreaAccessibleListNode = new AccessibleListNode( [
      {
        stringProperty: NumberPairsFluent.a11y.countingArea.leftSideListItemPattern.createProperty( { value: leftValueStringProperty } ),
        visibleProperty: showObjectLocationsProperty
      },
      {
        stringProperty: NumberPairsFluent.a11y.countingArea.rightSideListItemPattern.createProperty( { value: rightValueStringProperty } ),
        visibleProperty: showObjectLocationsProperty
      },
      {
        stringProperty: NumberPairsFluent.a11y.countingArea.yellowListItemPattern.createProperty( { value: leftValueStringProperty } ),
        visibleProperty: showObjectSidesProperty
      },
      {
        stringProperty: NumberPairsFluent.a11y.countingArea.blueListItemPattern.createProperty( { value: rightValueStringProperty } ),
        visibleProperty: showObjectSidesProperty
      },
      {
        stringProperty: NumberPairsFluent.a11y.countingArea.leftSideBeadsPattern.createProperty( { value: leftValueStringProperty } ),
        visibleProperty: showBeadsProperty
      },
      {
        stringProperty: NumberPairsFluent.a11y.countingArea.rightSideBeadsPattern.createProperty( { value: rightValueStringProperty } ),
        visibleProperty: showBeadsProperty
      }
    ], {
      leadingParagraphStringProperty: NumberPairsFluent.a11y.countingArea.leadingParagraph.createProperty( {
        total: providedOptions.totalProperty,
        item: new DynamicProperty( providedOptions.representationTypeProperty, {
          derive: 'singularAccessibleName'
        } ),
        items: new DynamicProperty( providedOptions.representationTypeProperty, {
          derive: 'accessibleName'
        } )
      } ),
      visibleProperty: countingAreaAccessibleListVisibleProperty
    } );

    const numberLineDescription = new NumberLineDescription( {
      numberLineVisibleProperty: providedOptions.numberLineVisibleProperty,
      numberLineRepresentationVisibleProperty: providedOptions.numberLineRepresentationVisibleProperty,
      numberLineCountFromZeroProperty: providedOptions.numberLineCountFromZeroProperty,
      tickValuesVisibleProperty: providedOptions.numberLineTickValuesVisibleProperty,
      numberLineAddendValuesVisibleProperty: providedOptions.numberLineAddendValuesVisibleProperty,
      totalJumpVisibleProperty: providedOptions.totalJumpVisibleProperty,
      leftAddendProperty: providedOptions.leftAddendProperty,
      rightAddendProperty: providedOptions.rightAddendProperty,
      totalProperty: providedOptions.totalProperty
    } );

    const options = optionize<CountingAreaDescriptionNodeOptions, EmptySelfOptions, NodeOptions>()( {
      accessibleHeading: NumberPairsFluent.a11y.countingArea.accessibleHeadingStringProperty,
      children: [
        countingAreaAccessibleListNode,
        numberLineDescription
      ]
    }, providedOptions );

    super( options );

    this.leftValueStringProperty = leftValueStringProperty;
    this.rightValueStringProperty = rightValueStringProperty;
  }
}

numberPairs.register( 'CountingAreaDescriptionNode', CountingAreaDescriptionNode );
