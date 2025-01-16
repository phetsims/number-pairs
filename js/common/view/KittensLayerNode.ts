// Copyright 2024-2025, University of Colorado Boulder

/**
 * KittensLayerNode is a Node that contains all the KittenNodes for the counting objects in the model.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import KittenNode from './KittenNode.js';

type KittensLayerNodeOptions = PickRequired<NodeOptions, 'tandem'> & StrictOmit<NodeOptions, 'children'>;
export default class KittensLayerNode extends Node {
  public readonly kittenNodes: KittenNode[];

  public constructor( model: NumberPairsModel, countingObjects: CountingObject[], countingAreaBounds: Bounds2, providedOptions: KittensLayerNodeOptions ) {
    const newKittenSelectedEmitter = new Emitter<[ CountingObject ]>( { parameters: [ { valueType: CountingObject } ] } );
    const kittenNodes: KittenNode[] = [];

    countingObjects.forEach( ( countingObject, i ) => {
      kittenNodes.push( new KittenNode( countingObject, countingAreaBounds, newKittenSelectedEmitter, {
        visibleProperty: new DerivedProperty( [ countingObject.addendTypeProperty ], addendType => addendType !== AddendType.INACTIVE ),
        onEndDrag: model.dropCountingObject.bind( model ),
        tandem: providedOptions.tandem.createTandem( `kittenNode${i}` )
      } ) );
    } );

    const options = optionize<KittensLayerNodeOptions, EmptySelfOptions, NodeOptions>()( {
      children: kittenNodes
    }, providedOptions );
    super( options );

    this.kittenNodes = kittenNodes;
  }
}

numberPairs.register( 'KittensLayerNode', KittensLayerNode );