// Copyright 2025, University of Colorado Boulder

/**
 * NumberButtonGrid lays out identically sized number buttons in one or two rows.
 * Row 1: 0..10
 * Row 2: 11..20 (11 is under 1; 0 has nothing under it)
 *
 * The content inside each button is an AlignBox sharing an AlignGroup so numbers align and reserve equal space.
 * Uses fixed button sizes so no dynamic layout is required beyond simple positioning.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import BooleanRectangularStickyToggleButton from '../../../../sun/js/buttons/BooleanRectangularStickyToggleButton.js';
import numberPairs from '../../numberPairs.js';

export type NumberButtonGridRange = 'zeroToTen' | 'zeroToTwenty';

const BUTTON_SIZE = new Dimension2( 60, 60 );
const X_SPACING = 12;
const Y_SPACING = 12;
const FONT = new PhetFont( 24 );

export default class NumberButtonGrid extends Node {
  public readonly anySelectedProperty: BooleanProperty;
  
  private readonly buttonStates: BooleanProperty[];
  private readonly buttons: BooleanRectangularStickyToggleButton[];
  private readonly buttonValues: number[];

  public constructor( range: NumberButtonGridRange, providedOptions?: NodeOptions ) {
    super();

    const alignGroup = new AlignGroup();
    this.buttonStates = [];
    this.buttons = [];
    this.buttonValues = [];
    this.anySelectedProperty = new BooleanProperty( false );
    const updateAnySelected = () => {

      // true if any button is pressed in
      this.anySelectedProperty.value = this.buttonStates.some( p => p.value );
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
        updateAnySelected();
      } );

      return button;
    };

    // Row 1: 0..10
    for ( let n = 0; n <= 10; n++ ) {
      this.addChild( createButton( n, n, 0 ) );
    }

    // Row 2: 11..20 (11 under 1; 0 has nothing under it)
    if ( range === 'zeroToTwenty' ) {
      for ( let n = 11; n <= 20; n++ ) {
        const columnIndex = n - 10; // 11->1 ... 20->10
        this.addChild( createButton( n, columnIndex, 1 ) );
      }
    }

    this.mutate( providedOptions );
  }
  
  /**
   * Gets the currently selected number, or null if none selected.
   */
  public getSelectedNumber(): number | null {
    const selectedIndex = this.buttonStates.findIndex( state => state.value );
    return selectedIndex >= 0 ? this.buttonValues[ selectedIndex ] : null;
  }
  
  /**
   * Disables the button for the given value.
   */
  public disableButton( value: number ): void {
    const index = this.buttonValues.indexOf( value );
    if ( index >= 0 ) {
      this.buttons[ index ].enabledProperty.value = false;
    }
  }
  
  /**
   * Resets the selection state (unselects all buttons).
   */
  public resetSelection(): void {
    this.buttonStates.forEach( state => {
      state.value = false;
    } );
  }
  
  /**
   * Disables all number buttons (used after solving a challenge).
   */
  public disableAll(): void {
    this.buttons.forEach( button => {
      button.enabledProperty.value = false;
    } );
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
    } );
  }
}

numberPairs.register( 'NumberButtonGrid', NumberButtonGrid );