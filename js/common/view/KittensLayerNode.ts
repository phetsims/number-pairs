// Copyright 2024-2025, University of Colorado Boulder

/**
 * KittensLayerNode is a Node that contains all the KittenNodes for the counting objects in the model.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import CountingAreaNode from './CountingAreaNode.js';
import KittenNode from './KittenNode.js';

type SelfOptions = {
  includeKittenAttributeSwitch?: boolean;
};

type KittensLayerNodeOptions = SelfOptions & StrictOmit<WithRequired<NodeOptions, 'tandem'>, 'children'>;

export default class KittensLayerNode extends Node {
  public readonly kittenNodes: KittenNode[];

  public constructor(
    public readonly countingObjects: CountingObject[],
    countingAreaNode: CountingAreaNode,
    providedOptions: KittensLayerNodeOptions
  ) {
    const newKittenSelectedEmitter = new Emitter<[ CountingObject ]>( { parameters: [ { valueType: CountingObject } ] } );
    const kittenNodes: KittenNode[] = [];

    countingObjects.forEach( ( countingObject, i ) => {
      kittenNodes.push( new KittenNode( countingObject, newKittenSelectedEmitter, {
        includeAttributeSwitch: providedOptions.includeKittenAttributeSwitch,
        switchFocusToFirstKitten: () => {
          const firstKitten = kittenNodes[ 0 ];
          affirm( firstKitten.countingObject.addendTypeProperty.value !== AddendType.INACTIVE, 'first kitten should not be inactive' );
          firstKitten.focus();
        },
        switchFocusToLastKitten: () => {
          const activeKittens = kittenNodes.filter( kittenNode => kittenNode.countingObject.addendTypeProperty.value !== AddendType.INACTIVE );
          const lastActiveKitten = activeKittens[ activeKittens.length - 1 ];
          lastActiveKitten.focus();
        },
        visibleProperty: new DerivedProperty( [ countingObject.addendTypeProperty ], addendType => addendType !== AddendType.INACTIVE ),
        onEndDrag: ( countingObject, positionPropertyType ) => countingAreaNode.dropCountingObject( countingObject, positionPropertyType ),
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