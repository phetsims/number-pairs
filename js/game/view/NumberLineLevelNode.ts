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
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import NumberLineOptionsCheckboxGroup from '../../common/view/NumberLineOptionsCheckboxGroup.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import GameModelConstants from '../model/GameModelConstants.js';
import Level from '../model/Level.js';
import NumberLineLevel from '../model/NumberLineLevel.js';
import { getEquationMissingProxy, layoutEquationFeedback } from './GameLayout.js';
import GameNumberEquationNode from './GameNumberEquationNode.js';
import GameNumberLineNode from './GameNumberLineNode.js';
import LevelNode, { LevelNodeOptions } from './LevelNode.js';
import NumberStyles from './NumberStyles.js';

type SelfOptions = EmptySelfOptions;
type NumberLineLevelNodeOptions = StrictOmit<LevelNodeOptions, 'countingAreaBackgroundColorProperty'>;

// constants
const CORNER_RADIUS = NumberPairsConstants.COUNTING_AREA_CORNER_RADIUS;

export default class NumberLineLevelNode extends LevelNode {

  public constructor( getLevel: ( levelNumber: number ) => Level,
                      level: NumberLineLevel,
                      layoutBounds: Bounds2,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      returnToSelection: () => void,
                      tandem: Tandem,
                      providedOptions?: LevelNodeOptions ) {

    const options = optionize<NumberLineLevelNodeOptions, SelfOptions, LevelNodeOptions>()( {
      countingAreaBackgroundColorProperty: NumberPairsColors.numberLineBackgroundColorProperty,
      countingAreaBounds: GameModelConstants.NUMBER_LINE_COUNTING_AREA_BOUNDS
    }, providedOptions );
    super( getLevel, level, layoutBounds, visibleBoundsProperty, returnToSelection, tandem, options );

    const equationNode = new GameNumberEquationNode( level, {
      center: this.numberModelCenter
    } );
    this.addChild( equationNode );

    // Create the number line and accompanying features
    const numberLineModel = {
      leftAddendProperty: new NumberProperty( 0 ),
      numberLineSliderEnabledRangeProperty: new Property( new Range( 0, 20 ) ),
      tickValuesVisibleProperty: level.tickValuesVisibleProperty,
      rightAddendProperty: new NumberProperty( 0 ),
      totalProperty: new NumberProperty( 0 ),
      totalJumpVisibleProperty: new BooleanProperty( false ),
      numberLineCountFromZeroProperty: new BooleanProperty( true ),
      numberLineAddendValuesVisibleProperty: level.numberLineAddendsVisibleProperty
    } as const;

    // On the number line level, the challenge is always missing an addend.
    const missingAddendProperty = level.challengeProperty.derived( challenge => challenge.missingComponent as 'a' | 'b' );
    const feedbackStyleProperty = level.modeProperty.derived( mode => NumberStyles.FEEDBACK_STYLES[ mode ] );

    //REVIEW Document what's going on here.
    Multilink.multilink( [ level.challengeProperty, level.selectedGuessProperty ], ( challenge, guess ) => {
      const numericGuess = guess ?? 0;

      if ( challenge.missingComponent === 'a' ) {
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

    //REVIEW Move clipShape instantiation closer to where it's used, just before the clipAreaNode is created.
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

    // In z-order, "sandwich" the content between the background and the border so the content doesn't "bleed" across the border.
    const border = new Path( clipShape, {
      stroke: 'gray',
      lineWidth: 1
    } );

    // Checkbox group for showing/hiding addends and tick numbers
    const checkboxXOffset = NumberPairsConstants.CHECKBOX_LABEL_OPTIONS.maxWidth +
                            NumberPairsConstants.COUNTING_AREA_INNER_MARGIN +
                            NumberLineOptionsCheckboxGroup.CHECKBOX_OPTIONS.boxWidth +
                            NumberLineOptionsCheckboxGroup.CHECKBOX_OPTIONS.spacing;
    const checkboxGroup = new NumberLineOptionsCheckboxGroup( level.numberLineAddendsVisibleProperty,
      numberLineModel.leftAddendProperty, numberLineModel.rightAddendProperty, level.tickValuesVisibleProperty,
      {
        phetioFeatured: true,
        top: this.countingAreaBounds.top + NumberPairsConstants.COUNTING_AREA_INNER_MARGIN,
        left: this.countingAreaBounds.right - checkboxXOffset,
        visibleProperty: level.addendsVisibleProperty,
        tandem: tandem.createTandem( 'checkboxGroup' )
      } );

    // layout feedback when the equation or bounds of the feedback change
    ManualConstraint.create( this, [
        this.wrongMark, this.correctMark, this.tryAgainText, equationNode.leftAddendSquare,
        equationNode.rightAddendSquare, equationNode.totalSquare ],
      ( wrongMarkProxy, correctMarkProxy, tryAgainTextProxy, equationLeftProxy, equationRightProxy, equationTopProxy ) => {
        const equationTargetProxy = getEquationMissingProxy( equationNode, equationLeftProxy, equationRightProxy, equationTopProxy );
        layoutEquationFeedback( equationTargetProxy, wrongMarkProxy, correctMarkProxy, tryAgainTextProxy, 5, 5 );
      } );

    // Control via the number buttons only
    numberLineNode.slider.focusable = false;

    this.accessibleAnswerSectionNode.pdomOrder = [
      this.checkButton,
      this.nextButton
    ];

    // The PDOM has a "challenge supports" section, containing the counting area and other elements that help
    // the player respond to the challenge.
    const challengeSupportsSection = new Node( {
      accessibleHeading: NumberPairsFluent.a11y.gameScreen.challengeSupports.accessibleHeadingStringProperty,
      tagName: 'div',
      children: [
        this.countingAreaNode,
        clipAreaNode,
        border,
        checkboxGroup,
        this.challengeResetButton
      ],
      pdomOrder: [
        numberLineNode,
        checkboxGroup,
        this.countingAreaNode,
        this.challengeResetButton
      ]
    } );
    this.addChild( challengeSupportsSection );

    this.accessibleChallengeSectionNode.pdomOrder = [
      this.visualPromptSection,
      this.countingAreaSection,
      challengeSupportsSection,
      this.answerButtonGroup
    ];

    this.accessibleStatusSectionNode.pdomOrder = [
      this.statusBar
    ];
  }
}

numberPairs.register( 'NumberLineLevelNode', NumberLineLevelNode );
