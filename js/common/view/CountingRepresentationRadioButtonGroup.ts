// Copyright 2024, University of Colorado Boulder
/**
 * CountingRepresentationRadioButtonGroup is a group of radio buttons that allow users to select between
 * different counting representations. Each representation allows the user to think about the number pairs in a
 * different way, or with different images.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import RectangularRadioButtonGroup, { RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import numberPairs from '../../numberPairs.js';
import Property from '../../../../axon/js/Property.js';
import { Color, Node } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { CountingRepresentationType, ICON_MAX_HEIGHT } from '../model/NumberPairsModel.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = {
  countingRepresentations: CountingRepresentationType[];
};
type CountingRepresentationRadioButtonGroupOptions = SelfOptions & PickRequired<RectangularRadioButtonGroupOptions, 'tandem'> &
  StrictOmit<RectangularRadioButtonGroupOptions, 'orientation'>;
export default class CountingRepresentationRadioButtonGroup extends RectangularRadioButtonGroup<CountingRepresentationType> {

  public constructor(
    countingRepresentationTypeProperty: Property<CountingRepresentationType>,
    providedOptions: CountingRepresentationRadioButtonGroupOptions ) {
    const groupItems = providedOptions.countingRepresentations.map( countingRepresentationType => {
      return {
        value: countingRepresentationType,
        createNode: () => new Node( { children: [ countingRepresentationType.icon ] } ),
        tandemName: countingRepresentationType.label + 'RadioButton'
      };
    } );

    const buttonMargin = 3;
    const options = optionize<CountingRepresentationRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {
      orientation: 'horizontal',
      radioButtonOptions: {
        baseColor: Color.WHITE,
        xMargin: buttonMargin,
        yMargin: buttonMargin,
        minWidth: ICON_MAX_HEIGHT + 2 * buttonMargin, // the buttons should be square, and the ICON_MAX_HEIGHT is larger than the ICON_MAX_WIDTH
        minHeight: ICON_MAX_HEIGHT + 2 * buttonMargin
      }
    }, providedOptions );
    super( countingRepresentationTypeProperty, groupItems, options );
  }
}

numberPairs.register( 'CountingRepresentationRadioButtonGroup', CountingRepresentationRadioButtonGroup );