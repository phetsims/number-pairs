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
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import { VBox } from '../../../../scenery/js/imports.js';
import AddendSpinnerPanel from './AddendSpinnerPanel.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';

type SelfOptions = {
  //TODO add options that are specific to SumScreenView here
};

type SumScreenViewOptions = SelfOptions & StrictOmit<NumberPairsScreenViewOptions, 'numberSentenceContent' | 'numberBondContent'>
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
      } )
    }, providedOptions );

    super( model, options );

    const leftAddendProxyProperty = new NumberProperty( model.leftAddendNumberProperty.value );
    // Strategy #1:
    leftAddendProxyProperty.lazyLink( ( newTotal, oldTotal ) => {
      const delta = newTotal - oldTotal;
      model.totalNumberProperty.value += delta;
      model.leftAddendNumberProperty.value += delta;
    } );

    const leftAddendSpinner = new AddendSpinnerPanel(
      leftAddendProxyProperty,
      model.totalRangeProperty,
      {
        tandem: providedOptions.tandem.createTandem( 'leftAddendSpinner' )
      } );
    const rightAddendSpinner = new AddendSpinnerPanel(
      model.totalNumberProperty,
      model.totalRangeProperty,
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