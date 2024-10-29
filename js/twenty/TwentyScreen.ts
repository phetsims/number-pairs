// Copyright 2024, University of Colorado Boulder

/**
 * TwentyScreen is the 'Twenty' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize from '../../../phet-core/js/optionize.js';
import NumberPairsColors from '../common/NumberPairsColors.js';
import numberPairs from '../numberPairs.js';
import TwentyModel from './model/TwentyModel.js';
import TwentyScreenView from './view/TwentyScreenView.js';
import NumberPairsStrings from '../NumberPairsStrings.js';
import { CountingRepresentationType } from '../common/model/NumberPairsModel.js';

type SelfOptions = {
  //TODO add options that are specific to TwentyScreen here
};

type TwentyScreenOptions = SelfOptions & ScreenOptions;

export default class TwentyScreen extends Screen<TwentyModel, TwentyScreenView> {

  public constructor( providedOptions: TwentyScreenOptions ) {

    const options = optionize<TwentyScreenOptions, SelfOptions, ScreenOptions>()( {
      name: NumberPairsStrings.screen.twentyStringProperty,

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenOptions here
      backgroundColorProperty: NumberPairsColors.twentyScreenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new TwentyModel( {
        countingRepresentationTypeValidValues: [
          CountingRepresentationType.APPLES,
          CountingRepresentationType.ONE_CARDS,
          CountingRepresentationType.CUBES,
          CountingRepresentationType.KITTENS,
          CountingRepresentationType.NUMBER_LINE
        ],
        tandem: options.tandem.createTandem( 'model' )
      } ),
      model => new TwentyScreenView( model, {
        tandem: options.tandem.createTandem( 'view' )
      } ),
      options
    );
  }
}

numberPairs.register( 'TwentyScreen', TwentyScreen );