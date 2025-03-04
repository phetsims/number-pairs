// Copyright 2025, University of Colorado Boulder

/**
 * IntroScreenIcon is the icon for the 'Intro' screen. It consists of two rectangles, one for each addend,
 * and three apples.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import numberPairs from '../../numberPairs.js';
import ScreenIcon, { ScreenIconOptions } from '../../../../joist/js/ScreenIcon.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import apple_svg from '../../../images/apple_svg.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type IntroScreenIconOptions = WithRequired<ScreenIconOptions, 'size'> & SelfOptions;
export default class IntroScreenIcon extends ScreenIcon {

  public constructor( providedOptions: IntroScreenIconOptions ) {

    const options = optionize<IntroScreenIconOptions, SelfOptions, ScreenIconOptions>()( {
      maxIconHeightProportion: 1,
      maxIconWidthProportion: 1
    }, providedOptions );

    const iconSize = options.size;
    const leftRectangle = new Rectangle( 0, 0, iconSize.width / 2, iconSize.height, {
      fill: NumberPairsColors.locationLeftAddendColorProperty
    } );
    const rightRectangle = new Rectangle( iconSize.width / 2, 0, iconSize.width / 2, iconSize.height, {
      fill: NumberPairsColors.locationRightAddendColorProperty
    } );
    const dividingLine = new Line( iconSize.width / 2, 0, iconSize.width / 2, iconSize.height, {
      stroke: 'black'
    } );
    const appleWidthRatio = 0.2;
    const leftAddendApples = [
      new Image( apple_svg, {
        maxWidth: iconSize.width * appleWidthRatio,
        centerX: leftRectangle.centerX - iconSize.width * appleWidthRatio / 2,
        centerY: leftRectangle.centerY - iconSize.height * appleWidthRatio
      } ),
      new Image( apple_svg, {
        maxWidth: iconSize.width * appleWidthRatio,
        centerX: leftRectangle.centerX + iconSize.width * appleWidthRatio / 2,
        centerY: leftRectangle.centerY + iconSize.height * appleWidthRatio
      } )
    ];
    const rightAddendApple = new Image( apple_svg, {
      maxWidth: iconSize.width * appleWidthRatio,
      centerX: rightRectangle.centerX,
      centerY: rightRectangle.centerY
    } );
    const iconNode = new Node( {
      children: [
        leftRectangle,
        rightRectangle,
        dividingLine,
        ...leftAddendApples,
        rightAddendApple
      ]
    } );
    super( iconNode, options );
  }
}

numberPairs.register( 'IntroScreenIcon', IntroScreenIcon );