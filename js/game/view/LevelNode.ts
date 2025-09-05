// Copyright 2025, University of Colorado Boulder

/**
 * LevelNode shows one level of the Number Play game.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ArrowShape from '../../../../scenery-phet/js/ArrowShape.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import InfiniteStatusBar, { InfiniteStatusBarOptions } from '../../../../vegas/js/InfiniteStatusBar.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';
import NumberButtonGrid from './NumberButtonGrid.js';
import NumberBondNode from '../../common/view/NumberBondNode.js';
import TGenericNumberPairsModel from '../../common/model/TGenericNumberPairsModel.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';

export default class LevelNode extends Node {

  private readonly model: GameModel;
  private readonly level: Level;
  private readonly numberButtonGrid: NumberButtonGrid;
  private readonly checkButton: TextPushButton;
  private readonly newChallengeButton: RectangularPushButton;

  public constructor( model: GameModel, level: Level, layoutBounds: Bounds2, visibleBoundsProperty: TReadOnlyProperty<Bounds2>, returnToLevelSelection: () => void ) {
    super();

    this.model = model;
    this.level = level;

    // Title and description in the status bar: bold "Level X" + spaced non-bold description
    const fullDescription = model.getLevelDescription( this.level.levelNumber );
    const descriptionOnly = fullDescription.replace( /^Level\s*\d+\s*/, '' );
    const levelLabel = new Text( `Level ${this.level.levelNumber}`, { font: new PhetFont( { size: 21, weight: 'bold' } ) } );
    const descriptionText = new Text( descriptionOnly, { font: new PhetFont( 21 ) } );
    const levelDescriptionText = new HBox( { spacing: 12, children: [ levelLabel, descriptionText ] } );

    // bar across the top of the screen - show this level's score
    const statusBar = new InfiniteStatusBar( layoutBounds, visibleBoundsProperty, levelDescriptionText, model.getLevelScoreProperty( this.level.levelNumber ),
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

    // Display the current challenge as either an equation (default) or a number bond when type === 'bond'
    const equationText = new Text( this.level.currentChallengeProperty.value.toEquationString(), {
      font: new PhetFont( 48 ),
      fill: 'black'
    } );
    equationText.centerX = layoutBounds.centerX;
    equationText.top = statusBar.bottom + 40;
    this.addChild( equationText );

    // Lightweight adapter to drive NumberBondNode from the Game model
    const totalProperty = new Property<number>( 0 );
    const leftAddendProperty = new Property<number>( 0 );
    const rightAddendProperty = new Property<number>( 0 );
    const totalVisibleProperty = new Property<boolean>( true );
    const leftAddendVisibleProperty = new Property<boolean>( true );
    const rightAddendVisibleProperty = new Property<boolean>( true );

    const bondAdapter: TGenericNumberPairsModel = {
      totalProperty: totalProperty,
      totalColorProperty: NumberPairsColors.attributeSumColorProperty,
      totalVisibleProperty: totalVisibleProperty,
      leftAddendProperty: leftAddendProperty,
      leftAddendColorProperty: NumberPairsColors.attributeLeftAddendColorProperty,
      leftAddendVisibleProperty: leftAddendVisibleProperty,
      rightAddendProperty: rightAddendProperty,
      rightAddendColorProperty: NumberPairsColors.attributeRightAddendColorProperty,
      rightAddendVisibleProperty: rightAddendVisibleProperty
    };

    const numberBondNode = new NumberBondNode( bondAdapter );
    numberBondNode.centerX = layoutBounds.centerX;
    numberBondNode.top = statusBar.bottom + 30;
    numberBondNode.visible = false;
    this.addChild( numberBondNode );

    // Sync adapter properties from the current challenge
    const applyChallengeToBond = () => {
      const ch = this.level.currentChallengeProperty.value;
      const aVal = ch.a !== null ? ch.a : 0;
      const bVal = ch.b !== null ? ch.b : 0;
      const yVal = ch.y !== null ? ch.y : ( ( ch.a !== null && ch.b !== null ) ? ch.a + ch.b : 0 );

      leftAddendProperty.value = aVal;
      rightAddendProperty.value = bVal;
      totalProperty.value = yVal;

      leftAddendVisibleProperty.value = ch.missing !== 'a';
      rightAddendVisibleProperty.value = ch.missing !== 'b';
      totalVisibleProperty.value = ch.missing !== 'y';

      // Toggle bond vs equation view
      const showBond = ch.type === 'bond';
      numberBondNode.visible = showBond;
      equationText.visible = !showBond;

      // Update equation text regardless (used for non-bond types)
      equationText.string = ch.toEquationString();
    };
    applyChallengeToBond();

    // Update when the challenge changes
    this.level.currentChallengeProperty.link( () => applyChallengeToBond() );

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
      visibleProperty: this.level.isChallengeSolvedProperty,
      listener: () => this.newChallenge()
    } );
    this.newChallengeButton.centerX = layoutBounds.centerX;
    this.newChallengeButton.bottom = layoutBounds.maxY - 200;
    this.addChild( this.newChallengeButton );

    // Add the number button grid; range is configured per level
    this.numberButtonGrid = new NumberButtonGrid( model.getLevelConfig( this.level.levelNumber ).gridRange, {
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.maxY - 10
    } );
    this.addChild( this.numberButtonGrid );

    // Disable any numbers that were already guessed for this challenge (in case of re-entry)
    const initialGuessed = this.level.getGuessedNumbers();
    initialGuessed.forEach( n => this.numberButtonGrid.disableButton( n ) );

    // Add a 'Check' button in the top-right, disabled until a number is selected
    this.checkButton = new TextPushButton( 'Check', { // TODO i18n https://github.com/phetsims/number-pairs/issues/36
      listener: () => this.checkAnswer()
    } );

    // TODO: Manual constraint for layout, see https://github.com/phetsims/number-pairs/issues/36
    this.checkButton.right = layoutBounds.maxX - 20;
    this.checkButton.top = statusBar.bottom + 10;
    this.checkButton.enabledProperty.value = false;
    this.numberButtonGrid.anySelectedProperty.lazyLink( anySelected => {
      this.checkButton.enabledProperty.value = anySelected && !this.level.isChallengeSolvedProperty.value;

      // If this is a number bond challenge, reflect the current selection in the missing addend
      const ch = this.level.currentChallengeProperty.value;
      if ( ch.type === 'bond' ) {
        const selected = this.numberButtonGrid.getSelectedNumber();
        if ( ch.missing === 'a' ) {
          if ( selected !== null ) {
            leftAddendProperty.value = selected;
            leftAddendVisibleProperty.value = true;
          }
          else {
            leftAddendVisibleProperty.value = false;
          }
        }
        else if ( ch.missing === 'b' ) {
          if ( selected !== null ) {
            rightAddendProperty.value = selected;
            rightAddendVisibleProperty.value = true;
          }
          else {
            rightAddendVisibleProperty.value = false;
          }
        }
        else if ( ch.missing === 'y' ) {
          if ( selected !== null ) {
            totalProperty.value = selected;
            totalVisibleProperty.value = true;
          }
          else {
            totalVisibleProperty.value = false;
          }
        }
      }
    } );

    // Disable check button when challenge is solved
    this.level.isChallengeSolvedProperty.lazyLink( ( solved: boolean ) => {
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
      const isCorrect = this.level.checkAnswer( selectedNumber );

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
  public newChallenge(): void {
    // Reset the model state and generate a new challenge for this level
    this.level.resetForNewChallenge();
    this.model.generateNewChallenge();
    this.numberButtonGrid.resetAll();
  }

  public override dispose(): void {
    Disposable.assertNotDisposable();
    super.dispose();
  }
}

numberPairs.register( 'LevelNode', LevelNode );