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
import ToggleNode from '../../../../sun/js/ToggleNode.js';
import InfiniteStatusBar, { InfiniteStatusBarOptions } from '../../../../vegas/js/InfiniteStatusBar.js';
import TGenericNumberPairsModel from '../../common/model/TGenericNumberPairsModel.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberBondMutableNode from '../../common/view/NumberBondMutableNode.js';
import BarModelNode from '../../common/view/BarModelNode.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';
import NumberButtonGrid from './NumberButtonGrid.js';
import NumberEquationNode from '../../common/view/NumberEquationNode.js';
import TenFrameButton from '../../common/view/TenFrameButton.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';

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

    // Display the current challenge as either a number bond/bar or an equation (using NumberEquationNode)

    // Lightweight adapter to drive NumberBondNode from the Game model
    // Bond adapter (mutable) values/visibility
    const totalProperty = new Property<number>( 0 );
    const leftAddendProperty = new Property<number>( 0 );
    const rightAddendProperty = new Property<number>( 0 );
    const totalVisibleProperty = new Property<boolean>( true );
    const leftAddendVisibleProperty = new Property<boolean>( true );
    const rightAddendVisibleProperty = new Property<boolean>( true );

    // Bar adapter uses correct values for widths, independent of user guesses
    const barTotalCorrectProperty = new Property<number>( 0 );
    const barLeftCorrectProperty = new Property<number>( 0 );
    const barRightCorrectProperty = new Property<number>( 0 );

    // Display numbers for BarModel text, can differ from width values
    const barDisplayTotalProperty = new Property<number>( 0 );
    const barDisplayLeftProperty = new Property<number>( 0 );
    const barDisplayRightProperty = new Property<number>( 0 );

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

    // Equation node constructed from the same adapter properties; order depends on challenge type for this level
    const equationNode = new NumberEquationNode( bondAdapter, {
      addendsOnRight: this.level.addendsOnRightInEquation,
      totalColorProperty: NumberPairsColors.attributeSumColorProperty,
      leftAddendColorProperty: NumberPairsColors.attributeLeftAddendColorProperty,
      rightAddendColorProperty: NumberPairsColors.attributeRightAddendColorProperty
    } );
    equationNode.centerX = layoutBounds.centerX;
    equationNode.top = statusBar.bottom + 40;
    this.addChild( equationNode );

    const barAdapter: TGenericNumberPairsModel = {
      totalProperty: barTotalCorrectProperty,
      totalColorProperty: NumberPairsColors.attributeSumColorProperty,
      totalVisibleProperty: totalVisibleProperty,
      leftAddendProperty: barLeftCorrectProperty,
      leftAddendColorProperty: NumberPairsColors.attributeLeftAddendColorProperty,
      leftAddendVisibleProperty: leftAddendVisibleProperty,
      rightAddendProperty: barRightCorrectProperty,
      rightAddendColorProperty: NumberPairsColors.attributeRightAddendColorProperty,
      rightAddendVisibleProperty: rightAddendVisibleProperty
    };

    const barModelNode = new BarModelNode( barAdapter, {
      displayTotalNumberProperty: barDisplayTotalProperty,
      displayLeftAddendNumberProperty: barDisplayLeftProperty,
      displayRightAddendNumberProperty: barDisplayRightProperty
    } );

    const representationToggle = new ToggleNode<NumberModelType, Node>( NumberPairsPreferences.numberModelTypeProperty, [
      {
        createNode: () => numberBondNode,
        value: NumberModelType.NUMBER_BOND_MODEL
      },
      {
        createNode: () => barModelNode,
        value: NumberModelType.BAR_MODEL
      }
    ] );
    representationToggle.centerX = layoutBounds.centerX;
    representationToggle.top = statusBar.bottom + 30;
    representationToggle.visible = false;
    this.addChild( representationToggle );

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
    const getBarSlotRect = ( slot: Slot ) => slot === 'a' ? barModelNode.leftAddendRectangle : ( slot === 'b' ? barModelNode.rightAddendRectangle : barModelNode.totalRectangle );
    const positionMarkAtBarSlot = ( mark: Text, slot: Slot ) => {
      const rect = getBarSlotRect( slot );
      const parent = mark.globalToParentBounds( rect.globalBounds );
      mark.leftCenter = parent.rightCenter.plusXY( 10, 0 );
    };
    const setBarSlotStrokeStyle = ( slot: Slot, color: string, lineDash: number[] | null ) => {
      const rect = getBarSlotRect( slot );
      rect.stroke = color;
      rect.lineDash = lineDash || [];
    };
    const updateBarMissingSlotStyle = ( slot: Slot, state: 'idle' | 'incorrect' | 'correct' ) => {
      if ( state === 'idle' ) {
        setBarSlotStrokeStyle( slot, '#777', DASH );
      }
      else if ( state === 'incorrect' ) {
        setBarSlotStrokeStyle( slot, '#c40000', DASH );
      }
      else {
        setBarSlotStrokeStyle( slot, 'black', [] );
      }
    };
    const positionMarkAtEquationSlot = ( mark: Text, slot: Slot ) => {
      const rect = getEquationSlotRect( slot );
      const parent = mark.globalToParentBounds( rect.globalBounds );
      mark.leftCenter = parent.rightCenter.plusXY( 10, 0 );
    };
    // Equation slot helpers: use NumberEquationNode's exposed rectangles
    const getEquationSlotRect = ( slot: Slot ) => slot === 'a' ? equationNode.leftAddendSquare : ( slot === 'b' ? equationNode.rightAddendSquare : equationNode.totalSquare );
    const setEquationSlotStrokeStyle = ( slot: Slot, color: string, lineDash: number[] | null ) => {
      const rect = getEquationSlotRect( slot );
      rect.stroke = color;
      rect.lineDash = lineDash || [];
    };
    const updateEquationMissingSlotStyle = ( slot: Slot, state: 'idle' | 'incorrect' | 'correct' ) => {
      if ( state === 'idle' ) {
        setEquationSlotStrokeStyle( slot, '#777', DASH );
      }
      else if ( state === 'incorrect' ) {
        setEquationSlotStrokeStyle( slot, '#c40000', DASH );
      }
      else {
        setEquationSlotStrokeStyle( slot, 'black', [] );
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
    const setBarDisplaySlot = ( slot: Slot, value: number | null ) => {
      if ( slot === 'a' ) {
        if ( value !== null ) {
          barDisplayLeftProperty.value = value;
          leftAddendVisibleProperty.value = true;
        }
        else {
          leftAddendVisibleProperty.value = false;
        }
      }
      else if ( slot === 'b' ) {
        if ( value !== null ) {
          barDisplayRightProperty.value = value;
          rightAddendVisibleProperty.value = true;
        }
        else {
          rightAddendVisibleProperty.value = false;
        }
      }
      else { // 'y'
        if ( value !== null ) {
          barDisplayTotalProperty.value = value;
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
      const yVal = ch.y !== null ? ch.y : ( ( ch.a !== null && ch.b !== null ) ? ch.a + ch.b : 0 );
      const aCorrect = ch.a !== null ? ch.a : ( ch.y !== null && ch.b !== null ? ch.y - ch.b : 0 );
      const bCorrect = ch.b !== null ? ch.b : ( ch.y !== null && ch.a !== null ? ch.y - ch.a : 0 );

      leftAddendProperty.value = aCorrect;
      rightAddendProperty.value = bCorrect;
      totalProperty.value = yVal;

      // Bar widths use correct values
      barLeftCorrectProperty.value = aCorrect;
      barRightCorrectProperty.value = bCorrect;
      barTotalCorrectProperty.value = yVal;

      // Set display numbers for bars; missing will be hidden, shown when user selects
      barDisplayLeftProperty.value = aCorrect;
      barDisplayRightProperty.value = bCorrect;
      barDisplayTotalProperty.value = yVal;

      leftAddendVisibleProperty.value = ch.missing !== 'a';
      rightAddendVisibleProperty.value = ch.missing !== 'b';
      totalVisibleProperty.value = ch.missing !== 'y';

      // Toggle bond vs equation view
      const showRepresentation = ch.type === 'bond';
      representationToggle.visible = showRepresentation;
      equationNode.visible = !showRepresentation;

      // Hide feedback marks on challenge change
      wrongMark.visible = false;
      checkMark.visible = false;
      this.lastIncorrectGuess = null;
      this.lastIncorrectSlot = null;

      // Initialize stroke styles for missing slot when in representation mode or equation
      if ( showRepresentation ) {
        if ( NumberPairsPreferences.numberModelTypeProperty.value === NumberModelType.NUMBER_BOND_MODEL ) {
          updateMissingSlotStyle( ch.missing as Slot, 'idle' );
          ( [ 'a', 'b', 'y' ] as Slot[] ).filter( s => s !== ch.missing ).forEach( s => setSlotStrokeStyle( s, 'black', [] ) );
        }
        else {
          updateBarMissingSlotStyle( ch.missing as Slot, 'idle' );
          ( [ 'a', 'b', 'y' ] as Slot[] ).filter( s => s !== ch.missing ).forEach( s => setBarSlotStrokeStyle( s, 'black', [] ) );
        }
      }
      else {
        updateEquationMissingSlotStyle( ch.missing as Slot, 'idle' );
        ( [ 'a', 'b', 'y' ] as Slot[] ).filter( s => s !== ch.missing ).forEach( s => setEquationSlotStrokeStyle( s, 'black', [] ) );
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
    this.numberButtonGrid = new NumberButtonGrid( this.level.range, this.level.guessedNumbers, {
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.maxY - 10
    } );
    this.addChild( this.numberButtonGrid );

    // Add Ten Frame (organize) button on the left side for levels that support it
    if ( this.level.hasOrganizeTenFrameButton ) {
      const tenFrameButton = new TenFrameButton( {
        tandem: Tandem.OPT_OUT,
        left: layoutBounds.minX + NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
        top: statusBar.bottom + NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
        listener: () => {
          console.log( 'Game: Ten Frame organize pressed' );
        }
      } );
      this.addChild( tenFrameButton );
    }

    // Button enabling/disabling now reacts to Level.guessedNumbersProperty

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
        const isBond = NumberPairsPreferences.numberModelTypeProperty.value === NumberModelType.NUMBER_BOND_MODEL;
        if ( isBond ) {
          if ( selected !== null ) {
            setSlot( slot, selected );
            if ( isIncorrect ) { clearMarksAndFeedback(); }
            updateMissingSlotStyle( slot, 'idle' );
          }
          else {
            if ( isIncorrect && this.lastIncorrectSlot === slot && this.lastIncorrectGuess !== null ) {
              setSlot( slot, this.lastIncorrectGuess );
              positionMarkAtSlot( wrongMark, slot );
              wrongMark.visible = representationToggle.visible;
              updateMissingSlotStyle( slot, 'incorrect' );
            }
            else {
              setSlot( slot, null );
              wrongMark.visible = false;
              updateMissingSlotStyle( slot, 'idle' );
            }
          }
        }
        else { // Bar model: update display numbers, keep widths correct
          if ( selected !== null ) {
            setBarDisplaySlot( slot, selected );
            if ( isIncorrect ) { clearMarksAndFeedback(); }
            updateBarMissingSlotStyle( slot, 'idle' );
          }
          else {
            if ( isIncorrect && this.lastIncorrectSlot === slot && this.lastIncorrectGuess !== null ) {
              setBarDisplaySlot( slot, this.lastIncorrectGuess );
              positionMarkAtBarSlot( wrongMark, slot );
              wrongMark.visible = representationToggle.visible;
              updateBarMissingSlotStyle( slot, 'incorrect' );
            }
            else {
              setBarDisplaySlot( slot, null );
              updateBarMissingSlotStyle( slot, 'idle' );
            }
          }
        }
      }
      else { // equation view
        const isIncorrect = this.level.feedbackStateProperty.value === 'incorrect';
        const slot: Slot = ch.missing;
        if ( selected !== null ) {
          setSlot( slot, selected );
          if ( isIncorrect ) { clearMarksAndFeedback(); }
          updateEquationMissingSlotStyle( slot, 'idle' );
        }
        else {
          if ( isIncorrect && this.lastIncorrectSlot === slot && this.lastIncorrectGuess !== null ) {
            setSlot( slot, this.lastIncorrectGuess );
            positionMarkAtEquationSlot( wrongMark, slot );
            wrongMark.visible = equationNode.visible;
            updateEquationMissingSlotStyle( slot, 'incorrect' );
          }
          else {
            setSlot( slot, null );
            updateEquationMissingSlotStyle( slot, 'idle' );
          }
        }
      }
    } );

    // Keep wrong mark in sync with feedback state
    const ensureBarZeroPlaceholder = ( slot: Slot ) => {
      const total = barTotalCorrectProperty.value;
      const correct = slot === 'a' ? barLeftCorrectProperty.value : ( slot === 'b' ? barRightCorrectProperty.value : barTotalCorrectProperty.value );
      if ( total > 0 && correct === 0 ) {
        const rect = getBarSlotRect( slot );
        rect.rectWidth = Math.max( rect.rectWidth, 2 );
      }
    };

    this.level.feedbackStateProperty.link( state => {
      const ch = this.level.currentChallengeProperty.value;
      if ( ch.type !== 'bond' ) {
        const slot = ch.missing as Slot;
        if ( state === 'incorrect' ) {
          // Ensure the guessed value is visible in the missing square
          if ( this.lastIncorrectGuess !== null && this.lastIncorrectSlot === slot ) {
            setSlot( slot, this.lastIncorrectGuess );
          }
          positionMarkAtEquationSlot( wrongMark, slot );
          wrongMark.visible = equationNode.visible;
          checkMark.visible = false;
          updateEquationMissingSlotStyle( slot, 'incorrect' );
        }
        else if ( state === 'correct' ) {
          // Reveal the correct value in the missing square
          const correctValue = this.level.currentChallengeProperty.value.expectedAnswer();
          setSlot( slot, correctValue );
          positionMarkAtEquationSlot( checkMark, slot );
          checkMark.visible = equationNode.visible;
          wrongMark.visible = false;
          updateEquationMissingSlotStyle( slot, 'correct' );
        }
        else {
          wrongMark.visible = false;
          checkMark.visible = false;
          updateEquationMissingSlotStyle( slot, 'idle' );
        }
        return;
      }

      const isBond = NumberPairsPreferences.numberModelTypeProperty.value === NumberModelType.NUMBER_BOND_MODEL;
      if ( state === 'incorrect' && this.lastIncorrectSlot ) {
        if ( isBond ) {
          positionMarkAtSlot( wrongMark, this.lastIncorrectSlot );
          wrongMark.visible = representationToggle.visible;
          checkMark.visible = false;
          updateMissingSlotStyle( this.lastIncorrectSlot, 'incorrect' );
        }
        else {
          positionMarkAtBarSlot( wrongMark, ch.missing as Slot );
          wrongMark.visible = representationToggle.visible;
          checkMark.visible = false;
          updateBarMissingSlotStyle( ch.missing as Slot, 'incorrect' );
          ensureBarZeroPlaceholder( ch.missing as Slot );
        }
      }
      else if ( state === 'correct' ) {
        if ( isBond ) {
          positionMarkAtSlot( checkMark, ch.missing as Slot );
          checkMark.visible = representationToggle.visible;
          wrongMark.visible = false;
          updateMissingSlotStyle( ch.missing as Slot, 'correct' );
        }
        else {
          positionMarkAtBarSlot( checkMark, ch.missing as Slot );
          checkMark.visible = representationToggle.visible;
          wrongMark.visible = false;
          updateBarMissingSlotStyle( ch.missing as Slot, 'correct' );
          ensureBarZeroPlaceholder( ch.missing as Slot );
        }
      }
      else {
        wrongMark.visible = false;
        checkMark.visible = false;
        if ( isBond ) {
          updateMissingSlotStyle( ch.missing as Slot, 'idle' );
        }
        else {
          updateBarMissingSlotStyle( ch.missing as Slot, 'idle' );
          ensureBarZeroPlaceholder( ch.missing as Slot );
        }
      }
    } );

    // Hide bond-specific marks/styles when pref changes to Bar Model
    NumberPairsPreferences.numberModelTypeProperty.link( value => {
      const ch = this.level.currentChallengeProperty.value;
      const showRepresentation = ch.type === 'bond';
      representationToggle.visible = showRepresentation;
      equationNode.visible = !showRepresentation;

      const isBond = value === NumberModelType.NUMBER_BOND_MODEL;
      const state = this.level.feedbackStateProperty.value;

      if ( !showRepresentation ) {
        // Preference affects only the representation view; equation view untouched
        return;
      }

      const slot = ch.missing as Slot;
      if ( isBond ) {
        if ( state === 'incorrect' && this.lastIncorrectSlot ) {
          positionMarkAtSlot( wrongMark, this.lastIncorrectSlot );
          wrongMark.visible = true;
          checkMark.visible = false;
          updateMissingSlotStyle( slot, 'incorrect' );
        }
        else if ( state === 'correct' ) {
          positionMarkAtSlot( checkMark, slot );
          checkMark.visible = true;
          wrongMark.visible = false;
          updateMissingSlotStyle( slot, 'correct' );
        }
        else {
          wrongMark.visible = false;
          checkMark.visible = false;
          updateMissingSlotStyle( slot, 'idle' );
        }
      }
      else { // Bar model
        if ( state === 'incorrect' && this.lastIncorrectSlot ) {
          positionMarkAtBarSlot( wrongMark, slot );
          wrongMark.visible = true;
          checkMark.visible = false;
          updateBarMissingSlotStyle( slot, 'incorrect' );
          ensureBarZeroPlaceholder( slot );
        }
        else if ( state === 'correct' ) {
          positionMarkAtBarSlot( checkMark, slot );
          checkMark.visible = true;
          wrongMark.visible = false;
          updateBarMissingSlotStyle( slot, 'correct' );
          ensureBarZeroPlaceholder( slot );
        }
        else {
          wrongMark.visible = false;
          checkMark.visible = false;
          updateBarMissingSlotStyle( slot, 'idle' );
          ensureBarZeroPlaceholder( slot );
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
        // Remember the incorrect guess and which slot it applied to
        const ch = this.level.currentChallengeProperty.value;
        this.lastIncorrectGuess = selectedNumber;
        // Track for all challenge types so non-bond (equation) can show marks/dotted red with value
        this.lastIncorrectSlot = ch.missing;

        // Reset selection; button disabling is handled by Level.guessedNumbersProperty link in NumberButtonGrid
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