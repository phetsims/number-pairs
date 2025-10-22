// Copyright 2025, University of Colorado Boulder

/**
 * CountingAreaDescriptionNode provides the accessibility description for the Counting Area.
 * It includes an accessible heading and an AccessibleListNode that describes the left and right addends.
 * Counting representation nodes should be added as children to maintain proper PDOM structure.
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

type SelfOptions = {
  leftAddendProperty: TReadOnlyProperty<number>;
  leftAddendVisibleProperty: TReadOnlyProperty<boolean>;
  rightAddendProperty: TReadOnlyProperty<number>;
  rightAddendVisibleProperty: TReadOnlyProperty<boolean>;
  representationTypeProperty: Property<RepresentationType>;
  totalProperty: TReadOnlyProperty<number>;
};

type CountingAreaDescriptionNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class CountingAreaDescriptionNode extends Node {

  public readonly leftValueStringProperty: TReadOnlyProperty<string>;
  public readonly rightValueStringProperty: TReadOnlyProperty<string>;

  public constructor( locationLayerVisibleProperty: TReadOnlyProperty<boolean>, providedOptions: CountingAreaDescriptionNodeOptions ) {

    const leftValueStringProperty = new DerivedProperty(
      [ providedOptions.leftAddendProperty, providedOptions.leftAddendVisibleProperty, NumberPairsFluent.a11y.countingArea.valueHiddenStringProperty ],
      ( leftAddend: number, leftAddendVisible: boolean, valueHiddenString: string ) => leftAddendVisible ? leftAddend.toString() : valueHiddenString
    );

    const rightValueStringProperty = new DerivedProperty(
      [ providedOptions.rightAddendProperty, providedOptions.rightAddendVisibleProperty, NumberPairsFluent.a11y.countingArea.valueHiddenStringProperty ],
      ( rightAddend: number, rightAddendVisible: boolean, valueHiddenString: string ) => rightAddendVisible ? rightAddend.toString() : valueHiddenString
    );

    const showObjectLocationsProperty = derived( providedOptions.representationTypeProperty, locationLayerVisibleProperty, ( representationType, locationLayerVisible ) => representationType !== RepresentationType.BEADS && locationLayerVisible );
    const showObjectSidesProperty = derived( providedOptions.representationTypeProperty, locationLayerVisibleProperty, ( representationType, locationLayerVisible ) => representationType !== RepresentationType.BEADS && !locationLayerVisible );
    const showBeadsProperty = derived( providedOptions.representationTypeProperty, representationType => representationType === RepresentationType.BEADS );

    // TODO: For review, is there a better way to make sure these pairs are mutually exclusive, or is this a good approach? See https://github.com/phetsims/number-pairs/issues/206
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
      } )
    } );

    const options = optionize<CountingAreaDescriptionNodeOptions, EmptySelfOptions, NodeOptions>()( {
      accessibleHeading: NumberPairsFluent.a11y.countingArea.accessibleHeadingStringProperty,
      children: [ countingAreaAccessibleListNode ]
    }, providedOptions );

    super( options );

    this.leftValueStringProperty = leftValueStringProperty;
    this.rightValueStringProperty = rightValueStringProperty;
  }
}

numberPairs.register( 'CountingAreaDescriptionNode', CountingAreaDescriptionNode );
