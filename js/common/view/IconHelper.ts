// Copyright 2024, University of Colorado Boulder
/**
 * Type definition and helper functions for icon representations of number models used throughout the sim.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import TGenericNumberPairsModel from '../model/TGenericNumberPairsModel.js';


export type IconModel = StrictOmit<TGenericNumberPairsModel, 'leftAddendProperty' | 'rightAddendProperty' | 'totalProperty'> & {
  totalProperty: TReadOnlyProperty<number | null>;
  leftAddendProperty: TReadOnlyProperty<number | null>;
  rightAddendProperty: TReadOnlyProperty<number | null>;
};

export function createIconTextConstraint( parent: Node, totalNode: Node, totalText: Node,
                                          leftNode: Node, leftText: Node, rightNode: Node, rightText: Node ): void {
  ManualConstraint.create( parent, [ totalNode, totalText, leftNode, leftText, rightNode, rightText ],
    ( totalProxy, totalTextProxy, leftProxy, leftTextProxy, rightProxy, rightTextProxy ) => {
      totalTextProxy.center = totalProxy.bounds.center;
      leftTextProxy.center = leftProxy.bounds.center;
      rightTextProxy.center = rightProxy.bounds.center;
  } );
}