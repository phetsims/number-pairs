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

type NumberLineFeedbackStyle = {
  stroke: Color | TReadOnlyProperty<Color>;
  lineDash: number[];
};

//REVIEW Define MissingAddend in Challenge, and use it to define MissingComponent.
type MissingAddend = 'a' | 'b';

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

    //REVIEW Documentation inside this callback would be helpful.
    Multilink.multilink(
      [ missingAddendProperty, feedbackStyleProperty ],
      ( missingAddend, feedbackStyle ) => {

        const isCorrect = feedbackStyle === NumberPairsConstants.GAME_FEEDBACK_STYLES.correct;

        if ( missingAddend === 'a' ) {
          const fill = isCorrect ? NumberPairsColors.attributeLeftAddendColorProperty : feedbackStyle.stroke;
          const lineDash = isCorrect ? [] : feedbackStyle.lineDash;

          this.leftAddendArrow.setTailStyle( fill, lineDash );
          this.leftAddendHighlight.mutate( {
            fill: fill,
            stroke: NumberPairsConstants.GET_DARKER_COLOR( isTReadOnlyProperty( fill ) ? fill.value : fill ),
            lineDash: lineDash
          } );

          this.rightAddendArrow.setTailStyle( NumberPairsColors.attributeRightAddendColorProperty, [] );
          this.rightAddendHighlight.mutate( {
            fill: NumberPairsColors.attributeRightAddendColorProperty,
            stroke: NumberPairsConstants.GET_DARKER_COLOR( NumberPairsColors.attributeRightAddendColorProperty.value ),
            lineDash: []
          } );
        }
        else if ( missingAddend === 'b' ) {
          const fill = isCorrect ? NumberPairsColors.attributeRightAddendColorProperty : feedbackStyle.stroke;
          const lineDash = isCorrect ? [] : feedbackStyle.lineDash;

          this.rightAddendArrow.setTailStyle( fill, lineDash );
          this.rightAddendHighlight.mutate( {
            fill: fill,
            stroke: NumberPairsConstants.GET_DARKER_COLOR( isTReadOnlyProperty( fill ) ? fill.value : fill ),
            lineDash: lineDash
          } );

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
