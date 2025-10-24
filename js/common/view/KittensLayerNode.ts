// Copyright 2024-2025, University of Colorado Boulder

/**
 * KittensLayerNode is a Node that contains all the KittenNodes for the counting objects in the model.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import { pdomFocusProperty } from '../../../../scenery/js/accessibility/pdomFocusProperty.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import CountingObject, { AddendType } from '../model/CountingObject.js';
import CountingAreaNode from './CountingAreaNode.js';
import KittenNode from './KittenNode.js';
import NumberPairsSounds from './NumberPairsSounds.js';

type SelfOptions = {
  includeKittenAttributeSwitch?: boolean;
};

type KittensLayerNodeOptions = SelfOptions & StrictOmit<WithRequired<NodeOptions, 'tandem'>, 'children'>;

export default class KittensLayerNode extends Node {
  public readonly kittenNodes: KittenNode[];
  public readonly kittenPDOMOrderProperty: Property<KittenNode[]>; // set in constructor

  public constructor(
    public readonly countingObjects: CountingObject[],
    countingAreaNode: CountingAreaNode,
    providedOptions: KittensLayerNodeOptions
  ) {
    const newKittenSelectedEmitter = new Emitter<[ CountingObject ]>( { parameters: [ { valueType: CountingObject } ] } );
    const kittenNodes: KittenNode[] = [];

    // The order will be set in a Multilink in NumberPairsScreenView
    const kittenPDOMOrderProperty = new Property<KittenNode[]>( [] );

    countingObjects.forEach( ( countingObject, i ) => {
      const kittenNode = new KittenNode( countingObject, newKittenSelectedEmitter, {
        includeAttributeSwitch: providedOptions.includeKittenAttributeSwitch,
        dragBounds: countingAreaNode.attributeDragBounds,
        switchFocusToFirstKitten: () => {
          const firstKitten = kittenPDOMOrderProperty.value[ 0 ];
          affirm( firstKitten.countingObject.addendTypeProperty.value !== AddendType.INACTIVE, 'first kitten should not be inactive' );
          firstKitten.focus();
        },
        switchFocusToLastKitten: () => {
          const kittenPDOMOrder = kittenPDOMOrderProperty.value;
          const lastActiveKitten = kittenPDOMOrder[ kittenPDOMOrder.length - 1 ];
          lastActiveKitten.focus();
        },
        visibleProperty: new DerivedProperty( [ countingObject.addendTypeProperty ], addendType => addendType !== AddendType.INACTIVE ),
        onEndDrag: ( countingObject, positionPropertyType ) => countingAreaNode.dropCountingObject( countingObject, positionPropertyType ),
        tandem: providedOptions.tandem.createTandem( `kittenNode${i}` )
      } );
      kittenNodes.push( kittenNode );
    } );

    // Play the same kind of sound effects as the other objects, see usages of playSelectAddendSound
    pdomFocusProperty.lazyLink( ( focus, oldFocus ) => {
      if ( focus && oldFocus ) {
        const node = focus.trail.lastNode() as KittenNode;
        const oldNode = oldFocus.trail.lastNode() as KittenNode;

        if ( kittenNodes.includes( node ) && kittenNodes.includes( oldNode ) ) {

          const nodeOrder = kittenPDOMOrderProperty.value.indexOf( node );
          const oldNodeOrder = kittenPDOMOrderProperty.value.indexOf( oldNode );
          const delta = nodeOrder - oldNodeOrder;

          NumberPairsSounds.playSelectAddendSound( node.countingObject.addendTypeProperty.value, delta > 0 );
        }
      }
    } );

    const options = optionize<KittensLayerNodeOptions, EmptySelfOptions, NodeOptions>()( {
      children: kittenNodes
    }, providedOptions );
    super( options );

    this.kittenNodes = kittenNodes;
    this.kittenPDOMOrderProperty = kittenPDOMOrderProperty;
    this.kittenPDOMOrderProperty.link( pdomOrder => {
      this.setPDOMOrder( _.uniq( pdomOrder ) );
    } );

    Multilink.multilinkAny( [
      this.kittenPDOMOrderProperty,
      NumberPairsFluent.a11y.kittens.leftAddendColorStringProperty,
      NumberPairsFluent.a11y.kittens.rightAddendColorStringProperty,
      ...NumberPairsFluent.a11y.kittens.kittenPattern.getDependentProperties(),
      ...this.countingObjects.map( countingObject => countingObject.addendTypeProperty )
    ], () => {

      const pdomOrder = this.kittenPDOMOrderProperty.value;
      const leftAddendColor = NumberPairsFluent.a11y.kittens.leftAddendColorStringProperty.value;
      const rightAddendColor = NumberPairsFluent.a11y.kittens.rightAddendColorStringProperty.value;

      pdomOrder.forEach( ( value, index ) => {
        const descriptor = pdomOrder.length === 1 ? 'only' :
                           index === 0 ? 'first' :
                           index === pdomOrder.length - 1 ? 'last' : 'other';

        value.accessibleName = NumberPairsFluent.a11y.kittens.kittenPattern.format( {
          color: value.countingObject.addendTypeProperty.value === AddendType.LEFT ? leftAddendColor : rightAddendColor,
          descriptor: descriptor
        } );
      } );
    } );
  }
}

numberPairs.register( 'KittensLayerNode', KittensLayerNode );
