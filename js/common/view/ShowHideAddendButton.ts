// Copyright 2024, University of Colorado Boulder
/**
 * This button toggles the visibility of the addend (or addends).
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import numberPairs from '../../numberPairs.js';
import { Color, Node, Path } from '../../../../scenery/js/imports.js';
import eyeSolidShape from '../../../../sherpa/js/fontawesome-5/eyeSolidShape.js';
import eyeSlashSolidShape from '../../../../sherpa/js/fontawesome-5/eyeSlashSolidShape.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';

type ShowHideAddendButtonOptions = PickRequired<RectangularPushButtonOptions, 'tandem'> &
  StrictOmit<RectangularPushButtonOptions, 'content' | 'listener'>;
export default class ShowHideAddendButton extends RectangularPushButton {

  public constructor( addendVisibleProperty: BooleanProperty, providedOptions: ShowHideAddendButtonOptions ) {
    const eye = new Path( eyeSolidShape, {
      fill: Color.BLACK,
      visibleProperty: addendVisibleProperty
    } );
    const eyeSlash = new Path( eyeSlashSolidShape, {
      fill: Color.BLACK,
      visibleProperty: DerivedProperty.not( addendVisibleProperty )
    } );
    const buttonContent = new Node( {
      children: [ eye, eyeSlash ],
      excludeInvisibleChildrenFromBounds: true // so that the parent respects centering of each icon when visible.
    } );

    const options = optionize<ShowHideAddendButtonOptions, EmptySelfOptions, RectangularPushButtonOptions>()( {
      content: buttonContent,
      size: NumberPairsConstants.RECTANGULAR_PUSH_BUTTON_OPTIONS.size,
      listener: () => {
        addendVisibleProperty.toggle();
      },
      baseColor: Color.WHITE
    }, providedOptions );
    super( options );
  }
}

numberPairs.register( 'ShowHideAddendButton', ShowHideAddendButton );