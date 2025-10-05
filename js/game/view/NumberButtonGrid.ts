// Copyright 2025, University of Colorado Boulder

/**
 * NumberButtonGrid lays out identically sized number buttons in one or two vertical columns.
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
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import BooleanToggleNode from '../../../../sun/js/BooleanToggleNode.js';
import BooleanRectangularStickyToggleButton from '../../../../sun/js/buttons/BooleanRectangularStickyToggleButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberRectangle from '../../common/view/NumberRectangle.js';
import numberPairs from '../../numberPairs.js';
import InputRange from '../model/InputRange.js';

const BUTTON_SIZE = new Dimension2( 40, 40 );
const X_SPACING = 8;
const Y_SPACING = 8;
const FONT = new PhetFont( 24 );

export default class NumberButtonGrid extends Node {

  public readonly elements: Array<{
    button: BooleanRectangularStickyToggleButton;
    toggleNode: BooleanToggleNode;
    stateProperty: BooleanProperty;
    correctAnswerNode: NumberRectangle;
    value: number;
  }> = [];

  public constructor( isCorrectProperty: TReadOnlyProperty<boolean>, selectedNumberProperty: Property<number | null>, range: InputRange, guessedNumbers: ObservableArray<number>,
                      buttonColorProperty: TReadOnlyProperty<Color>,
                      tandem: Tandem,
                      providedOptions?: NodeOptions ) {
    super();

    const alignGroup = new AlignGroup();

    // Helper to create a fixed-size button for a given number, placed at a given grid position.
    const createElement = ( value: number, columnIndex: number, rowIndex: number ) => {

      const label = new Text( value, { font: FONT } );
      const labelBox = new AlignBox( label, {
        group: alignGroup,
        xAlign: 'center',
        yAlign: 'center'
      } );

      const stateProperty = new BooleanProperty( false );

      const button = new BooleanRectangularStickyToggleButton( stateProperty, {
        accessibleName: value.toString(),
        tandem: tandem.createTandem( `number${value}Button` ),
        content: labelBox,
        size: BUTTON_SIZE,
        baseColor: buttonColorProperty,
        enabledProperty: derived( isCorrectProperty, selectedNumberProperty, guessedNumbers.lengthProperty, ( isCorrect, selectedNumber ) => {

          // when the correct answer is showing, disable all buttons
          if ( isCorrect ) {
            return false;
          }

          // disable buttons that have already been guessed
          return !guessedNumbers.includes( value );
        } )
      } );

      const correctAnswerNode = new NumberRectangle( new Dimension2( button.width, button.height ), new Property( value ), {
        stroke: 'black',
        fill: buttonColorProperty
      } );

      const toggleProperty = derived( isCorrectProperty, selectedNumberProperty, ( isCorrect, selectedNumber ) => isCorrect && selectedNumber === value );
      const toggleNode = new BooleanToggleNode( toggleProperty, correctAnswerNode, button, {
        left: columnIndex * ( BUTTON_SIZE.width + X_SPACING ),
        top: rowIndex * ( BUTTON_SIZE.height + Y_SPACING )
      } );

      // When the button is pressed, tell the model about it.
      stateProperty.lazyLink( state => {
        if ( state ) {
          selectedNumberProperty.value = state ? value : null;
        }
      } );

      // When the model changes, update the button state.
      selectedNumberProperty.lazyLink( selectedNumber => {
        stateProperty.value = selectedNumber === value;
      } );

      const element = {
        button: button,
        toggleNode: toggleNode,
        correctAnswerNode: correctAnswerNode,
        stateProperty: stateProperty,
        value: value
      };
      this.elements.push( element );

      return element;
    };

    // Two vertical columns with low numbers at the bottom.
    // Left column 0..10, bottom-to-top (rowIndex 10..0).
    for ( let n = 0; n <= 10; n++ ) {
      const rowIndex = 10 - n; // 0->10 (bottom) ... 10->0 (top)
      this.addChild( createElement( n, 0, rowIndex ).toggleNode );
    }
    // Right column 11..20 aligned with 1..10, so 11 is beside 1 and 0 has no neighbor.
    if ( range === 'zeroToTwenty' ) {
      for ( let n = 11; n <= 20; n++ ) {
        const rowIndex = 20 - n; // 11->9 ... 20->0 (no rowIndex 10 in right column)
        this.addChild( createElement( n, 1, rowIndex ).toggleNode );
      }
    }

    this.mutate( providedOptions );
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

numberPairs.register( 'NumberButtonGrid', NumberButtonGrid );
