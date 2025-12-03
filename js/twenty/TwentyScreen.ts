// Copyright 2024-2025, University of Colorado Boulder

/**
 * TwentyScreen is the 'Twenty' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import PickRequired from '../../../phet-core/js/types/PickRequired.js';
import RepresentationType from '../common/model/RepresentationType.js';
import NumberPairsColors from '../common/NumberPairsColors.js';
import NumberPairsConstants from '../common/NumberPairsConstants.js';
import numberPairs from '../numberPairs.js';
import NumberPairsFluent from '../NumberPairsFluent.js';
import TwentyModel from './model/TwentyModel.js';
import TwentyScreenIcon from './view/TwentyScreenIcon.js';
import TwentyScreenKeyboardHelpNode from './view/TwentyScreenKeyboardHelpNode.js';
import TwentyScreenView from './view/TwentyScreenView.js';

type SelfOptions = EmptySelfOptions;
type TwentyScreenOptions = SelfOptions & PickRequired<ScreenOptions, 'tandem'>;

export default class TwentyScreen extends Screen<TwentyModel, TwentyScreenView> {

  public constructor( providedOptions: TwentyScreenOptions ) {

    const options = optionize<TwentyScreenOptions, SelfOptions, ScreenOptions>()( {
      name: NumberPairsFluent.screen.twentyStringProperty,
      createKeyboardHelpNode: () => new TwentyScreenKeyboardHelpNode(),
      homeScreenIcon: new TwentyScreenIcon( { size: Screen.MINIMUM_HOME_SCREEN_ICON_SIZE } ),
      navigationBarIcon: new TwentyScreenIcon( { size: Screen.MINIMUM_NAVBAR_ICON_SIZE } ),
      screenButtonsHelpText: NumberPairsFluent.a11y.screenButtonsHelpText.twenty.createProperty( {
        min: NumberPairsConstants.TWENTY_TOTAL_RANGE.min,
        max: NumberPairsConstants.TWENTY_TOTAL_RANGE.max
      } ),
      backgroundColorProperty: NumberPairsColors.twentyScreenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new TwentyModel( {
        representationTypeValidValues: [
          RepresentationType.APPLES,
          RepresentationType.ONE_CARDS,
          RepresentationType.BEADS,
          RepresentationType.KITTENS,
          RepresentationType.NUMBER_LINE
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