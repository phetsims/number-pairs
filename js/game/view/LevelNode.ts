// Copyright 2025, University of Colorado Boulder

/**
 * LevelNode composes the UI for a single game level: the representation area (bond/equation),
 * number selection grid, and basic Check/Next flow with lightweight feedback visuals.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import { NumberPairsUtils } from '../../common/model/NumberPairsUtils.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import BarModelNode from '../../common/view/BarModelNode.js';
import CountingAreaNode from '../../common/view/CountingAreaNode.js';
import KittensLayerNode from '../../common/view/KittensLayerNode.js';
import NumberEquationNode from '../../common/view/NumberEquationNode.js';
import TenFrameButton from '../../common/view/TenFrameButton.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';
import BarLevelDisplay from './BarLevelDisplay.js';
import GameNumberBondNode from './GameNumberBondNode.js';
import NumberButtonGrid from './NumberButtonGrid.js';
import StatusBar from './StatusBar.js';

type SelfOptions = EmptySelfOptions;
type LevelNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

const MARGIN = 10;

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
    const numberButtonGrid = new NumberButtonGrid( level.selectedGuessProperty, level.range, level.guessedNumbers, tandem.createTandem( 'numberButtonGrid' ) );
    numberButtonGrid.right = layoutBounds.right - MARGIN;
    numberButtonGrid.bottom = layoutBounds.bottom - MARGIN;
    this.addChild( numberButtonGrid );

    // Correct-size adapter for bar model widths
    const barAdapter = new BarLevelDisplay( level, level.selectedGuessProperty );

    // Representation nodes (pre-create and swap based on challenge type)
    const bondNode = new GameNumberBondNode( level, level, {
      visibleProperty: new DerivedProperty( [ NumberPairsPreferences.numberModelTypeProperty ], numberModelType => {
        return ( level.type !== 'decompositionEquation' && level.type !== 'sumEquation' ) && numberModelType === NumberModelType.NUMBER_BOND_MODEL;
      } )
    } );
    const barNode = new BarModelNode( barAdapter, {
      displayTotalNumberProperty: level.totalProperty,
      displayLeftAddendNumberProperty: level.leftAddendProperty,
      displayRightAddendNumberProperty: level.rightAddendProperty,
      visibleProperty: new DerivedProperty( [ NumberPairsPreferences.numberModelTypeProperty ], numberModelType => {
        return ( level.type !== 'decompositionEquation' && level.type !== 'sumEquation' ) && numberModelType === NumberModelType.BAR_MODEL;
      } )
    } );
    const equationNode = new NumberEquationNode( level, {
      addendsOnRight: level.type === 'decompositionEquation',
      totalColorProperty: NumberPairsColors.attributeSumColorProperty,
      leftAddendColorProperty: NumberPairsColors.attributeLeftAddendColorProperty,
      rightAddendColorProperty: NumberPairsColors.attributeRightAddendColorProperty,
      visible: level.type === 'decompositionEquation' || level.type === 'sumEquation'
    } );

    this.addChild( bondNode );
    this.addChild( barNode );
    this.addChild( equationNode );

    // Checkmark/X feedback marks positioned by the missing slot
    const wrongMark = new Text( '✗', {
      font: new PhetFont( 42 ),
      fill: 'red',
      visibleProperty: new DerivedProperty( [ level.feedbackStateProperty ], feedbackState => feedbackState === 'incorrect' )
    } );
    const checkMark = new Text( '✓', {
      font: new PhetFont( 42 ),
      fill: '#059e05',
      visibleProperty: new DerivedProperty( [ level.feedbackStateProperty ], feedbackState => feedbackState === 'correct' )
    } );
    this.addChild( wrongMark );
    this.addChild( checkMark );

    ManualConstraint.create( this, [ bondNode, barNode, equationNode, statusBar, wrongMark, checkMark ], ( bondNodeProxy, barNodeProxy, equationNodeProxy, statusBarProxy, wrongMarkProxy, checkMarkProxy ) => {
      bondNodeProxy.centerX = layoutBounds.centerX;
      barNodeProxy.centerX = layoutBounds.centerX;
      equationNodeProxy.centerX = layoutBounds.centerX;

      bondNodeProxy.top = statusBarProxy.bottom + 5;
      barNodeProxy.top = statusBarProxy.bottom + 5;
      equationNodeProxy.top = statusBarProxy.bottom + 5;

      wrongMarkProxy.right = Math.max( bondNodeProxy.right, barNodeProxy.right, equationNodeProxy.right ) + 10;
      wrongMarkProxy.centerY = ( bondNodeProxy.centerY + barNodeProxy.centerY + equationNodeProxy.centerY ) / 3;

      checkMarkProxy.right = Math.max( bondNodeProxy.right, barNodeProxy.right, equationNodeProxy.right ) + 10;
      checkMarkProxy.centerY = ( bondNodeProxy.centerY + barNodeProxy.centerY + equationNodeProxy.centerY ) / 3;
    } );

    let countingAreaNode: CountingAreaNode | null = null;
    let myTenFrameButton: TenFrameButton | null = null;

    if ( level.levelNumber <= 7 ) {
      const gameCountingAreaNode = new CountingAreaNode( new BooleanProperty( true ), new BooleanProperty( true ), level, {
        countingRepresentationTypeProperty: level.representationTypeProperty,
        backgroundColorProperty: NumberPairsColors.attributeSumColorProperty,
        tandem: tandem.createTandem( 'gameCountingAreaNode' ),
        top: equationNode.bottom + 20
      } );

      countingAreaNode = gameCountingAreaNode;

      const kittensLayerNode = new KittensLayerNode( level.countingObjects, gameCountingAreaNode, {
        tandem: tandem.createTandem( 'kittensLayerNode' )
      } );

      const tenFrameButton = new TenFrameButton( {
        // accessibleName: organizeObjectsPatternStringProperty,
        // accessibleHelpText: organizeObjectsHelpTextPatternStringProperty,
        tandem: tandem.createTandem( 'tenFrameButton' ),
        // touchAreaXDilation: buttonVBoxSpacing / 2,
        // touchAreaYDilation: buttonVBoxSpacing / 2,
        right: gameCountingAreaNode.left,
        top: gameCountingAreaNode.top,
        listener: () => {
          this.interruptSubtreeInput();
          level.deselectAllKittens();

          level.organizeIntoTenFrame( NumberPairsUtils.splitBoundsInHalf( NumberPairsConstants.COUNTING_AREA_BOUNDS ), 'attribute' );
        },
        accessibleName: 'Ten frame' // TODO i18n https://github.com/phetsims/number-pairs/issues/36
      } );

      myTenFrameButton = tenFrameButton;

      this.addChild( gameCountingAreaNode );
      this.addChild( kittensLayerNode );
      this.addChild( tenFrameButton );

      // numberButtonGrid.selectedNumberProperty.link( guess => {
      //   twentyModel.setGuess( guess );
      // } );
    }

    // Buttons row: Check / Next
    const checkButton = new TextPushButton( 'Check', {
      tandem: tandem.createTandem( 'checkButton' ),
      right: layoutBounds.right - 100,
      top: layoutBounds.top + 100,
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
      right: layoutBounds.right - 100,
      top: layoutBounds.top + 100,
      visibleProperty: new DerivedProperty( [ level.feedbackStateProperty ], feedbackState => feedbackState === 'correct' ),
      listener: () => {
        level.nextChallenge();

        // Reset grid visuals for the new challenge
        numberButtonGrid.resetAll();

        numberButtonGrid.buttons[ 0 ].focus();
      }
    } );

    this.addChild( checkButton );
    this.addChild( nextButton );

    nextButton.visibleProperty.lazyLink( visible => {
      if ( visible ) {
        nextButton.focus();
      }
    } );

    // Enable Check only when a selectable number is down and feedback is not already correct
    const checkEnabledProperty = new DerivedProperty( [ numberButtonGrid.anySelectedProperty, numberButtonGrid.selectedIsEnabledProperty, level.feedbackStateProperty ],
      ( anySelected: boolean, selectedEnabled: boolean, state: 'idle' | 'incorrect' | 'correct' ) => anySelected && selectedEnabled && state !== 'correct' );
    checkEnabledProperty.link( enabled => { checkButton.enabled = enabled; } );

    // Show Next only when solved
    level.feedbackStateProperty.link( feedbackState => {
      checkButton.visible = feedbackState !== 'correct';
    } );

    // When the user changes selection after a wrong attempt, clear feedback back to idle so stroke returns to dotted grey
    level.selectedGuessProperty.link( () => {
      if ( level.feedbackStateProperty.value === 'incorrect' ) {
        level.clearFeedback();
      }
    } );

    this.pdomOrder = [
      numberButtonGrid,
      checkButton,
      nextButton,
      ...( myTenFrameButton ? [ myTenFrameButton ] : [] ),
      ...( countingAreaNode ? [ countingAreaNode ] : [] ),
      statusBar
    ];
  }
}

numberPairs.register( 'LevelNode', LevelNode );
