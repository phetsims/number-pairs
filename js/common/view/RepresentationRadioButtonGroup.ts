// Copyright 2024-2025, University of Colorado Boulder
/**
 * RepresentationRadioButtonGroup is a group of radio buttons that allow users to select between
 * different counting representations. Each representation allows the user to think about the number pairs in a
 * different way, or with different images.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Color from '../../../../scenery/js/util/Color.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import RepresentationType from '../model/RepresentationType.js';

type SelfOptions = EmptySelfOptions;
type CountingRepresentationRadioButtonGroupOptions = SelfOptions & PickRequired<RectangularRadioButtonGroupOptions, 'tandem'> &
  StrictOmit<RectangularRadioButtonGroupOptions, 'orientation'>;
export default class RepresentationRadioButtonGroup extends RectangularRadioButtonGroup<RepresentationType> {

  public constructor(
    countingRepresentationTypeProperty: Property<RepresentationType>,
    providedOptions: CountingRepresentationRadioButtonGroupOptions ) {
    const groupItems = countingRepresentationTypeProperty.validValues?.map( countingRepresentationType => {
      return {
        value: countingRepresentationType,
        createNode: () => new Node( { children: [ countingRepresentationType.icon ] } ),
        tandemName: countingRepresentationType.label + 'RadioButton',
        options: {
          accessibleName: countingRepresentationType.accessibleName
        }
      };
    } ) || [];

    const buttonMargin = 3;
    const options = optionize<CountingRepresentationRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {
      accessibleName: NumberPairsFluent.a11y.representationTypeStringProperty,
      accessibleHelpText: NumberPairsFluent.a11y.representationTypeHelpTextStringProperty,
      orientation: 'horizontal',
      radioButtonOptions: {
        baseColor: Color.WHITE,
        xMargin: buttonMargin,
        yMargin: buttonMargin,
        minWidth: RepresentationType.ICON_MAX_HEIGHT + 2 * buttonMargin, // the buttons should be square, and the ICON_MAX_HEIGHT is larger than the ICON_MAX_WIDTH
        minHeight: RepresentationType.ICON_MAX_HEIGHT + 2 * buttonMargin
      }
    }, providedOptions );
    super( countingRepresentationTypeProperty, groupItems, options );
  }
}

numberPairs.register( 'RepresentationRadioButtonGroup', RepresentationRadioButtonGroup );