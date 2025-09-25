// Copyright 2025, University of Colorado Boulder

/**
 * TODO: Move this to a base class that NumberPairsModel and Level can both extend.
 *   that will allow us to reduce the duplication that currently exists, and also
 *   consolidate functions used in both NumberPairsModel and Level right now. https://github.com/phetsims/number-pairs/issues/216
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import TModel from '../../../../joist/js/TModel.js';
import Animation from '../../../../twixt/js/Animation.js';
import CountingObject from './CountingObject.js';
import RepresentationType from './RepresentationType.js';
import TGenericNumberPairsModel from './TGenericNumberPairsModel.js';

type TNumberPairsModel = {
  countingObjects: CountingObject[];
  leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  countingObjectsAnimation: Animation | null;
  representationTypeProperty: Property<RepresentationType>;
} & TGenericNumberPairsModel & TModel;

export default TNumberPairsModel;