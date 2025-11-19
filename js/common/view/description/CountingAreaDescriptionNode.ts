// Copyright 2025, University of Colorado Boulder

/**
 * CountingAreaDescriptionNode provides the accessibility description for the Counting Area.
 * It includes an accessible heading and switches between the general counting area list and the number line description.
 * Counting representation nodes should be added as children to maintain proper PDOM structure.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import derived from '../../../../../axon/js/derived.js';
import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../../axon/js/DynamicProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../../phet-core/js/types/PickRequired.js';
import AccessibleListNode from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import ParallelDOM from '../../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import Node, { NodeOptions } from '../../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../../numberPairs.js';
import NumberPairsFluent from '../../../NumberPairsFluent.js';
import NumberPairsModel from '../../model/NumberPairsModel.js';
import RepresentationType from '../../model/RepresentationType.js';
import NumberLineDescription from './NumberLineDescription.js';

type SelfOptions = EmptySelfOptions;

type CountingAreaDescriptionNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class CountingAreaDescriptionNode extends Node {

  //REVIEW Document fields
  public readonly leftValueStringProperty: TReadOnlyProperty<string>;
  public readonly rightValueStringProperty: TReadOnlyProperty<string>;

  public constructor( model: NumberPairsModel, numberLineRepresentationVisibleProperty: TReadOnlyProperty<boolean>,
                      numberLineVisibleProperty: TReadOnlyProperty<boolean>, providedOptions: CountingAreaDescriptionNodeOptions ) {
    const leftAddendProperty = model.leftAddendProperty;
    const leftAddendVisibleProperty = model.leftAddendVisibleProperty;
    const rightAddendProperty = model.rightAddendProperty;
    const rightAddendVisibleProperty = model.rightAddendVisibleProperty;
    const representationTypeProperty = model.representationTypeProperty;
    const totalProperty = model.totalProperty;
    const numberLineCountFromZeroProperty = model.numberLineCountFromZeroProperty;
    const numberLineAddendValuesVisibleProperty = model.numberLineAddendValuesVisibleProperty;
    const numberLineTickValuesVisibleProperty = model.tickValuesVisibleProperty;
    const totalJumpVisibleProperty = model.totalJumpVisibleProperty;
    const locationLayerVisibleProperty = model.locationLayerVisibleProperty;
    const leftValueStringProperty = derived( leftAddendProperty, leftAddendVisibleProperty, NumberPairsFluent.a11y.countingArea.addendValueHiddenStringProperty,
      ( leftAddend, leftAddendVisible, valueHiddenString ) => leftAddendVisible ? leftAddend.toString() : valueHiddenString
    );

    const rightValueStringProperty = derived( rightAddendProperty, rightAddendVisibleProperty, NumberPairsFluent.a11y.countingArea.addendValueHiddenStringProperty,
      ( rightAddend, rightAddendVisible, valueHiddenString ) => rightAddendVisible ? rightAddend.toString() : valueHiddenString
    );

    const showObjectLocationsProperty = derived( representationTypeProperty, locationLayerVisibleProperty,
      ( representationType, locationLayerVisible ) => representationType !== RepresentationType.BEADS && locationLayerVisible );
    const showObjectSidesProperty = derived( representationTypeProperty, locationLayerVisibleProperty,
      ( representationType, locationLayerVisible ) => representationType !== RepresentationType.BEADS && !locationLayerVisible );
    const showBeadsProperty = representationTypeProperty.derived( representationType => representationType === RepresentationType.BEADS );
    const totalVariantStringProperty = model.totalVisibleProperty.derived( totalVisible => totalVisible ? 'shown' : 'hidden' );

    const countingAreaAccessibleListVisibleProperty = DerivedProperty.not( numberLineRepresentationVisibleProperty );

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
        totalVisible: totalVariantStringProperty,
        total: totalProperty,
        item: new DynamicProperty( representationTypeProperty, {
          derive: 'singularAccessibleName'
        } ),
        items: new DynamicProperty( representationTypeProperty, {
          derive: 'accessibleName'
        } )
      } ),
      visibleProperty: countingAreaAccessibleListVisibleProperty
    } );

    const numberLineDescription = new NumberLineDescription( {
      numberLineVisibleProperty: numberLineVisibleProperty,
      numberLineRepresentationVisibleProperty: numberLineRepresentationVisibleProperty,
      numberLineCountFromZeroProperty: numberLineCountFromZeroProperty,
      tickValuesVisibleProperty: numberLineTickValuesVisibleProperty,
      numberLineAddendValuesVisibleProperty: numberLineAddendValuesVisibleProperty,
      totalJumpVisibleProperty: totalJumpVisibleProperty,
      leftAddendProperty: leftAddendProperty,
      rightAddendProperty: rightAddendProperty,
      totalProperty: totalProperty
    } );

    // The accessibleHelpText that describes the interaction needs to come after the counting area list.
    // A placeholder Node gives us more control over the order.
    const accessibleHelpTextNode = new Node();

    //REVIEW Violates PhET's options pattern. SelfOptions should used here instead of EmptySelfOptions.
    const options = optionize<CountingAreaDescriptionNodeOptions, EmptySelfOptions, NodeOptions>()( {
      accessibleHeading: NumberPairsFluent.a11y.countingArea.accessibleHeadingStringProperty,
      children: [
        countingAreaAccessibleListNode,
        accessibleHelpTextNode,
        numberLineDescription
      ]
    }, providedOptions );

    super( options );

    // So that setting the `accessibleHelpText` on this Node forwards the content to the correct child Node.
    ParallelDOM.forwardHelpText( this, accessibleHelpTextNode );

    this.leftValueStringProperty = leftValueStringProperty;
    this.rightValueStringProperty = rightValueStringProperty;
  }
}

numberPairs.register( 'CountingAreaDescriptionNode', CountingAreaDescriptionNode );
