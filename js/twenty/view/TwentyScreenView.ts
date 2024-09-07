// Copyright 2024, University of Colorado Boulder

/**
 * TwentyScreenView is the top-level view for the 'Twenty' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import numberPairs from '../../numberPairs.js';
import TwentyModel from '../model/TwentyModel.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberPairsScreenView, { NumberPairsScreenViewOptions } from '../../common/view/NumberPairsScreenView.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberSentenceAccordionBox from '../../common/view/NumberSentenceAccordionBox.js';
import NumberBondAccordionBox from '../../common/view/NumberBondAccordionBox.js';
import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import CountingAreaNode from '../../common/view/CountingAreaNode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { CountingRepresentationType } from '../../common/model/NumberPairsModel.js';

type SelfOptions = {
  //TODO add options that are specific to TwentyScreenView here
};

type TwentyScreenViewOptions = SelfOptions & StrictOmit<NumberPairsScreenViewOptions, 'numberSentenceContent' | 'numberBondContent'>
  & PickRequired<NumberPairsScreenViewOptions, 'tandem'>;

export default class TwentyScreenView extends NumberPairsScreenView {

  public constructor( model: TwentyModel, providedOptions: TwentyScreenViewOptions ) {

    const options = optionize<TwentyScreenViewOptions, SelfOptions, NumberPairsScreenViewOptions>()( {
      numberSentenceContent: new NumberSentenceAccordionBox( model, {
        tandem: providedOptions.tandem.createTandem( 'numberSentenceAccordionBox' )
      } ),
      numberBondContent: new NumberBondAccordionBox( model, {
        numberBondNodeOptions: {
          sumColorProperty: model.sumColorProperty,
          leftAddendColorProperty: model.leftAddendColorProperty,
          rightAddendColorProperty: model.rightAddendColorProperty
        },
        tandem: providedOptions.tandem.createTandem( 'numberBondAccordionBox' )
      } ),
      equationContent: new EquationAccordionBox( model, {
        sumColorProperty: model.sumColorProperty,
        leftAddendColorProperty: model.leftAddendColorProperty,
        rightAddendColorProperty: model.rightAddendColorProperty,
        tandem: providedOptions.tandem.createTandem( 'equationAccordionBox' )
      } ),
      sceneRange: NumberPairsConstants.TWENTY_SCENE_RANGE
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
      backgroundColorProperty: backgroundColorProperty,
      countingRepresentationTypeProperty: model.countingRepresentationTypeProperty
    } );
    this.addChild( countingArea );
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    //TODO
  }
}

numberPairs.register( 'TwentyScreenView', TwentyScreenView );