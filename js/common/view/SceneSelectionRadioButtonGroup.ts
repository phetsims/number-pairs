// Copyright 2024, University of Colorado Boulder
/**
 * SceneSelectionRadioButtonGroup is a RectangularRadioButtonGroup that displays the total values that can be selected by the user.
 * The total values are displayed in descending order and are each associated with a scene that tracks its own state.
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
import Dimension2 from '../../../../dot/js/Dimension2.js';
import NumberPairsScene from '../model/NumberPairsScene.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';

type SelfOptions = {
  sceneRange: Range;
};
type SceneSelectionRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

// TODO: SceneSelectionRadioButtonGroup, listens to sceneProperty and each group item's value is connected to
//   a specific scene rather than the total. or change the options name ot match class.
export default class SceneSelectionRadioButtonGroup extends RectangularRadioButtonGroup<NumberPairsScene> {

  public constructor( selectedSceneModelProperty: PhetioProperty<NumberPairsScene>, sceneModels: NumberPairsScene[], providedOptions: SceneSelectionRadioButtonGroupOptions ) {
    const options = optionize<SceneSelectionRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {
      radioButtonOptions: {
        size: new Dimension2( 35, 35 )
      }
    }, providedOptions );

    // We want our scene values to be in descending order and include both the min and the max.
    const groupItems = sceneModels.map( sceneModel => {
      const sceneIcon = new Text( sceneModel.total.toString(), { font: new PhetFont( 20 ) } );
      return {
        createNode: () => sceneIcon,
        value: sceneModel,
        tandemName: `sceneModel${sceneModel.total}RadioButton`
      };
    } ).reverse();
    super( selectedSceneModelProperty, groupItems, options );
  }
}

numberPairs.register( 'SceneSelectionRadioButtonGroup', SceneSelectionRadioButtonGroup );