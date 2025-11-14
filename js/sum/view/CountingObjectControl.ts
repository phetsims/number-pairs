// Copyright 2024-2025, University of Colorado Boulder

/**
 * The CountingObjectControl adds and removes counting objects from the provided addend array.
 * This also increases or decreases the total amount of counting objects in the counting area
 * affecting the totalProperty accordingly.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import derived from '../../../../axon/js/derived.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import HighlightFromNode from '../../../../scenery/js/accessibility/HighlightFromNode.js';
import InteractiveHighlightingNode, { InteractiveHighlightingNodeOptions } from '../../../../scenery/js/accessibility/voicing/nodes/InteractiveHighlightingNode.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Color from '../../../../scenery/js/util/Color.js';
import ArrowButton from '../../../../sun/js/buttons/ArrowButton.js';
import nullSoundPlayer from '../../../../tambo/js/nullSoundPlayer.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import beadBlue_svg from '../../../images/beadBlue_svg.js';
import beadYellow_svg from '../../../images/beadYellow_svg.js';
import kittenBlue_svg from '../../../images/kittenBlue_svg.js';
import kittenYellow_svg from '../../../images/kittenYellow_svg.js';
import CountingObject from '../../common/model/CountingObject.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsHotkeyData from '../../common/view/NumberPairsHotkeyData.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';

type SelfOptions = {
  interruptPointers: () => void;

  // If this Property is null we are controlling the right addend which is a derived Property. This prevents
  // reentrant behavior as we interact with all the numbers throughout the different representations in the sim.
  leftAddendProperty?: Property<number> | null;
  addendVisibleProperty: TReadOnlyProperty<boolean>;
  redactedValueStringProperty?: TReadOnlyProperty<string>;

  // a11y strings
  addendStringProperty: TReadOnlyProperty<string>;
  colorStringProperty: TReadOnlyProperty<string>;
};
export type CountingObjectControlOptions = WithRequired<InteractiveHighlightingNodeOptions, 'tandem'> & SelfOptions;

const MAX_ICON_HEIGHT = 38; // Empirically determined
const MAX_ICON_WIDTH = 28; // Empirically determined

// Icon for number line, see https://github.com/phetsims/number-pairs/issues/358
const createNumberLineIcon = ( fill: TReadOnlyProperty<Color> ) => {

  const background = new Rectangle( 0, 0, MAX_ICON_WIDTH, MAX_ICON_HEIGHT, {
    fill: 'white',
    stroke: null
  } );

  const shiftVertical = 4;

  const midLine = new Line( 0, MAX_ICON_HEIGHT / 2 + shiftVertical, MAX_ICON_WIDTH, MAX_ICON_HEIGHT / 2 + shiftVertical, {
    stroke: 'black',
    lineWidth: 1
  } );

  const horizontalInset = 4;
  const tickHeight = 20;
  const leftTick = new Line( horizontalInset, MAX_ICON_HEIGHT / 2 - tickHeight / 2, horizontalInset, MAX_ICON_HEIGHT / 2 + tickHeight / 2, {
    stroke: 'black',
    lineWidth: 1
  } );

  const rightTick = new Line( MAX_ICON_WIDTH - horizontalInset, MAX_ICON_HEIGHT / 2 - tickHeight / 2, MAX_ICON_WIDTH - horizontalInset, MAX_ICON_HEIGHT / 2 + tickHeight / 2, {
    stroke: 'black',
    lineWidth: 1
  } );

  const rectTopRelative = 6;
  const fillRectAboveLine = new Rectangle( 0, MAX_ICON_HEIGHT / 2 - rectTopRelative, MAX_ICON_WIDTH, rectTopRelative + shiftVertical, {
    fill: fill,
    stroke: 'darkGray',
    lineWidth: 1
  } );
  background.addChild( fillRectAboveLine );

  background.addChild( leftTick );
  background.addChild( rightTick );
  background.addChild( midLine );

  return background;
};
const LEFT_ADDEND_ICONS = {
  bead: new Image( beadYellow_svg, { maxHeight: MAX_ICON_HEIGHT, maxWidth: MAX_ICON_WIDTH } ),
  kitten: new Image( kittenYellow_svg, { maxHeight: MAX_ICON_HEIGHT, maxWidth: MAX_ICON_WIDTH } ),
  numberSquare: createNumberLineIcon( NumberPairsColors.attributeLeftAddendColorProperty )
};
const RIGHT_ADDEND_ICONS = {
  bead: new Image( beadBlue_svg, { maxHeight: MAX_ICON_HEIGHT, maxWidth: MAX_ICON_WIDTH } ),
  kitten: new Image( kittenBlue_svg, { maxHeight: MAX_ICON_HEIGHT, maxWidth: MAX_ICON_WIDTH } ),
  numberSquare: createNumberLineIcon( NumberPairsColors.attributeRightAddendColorProperty )
};

const ARROW_HEIGHT = 12;
export default class CountingObjectControl extends InteractiveHighlightingNode {
  private readonly addendVisibleProperty: TReadOnlyProperty<boolean>;
  private readonly redactedValueStringProperty: TReadOnlyProperty<string>;

  // Store the number as a string which will be shown as aria-valuetext (if addends are shown), so that on updates
  // we have access to the current value
  private ariaValueNow = '0';

  public constructor(
    totalProperty: NumberProperty,
    addendCountingObjects: ObservableArray<CountingObject>,
    inactiveCountingObjects: ObservableArray<CountingObject>,
    countingRepresentationTypeProperty: TReadOnlyProperty<RepresentationType>,
    providedOptions: CountingObjectControlOptions
  ) {

    const representationTypeLabelProperty = derived( countingRepresentationTypeProperty,
      representationType => representationType === RepresentationType.KITTENS ? 'kittens' :
                            representationType === RepresentationType.BEADS ? 'beads' : 'other' );

    const options = optionize<CountingObjectControlOptions, SelfOptions, InteractiveHighlightingNodeOptions>()( {
      leftAddendProperty: null,
      redactedValueStringProperty: NumberPairsFluent.a11y.unknownNumberStringProperty,
      accessibleName: NumberPairsFluent.a11y.controls.countingObjectControl.accessibleName.createProperty( {
        representationType: representationTypeLabelProperty,
        color: providedOptions.colorStringProperty
      } ),
      accessibleHelpText: NumberPairsFluent.a11y.controls.countingObjectControl.accessibleHelpText.createProperty( {
        representationType: representationTypeLabelProperty,
        color: providedOptions.colorStringProperty,
        addend: providedOptions.addendStringProperty
      } ),
      focusable: true,
      tagName: 'input',
      inputType: 'range',
      pdomAttributes: [
        {
          attribute: 'min',
          value: 0
        }, {
          attribute: 'max',
          value: 20
        },
        {
          attribute: 'step',
          value: 'any'
        }
      ],
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    const arrowButtonSoundPlayer = sharedSoundPlayers.get( 'pushButton' );

    const incrementEnabledProperty = inactiveCountingObjects.lengthProperty.derived( length => length > 0 );
    const handleIncrement = () => {
      options.interruptPointers();

      if ( options.leftAddendProperty ) {

        // If we have options.leftAddendProperty, then we need to adjust totalProperty's value and range
        // at the same time, to avoid validation failure that would occur when the current value is outside the new range.
        // Set the totalProperty value first so that we don't force the rightAddendProperty into a negative value
        // when moving up from 0.
        const newAddendValue = options.leftAddendProperty.value + 1;
        totalProperty.setValueAndRange( totalProperty.value + 1, new Range( newAddendValue, totalProperty.range.max ) );
        options.leftAddendProperty.set( newAddendValue );
      }
      else {
        totalProperty.value += 1;
      }
      arrowButtonSoundPlayer.play();
    };

    const incrementContextResponseProperty = NumberPairsFluent.a11y.controls.countingObjectControl.incrementContextResponse.createProperty( {
      representationType: representationTypeLabelProperty,
      color: options.colorStringProperty,
      addend: options.addendStringProperty
    } );
    const incrementButton = new ArrowButton( 'up', handleIncrement, {
      arrowHeight: ARROW_HEIGHT,
      arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2,
      xMargin: 4,
      yMargin: 4,
      enabledProperty: incrementEnabledProperty,
      soundPlayer: nullSoundPlayer, // We play the sound manually to support this component's custom keyboard interaction
      focusable: false,
      tandem: options.tandem.createTandem( 'incrementButton' ),
      accessibleContextResponse: incrementContextResponseProperty,
      visiblePropertyOptions: {
        phetioFeatured: false
      }
    } );

    const decrementEnabledProperty = addendCountingObjects.lengthProperty.derived( length => length > 0 );
    const handleDecrement = () => {
      options.interruptPointers();
      arrowButtonSoundPlayer.play();

      if ( options.leftAddendProperty ) {

        // If we have options.leftAddendProperty, then we need to adjust totalProperty's value and range
        // at the same time, to avoid validation failure that would occur when the current value is outside the new range.
        const newAddendValue = options.leftAddendProperty.value - 1;
        options.leftAddendProperty.set( newAddendValue );
        totalProperty.setValueAndRange( totalProperty.value - 1, new Range( newAddendValue, totalProperty.range.max ) );
      }
      else {
        const newTotal = totalProperty.value - 1;

        // Workaround: Check the range before setting because fuzz testing indicates that it's possible to press the
        // decrement button before incrementEnabledProperty has changed.
        if ( totalProperty.range.contains( newTotal ) ) {
          totalProperty.value = newTotal;
        }
      }
    };

    const decrementContextResponseProperty = NumberPairsFluent.a11y.controls.countingObjectControl.decrementContextResponse.createProperty( {
      representationType: representationTypeLabelProperty,
      color: options.colorStringProperty,
      addend: options.addendStringProperty
    } );
    const decrementButton = new ArrowButton( 'down', handleDecrement, {
      arrowHeight: ARROW_HEIGHT,
      arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2,
      xMargin: 4,
      yMargin: 4,
      enabledProperty: decrementEnabledProperty,
      soundPlayer: nullSoundPlayer, // We play the sound manually to support this component's custom keyboard interaction
      focusable: false,
      tandem: options.tandem.createTandem( 'decrementButton' ),
      accessibleContextResponse: decrementContextResponseProperty,
      visiblePropertyOptions: {
        phetioFeatured: false
      }
    } );

    const images = options.leftAddendProperty ? LEFT_ADDEND_ICONS : RIGHT_ADDEND_ICONS;
    countingRepresentationTypeProperty.link( countingRepresentationType => {
      images.bead.visible = countingRepresentationType === RepresentationType.BEADS;
      images.kitten.visible = countingRepresentationType === RepresentationType.KITTENS;
      images.numberSquare.visible = countingRepresentationType === RepresentationType.NUMBER_LINE;
    } );
    const objectImageNode = new Node( {
      children: [
        images.bead,
        images.kitten,
        images.numberSquare
      ],
      excludeInvisibleChildrenFromBounds: true, // This allows the HBox parent to properly align the icons along the Y axis.
      layoutOptions: {
        minContentWidth: MAX_ICON_WIDTH + 10
      }
    } );

    const vBox = new VBox( {
      children: [ incrementButton, objectImageNode, decrementButton ],
      spacing: 5,
      align: 'center',
      justify: 'center'
    } );

    const superOptions = combineOptions<InteractiveHighlightingNodeOptions>( {
      children: [ vBox ]
    }, options );
    super( superOptions );

    this.addendVisibleProperty = options.addendVisibleProperty;
    this.redactedValueStringProperty = options.redactedValueStringProperty!;

    Multilink.multilink( [ this.addendVisibleProperty, this.redactedValueStringProperty ], () => {
      this.updateAriaValueText();
    } );

    const keyboardInputListener = new KeyboardListener( {
      keyStringProperties: NumberPairsHotkeyData.COUNTING_OBJECT_CONTROL.adjust.keyStringProperties,
      fire: ( event, keysPressed ) => {
        event?.preventDefault();
        if ( keysPressed === 'arrowUp' || keysPressed === 'arrowRight' ) {
          options.interruptPointers();
          inactiveCountingObjects.lengthProperty.value > 0 && incrementButton.pdomClick();
        }
        else if ( keysPressed === 'arrowDown' || keysPressed === 'arrowLeft' ) {
          options.interruptPointers();
          addendCountingObjects.lengthProperty.value > 0 && decrementButton.pdomClick();
        }
      }
    } );
    this.addInputListener( keyboardInputListener );

    this.setInteractiveHighlight( new HighlightFromNode( this ) );
  }

  public setAriaValues( value: string ): void {
    this.ariaValueNow = value;
    this.setInputValue( value );
    this.setPDOMAttribute( 'aria-valuenow', value );
    this.updateAriaValueText();
  }

  private updateAriaValueText(): void {
    const ariaValueText = this.addendVisibleProperty.value ? this.ariaValueNow : this.redactedValueStringProperty.value;
    this.setPDOMAttribute( 'aria-valuetext', ariaValueText );
  }
}

numberPairs.register( 'CountingObjectControl', CountingObjectControl );
