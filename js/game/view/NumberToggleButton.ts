// Copyright 2025, University of Colorado Boulder

/**
 * NumberToggleButton configures a BooleanRectangularStickyToggleButton with the defaults that NumberButtonGrid needs.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import type TProperty from '../../../../axon/js/TProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { type EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import BooleanRectangularStickyToggleButton, { type BooleanRectangularStickyToggleButtonOptions } from '../../../../sun/js/buttons/BooleanRectangularStickyToggleButton.js';
import ButtonModel from '../../../../sun/js/buttons/ButtonModel.js';
import { FlatAppearanceStrategy } from '../../../../sun/js/buttons/ButtonNode.js';
import numberPairs from '../../numberPairs.js';

type SelfOptions = EmptySelfOptions;

export type NumberToggleButtonOptions = SelfOptions & BooleanRectangularStickyToggleButtonOptions;

const BUTTON_SIZE = new Dimension2( 42, 42 );

export default class NumberToggleButton extends BooleanRectangularStickyToggleButton {

  public static readonly BUTTON_SIZE = BUTTON_SIZE;
  public readonly numberToggleButtonModel: ButtonModel;

  public constructor( booleanProperty: TProperty<boolean>, providedOptions?: NumberToggleButtonOptions ) {
    const options = optionize<NumberToggleButtonOptions, SelfOptions, BooleanRectangularStickyToggleButtonOptions>()( {
      buttonAppearanceStrategy: FlatAppearanceStrategy,
      size: BUTTON_SIZE
    }, providedOptions );

    super( booleanProperty, options );

    this.numberToggleButtonModel = this.buttonModel;
  }
}

numberPairs.register( 'NumberToggleButton', NumberToggleButton );
