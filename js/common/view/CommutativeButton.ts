// Copyright 2024, University of Colorado Boulder

/**
 * CommutativeButton is a button that when clicked will swap the left right addends. The total stays the same.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsConstants from '../NumberPairsConstants.js';


type SelfOptions = EmptySelfOptions;
type CommutativeButtonOptions =
  SelfOptions
  & PickRequired<RectangularPushButtonOptions, 'tandem'>
  & StrictOmit<RectangularPushButtonOptions, 'content'>;
export default class CommutativeButton extends RectangularPushButton {

  public constructor( providedOptions: CommutativeButtonOptions ) {

    const commutativeArrowsIcon = CommutativeButton.createCommutativeArrowsIcon();
    const options = optionize4<CommutativeButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {},
      {
        content: commutativeArrowsIcon
      }, NumberPairsConstants.RECTANGULAR_PUSH_BUTTON_OPTIONS, providedOptions );
    super( options );
  }

  private static createCommutativeArrowsIcon(): Node {
    const arrowWidth = 40;
    const arrowSpacing = 18;
    const arrowOptions = {
      headWidth: 17,
      headHeight: 12
    };
    const leftArrow = new ArrowNode( arrowWidth, 0, 0, 0, arrowOptions );
    const rightArrow = new ArrowNode( 0, arrowSpacing, arrowWidth, arrowSpacing, arrowOptions );

    return new Node( {
      children: [ leftArrow, rightArrow ]
    } );
  }
}

numberPairs.register( 'CommutativeButton', CommutativeButton );