// Copyright 2025, University of Colorado Boulder

/**
 * AnswerButtonAppearanceStrategy is a value for ButtonNode options.buttonAppearanceStrategy. It makes a
 * button look flat, i.e. no shading or highlighting, with color changes on mouseover, press, etc.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { PaintableNode } from '../../../../scenery/js/nodes/Paintable.js';
import Color from '../../../../scenery/js/util/Color.js';
import PaintColorProperty from '../../../../scenery/js/util/PaintColorProperty.js';
import ButtonInteractionState from '../../../../sun/js/buttons/ButtonInteractionState.js';
import { TButtonAppearanceStrategyOptions } from '../../../../sun/js/buttons/TButtonAppearanceStrategy.js';
import numberPairs from '../../numberPairs.js';

type AnswerButtonAppearanceStrategyOptions = TButtonAppearanceStrategyOptions & {
  pressedFillColorProperty?: TReadOnlyProperty<Color>;
};

export class AnswerButtonAppearanceStrategy {

  public readonly maxLineWidth: number = 1;

  /**
   * @param buttonBackground - the Node for the button's background, sans content
   * @param interactionStateProperty - interaction state, used to trigger updates
   * @param baseColorProperty - base color from which other colors are derived
   * @param [providedOptions]
   */
  public constructor( buttonBackground: PaintableNode,
                      interactionStateProperty: TReadOnlyProperty<ButtonInteractionState>,
                      baseColorProperty: TReadOnlyProperty<Color>,
                      providedOptions?: AnswerButtonAppearanceStrategyOptions ) {

    // dynamic colors
    const baseBrighter4Property = new PaintColorProperty( baseColorProperty, { luminanceFactor: 0.4 } );
    const pressedFillColorProperty = providedOptions!.pressedFillColorProperty!;

    // various fills that are used to alter the button's appearance
    const upFillProperty = baseColorProperty;
    const overFillProperty = baseBrighter4Property;

    const strokeProperty = new PaintColorProperty( baseColorProperty, { luminanceFactor: -0.4 } );
    buttonBackground.stroke = strokeProperty;
    buttonBackground.lineWidth = 1;

    // Cache colors
    buttonBackground.cachedPaints = [ upFillProperty, overFillProperty, pressedFillColorProperty, strokeProperty ];

    interactionStateProperty.link( interactionState => {
      buttonBackground.fill = interactionState === ButtonInteractionState.IDLE ? upFillProperty :
                              interactionState === ButtonInteractionState.OVER ? overFillProperty :
                              interactionState === ButtonInteractionState.PRESSED ? pressedFillColorProperty :
                              upFillProperty;
    } );
  }
}

numberPairs.register( 'AnswerButtonAppearanceStrategy', AnswerButtonAppearanceStrategy );
