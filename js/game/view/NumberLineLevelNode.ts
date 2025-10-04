// Copyright 2025, University of Colorado Boulder

/**
 * NumberLineLevelNode is a LevelNode that shows a number line representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';
import GameNumberEquationNode from './GameNumberEquationNode.js';
import LevelNode, { LevelNodeOptions } from './LevelNode.js';

export default class NumberLineLevelNode extends LevelNode {

  public constructor( model: GameModel,
                      level: Level,
                      layoutBounds: Bounds2,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      returnToSelection: () => void,
                      tandem: Tandem,
                      providedOptions?: LevelNodeOptions ) {

    super( model, level, layoutBounds, visibleBoundsProperty, returnToSelection, tandem, providedOptions );

    const equationNode = new GameNumberEquationNode( level );
    this.addChild( equationNode );

    equationNode.centerX = layoutBounds.centerX;
    equationNode.centerY = layoutBounds.centerY;
  }
}

numberPairs.register( 'NumberLineLevelNode', NumberLineLevelNode );