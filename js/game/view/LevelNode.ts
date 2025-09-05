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
import TGenericNumberPairsModel from '../../common/model/TGenericNumberPairsModel.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberBondMutableNode from '../../common/view/NumberBondMutableNode.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';
import NumberButtonGrid from './NumberButtonGrid.js';

export default class LevelNode extends Node {

  private readonly model: GameModel;
  private readonly level: Level;
  private readonly numberButtonGrid: NumberButtonGrid;
  private readonly checkButton: TextPushButton;
  private readonly newChallengeButton: RectangularPushButton;
  private lastIncorrectGuess: number | null = null;
  private lastIncorrectSlot: 'a' | 'b' | 'y' | null = null;

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

    const numberBondNode = new NumberBondMutableNode( bondAdapter );
    numberBondNode.centerX = layoutBounds.centerX;
    numberBondNode.top = statusBar.bottom + 30;
    numberBondNode.visible = false;
    this.addChild( numberBondNode );

    // Feedback indicators shown on the bond
    const wrongMark = new Text( '✗', { font: new PhetFont( 42 ), fill: 'red', visible: false } );
    const checkMark = new Text( '✓', { font: new PhetFont( 42 ), fill: '#059e05', visible: false } );
    this.addChild( wrongMark );
    this.addChild( checkMark );

    type Slot = 'a' | 'b' | 'y';

    const getSlotTargetNode = ( slot: Slot ) => slot === 'a' ? numberBondNode.leftAddend : ( slot === 'b' ? numberBondNode.rightAddend : numberBondNode.total );
    const positionMarkAtSlot = ( mark: Text, slot: Slot ) => {
      const target = getSlotTargetNode( slot );
      const parent = mark.globalToParentBounds( target.globalBounds );
      mark.leftCenter = parent.rightCenter.plusXY( 10, 0 );
    };
    const DASH: number[] = [ 6, 4 ];
    const setSlotStrokeStyle = ( slot: Slot, color: string, lineDash: number[] | null ) => {
      const node = getSlotTargetNode( slot );
      node.stroke = color;
      node.lineDash = lineDash || [];
    };
    const updateMissingSlotStyle = ( slot: Slot, state: 'idle' | 'incorrect' | 'correct' ) => {
      if ( state === 'idle' ) {
        setSlotStrokeStyle( slot, '#777', DASH );
      }
      else if ( state === 'incorrect' ) {
        setSlotStrokeStyle( slot, '#c40000', DASH );
      }
      else {
        setSlotStrokeStyle( slot, 'black', [] );
      }
    };
    const setSlot = ( slot: Slot, value: number | null ) => {
      if ( slot === 'a' ) {
        if ( value !== null ) {
          leftAddendProperty.value = value;
          leftAddendVisibleProperty.value = true;
        }
        else {
          leftAddendVisibleProperty.value = false;
        }
      }
      else if ( slot === 'b' ) {
        if ( value !== null ) {
          rightAddendProperty.value = value;
          rightAddendVisibleProperty.value = true;
        }
        else {
          rightAddendVisibleProperty.value = false;
        }
      }
      else { // 'y'
        if ( value !== null ) {
          totalProperty.value = value;
          totalVisibleProperty.value = true;
        }
        else {
          totalVisibleProperty.value = false;
        }
      }
    };
    const clearMarksAndFeedback = () => {
      this.level.clearFeedback();
      wrongMark.visible = false;
      checkMark.visible = false;
      this.lastIncorrectGuess = null;
      this.lastIncorrectSlot = null;
    };

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

      // Hide feedback marks on challenge change
      wrongMark.visible = false;
      checkMark.visible = false;
      this.lastIncorrectGuess = null;
      this.lastIncorrectSlot = null;

      // Update equation text regardless (used for non-bond types)
      equationText.string = ch.toEquationString();

      // Initialize stroke styles for missing slot when in bond mode
      if ( showBond ) {
        updateMissingSlotStyle( ch.missing as Slot, 'idle' );
        ( [ 'a', 'b', 'y' ] as Slot[] ).filter( s => s !== ch.missing ).forEach( s => setSlotStrokeStyle( s, 'black', [] ) );
      }
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
    } );

    // Update NumberCircle when the selection number changes (even if anySelected remains true)
    this.numberButtonGrid.selectedNumberProperty.lazyLink( selected => {
      const ch = this.level.currentChallengeProperty.value;
      if ( ch.type === 'bond' ) {
        const isIncorrect = this.level.feedbackStateProperty.value === 'incorrect';
        const slot: Slot = ch.missing;
        if ( selected !== null ) {
          setSlot( slot, selected );
          if ( isIncorrect ) { clearMarksAndFeedback(); }
          updateMissingSlotStyle( slot, 'idle' );
        }
        else {
          if ( isIncorrect && this.lastIncorrectSlot === slot && this.lastIncorrectGuess !== null ) {
            setSlot( slot, this.lastIncorrectGuess );
            positionMarkAtSlot( wrongMark, slot );
            wrongMark.visible = numberBondNode.visible;
            updateMissingSlotStyle( slot, 'incorrect' );
          }
          else {
            setSlot( slot, null );
            wrongMark.visible = false;
            updateMissingSlotStyle( slot, 'idle' );
          }
        }
      }
    } );

    // Keep wrong mark in sync with feedback state
    this.level.feedbackStateProperty.link( state => {
      const ch = this.level.currentChallengeProperty.value;
      if ( ch.type !== 'bond' ) {
        wrongMark.visible = false;
        checkMark.visible = false;
        return;
      }

      if ( state === 'incorrect' && this.lastIncorrectSlot ) {
        positionMarkAtSlot( wrongMark, this.lastIncorrectSlot );
        wrongMark.visible = numberBondNode.visible;
        checkMark.visible = false;
        updateMissingSlotStyle( this.lastIncorrectSlot, 'incorrect' );
      }
      else if ( state === 'correct' ) {
        positionMarkAtSlot( checkMark, ch.missing as Slot );
        checkMark.visible = numberBondNode.visible;
        wrongMark.visible = false;
        updateMissingSlotStyle( ch.missing as Slot, 'correct' );
      }
      else {
        wrongMark.visible = false;
        checkMark.visible = false;
        updateMissingSlotStyle( ch.missing as Slot, 'idle' );
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
        // Remember the incorrect guess and which slot it applied to
        const ch = this.level.currentChallengeProperty.value;
        this.lastIncorrectGuess = selectedNumber;
        this.lastIncorrectSlot = ch.type === 'bond' ? ch.missing : null;

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