// Copyright 2024, University of Colorado Boulder

/**
 * NumberPairsPreferencesNode is the set of controls for preferences that appear in the Simulation tab
 * of the Preferences dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import SecondLanguageControl from '../../../../number-suite-common/js/common/view/SecondLanguageControl.js';
import NumberPairsPreferences from '../model/NumberPairsPreferences.js';
import numberPairsUtteranceQueue from './numberPairsUtteranceQueue.js';
import NumberPairsConstants from '../NumberPairsConstants.js';

type SelfOptions = {
  secondLanguageControlVisible?: boolean; // should the 'Second Language' control be enabled?
};

export type NumberPairsPreferencesNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class NumberPairsPreferencesNode extends Node {

  public constructor( providedOptions?: NumberPairsPreferencesNodeOptions ) {

    const options = optionize<NumberPairsPreferencesNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      secondLanguageControlVisible: true,

      // NodeOptions
      isDisposable: false
    }, providedOptions );

    const secondLanguageControl = new SecondLanguageControl(
      NumberPairsPreferences.secondLocaleProperty,
      NumberPairsPreferences.secondVoiceProperty,
      NumberPairsPreferences.secondLocaleEnabledProperty,
      NumberPairsPreferences.isPrimaryLocaleProperty,
      NumberPairsConstants.ALL_URL,
      numberPairsUtteranceQueue, {
        visible: options.secondLanguageControlVisible
      } );

    options.children = [ secondLanguageControl ];

    super( options );
  }
}

numberPairs.register( 'NumberPairsPreferencesNode', NumberPairsPreferencesNode );