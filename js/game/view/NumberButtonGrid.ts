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
import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import BooleanRectangularStickyToggleButton from '../../../../sun/js/buttons/BooleanRectangularStickyToggleButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberPairs from '../../numberPairs.js';
import InputRange from '../model/InputRange.js';

const BUTTON_SIZE = new Dimension2( 40, 40 );
const X_SPACING = 8;
const Y_SPACING = 8;
const FONT = new PhetFont( 24 );

export default class NumberButtonGrid extends Node {
  public readonly anySelectedProperty: BooleanProperty;
  public readonly selectedIsEnabledProperty: BooleanProperty;

  private readonly buttonStates: BooleanProperty[];
  public readonly buttons: BooleanRectangularStickyToggleButton[];
  private readonly buttonValues: number[];

  public constructor( selectedNumberProperty: Property<number | null>, range: InputRange, guessedNumbers: ObservableArray<number>, tandem: Tandem, providedOptions?: NodeOptions ) {
    super();

    const alignGroup = new AlignGroup();
    this.buttonStates = [];
    this.buttons = [];
    this.buttonValues = [];
    this.anySelectedProperty = new BooleanProperty( false );
    this.selectedIsEnabledProperty = new BooleanProperty( false );
    const updateSelectionState = () => {

      // true if any button is pressed in
      const anySelected = this.buttonStates.some( p => p.value );
      this.anySelectedProperty.value = anySelected;

      // currently selected number (or null)
      const selectedIndex = this.buttonStates.findIndex( state => state.value );
      selectedNumberProperty.value = selectedIndex >= 0 ? this.buttonValues[ selectedIndex ] : null;
      this.selectedIsEnabledProperty.value = selectedIndex >= 0 ? this.buttons[ selectedIndex ].enabledProperty.value : false;
    };

    // Helper to create a fixed-size button for a given number, placed at a given grid position.
    const createButton = ( value: number, columnIndex: number, rowIndex: number ) => {

      const label = new Text( value, { font: FONT } );
      const labelBox = new AlignBox( label, {
        group: alignGroup,
        xAlign: 'center',
        yAlign: 'center'
      } );

      const stateProperty = new BooleanProperty( false );
      this.buttonStates.push( stateProperty );
      this.buttonValues.push( value );

      const button = new BooleanRectangularStickyToggleButton( stateProperty, {
        accessibleName: value.toString(),
        tandem: tandem.createTandem( `number${value}Button` ),
        content: labelBox,
        size: BUTTON_SIZE,
        baseColor: '#f7d9a5'
      } );

      this.buttons.push( button );

      button.left = columnIndex * ( BUTTON_SIZE.width + X_SPACING );
      button.top = rowIndex * ( BUTTON_SIZE.height + Y_SPACING );

      // When this button is pressed in (true), pop out all other buttons
      stateProperty.lazyLink( isDown => {
        if ( isDown ) {
          this.buttonStates.forEach( p => {
            if ( p !== stateProperty ) {
              p.value = false;
            }
          } );
        }
        updateSelectionState();
      } );

      return button;
    };

    // Two vertical columns with low numbers at the bottom.
    // Left column 0..10, bottom-to-top (rowIndex 10..0).
    for ( let n = 0; n <= 10; n++ ) {
      const rowIndex = 10 - n; // 0->10 (bottom) ... 10->0 (top)
      this.addChild( createButton( n, 0, rowIndex ) );
    }
    // Right column 11..20 aligned with 1..10, so 11 is beside 1 and 0 has no neighbor.
    if ( range === 'zeroToTwenty' ) {
      for ( let n = 11; n <= 20; n++ ) {
        const rowIndex = 20 - n; // 11->9 ... 20->0 (no rowIndex 10 in right column)
        this.addChild( createButton( n, 1, rowIndex ) );
      }
    }

    // React to guessed numbers from the model by disabling those buttons
    const applyGuessedNumbers = () => {
      for ( let i = 0; i < this.buttonValues.length; i++ ) {
        const value = this.buttonValues[ i ];
        const shouldEnable = !guessedNumbers.includes( value );
        this.buttons[ i ].enabledProperty.value = shouldEnable;
      }
      // Update aggregate selection state (including enabled state)
      const anySelected = this.buttonStates.some( p => p.value );
      this.anySelectedProperty.value = anySelected;
      const selectedIndex = this.buttonStates.findIndex( state => state.value );
      selectedNumberProperty.value = selectedIndex >= 0 ? this.buttonValues[ selectedIndex ] : null;
      this.selectedIsEnabledProperty.value = selectedIndex >= 0 ? this.buttons[ selectedIndex ].enabledProperty.value : false;
    };
    // Initial and reactive updates when guessed numbers change
    applyGuessedNumbers();
    guessedNumbers.elementAddedEmitter.addListener( applyGuessedNumbers );
    guessedNumbers.elementRemovedEmitter.addListener( applyGuessedNumbers );
    guessedNumbers.lengthProperty.link( applyGuessedNumbers );

    this.mutate( providedOptions );
  }

  public setButtonColor( color: TColor ): void {
    this.buttons.forEach( button => {
      button.baseColor = color;
    } );
  }

  /**
   * Gets the currently selected number, or null if none selected.
   */
  public getSelectedNumber(): number | null {
    const selectedIndex = this.buttonStates.findIndex( state => state.value );
    return selectedIndex >= 0 ? this.buttonValues[ selectedIndex ] : null;
  }

  /**
   * Disables all number buttons (used after solving a challenge).
   */
  public showCorrectAnswer( answer: number ): void {
    this.buttons.forEach( button => {
      button.enabledProperty.value = false;
    } );

    const answerIndex = this.buttonValues.indexOf( answer );
    if ( answerIndex >= 0 ) {
      const button = this.buttons[ answerIndex ];
      button.enabledProperty.value = true;
      button.pickable = false;

      // unpress the button
      this.buttonStates[ answerIndex ].value = false;
    }
  }

  /**
   * Resets all buttons to their initial state (enabled and unselected).
   */
  public resetAll(): void {
    this.buttonStates.forEach( state => {
      state.value = false;
    } );
    this.buttons.forEach( button => {
      button.enabledProperty.value = true;
      button.pickable = true;
    } );
  }
}

numberPairs.register( 'NumberButtonGrid', NumberButtonGrid );
