// Copyright 2025, University of Colorado Boulder

/**
 * CountingAreaLevelNode is a LevelNode that includes a counting area.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import derived from '../../../../axon/js/derived.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberPairsPreferences, { NumberModelType } from '../../common/model/NumberPairsPreferences.js';
import NumberPairsColors from '../../common/NumberPairsColors.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import ClickToDeselectKittensPressListener from '../../common/view/ClickToDeselectKittensPressListener.js';
import KittensLayerNode from '../../common/view/KittensLayerNode.js';
import TenFrameButton from '../../common/view/TenFrameButton.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import Level from '../model/Level.js';
import LevelNode, { LevelNodeOptions } from './LevelNode.js';


type CountingAreaLevelNodeOptions = StrictOmit<LevelNodeOptions, 'countingAreaBackgroundColorProperty'>;

export default abstract class CountingAreaLevelNode extends LevelNode {
  protected readonly kittensLayerNode: KittensLayerNode;
  protected readonly tenFrameButton: TenFrameButton;

  protected constructor( getLevel: ( levelNumber: number ) => Level,
                         level: Level,
                         layoutBounds: Bounds2,
                         visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                         returnToSelection: () => void,
                         tandem: Tandem,
                         providedOptions?: LevelNodeOptions ) {

    const options = optionize<CountingAreaLevelNodeOptions, EmptySelfOptions, LevelNodeOptions>()( {
      countingAreaBackgroundColorProperty: NumberPairsColors.attributeSumColorProperty
    }, providedOptions );

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

    const challengeSupportsSection = new Node( {
      accessibleHeading: NumberPairsFluent.a11y.gameScreen.challengeSupports.accessibleHeadingStringProperty,
      tagName: 'div',
      children: [
        this.countingAreaNode,
        this.kittensLayerNode,
        this.tenFrameButton,
        this.challengeResetButton
      ],
      pdomOrder: [
        this.kittensLayerNode,
        this.tenFrameButton,
        this.countingAreaNode,
        this.challengeResetButton
      ]
    } );
    const promptSection = new Node( {
      tagName: 'div',
      accessibleHeading: 'Challenge Prompt',
      children: [
        new Node( {
          tagName: 'div',
          accessibleParagraph: level.accessibleChallengePromptProperty
        } )
      ]
    } );
    this.addChild( promptSection );

    // Listen for total even though the value is not used, due to listener order dependencies, make sure we updated when everything settled.
    // TODO: Duplicated with NumberBondAccordionBox, see https://github.com/phetsims/number-pairs/issues/351
    const leftAddendProperty = level.challengeProperty.derived( challenge => challenge.a );
    const rightAddendProperty = level.challengeProperty.derived( challenge => challenge.b );
    const totalProperty = level.challengeProperty.derived( challenge => challenge.y );
    const proportionsStringProperty = new DerivedProperty( [ leftAddendProperty, rightAddendProperty, totalProperty,
        NumberPairsFluent.a11y.controls.numberModel.largerAndSmallerStringProperty,
        NumberPairsFluent.a11y.controls.numberModel.smallerAndLargerStringProperty,
        NumberPairsFluent.a11y.controls.numberModel.equalStringProperty ],
      ( left, right, total, largerAndSmaller, smallerAndLarger, equal ) => {
        return left === right ? equal : left > right ? largerAndSmaller : smallerAndLarger;
      } );

    const numberBondSection = new Node( {
      tagName: 'div',
      accessibleHeading: derived(
        NumberPairsPreferences.numberModelTypeProperty,
        NumberPairsFluent.numberBondStringProperty,
        NumberPairsFluent.barModelStringProperty, ( numberModelType, numberBondString, barModelString ) => {
          return level.type === 'decompositionEquation' || level.type === 'sumEquation' ? NumberPairsFluent.equationStringProperty.value :
                 numberModelType === NumberModelType.NUMBER_BOND_MODEL ? numberBondString : barModelString;
        } ),
      children: [
        new Node( {
          tagName: 'div',
          accessibleParagraph: NumberPairsFluent.a11y.controls.numberModel.currentNumberBondOrBarStateAccessibleParagraph.createProperty( {
            barOrBondOrEquation: NumberPairsPreferences.numberModelTypeProperty.derived( numberModelType => {
              return level.type === 'decompositionEquation' ? 'decompositionEquation' :
                     level.type === 'sumEquation' ? 'sumEquation' :
                     numberModelType.id;
            } ),
            proportions: proportionsStringProperty,
            screenType: 'other',
            totalView: 'shown', // unused

            // TODO: Listen to ? and translate it, and listen to selectedGuessProperty changes, see https://github.com/phetsims/number-pairs/issues/351
            // TODO: Does question mark get pronounced correctly?, see https://github.com/phetsims/number-pairs/issues/351
            // TODO: Hit Check to submit answer. appears in number bond but not the others, see https://github.com/phetsims/number-pairs/issues/351
            left: derived( level.challengeProperty, level.selectedGuessProperty, ( challenge, selectedGuess ) => challenge.missing === 'a' ? selectedGuess === null ? '?' : selectedGuess : challenge.a ),
            right: derived( level.challengeProperty, level.selectedGuessProperty, ( challenge, selectedGuess ) => challenge.missing === 'b' ? selectedGuess === null ? '?' : selectedGuess : challenge.b ),
            total: derived( level.challengeProperty, level.selectedGuessProperty, ( challenge, selectedGuess ) => challenge.missing === 'y' ? selectedGuess === null ? '?' : selectedGuess : challenge.y )
          } )
        } )
      ]
    } );
    this.addChild( numberBondSection );

    const countingAreaSection = new Node( {
      tagName: 'div',
      accessibleHeading: 'Counting Area', // TODO: a11y, see https://github.com/phetsims/number-pairs/issues/351
      children: [
        new Node( {
          tagName: 'div',
          accessibleParagraph: NumberPairsFluent.a11y.gameScreen.countingArea.accessibleParagraph.createProperty( {
            leftAddend: level.countingObjectsDelegate.leftAddendProperty,
            rightAddend: level.countingObjectsDelegate.rightAddendProperty,
            type: 'kittens',
            visible: 'none', // TODO: unused, see https://github.com/phetsims/number-pairs/issues/351
            guess: 3 // TODO: unused, see https://github.com/phetsims/number-pairs/issues/351
          } )
        } )
      ]
    } );
    this.addChild( countingAreaSection );

    this.addChild( challengeSupportsSection );
    this.accessibleChallengeSectionNode.pdomOrder = [
      promptSection,
      numberBondSection,
      countingAreaSection,
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
