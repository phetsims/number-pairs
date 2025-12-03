// Copyright 2025, University of Colorado Boulder

/**
 * BondBarLevelNode is a LevelNode that shows a bond or bar representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import numberPairs from '../../numberPairs.js';
import Level from '../model/Level.js';
import KittenLevelNode, { CountingAreaLevelNodeOptions } from './KittenLevelNode.js';
import { layoutNumberBarFeedback, layoutNumberBondFeedback } from './GameLayout.js';
import GameNumberBarModelNode from './GameNumberBarModelNode.js';
import GameNumberBondNode from './GameNumberBondNode.js';

export default class BondBarLevelNode extends KittenLevelNode {
  public constructor( getLevel: ( levelNumber: number ) => Level,
                      level: Level,
                      layoutBounds: Bounds2,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      returnToSelection: () => void,
                      providedOptions: CountingAreaLevelNodeOptions ) {

    // Representation nodes (pre-create and swap based on challenge type)
    const bondNode = new GameNumberBondNode( level, {
      visibleProperty: NumberPairsPreferences.numberModelTypeProperty.derived( numberModelType => {
        return ( level.type !== 'decompositionEquation' && level.type !== 'sumEquation' ) && numberModelType === NumberModelType.NUMBER_BOND_MODEL;
      } )
    } );
    const barNode = new GameNumberBarModelNode( level, {
      visibleProperty: NumberPairsPreferences.numberModelTypeProperty.derived( numberModelType => {
        return ( level.type !== 'decompositionEquation' && level.type !== 'sumEquation' ) && numberModelType === NumberModelType.BAR_MODEL;
      } )
    } );
    super( getLevel, level, layoutBounds, visibleBoundsProperty, [ barNode, bondNode ], returnToSelection, providedOptions );
    bondNode.center = this.numberModelCenter;
    barNode.center = this.numberModelCenter;
    this.addChild( bondNode );
    this.addChild( barNode );


    // when the challenge changes, move the correct addend of the GameNumberBarModelNode to the front, to avoid
    // the stroke being obscured by the other addend, see https://github.com/phetsims/number-pairs/issues/227#issuecomment-3368461725
    level.challengeProperty.link( challenge => {
      if ( challenge.missingComponent === 'a' ) {
        barNode.leftAddendRectangle.moveToFront();
      }
      else if ( challenge.missingComponent === 'b' ) {
        barNode.rightAddendRectangle.moveToFront();
      }
      else if ( challenge.missingComponent === 'y' ) {
        barNode.totalRectangle.moveToFront();
      }
      else {
        throw new Error( `Unknown missing value: ${challenge.missingComponent}` );
      }
    } );

    // Update the feedback layout whenever the bounds of our feedback or target changes, and whenever the model type
    // changes.
    ManualConstraint.create( this, [ bondNode, barNode.leftAddendRectangle, barNode.rightAddendRectangle, this.wrongMark, this.correctMark, this.tryAgainText ],
      ( bondNodeProxy, barNodeLeftAddendRectangleProxy, barNodeRightAddendRectangleProxy, wrongMarkProxy, correctMarkProxy, tryAgainTextProxy ) => {
        const missingValue = level.challengeProperty.value.missingComponent;

        NumberPairsPreferences.numberModelTypeProperty.value === NumberModelType.NUMBER_BOND_MODEL ?
        layoutNumberBondFeedback( bondNodeProxy, missingValue, wrongMarkProxy, correctMarkProxy, tryAgainTextProxy ) :
        layoutNumberBarFeedback( barNodeLeftAddendRectangleProxy, barNodeRightAddendRectangleProxy, missingValue, wrongMarkProxy, correctMarkProxy, tryAgainTextProxy );
      } );

    NumberPairsPreferences.numberModelTypeProperty.link( numberModelType => {
      const missingValue = level.challengeProperty.value.missingComponent;

      numberModelType === NumberModelType.NUMBER_BOND_MODEL ?
      layoutNumberBondFeedback( bondNode, missingValue, this.wrongMark, this.correctMark, this.tryAgainText ) :
      layoutNumberBarFeedback( barNode.leftAddendRectangle, barNode.rightAddendRectangle, missingValue, this.wrongMark, this.correctMark, this.tryAgainText );
    } );
  }
}

numberPairs.register( 'BondBarLevelNode', BondBarLevelNode );
