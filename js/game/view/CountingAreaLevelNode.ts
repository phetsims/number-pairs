// Copyright 2025, University of Colorado Boulder

/**
 * CountingAreaLevelNode is a LevelNode that includes a counting area.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberPairsPreferences from '../../common/model/NumberPairsPreferences.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import ClickToDeselectKittensPressListener from '../../common/view/ClickToDeselectKittensPressListener.js';
import KittensLayerNode from '../../common/view/KittensLayerNode.js';
import TenFrameButton from '../../common/view/TenFrameButton.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import GameModelConstants from '../model/GameModelConstants.js';
import Level from '../model/Level.js';
import LevelNode, { LevelNodeOptions } from './LevelNode.js';


type CountingAreaLevelNodeOptions = StrictOmit<LevelNodeOptions, 'countingAreaBackgroundColorProperty'>;

export default abstract class CountingAreaLevelNode extends LevelNode {
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

    const options = optionize<CountingAreaLevelNodeOptions, EmptySelfOptions, LevelNodeOptions>()( {
      countingAreaBackgroundColorProperty: NumberPairsColors.attributeSumColorProperty
    }, providedOptions );

    super( model, level, layoutBounds, visibleBoundsProperty, returnToSelection, tandem, options );

    this.kittensLayerNode = new KittensLayerNode( level.countingObjectsDelegate.countingObjects, this.countingAreaNode, {
      tandem: tandem.createTandem( 'kittensLayerNode' ),
      includeKittenAttributeSwitch: false,
      visibleProperty: this.addendsVisibleProperty
    } );

    this.tenFrameButton = new TenFrameButton( {
      tandem: tandem.createTandem( 'tenFrameButton' ),
      left: layoutBounds.left + NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      top: GameModelConstants.DEFAULT_COUNTING_AREA_BOUNDS.top,
      listener: () => {
        this.interruptSubtreeInput();
        level.deselectAllKittens();
        level.organizeIntoTenFrame();
      },
      accessibleName: 'Ten frame' // TODO i18n https://github.com/phetsims/number-pairs/issues/217
    } );

    this.addChild( this.kittensLayerNode );
    this.addChild( this.tenFrameButton );

    // If the user clicks outside the kittens, then remove focus from all the counting objects.
    this.addInputListener( new ClickToDeselectKittensPressListener( this.kittensLayerNode, tandem.createTandem( 'kittensLayerNodePressListener' ) ) );

    // Layout must be done through ManualConstraint. However, we also require a way to trigger the manual constraint
    // when the preferences change, hence this fakeNode.
    // TODO: See https://github.com/phetsims/number-pairs/issues/232
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
