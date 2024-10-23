// Copyright 2024, University of Colorado Boulder

/**
 * The CountingObjectControl adds and removes counting objects from the provided addend array.
 * This also increases or decreases the total amount of counting objects in the counting area
 * affecting the totalNumberProperty accordingly.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Circle, HBox, HBoxOptions, Image, Node, VBox } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import ArrowButton from '../../../../sun/js/buttons/ArrowButton.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import CountingObject from '../../common/model/CountingObject.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import cubePinkHexagon_svg from '../../../images/cubePinkHexagon_svg.js';
import NumberSquare from '../../common/view/NumberSquare.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import cubeBlueCircle_svg from '../../../images/cubeBlueCircle_svg.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { CountingRepresentationType } from '../../common/model/NumberPairsModel.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import Property from '../../../../axon/js/Property.js';

type SelfOptions = {
  addendNumberProperty?: Property<number> | null;
};
type AddendObjectControlOptions = WithRequired<HBoxOptions, 'tandem'> & SelfOptions;

const MAX_ICON_DIMENSION = 35;
const LEFT_ADDEND_ICONS = {
  cube: new Image( cubePinkHexagon_svg, { maxHeight: MAX_ICON_DIMENSION, maxWidth: MAX_ICON_DIMENSION } ),
  kitten: new Circle( 10, { fill: NumberPairsColors.attributeLeftAddendColorProperty } ), // TODO: replace with kitten image
  numberSquare: new NumberSquare( MAX_ICON_DIMENSION, new NumberProperty( 1 ), {
    fill: NumberPairsColors.numberLineLeftAddendColorProperty
  } )
};
const RIGHT_ADDEND_ICONS = {
  cube: new Image( cubeBlueCircle_svg, { maxHeight: MAX_ICON_DIMENSION } ),
  kitten: new Circle( 10, { fill: NumberPairsColors.attributeRightAddendColorProperty } ), // TODO: replace with kitten image
  numberSquare: new NumberSquare( MAX_ICON_DIMENSION, new NumberProperty( 1 ), {
    fill: NumberPairsColors.numberLineRightAddendColorProperty
  } )
};

const ARROW_HEIGHT = 12;
export default class CountingObjectControl extends HBox {

  public constructor(
    totalNumberProperty: Property<number>,
    addendCountingObjects: ObservableArray<CountingObject>,
    inactiveCountingObjects: ObservableArray<CountingObject>,
    countingRepresentationTypeProperty: TReadOnlyProperty<CountingRepresentationType>,
    providedOptions: AddendObjectControlOptions
  ) {

    const options = optionize<AddendObjectControlOptions, SelfOptions, HBoxOptions>()( {
      addendNumberProperty: null
    }, providedOptions );

    const incrementEnabledProperty = new DerivedProperty( [ inactiveCountingObjects.lengthProperty ],
      ( inactiveCountingObjectsLength: number ) => inactiveCountingObjectsLength > 0 );
    const incrementButton = new ArrowButton( 'up', () => {

      // Set the totalNumberProperty value first so that we don't force the rightAddendNumberProperty
      // into a negative value when moving up from 0.
      totalNumberProperty.value += 1;
      options.addendNumberProperty && options.addendNumberProperty.set( options.addendNumberProperty.value + 1 );
    }, {
      arrowHeight: ARROW_HEIGHT,
      arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2,
      xMargin: 4,
      yMargin: 4,
      enabledProperty: incrementEnabledProperty,
      tandem: options.tandem.createTandem( 'incrementButton' )
    } );

    const decrementEnabledProperty = new DerivedProperty( [ addendCountingObjects.lengthProperty ],
      ( addendCountingObjectsLength: number ) => addendCountingObjectsLength > 0 );
    const decrementButton = new ArrowButton( 'down', () => {
      options.addendNumberProperty && options.addendNumberProperty.set( options.addendNumberProperty.value - 1 );
      totalNumberProperty.value -= 1;
    }, {
      arrowHeight: ARROW_HEIGHT,
      arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2,
      xMargin: 4,
      yMargin: 4,
      enabledProperty: decrementEnabledProperty,
      tandem: options.tandem.createTandem( 'decrementButton' )
    } );

    const buttonsVBox = new VBox( {
      children: [ incrementButton, decrementButton ],
      spacing: 5
    } );

    const images = options.addendNumberProperty ? LEFT_ADDEND_ICONS : RIGHT_ADDEND_ICONS;
    countingRepresentationTypeProperty.link( countingRepresentationType => {
      images.cube.visible = countingRepresentationType === CountingRepresentationType.CUBES;
      images.kitten.visible = countingRepresentationType === CountingRepresentationType.KITTENS;
      images.numberSquare.visible = countingRepresentationType === CountingRepresentationType.NUMBER_LINE;
    } );
    const objectImageNode = new Node( {
      children: [
        images.cube,
        images.kitten,
        images.numberSquare
      ],
      excludeInvisibleChildrenFromBounds: true, // This allows the HBox parent to properly align the icons along the Y axis.
      layoutOptions: {
        minContentWidth: MAX_ICON_DIMENSION + 2
      }
    } );

    const superOptions = combineOptions<HBoxOptions>( {
      children: [ buttonsVBox, objectImageNode ],
      spacing: 5,
      align: 'center',
      justify: 'center'
    }, options );
    super( superOptions );
  }
}

numberPairs.register( 'CountingObjectControl', CountingObjectControl );