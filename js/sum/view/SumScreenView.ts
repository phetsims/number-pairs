// Copyright 2024, University of Colorado Boulder

/**
 * SumScreenView is the top-level view for the 'Sum' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { VBox } from '../../../../scenery/js/imports.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import NumberBondAccordionBox from '../../common/view/NumberBondAccordionBox.js';
import NumberPairsScreenView, { NumberPairsScreenViewOptions } from '../../common/view/NumberPairsScreenView.js';
import NumberSentenceAccordionBox from '../../common/view/NumberSentenceAccordionBox.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import SumModel from '../model/SumModel.js';
import AddendControlPanel from './AddendControlPanel.js';

type SelfOptions = {
  //TODO add options that are specific to SumScreenView here
};

type SumScreenViewOptions = SelfOptions & StrictOmit<NumberPairsScreenViewOptions, 'numberSentenceContent' | 'numberBondContent'>
  & PickRequired<NumberPairsScreenViewOptions, 'tandem'>;
export default class SumScreenView extends NumberPairsScreenView {

  public constructor( model: SumModel, providedOptions: SumScreenViewOptions ) {

    const options = optionize<SumScreenViewOptions, SelfOptions, NumberPairsScreenViewOptions>()( {
      sumScreen: true,
      numberSentenceContent: new NumberSentenceAccordionBox( model, {
        numberSentenceStringProperty: NumberPairsStrings.sumNumberSentencePatternStringProperty,
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
        expandedDefaultValue: true,
        tandem: providedOptions.tandem.createTandem( 'equationAccordionBox' )
      } )
    }, providedOptions );

    super( model, options );

    const leftAddendControlPanel = new AddendControlPanel(
      model.totalProperty,
      model.leftAddendCountingObjectsProperty.value,
      model.inactiveCountingObjects,
      model.representationTypeProperty,
      {
        tandem: providedOptions.tandem.createTandem( 'leftAddendControlPanel' ),
        addendNumberProperty: model.leftAddendProperty
      } );
    const rightAddendControlPanel = new AddendControlPanel(
      model.totalProperty,
      model.rightAddendCountingObjectsProperty.value,
      model.inactiveCountingObjects,
      model.representationTypeProperty,
      {
        tandem: providedOptions.tandem.createTandem( 'rightAddendControlPanel' )
      } );
    const addendSpinners = new VBox( {
      children: [ leftAddendControlPanel, rightAddendControlPanel ],
      spacing: 35,
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