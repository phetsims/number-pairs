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
import NumberPairsColors from '../../common/NumberPairsColors.js';
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
  protected readonly challengeResetButton: ResetButton;
  protected readonly numberButtonGrid: NumberButtonGrid;
  protected readonly checkButton: RectangularPushButton;
  protected readonly nextButton: RectangularPushButton;

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

    const buttonColorProperty = derived(
      level.challengeProperty,
      level.countingObjectsDelegate.leftAddendColorProperty,
      level.countingObjectsDelegate.rightAddendColorProperty,
      level.countingObjectsDelegate.totalColorProperty,
      ( challenge, leftColor, rightColor, totalColor ) => {
        return challenge.missing === 'a' ? leftColor :
               challenge.missing === 'b' ? rightColor :
               totalColor;
      } );

    // Number selection grid and selection state
    this.numberButtonGrid = new NumberButtonGrid(
      derived( level.modeProperty, mode => mode === 'correct' ),
      level.selectedGuessProperty,
      level.range,
      level.guessedNumbers,
      buttonColorProperty,
      tandem.createTandem( 'numberButtonGrid' ), {
        right: layoutBounds.right - MARGIN,
        bottom: layoutBounds.bottom - MARGIN
      } );
    this.addChild( this.numberButtonGrid );

    // When a challenge is reset, or when we move to the next challenge, clear the number grid selection
    level.challengeResetEmitter.addListener( () => this.numberButtonGrid.resetAll() );
    level.challengeProperty.link( () => this.numberButtonGrid.resetAll() );

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
    const FONT_SIZE = 26;
    const checkText = buttonContentAlignGroup.createBox( new Text( 'Check', { fontSize: FONT_SIZE } ) );
    this.tryAgainText = new Text( 'Try Again', {
      fill: 'red',
      fontSize: FONT_SIZE,
      visibleProperty: derived( level.modeProperty, feedbackState => feedbackState === 'incorrect' )
    } );

    this.challengeResetButton = new ResetButton( {
      baseColor: 'white',
      listener: () => {
        level.resetChallenge();
      },
      enabledProperty: derived( level.modeProperty, mode => mode !== 'correct' ),
      tandem: tandem.createTandem( 'challengeResetButton' )
    } );

    this.checkButton = new RectangularPushButton( {
      content: checkText,
      tandem: tandem.createTandem( 'checkButton' ),
      baseColor: NumberPairsColors.checkButtonColorProperty,
      listener: () => {
        const guess = level.selectedGuessProperty.value;
        affirm( guess !== null, 'There should be a selected number when Check is pressed' );
        level.checkAnswer( guess );
      },
      visibleProperty: derived( level.modeProperty, feedbackState => feedbackState === 'idle' || feedbackState === 'incorrect' ),
      enabledProperty: derived( level.modeProperty, level.guessedNumbers.lengthProperty, level.selectedGuessProperty, ( mode, numberOfGuesses, selectedGuess ) => {
        return selectedGuess !== null && !level.guessedNumbers.includes( selectedGuess ) && mode !== 'correct';
      } )
    } );

    this.nextButton = new RectangularPushButton( {
      content: buttonContentAlignGroup.createBox( new Text( 'Next', { fontSize: FONT_SIZE } ) ),
      tandem: tandem.createTandem( 'nextButton' ),
      visibleProperty: derived( level.modeProperty, feedbackState => feedbackState === 'correct' ),
      listener: () => {
        level.nextChallenge();
      }
    } );

    this.addChild( this.checkButton );
    this.addChild( this.nextButton );
    this.addChild( this.tryAgainText );
    this.addChild( this.challengeResetButton );

    this.nextButton.visibleProperty.lazyLink( visible => {
      if ( visible ) {
        this.nextButton.focus();
      }
    } );

    // When the user changes selection after a wrong attempt, clear feedback back to idle so stroke returns to dotted grey
    level.selectedGuessProperty.link( () => {
      if ( level.modeProperty.value === 'incorrect' ) {
        level.clearFeedback();
      }
    } );

    this.pdomOrder = [
      this.numberButtonGrid,
      this.checkButton,
      this.nextButton,
      this.statusBar
    ];

  }
}

numberPairs.register( 'LevelNode', LevelNode );
