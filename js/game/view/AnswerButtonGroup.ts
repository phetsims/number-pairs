// Copyright 2025, University of Colorado Boulder

/**
 * AnswerButtonGroup lays out identically sized number buttons in one or two vertical columns.
 * Left column: 0..10 (low numbers at the bottom)
 * Right column (for zeroToTwenty): 11..20, aligned so 1 and 11 are side-by-side and 0 has no neighbor.
 *
 * The content inside each button is an AlignBox sharing an AlignGroup so numbers align and reserve equal space.
 * Uses fixed button sizes so no dynamic layout is required beyond simple positioning.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import derived from '../../../../axon/js/derived.js';
import derivedTernary from '../../../../axon/js/derivedTernary.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import AccessibleInteractiveOptions from '../../../../scenery-phet/js/accessibility/AccessibleInteractiveOptions.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import { pdomFocusProperty } from '../../../../scenery/js/accessibility/pdomFocusProperty.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import GridBox, { GridBoxOptions } from '../../../../scenery/js/layout/nodes/GridBox.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import type Color from '../../../../scenery/js/util/Color.js';
import BooleanToggleNode from '../../../../sun/js/BooleanToggleNode.js';
import multiSelectionSoundPlayerFactory from '../../../../tambo/js/multiSelectionSoundPlayerFactory.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsHotkeyData from '../../common/view/NumberPairsHotkeyData.js';
import NumberRectangle from '../../common/view/NumberRectangle.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import Challenge from '../model/Challenge.js';
import { ChallengeState, ChallengeType } from '../model/Level.js';
import NumberToggleButton from './NumberToggleButton.js';

const MARK_OFFSET_X = 0;
const MARK_OFFSET_Y = -2;
const X_SPACING = 8;
const Y_SPACING = X_SPACING + MARK_OFFSET_Y * 2; // compensate for check/X mark height outside of button bounds
const FONT = new PhetFont( 24 );
const BUTTON_LINE_WIDTH = 1;

type NumberButtonElements = {
  //REVIEW Document fields
  button: NumberToggleButton;
  toggleNode: BooleanToggleNode;
  stateProperty: BooleanProperty;
  correctAnswerNode: NumberRectangle;
  value: number;
  wrongMark: Text;
  correctMark: Text;
}[];

type NumberButtonGridOptions = StrictOmit<GridBoxOptions, 'columns' | 'rows' | 'xSpacing' | 'ySpacing'> &
  PickRequired<GridBoxOptions, 'tandem'>;

export default class AnswerButtonGroup extends GridBox {

  public readonly elements: NumberButtonElements;

  public constructor(
    challengeType: ChallengeType,
    challengeStateProperty: TReadOnlyProperty<ChallengeState>,
    selectedNumberProperty: Property<number | null>,
    range: Range,
    guessedNumbers: ObservableArray<number>,
    buttonColorProperty: TReadOnlyProperty<Color>,
    challengeProperty: TReadOnlyProperty<Challenge>,
    providedOptions: NumberButtonGridOptions
  ) {
    const isCorrectProperty = challengeStateProperty.derived( mode => mode === 'correct' );
    const alignGroup = new AlignGroup();
    const elements: NumberButtonElements = [];
    const buttonPressedColorProperty = derived(
      challengeProperty,
      NumberPairsColors.answerButtonPressedLeftAddendColorProperty,
      NumberPairsColors.answerButtonPressedRightAddendColorProperty,
      NumberPairsColors.answerButtonPressedTotalColorProperty,
      ( challenge, leftPressedColor, rightPressedColor, totalPressedColor ) => {
        return challenge.missingComponent === 'a' ? leftPressedColor :
               challenge.missingComponent === 'b' ? rightPressedColor :
               totalPressedColor;
      } );

    // Helper to create a fixed-size button for a given number.
    const createElement = ( value: number ) => {

      const isCorrectAnswerProperty = derived( challengeProperty, challenge => challenge.answer === value );

      const label = new Text( value, {
        font: FONT,

        // Highlight correct answers on ?showAnswers
        fill: isCorrectAnswerProperty.derived( isCorrect => {
          return ( isCorrect && phet.chipper.queryParameters.showAnswers ) ? 'white' : 'black';
        } )
      } );
      const labelBox = new AlignBox( label, {
        group: alignGroup,
        xAlign: 'center',
        yAlign: 'center'
      } );

      const buttonTandem = providedOptions.tandem.createTandem( `number${value}Button` );

      const isPressedProperty = new BooleanProperty( false, {
        tandem: buttonTandem.createTandem( 'isPressedProperty' ),
        phetioReadOnly: true
      } );

      const isWrongProperty = derived( guessedNumbers.lengthProperty, challengeProperty, challengeStateProperty, ( _length, challenge, mode ) => {
        return mode !== 'correct' && guessedNumbers.includes( value ) && challenge.answer !== value;
      } );

      const wrongAccessibleNameProperty = NumberPairsFluent.a11y.gameScreen.answerButton.wrongAccessibleName.createProperty( {
        value: value
      } );

      const numberToggleButton = new NumberToggleButton( isPressedProperty, {
        soundPlayer: multiSelectionSoundPlayerFactory.getSelectionSoundPlayer( 20 - value ),
        accessibleName: derivedTernary( isWrongProperty, {
          true: wrongAccessibleNameProperty,
          false: `${value}`
        } ),
        tandem: buttonTandem,
        content: labelBox,
        baseColor: buttonColorProperty,
        pressedFillColorProperty: buttonPressedColorProperty,
        lineWidth: BUTTON_LINE_WIDTH,
        touchAreaYDilation: Y_SPACING / 2,
        mouseAreaYDilation: Y_SPACING / 2,

        // Update the enabled property any time the selected number, correct state, or guessed numbers change.
        enabledProperty: derived( isCorrectProperty, selectedNumberProperty, guessedNumbers.lengthProperty,
          isCorrect => {

            // when the correct answer is showing, disable all buttons
            if ( isCorrect ) {
              return false;
            }

            // disable buttons that have already been guessed
            return !guessedNumbers.includes( value );
          } ),
        phetioVisiblePropertyInstrumented: false
      } );

      const correctAnswerNode = new NumberRectangle(
        new Dimension2( numberToggleButton.width - BUTTON_LINE_WIDTH * 2, numberToggleButton.height - BUTTON_LINE_WIDTH * 2 ),
        new Property( value ), {
          stroke: 'black',
          fill: buttonColorProperty,
          lineWidth: BUTTON_LINE_WIDTH
        } );

      const toggleProperty = derived( isCorrectProperty, selectedNumberProperty, ( isCorrect, selectedNumber ) =>
        isCorrect && selectedNumber === value );
      const toggleNode = new BooleanToggleNode( toggleProperty, correctAnswerNode, numberToggleButton );

      // When the button is pressed (or unpressed) via a user interaction, tell the model about it.
      // NOTE: Do not wire up directly to the isPressedProperty, because it can be changed programmatically and would cause
      // a re-entrant loop/bug
      numberToggleButton.numberToggleButtonModel.fireCompleteEmitter.addListener( () => {
        const state = isPressedProperty.value;
        if ( state ) {
          selectedNumberProperty.value = state ? value : null;

          this.addAccessibleContextResponse( NumberPairsFluent.a11y.gameScreen.responses.answerSelected.format( {
            color: challengeProperty.value.missingComponent === 'a' ? NumberPairsFluent.a11y.leftAddendColorStringProperty.value :
                   NumberPairsFluent.a11y.rightAddendColorStringProperty.value,
            value: value,
            challengeType: challengeProperty.value.missingComponent === 'a' ? 'leftAddend' :
                           challengeProperty.value.missingComponent === 'b' ? 'rightAddend' : 'total',
            representationType: challengeProperty.value.missingComponent === 'y' ? 'sum' :
                                challengeType === 'numberLine' ? 'numberLine' : 'kittens'
          } ) );
        }
        else {
          selectedNumberProperty.value = null;
          this.addAccessibleContextResponse( NumberPairsFluent.a11y.gameScreen.responses.answerClearedStringProperty );
        }
      } );

      // When the model changes, update the button state.
      selectedNumberProperty.lazyLink( selectedNumber => {
        isPressedProperty.value = selectedNumber === value;
      } );

      // Checkmark/X feedback marks positioned by the missing slot
      const wrongMark = new Text( '✗', {
        font: new PhetFont( 20 ),
        fill: NumberPairsColors.incorrectColorProperty,
        pickable: false,
        visibleProperty: isWrongProperty
      } );
      const correctMark = new Text( '✓', {
        font: new PhetFont( 20 ),
        fill: NumberPairsColors.correctMarkColorProperty,
        pickable: false,
        visibleProperty: derived( challengeStateProperty, challengeProperty, ( mode, challenge ) => {
          return mode === 'correct' && challenge.answer === value;
        } )
      } );

      wrongMark.left = MARK_OFFSET_X;
      wrongMark.top = MARK_OFFSET_Y;
      correctMark.left = MARK_OFFSET_X;
      correctMark.top = MARK_OFFSET_Y;

      toggleNode.addChild( wrongMark );
      toggleNode.addChild( correctMark );

      const element = {
        button: numberToggleButton,
        toggleNode: toggleNode,
        correctAnswerNode: correctAnswerNode,
        stateProperty: isPressedProperty,
        value: value,
        wrongMark: wrongMark,
        correctMark: correctMark
      };
      elements.push( element );
      return element;
    };

    // Two vertical columns with low numbers at the bottom.
    // Left column 0..10, bottom-to-top.
    // Right column 11..20 aligned with 1..10, so 11 is beside 1 and 0 has no neighbor.
    const leftColumn: Node[] = [];
    const rightColumn: Node[] = [];

    // Build left column (0..10, bottom to top means reversed array)
    for ( let n = 0; n <= 10; n++ ) {
      leftColumn.unshift( createElement( n ).toggleNode );
    }

    // Build right column for zeroToTwenty range, 20..11 from top to bottom
    if ( range.max > 10 ) {
      affirm( range.max <= 20, 'Answer Button Group does not support a range with a max higher than 20' );
      for ( let n = 11; n <= range.max; n++ ) {
        rightColumn.unshift( createElement( n ).toggleNode );
      }
    }

    const challengeTypeProperty = challengeProperty.derived( challenge => challenge.missingComponent === 'a' ? 'leftAddend' :
                                                                          challenge.missingComponent === 'b' ? 'rightAddend' :
                                                                          'total' );
    const options = optionize4<NumberButtonGridOptions, EmptySelfOptions, GridBoxOptions>()( {},
      AccessibleInteractiveOptions, {
        xSpacing: X_SPACING,
        ySpacing: Y_SPACING,
        focusable: false,
        groupFocusHighlight: true,
        columns: [ leftColumn, rightColumn ],
        accessibleRoleDescription: 'button group', // do not translate
        accessibleHeading: NumberPairsFluent.a11y.gameScreen.answerButtonGroup.accessibleHeading.createProperty( {
          challengeType: challengeTypeProperty
        } ),
        accessibleHelpText: NumberPairsFluent.a11y.gameScreen.answerButtonGroup.accessibleHelpText.createProperty( {
          color: derived( challengeProperty, NumberPairsFluent.a11y.leftAddendColorStringProperty,
            NumberPairsFluent.a11y.rightAddendColorStringProperty,
            challenge => challenge.missingComponent === 'a' ?
                         NumberPairsFluent.a11y.leftAddendColorStringProperty.value :
                         NumberPairsFluent.a11y.rightAddendColorStringProperty.value ),
          levelType: challengeType === 'numberLine' ? 'numberLine' : 'kittens',
          addendOrSum: challengeProperty.derived( challenge => challenge.missingComponent === 'y' ? 'sum' : 'addend' ),
          challengeType: challengeProperty.derived( challenge => challenge.missingComponent === 'a' ?
                                                                 'leftAddend' :
                                                                 challenge.missingComponent === 'b' ?
                                                                 'rightAddend' : 'total' )
        } ),
        accessibleHelpTextBehavior: ParallelDOM.HELP_TEXT_BEFORE_CONTENT,
        phetioVisiblePropertyInstrumented: false
      }, providedOptions );
    super( options );
    this.elements = elements;
    this.pdomOrder = elements.map( element => element.button );

    // Buttons are not focusable until the user tabs into the group, then only one button is focusable at a time.
    // WASD and arrow keys can be used to move focus forward and backward (in 1-D)
    // We need to create a global listener here to avoid a focus trap when buttons become disabled.
    // https://github.com/phetsims/number-pairs/issues/256#issuecomment-3402746293
    KeyboardListener.createGlobal( this, {
      tandem: providedOptions.tandem,
      keyStringProperties: NumberPairsHotkeyData.ANSWER_BUTTON_GROUP.navigation.keyStringProperties,
      fireOnDown: false,
      fire: ( _event, keysPressed ) => {

        // find the currently focused button
        const focusedNode = pdomFocusProperty.value?.trail.lastNode();
        if ( focusedNode ) {
          const element = this.elements.find( e => e.button === focusedNode );
          if ( element ) {
            const index = this.elements.indexOf( element );
            let newIndex = index;

            if ( keysPressed === 'arrowRight' || keysPressed === 'arrowUp' || keysPressed === 'w' || keysPressed === 'd' ) {
              newIndex = index + 1;
            }
            else if ( keysPressed === 'arrowLeft' || keysPressed === 'arrowDown' || keysPressed === 's' || keysPressed === 'a' ) {
              newIndex = index - 1;
            }

            if ( newIndex < 0 ) {
              newIndex = this.elements.length - 1;
            }
            else if ( newIndex >= this.elements.length ) {
              newIndex = 0;
            }

            if ( newIndex !== index ) {
              this.elements[ newIndex ].button.focusable = true;
              this.elements[ newIndex ].button.focus();
            }
          }
        }
      }
    } );

    // When one item in the group gets focus, make all other elements in the group non-focusable
    pdomFocusProperty.link( focus => {
      if ( focus ) {
        const node = focus.trail.lastNode();
        const element = this.elements.find( e => e.button === node );
        if ( element ) {
          this.elements.forEach( e => {
            if ( e !== element ) {
              e.button.focusable = false;
            }
          } );
        }
      }
    } );
  }

  /**
   * Resets all buttons to their initial state (enabled and unselected).
   */
  public resetAll(): void {
    this.elements.forEach( element => {
      element.stateProperty.value = false;
    } );
  }
}

numberPairs.register( 'AnswerButtonGroup', AnswerButtonGroup );
