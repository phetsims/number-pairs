// Copyright 2025, University of Colorado Boulder

/**
 * LevelNode shows one level of the Number Play game.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ArrowShape from '../../../../scenery-phet/js/ArrowShape.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Color from '../../../../scenery/js/util/Color.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import InfiniteStatusBar, { InfiniteStatusBarOptions } from '../../../../vegas/js/InfiniteStatusBar.js';
import numberPairs from '../../numberPairs.js';

export default class LevelNode extends Node {

  public constructor( layoutBounds: Bounds2, visibleBoundsProperty: TReadOnlyProperty<Bounds2>, returnToLevelSelection: () => void ) {
    super();

    // text displayed in the statusBar
    const levelDescriptionText = new RichText( 'description', {
      font: new PhetFont( 21 ),
      maxWidth: 650
    } );

    const scoreProperty = new NumberProperty( 0 );

    // bar across the top of the screen
    const statusBar = new InfiniteStatusBar( layoutBounds, visibleBoundsProperty, levelDescriptionText, scoreProperty,
      combineOptions<InfiniteStatusBarOptions>( {
        floatToTop: true,
        spacing: 20,
        backButtonListener: () => {
          this.interruptSubtreeInput();
          returnToLevelSelection();
        }
      }, {} ) );
    this.addChild( statusBar );

    // this.level = level;


    // create and add the newChallengeButton which is visible when a challenge is solved, meaning a correct answer button was pressed
    const rightArrowShape = new ArrowShape( 0, 0, 42, 0, {
      tailWidth: 12,
      headWidth: 25,
      headHeight: 23
    } );
    const newChallengeButton = new RectangularPushButton( {
      baseColor: PhetColorScheme.BUTTON_YELLOW,
      xMargin: 27,
      yMargin: 10.9,
      touchAreaXDilation: 9,
      touchAreaYDilation: 9,
      content: new Path( rightArrowShape, { fill: Color.BLACK } ),
      // visibleProperty: level.isChallengeSolvedProperty,
      listener: () => this.newChallenge()
    } );
    // newChallengeButton.centerX = smileyFaceNode.centerX;
    // newChallengeButton.bottom = layoutBounds.maxY -
    //                             LevelNode.ANSWER_BUTTONS_BOTTOM_MARGIN_Y -
    //                             NumberPlayGameAnswerButtons.BUTTON_DIMENSION.height -
    //                             LevelNode.GAME_AREA_NODE_BOTTOM_MARGIN_Y;
    this.addChild( newChallengeButton );
  }

  public reset(): void {
    // this.pointAwardedNodeVisibleProperty.reset();
  }

  /**
   * Sets up a new challenge in the model and in the view.
   */
  public newChallenge(): void {
    // TODO: https://github.com/phetsims/number-pairs/issues/36
  }

  public override dispose(): void {
    Disposable.assertNotDisposable();
    super.dispose();
  }
}

numberPairs.register( 'LevelNode', LevelNode );