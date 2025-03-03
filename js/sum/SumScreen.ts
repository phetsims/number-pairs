// Copyright 2024, University of Colorado Boulder

/**
 * SumScreen is the 'Sum' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize from '../../../phet-core/js/optionize.js';
import RepresentationType from '../common/model/RepresentationType.js';
import NumberPairsColors from '../common/NumberPairsColors.js';
import numberPairs from '../numberPairs.js';
import NumberPairsStrings from '../NumberPairsStrings.js';
import SumModel from './model/SumModel.js';
import SumScreenView from './view/SumScreenView.js';
import SumScreenKeyboardHelpNode from './view/SumScreenKeyboardHelpNode.js';

type SelfOptions = {
  //TODO add options that are specific to SumScreen here
};

type SumScreenOptions = SelfOptions & ScreenOptions;

export default class SumScreen extends Screen<SumModel, SumScreenView> {

  public constructor( providedOptions: SumScreenOptions ) {

    const options = optionize<SumScreenOptions, SelfOptions, ScreenOptions>()( {
      name: NumberPairsStrings.screen.sumStringProperty,
      createKeyboardHelpNode: () => new SumScreenKeyboardHelpNode(),
      backgroundColorProperty: NumberPairsColors.sumScreenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new SumModel( {
        representationTypeValidValues: [
          RepresentationType.BEADS,
          RepresentationType.KITTENS,
          RepresentationType.NUMBER_LINE
        ],
        tandem: options.tandem.createTandem( 'model' )
      } ),
      model => new SumScreenView( model, {
        tandem: options.tandem.createTandem( 'view' )
      } ),
      options
    );
  }
}

numberPairs.register( 'SumScreen', SumScreen );