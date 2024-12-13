// Copyright 2024, University of Colorado Boulder
/**
 * TenFrameButton is a button that when clicked will organize the counting objects into a ten frame.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Shape } from '../../../../kite/js/imports.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { Node, Path } from '../../../../scenery/js/imports.js';
import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsConstants from '../NumberPairsConstants.js';

type SelfOptions = EmptySelfOptions;
type TenFrameButtonOptions = SelfOptions & PickRequired<RectangularPushButtonOptions, 'tandem'>
  & StrictOmit<RectangularPushButtonOptions, 'content'>;

export default class TenFrameButton extends RectangularPushButton {

  public constructor(
    providedOptions: TenFrameButtonOptions
  ) {
    const tenFrameIcon = TenFrameButton.createTenFrameIcon();
    const options = optionize4<TenFrameButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {},
      {
        content: tenFrameIcon
      }, NumberPairsConstants.RECTANGULAR_PUSH_BUTTON_OPTIONS, providedOptions );
    super( options );
  }

  private static createTenFrameIcon(): Node {
    const tenFrameWidth = 48;
    const tenFrameHeight = 22;
    const tenFrameLineWidth = 2;

    // outer frame
    const shape = new Shape().rect( 0, 0, tenFrameWidth, tenFrameHeight );
    shape.moveTo( 0, tenFrameHeight / 2 );

    // horizontal line
    shape.lineTo( tenFrameWidth, tenFrameHeight / 2 );

    // vertical lines
    const verticalLineSpacing = tenFrameWidth / 5;
    _.times( 4, i => {
      shape.moveTo( verticalLineSpacing + i * verticalLineSpacing, 0 );
      shape.lineTo( verticalLineSpacing + i * verticalLineSpacing, tenFrameHeight );
    } );

    return new Path( shape, {
      stroke: 'black',
      lineWidth: tenFrameLineWidth
    } );
  }
}

numberPairs.register( 'TenFrameButton', TenFrameButton );