// Copyright 2025, University of Colorado Boulder

/**
 * CountingAreaLevelNode is a LevelNode that includes a counting area.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberPairsPreferences from '../../common/model/NumberPairsPreferences.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import ClickToDeselectKittensPressListener from '../../common/view/ClickToDeselectKittensPressListener.js';
import CountingAreaNode from '../../common/view/CountingAreaNode.js';
import KittensLayerNode from '../../common/view/KittensLayerNode.js';
import TenFrameButton from '../../common/view/TenFrameButton.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';
import LevelNode, { LevelNodeOptions } from './LevelNode.js';

export default abstract class CountingAreaLevelNode extends LevelNode {
  protected readonly countingAreaNode: CountingAreaNode;
  protected readonly kittensLayerNode: KittensLayerNode;
  protected readonly tenFrameButton: TenFrameButton;
  protected readonly preferencesNode: Rectangle;

  protected constructor( model: GameModel,
                         level: Level,
                         layoutBounds: Bounds2,
                         visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                         returnToSelection: () => void,
                         tandem: Tandem,
                         providedOptions?: LevelNodeOptions ) {

    super( model, level, layoutBounds, visibleBoundsProperty, returnToSelection, tandem, providedOptions );

    const leftAddendsVisibleProperty = new BooleanProperty( true );
    const rightAddendsVisibleProperty = new BooleanProperty( true );
    const addendsVisibleProperty = DerivedProperty.and( [ leftAddendsVisibleProperty, rightAddendsVisibleProperty ] );

    // TODO: layout, see https://github.com/phetsims/number-pairs/issues/231
    const countingAreaBounds = level.countingObjectsDelegate.countingAreaBounds;

    this.countingAreaNode = new CountingAreaNode( leftAddendsVisibleProperty, rightAddendsVisibleProperty, level.countingObjectsDelegate, {
      countingRepresentationTypeProperty: level.representationTypeProperty,
      backgroundColorProperty: NumberPairsColors.attributeSumColorProperty,
      tandem: tandem.createTandem( 'countingAreaNode' ),
      countingAreaBounds: countingAreaBounds
    } );

    this.kittensLayerNode = new KittensLayerNode( level.countingObjectsDelegate.countingObjects, this.countingAreaNode, {
      tandem: tandem.createTandem( 'kittensLayerNode' ),
      includeKittenAttributeSwitch: false,
      visibleProperty: addendsVisibleProperty
    } );

    this.tenFrameButton = new TenFrameButton( {
      tandem: tandem.createTandem( 'tenFrameButton' ),
      right: this.countingAreaNode.left,
      top: this.countingAreaNode.top,
      listener: () => {
        this.interruptSubtreeInput();
        level.deselectAllKittens();
        level.organizeIntoTenFrame();
      },
      accessibleName: 'Ten frame' // TODO i18n https://github.com/phetsims/number-pairs/issues/217
    } );

    this.addChild( this.countingAreaNode );
    this.addChild( this.kittensLayerNode );
    this.addChild( this.tenFrameButton );

    // When dropped, animate underlying kittens out of the way so they don't overlap the dropped kitten.
    level.countingObjectsDelegate.countingObjects.forEach( countingObject => {
      countingObject.isDraggingProperty.lazyLink( isDragging => {
        if ( !isDragging && !level.countingObjectsDelegate.countingObjectsAnimation ) {
          this.countingAreaNode.dropCountingObject( countingObject, 'attribute' );
        }
      } );
    } );

    // If the user clicks outside the kittens, then remove focus from all the counting objects.
    this.addInputListener( new ClickToDeselectKittensPressListener( this.kittensLayerNode, tandem.createTandem( 'kittensLayerNodePressListener' ) ) );

    // Layout must be done through ManualConstraint. However, we also require a way to trigger the manual constraint
    // when the preferences change, hence this fakeNode.
    this.preferencesNode = new Rectangle( 0, 0, 1, 1, {
      opacity: 0,
      pickable: false
    } );
    this.addChild( this.preferencesNode );

    NumberPairsPreferences.numberModelTypeProperty.link( numberModelType => {
      this.preferencesNode.rectWidth++;
    } );
  }
}

numberPairs.register( 'CountingAreaLevelNode', CountingAreaLevelNode );
