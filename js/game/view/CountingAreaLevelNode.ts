// Copyright 2025, University of Colorado Boulder

//REVIEW Is this a counting area with kittens only?
/**
 * CountingAreaLevelNode is a LevelNode that includes a counting area.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import ClickToDeselectKittensPressListener from '../../common/view/ClickToDeselectKittensPressListener.js';
import KittensLayerNode from '../../common/view/KittensLayerNode.js';
import TenFrameButton from '../../common/view/TenFrameButton.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import Level from '../model/Level.js';
import LevelNode, { LevelNodeOptions } from './LevelNode.js';

type SelfOptions = EmptySelfOptions;
export type CountingAreaLevelNodeOptions = StrictOmit<LevelNodeOptions, 'countingAreaBackgroundColorProperty'> &
  PickRequired<LevelNodeOptions, 'tandem'>;

export default abstract class CountingAreaLevelNode extends LevelNode {
  protected readonly kittensLayerNode: KittensLayerNode;
  protected readonly tenFrameButton: TenFrameButton;

  protected constructor( getLevel: ( levelNumber: number ) => Level,
                         level: Level,
                         layoutBounds: Bounds2,
                         visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                         visualPromptNodes: Node[],
                         returnToSelection: () => void,
                         providedOptions: CountingAreaLevelNodeOptions ) {

    const options = optionize<CountingAreaLevelNodeOptions, SelfOptions, LevelNodeOptions>()( {
      countingAreaBackgroundColorProperty: NumberPairsColors.attributeSumColorProperty
    }, providedOptions );
    const tandem = options.tandem;
    super( getLevel, level, layoutBounds, visibleBoundsProperty, returnToSelection, tandem, options );

    this.kittensLayerNode = new KittensLayerNode( level.countingObjectsDelegate.countingObjects, this.countingAreaNode, {
      tandem: tandem.createTandem( 'kittensLayerNode' ),
      includeKittenAttributeSwitch: false,
      visibleProperty: level.addendsVisibleProperty
    } );

    this.tenFrameButton = new TenFrameButton( {
      tandem: tandem.createTandem( 'tenFrameButton' ),
      left: layoutBounds.left + NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      top: this.countingAreaBounds.top,
      listener: () => {
        this.interruptSubtreeInput();
        level.deselectAllKittens();
        level.organizeIntoTenFrame();
      },
      accessibleName: NumberPairsFluent.a11y.controls.tenFrameButton.accessibleName.createProperty( {
        representation: level.representationTypeProperty.value.accessibleName
      } ),
      accessibleContextResponse: level.levelNumber === 4 || level.levelNumber === 7 ?
                                 NumberPairsFluent.a11y.controls.tenFrameButton.accessibleContextResponseGameCombinedStringProperty :
                                 NumberPairsFluent.a11y.controls.tenFrameButton.accessibleContextResponseGameSeparateStringProperty,
      accessibleHelpText: NumberPairsFluent.a11y.gameScreen.tenFrameButton.accessibleHelpTextStringProperty
    } );

    this.addChild( this.kittensLayerNode );
    this.addChild( this.tenFrameButton );

    // If the user clicks outside the kittens, then remove focus from all the counting objects.
    this.addInputListener( new ClickToDeselectKittensPressListener( this.kittensLayerNode ) );

    this.accessibleAnswerSectionNode.pdomOrder = [
      this.checkButton,
      this.nextButton
    ];

    // The PDOM provides a "Challenge Supports" section that contains the kittens, ten-frame button, eye toggle button,
    // and reset button, which support the user in solving the challenge.
    const challengeSupportsSection = new Node( {
      accessibleHeading: NumberPairsFluent.a11y.gameScreen.challengeSupports.accessibleHeadingStringProperty,
      tagName: 'div',
      children: [
        this.kittensLayerNode,
        this.tenFrameButton,
        this.challengeResetButton
      ],
      pdomOrder: [
        this.kittensLayerNode,
        this.tenFrameButton,
        this.countingAreaNode.bothAddendsEyeToggleButton, // pull the eye toggle out into the challenge supports section
        this.challengeResetButton
      ]
    } );

    this.addChild( challengeSupportsSection );

    this.accessibleChallengeSectionNode.pdomOrder = [
      ...visualPromptNodes,
      this.countingAreaNode,
      challengeSupportsSection,
      this.answerButtonGroup
    ];

    this.accessibleStatusSectionNode.pdomOrder = [
      this.statusBar
    ];

    // Update the pdom order for the kitten representation.
    Multilink.multilink( [ level.selectedGuessProperty, level.challengeProperty ], () => {
      const leftAddendObjects = level.countingObjectsDelegate.leftAddendCountingObjectsProperty.value;
      const rightAddendObjects = level.countingObjectsDelegate.rightAddendCountingObjectsProperty.value;
      const leftAddendKittenNodes = leftAddendObjects.map( countingObject => this.kittensLayerNode.kittenNodes.find( kittenNode => kittenNode.countingObject === countingObject )! );
      const rightAddendKittenNodes = rightAddendObjects.map( countingObject => this.kittensLayerNode.kittenNodes.find( kittenNode => kittenNode.countingObject === countingObject )! );
      this.kittensLayerNode.kittenPDOMOrderProperty.value = leftAddendKittenNodes.concat( rightAddendKittenNodes );
    } );
  }
}

numberPairs.register( 'CountingAreaLevelNode', CountingAreaLevelNode );
