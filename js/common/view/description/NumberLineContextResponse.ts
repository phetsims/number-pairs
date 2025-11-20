// Copyright 2025, University of Colorado Boulder

/**
 * Context response when the user changes the addends in the number line, which is implemented as a slider.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Node from '../../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../../numberPairs.js';
import NumberPairsFluent from '../../../NumberPairsFluent.js';
import NumberPairsModel from '../../model/NumberPairsModel.js';

export default class NumberLineContextResponse {

  // Do not play a context response on the first drag event, only on subsequent changes.
  private lastAddendValue: number | null = null;

  public constructor( private readonly model: Pick<NumberPairsModel, 'leftAddendProperty' | 'rightAddendProperty' | 'totalProperty' | 'numberLineAddendValuesVisibleProperty'> ) {

    // Clear out status when changing scenes, so we don't hear a context response on 1st pixel of drag
    model.totalProperty.link( () => {
      this.lastAddendValue = null;
    } );
  }

  /**
   * Play an accessible context response when a drag triggers a change in addend.
   */
  public sliderDragged( node: Node ): void {
    if ( this.lastAddendValue === null ) {
      this.lastAddendValue = this.model.leftAddendProperty.value;
      return;
    }

    if ( this.lastAddendValue !== this.model.leftAddendProperty.value ) {

      const sections = this.model.leftAddendProperty.value < this.model.rightAddendProperty.value ? 'smallerAndLarger' :
                       this.model.leftAddendProperty.value > this.model.rightAddendProperty.value ? 'largerAndSmaller' :
                       'equal';

      node.addAccessibleContextResponse( NumberPairsFluent.a11y.numberLine.contextResponse.format( {
          addendsShowing: this.model.numberLineAddendValuesVisibleProperty.value ? 'addendsVisible' : 'addendsHidden',
          total: this.model.totalProperty.value,
          left: this.model.leftAddendProperty.value,
          right: this.model.rightAddendProperty.value,
          sections: sections
        } )
      );
      this.lastAddendValue = this.model.leftAddendProperty.value;
    }
  }
}

numberPairs.register( 'NumberLineContextResponse', NumberLineContextResponse );