// Copyright 2025, University of Colorado Boulder

/**
 * LevelNode shows one level of the Number Play game.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ArrowShape from '../../../../scenery-phet/js/ArrowShape.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import InfiniteStatusBar, { InfiniteStatusBarOptions } from '../../../../vegas/js/InfiniteStatusBar.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import NumberButtonGrid from './NumberButtonGrid.js';

export default class LevelNode extends Node {
  
  private readonly model: GameModel;
  private readonly numberButtonGrid: NumberButtonGrid;
  private readonly checkButton: TextPushButton;
  private readonly newChallengeButton: RectangularPushButton;

  public constructor( model: GameModel, layoutBounds: Bounds2, visibleBoundsProperty: TReadOnlyProperty<Bounds2>, returnToLevelSelection: () => void, levelNumber: number ) {
    super();
    
    this.model = model;

    // text displayed in the statusBar
    const levelDescriptionText = new RichText( `<strong>${model.getLevelDescription( levelNumber )}</strong>`, {
      font: new PhetFont( 21 ),
      maxWidth: 650
    } );

    // bar across the top of the screen - show this level's score
    const statusBar = new InfiniteStatusBar( layoutBounds, visibleBoundsProperty, levelDescriptionText, model.getLevelScoreProperty( levelNumber ),
      combineOptions<InfiniteStatusBarOptions>( {
        barFill: '#b6fab9',
        floatToTop: true,
        spacing: 20,
        backButtonListener: () => {
          this.interruptSubtreeInput();
          returnToLevelSelection();
        }
      }, {} ) );
    this.addChild( statusBar );

    // Display the current equation challenge
    const equationText = new Text( model.equationTextProperty.value, {
      font: new PhetFont( 48 ),
      fill: 'black',
      centerX: layoutBounds.centerX,
      top: statusBar.bottom + 40
    } );
    this.addChild( equationText );
    
    // Update equation text when it changes
    model.equationTextProperty.link( equation => {
      equationText.string = equation;
    } );

    // create and add the newChallengeButton which is visible when a challenge is solved, meaning a correct answer button was pressed
    const rightArrowShape = new ArrowShape( 0, 0, 42, 0, {
      tailWidth: 12,
      headWidth: 25,
      headHeight: 23
    } );
    this.newChallengeButton = new RectangularPushButton( {
      baseColor: PhetColorScheme.BUTTON_YELLOW,
      xMargin: 27,
      yMargin: 10.9,
      touchAreaXDilation: 9,
      touchAreaYDilation: 9,
      content: new Path( rightArrowShape, { fill: Color.BLACK } ),
      visibleProperty: model.getLevel( levelNumber ).isChallengeSolvedProperty,
      listener: () => this.newChallenge( levelNumber )
    } );
    this.newChallengeButton.centerX = layoutBounds.centerX;
    this.newChallengeButton.bottom = layoutBounds.maxY - 200;
    this.addChild( this.newChallengeButton );

    // Add the number button grid; range is configured per level
    this.numberButtonGrid = new NumberButtonGrid( model.getLevelConfig( levelNumber ).gridRange, {
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.maxY - 10
    } );
    this.addChild( this.numberButtonGrid );

    // Add a 'Check' button in the top-right, disabled until a number is selected
    this.checkButton = new TextPushButton( 'Check', { // TODO i18n https://github.com/phetsims/number-pairs/issues/36
      listener: () => this.checkAnswer()
    } );

    // TODO: Manual constraint for layout, see https://github.com/phetsims/number-pairs/issues/36
    this.checkButton.right = layoutBounds.maxX - 20;
    this.checkButton.top = statusBar.bottom + 10;
    this.checkButton.enabledProperty.value = false;
    this.numberButtonGrid.anySelectedProperty.lazyLink( anySelected => {
      this.checkButton.enabledProperty.value = anySelected && !model.getLevel( levelNumber ).isChallengeSolvedProperty.value;
    } );
    
    // Disable check button when challenge is solved
    model.getLevel( levelNumber ).isChallengeSolvedProperty.lazyLink( solved => {
      if ( solved ) {
        this.checkButton.enabledProperty.value = false;
        this.numberButtonGrid.disableAll();
      }
    } );
    
    this.addChild( this.checkButton );
  }

  /**
   * Checks the user's answer and provides feedback.
   */
  private checkAnswer(): void {
    const selectedNumber = this.numberButtonGrid.getSelectedNumber();
    if ( selectedNumber !== null ) {
      const isCorrect = this.model.checkAnswer( selectedNumber );
      
      if ( !isCorrect ) {
        // Disable the incorrect button
        this.numberButtonGrid.disableButton( selectedNumber );
        // Reset the selected state so user can try again
        this.numberButtonGrid.resetSelection();
      }
    }
  }

  public reset(): void {
    this.numberButtonGrid.resetAll();
  }

  /**
   * Sets up a new challenge in the model and in the view.
   */
  public newChallenge( levelNumber: number ): void {
    // Reset the model state and generate a new challenge for this level
    this.model.getLevel( levelNumber ).resetForNewChallenge();
    this.model.generateNewChallenge();
    this.numberButtonGrid.resetAll();
  }

  public override dispose(): void {
    Disposable.assertNotDisposable();
    super.dispose();
  }
}

numberPairs.register( 'LevelNode', LevelNode );