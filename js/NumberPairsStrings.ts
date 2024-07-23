// Copyright 2024, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/LocalizedStringProperty.js';
import numberPairs from './numberPairs.js';

type StringsType = {
  'number-pairs': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'screen': {
    'nameStringProperty': LocalizedStringProperty;
  }
};

const NumberPairsStrings = getStringModule( 'NUMBER_PAIRS' ) as StringsType;

numberPairs.register( 'NumberPairsStrings', NumberPairsStrings );

export default NumberPairsStrings;
