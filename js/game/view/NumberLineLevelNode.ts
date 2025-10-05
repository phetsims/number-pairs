// Copyright 2025, University of Colorado Boulder

/**
 * NumberLineLevelNode is a LevelNode that shows a number line representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberLineNode from '../../common/view/NumberLineNode.js';
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

    const numberLineModel = {
      leftAddendProperty: new NumberProperty( 0 ),
      numberLineSliderEnabledRangeProperty: new Property( new Range( 0, 20 ) ),
      tickValuesVisibleProperty: new BooleanProperty( true ),
      rightAddendProperty: new NumberProperty( 0 ),
      totalProperty: new NumberProperty( 0 ),
      totalJumpVisibleProperty: new BooleanProperty( false ),
      numberLineCountFromZeroProperty: new BooleanProperty( true ),
      numberLineAddendValuesVisibleProperty: new BooleanProperty( true )
    } as const;

    Multilink.multilink( [ level.challengeProperty, level.selectedGuessProperty ], ( challenge, guess ) => {
      const numericGuess = guess || 0;

      if ( challenge.missing === 'a' ) {
        numberLineModel.leftAddendProperty.value = numericGuess;
        numberLineModel.rightAddendProperty.value = level.challengeProperty.value.b;
        numberLineModel.totalProperty.value = numericGuess + level.challengeProperty.value.b;
      }
      else {
        numberLineModel.leftAddendProperty.value = level.challengeProperty.value.a;
        numberLineModel.rightAddendProperty.value = numericGuess;
        numberLineModel.totalProperty.value = numericGuess + level.challengeProperty.value.a;
      }
    } );

    const numberLineNode = new NumberLineNode( numberLineModel, layoutBounds.width - 200, {
      tandem: tandem.createTandem( 'numberLineNode' ),
      numberLineRange: new Range( 0, 20 ),
      bottom: layoutBounds.bottom - 20,
      left: layoutBounds.left + 20
    } );
    numberLineNode.slider.pickable = false;
    numberLineNode.slider.thumbNode.visible = false;
    this.addChild( numberLineNode );

    this.resetChallengeButton.moveToFront(); // awkward

    ManualConstraint.create( this, [
        equationNode, this.statusBar, this.wrongMark, this.checkMark, this.tryAgainText, this.resetChallengeButton,
        equationNode.leftAddendSquare, equationNode.rightAddendSquare, equationNode.totalSquare ],
      ( equationNodeProxy, statusBarProxy, wrongMarkProxy, checkMarkProxy, tryAgainTextProxy,
        resetButtonProxy, equationLeftProxy, equationRightProxy, equationTopProxy ) => {

        resetButtonProxy.rightBottom = layoutBounds.rightBottom.plusXY( -120, 0 );
        equationNodeProxy.center = layoutBounds.center;

        // TODO: duplicated with EquationLevelNode, see https://github.com/phetsims/number-pairs/issues/215
        const missingSquare = equationNode.getMissingSquare();
        const proxy = missingSquare === equationNode.leftAddendSquare ? equationLeftProxy :
                      missingSquare === equationNode.rightAddendSquare ? equationRightProxy :
                      equationTopProxy;
        wrongMarkProxy.centerTop = proxy.centerBottom.plusXY( 0, 5 );
        checkMarkProxy.centerTop = proxy.centerBottom.plusXY( 0, 5 );

        tryAgainTextProxy.centerX = wrongMarkProxy.centerX;
        tryAgainTextProxy.top = wrongMarkProxy.bottom + 5;
      } );
  }
}

numberPairs.register( 'NumberLineLevelNode', NumberLineLevelNode );