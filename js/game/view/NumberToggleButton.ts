// Copyright 2025, University of Colorado Boulder

/**
 * NumberToggleButton configures a BooleanRectangularStickyToggleButton with the defaults that AnswerButtonGroup needs.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import type TProperty from '../../../../axon/js/TProperty.js';
import type { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import type Color from '../../../../scenery/js/util/Color.js';
import BooleanRectangularStickyToggleButton, { type BooleanRectangularStickyToggleButtonOptions } from '../../../../sun/js/buttons/BooleanRectangularStickyToggleButton.js';
import ButtonModel from '../../../../sun/js/buttons/ButtonModel.js';
import numberPairs from '../../numberPairs.js';
import { AnswerButtonAppearanceStrategy } from './AnswerButtonAppearanceStrategy.js';

type SelfOptions = {
  pressedFillColorProperty: TReadOnlyProperty<Color>;
};

export type NumberToggleButtonOptions = SelfOptions & BooleanRectangularStickyToggleButtonOptions;

const BUTTON_SIZE = new Dimension2( 42, 42 );

export default class NumberToggleButton extends BooleanRectangularStickyToggleButton {

  public readonly numberToggleButtonModel: ButtonModel;

  public constructor( booleanProperty: TProperty<boolean>, providedOptions?: NumberToggleButtonOptions ) {
    const options = optionize<NumberToggleButtonOptions, SelfOptions, BooleanRectangularStickyToggleButtonOptions>()( {
      buttonAppearanceStrategy: AnswerButtonAppearanceStrategy,
      size: BUTTON_SIZE
    }, providedOptions );

    //REVIEW Why can't this be one in optionize above?
    options.buttonAppearanceStrategyOptions = {

      //REVIEW What's the problem here that requires ts directives? Should it be fixed?
      // pass through to our custom AnswerButtonAppearanceStrategy
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      pressedFillColorProperty: options.pressedFillColorProperty
    };

    super( booleanProperty, options );

    this.numberToggleButtonModel = this.buttonModel;
  }
}

numberPairs.register( 'NumberToggleButton', NumberToggleButton );
