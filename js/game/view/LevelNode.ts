// Copyright 2025, University of Colorado Boulder

/**
 * LevelNode composes the UI for a single game level: the representation area (bond/equation),
 * number selection grid, and basic Check/Next flow with lightweight feedback visuals.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import derived from '../../../../axon/js/derived.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ResetButton from '../../../../scenery-phet/js/buttons/ResetButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';
import NumberButtonGrid from './NumberButtonGrid.js';
import StatusBar from './StatusBar.js';

type SelfOptions = EmptySelfOptions;
export type LevelNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

const MARGIN = 10;

export default abstract class LevelNode extends Node {
  protected readonly statusBar: StatusBar;
  protected readonly wrongMark: Text;
  protected readonly checkMark: Text;
  protected readonly tryAgainText: Text;
  protected readonly resetChallengeButton: ResetButton;

  protected constructor( model: GameModel,
                         level: Level,
                         layoutBounds: Bounds2,
                         visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                         returnToSelection: () => void,
                         tandem: Tandem,
                         providedOptions?: LevelNodeOptions ) {

    const options = optionize<LevelNodeOptions, SelfOptions, NodeOptions>()( {}, providedOptions );
    super( options );

    this.statusBar = new StatusBar( layoutBounds, visibleBoundsProperty, level, model, () => {
      this.interruptSubtreeInput();
      returnToSelection();
    }, tandem.createTandem( 'statusBar' ) );
    this.addChild( this.statusBar );

    // Number selection grid and selection state
    const numberButtonGrid = new NumberButtonGrid( level.selectedGuessProperty, level.range, level.guessedNumbers, tandem.createTandem( 'numberButtonGrid' ), {
      right: layoutBounds.right - MARGIN,
      bottom: layoutBounds.bottom - MARGIN
    } );
    this.addChild( numberButtonGrid );

    // Checkmark/X feedback marks positioned by the missing slot
    this.wrongMark = new Text( '✗', {
      font: new PhetFont( 42 ),
      fill: 'red',
      visibleProperty: derived( level.modeProperty, feedbackState => feedbackState === 'incorrect' )
    } );
    this.checkMark = new Text( '✓', {
      font: new PhetFont( 42 ),
      fill: '#059e05',
      visibleProperty: derived( level.modeProperty, feedbackState => feedbackState === 'correct' )
    } );
    this.addChild( this.wrongMark );
    this.addChild( this.checkMark );

    const buttonContentAlignGroup = new AlignGroup();

    // Buttons row: Check / Next
    const FONT_SIZE = 18;
    const checkText = buttonContentAlignGroup.createBox( new Text( 'Check', { fontSize: FONT_SIZE } ) );
    this.tryAgainText = new Text( 'Try Again', {
      fill: 'red',
      fontSize: FONT_SIZE,
      visibleProperty: derived( level.modeProperty, feedbackState => feedbackState === 'incorrect' )
    } );

    this.resetChallengeButton = new ResetButton( {
      baseColor: 'white',
      listener: () => {
        level.resetChallenge();
        numberButtonGrid.buttonStates.forEach( buttonState => {buttonState.value = false;} );
      },
      enabledProperty: derived( level.modeProperty, mode => mode !== 'correct' ),
      tandem: tandem.createTandem( 'resetChallengeButton' )
    } );

    const checkButton = new RectangularPushButton( {
      content: checkText,
      tandem: tandem.createTandem( 'checkButton' ),
      right: layoutBounds.right - 100,
      top: layoutBounds.top + 100,
      listener: () => {
        const guess = numberButtonGrid.getSelectedNumber();
        affirm( guess !== null, 'There should be a selected number when Check is pressed' );
        level.checkAnswer( guess );
      },
      visibleProperty: derived( level.modeProperty, feedbackState => feedbackState === 'idle' || feedbackState === 'incorrect' )
    } );

    // Keep selection so the user sees their choice; grid disables wrong guesses via guessedNumbers
    level.modeProperty.lazyLink( mode => {
      if ( mode === 'correct' ) {

        const value = level.selectedGuessProperty.value;
        affirm( value !== null );

        // Disable all further number input until next
        numberButtonGrid.showCorrectAnswer( value );
      }
    } );

    const nextButton = new RectangularPushButton( {
      content: buttonContentAlignGroup.createBox( new Text( 'Next', { fontSize: FONT_SIZE } ) ),
      tandem: tandem.createTandem( 'nextButton' ),
      right: layoutBounds.right - 100,
      top: layoutBounds.top + 100,
      visibleProperty: derived( level.modeProperty, feedbackState => feedbackState === 'correct' ),
      listener: () => {
        level.nextChallenge();

        // Reset grid visuals for the new challenge
        numberButtonGrid.resetAll();

        numberButtonGrid.buttons[ 0 ].focus();
      }
    } );

    this.addChild( checkButton );
    this.addChild( nextButton );
    this.addChild( this.tryAgainText );
    this.addChild( this.resetChallengeButton );

    nextButton.visibleProperty.lazyLink( visible => {
      if ( visible ) {
        nextButton.focus();
      }
    } );

    // Enable Check only when a selectable number is down and feedback is not already correct
    const checkEnabledProperty = derived( numberButtonGrid.anySelectedProperty, numberButtonGrid.selectedIsEnabledProperty, level.modeProperty,
      ( anySelected, selectedEnabled, state ) => anySelected && selectedEnabled && state !== 'correct' );
    checkEnabledProperty.link( enabled => { checkButton.enabled = enabled; } );

    // When the user changes selection after a wrong attempt, clear feedback back to idle so stroke returns to dotted grey
    level.selectedGuessProperty.link( () => {
      if ( level.modeProperty.value === 'incorrect' ) {
        level.clearFeedback();
      }
    } );

    this.pdomOrder = [
      numberButtonGrid,
      checkButton,
      nextButton,
      this.statusBar
    ];

    // Match up the button colors to match up with the unknown in the representation
    level.challengeProperty.link( challenge => {
      const color = challenge.missing === 'a' ? level.countingObjectsDelegate.leftAddendColorProperty.value :
                    challenge.missing === 'b' ? level.countingObjectsDelegate.rightAddendColorProperty.value :
                    level.countingObjectsDelegate.totalColorProperty.value;

      numberButtonGrid.setButtonColor( color );
    } );
  }
}

numberPairs.register( 'LevelNode', LevelNode );
