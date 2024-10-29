// Copyright 2024, University of Colorado Boulder
/**
 * TenFrameButton is a button that when clicked will organize the counting objects into a ten frame.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import numberPairs from '../../numberPairs.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import { Line, Node, Rectangle } from '../../../../scenery/js/imports.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';

type SelfOptions = EmptySelfOptions;
type TenFrameButtonOptions = SelfOptions & PickRequired<RectangularPushButtonOptions, 'tandem'>
  & StrictOmit<RectangularPushButtonOptions, 'content' | 'listener'>;

export default class TenFrameButton extends RectangularPushButton {

  public constructor(
    tenFrameBounds: Bounds2[],
    organizeIntoTenFrame: ( bounds: Bounds2[] ) => void,
    providedOptions: TenFrameButtonOptions
  ) {
    const tenFrameIcon = TenFrameButton.createTenFrameIcon();
    const options = optionize4<TenFrameButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {},
      {
        content: tenFrameIcon,
        listener: () => {
          organizeIntoTenFrame( tenFrameBounds );
        }
      }, NumberPairsConstants.RECTANGULAR_PUSH_BUTTON_OPTIONS, providedOptions );
    super( options );
  }

  private static createTenFrameIcon(): Node {
    const tenFrameWidth = 48;
    const tenFrameHeight = 22;
    const tenFrameLineWidth = 2;
    const outerFrame = new Rectangle( 0, 0, tenFrameWidth, tenFrameHeight, {
      stroke: 'black',
      lineWidth: tenFrameLineWidth
    } );
    const verticalLineSpacing = tenFrameWidth / 5;
    const verticalLines = _.times( 4, i => new Line(
      verticalLineSpacing + i * verticalLineSpacing,
      0,
      verticalLineSpacing + i * verticalLineSpacing,
      tenFrameHeight,
      { stroke: 'black', lineWidth: tenFrameLineWidth }
    ) );
    const horizontalLine = new Line( 0, tenFrameHeight / 2, tenFrameWidth, tenFrameHeight / 2, {
      stroke: 'black',
      lineWidth: tenFrameLineWidth
    } );
    return new Node( {
      children: [ outerFrame, ...verticalLines, horizontalLine ]
    } );
  }
}

numberPairs.register( 'TenFrameButton', TenFrameButton );