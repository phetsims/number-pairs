// Copyright 2024-2025, University of Colorado Boulder
/**
 * The base screen view for the Intro, Ten, Twenty, and Sum Screens in the Number Pairs simulation.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import derived from '../../../../axon/js/derived.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import GatedVisibleProperty from '../../../../axon/js/GatedVisibleProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import LocaleSwitch from '../../../../number-suite-common/js/common/view/LocaleSwitch.js';
import SpeechSynthesisControl from '../../../../number-suite-common/js/common/view/SpeechSynthesisControl.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize from '../../../../phet-core/js/optionize.js';
import platform from '../../../../phet-core/js/platform.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import CountingObject from '../model/CountingObject.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsPreferences from '../model/NumberPairsPreferences.js';
import { NumberPairsUtils } from '../model/NumberPairsUtils.js';
import RepresentationType from '../model/RepresentationType.js';
import NumberPairsColors from '../NumberPairsColors.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import BeadsOnWireNode from './BeadsOnWireNode.js';
import ClickToDeselectKittensPressListener from './ClickToDeselectKittensPressListener.js';
import CommutativeButton from './CommutativeButton.js';
import CountingAreaNode from './CountingAreaNode.js';
import CountingAreaDescriptionNode from './description/CountingAreaDescriptionNode.js';
import KittensLayerNode from './KittensLayerNode.js';
import LocationCountingObjectsLayerNode from './LocationCountingObjectsLayerNode.js';
import NumberLineIcon from './NumberLineIcon.js';
import NumberLineNode from './NumberLineNode.js';
import NumberLineOptionsCheckboxGroup from './NumberLineOptionsCheckboxGroup.js';
import numberPairsSpeechSynthesisAnnouncer from './numberPairsSpeechSynthesisAnnouncer.js';
import numberPairsUtteranceQueue from './numberPairsUtteranceQueue.js';
import RepresentationRadioButtonGroup from './RepresentationRadioButtonGroup.js';
import SceneSelectionRadioButtonGroup from './SceneSelectionRadioButtonGroup.js';
import TenFrameButton from './TenFrameButton.js';

type SelfOptions = {
  phraseAccordionBox: AccordionBox;
  numberBondAccordionBox: AccordionBox;
  equationAccordionBox?: AccordionBox | null;
  sceneRange?: Range | null;
  sumScreen?: boolean;
};
export type NumberPairsScreenViewOptions = SelfOptions & PickRequired<ScreenViewOptions, 'tandem'> &
  StrictOmit<ScreenViewOptions, 'children'>;

const COUNTING_AREA_Y_MARGIN = NumberPairsConstants.COUNTING_AREA_Y_MARGIN;
const COUNTING_AREA_BOUNDS = NumberPairsConstants.COUNTING_AREA_BOUNDS;

export default class NumberPairsScreenView extends ScreenView {
  private recursionDepth = 0;
  protected readonly resetAllButton: Node;
  protected readonly countingAreaButtonsVBox: Node;
  protected readonly numberLineCheckboxGroup: Node | undefined;
  private readonly resetAccordionBoxes: () => void;

  // For pdom order.
  protected readonly countingAreaNodes: Node[] = [];
  protected readonly representationRadioButtonGroup: Node;
  protected readonly controlNodes: Node[] = [];
  protected readonly countingAreaDescriptionNode: CountingAreaDescriptionNode;

  // Make available for core description, see https://github.com/phetsims/number-pairs/issues/206
  public readonly countingAreaNode: CountingAreaNode;

  public constructor( model: NumberPairsModel, providedOptions: NumberPairsScreenViewOptions ) {

    // Create the radio buttons that live below the counting area and determine which representation is shown.
    const representationRadioButtonGroup = new RepresentationRadioButtonGroup( model.representationTypeProperty, {
      tandem: providedOptions.tandem.createTandem( 'representationRadioButtonGroup' )
    } );

    const options = optionize<NumberPairsScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
      equationAccordionBox: null,
      sceneRange: null,
      sumScreen: false,
      children: [ representationRadioButtonGroup ]
    }, providedOptions );
    super( options );
    this.representationRadioButtonGroup = representationRadioButtonGroup;

    const numberLineRepresentationVisibleProperty = DerivedProperty.valueEqualsConstant(
      model.representationTypeProperty,
      RepresentationType.NUMBER_LINE
    );

    const countingRepresentationsVisibleProperty = DerivedProperty.and( [
      model.leftAddendVisibleProperty,
      model.rightAddendVisibleProperty
    ] );

    const numberLineContentVisibleProperty = DerivedProperty.and( [
      numberLineRepresentationVisibleProperty,
      countingRepresentationsVisibleProperty
    ] );

    // Create the CountingAreaDescriptionNode that will contain all counting representations for proper PDOM structure
    const countingAreaDescriptionNode = new CountingAreaDescriptionNode( model, numberLineRepresentationVisibleProperty,
      numberLineContentVisibleProperty,
      { tandem: options.tandem.createTandem( 'countingAreaDescriptionNode' ) } );
    this.countingAreaDescriptionNode = countingAreaDescriptionNode;

    /**
     * Set the layout of the accordion boxes along the top of each screen.
     */
    const phraseVBox = new VBox( {
      children: [ options.phraseAccordionBox ],
      spacing: 5,
      align: 'left'
    } );
    const phraseAlignBox = new AlignBox( phraseVBox, {
      alignBounds: this.layoutBounds,
      yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      xMargin: NumberPairsConstants.COUNTING_AREA_X_MARGIN,
      yAlign: 'top',
      xAlign: 'left'
    } );
    const numberBondAlignBox = new AlignBox( options.numberBondAccordionBox, {
      alignBounds: this.layoutBounds,
      yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      xMargin: NumberPairsConstants.COUNTING_AREA_X_MARGIN,
      yAlign: 'top',
      xAlign: 'center'
    } );
    this.addChild( phraseAlignBox );
    this.addChild( numberBondAlignBox );

    if ( options.equationAccordionBox ) {
      const equationAlignBox = new AlignBox( options.equationAccordionBox, {
        alignBounds: this.layoutBounds,
        yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
        xMargin: NumberPairsConstants.COUNTING_AREA_X_MARGIN,
        yAlign: 'top',
        xAlign: 'right'
      } );
      this.addChild( equationAlignBox );
      this.resetAccordionBoxes = () => {
        options.phraseAccordionBox.reset();
        options.numberBondAccordionBox.reset();
        options.equationAccordionBox!.reset();
      };
    }
    else {
      this.resetAccordionBoxes = () => {
        options.phraseAccordionBox.reset();
        options.numberBondAccordionBox.reset();
      };
    }

    this.resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( this.resetAllButton );

    /**
     * Create the buttons along the left edge of each screen
     */
    const speechSynthesisControl = new SpeechSynthesisControl( numberPairsSpeechSynthesisAnnouncer, numberPairsUtteranceQueue, {
      speechSynthesisButtonOptions: {
        accessibleName: NumberPairsFluent.a11y.controls.speechSynthesis.accessibleNameStringProperty,
        accessibleHelpText: NumberPairsFluent.a11y.controls.speechSynthesis.accessibleHelpTextStringProperty
      },
      noVoiceWarningButtonOptions: {
        accessibleName: NumberPairsFluent.a11y.controls.speechSynthesis.noVoiceAccessibleNameStringProperty,
        noVoiceWarningDialogOptions: {
          accessibleParagraph: NumberPairsFluent.a11y.controls.speechSynthesis.noVoiceAccessibleParagraphStringProperty
        }
      },
      x: this.layoutBounds.minX + NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      y: this.layoutBounds.minY + NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'speechSynthesisControl' )
    } );
    this.addChild( speechSynthesisControl );
    const localeSwitch = new LocaleSwitch( NumberPairsPreferences, numberPairsUtteranceQueue, 300, {
      accessibleHelpText: NumberPairsFluent.a11y.controls.localeSwitch.accessibleHelpTextStringProperty,
      tandem: options.tandem.createTandem( 'localeSwitch' ),
      phetioDocumentation: 'This control is only accessible when a second language is active.'
    } );
    phraseVBox.addChild( localeSwitch );

    // Ten Frame Button
    const tenFrameButtonTandem = options.tandem.createTandem( 'tenFrameButton' );
    const tenFrameButtonVisibleProperty = new GatedVisibleProperty( new DerivedProperty( [ model.representationTypeProperty ],
      countingRepresentation => countingRepresentation === RepresentationType.APPLES ||
                                countingRepresentation === RepresentationType.ONE_CARDS ||
                                countingRepresentation === RepresentationType.BUTTERFLIES ||
                                countingRepresentation === RepresentationType.SOCCER_BALLS ||
                                countingRepresentation === RepresentationType.KITTENS ||
                                countingRepresentation === RepresentationType.BEADS ), tenFrameButtonTandem );

    const representationTypeAccessibleNameProperty = new DynamicProperty<string, string, RepresentationType>( model.representationTypeProperty, {
      derive: representationType => representationType.accessibleName
    } );
    const tenFrameContextResponseProperty = NumberPairsFluent.a11y.controls.tenFrameButton.accessibleContextResponse.createProperty( {
      representationType: derived( model.representationTypeProperty, representationType =>
        representationType === RepresentationType.KITTENS ? 'kittens' :
        representationType === RepresentationType.BEADS ? 'beads' : 'other' ),
      distribution: options.sumScreen ? NumberPairsFluent.a11y.controls.tenFrameButton.sumDistributionStringProperty :
                    NumberPairsFluent.a11y.controls.tenFrameButton.decompositionDistributionStringProperty
    } );

    const buttonVBoxSpacing = 10;
    const tenFrameButton = new TenFrameButton( {
      accessibleName: NumberPairsFluent.a11y.controls.tenFrameButton.accessibleName.createProperty( {
        representation: representationTypeAccessibleNameProperty
      } ),
      accessibleHelpText: NumberPairsFluent.a11y.controls.tenFrameButton.accessibleHelpText.createProperty( {
        representation: representationTypeAccessibleNameProperty
      } ),
      accessibleContextResponse: tenFrameContextResponseProperty,
      tandem: tenFrameButtonTandem,
      touchAreaXDilation: buttonVBoxSpacing / 2,
      touchAreaYDilation: buttonVBoxSpacing / 2,
      listener: () => {
        this.interruptSubtreeInput();
        model.deselectAllKittens();
        if ( model.representationTypeProperty.value === RepresentationType.BEADS ) {
          model.organizeInGroupsOfFive();
        }
        else {
          const positionPropertyType = model.representationTypeProperty.value === RepresentationType.KITTENS ? 'attribute' : 'location';
          if ( options.sumScreen ) {

            // The sum screen organizes all the objects into one central ten frame.
            const sumTenFrameBounds = NumberPairsUtils.createCenteredTenFrameBounds( COUNTING_AREA_BOUNDS );
            model.organizeIntoSingleTenFrame( sumTenFrameBounds, model.leftAddendCountingObjectsProperty.value, model.rightAddendCountingObjectsProperty.value, positionPropertyType );
          }
          else {
            const splitTenFrameBounds = NumberPairsUtils.splitBoundsInHalf( COUNTING_AREA_BOUNDS );
            model.organizeIntoSplitTenFrame( splitTenFrameBounds, model.leftAddendCountingObjectsProperty.value, model.rightAddendCountingObjectsProperty.value, positionPropertyType );
          }
        }
      },
      visibleProperty: tenFrameButtonVisibleProperty
    } );

    // Commutative Button
    const commutativeButtonContextResponseProperty = NumberPairsFluent.a11y.controls.commutativeButton.accessibleContextResponse.createProperty( {
      representationType: derived( model.representationTypeProperty, representationType =>
        representationType === RepresentationType.KITTENS || representationType === RepresentationType.BEADS ?
        'attribute' : representationType === RepresentationType.NUMBER_LINE ? 'numberLine' : 'other' ),
      leftAddend: this.countingAreaDescriptionNode.leftValueStringProperty,
      rightAddend: this.countingAreaDescriptionNode.rightValueStringProperty
    } );

    const commutativeButton = new CommutativeButton( {
      accessibleName: NumberPairsFluent.a11y.controls.commutativeButton.accessibleNameStringProperty,
      accessibleHelpText: NumberPairsFluent.a11y.controls.commutativeButton.accessibleHelpTextStringProperty,
      touchAreaXDilation: buttonVBoxSpacing / 2,
      touchAreaYDilation: buttonVBoxSpacing / 2,
      listener: () => {
        model.deselectAllKittens();
        this.interruptSubtreeInput();
        model.swapAddends.bind( model )();
        this.addAccessibleContextResponse( commutativeButtonContextResponseProperty.value );
      },
      tandem: options.tandem.createTandem( 'commutativeButton' )
    } );
    this.countingAreaButtonsVBox = new VBox( {
      children: [ tenFrameButton, commutativeButton ],
      spacing: buttonVBoxSpacing,
      x: this.layoutBounds.minX + NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      y: COUNTING_AREA_BOUNDS.minY
    } );
    this.addChild( this.countingAreaButtonsVBox );

    /**
     * Create the counting area and accompanying features.
     */
    const countingAreaBackgroundColorProperty = new DerivedProperty( [ model.representationTypeProperty, model.totalColorProperty ], ( countingRepresentationType, totalColor ) => {
      if ( countingRepresentationType === RepresentationType.BEADS || countingRepresentationType === RepresentationType.NUMBER_LINE ) {
        return NumberPairsColors.numberLineBackgroundColorProperty;
      }
      else {
        return totalColor;
      }
    } );
    const countingAreaNode = new CountingAreaNode( model.bothAddendsVisibleProperty, model, {
      leftAddendVisibleProperty: model.leftAddendVisibleProperty,
      rightAddendVisibleProperty: model.rightAddendVisibleProperty,
      countingRepresentationTypeProperty: model.representationTypeProperty,
      backgroundColorProperty: countingAreaBackgroundColorProperty,
      tandem: options.tandem.createTandem( 'countingAreaNode' )
    } );
    this.addChild( countingAreaNode );

    this.countingAreaNode = countingAreaNode;
    this.countingAreaNodes.push( countingAreaNode );

    // All the location representations at least include One Cards
    if ( model.representationTypeProperty.validValues?.includes( RepresentationType.ONE_CARDS ) ) {

      const locationCountingObjectsLayerNode = new LocationCountingObjectsLayerNode( model, countingAreaNode, {
        visibleProperty: model.locationLayerVisibleProperty,
        tandem: options.tandem.createTandem( 'locationCountingObjectsLayerNode' )
      } );

      // Add as child of countingAreaDescriptionNode for proper PDOM structure
      countingAreaDescriptionNode.addChild( locationCountingObjectsLayerNode );
    }

    // Group all the non-location based counting representations into one Node. If either the leftAddendVisibleProperty
    // or rightAddendVisibleProperty is false, then none of the other counting representations should be visible.
    const countingRepresentationsLayer = new Node( {
      visibleProperty: countingRepresentationsVisibleProperty
    } );

    // Add as child of countingAreaDescriptionNode for proper PDOM structure
    countingAreaDescriptionNode.addChild( countingRepresentationsLayer );

    /**
     * Create the attribute based kitten node layer and accompanying features.
     */
    if ( model.representationTypeProperty.validValues?.includes( RepresentationType.KITTENS ) ) {
      const kittensLayerVisibleProperty = DerivedProperty.valueEqualsConstant( model.representationTypeProperty, RepresentationType.KITTENS );
      const kittensLayerNode = new KittensLayerNode( model.countingObjects, countingAreaNode, {
        visibleProperty: kittensLayerVisibleProperty,
        tandem: options.tandem.createTandem( 'kittensLayerNode' )
      } );

      // We only want to update the pdom order when we are in the kitten representation.
      // NOTE: This is similar to code in CountingAreaLevelNode
      Multilink.multilink( [ model.leftAddendCountingObjectsLengthProperty,
          model.rightAddendCountingObjectsLengthProperty, model.totalProperty, model.representationTypeProperty ],
        ( leftAddendLength, rightAddendLength, total, representationType ) => {
          if ( representationType === RepresentationType.KITTENS && leftAddendLength + rightAddendLength === total ) {
            const leftAddendObjects = model.leftAddendCountingObjectsProperty.value;
            const rightAddendObjects = model.rightAddendCountingObjectsProperty.value;
            const leftAddendKittenNodes = leftAddendObjects.map( countingObject => kittensLayerNode.kittenNodes
              .find( kittenNode => kittenNode.countingObject === countingObject )! );
            const rightAddendKittenNodes = rightAddendObjects.map( countingObject => kittensLayerNode.kittenNodes
              .find( kittenNode => kittenNode.countingObject === countingObject )! );
            kittensLayerNode.kittenPDOMOrderProperty.value = leftAddendKittenNodes.concat( rightAddendKittenNodes );
          }
        } );
      countingRepresentationsLayer.addChild( kittensLayerNode );

      // Design requested that the accessible help text for the kittens lives with the counting area description node.
      // This was because having accessible help text on each kitten made for a verbose experience with screen readers.
      kittensLayerVisibleProperty.link( visible => {
        countingAreaDescriptionNode.accessibleHelpText = visible ?
                                                         NumberPairsFluent.a11y.kittens.accessibleHelpText.createProperty( {
                                                           key: platform.keys.enterOrReturn
                                                         } ) :
                                                         '';
      } );

      // If the user clicks outside the kittens, then remove focus from all the counting objects.
      this.addInputListener( new ClickToDeselectKittensPressListener( kittensLayerNode ) );
    }

    /**
     * Create the number line and accompanying features.
     */
    if ( model.representationTypeProperty.validValues?.includes( RepresentationType.NUMBER_LINE ) ) {
      const numberLineNode = new NumberLineNode( model, COUNTING_AREA_BOUNDS.width - NumberPairsConstants.NUMBER_LINE_X_MARGIN, {
        visibleProperty: numberLineRepresentationVisibleProperty,
        numberLineRange: options.sceneRange?.max === NumberPairsConstants.TEN_TOTAL_RANGE.max ?
                         NumberPairsConstants.TEN_NUMBER_LINE_RANGE : NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE,
        tandem: options.tandem.createTandem( 'numberLineNode' )
      } );
      countingRepresentationsLayer.addChild( numberLineNode );

      numberLineNode.center = COUNTING_AREA_BOUNDS.center;

      // The x position of the numberline checkbox group is a combination of the maxwidth of the checkbox label, the dimension
      // of the radio buttons, and the size of the checkbox itself.
      const checkboxGroupMargin = SceneSelectionRadioButtonGroup.RADIO_BUTTON_DIMENSION + NumberPairsConstants.SCREEN_VIEW_X_MARGIN;
      const checkboxMaxWidth = NumberPairsConstants.CHECKBOX_LABEL_OPTIONS.maxWidth + NumberLineOptionsCheckboxGroup.CHECKBOX_OPTIONS.boxWidth + NumberLineOptionsCheckboxGroup.CHECKBOX_OPTIONS.spacing + 7;

      this.numberLineCheckboxGroup = new NumberLineOptionsCheckboxGroup( model.numberLineAddendValuesVisibleProperty,
        model.leftAddendProperty, model.rightAddendProperty, model.totalProperty, model.tickValuesVisibleProperty, {
          bottom: COUNTING_AREA_BOUNDS.top - NumberPairsConstants.COUNTING_AREA_CHECKBOX_MARGIN,
          left: this.layoutBounds.right - checkboxGroupMargin - checkboxMaxWidth,
          visibleProperty: numberLineRepresentationVisibleProperty,
          tandem: options.tandem.createTandem( 'numberLineCheckboxGroup' ),
          totalJumpVisibleProperty: model.totalJumpVisibleProperty
        } );
      this.addChild( this.numberLineCheckboxGroup );

      const iconWidth = 35;
      const iconValue = 1;
      const numberLineCountFromZeroSwitchTandem = options.tandem.createTandem( 'numberLineCountFromZeroSwitch' );
      const numberLineCountFromZeroSwitchVisibleProperty = new GatedVisibleProperty( numberLineRepresentationVisibleProperty,
        numberLineCountFromZeroSwitchTandem );
      const numberLineCountFromZeroSwitch = new ABSwitch(
        model.numberLineCountFromZeroProperty,
        false, new NumberLineIcon( iconWidth, iconValue, {
          rightArrowColorProperty: NumberPairsColors.unansweredColorProperty,
          showRightArrow: true
        } ),
        true, new NumberLineIcon( iconWidth, iconValue, {
          showLeftArrow: true,
          showRightArrow: true,
          leftArrowColorProperty: NumberPairsColors.unansweredColorProperty,
          rightArrowColorProperty: NumberPairsColors.unansweredColorProperty
        } ),
        {
          top: COUNTING_AREA_BOUNDS.bottom + COUNTING_AREA_Y_MARGIN,
          left: COUNTING_AREA_BOUNDS.left,
          visibleProperty: numberLineCountFromZeroSwitchVisibleProperty,
          valueAAccessibleName: NumberPairsFluent.a11y.controls.countFromZeroSwitch.valueAAccessibleNameStringProperty,
          valueBAccessibleName: NumberPairsFluent.a11y.controls.countFromZeroSwitch.valueBAccessibleNameStringProperty,
          accessibleHelpText: NumberPairsFluent.a11y.controls.countFromZeroSwitch.accessibleHelpTextStringProperty,
          toggleSwitchOptions: {
            size: new Dimension2( 36, 18 ),
            phetioEnabledPropertyInstrumented: false,
            phetioVisiblePropertyInstrumented: false
          },
          phetioDocumentation: 'This switch is only accessible in number line representations.',
          tandem: numberLineCountFromZeroSwitchTandem
        } );
      this.addChild( numberLineCountFromZeroSwitch );
      this.countingAreaNodes.push( numberLineCountFromZeroSwitch );

      // The desired pdom order is to start with the numberLineCheckboxGroup in the control area when applicable.
      // All other control area nodes are defined below.
      this.controlNodes.push( this.numberLineCheckboxGroup );
    }

    /**
     * Create the beads on wire representation and accompanying features.
     */
    if ( model.representationTypeProperty.validValues?.includes( RepresentationType.BEADS ) ) {
      const beadsVisibleProperty = DerivedProperty.valueEqualsConstant( model.representationTypeProperty, RepresentationType.BEADS );
      const sceneRange = options.sceneRange || NumberPairsConstants.TWENTY_TOTAL_RANGE;
      const beadsOnWireNode = new BeadsOnWireNode( model, COUNTING_AREA_BOUNDS, {
        sceneRange: sceneRange,
        sumScreen: options.sumScreen,
        visibleProperty: beadsVisibleProperty,
        tandem: options.tandem.createTandem( 'beadsOnWireNode' )
      } );
      countingRepresentationsLayer.addChild( beadsOnWireNode );

      beadsOnWireNode.center = COUNTING_AREA_BOUNDS.center;
    }
    this.addChild( countingAreaDescriptionNode );

    /**
     * Add in the rest of the nodes as part of the control area
     */
    this.controlNodes.push( speechSynthesisControl );
    this.controlNodes.push( phraseVBox );
    this.controlNodes.push( options.numberBondAccordionBox );
    options.equationAccordionBox && this.controlNodes.push( options.equationAccordionBox );

    // Position the counting representation radio buttons below the counting area.
    ManualConstraint.create( this, [ representationRadioButtonGroup ], radioButtonGroupProxy => {
      radioButtonGroupProxy.centerTop = new Vector2( COUNTING_AREA_BOUNDS.centerX, COUNTING_AREA_BOUNDS.maxY + COUNTING_AREA_Y_MARGIN );
    } );
  }

  /**
   * A recursive function that ensures that no two counting objects overlap.
   * @param positionProperties - An array of position properties that we want to check for overlaps.
   * @param validBounds - The bounds in which a position must stay within.
   * @param minWidthRatio - Define the minimum panel width ratio that we want positions to potentially move over.
   */
  protected handlePositionOverlap( positionProperties: Property<Vector2>[], validBounds: Bounds2, minWidthRatio: number ): CountingObject[] {
    this.recursionDepth += 1;
    affirm( this.recursionDepth < 100, 'infinite recursion detected' );

    // Our base case is when there is only one or zero counting objects left.
    // We also want to gracefully stop trying to handle overlap if we're stuck in an infinite recursion.
    if ( positionProperties.length <= 1 || this.recursionDepth > 100 ) {
      this.recursionDepth = 0;
      return [];
    }
    else {

      // keep track of the counting object we are currently on and it's position.
      const currentPositionProperty = positionProperties[ 0 ];
      const currentPosition = currentPositionProperty.value;
      const dropZoneBounds = NumberPairsConstants.GET_DROP_ZONE_BOUNDS( currentPosition );

      // Find any counting objects that may be overlapping and move them to a new position.
      const overlappingPositions = positionProperties.filter( positionProperty => dropZoneBounds.containsPoint( positionProperty.value ) );
      overlappingPositions.length > 1 && overlappingPositions.forEach( overlappingPosition => {
        overlappingPosition.value = CountingAreaNode.getNearbyEmptyPoint( currentPosition, overlappingPosition.value, validBounds, minWidthRatio );
      } );

      // If there was only one overlapping object, we can move on to the next counting object.
      if ( overlappingPositions.length <= 1 ) {
        return this.handlePositionOverlap( positionProperties.slice( 1 ), validBounds, minWidthRatio );
      }
      else {

        // If there were multiple overlapping objects, we need to move the first counting object to the back of the array
        // So that we can check for future overlaps again.
        positionProperties.shift();
        positionProperties.push( currentPositionProperty );
        return this.handlePositionOverlap( positionProperties, validBounds, minWidthRatio );
      }
    }
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    this.resetAccordionBoxes();
    numberPairsUtteranceQueue.cancelSpeechDataSpeaking();
  }
}

numberPairs.register( 'NumberPairsScreenView', NumberPairsScreenView );
