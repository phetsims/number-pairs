// Copyright 2025, University of Colorado Boulder

/**
 * Description for the number line representation in Number Pairs.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import derived from '../../../../../axon/js/derived.js';
import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import AccessibleListNode, { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import numberPairs from '../../../numberPairs.js';
import NumberPairsFluent from '../../../NumberPairsFluent.js';

export type NumberLineDescriptionOptions = {
  readonly numberLineVisibleProperty: TReadOnlyProperty<boolean>;
  readonly numberLineRepresentationVisibleProperty: TReadOnlyProperty<boolean>;
  readonly numberLineCountFromZeroProperty: TReadOnlyProperty<boolean>;
  readonly tickValuesVisibleProperty: TReadOnlyProperty<boolean>;
  readonly numberLineAddendValuesVisibleProperty: TReadOnlyProperty<boolean>;
  readonly totalJumpVisibleProperty: TReadOnlyProperty<boolean>;
  readonly leftAddendProperty: TReadOnlyProperty<number>;
  readonly rightAddendProperty: TReadOnlyProperty<number>;
  readonly totalProperty: TReadOnlyProperty<number>;
};

export default class NumberLineDescription extends AccessibleListNode {

  public constructor( options: NumberLineDescriptionOptions ) {

    const leftEdgeLabelStringProperty = NumberPairsFluent.a11y.numberLineDescription.leftEdgeLabelStringProperty;
    const totalLabelStringProperty = NumberPairsFluent.a11y.numberLineDescription.totalLabelStringProperty;
    const knobLabelStringProperty = NumberPairsFluent.a11y.numberLineDescription.knobLabelStringProperty;

    const totalStartStringProperty = derived(
      options.tickValuesVisibleProperty, leftEdgeLabelStringProperty,
      ( tickMarksVisible, leftEdgeLabel ) => tickMarksVisible ? '0' : leftEdgeLabel
    );

    const totalEndStringProperty = derived(
      options.tickValuesVisibleProperty, totalLabelStringProperty, options.totalProperty,
      ( tickMarksVisible, totalLabel, totalString ) => tickMarksVisible ? totalString : totalLabel
    );

    const totalStartsPatternProperty = NumberPairsFluent.a11y.numberLineDescription.totalStartsPattern.createProperty( {
      start: totalStartStringProperty,
      end: totalEndStringProperty
    } );

    const totalSpansPatternProperty = NumberPairsFluent.a11y.numberLineDescription.totalSpansPattern.createProperty( {
      start: totalStartStringProperty,
      end: totalEndStringProperty
    } );

    const totalDescriptionStringProperty = derived(
      options.numberLineCountFromZeroProperty,
      totalSpansPatternProperty,
      totalStartsPatternProperty,
      ( countFromZero, totalSpansString, totalStartsString ) => countFromZero ? totalSpansString : totalStartsString
    );

    const knobIsAtPatternProperty = NumberPairsFluent.a11y.numberLineDescription.knobIsAtPattern.createProperty( {
      value: options.leftAddendProperty
    } );

    const knobSplitsStringProperty = NumberPairsFluent.a11y.numberLineDescription.knobSplitsStringProperty;

    const knobDescriptionStringProperty = derived(
      options.tickValuesVisibleProperty,
      knobIsAtPatternProperty,
      knobSplitsStringProperty,
      ( tickMarksVisible, knobIsAtString, knobSplitsString ) => tickMarksVisible ? knobIsAtString : knobSplitsString
    );

    const countOnLeftAddendStringProperty = NumberPairsFluent.a11y.numberLineDescription.countOnLeftAddendPattern.createProperty( {
      left: options.leftAddendProperty
    } );

    const leftAddendOrKnobStringProperty = derived(
      options.tickValuesVisibleProperty,
      options.leftAddendProperty,
      knobLabelStringProperty,
      ( tickMarksVisible, leftAddendString, knobLabel ) => tickMarksVisible ? leftAddendString : knobLabel
    );

    const countOnJumpStringProperty = NumberPairsFluent.a11y.numberLineDescription.countOnJumpPattern.createProperty( {
      right: options.rightAddendProperty,
      start: leftAddendOrKnobStringProperty
    } );

    const countFromZeroLeftAddendStringProperty = NumberPairsFluent.a11y.numberLineDescription.countFromZeroLeftAddendPattern.createProperty( {
      left: options.leftAddendProperty
    } );

    const countFromZeroRightAddendStringProperty = NumberPairsFluent.a11y.numberLineDescription.countFromZeroRightAddendPattern.createProperty( {
      right: options.rightAddendProperty,
      start: leftAddendOrKnobStringProperty
    } );

    const countOnTotalJumpStringProperty = NumberPairsFluent.a11y.numberLineDescription.countOnTotalJumpPattern.createProperty( {
      total: options.totalProperty
    } );

    const countFromZeroTotalJumpStringProperty = NumberPairsFluent.a11y.numberLineDescription.countFromZeroTotalJumpPattern.createProperty( {
      total: options.totalProperty
    } );

    const totalJumpStringProperty = derived( options.numberLineCountFromZeroProperty, countFromZeroTotalJumpStringProperty, countOnTotalJumpStringProperty,
      ( countFromZero, countFromZeroString, countOnString ) => countFromZero ? countFromZeroString : countOnString
    );

    const leadingCountOnStringProperty = NumberPairsFluent.a11y.numberLineDescription.leadingCountOnStringProperty;
    const leadingCountFromZeroStringProperty = NumberPairsFluent.a11y.numberLineDescription.leadingCountFromZeroStringProperty;
    const leadingHiddenStringProperty = NumberPairsFluent.a11y.numberLineDescription.leadingHiddenStringProperty;

    const leadingParagraphStringProperty = derived(
      options.numberLineVisibleProperty, options.numberLineCountFromZeroProperty, leadingCountOnStringProperty,
      leadingCountFromZeroStringProperty, leadingHiddenStringProperty,
      ( numberLineVisible, countFromZero, countOnString, countFromZeroString, hiddenString ) => {
        if ( !numberLineVisible ) {
          return hiddenString;
        }
        return countFromZero ? countFromZeroString : countOnString;
      }
    );

    const countOnVisibleProperty = DerivedProperty.and( [
      options.numberLineVisibleProperty,
      DerivedProperty.not( options.numberLineCountFromZeroProperty )
    ] );

    const countFromZeroVisibleProperty = DerivedProperty.and( [
      options.numberLineVisibleProperty,
      options.numberLineCountFromZeroProperty
    ] );

    const countOnAddendsVisibleProperty = DerivedProperty.and( [
      countOnVisibleProperty,
      options.numberLineAddendValuesVisibleProperty
    ] );

    const countFromZeroAddendsVisibleProperty = DerivedProperty.and( [
      countFromZeroVisibleProperty,
      options.numberLineAddendValuesVisibleProperty
    ] );

    const totalJumpListItemVisibleProperty = DerivedProperty.and( [
      options.numberLineVisibleProperty,
      options.totalJumpVisibleProperty
    ] );

    const listItems: AccessibleListItem[] = [
      {
        stringProperty: totalDescriptionStringProperty,
        visibleProperty: options.numberLineVisibleProperty
      },
      {
        stringProperty: knobDescriptionStringProperty,
        visibleProperty: options.numberLineVisibleProperty
      },
      {
        stringProperty: countOnLeftAddendStringProperty,
        visibleProperty: countOnAddendsVisibleProperty
      },
      {
        stringProperty: countOnJumpStringProperty,
        visibleProperty: countOnAddendsVisibleProperty
      },
      {
        stringProperty: countFromZeroLeftAddendStringProperty,
        visibleProperty: countFromZeroAddendsVisibleProperty
      },
      {
        stringProperty: countFromZeroRightAddendStringProperty,
        visibleProperty: countFromZeroAddendsVisibleProperty
      },
      {
        stringProperty: totalJumpStringProperty,
        visibleProperty: totalJumpListItemVisibleProperty
      }
    ];

    super( listItems, {
      leadingParagraphStringProperty: leadingParagraphStringProperty,
      visibleProperty: options.numberLineRepresentationVisibleProperty
    } );
  }
}

numberPairs.register( 'NumberLineDescription', NumberLineDescription );
