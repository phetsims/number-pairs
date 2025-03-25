// Copyright 2024-2025, University of Colorado Boulder

/**
 * Defines query parameters that are specific to this simulation.
 * Run with ?log to print query parameters and their values to the browser console at startup.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';
import numberPairs from '../numberPairs.js';

const SCHEMA_MAP = {

  // Choose between a traditional number bond representation or a proportional bar model.
  numberModelType: {
    public: true,
    type: 'string',
    validValues: [ 'numberBond', 'barModel' ],
    defaultValue: 'numberBond'
  },

  // Only affects the number model on the sum screen.
  // Determine the orientation of the total in the number decomposition model.
  sumScreenNumberModelOrientation: {
    public: true,
    type: 'string',
    validValues: [ 'top', 'bottom' ],
    defaultValue: 'bottom'
  },

  // Automatically reads the number phrase aloud when a decomposition is changed or when a new total is chosen.
  autoHear: {
    public: true,
    type: 'flag'
  },

  // Specifies a second locale for the speech synthesis feature.
  // Values are a locale code, e.g. "en" or "zh_CN". null means no second locale.
  secondLocale: {
    public: true,
    type: 'string',
    defaultValue: null
  }
} as const;

const NumberPairsQueryParameters = QueryStringMachine.getAll( SCHEMA_MAP );

// The schema map is a read-only part of the public API, in case schema details (e.g. validValues) are needed elsewhere.
NumberPairsQueryParameters.SCHEMA_MAP = SCHEMA_MAP;

numberPairs.register( 'NumberPairsQueryParameters', NumberPairsQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.numberPairs.NumberPairsQueryParameters' );

export default NumberPairsQueryParameters;