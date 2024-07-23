// Copyright 2024, University of Colorado Boulder

/**
 * Defines query parameters that are specific to this simulation.
 * Run with ?log to print query parameters and their values to the browser console at startup.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import numberPairs from '../numberPairs.js';

const SCHEMA_MAP = {
  //TODO add schemas for query parameters
};

const NumberPairsQueryParameters = QueryStringMachine.getAll( SCHEMA_MAP );

// The schema map is a read-only part of the public API, in case schema details (e.g. validValues) are needed elsewhere.
NumberPairsQueryParameters.SCHEMA_MAP = SCHEMA_MAP;

numberPairs.register( 'NumberPairsQueryParameters', NumberPairsQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.numberPairs.NumberPairsQueryParameters' );

export default NumberPairsQueryParameters;