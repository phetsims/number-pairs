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
import { CountingRepresentationType } from '../model/DecompositionModel.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import optionize from '../../../../phet-core/js/optionize.js';

type SelfOptions = {
  countingRepresentations: CountingRepresentationType[];
};
type CountingRepresentationRadioButtonGroupOptions = SelfOptions & WithRequired<RectangularRadioButtonGroupOptions, 'tandem'>;
export default class CountingRepresentationRadioButtonGroup extends RectangularRadioButtonGroup<CountingRepresentationType> {

  public constructor(
    countingRepresentationTypeProperty: Property<CountingRepresentationType>,
    providedOptions: CountingRepresentationRadioButtonGroupOptions ) {
    const groupItems = providedOptions.countingRepresentations.map( countingRepresentationType => {
      return {
        value: countingRepresentationType,
        createNode: () => new Text( countingRepresentationType.label, { font: new PhetFont( 10 ) } ),
        tandem: providedOptions.tandem.createTandem( countingRepresentationType.label )
      };
    } );

    const options = optionize<CountingRepresentationRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {
      orientation: 'horizontal'
    }, providedOptions );
    super( countingRepresentationTypeProperty, groupItems, options );
  }
}

numberPairs.register( 'CountingRepresentationRadioButtonGroup', CountingRepresentationRadioButtonGroup );