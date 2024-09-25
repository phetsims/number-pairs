// Copyright 2024, University of Colorado Boulder

/**
 * SumScreenView is the top-level view for the 'Sum' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import SumModel from '../model/SumModel.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberPairsScreenView, { NumberPairsScreenViewOptions } from '../../common/view/NumberPairsScreenView.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberSentenceAccordionBox from '../../common/view/NumberSentenceAccordionBox.js';
import NumberBondAccordionBox from '../../common/view/NumberBondAccordionBox.js';
import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import CountingAreaNode from '../../common/view/CountingAreaNode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CountingRepresentationRadioButtonGroup from '../../common/view/CountingRepresentationRadioButtonGroup.js';
import { CountingRepresentationType } from '../../common/model/NumberPairsModel.js';
import NumberLineNode from './NumberLineNode.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';

type SelfOptions = {
  //TODO add options that are specific to SumScreenView here
};

type SumScreenViewOptions = SelfOptions & StrictOmit<NumberPairsScreenViewOptions,
  'numberSentenceContent' | 'numberBondContent' | 'countingRepresentationContent'>
  & PickRequired<NumberPairsScreenViewOptions, 'tandem'>;
export default class SumScreenView extends NumberPairsScreenView {

  public constructor( model: SumModel, providedOptions: SumScreenViewOptions ) {

    const options = optionize<SumScreenViewOptions, SelfOptions, NumberPairsScreenViewOptions>()( {
      numberSentenceContent: new NumberSentenceAccordionBox( model, {
        tandem: providedOptions.tandem.createTandem( 'numberSentenceAccordionBox' )
      } ),
      numberBondContent: new NumberBondAccordionBox( model, {
        numberBondNodeOptions: {
          sumColorProperty: model.sumColorProperty,
          leftAddendColorProperty: model.leftAddendColorProperty,
          rightAddendColorProperty: model.rightAddendColorProperty,
          sumOnTop: false
        },
        tandem: providedOptions.tandem.createTandem( 'numberBondAccordionBox' )
      } ),
      equationContent: new EquationAccordionBox( model, {
        sumColorProperty: model.sumColorProperty,
        leftAddendColorProperty: model.leftAddendColorProperty,
        rightAddendColorProperty: model.rightAddendColorProperty,
        addendsOnRight: false,
        tandem: providedOptions.tandem.createTandem( 'equationAccordionBox' )
      } ),
      countingRepresentationContent: new CountingRepresentationRadioButtonGroup( model.countingRepresentationTypeProperty, {
        countingRepresentations: [
          CountingRepresentationType.CUBES,
          CountingRepresentationType.KITTENS,
          CountingRepresentationType.NUMBER_LINE
        ],
        tandem: providedOptions.tandem.createTandem( 'countingRepresentationRadioButtonGroup' )
      } )
    }, providedOptions );

    super( model, options );

    const backgroundColorProperty = new DerivedProperty( [ model.countingRepresentationTypeProperty ], countingRepresentationType => {
      if ( countingRepresentationType === CountingRepresentationType.CUBES || countingRepresentationType === CountingRepresentationType.NUMBER_LINE ) {
        return NumberPairsColors.numberLineBackgroundColorProperty;
      }
      else {
        return countingRepresentationType.sumColor;
      }
    } );
    const countingArea = new CountingAreaNode( this.countingAreaBounds, {
      backgroundColorProperty: backgroundColorProperty
    } );
    this.addChild( countingArea );

    const numberLineVisibleProperty = DerivedProperty.valueEqualsConstant( model.countingRepresentationTypeProperty, CountingRepresentationType.NUMBER_LINE );
    const numberLineNode = new NumberLineNode( model, countingArea.width - 30, {
      center: countingArea.center,
      visibleProperty: numberLineVisibleProperty,
      numberLineRange: NumberPairsConstants.NUMBER_LINE_TWENTY_RANGE
    } );
    this.addChild( numberLineNode );
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    //TODO
  }
}

numberPairs.register( 'SumScreenView', SumScreenView );