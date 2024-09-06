// Copyright 2024, University of Colorado Boulder
/**
 * SumRadioButtonGroup is a RectangularRadioButtonGroup that displays the sum values that can be selected by the user.
 * The sum values are displayed in descending order and are each associated with a scene that tracks its own state.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import RectangularRadioButtonGroup, { RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Range from '../../../../dot/js/Range.js';
import { Text } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';

type SelfOptions = {
  sceneRange: Range;
};
type SceneSelectionRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;
export default class SumRadioButtonGroup extends RectangularRadioButtonGroup<number> {

  public constructor( sumProperty: Property<number>, providedOptions: SceneSelectionRadioButtonGroupOptions ) {
    const options = optionize<SceneSelectionRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {
      radioButtonOptions: {
        size: new Dimension2( 35, 35 )
      }
    }, providedOptions );

    // We want our scene values to be in descending order and include both the min and the max.
    const groupItems = _.times( options.sceneRange.getLength() + 1, i => {
      const sceneValue = options.sceneRange.min + i;
      const sceneIcon = new Text( sceneValue.toString(), { font: new PhetFont( 20 ) } );
      return {
        createNode: () => sceneIcon,
        value: sceneValue,
        tandem: `sum${sceneValue}RadioButton`
      };
    } ).reverse();
    super( sumProperty, groupItems, options );
  }
}

numberPairs.register( 'SumRadioButtonGroup', SumRadioButtonGroup );