// Copyright 2024-2025, University of Colorado Boulder
/**
 * The base screen view for the Intro, Ten, Twenty, and Sum Screens in the Number Pairs simulation.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import LocaleSwitch from '../../../../number-suite-common/js/common/view/LocaleSwitch.js';
import SpeechSynthesisControl from '../../../../number-suite-common/js/common/view/SpeechSynthesisControl.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import PressListener from '../../../../scenery/js/listeners/PressListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import NumberPairsModel from '../model/NumberPairsModel.js';
import NumberPairsPreferences from '../model/NumberPairsPreferences.js';
import { NumberPairsUtils } from '../model/NumberPairsUtils.js';
import RepresentationType from '../model/RepresentationType.js';
import NumberPairsColors from '../NumberPairsColors.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import BeadsOnWireNode from './BeadsOnWireNode.js';
import CommutativeButton from './CommutativeButton.js';
import CountingAreaNode from './CountingAreaNode.js';
import KittensLayerNode from './KittensLayerNode.js';
import LocationCountingObjectsLayerNode from './LocationCountingObjectsLayerNode.js';
import NumberLineIcon from './NumberLineIcon.js';
import NumberLineNode from './NumberLineNode.js';
import NumberLineOptionsCheckboxGroup from './NumberLineOptionsCheckboxGroup.js';
import numberPairsSpeechSynthesisAnnouncer from './numberPairsSpeechSynthesisAnnouncer.js';
import numberPairsUtteranceQueue from './numberPairsUtteranceQueue.js';
import RepresentationRadioButtonGroup from './RepresentationRadioButtonGroup.js';
import TenFrameButton from './TenFrameButton.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import { GatedVisibleProperty } from '../../../../axon/js/GatedBooleanProperty.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import SceneSelectionRadioButtonGroup from './SceneSelectionRadioButtonGroup.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import CountingObject from '../model/CountingObject.js';

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
  protected readonly representationNodes: Node[] = [];
  protected readonly countingAreaNodes: Node[] = [];
  protected readonly representationRadioButtonGroup: Node;
  protected readonly controlNodes: Node[] = [];

  public constructor( private readonly model: NumberPairsModel, providedOptions: NumberPairsScreenViewOptions ) {

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
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
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
        accessibleName: NumberPairsStrings.a11y.hearPhraseStringProperty,
        accessibleHelpText: NumberPairsStrings.a11y.phraseHelpTextStringProperty
      },
      x: this.layoutBounds.minX + NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      y: this.layoutBounds.minY + NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'speechSynthesisControl' )
    } );
    this.addChild( speechSynthesisControl );
    const localeSwitch = new LocaleSwitch( NumberPairsPreferences, numberPairsUtteranceQueue, 300, {
      tandem: options.tandem.createTandem( 'localeSwitch' ),
      phetioDocumentation: 'This control is only accessible when a second language is active.'
    } );
    phraseVBox.addChild( localeSwitch );

    const tenFrameButtonTandem = options.tandem.createTandem( 'tenFrameButton' );
    const tenFrameButtonVisibleProperty = new GatedVisibleProperty( new DerivedProperty( [ model.representationTypeProperty ],
      countingRepresentation => countingRepresentation === RepresentationType.APPLES ||
                                countingRepresentation === RepresentationType.ONE_CARDS ||
                                countingRepresentation === RepresentationType.BUTTERFLIES ||
                                countingRepresentation === RepresentationType.SOCCER_BALLS ||
                                countingRepresentation === RepresentationType.KITTENS ||
                                countingRepresentation === RepresentationType.BEADS ), tenFrameButtonTandem );

    // The sum screen organizes all the objects into one central ten frame. We create that bounds here so that
    // we have access to the countingAreaBounds which are defined during construction.
    const sumTenFrameBounds = COUNTING_AREA_BOUNDS.erodedX( COUNTING_AREA_BOUNDS.width / 3.5 );
    const tenFrameBounds = options.sumScreen ? [ sumTenFrameBounds ] : NumberPairsUtils.splitBoundsInHalf( COUNTING_AREA_BOUNDS );
    const representationTypeAccessibleNameProperty = new DynamicProperty( model.representationTypeProperty, {
      derive: 'accessibleName'
    } );
    const organizeObjectsPatternStringProperty = new PatternStringProperty( NumberPairsStrings.a11y.organizeObjectsPatternStringProperty, {
      representation: representationTypeAccessibleNameProperty
    } );
    const organizeObjectsHelpTextPatternStringProperty = new PatternStringProperty( NumberPairsStrings.a11y.organizeObjectsHelpTextPatternStringProperty, {
      representation: representationTypeAccessibleNameProperty
    } );

    const buttonVBoxSpacing = 10;
    const tenFrameButton = new TenFrameButton( {
      accessibleName: organizeObjectsPatternStringProperty,
      accessibleHelpText: organizeObjectsHelpTextPatternStringProperty,
      tandem: tenFrameButtonTandem,
      touchAreaXDilation: buttonVBoxSpacing / 2,
      touchAreaYDilation: buttonVBoxSpacing / 2,
      listener: () => {
        this.interruptSubtreeInput();
        this.deselectAllKittens();
        if ( model.representationTypeProperty.value === RepresentationType.BEADS ) {
          model.organizeInGroupsOfFive.bind( model )();
        }
        else {
          const positionPropertyType = model.representationTypeProperty.value === RepresentationType.KITTENS ? 'attribute' : 'location';
          model.organizeIntoTenFrame.bind( model )( tenFrameBounds, positionPropertyType );
        }
      },
      visibleProperty: tenFrameButtonVisibleProperty
    } );

    const commutativeButton = new CommutativeButton( {
      accessibleName: NumberPairsStrings.a11y.swapAddendsStringProperty,
      touchAreaXDilation: buttonVBoxSpacing / 2,
      touchAreaYDilation: buttonVBoxSpacing / 2,
      listener: () => {
        this.deselectAllKittens();
        this.interruptSubtreeInput();
        model.swapAddends.bind( model )();
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
    const countingAreaNode = new CountingAreaNode( model.leftAddendVisibleProperty, model.rightAddendVisibleProperty, model, {
      countingRepresentationTypeProperty: model.representationTypeProperty,
      backgroundColorProperty: countingAreaBackgroundColorProperty,
      tandem: options.tandem.createTandem( 'countingAreaNode' )
    } );
    this.addChild( countingAreaNode );
    this.countingAreaNodes.push( countingAreaNode );

    // All the location representations at least include One Cards
    if ( model.representationTypeProperty.validValues?.includes( RepresentationType.ONE_CARDS ) ) {
      const locationLayerVisibleProperty = new DerivedProperty( [ model.representationTypeProperty ],
        countingRepresentationType =>
          countingRepresentationType === RepresentationType.APPLES ||
          countingRepresentationType === RepresentationType.ONE_CARDS ||
          countingRepresentationType === RepresentationType.BUTTERFLIES ||
          countingRepresentationType === RepresentationType.SOCCER_BALLS );
      const locationCountingObjectsLayerNode = new LocationCountingObjectsLayerNode( model, countingAreaNode, {
        visibleProperty: locationLayerVisibleProperty,
        tandem: options.tandem.createTandem( 'locationCountingObjectsLayerNode' )
      } );
      this.addChild( locationCountingObjectsLayerNode );
      this.representationNodes.push( locationCountingObjectsLayerNode );
    }

    // Group all the non-location based counting representations into one Node. If either the leftAddendVisibleProperty
    // or rightAddendVisibleProperty is false, then none of the other counting representations should be visible.
    const countingRepresentationsLayer = new Node( {
      visibleProperty: DerivedProperty.and( [ model.leftAddendVisibleProperty, model.rightAddendVisibleProperty ] )
    } );
    this.addChild( countingRepresentationsLayer );

    /**
     * Create the attribute based kitten node layer and accompanying features.
     */
    if ( model.representationTypeProperty.validValues?.includes( RepresentationType.KITTENS ) ) {
      const kittensLayerVisibleProperty = DerivedProperty.valueEqualsConstant( model.representationTypeProperty, RepresentationType.KITTENS );
      const kittensLayerNode = new KittensLayerNode( model.countingObjects, countingAreaNode, {
        visibleProperty: kittensLayerVisibleProperty,
        tandem: options.tandem.createTandem( 'kittensLayerNode' )
      } );
      countingRepresentationsLayer.addChild( kittensLayerNode );

      // We need to specify the kitten node pdom order so that it remains consistent as kittenNodes move to front during
      // interactions.
      this.representationNodes.push( ...kittensLayerNode.kittenNodes );

      // If the user clicks outside the kittens, then remove focus from all the counting objects.
      this.addInputListener( new PressListener( {
        attach: false,
        pressCursor: null,
        press: event => {
          if ( kittensLayerNode.kittenNodes.every( kittenNode => !event.trail.containsNode( kittenNode ) ) ) {
            model.countingObjects.forEach( countingObject => {
              countingObject.kittenSelectedProperty.value = false;
            } );
          }
        },
        tandem: options.tandem.createTandem( 'kittensLayerNodePressListener' )
      } ) );
    }

    /**
     * Create the number line and accompanying features.
     */
    if ( model.representationTypeProperty.validValues?.includes( RepresentationType.NUMBER_LINE ) ) {
      const numberLineVisibleProperty = DerivedProperty.valueEqualsConstant(
        model.representationTypeProperty,
        RepresentationType.NUMBER_LINE
      );

      const numberLineNode = new NumberLineNode( model, COUNTING_AREA_BOUNDS.width - 40, {
        visibleProperty: numberLineVisibleProperty,
        numberLineRange: options.sceneRange?.max === NumberPairsConstants.TEN_TOTAL_RANGE.max ?
                         NumberPairsConstants.TEN_NUMBER_LINE_RANGE : NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE,
        tandem: options.tandem.createTandem( 'numberLineNode' )
      } );
      countingRepresentationsLayer.addChild( numberLineNode );
      this.representationNodes.push( numberLineNode );

      numberLineNode.center = COUNTING_AREA_BOUNDS.center;

      // The x position of the numberline checkbox group is a combination of the maxwidth of the checkbox label, the dimension
      // of the radio buttons, and the size of the checkbox itself.
      const checkboxGroupMargin = SceneSelectionRadioButtonGroup.RADIO_BUTTON_DIMENSION + NumberPairsConstants.SCREEN_VIEW_X_MARGIN;
      const checkboxMaxWidth = NumberPairsConstants.CHECKBOX_LABEL_OPTIONS.maxWidth + NumberLineOptionsCheckboxGroup.CHECKBOX_OPTIONS.boxWidth + NumberLineOptionsCheckboxGroup.CHECKBOX_OPTIONS.spacing + 7;

      this.numberLineCheckboxGroup = new NumberLineOptionsCheckboxGroup( model, {
        bottom: COUNTING_AREA_BOUNDS.top - NumberPairsConstants.COUNTING_AREA_CHECKBOX_MARGIN,
        left: this.layoutBounds.right - checkboxGroupMargin - checkboxMaxWidth,
        visibleProperty: numberLineVisibleProperty,
        tandem: options.tandem.createTandem( 'numberLineCheckboxGroup' )
      } );
      this.addChild( this.numberLineCheckboxGroup );

      const iconWidth = 35;
      const iconValue = 1;
      const numberLineCountFromZeroSwitchTandem = options.tandem.createTandem( 'numberLineCountFromZeroSwitch' );
      const numberLineCountFromZeroSwitchVisibleProperty = new GatedVisibleProperty( numberLineVisibleProperty,
        numberLineCountFromZeroSwitchTandem );
      const numberLineCountFromZeroSwitch = new ABSwitch(
        model.numberLineCountFromZeroProperty,
        false, new NumberLineIcon( iconWidth, iconValue, { showRightArrow: true } ),
        true, new NumberLineIcon( iconWidth, iconValue, { showLeftArrow: true, showRightArrow: true } ),
        {
          top: COUNTING_AREA_BOUNDS.bottom + COUNTING_AREA_Y_MARGIN,
          left: COUNTING_AREA_BOUNDS.left,
          visibleProperty: numberLineCountFromZeroSwitchVisibleProperty,
          valueAAccessibleName: NumberPairsStrings.a11y.countOnStringProperty,
          valueBAccessibleName: NumberPairsStrings.a11y.countFromZeroStringProperty,
          toggleSwitchOptions: {
            size: new Dimension2( 36, 18 ),
            enabledPropertyOptions: {
              phetioFeatured: true
            },
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
     * Create the cubes on wire representation and accompanying features.
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
      this.representationNodes.push( beadsOnWireNode );

      beadsOnWireNode.center = COUNTING_AREA_BOUNDS.center;
    }

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
    assert && assert( this.recursionDepth < 100, 'infinite recursion detected' );

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

  private deselectAllKittens(): void {
    this.model.countingObjects.forEach( countingObject => {
      countingObject.kittenSelectedProperty.value = false;
    } );
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