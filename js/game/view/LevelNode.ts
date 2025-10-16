// Copyright 2025, University of Colorado Boulder

/**
 * LevelNode composes the UI for a single game level: the representation area (bond/equation),
 * number selection grid, and basic Check/Next flow with lightweight feedback visuals.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import derived from '../../../../axon/js/derived.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ResetButton from '../../../../scenery-phet/js/buttons/ResetButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CheckButton from '../../../../vegas/js/buttons/CheckButton.js';
import NextButton from '../../../../vegas/js/buttons/NextButton.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import CountingAreaNode from '../../common/view/CountingAreaNode.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import GameModel from '../model/GameModel.js';
import GameModelConstants from '../model/GameModelConstants.js';
import Level from '../model/Level.js';
import AnswerButtonGroup from './AnswerButtonGroup.js';
import StatusBar from './StatusBar.js';

type SelfOptions = {
  countingAreaBackgroundColorProperty: TReadOnlyProperty<TColor>;
  countingAreaBounds?: Bounds2; // if not provided, GameModelConstants.DEFAULT_COUNTING_AREA_BOUNDS is used
};
export type LevelNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

// constants
const TEXT_OPTIONS = {
  font: new PhetFont( 26 ),
  maxWidth: 150
};

export default abstract class LevelNode extends Node {
  protected readonly statusBar: StatusBar;
  protected readonly wrongMark: Text;
  protected readonly checkMark: Text;
  protected readonly tryAgainText: Text;
  protected readonly challengeResetButton: ResetButton;
  protected readonly answerButtonGroup: AnswerButtonGroup;
  protected readonly countingAreaNode: CountingAreaNode;
  protected readonly addendsVisibleProperty: TReadOnlyProperty<boolean>;

  // For layout and pdom order
  protected readonly countingAreaBounds: Bounds2;
  protected readonly numberModelCenter: Vector2;
  protected readonly checkButton: RectangularPushButton;
  protected readonly nextButton: RectangularPushButton;

  protected constructor( model: GameModel,
                         level: Level,
                         layoutBounds: Bounds2,
                         visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                         returnToSelection: () => void,
                         tandem: Tandem,
                         providedOptions?: LevelNodeOptions ) {

    const options = optionize<LevelNodeOptions, SelfOptions, NodeOptions>()( {
      countingAreaBounds: GameModelConstants.DEFAULT_COUNTING_AREA_BOUNDS
    }, providedOptions );
    super( options );

    this.statusBar = new StatusBar( layoutBounds, visibleBoundsProperty, level, model, () => {
      this.interruptSubtreeInput();
      returnToSelection();
    }, tandem.createTandem( 'statusBar' ) );
    this.addChild( this.statusBar );

    this.countingAreaBounds = options.countingAreaBounds;
    this.numberModelCenter = new Vector2( this.countingAreaBounds.centerX, ( layoutBounds.top + this.statusBar.height + this.countingAreaBounds.top ) / 2 );

    // Create the number buttons for selecting answers. The color depends on which value is missing.
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

    this.answerButtonGroup = new AnswerButtonGroup(
      level.modeProperty,
      level.selectedGuessProperty,
      level.range,
      level.guessedNumbers,
      buttonColorProperty,
      level.challengeProperty, {
        right: layoutBounds.right - NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
        bottom: layoutBounds.bottom - NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
        tandem: tandem.createTandem( 'answerButtonGroup' )
      } );
    this.addChild( this.answerButtonGroup );

    // When a challenge is reset, or when we move to the next challenge, clear the number grid selection
    level.challengeResetEmitter.addListener( () => this.answerButtonGroup.resetAll() );
    level.challengeProperty.link( () => this.answerButtonGroup.resetAll() );

    // Create Counting Area. This acts as the background for the kittens and number line.
    const leftAddendsVisibleProperty = new BooleanProperty( true );
    const rightAddendsVisibleProperty = new BooleanProperty( true );
    this.addendsVisibleProperty = DerivedProperty.and( [ leftAddendsVisibleProperty, rightAddendsVisibleProperty ] );

    this.countingAreaNode = new CountingAreaNode( leftAddendsVisibleProperty, rightAddendsVisibleProperty, level.countingObjectsDelegate, {
      countingRepresentationTypeProperty: level.representationTypeProperty,
      backgroundColorProperty: options.countingAreaBackgroundColorProperty,
      tandem: tandem.createTandem( 'countingAreaNode' ),
      countingAreaBounds: this.countingAreaBounds
    } );
    this.addChild( this.countingAreaNode );

    // Checkmark/X feedback marks positioned by the missing slot
    this.wrongMark = new Text( '✗', {
      font: new PhetFont( 42 ),
      fill: NumberPairsColors.wrongMarkColorProperty,
      visibleProperty: derived( level.modeProperty, feedbackState => feedbackState === 'incorrect' )
    } );
    this.checkMark = new Text( '✓', {
      font: new PhetFont( 54 ),
      fill: NumberPairsColors.checkMarkColorProperty,
      visibleProperty: derived( level.modeProperty, feedbackState => feedbackState === 'correct' )
    } );
    this.tryAgainText = new Text( NumberPairsFluent.tryAgainStringProperty, {
      fill: NumberPairsColors.wrongMarkColorProperty,
      font: TEXT_OPTIONS.font,
      maxWidth: TEXT_OPTIONS.maxWidth,
      visibleProperty: derived( level.modeProperty, feedbackState => feedbackState === 'incorrect' )
    } );
    this.addChild( this.tryAgainText );
    this.addChild( this.wrongMark );
    this.addChild( this.checkMark );

    // Reset button for the current challenge. It does not reset the entire level or screen, only the selected guess,
    // and accompanying UI components.
    this.challengeResetButton = new ResetButton( {
      baseColor: 'white',
      listener: () => {
        level.resetChallenge();
      },
      right: this.countingAreaBounds.right - NumberPairsConstants.COUNTING_AREA_INNER_MARGIN,
      bottom: this.countingAreaBounds.bottom - NumberPairsConstants.COUNTING_AREA_INNER_MARGIN,
      enabledProperty: derived( level.modeProperty, mode => mode !== 'correct' ),
      tandem: tandem.createTandem( 'challengeResetButton' )
    } );
    this.addChild( this.challengeResetButton );

    // Create check answer and next challenge buttons. These are visible at different times and in the same location.
    this.checkButton = new CheckButton( {
      font: TEXT_OPTIONS.font,
      maxTextWidth: TEXT_OPTIONS.maxWidth,
      baseColor: NumberPairsColors.checkButtonColorProperty,
      listener: () => {
        const guess = level.selectedGuessProperty.value;
        affirm( guess !== null, 'There should be a selected number when Check is pressed' );
        level.checkAnswer( guess );
      },
      visibleProperty: derived( level.modeProperty, feedbackState => feedbackState === 'idle' || feedbackState === 'incorrect' ),
      enabledProperty: derived( level.modeProperty, level.guessedNumbers.lengthProperty, level.selectedGuessProperty, ( mode, numberOfGuesses, selectedGuess ) => {
        return selectedGuess !== null && !level.guessedNumbers.includes( selectedGuess ) && mode !== 'correct';
      } ),
      tandem: tandem.createTandem( 'checkButton' )
    } );

    this.nextButton = new NextButton( {
      font: TEXT_OPTIONS.font,
      maxTextWidth: TEXT_OPTIONS.maxWidth,
      tandem: tandem.createTandem( 'nextButton' ),
      visibleProperty: derived( level.modeProperty, feedbackState => feedbackState === 'correct' ),
      listener: () => {
        level.nextChallenge();
      }
    } );

    // when the challenge changes, focus on the number button grid so that keyboard users can easily continue
    level.challengeProperty.link( () => {
      this.answerButtonGroup.focusFirstElement();
    } );

    model.modeProperty.link( mode => {
      if ( mode === level.levelName ) {
        // TODO: https://github.com/phetsims/number-pairs/issues/228 there is a descriptive heading we will focus
      }
    } );

    // When the next button appears, focus it so that keyboard users can easily continue to the next challenge
    this.nextButton.visibleProperty.lazyLink( visible => {
      if ( visible ) {
        this.nextButton.focus();
      }
    } );

    const buttonContentAlignBox = new AlignBox( new Node( { children: [ this.checkButton, this.nextButton ] } ), {
      alignBounds: new Bounds2( this.countingAreaBounds.centerX,
        layoutBounds.top + this.statusBar.height, this.countingAreaBounds.right,
        this.countingAreaBounds.top ),
      xAlign: 'right',
      yAlign: 'center'
    } );
    this.addChild( buttonContentAlignBox );

    // When the user changes selection after a wrong attempt, clear feedback back to idle so stroke returns to dotted grey
    level.selectedGuessProperty.link( () => {
      if ( level.modeProperty.value === 'incorrect' ) {
        level.clearFeedback();
      }
    } );
  }
}

numberPairs.register( 'LevelNode', LevelNode );
