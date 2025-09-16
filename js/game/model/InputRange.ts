// Copyright 2025, University of Colorado Boulder

/**
 * InputRange represents a range of numbers that can be used for input, e.g. 0..10 or 11..20.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export const InputRangeValues = [ 'zeroToTen', 'zeroToTwenty' ] as const;
type InputRange = typeof InputRangeValues[number];

export default InputRange;