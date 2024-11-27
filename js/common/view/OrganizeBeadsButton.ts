// Copyright 2024, University of Colorado Boulder
/**
 * A button that organizes the beads on the number line.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { Line, Node, Rectangle } from '../../../../scenery/js/imports.js';
import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsConstants from '../NumberPairsConstants.js';

type SelfOptions = EmptySelfOptions;
type OrganizeBeadsButtonOptions = SelfOptions & PickRequired<RectangularPushButtonOptions, 'tandem'>
  & StrictOmit<RectangularPushButtonOptions, 'content' | 'listener'>;

export default class OrganizeBeadsButton extends RectangularPushButton {

  public constructor( organizeBeads: () => void, providedOptions: OrganizeBeadsButtonOptions ) {
    const options = optionize4<OrganizeBeadsButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {}, {
      content: OrganizeBeadsButton.createIcon(),
      listener: organizeBeads,
      xMargin: 0
    }, NumberPairsConstants.RECTANGULAR_PUSH_BUTTON_OPTIONS, providedOptions );
   super( options );
  }

  /**
   * Creates the icon for the button which is five squares with a line on the left and right as though the
   * line is threaded through the squares.
   */
  private static createIcon(): Node {
    const iconSquareDimension = 7;
    const numberOfIconSquares = 5;

    const lineWidth = 1.25;
    const leftLine = new Line( 0, 0, iconSquareDimension, 0, {
      stroke: 'black',
      lineWidth: lineWidth
    } );

    const iconSquares: Node[] = [];
    _.times( numberOfIconSquares, i => {
      const startingX = i * iconSquareDimension + iconSquareDimension;
      iconSquares.push( new Rectangle( startingX, -iconSquareDimension / 2, iconSquareDimension, iconSquareDimension, {
        stroke: 'black',
        lineWidth: lineWidth
      } ) );
    } );

    const rightLineStartingX = numberOfIconSquares * iconSquareDimension + iconSquareDimension;
    const rightLine = new Line( rightLineStartingX, 0, rightLineStartingX + iconSquareDimension, 0, {
      stroke: 'black',
      lineWidth: lineWidth
    } );

    return new Node( {
      children: [ leftLine, ...iconSquares, rightLine ]
    } );
  }
}

numberPairs.register( 'OrganizeBeadsButton', OrganizeBeadsButton );