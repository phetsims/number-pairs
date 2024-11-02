// Copyright 2024, University of Colorado Boulder

/**
 * KittensLayerNode is a Node that contains all the KittenNodes for the counting objects in the model.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import CountingObject, { AddendType, KITTEN_PANEL_WIDTH } from '../model/CountingObject.js';
import KittenNode from './KittenNode.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import dotRandom from '../../../../dot/js/dotRandom.js';

type KittensLayerNodeOptions = PickRequired<NodeOptions, 'tandem'> & StrictOmit<NodeOptions, 'children'>;
export default class KittensLayerNode extends Node {

  public constructor( model: NumberPairsModel, countingObjects: CountingObject[], countingAreaBounds: Bounds2, providedOptions: KittensLayerNodeOptions ) {
    const newKittenFocusedEmitter = new Emitter();
    const kittens: KittenNode[] = [];

    const availableGridPositions = model.getGridCoordinates( countingAreaBounds, KITTEN_PANEL_WIDTH, KITTEN_PANEL_WIDTH, 8 );
    countingObjects.forEach( ( countingObject, i ) => {
      const initialPosition = dotRandom.sample( availableGridPositions );
      availableGridPositions.splice( availableGridPositions.indexOf( initialPosition ), 1 );

      kittens.push( new KittenNode( countingObject, countingAreaBounds, newKittenFocusedEmitter, {
        initialPosition: initialPosition,
        visibleProperty: new DerivedProperty( [ countingObject.addendTypeProperty ], addendType => addendType !== AddendType.INACTIVE ),
        onDrop: model.dropCountingObject.bind( model ),
        tandem: providedOptions.tandem.createTandem( `kittenNode${i}` )
      } ) );

      countingObject.addendTypeProperty.link( addendType => {
        const leftAddendCountingObjects = model.leftAddendCountingObjectsProperty.value;
        const rightAddendCountingObjects = model.rightAddendCountingObjectsProperty.value;
        if ( addendType === AddendType.LEFT && !leftAddendCountingObjects.includes( countingObject ) ) {
          countingObject.traverseInactiveObjects = false;
          rightAddendCountingObjects.remove( countingObject );
          leftAddendCountingObjects.add( countingObject );
          countingObject.traverseInactiveObjects = true;
        }
        else if ( addendType === AddendType.RIGHT && !rightAddendCountingObjects.includes( countingObject ) ) {
          countingObject.traverseInactiveObjects = false;
          rightAddendCountingObjects.add( countingObject );
          leftAddendCountingObjects.remove( countingObject );
          countingObject.traverseInactiveObjects = true;
        }
      } );
    } );

    const options = optionize<KittensLayerNodeOptions, EmptySelfOptions, NodeOptions>()( {
      children: kittens
    }, providedOptions );
    super( options );
  }
}

numberPairs.register( 'KittensLayerNode', KittensLayerNode );