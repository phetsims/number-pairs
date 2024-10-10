// Copyright 2024, University of Colorado Boulder

/**
 * TODO: describe file
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import CountingObject from '../model/CountingObject.js';
import KittenNode from './KittenNode.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Emitter from '../../../../axon/js/Emitter.js';

type KittensLayerNodeOptions = WithRequired<NodeOptions, 'tandem'>;
export default class KittensLayerNode extends Node {

  public constructor( countingObjects: CountingObject[], countingAreaBounds: Bounds2, providedOptions: KittensLayerNodeOptions ) {
    const newKittenFocusedEmitter = new Emitter();
    const kittens: KittenNode[] = [];
    countingObjects.forEach( ( countingObject, i ) => {
      kittens.push( new KittenNode( countingObject, countingAreaBounds, newKittenFocusedEmitter, {
        tandem: providedOptions.tandem.createTandem( `kittenNode${i}` )
      } ) );
    } );

    const superOptions = combineOptions<NodeOptions>( {
      children: kittens
    }, providedOptions );
    super( superOptions );
  }
}

numberPairs.register( 'KittensLayerNode', KittensLayerNode );