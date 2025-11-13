// Copyright 2025, University of Colorado Boulder

/**
 * LevelNode composes the UI for a single game level: the representation area (bond/equation),
 * number selection grid, and basic Check/Next flow with lightweight feedback visuals.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

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
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CheckButton from '../../../../vegas/js/buttons/CheckButton.js';
import NextButton from '../../../../vegas/js/buttons/NextButton.js';
import ChallengeScreenNode, { ChallengeScreenNodeOptions } from '../../../../vegas/js/ChallengeScreenNode.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import CountingAreaNode from '../../common/view/CountingAreaNode.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import { SUM_LEVELS } from '../model/GameModel.js';
import GameModelConstants from '../model/GameModelConstants.js';
import Level from '../model/Level.js';
import NumberLineLevel from '../model/NumberLineLevel.js';
import AnswerButtonGroup from './AnswerButtonGroup.js';
import StatusBar from './StatusBar.js';

type SelfOptions = {
  countingAreaBackgroundColorProperty: TReadOnlyProperty<TColor>;
  countingAreaBounds?: Bounds2; // if not provided, GameModelConstants.DEFAULT_COUNTING_AREA_BOUNDS is used
};
export type LevelNodeOptions = SelfOptions & StrictOmit<ChallengeScreenNodeOptions, 'children'>;

// constants
const TEXT_OPTIONS = {
  font: new PhetFont( 26 ),
  maxWidth: 150
};

export default abstract class LevelNode extends ChallengeScreenNode {
  protected readonly statusBar: StatusBar;
  protected readonly wrongMark: Text;
  protected readonly checkMark: Text;
  protected readonly tryAgainText: Text;
  protected readonly challengeResetButton: ResetButton;
  protected readonly answerButtonGroup: AnswerButtonGroup;
  protected readonly countingAreaNode: CountingAreaNode;

  // For layout and pdom order
  protected readonly countingAreaBounds: Bounds2;
  protected readonly numberModelCenter: Vector2;
  protected readonly checkButton: RectangularPushButton;
  public readonly nextButton: RectangularPushButton;
  protected readonly visualPromptSection: Node;
  protected readonly promptSection: Node;
  protected readonly countingAreaSection: Node;

  protected constructor( getLevel: ( levelNumber: number ) => Level,
                         level: Level,
                         layoutBounds: Bounds2,
                         visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                         returnToSelection: () => void,
                         tandem: Tandem,
                         providedOptions?: LevelNodeOptions ) {

    const options = optionize<LevelNodeOptions, SelfOptions, ChallengeScreenNodeOptions>()( {
      countingAreaBounds: GameModelConstants.DEFAULT_COUNTING_AREA_BOUNDS,
      accessibleChallengePrompt: null, // TODO: This was moved to a new prompt section, is that ok? see https://github.com/phetsims/number-pairs/issues/351

      accessibleHeadingContent: NumberPairsFluent.a11y.gameScreen.level.accessibleHeading.createProperty( {
        levelType: level.type === 'numberLine' ? 'sumEquation' : level.type === 'bond' ? 'bondOrBarModel' : level.type,
        numberModelType: NumberPairsPreferences.numberModelTypeProperty.derived( numberModelType => numberModelType.id )
      } )
    }, providedOptions );
    super( options );

    this.statusBar = new StatusBar( layoutBounds, visibleBoundsProperty, level, getLevel, () => {
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
      level.type,
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
    this.countingAreaNode = new CountingAreaNode( level.addendsVisibleProperty, level.countingObjectsDelegate, {
      countingRepresentationTypeProperty: level.representationTypeProperty,
      backgroundColorProperty: options.countingAreaBackgroundColorProperty,
      tandem: tandem.createTandem( 'countingAreaNode' ),
      countingAreaBounds: this.countingAreaBounds,

      bothAddendsEyeToggleButtonAccessibleHelpText: NumberPairsFluent.a11y.gameScreen.bothAddendsEyeToggleButton.accessibleHelpTextStringProperty,
      bothAddendsEyeToggleButtonAccessibleContextResponseOff: NumberPairsFluent.a11y.gameScreen.bothAddendsEyeToggleButton.accessibleContextResponseOff.createProperty( {
        levelType: level.representationType === RepresentationType.NUMBER_LINE ? 'numberLine' : 'kittens'
      } ),
      bothAddendsEyeToggleButtonAccessibleContextResponseOn: NumberPairsFluent.a11y.gameScreen.bothAddendsEyeToggleButton.accessibleContextResponseOn.createProperty( {
        levelType: level.representationType === RepresentationType.NUMBER_LINE ? 'numberLine' : 'kittens'
      } )
    } );

    // Checkmark/X feedback marks positioned by the missing slot
    this.wrongMark = new Text( '✗', {
      font: new PhetFont( 42 ),
      fill: NumberPairsColors.incorrectColorProperty,
      visibleProperty: level.modeProperty.derived( feedbackState => feedbackState === 'incorrect' )
    } );
    this.checkMark = new Text( '✓', {
      font: new PhetFont( 54 ),
      fill: NumberPairsColors.checkMarkColorProperty,
      visibleProperty: level.modeProperty.derived( feedbackState => feedbackState === 'correct' )
    } );
    this.tryAgainText = new Text( NumberPairsFluent.tryAgainStringProperty, {
      fill: NumberPairsColors.incorrectColorProperty,
      font: TEXT_OPTIONS.font,
      maxWidth: TEXT_OPTIONS.maxWidth,
      visibleProperty: level.modeProperty.derived( feedbackState => feedbackState === 'incorrect' )
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
      touchAreaDilation: 5,
      enabledProperty: level.modeProperty.derived( mode => mode !== 'correct' ),
      tandem: tandem.createTandem( 'challengeResetButton' ),
      accessibleName: NumberPairsFluent.a11y.gameScreen.resetChallengeButton.accessibleNameStringProperty,
      accessibleHelpText: NumberPairsFluent.a11y.gameScreen.resetChallengeButton.accessibleHelpTextStringProperty,
      accessibleContextResponse: NumberPairsFluent.a11y.gameScreen.resetChallengeButton.accessibleContextResponseStringProperty
    } );
    this.addChild( this.challengeResetButton );

    // Create check answer and next challenge buttons. These are visible at different times and in the same location.
    const buttonAlignGroup = new AlignGroup();
    const touchAreaDilation = 5;
    this.checkButton = new CheckButton( {
      font: TEXT_OPTIONS.font,
      maxTextWidth: TEXT_OPTIONS.maxWidth,
      baseColor: NumberPairsColors.checkNextButtonColorProperty,
      alignGroup: buttonAlignGroup,
      touchAreaXDilation: touchAreaDilation,
      touchAreaYDilation: touchAreaDilation,
      listener: () => {
        const guess = level.selectedGuessProperty.value;
        affirm( guess !== null, 'There should be a selected number when Check is pressed' );
        const { isCorrect, firstTry } = level.checkAnswer( guess );

        const challenge = level.challengeProperty.value;
        if ( isCorrect ) {
          if ( firstTry ) {
            console.log( 'correct on first try' );
            this.addAccessibleContextResponse( NumberPairsFluent.a11y.gameScreen.responses.correctAnswerOnFirstTry.format( {
              levelType: SUM_LEVELS.includes( level.levelNumber ) ? 'sum' : 'decomposition',
              leftAddend: challenge.a,
              rightAddend: challenge.b,
              total: challenge.y,
              score: level.scoreProperty
            } ) );
          }
          else {
            this.addAccessibleContextResponse( NumberPairsFluent.a11y.gameScreen.responses.correctAnswer.format( {
              levelType: SUM_LEVELS.includes( level.levelNumber ) ? 'sum' : 'decomposition',
              leftAddend: challenge.a,
              rightAddend: challenge.b,
              total: challenge.y
            } ) );
          }
        }
        else {
          this.addAccessibleContextResponse( NumberPairsFluent.a11y.gameScreen.responses.incorrectAnswer.format( {
            levelType: SUM_LEVELS.includes( level.levelNumber ) ? 'sum' : 'decomposition',
            leftAddend: challenge.missing !== 'a' ? challenge.a : guess,
            rightAddend: challenge.missing !== 'b' ? challenge.b : guess,
            total: challenge.missing !== 'y' ? challenge.y : guess
          } ) );
        }
      },
      visibleProperty: level.modeProperty.derived( feedbackState => feedbackState === 'idle' || feedbackState === 'incorrect' ),
      enabledProperty: derived( level.modeProperty, level.guessedNumbers.lengthProperty, level.selectedGuessProperty, ( mode, numberOfGuesses, selectedGuess ) => {
        return selectedGuess !== null && !level.guessedNumbers.includes( selectedGuess ) && mode !== 'correct';
      } ),
      tandem: tandem.createTandem( 'checkButton' )
    } );

    this.nextButton = new NextButton( {
      font: TEXT_OPTIONS.font,
      maxTextWidth: TEXT_OPTIONS.maxWidth,
      baseColor: NumberPairsColors.checkNextButtonColorProperty,
      alignGroup: buttonAlignGroup,
      touchAreaXDilation: touchAreaDilation,
      touchAreaYDilation: touchAreaDilation,
      tandem: tandem.createTandem( 'nextButton' ),
      enabledPropertyOptions: {
        phetioReadOnly: true,
        phetioFeatured: false
      },
      visibleProperty: level.modeProperty.derived( feedbackState => feedbackState === 'correct' ),
      listener: () => {
        level.nextChallenge();
      }
    } );

    // when the challenge changes, focus on the number button grid so that keyboard users can easily continue
    level.challengeProperty.link( () => {
      this.handleShow();
    } );

    // When the next button appears, focus it so that keyboard users can easily continue to the next challenge
    this.nextButton.visibleProperty.lazyLink( visible => {
      if ( visible ) {
        this.nextButton.focus();
      }
    } );

    const buttonContentAlignBox = new AlignBox( new Node( { children: [ this.checkButton, this.nextButton ] } ), {
      alignBounds: new Bounds2(
        this.countingAreaBounds.centerX, layoutBounds.top + this.statusBar.height,
        layoutBounds.right - 185, this.countingAreaBounds.top ),
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

    // Listen for total even though the value is not used, due to listener order dependencies, make sure we updated when everything settled.
    // TODO: Duplicated with NumberBondAccordionBox, see https://github.com/phetsims/number-pairs/issues/351
    const leftAddendProperty = level.challengeProperty.derived( challenge => challenge.a );
    const rightAddendProperty = level.challengeProperty.derived( challenge => challenge.b );
    const totalProperty = level.challengeProperty.derived( challenge => challenge.y );
    const proportionsStringProperty = new DerivedProperty( [ leftAddendProperty, rightAddendProperty, totalProperty,
        NumberPairsFluent.a11y.controls.numberModel.largerAndSmallerStringProperty,
        NumberPairsFluent.a11y.controls.numberModel.smallerAndLargerStringProperty,
        NumberPairsFluent.a11y.controls.numberModel.equalStringProperty ],
      ( left, right, total, largerAndSmaller, smallerAndLarger, equal ) => {
        return left === right ? equal : left > right ? largerAndSmaller : smallerAndLarger;
      } );

    const promptSection = new Node( {
      tagName: 'div',
      accessibleHeading: 'Challenge Prompt', // TODO: i18n, see https://github.com/phetsims/number-pairs/issues/351
      children: [
        new Node( {
          tagName: 'div',
          accessibleParagraph: level.accessibleChallengePromptProperty
        } )
      ]
    } );
    this.addChild( promptSection );
    this.promptSection = promptSection;

    const visualPromptSection = new Node( {
      tagName: 'div',
      accessibleHeading: derived(
        NumberPairsPreferences.numberModelTypeProperty,
        NumberPairsFluent.numberBondStringProperty,
        NumberPairsFluent.barModelStringProperty, ( numberModelType, numberBondString, barModelString ) => {
          return level.type === 'decompositionEquation' || level.type === 'sumEquation' ? NumberPairsFluent.equationStringProperty.value :
                 numberModelType === NumberModelType.NUMBER_BOND_MODEL ? numberBondString : barModelString;
        } ),
      children: [
        new Node( {
          tagName: 'div',
          accessibleParagraph: NumberPairsFluent.a11y.controls.numberModel.currentNumberBondOrBarStateAccessibleParagraph.createProperty( {
            barOrBondOrEquation: NumberPairsPreferences.numberModelTypeProperty.derived( numberModelType => {
              return level.type === 'decompositionEquation' ? 'decompositionEquation' :
                     level.type === 'sumEquation' ? 'sumEquation' :
                     numberModelType.id;
            } ),
            proportions: proportionsStringProperty,
            screenType: 'other',
            totalView: 'shown', // unused

            // TODO: Listen to ? and translate it, and listen to selectedGuessProperty changes, see https://github.com/phetsims/number-pairs/issues/351
            // TODO: Does question mark get pronounced correctly?, see https://github.com/phetsims/number-pairs/issues/351
            // TODO: Hit Check to submit answer. appears in number bond but not the others, see https://github.com/phetsims/number-pairs/issues/351
            left: derived( level.challengeProperty, level.selectedGuessProperty, ( challenge, selectedGuess ) => challenge.missing === 'a' ? selectedGuess === null ? '?' : selectedGuess : challenge.a ),
            right: derived( level.challengeProperty, level.selectedGuessProperty, ( challenge, selectedGuess ) => challenge.missing === 'b' ? selectedGuess === null ? '?' : selectedGuess : challenge.b ),
            total: derived( level.challengeProperty, level.selectedGuessProperty, ( challenge, selectedGuess ) => challenge.missing === 'y' ? selectedGuess === null ? '?' : selectedGuess : challenge.y )
          } )
        } )
      ]
    } );
    this.addChild( visualPromptSection );
    this.visualPromptSection = visualPromptSection;

    const countingAreaSection = new Node( {
      tagName: 'div',
      accessibleHeading: 'Counting Area', // TODO: a11y, see https://github.com/phetsims/number-pairs/issues/351
      children: [
        new Node( {
          tagName: 'div',
          accessibleParagraph: NumberPairsFluent.a11y.gameScreen.countingArea.accessibleParagraph.createProperty( {
            leftAddend: level.countingObjectsDelegate.leftAddendProperty,
            rightAddend: level.countingObjectsDelegate.rightAddendProperty,
            type: level.representationType === RepresentationType.KITTENS ? 'kittens' : 'numberLine',
            visible: level instanceof NumberLineLevel ? derived( level.numberLineAddendsVisibleProperty, level.tickValuesVisibleProperty, ( addendsVisible, tickValuesVisible ) => {
              return !addendsVisible && !tickValuesVisible ? 'none' :
                     !addendsVisible && tickValuesVisible ? 'tickMarks' :
                     addendsVisible && !tickValuesVisible ? 'addends' :
                     'both';
            } ) : 'none',
            guess: level.selectedGuessProperty.derived( guess => guess === null ? '?' : guess ),
            total: derived( level.selectedGuessProperty, level.challengeProperty, ( guess, challenge ) => {
              return ( guess || 0 ) + ( challenge.missing === 'a' ? challenge.b : challenge.a );
            } )
          } )
        } )
      ]
    } );
    this.addChild( countingAreaSection );

    this.countingAreaSection = countingAreaSection;
  }
}

numberPairs.register( 'LevelNode', LevelNode );
