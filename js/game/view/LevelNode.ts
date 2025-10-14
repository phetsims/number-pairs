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
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import CountingAreaNode from '../../common/view/CountingAreaNode.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import GameModelConstants from '../model/GameModelConstants.js';
import Level from '../model/Level.js';
import NumberButtonGrid from './NumberButtonGrid.js';
import StatusBar from './StatusBar.js';

type SelfOptions = {
  countingAreaBackgroundColorProperty: TReadOnlyProperty<TColor>;
};
export type LevelNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default abstract class LevelNode extends Node {
  protected readonly statusBar: StatusBar;
  protected readonly wrongMark: Text;
  protected readonly checkMark: Text;
  protected readonly tryAgainText: Text;
  protected readonly challengeResetButton: ResetButton;
  protected readonly numberButtonGrid: NumberButtonGrid;
  protected readonly countingAreaNode: CountingAreaNode;
  protected readonly addendsVisibleProperty: TReadOnlyProperty<boolean>;

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
      level.modeProperty,
      level.selectedGuessProperty,
      level.range,
      level.guessedNumbers,
      buttonColorProperty,
      level.challengeProperty,
      tandem.createTandem( 'numberButtonGrid' ), {
        right: layoutBounds.right - NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
        bottom: layoutBounds.bottom - NumberPairsConstants.SCREEN_VIEW_Y_MARGIN
      } );
    this.addChild( this.numberButtonGrid );

    // Create Counting Area. This acts as the background for the kittens and number line.
    const leftAddendsVisibleProperty = new BooleanProperty( true );
    const rightAddendsVisibleProperty = new BooleanProperty( true );
    this.addendsVisibleProperty = DerivedProperty.and( [ leftAddendsVisibleProperty, rightAddendsVisibleProperty ] );

    // TODO: Counting area should be wider for number line levels https://github.com/phetsims/number-pairs/issues/232
    this.countingAreaNode = new CountingAreaNode( leftAddendsVisibleProperty, rightAddendsVisibleProperty, level.countingObjectsDelegate, {
      countingRepresentationTypeProperty: level.representationTypeProperty,
      backgroundColorProperty: options.countingAreaBackgroundColorProperty,
      tandem: tandem.createTandem( 'countingAreaNode' ),
      countingAreaBounds: GameModelConstants.GAME_COUNTING_AREA_BOUNDS
    } );
    this.addChild( this.countingAreaNode );

    // When a challenge is reset, or when we move to the next challenge, clear the number grid selection
    level.challengeResetEmitter.addListener( () => this.numberButtonGrid.resetAll() );
    level.challengeProperty.link( () => this.numberButtonGrid.resetAll() );

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
    this.addChild( this.wrongMark );
    this.addChild( this.checkMark );


    // Buttons row: Check / Next
    const FONT_SIZE = 26;

    const bondBarCenterY = ( layoutBounds.top + this.statusBar.height + GameModelConstants.GAME_COUNTING_AREA_BOUNDS.top ) / 2;

    // TODO: i18n https://github.com/phetsims/number-pairs/issues/232
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
      right: GameModelConstants.GAME_COUNTING_AREA_BOUNDS.right - NumberPairsConstants.COUNTING_AREA_INNER_MARGIN,
      bottom: GameModelConstants.GAME_COUNTING_AREA_BOUNDS.bottom - NumberPairsConstants.COUNTING_AREA_INNER_MARGIN,
      enabledProperty: derived( level.modeProperty, mode => mode !== 'correct' ),
      tandem: tandem.createTandem( 'challengeResetButton' )
    } );

    const checkButton = new RectangularPushButton( {
      content: new Text( 'Check', { fontSize: FONT_SIZE } ),
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

    const nextButton = new RectangularPushButton( {
      content: new Text( 'Next', { fontSize: FONT_SIZE } ),
      tandem: tandem.createTandem( 'nextButton' ),
      visibleProperty: derived( level.modeProperty, feedbackState => feedbackState === 'correct' ),
      listener: () => {
        level.nextChallenge();
      }
    } );

    const buttonContentAlignBox = new AlignBox( new Node( { children: [ checkButton, nextButton ] } ), {
      right: GameModelConstants.GAME_COUNTING_AREA_BOUNDS.right - NumberPairsConstants.COUNTING_AREA_INNER_MARGIN,
      centerY: bondBarCenterY
    } );

    this.addChild( buttonContentAlignBox );
    this.addChild( this.tryAgainText );
    this.addChild( this.challengeResetButton );

    nextButton.visibleProperty.lazyLink( visible => {
      if ( visible ) {
        nextButton.focus();
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
      checkButton,
      nextButton,
      this.statusBar
    ];

  }
}

numberPairs.register( 'LevelNode', LevelNode );
