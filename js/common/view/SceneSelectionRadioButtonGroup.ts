// Copyright 2024-2025, University of Colorado Boulder
/**
 * SceneSelectionRadioButtonGroup is a RectangularRadioButtonGroup that displays the total values that can be selected by the user.
 * The total values are displayed in descending order and are each associated with a scene that tracks its own state.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsScene from '../model/NumberPairsScene.js';

type SelfOptions = {
  sceneRange: Range;
};
type SceneSelectionRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export default class SceneSelectionRadioButtonGroup extends RectangularRadioButtonGroup<NumberPairsScene> {

  public constructor( selectedSceneModelProperty: PhetioProperty<NumberPairsScene>, sceneModels: NumberPairsScene[], providedOptions: SceneSelectionRadioButtonGroupOptions ) {
    const options = optionize<SceneSelectionRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {
      radioButtonOptions: {
        size: new Dimension2( 40, 40 )
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