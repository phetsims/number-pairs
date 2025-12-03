// Copyright 2025, University of Colorado Boulder

/**
 * Game-specific NumberLineNode that applies feedback styling to highlight the unknown addend.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import { isTReadOnlyProperty, TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Color from '../../../../scenery/js/util/Color.js';
import NumberPairsModel from '../../common/model/NumberPairsModel.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import NumberLineNode, { NumberLineNodeOptions } from '../../common/view/NumberLineNode.js';
import numberPairs from '../../numberPairs.js';
import { MissingAddend } from '../model/Challenge.js';

type NumberLineFeedbackStyle = {
  stroke: Color | TReadOnlyProperty<Color>;
  lineDash: number[];
};

type SelfOptions = EmptySelfOptions;
type GameNumberLineNodeOptions = SelfOptions & NumberLineNodeOptions;

export default class GameNumberLineNode extends NumberLineNode {

  public constructor(
    model: Pick<NumberPairsModel, 'leftAddendProperty' | 'numberLineSliderEnabledRangeProperty' |
      'tickValuesVisibleProperty' | 'rightAddendProperty' | 'totalProperty' | 'totalJumpVisibleProperty' |
      'numberLineCountFromZeroProperty' | 'numberLineAddendValuesVisibleProperty' | 'totalVisibleProperty'>,
    numberLineWidth: number,
    missingAddendProperty: TReadOnlyProperty<MissingAddend>,
    feedbackStyleProperty: TReadOnlyProperty<NumberLineFeedbackStyle>,
    providedOptions: NumberLineNodeOptions
  ) {

    const options = optionize<GameNumberLineNodeOptions, SelfOptions, NumberLineNodeOptions>()( {
      interactive: false
    }, providedOptions );

    super( model, numberLineWidth, options );

    /**
     * Applies feedback styling to the number line highlights and arrows based on the current missing addend
     * and challenge state.
     */
    Multilink.multilink(
      [ missingAddendProperty, feedbackStyleProperty ],
      ( missingAddend, feedbackStyle ) => {

        const isCorrect = feedbackStyle === NumberPairsConstants.GAME_FEEDBACK_STYLES.correct;

        // Missing addend 'a' is also the left addend.
        if ( missingAddend === 'a' ) {

          // Determine the fill color and line dash style for the left addend based on whether the answer is correct.
          const fill = isCorrect ? NumberPairsColors.attributeLeftAddendColorProperty : feedbackStyle.stroke;
          const lineDash = isCorrect ? [] : feedbackStyle.lineDash;
          this.leftAddendArrow.setTailStyle( fill, lineDash );
          this.leftAddendHighlight.mutate( {
            fill: fill,
            stroke: NumberPairsConstants.GET_DARKER_COLOR( isTReadOnlyProperty( fill ) ? fill.value : fill ),
            lineDash: lineDash
          } );

          // The right addend gets set to its default styling.
          this.rightAddendArrow.setTailStyle( NumberPairsColors.attributeRightAddendColorProperty, [] );
          this.rightAddendHighlight.mutate( {
            fill: NumberPairsColors.attributeRightAddendColorProperty,
            stroke: NumberPairsConstants.GET_DARKER_COLOR( NumberPairsColors.attributeRightAddendColorProperty.value ),
            lineDash: []
          } );
        }

        // Missing addend 'b' is also the right addend.
        else if ( missingAddend === 'b' ) {

          // Determine the fill color and line dash style for the right addend based on whether the answer is correct.
          const fill = isCorrect ? NumberPairsColors.attributeRightAddendColorProperty : feedbackStyle.stroke;
          const lineDash = isCorrect ? [] : feedbackStyle.lineDash;
          this.rightAddendArrow.setTailStyle( fill, lineDash );
          this.rightAddendHighlight.mutate( {
            fill: fill,
            stroke: NumberPairsConstants.GET_DARKER_COLOR( isTReadOnlyProperty( fill ) ? fill.value : fill ),
            lineDash: lineDash
          } );

          // The left addend gets set to its default styling.
          this.leftAddendArrow.setTailStyle( NumberPairsColors.attributeLeftAddendColorProperty, [] );
          this.leftAddendHighlight.mutate( {
            fill: NumberPairsColors.attributeLeftAddendColorProperty,
            stroke: NumberPairsConstants.GET_DARKER_COLOR( NumberPairsColors.attributeLeftAddendColorProperty.value ),
            lineDash: []
          } );
        }
      }
    );
  }
}

numberPairs.register( 'GameNumberLineNode', GameNumberLineNode );
