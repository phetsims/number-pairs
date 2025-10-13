// Copyright 2025, University of Colorado Boulder

/**
 * LevelSelectionNode is the user interface for selecting a level in the 'Game' screen.
 * This is an initial scaffold following patterns in other sims; functionality will be expanded.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GameInfoButton from '../../../../vegas/js/buttons/GameInfoButton.js';
import GameInfoDialog from '../../../../vegas/js/GameInfoDialog.js';
import LevelSelectionButtonGroup, { LevelSelectionButtonGroupItem } from '../../../../vegas/js/LevelSelectionButtonGroup.js';
import ScoreDisplayNumberAndStar from '../../../../vegas/js/ScoreDisplayNumberAndStar.js';
import NumberPairsQueryParameters from '../../common/NumberPairsQueryParameters.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import LevelIcons from './LevelIcons.js';

const TITLE_FONT = new PhetFont( 36 );

// Buttons in 2 rows of 4 using LevelSelectionButtonGroup.
const BUTTON_WIDTH = 150;
const BUTTON_HEIGHT = 150;
const BUTTON_LINE_WIDTH = 1;
const X_SPACING = 24;
const Y_SPACING = 24;
const BUTTONS_PER_ROW = 4;

export default class LevelSelectionNode extends Node {

  public constructor( model: GameModel, layoutBounds: Bounds2, tandem: Tandem ) {

    // TODO: https://github.com/phetsims/number-pairs/issues/217 i18n
    const titleText = new Text( 'Choose Your Level', {
      accessibleParagraph: 'Choose Your Level',
      font: TITLE_FONT,
      maxWidth: 0.8 * layoutBounds.width,
      centerY: 125
    } );

    const infoDialog = new GameInfoDialog( model.levels.map( level => `Level ${level.levelNumber}: ${level.description}` ), {
      gameLevels: NumberPairsQueryParameters.gameLevels,
      tandem: tandem.createTandem( 'infoDialog' )
    } );

    const infoButton = new GameInfoButton( {
      scale: 0.7,
      listener: () => {
        infoDialog.show();
      },
      tandem: tandem.createTandem( 'infoButton' )
    } );

    // Position the title centered near the top, keeping it centered as bounds change.
    titleText.localBoundsProperty.link( () => {
      titleText.centerX = layoutBounds.centerX;
    } );

    const items: LevelSelectionButtonGroupItem[] = [];
    const NUMBER_OF_LEVELS = model.getLevelCount();

    const textAlignGroup = new AlignGroup();
    const iconAlignGroup = new AlignGroup();

    for ( let levelNumber = 1; levelNumber <= NUMBER_OF_LEVELS; levelNumber++ ) {

      // Use the actual score property for this level from the model
      const level = model.getLevel( levelNumber );
      items.push( {
        icon: new VBox( {
          spacing: 5,
          children: [
            textAlignGroup.createBox( new Text( `Level ${levelNumber}`, {
              font: new PhetFont( {
                size: 17,
                weight: 'bold'
              } )
            } ) ),
            iconAlignGroup.createBox( LevelIcons.getIcon( levelNumber ) )
          ]
        } ),
        scoreProperty: level.scoreProperty,
        buttonListener: () => {
          model.modeProperty.value =
            levelNumber === 1 ? 'level1' :
            levelNumber === 2 ? 'level2' :
            levelNumber === 3 ? 'level3' :
            levelNumber === 4 ? 'level4' :
            levelNumber === 5 ? 'level5' :
            levelNumber === 6 ? 'level6' :
            levelNumber === 7 ? 'level7' :
            levelNumber === 8 ? 'level8' :
            ( () => { throw new Error( `Unhandled level: ${levelNumber}` ); } )(); // IIFE to throw error
        },
        options: {

          // Number Play methodology: show total stars as a number + star icon
          createScoreDisplay: scoreProperty => new ScoreDisplayNumberAndStar( scoreProperty ),
          soundPlayerIndex: levelNumber - 1,
          baseColor: level.color
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
      top: titleText.bottom + 45
    } );

    // Center the button group under the title.
    buttonGroup.localBoundsProperty.link( () => {
      buttonGroup.centerX = layoutBounds.centerX;
    } );

    super( {
      isDisposable: false,
      children: [ titleText, buttonGroup, infoButton ],
      tandem: tandem,
      phetioDocumentation: 'UI for choosing a game level.',
      phetioVisiblePropertyInstrumented: false
    } );

    ManualConstraint.create( this, [ titleText, infoButton ], ( titleTextProxy, infoButtonProxy ) => {
      infoButtonProxy.leftCenter = titleTextProxy.rightCenter.plusXY( 40, 0 );
    } );
  }
}

numberPairs.register( 'LevelSelectionNode', LevelSelectionNode );