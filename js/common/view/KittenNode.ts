// Copyright 2024-2025, University of Colorado Boulder

/**
 * KittenNode displays a kitten who's color and coat pattern changes depending on the addend it is associated with.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import SoundRichDragListener from '../../../../scenery-phet/js/SoundRichDragListener.js';
import InteractiveHighlightingNode from '../../../../scenery/js/accessibility/voicing/nodes/InteractiveHighlightingNode.js';
import Hotkey from '../../../../scenery/js/input/Hotkey.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node, { NodeOptions, NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Panel from '../../../../sun/js/Panel.js';
import kittenBlue_svg from '../../../images/kittenBlue_svg.js';
import kittenYellow_svg from '../../../images/kittenYellow_svg.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import { PositionPropertyType } from '../model/NumberPairsModel.js';
import NumberPairsColors from '../NumberPairsColors.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import Multilink from '../../../../axon/js/Multilink.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import ToggleSwitch from '../../../../sun/js/ToggleSwitch.js';
import AddendEyeToggleButton from './AddendEyeToggleButton.js';

type SelfOptions = {
  onEndDrag: ( countingObject: CountingObject, positionPropertyType: PositionPropertyType ) => void;
  switchFocusToLastKitten: () => void;
  switchFocusToFirstKitten: () => void;
};

type KittenNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'> &
  StrictOmit<NodeOptions, 'children' | keyof NodeTranslationOptions>;

const KITTEN_PANEL_WIDTH = NumberPairsConstants.KITTEN_PANEL_WIDTH;
const KITTEN_PANEL_HEIGHT = NumberPairsConstants.KITTEN_PANEL_HEIGHT;
const KITTEN_PANEL_MARGIN = NumberPairsConstants.KITTEN_PANEL_MARGIN;
const KITTEN_OFFSET = 3; // The kitten tail makes it look off center when it's really not.
export default class KittenNode extends InteractiveHighlightingNode {
  private readonly focusPanel: Node;

  // Erode by slightly more than half of the widest and tallest dimensions so that there is a little buffer between
  // the dragged object and the counting area boundary. We also want to make sure that the kitten cannot be dragged
  // below the boundary that would cause interference with the eye toggle button.
  public static readonly DRAG_BOUNDS = NumberPairsConstants.COUNTING_AREA_BOUNDS.withOffsets(
    -KITTEN_PANEL_WIDTH / 2 - KITTEN_PANEL_MARGIN,
    -KITTEN_PANEL_HEIGHT / 2 - KITTEN_PANEL_MARGIN,
    -KITTEN_PANEL_WIDTH / 2 - KITTEN_PANEL_MARGIN,
    -KITTEN_PANEL_HEIGHT / 2 - KITTEN_PANEL_MARGIN - AddendEyeToggleButton.HEIGHT
  );

  public constructor(
    public readonly countingObject: CountingObject,
    newKittenSelectedEmitter: Emitter<[ CountingObject ]>,
    hasAttributeBeenSwitchedProperty: Property<boolean>,
    providedOptions: KittenNodeOptions
  ) {

    const options = optionize<KittenNodeOptions, SelfOptions, NodeOptions>()( {
      tagName: 'div',
      focusable: true
    }, providedOptions );

    // The kittenAttributeSwitch must receive a mutable boolean Property to toggle between two options. Here we create
    // a Property that allows us to toggle between the left and right addend while also still respecting the
    // INACTIVE options that addendTypeProperty supports.
    const isLeftAddendProperty = new BooleanProperty( countingObject.addendTypeProperty.value === AddendType.LEFT, {} );
    isLeftAddendProperty.lazyLink( isLeftAddend => {
      hasAttributeBeenSwitchedProperty.value = true;

      // Only update the addendTypeProperty if it is not inactive. We should not be changing the state of an
      // inactive counting object.
      if ( countingObject.addendTypeProperty.value !== AddendType.INACTIVE ) {
        countingObject.addendTypeProperty.value = isLeftAddend ? AddendType.LEFT : AddendType.RIGHT;
      }
    } );
    countingObject.addendTypeProperty.link( addendType => {
      isLeftAddendProperty.value = addendType === AddendType.LEFT;
    } );

    const kittenAttributeSwitch = new ToggleSwitch( isLeftAddendProperty, true, false, {
      size: new Dimension2( 28, 14 ),
      focusable: false,
      tandem: options.tandem.createTandem( 'kittenAttributeSwitch' ),
      thumbFill: new DerivedProperty( [
          countingObject.addendTypeProperty,
          NumberPairsColors.attributeLeftAddendColorProperty,
          NumberPairsColors.attributeRightAddendColorProperty
        ],
        ( addendType, attributeLeftAddendColor, attributeRightAddendColor ) =>
          addendType === AddendType.LEFT ? attributeLeftAddendColor : attributeRightAddendColor
      )
    } );

    // When a countingObject is focused the panel with a switch is visible
    const panelBounds = new Bounds2( 0, 0, KITTEN_PANEL_WIDTH, KITTEN_PANEL_HEIGHT );
    const panelBoundsProperty = new Property( panelBounds );
    const panelAlignBox = new AlignBox( kittenAttributeSwitch, {
      alignBoundsProperty: panelBoundsProperty,
      yAlign: 'top',
      xAlign: 'center'
    } );
    const focusPanel = new Panel( panelAlignBox, {
      visibleProperty: countingObject.kittenSelectedProperty,
      focusable: false,
      fill: NumberPairsColors.kittenPanelBackgroundColorProperty,
      stroke: null
    } );

    const leftAddendKittenImage = new Image( kittenYellow_svg, {
      maxWidth: KITTEN_PANEL_WIDTH - KITTEN_PANEL_MARGIN * 2,
      visibleProperty: DerivedProperty.valueEqualsConstant( countingObject.addendTypeProperty, AddendType.LEFT )
    } );
    const rightAddendKittenImage = new Image( kittenBlue_svg, {
      maxWidth: KITTEN_PANEL_WIDTH - KITTEN_PANEL_MARGIN * 2,
      visibleProperty: DerivedProperty.valueEqualsConstant( countingObject.addendTypeProperty, AddendType.RIGHT )
    } );

    options.children = [ focusPanel, leftAddendKittenImage, rightAddendKittenImage ];
    options.focusHighlight = Shape.bounds( focusPanel.bounds );
    super( options );

    this.focusPanel = focusPanel;
    this.countingObject = countingObject;

    focusPanel.center = this.center;

    // Panel bounds will change if the kittenAttributeSwitch is set to visible = false in PhET-iO. In that situation
    // we also want to update the position of the kitten images.
    Multilink.multilink( [ countingObject.kittenSelectedProperty, kittenAttributeSwitch.visibleProperty ], ( selected, visible ) => {
      if ( selected && !visible ) {
        panelBoundsProperty.value = new Bounds2( 0, 0, KITTEN_PANEL_WIDTH, KITTEN_PANEL_HEIGHT - kittenAttributeSwitch.height - KITTEN_PANEL_MARGIN );
      }
      else if ( selected ) {
        panelBoundsProperty.value = panelBounds;
      }
    } );
    ManualConstraint.create( this, [ focusPanel, leftAddendKittenImage, rightAddendKittenImage ], ( focusPanel, leftAddendKittenImage, rightAddendKittenImage ) => {
      leftAddendKittenImage.centerBottom = focusPanel.centerBottom.plusXY( KITTEN_OFFSET, -KITTEN_PANEL_MARGIN );
      rightAddendKittenImage.centerBottom = focusPanel.centerBottom.plusXY( KITTEN_OFFSET, -KITTEN_PANEL_MARGIN );
    } );

    // Create input listeners:
    const dragListener = new SoundRichDragListener( {
      positionProperty: countingObject.attributePositionProperty,
      start: () => {
        newKittenSelectedEmitter.emit( countingObject );
        countingObject.kittenSelectedProperty.value = true;
        this.moveToFront();
      },
      end: () => {
        options.onEndDrag( countingObject, 'attribute' );
      },
      dragBoundsProperty: new Property( KittenNode.DRAG_BOUNDS, {} ),
      dragListenerOptions: {
        useParentOffset: true,
        tandem: providedOptions.tandem.createTandem( 'dragListener' )

      },
      keyboardDragListenerOptions: {
        focus: () => {
          newKittenSelectedEmitter.emit( countingObject );
          countingObject.kittenSelectedProperty.value = true;
          this.moveToFront();
        },
        blur: () => { countingObject.kittenSelectedProperty.value = false; },
        dragSpeed: 200,
        tandem: providedOptions.tandem.createTandem( 'keyboardDragListener' )
      }
    } );

    const switchToLeftSoundPlayer = sharedSoundPlayers.get( 'switchToLeft' );
    const switchToRightSoundPlayer = sharedSoundPlayers.get( 'switchToRight' );
    const toggleAddendKeyboardListener = new KeyboardListener( {
      keys: [ 'space' ],
      press: () => {
        isLeftAddendProperty.toggle();
        isLeftAddendProperty.value ? switchToLeftSoundPlayer.play() : switchToRightSoundPlayer.play();
      }
    } );
    this.addInputListener( {
      hotkeys: [
        new Hotkey( {
          keyStringProperty: new Property( 'home' ),
          fire: () => {
            options.switchFocusToFirstKitten();
          }
        } ),
        new Hotkey( {
          keyStringProperty: new Property( 'end' ),
          fire: () => {
            options.switchFocusToLastKitten();
          }
        } )
      ]
    } );
    this.addInputListener( toggleAddendKeyboardListener );
    this.addInputListener( dragListener );
    newKittenSelectedEmitter.addListener( focusedKitten => {
      countingObject.kittenSelectedProperty.value = countingObject === focusedKitten;
    } );
    countingObject.attributePositionProperty.link( position => {
      this.center = position;
    } );

    // For debugging, show the kitten's id (object number) when ?dev is in the query parameters.
    if ( phet.chipper.queryParameters.dev ) {
      this.addCountingObjectID( countingObject.id );
    }
  }

  /**
   * Show the kitten's id (object number) when debugging with ?dev.
   */
  private addCountingObjectID( id: number ): void {
    this.addChild( new Text( id + '', {
      font: new PhetFont( 20 ),
      fill: 'black',
      center: this.focusPanel.center
    } ) );
  }
}

numberPairs.register( 'KittenNode', KittenNode );