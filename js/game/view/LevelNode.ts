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
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import BarModelNode from '../../common/view/BarModelNode.js';
import NumberBondMutableNode from '../../common/view/NumberBondMutableNode.js';
import NumberEquationNode from '../../common/view/NumberEquationNode.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';
import BarLevelDisplay from './BarLevelDisplay.js';
import NumberButtonGrid from './NumberButtonGrid.js';
import SimpleLevelDisplay from './SimpleLevelDisplay.js';
import StatusBar from './StatusBar.js';

type SelfOptions = EmptySelfOptions;
type LevelNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class LevelNode extends Node {

  public constructor( model: GameModel,
                      level: Level,
                      layoutBounds: Bounds2,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      returnToSelection: () => void,
                      tandem: Tandem,
                      providedOptions?: LevelNodeOptions ) {

    const options = optionize<LevelNodeOptions, SelfOptions, NodeOptions>()( {}, providedOptions );
    super( options );

    const statusBar = new StatusBar( layoutBounds, visibleBoundsProperty, level, model, () => {
      this.interruptSubtreeInput();
      returnToSelection();
    }, tandem.createTandem( 'statusBar' ) );
    this.addChild( statusBar );

    // Number selection grid and selection state
    const numberButtonGrid = new NumberButtonGrid( level.range, level.guessedNumbers, tandem.createTandem( 'numberButtonGrid' ) );
    numberButtonGrid.centerX = layoutBounds.centerX;
    numberButtonGrid.bottom = layoutBounds.bottom - 40;
    this.addChild( numberButtonGrid );

    // Simple adapter for view widgets
    const displayAdapter = new SimpleLevelDisplay( level, numberButtonGrid.selectedNumberProperty );

    // Correct-size adapter for bar model widths
    const barAdapter = new BarLevelDisplay( level, numberButtonGrid.selectedNumberProperty );

    // Representation nodes (pre-create and swap based on challenge type)
    const bondNode = new NumberBondMutableNode( displayAdapter, {
      visibleProperty: new DerivedProperty( [ NumberPairsPreferences.numberModelTypeProperty ], numberModelType => {
        return ( level.type !== 'decompositionEquation' && level.type !== 'sumEquation' ) && numberModelType === NumberModelType.NUMBER_BOND_MODEL;
      } )
    } );
    const barNode = new BarModelNode( barAdapter, {
      displayTotalNumberProperty: displayAdapter.totalProperty,
      displayLeftAddendNumberProperty: displayAdapter.leftAddendProperty,
      displayRightAddendNumberProperty: displayAdapter.rightAddendProperty,
      visibleProperty: new DerivedProperty( [ NumberPairsPreferences.numberModelTypeProperty ], numberModelType => {
        return ( level.type !== 'decompositionEquation' && level.type !== 'sumEquation' ) && numberModelType === NumberModelType.BAR_MODEL;
      } )
    } );
    const equationNode = new NumberEquationNode( displayAdapter, {
      addendsOnRight: level.type === 'decompositionEquation',
      totalColorProperty: NumberPairsColors.attributeSumColorProperty,
      leftAddendColorProperty: NumberPairsColors.attributeLeftAddendColorProperty,
      rightAddendColorProperty: NumberPairsColors.attributeRightAddendColorProperty,
      visible: level.type === 'decompositionEquation' || level.type === 'sumEquation'
    } );

    ManualConstraint.create( this, [ bondNode, barNode, equationNode ], ( bondNodeProxy, barNodeProxy, equationNodeProxy ) => {
      bondNodeProxy.centerX = layoutBounds.centerX;
      barNodeProxy.centerX = layoutBounds.centerX;
      equationNodeProxy.centerX = layoutBounds.centerX;

      bondNodeProxy.top = statusBar.bottom + 20;
      barNodeProxy.top = statusBar.bottom + 20;
      equationNodeProxy.top = statusBar.bottom + 20;
    } );

    // Add both as children; show the one for current challenge and center it in layout bounds
    this.addChild( bondNode );
    this.addChild( barNode );
    this.addChild( equationNode );

    // Feedback styling for the missing slot: dashed while unsolved, red dashed when incorrect, solid when correct
    const applyFeedbackStroke = () => {
      const ch = level.challengeProperty.value;
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
      else if ( barNode.visible ) {
        const target = ch.missing === 'a' ? barNode.leftAddendRectangle : ( ch.missing === 'b' ? barNode.rightAddendRectangle : barNode.totalRectangle );
        styleNode( target );
      }
      else if ( equationNode.visible ) {
        const target = ch.missing === 'a' ? equationNode.leftAddendSquare : ( ch.missing === 'b' ? equationNode.rightAddendSquare : equationNode.totalSquare );
        styleNode( target );
      }
    };
    level.feedbackStateProperty.link( applyFeedbackStroke );
    level.challengeProperty.link( applyFeedbackStroke );
    NumberPairsPreferences.numberModelTypeProperty.link( applyFeedbackStroke );

    // Checkmark/X feedback marks positioned by the missing slot
    const wrongMark = new Text( '✗', { font: new PhetFont( 42 ), fill: 'red', visibleProperty: new DerivedProperty( [ level.feedbackStateProperty ], feedbackState => feedbackState === 'incorrect' ) } );
    const checkMark = new Text( '✓', { font: new PhetFont( 42 ), fill: '#059e05', visibleProperty: new DerivedProperty( [ level.feedbackStateProperty ], feedbackState => feedbackState === 'correct' ) } );
    this.addChild( wrongMark );
    this.addChild( checkMark );

    const updateMarks = () => {
      const ch = level.challengeProperty.value;
      const state = level.feedbackStateProperty.value;

      const placeMarkNear = ( target: Node ) => {
        const parentBounds = wrongMark.globalToParentBounds( target.globalBounds );
        const pos = parentBounds.rightCenter.plusXY( 10, 0 );
        if ( state === 'incorrect' ) {
          wrongMark.leftCenter = pos;
          wrongMark.visible = true;
        }
        else if ( state === 'correct' ) {
          checkMark.leftCenter = pos;
          checkMark.visible = true;
        }
      };

      if ( state === 'idle' ) { return; }

      if ( bondNode.visible ) {
        const target = ch.missing === 'a' ? bondNode.leftAddend : ( ch.missing === 'b' ? bondNode.rightAddend : bondNode.total );
        placeMarkNear( target );
      }
      else if ( barNode.visible ) {
        const target = ch.missing === 'a' ? barNode.leftAddendRectangle : ( ch.missing === 'b' ? barNode.rightAddendRectangle : barNode.totalRectangle );
        placeMarkNear( target );
      }
      else if ( equationNode.visible ) {
        const target = ch.missing === 'a' ? equationNode.leftAddendSquare : ( ch.missing === 'b' ? equationNode.rightAddendSquare : equationNode.totalSquare );
        placeMarkNear( target );
      }
    };
    level.challengeProperty.link( updateMarks );
    NumberPairsPreferences.numberModelTypeProperty.link( updateMarks );

    // Buttons row: Check / Next
    const checkButton = new TextPushButton( 'Check', {
      tandem: tandem.createTandem( 'checkButton' ),
      listener: () => {
        const guess = numberButtonGrid.getSelectedNumber();
        if ( guess !== null ) {
          const correct = level.checkAnswer( guess );

          // Keep selection so the user sees their choice; grid disables wrong guesses via guessedNumbers
          if ( correct ) {

            // Disable all further number input until next
            numberButtonGrid.disableAll();
          }
        }
      }
    } );
    const nextButton = new TextPushButton( 'Next', {
      tandem: tandem.createTandem( 'nextButton' ),
      visibleProperty: new DerivedProperty( [ level.feedbackStateProperty ], feedbackState => feedbackState === 'correct' ),
      listener: () => {
        level.nextChallenge();

        // Reset grid visuals for the new challenge
        numberButtonGrid.resetAll();
        applyFeedbackStroke();
      }
    } );

    const buttonsRow = new HBox( {
      spacing: 20,
      children: [ checkButton, nextButton ]
    } );
    buttonsRow.centerX = layoutBounds.centerX;
    buttonsRow.bottom = numberButtonGrid.top - 20;
    this.addChild( buttonsRow );

    // Enable Check only when a selectable number is down and feedback is not already correct
    const checkEnabledProperty = new DerivedProperty( [ numberButtonGrid.anySelectedProperty, numberButtonGrid.selectedIsEnabledProperty, level.feedbackStateProperty ],
      ( anySelected: boolean, selectedEnabled: boolean, state: 'idle' | 'incorrect' | 'correct' ) => anySelected && selectedEnabled && state !== 'correct' );
    checkEnabledProperty.link( enabled => { checkButton.enabled = enabled; } );

    // Show Next only when solved
    level.feedbackStateProperty.link( feedbackState => {
      checkButton.visible = feedbackState !== 'correct';
    } );

    // Status bar description comes from the level description; no per-challenge update needed here

    // When the user changes selection after a wrong attempt, clear feedback back to idle so stroke returns to dotted grey
    numberButtonGrid.selectedNumberProperty.link( () => {
      if ( level.feedbackStateProperty.value === 'incorrect' ) {
        level.clearFeedback();
      }
      applyFeedbackStroke();
    } );
  }
}

numberPairs.register( 'LevelNode', LevelNode );
