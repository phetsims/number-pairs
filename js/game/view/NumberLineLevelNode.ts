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
import Shape from '../../../../kite/js/Shape.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import { createAddendsCheckboxItem, createTickNumbersCheckboxItem } from '../../common/view/NumberLineCheckboxItems.js';
import numberPairs from '../../numberPairs.js';
import GameModel from '../model/GameModel.js';
import GameModelConstants from '../model/GameModelConstants.js';
import NumberLineLevel from '../model/NumberLineLevel.js';
import { getEquationMissingProxy, layoutEquationFeedback } from './GameLayout.js';
import GameNumberEquationNode from './GameNumberEquationNode.js';
import GameNumberLineNode from './GameNumberLineNode.js';
import LevelNode, { LevelNodeOptions } from './LevelNode.js';
import NumberStyles from './NumberStyles.js';

type NumberLineLevelNodeOptions = StrictOmit<LevelNodeOptions, 'countingAreaBackgroundColorProperty'>;

// constants
const CORNER_RADIUS = NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS;

export default class NumberLineLevelNode extends LevelNode {

  public constructor( model: GameModel,
                      level: NumberLineLevel,
                      layoutBounds: Bounds2,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      returnToSelection: () => void,
                      tandem: Tandem,
                      providedOptions?: LevelNodeOptions ) {

    const options = optionize<NumberLineLevelNodeOptions, EmptySelfOptions, LevelNodeOptions>()( {
      countingAreaBackgroundColorProperty: NumberPairsColors.gameNumberLineBackgroundColorProperty,
      countingAreaBounds: GameModelConstants.NUMBER_LINE_COUNTING_AREA_BOUNDS
    }, providedOptions );
    super( model, level, layoutBounds, visibleBoundsProperty, returnToSelection, tandem, options );

    const equationNode = new GameNumberEquationNode( level, {
      center: this.numberModelCenter
    } );
    this.addChild( equationNode );

    // Create the number line and accompanying features
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
    const missingAddendProperty = level.challengeProperty.derived( challenge => challenge.missing as 'a' | 'b' );
    const feedbackStyleProperty = level.modeProperty.derived( mode => NumberStyles.FEEDBACK_STYLES[ mode ] );

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

    // Create a clip area to cut off guesses that may draw arrows and lines outside the counting area.
    const clipShape = Shape.boundsOffsetWithRadii( this.countingAreaBounds,
      { left: 0, bottom: 0, right: 0, top: 0 },
      {
        topLeft: CORNER_RADIUS,
        topRight: CORNER_RADIUS,
        bottomRight: CORNER_RADIUS,
        bottomLeft: CORNER_RADIUS
      } );

    const numberLineNode = new GameNumberLineNode( numberLineModel,
      this.countingAreaBounds.width - NumberPairsConstants.NUMBER_LINE_X_MARGIN,
      missingAddendProperty, feedbackStyleProperty, {
        tandem: tandem.createTandem( 'numberLineNode' ),
        numberLineRange: new Range( 0, 20 ),
        centerX: this.countingAreaBounds.centerX,
        bottom: this.countingAreaBounds.bottom - 50,
        visibleProperty: level.addendsVisibleProperty
      } );
    numberLineNode.slider.pickable = false;
    numberLineNode.slider.thumbNode.visible = false;
    const clipAreaNode = new Path( clipShape, {
      children: [ numberLineNode ],
      clipArea: clipShape
    } );
    this.addChild( clipAreaNode );

    // In z-order, "sandwich" the content between the background and the border so the content doesn't "bleed" across the border.
    const border = new Path( clipShape, {
      stroke: 'gray',
      lineWidth: 1
    } );
    this.addChild( border );

    // Checkbox group for showing/hiding addends and tick numbers
    const checkboxGroup = new VerticalCheckboxGroup( [
      createAddendsCheckboxItem( {
        property: level.showAddendsProperty,
        textOptions: {
          font: new PhetFont( 18 )
        },
        leftAddendProperty: numberLineModel.leftAddendProperty,
        rightAddendProperty: numberLineModel.rightAddendProperty
      } ),
      createTickNumbersCheckboxItem( {
        property: level.showTickNumbersProperty,
        textOptions: {
          font: new PhetFont( 18 )
        }
      } )
    ], {
      phetioFeatured: true,
      top: this.countingAreaBounds.top + NumberPairsConstants.COUNTING_AREA_INNER_MARGIN,
      right: this.countingAreaBounds.right - NumberPairsConstants.COUNTING_AREA_INNER_MARGIN,
      visibleProperty: level.addendsVisibleProperty,
      tandem: tandem.createTandem( 'checkboxGroup' )
    } );
    this.addChild( checkboxGroup );

    // layout feedback when the equation or bounds of the feedback change
    ManualConstraint.create( this, [
        this.wrongMark, this.checkMark, this.tryAgainText, equationNode.leftAddendSquare,
        equationNode.rightAddendSquare, equationNode.totalSquare ],
      ( wrongMarkProxy, checkMarkProxy, tryAgainTextProxy, equationLeftProxy, equationRightProxy, equationTopProxy ) => {
        const equationTargetProxy = getEquationMissingProxy( equationNode, equationLeftProxy, equationRightProxy, equationTopProxy );
        layoutEquationFeedback( equationTargetProxy, wrongMarkProxy, checkMarkProxy, tryAgainTextProxy, 5, 5 );
      } );

    // Control via the number buttons only
    numberLineNode.slider.focusable = false;

    this.accessibleAnswerSectionNode.pdomOrder = [
      this.checkButton,
      this.nextButton
    ];

    this.accessibleChallengeSectionNode.pdomOrder = [
      this.countingAreaNode,
      numberLineNode,
      checkboxGroup,
      this.challengeResetButton,
      this.answerButtonGroup
    ];

    this.accessibleStatusSectionNode.pdomOrder = [
      this.statusBar
    ];
  }
}

numberPairs.register( 'NumberLineLevelNode', NumberLineLevelNode );
