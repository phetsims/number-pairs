// Copyright 2025, University of Colorado Boulder

/**
 * LevelSelectionNode is the user interface for selecting a level in the 'Game' screen.
 * This is an initial scaffold following patterns in other sims; functionality will be expanded.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GameInfoButton from '../../../../vegas/js/buttons/GameInfoButton.js';
import GameInfoDialog from '../../../../vegas/js/GameInfoDialog.js';
import LevelSelectionButtonGroup, { LevelSelectionButtonGroupItem } from '../../../../vegas/js/LevelSelectionButtonGroup.js';
import LevelSelectionScreenNode from '../../../../vegas/js/LevelSelectionScreenNode.js';
import ScoreDisplayNumberAndStar from '../../../../vegas/js/ScoreDisplayNumberAndStar.js';
import VegasFluent from '../../../../vegas/js/VegasFluent.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import NumberPairsQueryParameters from '../../common/NumberPairsQueryParameters.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import GameModel from '../model/GameModel.js';
import LevelIcons from './LevelIcons.js';

const TITLE_FONT = new PhetFont( 36 );
const TITLE_MARGIN = 90; // empirically determined

// Buttons in 2 rows of 4 using LevelSelectionButtonGroup.
const BUTTON_WIDTH = 150;
const BUTTON_HEIGHT = 150;
const BUTTON_LINE_WIDTH = 1;
const X_SPACING = 24;
const Y_SPACING = 24;
const BUTTONS_PER_ROW = 4;

export default class LevelSelectionNode extends LevelSelectionScreenNode {

  public constructor( model: GameModel, layoutBounds: Bounds2, tandem: Tandem ) {

    const titleText = new Text( VegasFluent.chooseYourLevelStringProperty, {
      font: TITLE_FONT,
      maxWidth: 0.8 * layoutBounds.width
    } );

    const infoDialog = new GameInfoDialog( model.levels.map( level => new PatternStringProperty( NumberPairsFluent.gameScreen.infoDialog.levelWithDescriptionStringProperty, {
        level: level.levelNumber,
        description: level.description
      } )
    ), {
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

    const items: LevelSelectionButtonGroupItem[] = [];
    const NUMBER_OF_LEVELS = model.getLevelCount();

    const textAlignGroup = new AlignGroup();
    const iconAlignGroup = new AlignGroup();

    for ( let levelNumber = 1; levelNumber <= NUMBER_OF_LEVELS; levelNumber++ ) {

      // Use the actual score property for this level from the model
      const level = model.getLevel( levelNumber );
      const levelPatternStringProperty = new PatternStringProperty( NumberPairsFluent.levelPatternStringProperty, {
        level: levelNumber
      } );
      items.push( {
        icon: new VBox( {
          spacing: 5,
          children: [
            textAlignGroup.createBox( new Text( levelPatternStringProperty, {
              maxWidth: BUTTON_WIDTH - 10,
              font: new PhetFont( { size: 17, weight: 'bold' } )
            } ) ),
            iconAlignGroup.createBox( LevelIcons.getIcon( levelNumber ) )
          ]
        } ),
        scoreProperty: level.scoreProperty,
        buttonListener: () => {
          model.setLevel( levelNumber );
        },
        options: {
          accessibleHelpText: level.description,

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
      phetioVisiblePropertyInstrumented: false
    } );

    const levelSelectionAlignBox = new AlignBox( new VBox( {
      children: [ titleText, buttonGroup ],
      minContentHeight: titleText.height,
      spacing: TITLE_MARGIN
    } ), {
      alignBounds: layoutBounds,
      yAlign: 'top',
      yMargin: TITLE_MARGIN
    } );

    super( NumberPairsFluent.screen.gameStringProperty, buttonGroup, {
      isDisposable: false,
      children: [ levelSelectionAlignBox, infoButton ],
      tandem: tandem,
      phetioDocumentation: 'UI for choosing a game level.',
      phetioVisiblePropertyInstrumented: false
    } );

    // This is what clients might do in their LevelsScreenView.
    this.accessibleLevelsSectionNode.pdomOrder = [
      buttonGroup,
      infoButton
    ];

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
      },
      right: layoutBounds.maxX - NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      bottom: layoutBounds.maxY - NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    this.addChild( resetAllButton );

    this.accessibleOptionsSectionNode.pdomOrder = [
      resetAllButton
    ];

    ManualConstraint.create( this, [ titleText, infoButton ], ( titleTextProxy, infoButtonProxy ) => {
      infoButtonProxy.leftCenter = titleTextProxy.rightCenter.plusXY( 40, 0 );
    } );
  }
}

numberPairs.register( 'LevelSelectionNode', LevelSelectionNode );