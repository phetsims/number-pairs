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
import Level from '../model/Level.js';
import CountingAreaLevelNode from './CountingAreaLevelNode.js';
import GameNumberBarModelNode from './GameNumberBarModelNode.js';
import GameNumberBondNode from './GameNumberBondNode.js';
import { LevelNodeOptions } from './LevelNode.js';

// TODO: factor out, see https://github.com/phetsims/number-pairs/issues/232
const MARGIN = 10;

export default class BondBarLevelNode extends CountingAreaLevelNode {
  public constructor( model: GameModel,
                      level: Level,
                      layoutBounds: Bounds2,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      returnToSelection: () => void,
                      tandem: Tandem,
                      providedOptions?: LevelNodeOptions ) {

    super( model, level, layoutBounds, visibleBoundsProperty, returnToSelection, tandem, providedOptions );

    // Representation nodes (pre-create and swap based on challenge type)
    const bondNode = new GameNumberBondNode( level, {
      visibleProperty: derived( NumberPairsPreferences.numberModelTypeProperty, numberModelType => {
        return ( level.type !== 'decompositionEquation' && level.type !== 'sumEquation' ) && numberModelType === NumberModelType.NUMBER_BOND_MODEL;
      } )
    } );
    const barNode = new GameNumberBarModelNode( level );
    this.addChild( bondNode );
    this.addChild( barNode );

    this.resetChallengeButton.moveToFront(); // awkward

    ManualConstraint.create( this, [
        bondNode, barNode, this.statusBar, this.wrongMark, this.checkMark, this.tryAgainText, this.resetChallengeButton,
        this.tenFrameButton, this.countingAreaNode, this.kittensLayerNode,
        barNode.leftAddendRectangle, barNode.rightAddendRectangle, barNode.totalRectangle, this.preferencesNode ],
      ( bondNodeProxy, barNodeProxy, statusBarProxy, wrongMarkProxy, checkMarkProxy, tryAgainTextProxy,
        resetButtonProxy, myTenFrameButtonProxy, countingAreaNodeProxy, myKittensLayerNodeProxy,
        barLeftAddendProxy, barRightAddendProxy, barTotalProxy, fakeNodeProxy ) => {

        bondNodeProxy.centerX = layoutBounds.centerX;
        barNodeProxy.centerX = layoutBounds.centerX;

        const top = Math.max( statusBarProxy.bottom + 5, layoutBounds.top + MARGIN );

        // Center between the top and the counting area if it exists, but don't let it get too far away from the counting area

        myTenFrameButtonProxy.left = layoutBounds.left + MARGIN;

        countingAreaNodeProxy.bottom = layoutBounds.bottom - 20;
        countingAreaNodeProxy.left = myTenFrameButtonProxy.right + 5;

        const bottom = countingAreaNodeProxy.top;
        bondNodeProxy.centerY = ( top + bottom ) / 2;

        resetButtonProxy.rightBottom = countingAreaNodeProxy.rightBottom.plusXY( -5, -5 );
        myTenFrameButtonProxy.top = countingAreaNodeProxy.top;

        myKittensLayerNodeProxy.x = countingAreaNodeProxy.x;
        myKittensLayerNodeProxy.y = countingAreaNodeProxy.y;
        barNodeProxy.center = bondNodeProxy.center;

        if ( NumberPairsPreferences.numberModelTypeProperty.value === NumberModelType.NUMBER_BOND_MODEL ) {

          wrongMarkProxy.bottom = bondNodeProxy.bottom - 10;
          checkMarkProxy.bottom = bondNodeProxy.bottom - 10;

          if ( level.challengeProperty.value.missing === 'a' ) {
            wrongMarkProxy.right = bondNodeProxy.left - 5;
            checkMarkProxy.right = bondNodeProxy.left - 5;

            tryAgainTextProxy.rightCenter = wrongMarkProxy.leftCenter.plusXY( -5, 0 );
          }
          else if ( level.challengeProperty.value.missing === 'b' ) {
            wrongMarkProxy.left = bondNodeProxy.right + 5;
            checkMarkProxy.left = bondNodeProxy.right + 5;

            tryAgainTextProxy.leftCenter = wrongMarkProxy.rightCenter.plusXY( 5, 0 );
          }
        }
        else {

          const missing = level.challengeProperty.value.missing;
          const missingRectangleProxy = missing === 'a' ? barLeftAddendProxy :
                                        missing === 'b' ? barRightAddendProxy :
                                        barTotalProxy;

          wrongMarkProxy.centerTop = missingRectangleProxy.centerBottom.plusXY( 0, 5 );
          checkMarkProxy.centerTop = missingRectangleProxy.centerBottom.plusXY( 0, 5 );

          tryAgainTextProxy.centerX = wrongMarkProxy.centerX;
          tryAgainTextProxy.top = wrongMarkProxy.bottom + 5;

        }
      } );
  }
}

numberPairs.register( 'BondBarLevelNode', BondBarLevelNode );