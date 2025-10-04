// Copyright 2025, University of Colorado Boulder

/**
 * CountingAreaLevelNode is a LevelNode that includes a counting area.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import derived from '../../../../axon/js/derived.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import ClickToDeselectKittensPressListener from '../../common/view/ClickToDeselectKittensPressListener.js';
import CountingAreaNode from '../../common/view/CountingAreaNode.js';
import KittensLayerNode from '../../common/view/KittensLayerNode.js';
import TenFrameButton from '../../common/view/TenFrameButton.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';
import GameNumberBarModelNode from './GameNumberBarModelNode.js';
import GameNumberBondNode from './GameNumberBondNode.js';
import GameNumberEquationNode from './GameNumberEquationNode.js';
import LevelNode, { LevelNodeOptions } from './LevelNode.js';

// TODO: factor out, see https://github.com/phetsims/number-pairs/issues/232
const MARGIN = 10;

// TODO: separate subclass for equation vs bond/bar, see https://github.com/phetsims/number-pairs/issues/232

export default class CountingAreaLevelNode extends LevelNode {
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
    const equationNode = new GameNumberEquationNode( level );

    this.addChild( bondNode );
    this.addChild( barNode );
    this.addChild( equationNode );

    const leftAddendsVisibleProperty = new BooleanProperty( true );
    const rightAddendsVisibleProperty = new BooleanProperty( true );
    const addendsVisibleProperty = DerivedProperty.and( [ leftAddendsVisibleProperty, rightAddendsVisibleProperty ] );

    // TODO: layout, see https://github.com/phetsims/number-pairs/issues/231
    const SCALE = 0.97;

    const gameCountingAreaNode = new CountingAreaNode( leftAddendsVisibleProperty, rightAddendsVisibleProperty, level.countingObjectsDelegate, {
      countingRepresentationTypeProperty: level.representationTypeProperty,
      backgroundColorProperty: NumberPairsColors.attributeSumColorProperty,
      tandem: tandem.createTandem( 'gameCountingAreaNode' ),
      scale: SCALE
    } );

    const kittensLayerNode = new KittensLayerNode( level.countingObjectsDelegate.countingObjects, gameCountingAreaNode, {
      tandem: tandem.createTandem( 'kittensLayerNode' ),
      includeKittenAttributeSwitch: false,
      visibleProperty: addendsVisibleProperty,
      scale: SCALE
    } );

    const tenFrameButton = new TenFrameButton( {
      tandem: tandem.createTandem( 'tenFrameButton' ),
      right: gameCountingAreaNode.left,
      top: gameCountingAreaNode.top,
      listener: () => {
        this.interruptSubtreeInput();
        level.deselectAllKittens();
        level.organizeIntoTenFrame();
      },
      accessibleName: 'Ten frame' // TODO i18n https://github.com/phetsims/number-pairs/issues/217
    } );

    this.addChild( gameCountingAreaNode );
    this.addChild( kittensLayerNode );
    this.addChild( tenFrameButton );

    // If the user clicks outside the kittens, then remove focus from all the counting objects.
    this.addInputListener( new ClickToDeselectKittensPressListener( kittensLayerNode, tandem.createTandem( 'kittensLayerNodePressListener' ) ) );

    // Layout must be done through ManualConstraint. However, we also require a way to trigger the manual constraint
    // when the preferences change, hence this fakeNode.
    const fakeNode = new Rectangle( 0, 0, 1, 1, {
      opacity: 0,
      pickable: false
    } );
    this.addChild( fakeNode );

    NumberPairsPreferences.numberModelTypeProperty.link( numberModelType => {
      fakeNode.rectWidth++;
    } );

    ManualConstraint.create( this, [
        bondNode, barNode, equationNode, this.statusBar, this.wrongMark, this.checkMark, this.tryAgainText, this.resetChallengeButton,
        tenFrameButton, gameCountingAreaNode, kittensLayerNode,
        equationNode.leftAddendSquare, equationNode.rightAddendSquare, equationNode.totalSquare,
        barNode.leftAddendRectangle, barNode.rightAddendRectangle, barNode.totalRectangle, fakeNode ],
      ( bondNodeProxy, barNodeProxy, equationNodeProxy, statusBarProxy, wrongMarkProxy, checkMarkProxy, tryAgainTextProxy,
        resetButtonProxy, myTenFrameButtonProxy, countingAreaNodeProxy, myKittensLayerNodeProxy,
        equationLeftProxy, equationRightProxy, equationTopProxy,
        barLeftAddendProxy, barRightAddendProxy, barTotalProxy, fakeNodeProxy ) => {

        bondNodeProxy.centerX = layoutBounds.centerX;
        barNodeProxy.centerX = layoutBounds.centerX;
        equationNodeProxy.centerX = layoutBounds.centerX;

        const top = Math.max( statusBarProxy.bottom + 5, layoutBounds.top + MARGIN );

        // Center between the top and the counting area if it exists, but don't let it get too far away from the counting area
        if ( countingAreaNodeProxy.bounds.isFinite() ) {

          myTenFrameButtonProxy.left = layoutBounds.left + MARGIN;

          countingAreaNodeProxy.bottom = layoutBounds.bottom - 20;
          countingAreaNodeProxy.left = myTenFrameButtonProxy.right + 5;

          const bottom = countingAreaNodeProxy.top;
          bondNodeProxy.centerY = ( top + bottom ) / 2;

          resetButtonProxy.rightBottom = countingAreaNodeProxy.rightBottom.plusXY( -5, -5 );
          myTenFrameButtonProxy.top = countingAreaNodeProxy.top;

          myKittensLayerNodeProxy.x = countingAreaNodeProxy.x;
          myKittensLayerNodeProxy.y = countingAreaNodeProxy.y;
        }
        else {
          bondNodeProxy.centerY = ( top + MARGIN );
        }
        equationNodeProxy.centerY = bondNodeProxy.centerY;
        barNodeProxy.center = bondNodeProxy.center;

        if ( level.type === 'bond' ) {

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
        }
        else if ( level.type === 'sumEquation' || level.type === 'decompositionEquation' ) {

          const missingSquare = equationNode.getMissingSquare();
          const proxy = missingSquare === equationNode.leftAddendSquare ? equationLeftProxy :
                        missingSquare === equationNode.rightAddendSquare ? equationRightProxy :
                        equationTopProxy;
          wrongMarkProxy.centerTop = proxy.centerBottom.plusXY( 0, 5 );
          checkMarkProxy.centerTop = proxy.centerBottom.plusXY( 0, 5 );

          tryAgainTextProxy.centerX = wrongMarkProxy.centerX;
          tryAgainTextProxy.top = wrongMarkProxy.bottom + 5;
        }
      } );

  }
}

numberPairs.register( 'CountingAreaLevelNode', CountingAreaLevelNode );