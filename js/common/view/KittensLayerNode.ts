// Copyright 2024, University of Colorado Boulder

/**
 * KittensLayerNode is a Node that contains all the KittenNodes for the counting objects in the model.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import KittenNode from './KittenNode.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type KittensLayerNodeOptions = WithRequired<NodeOptions, 'tandem'>;
export default class KittensLayerNode extends Node {

  public constructor( model: NumberPairsModel, countingObjects: CountingObject[], countingAreaBounds: Bounds2, providedOptions: KittensLayerNodeOptions ) {
    const newKittenFocusedEmitter = new Emitter();
    const kittens: KittenNode[] = [];
    countingObjects.forEach( ( countingObject, i ) => {
      kittens.push( new KittenNode( countingObject, countingAreaBounds, newKittenFocusedEmitter, {
        visibleProperty: new DerivedProperty( [ countingObject.addendTypeProperty ], addendType => addendType !== AddendType.INACTIVE ),
        onDrop: model.dropCountingObject.bind( model ),
        tandem: providedOptions.tandem.createTandem( `kittenNode${i}` )
      } ) );

      countingObject.addendTypeProperty.link( addendType => {
        const leftAddendCountingObjects = model.leftAddendCountingObjectsProperty.value;
        const rightAddendCountingObjects = model.rightAddendCountingObjectsProperty.value;
        if ( addendType === AddendType.LEFT && !leftAddendCountingObjects.includes( countingObject ) ) {
          rightAddendCountingObjects.remove( countingObject );
          leftAddendCountingObjects.add( countingObject );
        }
        else if ( addendType === AddendType.RIGHT && !rightAddendCountingObjects.includes( countingObject ) ) {
          rightAddendCountingObjects.add( countingObject );
          leftAddendCountingObjects.remove( countingObject );
        }
      } );
    } );

    const superOptions = combineOptions<NodeOptions>( {
      children: kittens
    }, providedOptions );
    super( superOptions );
  }
}

numberPairs.register( 'KittensLayerNode', KittensLayerNode );