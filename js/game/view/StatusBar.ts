// Copyright 2025, University of Colorado Boulder

/**
 *  StatusBar is an InfiniteStatusBar that shows the current level and description on the left,
 *  the score on the right, and a back button.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import InfiniteStatusBar from '../../../../vegas/js/InfiniteStatusBar.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';

export default class StatusBar extends InfiniteStatusBar {
  public constructor( layoutBounds: Bounds2,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      level: Level,
                      model: GameModel,
                      backButtonListener: () => void,
                      tandem: Tandem ) {

    const levelStringProperty = new PatternStringProperty( NumberPairsFluent.levelPatternStringProperty, {
      level: level.levelNumber
    } );
    const levelLabel = new Text( levelStringProperty, { font: new PhetFont( { size: 21, weight: 'bold' } ) } );
    const descriptionText = new Text( level.description, { font: new PhetFont( 21 ) } );
    const levelDescriptionText = new HBox( {
      spacing: 12, children: [ levelLabel, descriptionText ]
    } );

    super( layoutBounds, visibleBoundsProperty, levelDescriptionText, model.getLevel( level.levelNumber ).scoreProperty, {
      barFill: level.color,
      floatToTop: true,
      spacing: 20,
      backButtonListener: backButtonListener,
      accessibleMessageStringProperty: new PatternStringProperty( NumberPairsFluent.gameScreen.infoDialog.levelWithDescriptionStringProperty, {
        level: level.levelNumber,
        description: level.description
      } ),
      tandem: tandem
    } );
  }
}

numberPairs.register( 'StatusBar', StatusBar );
