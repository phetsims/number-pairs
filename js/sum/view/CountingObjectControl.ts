// Copyright 2024-2025, University of Colorado Boulder

/**
 * The CountingObjectControl adds and removes counting objects from the provided addend array.
 * This also increases or decreases the total amount of counting objects in the counting area
 * affecting the totalNumberProperty accordingly.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HighlightFromNode, Image, InteractiveHighlightingNode, InteractiveHighlightingNodeOptions, KeyboardListener, Node, Rectangle, TColor, Text, VBox } from '../../../../scenery/js/imports.js';
import ArrowButton from '../../../../sun/js/buttons/ArrowButton.js';
import beadBlue_svg from '../../../images/beadBlue_svg.js';
import beadPink_svg from '../../../images/beadPink_svg.js';
import kittenBlue_svg from '../../../images/kittenBlue_svg.js';
import kittenYellow_svg from '../../../images/kittenYellow_svg.js';
import CountingObject from '../../common/model/CountingObject.js';
import RepresentationType from '../../common/model/RepresentationType.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import numberPairs from '../../numberPairs.js';

type SelfOptions = {
  addendNumberProperty?: Property<number> | null;
};
type AddendObjectControlOptions = WithRequired<InteractiveHighlightingNodeOptions, 'tandem'> & SelfOptions;

const MAX_ICON_HEIGHT = 38; // Empirically determined
const MAX_ICON_WIDTH = 28; // Empirically determined

const createNumberLineIcon = ( fill: TColor ) => {
  const icon = new Rectangle( 0, 0, MAX_ICON_WIDTH, MAX_ICON_HEIGHT, {
    fill: fill,
    cornerRadius: 5
  } );
  const numberOne = new Text( '1', {
    font: new PhetFont( 24 ),
    center: icon.center
  } );
  icon.addChild( numberOne );
  return icon;
};
const LEFT_ADDEND_ICONS = {
  bead: new Image( beadPink_svg, { maxHeight: MAX_ICON_HEIGHT, maxWidth: MAX_ICON_WIDTH } ),
  kitten: new Image( kittenYellow_svg, { maxHeight: MAX_ICON_HEIGHT, maxWidth: MAX_ICON_WIDTH } ),
  numberSquare: createNumberLineIcon( NumberPairsColors.numberLineLeftAddendColorProperty )
};
const RIGHT_ADDEND_ICONS = {
  bead: new Image( beadBlue_svg, { maxHeight: MAX_ICON_HEIGHT, maxWidth: MAX_ICON_WIDTH } ),
  kitten: new Image( kittenBlue_svg, { maxHeight: MAX_ICON_HEIGHT, maxWidth: MAX_ICON_WIDTH } ),
  numberSquare: createNumberLineIcon( NumberPairsColors.numberLineRightAddendColorProperty )
};

const ARROW_HEIGHT = 12;
export default class CountingObjectControl extends InteractiveHighlightingNode {

  public constructor(
    totalNumberProperty: Property<number>,
    addendCountingObjects: ObservableArray<CountingObject>,
    inactiveCountingObjects: ObservableArray<CountingObject>,
    countingRepresentationTypeProperty: TReadOnlyProperty<RepresentationType>,
    providedOptions: AddendObjectControlOptions
  ) {

    const options = optionize<AddendObjectControlOptions, SelfOptions, InteractiveHighlightingNodeOptions>()( {
      addendNumberProperty: null,
      focusable: true,
      tagName: 'input',
      inputType: 'range'
    }, providedOptions );

    const incrementEnabledProperty = new DerivedProperty( [ inactiveCountingObjects.lengthProperty ],
      ( inactiveCountingObjectsLength: number ) => inactiveCountingObjectsLength > 0 );
    const handleIncrement = () => {
      // Set the totalNumberProperty value first so that we don't force the rightAddendNumberProperty
      // into a negative value when moving up from 0.
      totalNumberProperty.value += 1;
      options.addendNumberProperty && options.addendNumberProperty.set( options.addendNumberProperty.value + 1 );
    };
    const incrementButton = new ArrowButton( 'up', handleIncrement, {
      arrowHeight: ARROW_HEIGHT,
      arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2,
      xMargin: 4,
      yMargin: 4,
      enabledProperty: incrementEnabledProperty,
      focusable: true,
      tandem: options.tandem.createTandem( 'incrementButton' )
    } );

    const decrementEnabledProperty = new DerivedProperty( [ addendCountingObjects.lengthProperty ],
      ( addendCountingObjectsLength: number ) => addendCountingObjectsLength > 0 );
    const handleDecrement = () => {
      options.addendNumberProperty && options.addendNumberProperty.set( options.addendNumberProperty.value - 1 );
      totalNumberProperty.value -= 1;
    };
    const decrementButton = new ArrowButton( 'down', handleDecrement, {
      arrowHeight: ARROW_HEIGHT,
      arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2,
      xMargin: 4,
      yMargin: 4,
      enabledProperty: decrementEnabledProperty,
      focusable: true,
      tandem: options.tandem.createTandem( 'decrementButton' )
    } );

    const images = options.addendNumberProperty ? LEFT_ADDEND_ICONS : RIGHT_ADDEND_ICONS;
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

    const keyboardInputListener = new KeyboardListener( {
      keys: [ 'arrowUp', 'arrowDown', 'arrowRight', 'arrowLeft', 'home', 'end' ],
      fire: ( event, keysPressed ) => {
        if ( keysPressed.includes( 'arrowUp' ) || keysPressed.includes( 'arrowRight' ) ) {
          handleIncrement();
        }
        else if ( keysPressed.includes( 'arrowDown' ) || keysPressed.includes( 'arrowLeft' ) ) {
          handleDecrement();
        }
        else if ( keysPressed.includes( 'home' ) ) {
          //TODO: add the max amount of objects.
        }
        else if ( keysPressed.includes( 'end' ) ) {
          //TODO: subtract the max amount of objects.
        }
      }
    } );
    this.addInputListener( keyboardInputListener );

    this.setInteractiveHighlight( new HighlightFromNode( this ) );
  }
}

numberPairs.register( 'CountingObjectControl', CountingObjectControl );