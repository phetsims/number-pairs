// Copyright 2025, University of Colorado Boulder

/**
 * Shared helpers for configuring the number line checkbox items so they are consistent across usages.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import Text from '../../../../scenery/js/nodes/Text.js';

import type Property from '../../../../axon/js/Property.js';
import type { VerticalCheckboxGroupItem } from '../../../../sun/js/VerticalCheckboxGroup.js';

type TextOptions = ConstructorParameters<typeof Text>[1];

export type AddendsCheckboxItemConfig = {
  property: Property<boolean>;
  textOptions: TextOptions;
  leftAddendProperty: PhetioProperty<number>;
  rightAddendProperty: TReadOnlyProperty<number>;
};

export const createAddendsCheckboxItem = ( config: AddendsCheckboxItemConfig ): VerticalCheckboxGroupItem => ( {
  property: config.property,
  createNode: () => new Text( NumberPairsFluent.addendsStringProperty, config.textOptions ),
  tandemName: 'addendsCheckbox',
  options: {
    accessibleHelpText: NumberPairsFluent.a11y.controls.addendsCheckbox.accessibleHelpTextStringProperty,
    accessibleContextResponseChecked: NumberPairsFluent.a11y.controls.addendsCheckbox.accessibleContextResponseChecked.createProperty( {
      leftAddend: config.leftAddendProperty,
      rightAddend: config.rightAddendProperty
    } ),
    accessibleContextResponseUnchecked: NumberPairsFluent.a11y.controls.addendsCheckbox.accessibleContextResponseUncheckedStringProperty
  }
} );

export type TickNumbersCheckboxItemConfig = {
  property: Property<boolean>;
  textOptions: TextOptions;
};

export const createTickNumbersCheckboxItem = ( config: TickNumbersCheckboxItemConfig ): VerticalCheckboxGroupItem => ( {
  property: config.property,
  createNode: () => new Text( NumberPairsFluent.tickNumbersStringProperty, config.textOptions ),
  tandemName: 'tickValuesCheckbox',
  options: {
    accessibleHelpText: NumberPairsFluent.a11y.controls.tickNumbersCheckbox.accessibleHelpTextStringProperty,
    accessibleContextResponseChecked: NumberPairsFluent.a11y.controls.tickNumbersCheckbox.accessibleContextResponseCheckedStringProperty,
    accessibleContextResponseUnchecked: NumberPairsFluent.a11y.controls.tickNumbersCheckbox.accessibleContextResponseUncheckedStringProperty
  }
} );
