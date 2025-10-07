// Copyright 2025, University of Colorado Boulder

/**
 * BondBarLevelNode is a LevelNode that shows a bond or bar representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import derived from '../../../../axon/js/derived.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';
import CountingAreaLevelNode from './CountingAreaLevelNode.js';
import { layoutCheckAndNextButtons, layoutCountingAreaBlock } from './GameLayout.js';
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

    // Representation nodes (pre-create and swap based on challenge type)
    const bondNode = new GameNumberBondNode( level, {
      visibleProperty: derived( NumberPairsPreferences.numberModelTypeProperty, numberModelType => {
        return ( level.type !== 'decompositionEquation' && level.type !== 'sumEquation' ) && numberModelType === NumberModelType.NUMBER_BOND_MODEL;
      } )
    } );
    const barNode = new GameNumberBarModelNode( level );
    this.addChild( bondNode );
    this.addChild( barNode );

    // when the challenge changes, move the correct addend of the GameNumberBarModelNode to the front, to avoid
    // the stroke being obscured by the other addend, see https://github.com/phetsims/number-pairs/issues/227#issuecomment-3368461725
    level.challengeProperty.link( challenge => {
      if ( challenge ) {
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
      }
    } );

    this.challengeResetButton.moveToFront(); // awkward

    ManualConstraint.create( this, [
        bondNode, barNode, this.statusBar, this.wrongMark, this.checkMark, this.tryAgainText, this.challengeResetButton,
        this.tenFrameButton, this.countingAreaNode, this.kittensLayerNode,
        barNode.leftAddendRectangle, barNode.rightAddendRectangle, barNode.totalRectangle, this.preferencesNode, this.checkButton, this.nextButton ],
      ( bondNodeProxy, barNodeProxy, statusBarProxy, wrongMarkProxy, checkMarkProxy, tryAgainTextProxy,
        resetButtonProxy, myTenFrameButtonProxy, countingAreaNodeProxy, myKittensLayerNodeProxy,
        barLeftAddendProxy, barRightAddendProxy, barTotalProxy, fakeNodeProxy, checkButtonProxy, nextButtonProxy ) => {

        const { middle } = layoutCountingAreaBlock(
          layoutBounds, statusBarProxy, myTenFrameButtonProxy,
          countingAreaNodeProxy, myKittensLayerNodeProxy, resetButtonProxy
        );

        layoutCheckAndNextButtons( layoutBounds, bondNodeProxy, checkButtonProxy, nextButtonProxy );

        if ( NumberPairsPreferences.numberModelTypeProperty.value === NumberModelType.NUMBER_BOND_MODEL ) {

          bondNodeProxy.center = new Vector2( layoutBounds.centerX, middle );

          wrongMarkProxy.bottom = bondNodeProxy.bottom - 10;

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

          barNodeProxy.center = new Vector2( layoutBounds.centerX, middle );

          const missing = level.challengeProperty.value.missing;
          const missingRectangleProxy = missing === 'a' ? barLeftAddendProxy :
                                        missing === 'b' ? barRightAddendProxy :
                                        barTotalProxy;

          wrongMarkProxy.centerTop = missingRectangleProxy.centerBottom.plusXY( 0, 5 );

          tryAgainTextProxy.left = wrongMarkProxy.right + 10;
          tryAgainTextProxy.centerY = wrongMarkProxy.centerY;
        }

        checkMarkProxy.center = wrongMarkProxy.center; // keep them aligned if one is hidden
      } );
  }
}

numberPairs.register( 'BondBarLevelNode', BondBarLevelNode );
