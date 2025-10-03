// Copyright 2025, University of Colorado Boulder

/**
 * Input listener that deselects kittens when clicking elsewhere.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PressListener from '../../../../scenery/js/listeners/PressListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberPairs from '../../numberPairs.js';
import KittensLayerNode from './KittensLayerNode.js';

export default class ClickToDeselectKittensPressListener extends PressListener {
  public constructor( kittensLayerNode: KittensLayerNode, tandem: Tandem ) {
    super( {
      attach: false,
      pressCursor: null,
      press: event => {
        if ( kittensLayerNode.kittenNodes.every( kittenNode => !event.trail.containsNode( kittenNode ) ) ) {
          kittensLayerNode.countingObjects.forEach( countingObject => {
            countingObject.kittenSelectedProperty.value = false;
          } );
        }
      },
      tandem: tandem.createTandem( 'kittensLayerNodePressListener' )
    } );
  }
}

numberPairs.register( 'ClickToDeselectKittensPressListener', ClickToDeselectKittensPressListener );