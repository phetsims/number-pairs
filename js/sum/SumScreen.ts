// Copyright 2024-2025, University of Colorado Boulder

/**
 * SumScreen is the 'Sum' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import RepresentationType from '../common/model/RepresentationType.js';
import NumberPairsColors from '../common/NumberPairsColors.js';
import numberPairs from '../numberPairs.js';
import NumberPairsFluent from '../NumberPairsFluent.js';
import SumModel from './model/SumModel.js';
import SumScreenIcon from './view/SumScreenIcon.js';
import SumScreenKeyboardHelpNode from './view/SumScreenKeyboardHelpNode.js';
import SumScreenView from './view/SumScreenView.js';

type SelfOptions = EmptySelfOptions;

//REVIEW All that's really needed is PickRequired<ScreenOptions, 'tandem'>
type SumScreenOptions = SelfOptions & ScreenOptions;

export default class SumScreen extends Screen<SumModel, SumScreenView> {

  public constructor( providedOptions: SumScreenOptions ) {

    const options = optionize<SumScreenOptions, SelfOptions, ScreenOptions>()( {

      //REVIEW Based on the definition of IntroScreenOptions, all of these can be overridden.
      name: NumberPairsFluent.screen.sumStringProperty,
      createKeyboardHelpNode: () => new SumScreenKeyboardHelpNode(),
      homeScreenIcon: new SumScreenIcon( { size: Screen.MINIMUM_HOME_SCREEN_ICON_SIZE } ),
      navigationBarIcon: new SumScreenIcon( { size: Screen.MINIMUM_NAVBAR_ICON_SIZE } ),
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