// Copyright 2025, University of Colorado Boulder

/**
 * LevelNode composes the UI for a single game level: the representation area (bond/equation),
 * number selection grid, and basic Check/Next flow with lightweight feedback visuals.
 *
 * This follows the LevelNode rewrite spec by keeping view logic declarative and deriving
 * display state from the model, while avoiding model changes for now by using a simple
 * adapter that conforms to TGenericNumberPairsModel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import InfiniteStatusBar from '../../../../vegas/js/InfiniteStatusBar.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberBondMutableNode from '../../common/view/NumberBondMutableNode.js';
import NumberEquationNode from '../../common/view/NumberEquationNode.js';
import numberPairs from '../../numberPairs.js';
import Challenge from '../model/Challenge.js';
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';
import NumberButtonGrid from './NumberButtonGrid.js';
import SimpleLevelDisplay from './SimpleLevelDisplay.js';

type SelfOptions = {
  // reserved for future options
};
type LevelNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class LevelNode extends Node {

  public constructor( model: GameModel,
                      level: Level,
                      layoutBounds: Bounds2,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      returnToSelection: () => void,
                      providedOptions?: LevelNodeOptions ) {

    const options = optionize<LevelNodeOptions, SelfOptions, NodeOptions>()( {}, providedOptions );
    super( options );

    // Status bar per requested strategy
    const fullDescription = model.getLevelDescription( level.levelNumber );
    const descriptionOnly = fullDescription.replace( /^Level\s*\d+\s*/, '' );
    const levelLabel = new Text( `Level ${level.levelNumber}`, { font: new PhetFont( { size: 21, weight: 'bold' } ) } );
    const descriptionText = new Text( descriptionOnly, { font: new PhetFont( 21 ) } );
    const levelDescriptionText = new HBox( { spacing: 12, children: [ levelLabel, descriptionText ] } );

    const statusBar = new InfiniteStatusBar( layoutBounds, visibleBoundsProperty, levelDescriptionText, model.getLevelScoreProperty( level.levelNumber ), {
      barFill: '#b6fab9',
      floatToTop: true,
      spacing: 20,
      backButtonListener: () => {
        this.interruptSubtreeInput();
        returnToSelection();
      }
    } );
    this.addChild( statusBar );

    // Number selection grid and selection state
    const numberGrid = new NumberButtonGrid( level.range, level.guessedNumbers );
    numberGrid.centerX = layoutBounds.centerX;
    numberGrid.bottom = layoutBounds.bottom - 40;
    this.addChild( numberGrid );

    // Simple adapter for view widgets
    const displayAdapter = new SimpleLevelDisplay( level, numberGrid.selectedNumberProperty );

    // Representation nodes (pre-create and swap based on challenge type)
    const bondNode = new NumberBondMutableNode( displayAdapter );
    const equationNode = new NumberEquationNode( displayAdapter, {
      addendsOnRight: level.addendsOnRightInEquation,
      totalColorProperty: NumberPairsColors.attributeSumColorProperty,
      leftAddendColorProperty: NumberPairsColors.attributeLeftAddendColorProperty,
      rightAddendColorProperty: NumberPairsColors.attributeRightAddendColorProperty
    } );

    // Add both as children; show the one for current challenge and center it in layout bounds
    this.addChild( bondNode );
    this.addChild( equationNode );
    const updateRepresentation = ( ch: Challenge ) => {
      const useBond = ch.type === 'bond';
      bondNode.visible = useBond;
      equationNode.visible = !useBond;
      if ( useBond ) {
        bondNode.center = layoutBounds.center;
      }
      else {
        equationNode.center = layoutBounds.center;
      }
    };
    updateRepresentation( level.currentChallengeProperty.value );
    level.currentChallengeProperty.link( updateRepresentation );

    // Feedback styling for the missing slot: dashed while unsolved, red dashed when incorrect, solid when correct
    const applyFeedbackStroke = () => {
      const ch = level.currentChallengeProperty.value;
      const state = level.feedbackStateProperty.value;

      // Helper to set stroke/dash on a Circle/Rectangle-like node
      const styleNode = ( node: Circle | Rectangle ) => {
        if ( state === 'correct' ) {
          node.stroke = 'black';
          node.lineDash = [];
        }
        else if ( state === 'incorrect' ) {
          node.stroke = 'red';
          node.lineDash = [ 6, 6 ];
        }
        else { // idle
          node.stroke = '#888';
          node.lineDash = [ 6, 6 ];
        }
      };

      if ( bondNode.visible ) {
        const target = ch.missing === 'a' ? bondNode.leftAddend : ( ch.missing === 'b' ? bondNode.rightAddend : bondNode.total );
        styleNode( target );
      }
      else if ( equationNode.visible ) {
        const target = ch.missing === 'a' ? equationNode.leftAddendSquare : ( ch.missing === 'b' ? equationNode.rightAddendSquare : equationNode.totalSquare );
        styleNode( target );
      }
    };
    level.feedbackStateProperty.link( applyFeedbackStroke );
    level.currentChallengeProperty.link( applyFeedbackStroke );

    // Buttons row: Check / Next
    const checkButton = new TextPushButton( 'Check', {
      listener: () => {
        const guess = numberGrid.getSelectedNumber();
        if ( guess !== null ) {
          const correct = level.checkAnswer( guess );
          // Keep selection so the user sees their choice; grid disables wrong guesses via guessedNumbers
          if ( correct ) {
            // Disable all further number input until next
            numberGrid.disableAll();
          }
        }
      }
    } );
    const nextButton = new TextPushButton( 'Next', {
      listener: () => {
        level.resetForNewChallenge();
        model.generateNewChallenge();
        // Reset grid visuals for the new challenge
        numberGrid.resetAll();
        applyFeedbackStroke();
      }
    } );

    const buttonsRow = new HBox( {
      spacing: 20,
      children: [ checkButton, nextButton ]
    } );
    buttonsRow.centerX = layoutBounds.centerX;
    buttonsRow.bottom = numberGrid.top - 20;
    this.addChild( buttonsRow );

    // Enable Check only when a selectable number is down and feedback is not already correct
    const checkEnabledProperty = new DerivedProperty( [ numberGrid.anySelectedProperty, numberGrid.selectedIsEnabledProperty, level.feedbackStateProperty ],
      ( anySelected: boolean, selectedEnabled: boolean, state: 'idle' | 'incorrect' | 'correct' ) => anySelected && selectedEnabled && state !== 'correct' );
    checkEnabledProperty.link( enabled => { checkButton.enabled = enabled; } );

    // Show Next only when solved
    level.isChallengeSolvedProperty.link( solved => {
      nextButton.visible = solved;
      // Hide check when solved to reduce clutter
      checkButton.visible = !solved;
    } );

    // Status bar description comes from the level description; no per-challenge update needed here

    // When the user changes selection after a wrong attempt, clear feedback back to idle so stroke returns to dotted grey
    numberGrid.selectedNumberProperty.link( () => {
      if ( level.feedbackStateProperty.value === 'incorrect' ) {
        level.clearFeedback();
      }
      applyFeedbackStroke();
    } );
  }
}

numberPairs.register( 'LevelNode', LevelNode );
