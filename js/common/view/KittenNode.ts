// Copyright 2024, University of Colorado Boulder

/**
 * KittenNode displays a kitten who's color and coat pattern changes depending on the addend it is associated with.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { AlignBox, Circle, Image, InteractiveHighlightingNode, KeyboardListener, Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import Panel from '../../../../sun/js/Panel.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import CountingObject, { AddendType, KITTEN_PANEL_HEIGHT, KITTEN_PANEL_MARGIN, KITTEN_PANEL_WIDTH } from '../model/CountingObject.js';
import NumberPairsColors from '../NumberPairsColors.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Property from '../../../../axon/js/Property.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Emitter from '../../../../axon/js/Emitter.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import kittenYellow_svg from '../../../images/kittenYellow_svg.js';
import kittenBlue_svg from '../../../images/kittenBlue_svg.js';
import SoundRichDragListener from '../../../../scenery-phet/js/SoundRichDragListener.js';
import { Shape } from '../../../../kite/js/imports.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = {
  onDrop: ( countingObject: CountingObject ) => void;
};

// TODO: Exclude translation options
type KittenNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'> & StrictOmit<NodeOptions, 'children'>;

const ICON_RADIUS = 5;
const KITTEN_OFFSET = 3; // The kitten tail makes it look off center when it's really not.
export default class KittenNode extends InteractiveHighlightingNode {
  private readonly focusPanel: Node;

  public constructor(
    model: CountingObject,
    dragBounds: Bounds2,
    newKittenFocusedEmitter: Emitter,
    providedOptions: KittenNodeOptions
  ) {

    const options = optionize<KittenNodeOptions, SelfOptions, NodeOptions>()( {
      tagName: 'div',
      focusable: true
    }, providedOptions );

    // The kittenAttributeSwitch must receive a mutable boolean Property to toggle between two options. Here we create
    // a Property that allows us to toggle between the left and right addend while also still respecting the
    // INACTIVE options that addendTypeProperty supports.
    const isLeftAddendProperty = new BooleanProperty( model.addendTypeProperty.value === AddendType.LEFT, {} );
    isLeftAddendProperty.link( isLeftAddend => {

      // Only update the addendTypeProperty if it is not inactive. We should not be changing the state of an
      // inactive counting object.
      if ( model.addendTypeProperty.value !== AddendType.INACTIVE ) {
        model.addendTypeProperty.value = isLeftAddend ? AddendType.LEFT : AddendType.RIGHT;
      }
    } );
    model.addendTypeProperty.link( addendType => {
      isLeftAddendProperty.value = addendType === AddendType.LEFT;
    } );

    const switchLeftIcon = new Circle( ICON_RADIUS, {
      fill: NumberPairsColors.attributeLeftAddendColorProperty
    } );
    const switchRightIcon = new Circle( ICON_RADIUS, {
      fill: NumberPairsColors.attributeRightAddendColorProperty
    } );
    const kittenAttributeSwitch = new ABSwitch( isLeftAddendProperty, true, switchLeftIcon, false, switchRightIcon, {
      toggleSwitchOptions: {
        size: new Dimension2( 20, 10 )
      },
      spacing: 4,
      focusable: false,
      tandem: options.tandem.createTandem( 'kittenAttributeSwitch' ),
      setLabelEnabled: _.noop // We do not want the labels to change opacity
    } );

    // When a kitten is focused the panel with a switch is visible
    const panelBounds = new Bounds2( 0, 0, KITTEN_PANEL_WIDTH, KITTEN_PANEL_HEIGHT );
    const panelAlignBox = new AlignBox( kittenAttributeSwitch, {
      alignBounds: panelBounds,
      yAlign: 'top',
      xAlign: 'center'
    } );
    const focusPanel = new Panel( panelAlignBox, {
      visibleProperty: model.focusedProperty,
      focusable: false,
      fill: NumberPairsColors.kittenPanelBackgroundColorProperty
    } );

    const leftAddendKittenImage = new Image( kittenYellow_svg, {
      centerX: focusPanel.centerX + KITTEN_OFFSET,
      bottom: focusPanel.bottom - KITTEN_PANEL_MARGIN,
      maxWidth: KITTEN_PANEL_WIDTH - KITTEN_PANEL_MARGIN * 2,
      visibleProperty: DerivedProperty.valueEqualsConstant( model.addendTypeProperty, AddendType.LEFT )
    } );
    const rightAddendKittenImage = new Image( kittenBlue_svg, {
      maxWidth: KITTEN_PANEL_WIDTH - KITTEN_PANEL_MARGIN * 2,
      bottom: focusPanel.bottom - KITTEN_PANEL_MARGIN,
      centerX: focusPanel.centerX + KITTEN_OFFSET,
      visibleProperty: DerivedProperty.valueEqualsConstant( model.addendTypeProperty, AddendType.RIGHT )
    } );

    // Dilate by slightly more than half of the widest and tallest dimensions so that there is a little buffer between
    // the dragged object and the counting area boundary.
    const dilatedDragBounds = dragBounds.dilatedXY( -KITTEN_PANEL_WIDTH / 2 - KITTEN_PANEL_MARGIN, -KITTEN_PANEL_HEIGHT / 2 - KITTEN_PANEL_MARGIN );
    model.attributePositionProperty.value = dotRandom.nextPointInBounds( dilatedDragBounds );

    // TODO: use options.children = instead, etc.
    const superOptions = combineOptions<NodeOptions>( {
      children: [ focusPanel, leftAddendKittenImage, rightAddendKittenImage ],
      focusHighlight: Shape.bounds( focusPanel.bounds )
    }, options );
    super( superOptions );
    this.focusPanel = focusPanel;
    focusPanel.center = this.center;

    const dragListener = new SoundRichDragListener( {
      positionProperty: model.attributePositionProperty,
      start: () => {
        newKittenFocusedEmitter.emit();
        model.focusedProperty.value = true;
        this.moveToFront();
      },
      end: () => {
        options.onDrop( model );
      },
      dragBoundsProperty: new Property( dilatedDragBounds, {} ),
      dragListenerOptions: {
        useParentOffset: true,
        tandem: providedOptions.tandem.createTandem( 'dragListener' )

      },
      keyboardDragListenerOptions: {
        focus: () => {
          newKittenFocusedEmitter.emit();
          model.focusedProperty.value = true;
        },
        blur: () => { model.focusedProperty.value = false; },
        dragSpeed: 200,
        tandem: providedOptions.tandem.createTandem( 'keyboardDragListener' )
      }
    } );

    const ABSwitchKeyboardListener = new KeyboardListener( {
      keys: [ 'space' ],
      press: () => {
        isLeftAddendProperty.toggle();
      }
    } );
    this.addInputListener( ABSwitchKeyboardListener );
    this.addInputListener( dragListener );
    newKittenFocusedEmitter.addListener( () => {
      model.focusedProperty.value = false;
    } );

    model.attributePositionProperty.link( position => {
      this.center = position;
    } );
    this.addDebugText( model );
  }

  public addDebugText( countingObject: CountingObject ): void {
    // Show index when debugging with ?dev
    if ( phet.chipper.queryParameters.dev ) {
      this.addChild( new Text( countingObject.id + '', {
        font: new PhetFont( 20 ),
        fill: 'black',
        center: this.focusPanel.center
      } ) );
    }
  }
}

numberPairs.register( 'KittenNode', KittenNode );