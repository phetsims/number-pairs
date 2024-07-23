// Copyright 2024, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize from '../../../phet-core/js/optionize.js';
import NumberPairsColors from '../common/NumberPairsColors.js';
import numberPairs from '../numberPairs.js';
import NumberPairsModel from './model/NumberPairsModel.js';
import NumberPairsScreenView from './view/NumberPairsScreenView.js';
import NumberPairsStrings from '../NumberPairsStrings.js';

type SelfOptions = {
  //TODO add options that are specific to NumberPairsScreen here
};

type NumberPairsScreenOptions = SelfOptions & ScreenOptions;

export default class NumberPairsScreen extends Screen<NumberPairsModel, NumberPairsScreenView> {

  public constructor( providedOptions: NumberPairsScreenOptions ) {

    const options = optionize<NumberPairsScreenOptions, SelfOptions, ScreenOptions>()( {
      name: NumberPairsStrings.screen.nameStringProperty,

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenOptions here
      backgroundColorProperty: NumberPairsColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new NumberPairsModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new NumberPairsScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

numberPairs.register( 'NumberPairsScreen', NumberPairsScreen );