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
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Range from '../../../../dot/js/Range.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import { VBox } from '../../../../scenery/js/imports.js';
import AddendSpinnerPanel from './AddendSpinnerPanel.js';

type SelfOptions = {
  //TODO add options that are specific to SumScreenView here
};

type SumScreenViewOptions = SelfOptions & StrictOmit<NumberPairsScreenViewOptions, 'numberSentenceContent' | 'numberBondContent' | 'sliderEnabledRangeProperty'>
  & PickRequired<NumberPairsScreenViewOptions, 'tandem'>;
export default class SumScreenView extends NumberPairsScreenView {

  public constructor( model: SumModel, providedOptions: SumScreenViewOptions ) {

    const options = optionize<SumScreenViewOptions, SelfOptions, NumberPairsScreenViewOptions>()( {
      numberSentenceContent: new NumberSentenceAccordionBox( model, {
        tandem: providedOptions.tandem.createTandem( 'numberSentenceAccordionBox' )
      } ),
      numberBondContent: new NumberBondAccordionBox( model, {
        numberBondNodeOptions: {
          totalColorProperty: model.totalColorProperty,
          leftAddendColorProperty: model.leftAddendColorProperty,
          rightAddendColorProperty: model.rightAddendColorProperty,
          totalOnTop: false
        },
        tandem: providedOptions.tandem.createTandem( 'numberBondAccordionBox' )
      } ),
      equationContent: new EquationAccordionBox( model, {
        totalColorProperty: model.totalColorProperty,
        leftAddendColorProperty: model.leftAddendColorProperty,
        rightAddendColorProperty: model.rightAddendColorProperty,
        addendsOnRight: false,
        tandem: providedOptions.tandem.createTandem( 'equationAccordionBox' )
      } ),
      leftAddendProxyProperty: model.leftAddendProxyProperty,

      // While observable arrays and addend values are being updated, we do not want to create a reentrant situation by having
      // the slider's enabled range interrupt the natural progression of listeners firing.
      sliderEnabledRangeProperty: new DerivedProperty( [ model.totalNumberProperty, model.addendsStableProperty ], ( totalNumber, addendsStable ) => {
        return addendsStable ? new Range( NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.min, totalNumber ) : new Range( NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.min, NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE.max );
      } )
    }, providedOptions );

    super( model, options );

    const leftAddendSpinner = new AddendSpinnerPanel(
      model.leftAddendCountingObjectsProperty.value,
      model.inactiveCountingObjects,
      model.leftAddendNumberProperty,
      model.leftAddendRangeProperty,
      model.addendsStableProperty,
      {
        tandem: providedOptions.tandem.createTandem( 'leftAddendSpinner' )
      } );
    const rightAddendSpinner = new AddendSpinnerPanel(
      model.rightAddendCountingObjectsProperty.value,
      model.inactiveCountingObjects,
      model.rightAddendNumberProperty,
      model.rightAddendRangeProperty,
      model.addendsStableProperty,
      {
        tandem: providedOptions.tandem.createTandem( 'rightAddendSpinner' )
      } );
    const addendSpinners = new VBox( {
      children: [ leftAddendSpinner, rightAddendSpinner ],
      spacing: 20,
      centerY: this.countingAreaBounds.centerY,
      right: this.layoutBounds.maxX - NumberPairsConstants.SCREEN_VIEW_X_MARGIN
    } );
    this.addChild( addendSpinners );
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