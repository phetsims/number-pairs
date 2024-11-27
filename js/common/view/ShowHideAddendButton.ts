// Copyright 2024, University of Colorado Boulder
/**
 * This button toggles the visibility of the addend (or addends).
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { Color, Node, Path } from '../../../../scenery/js/imports.js';
import eyeSlashSolidShape from '../../../../sherpa/js/fontawesome-5/eyeSlashSolidShape.js';
import eyeSolidShape from '../../../../sherpa/js/fontawesome-5/eyeSolidShape.js';
import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsConstants from '../NumberPairsConstants.js';

type SelfOptions = {
  secondAddendVisibleProperty?: BooleanProperty | null;
};
type ShowHideAddendButtonOptions = SelfOptions & PickRequired<RectangularPushButtonOptions, 'tandem'> &
  StrictOmit<RectangularPushButtonOptions, 'content' | 'listener'>;
export default class ShowHideAddendButton extends RectangularPushButton {

  public constructor( addendVisibleProperty: BooleanProperty, providedOptions: ShowHideAddendButtonOptions ) {

    const initialOptions = optionize<ShowHideAddendButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {
      size: new Dimension2( NumberPairsConstants.RECTANGULAR_PUSH_BUTTON_OPTIONS.size.width, 40 ),
      secondAddendVisibleProperty: null,
      baseColor: Color.WHITE
    }, providedOptions );

    let addendToggleVisibleProperty: TReadOnlyProperty<boolean> = addendVisibleProperty;
    if ( initialOptions.secondAddendVisibleProperty ) {
      addendToggleVisibleProperty = DerivedProperty.and( [ addendVisibleProperty, initialOptions.secondAddendVisibleProperty ] );
    }

    const options = combineOptions<RectangularPushButtonOptions>( {
      listener: () => {
        if ( !addendToggleVisibleProperty.value && initialOptions.secondAddendVisibleProperty ) {
          addendVisibleProperty.value = false;
          initialOptions.secondAddendVisibleProperty.value = false;
        }
        addendVisibleProperty.toggle();
        initialOptions.secondAddendVisibleProperty && initialOptions.secondAddendVisibleProperty.toggle();
      }
    }, initialOptions );
    const eye = new Path( eyeSolidShape, {
      fill: Color.BLACK,
      visibleProperty: addendToggleVisibleProperty
    } );
    const eyeSlash = new Path( eyeSlashSolidShape, {
      fill: Color.BLACK,
      visibleProperty: DerivedProperty.not( addendToggleVisibleProperty )
    } );
    options.content = new Node( {
      children: [ eye, eyeSlash ],
      excludeInvisibleChildrenFromBounds: true // so that the parent respects centering of each icon when visible.
    } );

    super( options );
  }
}

numberPairs.register( 'ShowHideAddendButton', ShowHideAddendButton );