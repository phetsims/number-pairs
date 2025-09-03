// Copyright 2025, University of Colorado Boulder

/**
 * LevelSelectionNode is the user interface for selecting a level in the 'Game' screen.
 * This is an initial scaffold following patterns in other sims; functionality will be expanded.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import LevelSelectionButtonGroup, { LevelSelectionButtonGroupItem } from '../../../../vegas/js/LevelSelectionButtonGroup.js';
import ScoreDisplayNumberAndStar from '../../../../vegas/js/ScoreDisplayNumberAndStar.js';
import numberPairs from '../../numberPairs.js';
import GameModel, { Mode } from '../model/GameModel.js';

const TITLE_FONT = new PhetFont( 36 );

// Create 8 level buttons in 2 rows of 4 using LevelSelectionButtonGroup.
const NUMBER_OF_LEVELS = 8;
const BUTTON_WIDTH = 130;
const BUTTON_HEIGHT = 130;
const BUTTON_LINE_WIDTH = 2;
const X_SPACING = 24;
const Y_SPACING = 24;
const BUTTONS_PER_ROW = 4;

export default class LevelSelectionNode extends Node {

  public constructor( model: GameModel, layoutBounds: Bounds2, tandem: Tandem ) {

    // TODO: https://github.com/phetsims/number-pairs/issues/36 i18n
    const titleText = new Text( 'Choose Your Level', {
      font: TITLE_FONT,
      maxWidth: 0.8 * layoutBounds.width,
      centerY: layoutBounds.centerY - ( layoutBounds.height * 0.25 )
    } );

    // Position the title centered near the top, keeping it centered as bounds change.
    titleText.localBoundsProperty.link( () => {
      titleText.centerX = layoutBounds.centerX;
    } );

    const items: LevelSelectionButtonGroupItem[] = [];
    for ( let level = 1; level <= NUMBER_OF_LEVELS; level++ ) {
      // TODO: replace with model-provided score property per level when available, see https://github.com/phetsims/number-pairs/issues/36
      const scoreProperty = new NumberProperty( 0 );
      items.push( {
        icon: new Text( level, { font: new PhetFont( 18 ) } ),
        scoreProperty: scoreProperty,
        options: {
          // Number Play methodology: show total stars as a number + star icon
          createScoreDisplay: () => new ScoreDisplayNumberAndStar( scoreProperty ),
          soundPlayerIndex: level - 1,
          // listener can be added when model exposes level selection
          listener: () => {
            console.log( `Level ${level} button clicked` );
            model.modeProperty.value = ( 'level' + level as Mode );
          }
        }
      } );
    }

    // Compute preferred width to wrap at 4 per row
    const preferredWidth = ( BUTTONS_PER_ROW * BUTTON_WIDTH ) +
                           ( ( BUTTONS_PER_ROW - 1 ) * X_SPACING ) +
                           ( 2 * BUTTONS_PER_ROW * BUTTON_LINE_WIDTH );

    const buttonGroup = new LevelSelectionButtonGroup( items, {
      levelSelectionButtonOptions: {
        baseColor: '#d9ebff',
        lineWidth: BUTTON_LINE_WIDTH
      },
      flowBoxOptions: {
        spacing: X_SPACING,
        lineSpacing: Y_SPACING,
        preferredWidth: preferredWidth,
        wrap: true,
        justify: 'center'
      },
      groupButtonWidth: BUTTON_WIDTH,
      groupButtonHeight: BUTTON_HEIGHT,
      gameLevels: Array.from( { length: NUMBER_OF_LEVELS }, ( _, i ) => i + 1 ),
      tandem: tandem.createTandem( 'buttonGroup' ),
      phetioVisiblePropertyInstrumented: false,
      top: titleText.bottom + 30
    } );

    // Center the button group under the title.
    buttonGroup.localBoundsProperty.link( () => {
      buttonGroup.centerX = layoutBounds.centerX;
    } );

    super( {
      isDisposable: false,
      children: [ titleText, buttonGroup ],
      tandem: tandem,
      phetioDocumentation: 'UI for choosing a game level (scaffold).',
      phetioVisiblePropertyInstrumented: false
    } );
  }
}

numberPairs.register( 'LevelSelectionNode', LevelSelectionNode );