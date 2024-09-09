// Copyright 2024, University of Colorado Boulder
/**
 * CountingObject is the model for the individual objects users can interact with to explore the decomposition of
 * a number.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import numberPairs from '../../numberPairs.js';


// We will probably need this to be a PhET-iO CountingObject for Group Sort later on.
export default class CountingObject extends PhetioObject {

  public constructor() {
   super();
  }
}

numberPairs.register( 'CountingObject', CountingObject );