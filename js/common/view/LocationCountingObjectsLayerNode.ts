// Copyright 2024, University of Colorado Boulder

/**
 * The LocationCountingObjectsLayerNode creates all the location counting object nodes.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import LocationCountingObjectNode from './LocationCountingObjectNode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { AddendType } from '../model/CountingObject.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';

type LocationCountingObjectsLayerNodeOptions = WithRequired<NodeOptions, 'tandem'>;
export default class LocationCountingObjectsLayerNode extends Node {

  public constructor( model: NumberPairsModel, countingAreaBounds: Bounds2, providedOptions: LocationCountingObjectsLayerNodeOptions ) {

    const locationNodes = model.countingObjects.map( countingObject => {
      return new LocationCountingObjectNode( countingObject, countingAreaBounds, model.countingRepresentationTypeProperty, {
        visibleProperty: new DerivedProperty( [ countingObject.addendTypeProperty ],
            addendType => addendType !== AddendType.INACTIVE ),
        tandem: providedOptions.tandem.createTandem( `locationCountingObjectNode${countingObject.id}` )
      } );
    } );

    const superOptions = combineOptions<NodeOptions>( {
      children: locationNodes
    }, providedOptions );
   super( superOptions );
  }
}

numberPairs.register( 'LocationCountingObjectsLayerNode', LocationCountingObjectsLayerNode );