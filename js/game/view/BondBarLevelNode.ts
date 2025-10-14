// Copyright 2025, University of Colorado Boulder

/**
 * BondBarLevelNode is a LevelNode that shows a bond or bar representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import derived from '../../../../axon/js/derived.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import GameModelConstants from '../model/GameModelConstants.js';
import Level from '../model/Level.js';
import CountingAreaLevelNode from './CountingAreaLevelNode.js';
import GameNumberBarModelNode from './GameNumberBarModelNode.js';
import GameNumberBondNode from './GameNumberBondNode.js';
import { LevelNodeOptions } from './LevelNode.js';

export default class BondBarLevelNode extends CountingAreaLevelNode {
  public constructor( model: GameModel,
                      level: Level,
                      layoutBounds: Bounds2,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      returnToSelection: () => void,
                      tandem: Tandem,
                      providedOptions?: LevelNodeOptions ) {

    super( model, level, layoutBounds, visibleBoundsProperty, returnToSelection, tandem, providedOptions );
    const bondBarCenterY = ( layoutBounds.top + this.statusBar.height + GameModelConstants.GAME_COUNTING_AREA_BOUNDS.top ) / 2;

    // Representation nodes (pre-create and swap based on challenge type)
    const bondNode = new GameNumberBondNode( level, {
      centerX: GameModelConstants.GAME_COUNTING_AREA_BOUNDS.centerX,
      centerY: bondBarCenterY,
      visibleProperty: derived( NumberPairsPreferences.numberModelTypeProperty, numberModelType => {
        return ( level.type !== 'decompositionEquation' && level.type !== 'sumEquation' ) && numberModelType === NumberModelType.NUMBER_BOND_MODEL;
      } )
    } );
    const barNode = new GameNumberBarModelNode( level, {
      centerX: GameModelConstants.GAME_COUNTING_AREA_BOUNDS.centerX,
      centerY: bondBarCenterY,
      visibleProperty: derived( NumberPairsPreferences.numberModelTypeProperty, numberModelType => {
        return ( level.type !== 'decompositionEquation' && level.type !== 'sumEquation' ) && numberModelType === NumberModelType.BAR_MODEL;
      } )
    } );
    this.addChild( bondNode );
    this.addChild( barNode );

    // when the challenge changes, move the correct addend of the GameNumberBarModelNode to the front, to avoid
    // the stroke being obscured by the other addend, see https://github.com/phetsims/number-pairs/issues/227#issuecomment-3368461725
    level.challengeProperty.link( challenge => {
      if ( challenge.missing === 'a' ) {
        barNode.leftAddendRectangle.moveToFront();
      }
      else if ( challenge.missing === 'b' ) {
        barNode.rightAddendRectangle.moveToFront();
      }
      else if ( challenge.missing === 'y' ) {
        barNode.totalRectangle.moveToFront();
      }
      else {
        throw new Error( `Unknown missing value: ${challenge.missing}` );
      }
    } );


    ManualConstraint.create( this, [
        bondNode, barNode, this.statusBar, this.wrongMark, this.checkMark, this.tryAgainText, barNode.leftAddendRectangle,
        barNode.rightAddendRectangle, barNode.totalRectangle, this.preferencesNode ],
      ( bondNodeProxy, barNodeProxy, statusBarProxy, wrongMarkProxy, checkMarkProxy, tryAgainTextProxy,
        barLeftAddendProxy, barRightAddendProxy, barTotalProxy, fakeNodeProxy ) => {

        if ( NumberPairsPreferences.numberModelTypeProperty.value === NumberModelType.NUMBER_BOND_MODEL ) {

          wrongMarkProxy.bottom = bondNodeProxy.bottom - 23; // Manually tuned based on the size of the circles and the height of the text.

          if ( level.challengeProperty.value.missing === 'a' ) {
            wrongMarkProxy.right = bondNodeProxy.left - 5;
            tryAgainTextProxy.rightCenter = wrongMarkProxy.leftCenter.plusXY( -5, 0 );
          }
          else if ( level.challengeProperty.value.missing === 'b' ) {
            wrongMarkProxy.left = bondNodeProxy.right + 5;
            tryAgainTextProxy.leftCenter = wrongMarkProxy.rightCenter.plusXY( 5, 0 );
          }
        }
        else {

          const missing = level.challengeProperty.value.missing;
          const missingRectangleProxy = missing === 'a' ? barLeftAddendProxy :
                                        missing === 'b' ? barRightAddendProxy :
                                        barTotalProxy;

          wrongMarkProxy.centerTop = missingRectangleProxy.centerBottom.plusXY( 0, 0 );

          tryAgainTextProxy.left = wrongMarkProxy.right + 10;
          tryAgainTextProxy.centerY = wrongMarkProxy.centerY;
        }

        checkMarkProxy.center = wrongMarkProxy.center; // keep them aligned if one is hidden
      } );
  }
}

numberPairs.register( 'BondBarLevelNode', BondBarLevelNode );
