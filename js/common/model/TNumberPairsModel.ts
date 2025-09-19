// Copyright 2024, University of Colorado Boulder

/**
 * TODO: Move this to a base class that NumberPairsModel and Level can both extend.
 *   that will allow us to reduce the duplication that currently exists, and also
 *   consolidate functions used in both NumberPairsModel and Level right now. https://github.com/phetsims/number-pairs/issues/36
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import TGenericNumberPairsModel from './TGenericNumberPairsModel.js';
import TModel from '../../../../joist/js/TModel.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import CountingObject from './CountingObject.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Animation from '../../../../twixt/js/Animation.js';
import RepresentationType from './RepresentationType.js';
import Property from '../../../../axon/js/Property.js';

type TNumberPairsModel = {
  countingObjects: CountingObject[];
  leftAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  rightAddendCountingObjectsProperty: TReadOnlyProperty<ObservableArray<CountingObject>>;
  countingObjectsAnimation: Animation | null;
  representationTypeProperty: Property<RepresentationType>;
} & TGenericNumberPairsModel & TModel;

export default TNumberPairsModel;