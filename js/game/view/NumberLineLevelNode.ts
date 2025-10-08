// Copyright 2025, University of Colorado Boulder

/**
 * NumberLineLevelNode is a LevelNode that shows a number line representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import derived from '../../../../axon/js/derived.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import Shape from '../../../../kite/js/Shape.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import AddendEyeToggleButton from '../../common/view/AddendEyeToggleButton.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import NumberLineLevel from '../model/NumberLineLevel.js';
import { getEquationMissingProxy, layoutCheckAndNextButtons, layoutEquationFeedbackMarks, layoutTryAgainLabel } from './GameLayout.js';
import GameNumberEquationNode from './GameNumberEquationNode.js';
import GameNumberLineNode from './GameNumberLineNode.js';
import LevelNode, { LevelNodeOptions } from './LevelNode.js';
import NumberStyles from './NumberStyles.js';

export default class NumberLineLevelNode extends LevelNode {

  public constructor( model: GameModel,
                      level: NumberLineLevel,
                      layoutBounds: Bounds2,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      returnToSelection: () => void,
                      tandem: Tandem,
                      providedOptions?: LevelNodeOptions ) {

    super( model, level, layoutBounds, visibleBoundsProperty, returnToSelection, tandem, providedOptions );

    const equationNode = new GameNumberEquationNode( level );
    this.addChild( equationNode );

    const numberLineModel = {
      leftAddendProperty: new NumberProperty( 0 ),
      numberLineSliderEnabledRangeProperty: new Property( new Range( 0, 20 ) ),
      tickValuesVisibleProperty: level.showTickNumbersProperty,
      rightAddendProperty: new NumberProperty( 0 ),
      totalProperty: new NumberProperty( 0 ),
      totalJumpVisibleProperty: new BooleanProperty( false ),
      numberLineCountFromZeroProperty: new BooleanProperty( true ),
      numberLineAddendValuesVisibleProperty: level.showAddendsProperty
    } as const;

    // On the number line level, the challenge is always missing an addend.
    const missingAddendProperty = derived( level.challengeProperty, challenge => challenge.missing as 'a' | 'b' );
    const feedbackStyleProperty = derived( level.modeProperty, mode => NumberStyles.FEEDBACK_STYLES[ mode ] );

    Multilink.multilink( [ level.challengeProperty, level.selectedGuessProperty ], ( challenge, guess ) => {
      const numericGuess = guess ?? 0;

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

    const CORNER_RADIUS = 5;
    const clipShape = Shape.roundedRectangleWithRadii( 0, 0, layoutBounds.width - 120, 300, {
      topLeft: CORNER_RADIUS, topRight: CORNER_RADIUS, bottomLeft: CORNER_RADIUS, bottomRight: CORNER_RADIUS
    } );

    const countingAreaNode = new Path( clipShape, {
      fill: '#e9e9f3',
      left: 10,
      bottom: layoutBounds.bottom - 10,
      clipArea: clipShape
    } );
    this.addChild( countingAreaNode );

    const numberLineVisibleProperty = level.numberLineVisibleProperty;

    const numberLineNode = new GameNumberLineNode( numberLineModel, layoutBounds.width - 200, missingAddendProperty, feedbackStyleProperty, {
      tandem: tandem.createTandem( 'numberLineNode' ),
      numberLineRange: new Range( 0, 20 ),
      bottom: countingAreaNode.height - 20,
      centerX: countingAreaNode.width / 2
    } );
    numberLineNode.slider.pickable = false;
    numberLineNode.slider.thumbNode.visible = false;
    countingAreaNode.addChild( numberLineNode );

    numberLineVisibleProperty.link( visible => {
      numberLineNode.visible = visible;
    } );

    const clipBounds = clipShape.bounds;
    const hiddenNumberLineText = new Text( '?', {
      font: new PhetFont( 80 ),
      centerX: clipBounds.width / 2,
      centerY: clipBounds.height / 2,
      visibleProperty: derived( numberLineVisibleProperty, visible => !visible )
    } );
    countingAreaNode.addChild( hiddenNumberLineText );

    // In z-order, "sandwich" the content between the background and the border so the content doesn't "bleed" across the border.
    const border = new Path( clipShape, {
      stroke: 'gray',
      lineWidth: 1,
      x: countingAreaNode.x,
      y: countingAreaNode.y
    } );
    this.addChild( border );

    const numberLineEyeToggleButton = new AddendEyeToggleButton( numberLineVisibleProperty, {
      tandem: tandem.createTandem( 'numberLineEyeToggleButton' ),
      left: 10,
      bottom: countingAreaNode.height - 10
    } );
    countingAreaNode.addChild( numberLineEyeToggleButton );

    const checkboxGroup = new VerticalCheckboxGroup( [ {
      property: level.showAddendsProperty,
      createNode: () => new Text( 'Addends', {
        font: new PhetFont( 18 )
      } ),
      tandemName: 'showAddendsCheckbox'
    }, {
      property: level.showTickNumbersProperty,
      createNode: () => new Text( 'Tick Numbers', {
        font: new PhetFont( 18 )
      } ),
      tandemName: 'showTickNumbersCheckbox'
    } ], {
      phetioFeatured: true,
      top: 10,
      right: countingAreaNode.width - 10,
      visibleProperty: numberLineVisibleProperty,
      tandem: tandem.createTandem( 'checkboxGroup' )
    } );

    this.challengeResetButton.right = countingAreaNode.right - 10;
    this.challengeResetButton.bottom = countingAreaNode.bottom - 10;
    this.challengeResetButton.moveToFront();
    countingAreaNode.addChild( checkboxGroup );

    ManualConstraint.create( this, [
        equationNode, this.wrongMark, this.checkMark, this.tryAgainText,
        equationNode.leftAddendSquare, equationNode.rightAddendSquare, equationNode.totalSquare, this.checkButton, this.nextButton ],
      ( equationNodeProxy, wrongMarkProxy, checkMarkProxy, tryAgainTextProxy,
        equationLeftProxy, equationRightProxy, equationTopProxy, checkButtonProxy, nextButtonProxy ) => {

        equationNodeProxy.center = layoutBounds.center.plusXY( -40, -100 );

        const equationTargetProxy = getEquationMissingProxy( equationNode, equationLeftProxy, equationRightProxy, equationTopProxy );
        layoutEquationFeedbackMarks( equationTargetProxy, wrongMarkProxy, checkMarkProxy, 5, 5 );

        layoutTryAgainLabel( wrongMarkProxy, tryAgainTextProxy, 5 );

        layoutCheckAndNextButtons( layoutBounds, equationNodeProxy, checkButtonProxy, nextButtonProxy );
      } );
  }
}

numberPairs.register( 'NumberLineLevelNode', NumberLineLevelNode );
