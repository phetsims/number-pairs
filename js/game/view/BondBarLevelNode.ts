// Copyright 2025, University of Colorado Boulder

/**
 * BondBarLevelNode is a LevelNode that shows a bond or bar representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import derived from '../../../../axon/js/derived.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import Level from '../model/Level.js';
import CountingAreaLevelNode from './CountingAreaLevelNode.js';
import { layoutNumberBarFeedback, layoutNumberBondFeedback } from './GameLayout.js';
import GameNumberBarModelNode from './GameNumberBarModelNode.js';
import GameNumberBondNode from './GameNumberBondNode.js';
import { LevelNodeOptions } from './LevelNode.js';

export default class BondBarLevelNode extends CountingAreaLevelNode {
  public constructor( model: GameModel,
                      level: Level,
                      layoutBounds: Bounds2,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      returnToSelection: () => void,
                      tandem: Tandem,
                      providedOptions?: LevelNodeOptions ) {

    super( model, level, layoutBounds, visibleBoundsProperty, returnToSelection, tandem, providedOptions );

    // Representation nodes (pre-create and swap based on challenge type)
    const bondNode = new GameNumberBondNode( level, {
      center: this.numberModelCenter,
      visibleProperty: derived( NumberPairsPreferences.numberModelTypeProperty, numberModelType => {
        return ( level.type !== 'decompositionEquation' && level.type !== 'sumEquation' ) && numberModelType === NumberModelType.NUMBER_BOND_MODEL;
      } )
    } );
    const barNode = new GameNumberBarModelNode( level, {
      center: this.numberModelCenter,
      visibleProperty: derived( NumberPairsPreferences.numberModelTypeProperty, numberModelType => {
        return ( level.type !== 'decompositionEquation' && level.type !== 'sumEquation' ) && numberModelType === NumberModelType.BAR_MODEL;
      } )
    } );
    this.addChild( bondNode );
    this.addChild( barNode );

    // when the challenge changes, move the correct addend of the GameNumberBarModelNode to the front, to avoid
    // the stroke being obscured by the other addend, see https://github.com/phetsims/number-pairs/issues/227#issuecomment-3368461725
    level.challengeProperty.link( challenge => {
      if ( challenge.missing === 'a' ) {
        barNode.leftAddendRectangle.moveToFront();
      }
      else if ( challenge.missing === 'b' ) {
        barNode.rightAddendRectangle.moveToFront();
      }
      else if ( challenge.missing === 'y' ) {
        barNode.totalRectangle.moveToFront();
      }
      else {
        throw new Error( `Unknown missing value: ${challenge.missing}` );
      }
    } );

    // Update the feedback layout whenever the bounds of our feedback or target changes, and whenever the model type
    // changes.
    ManualConstraint.create( this, [ bondNode, barNode.leftAddendRectangle, barNode.rightAddendRectangle, this.wrongMark, this.checkMark, this.tryAgainText ],
      ( bondNodeProxy, barNodeLeftAddendRectangleProxy, barNodeRightAddendRectangleProxy, wrongMarkProxy, checkMarkProxy, tryAgainTextProxy ) => {
        const missingValue = level.challengeProperty.value.missing;

        NumberPairsPreferences.numberModelTypeProperty.value === NumberModelType.NUMBER_BOND_MODEL ?
        layoutNumberBondFeedback( bondNodeProxy, missingValue, wrongMarkProxy, checkMarkProxy, tryAgainTextProxy ) :
        layoutNumberBarFeedback( barNodeLeftAddendRectangleProxy, barNodeRightAddendRectangleProxy, missingValue, wrongMarkProxy, checkMarkProxy, tryAgainTextProxy );
      } );

    NumberPairsPreferences.numberModelTypeProperty.link( numberModelType => {
      const missingValue = level.challengeProperty.value.missing;

      numberModelType === NumberModelType.NUMBER_BOND_MODEL ?
      layoutNumberBondFeedback( bondNode, missingValue, this.wrongMark, this.checkMark, this.tryAgainText ) :
      layoutNumberBarFeedback( barNode.leftAddendRectangle, barNode.rightAddendRectangle, missingValue, this.wrongMark, this.checkMark, this.tryAgainText );
    } );
  }
}

numberPairs.register( 'BondBarLevelNode', BondBarLevelNode );
