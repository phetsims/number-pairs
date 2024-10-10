// Copyright 2024, University of Colorado Boulder

/**
 * KittenNode displays a kitten who's color and coat pattern changes depending on the addend it is associated with.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { AlignBox, Circle, Node, NodeOptions, RichDragListener } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import Panel from '../../../../sun/js/Panel.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import NumberPairsColors from '../NumberPairsColors.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Property from '../../../../axon/js/Property.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Emitter from '../../../../axon/js/Emitter.js';

type KittenNodeOptions = WithRequired<NodeOptions, 'tandem'>;

const PANEL_WIDTH = 100;
const PANEL_HEIGHT = 140;

export default class KittenNode extends Node {

  public constructor( model: CountingObject, dragBounds: Bounds2, newKittenFocusedEmitter: Emitter, providedOptions: KittenNodeOptions ) {
    const isLeftAddendProxyProperty = new BooleanProperty( model.addendTypeProperty.value === AddendType.LEFT, {} );

    const leftIcon = new Circle( 8, {
      fill: NumberPairsColors.attributeLeftAddendColorProperty
    } );
    const rightIcon = new Circle( 8, {
      fill: NumberPairsColors.attributeRightAddendColorProperty
    } );

    // When a kitten is focused the panel with a switch is visible
    const panelBounds = new Bounds2( 0, 0, PANEL_WIDTH, PANEL_HEIGHT );
    const panelAlignBox = new AlignBox( new ABSwitch( isLeftAddendProxyProperty, true, leftIcon, false, rightIcon, {
      toggleSwitchOptions: {
        size: new Dimension2( 40, 20 )
      },
      tandem: providedOptions.tandem.createTandem( 'kittenAttributeSwitch' )
    } ), {
      alignBounds: panelBounds,
      yAlign: 'top',
      xAlign: 'center'
    } );
    const focusPanel = new Panel( panelAlignBox, {
      visibleProperty: model.focusedProperty
    } );

    const leftAddendKittenImage = new Circle( 25, {
      fill: NumberPairsColors.attributeLeftAddendColorProperty,
      center: focusPanel.center,
      visibleProperty: DerivedProperty.valueEqualsConstant( model.addendTypeProperty, AddendType.LEFT )
    } );
    const rightAddendKittenImage = new Circle( 25, {
      fill: NumberPairsColors.attributeRightAddendColorProperty,
      center: focusPanel.center,
      visibleProperty: DerivedProperty.valueEqualsConstant( model.addendTypeProperty, AddendType.RIGHT )
    } );

    // Make sure that the initial position is within the drag bounds
    const dilatedDragBounds = dragBounds.dilatedXY( -PANEL_WIDTH / 2, -PANEL_HEIGHT / 2 );
    model.positionProperty.value = dotRandom.nextPointInBounds( dilatedDragBounds );

    const superOptions = combineOptions<NodeOptions>( {
      children: [ focusPanel, leftAddendKittenImage, rightAddendKittenImage ]
    }, providedOptions );
    super( superOptions );
    focusPanel.center = this.center;

    const dragListener = new RichDragListener( {
      dragListenerOptions: {
        positionProperty: model.positionProperty,
        start: () => {
          newKittenFocusedEmitter.emit();
          model.focusedProperty.value = true;
          this.moveToFront();
        },
        dragBoundsProperty: new Property( dilatedDragBounds, {} ),
        tandem: providedOptions.tandem.createTandem( 'dragListener' )

      },
      keyboardDragListenerOptions: {
        tandem: providedOptions.tandem.createTandem( 'keyboardDragListener' )
      }
    } );

    this.addInputListener( dragListener );
    newKittenFocusedEmitter.addListener( () => {
      model.focusedProperty.value = false;
    } );

    model.positionProperty.link( position => {
      this.center = this.parentToGlobalPoint( position );
    } );
  }
}

numberPairs.register( 'KittenNode', KittenNode );