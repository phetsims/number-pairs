// Copyright 2025, University of Colorado Boulder

/**
 * Game-specific NumberLineNode that applies feedback styling to highlight the unknown addend.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import NumberPairsModel from '../../common/model/NumberPairsModel.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberLineNode, { NumberLineNodeOptions } from '../../common/view/NumberLineNode.js';
import numberPairs from '../../numberPairs.js';

type NumberLineFeedbackStyle = {
  stroke: string;
  lineDash: number[];
  lineWidth: number;
};

type MissingAddend = 'a' | 'b';

export default class GameNumberLineNode extends NumberLineNode {

  public constructor(
    model: Pick<NumberPairsModel, 'leftAddendProperty' | 'numberLineSliderEnabledRangeProperty' | 'tickValuesVisibleProperty' |
      'rightAddendProperty' | 'totalProperty' | 'totalJumpVisibleProperty' | 'numberLineCountFromZeroProperty' | 'numberLineAddendValuesVisibleProperty'>,
    numberLineWidth: number,
    missingAddendProperty: TReadOnlyProperty<MissingAddend>,
    feedbackStyleProperty: TReadOnlyProperty<NumberLineFeedbackStyle>,
    providedOptions: NumberLineNodeOptions
  ) {
    super( model, numberLineWidth, providedOptions );

    Multilink.multilink(
      [ missingAddendProperty, feedbackStyleProperty ],
      ( missingAddend, feedbackStyle ) => {

        if ( missingAddend === 'a' ) {
          this.leftAddendArrow.setTailStyle( feedbackStyle.stroke, feedbackStyle.lineDash );
          this.leftAddendHighlight.mutate( {
            stroke: feedbackStyle.stroke,
            lineDash: feedbackStyle.lineDash,
            lineWidth: 1 // TODO: Not respected, why? https://github.com/phetsims/number-pairs/issues/249
          } );

          this.rightAddendArrow.setTailStyle( NumberPairsColors.attributeRightAddendColorProperty, [] );
          this.rightAddendHighlight.mutate( {
            stroke: NumberPairsColors.attributeRightAddendColorProperty,
            lineDash: [],
            lineWidth: 1 // TODO: Not respected, why? https://github.com/phetsims/number-pairs/issues/249
          } );
        }
        else if ( missingAddend === 'b' ) {
          this.rightAddendArrow.setTailStyle( feedbackStyle.stroke, feedbackStyle.lineDash );
          this.rightAddendHighlight.mutate( {
            stroke: feedbackStyle.stroke,
            lineDash: feedbackStyle.lineDash
          } );

          this.leftAddendArrow.setTailStyle( NumberPairsColors.attributeLeftAddendColorProperty, [] );
          this.leftAddendHighlight.mutate( {
            stroke: NumberPairsColors.attributeLeftAddendColorProperty,
            lineDash: []
          } );
        }
      }
    );
  }
}

numberPairs.register( 'GameNumberLineNode', GameNumberLineNode );
