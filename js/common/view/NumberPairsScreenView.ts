// Copyright 2024, University of Colorado Boulder
/**
 * The base screen view for the Intro, Ten, Twenty, and Sum Screens in the Number Pairs simulation.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import numberPairs from '../../numberPairs.js';
import { AlignBox, Node, Text, VBox } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Range from '../../../../dot/js/Range.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import NumberPairsModel, { CountingRepresentationType } from '../model/NumberPairsModel.js';
import CountingRepresentationRadioButtonGroup from './CountingRepresentationRadioButtonGroup.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberLineNode from './NumberLineNode.js';
import NumberLineOptionsCheckboxGroup from './NumberLineOptionsCheckboxGroup.js';
import NumberPairsColors from '../NumberPairsColors.js';
import CountingAreaNode from './CountingAreaNode.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import CubesOnWireNode from './CubesOnWireNode.js';
import KittensLayerNode from './KittensLayerNode.js';
import LocationCountingObjectsLayerNode from './LocationCountingObjectsLayerNode.js';
import SpeechSynthesisButton from './SpeechSynthesisButton.js';
import TenFrameButton from './TenFrameButton.js';
import CommutativeButton from './CommutativeButton.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';


type SelfOptions = {
  numberSentenceContent: Node;
  numberBondContent: Node;
  countingRepresentations: CountingRepresentationType[];
  equationContent?: Node | null;
  sceneRange?: Range | null;
};
export type NumberPairsScreenViewOptions = SelfOptions & PickRequired<ScreenViewOptions, 'tandem'> &
  StrictOmit<ScreenViewOptions, 'children'>;

const COUNTING_AREA_Y_MARGIN = 15; // empirically determined
export default class NumberPairsScreenView extends ScreenView {

  protected readonly countingAreaBounds: Bounds2;
  protected readonly resetAllButton: Node;

  public constructor( model: NumberPairsModel, providedOptions: NumberPairsScreenViewOptions ) {

    // Create the radio buttons that live below the counting area and determine which representation is shown.
    const countingRepresentationRadioButtonGroup = new CountingRepresentationRadioButtonGroup( model.countingRepresentationTypeProperty, {
      countingRepresentations: providedOptions.countingRepresentations,
      tandem: providedOptions.tandem.createTandem( 'countingRepresentationRadioButtonGroup' )
    } );

    const options = optionize<NumberPairsScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
      equationContent: null,
      sceneRange: null,
      children: [ countingRepresentationRadioButtonGroup ]
    }, providedOptions );
    super( options );

    /**
     * Set the layout of the accordion boxes along the top of each screen.
     */
    const numberSentenceAlignBox = new AlignBox( options.numberSentenceContent, {
      alignBounds: this.layoutBounds,
      yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      xMargin: NumberPairsConstants.COUNTING_AREA_X_MARGIN,
      yAlign: 'top',
      xAlign: 'left'
    } );
    const numberBondAlignBox = new AlignBox( options.numberBondContent, {
      alignBounds: this.layoutBounds,
      yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      xMargin: NumberPairsConstants.COUNTING_AREA_X_MARGIN,
      yAlign: 'top',
      xAlign: 'center'
    } );
    this.addChild( numberSentenceAlignBox );
    this.addChild( numberBondAlignBox );

    if ( options.equationContent ) {
      const equationAlignBox = new AlignBox( options.equationContent, {
        alignBounds: this.layoutBounds,
        yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
        xMargin: NumberPairsConstants.COUNTING_AREA_X_MARGIN,
        yAlign: 'top',
        xAlign: 'right'
      } );
      this.addChild( equationAlignBox );
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

    const countingAreaMinX = this.layoutBounds.minX + NumberPairsConstants.COUNTING_AREA_X_MARGIN;
    const countingAreaMinY = this.layoutBounds.minY + NumberPairsConstants.SCREEN_VIEW_Y_MARGIN
                             + options.numberBondContent.bounds.height + COUNTING_AREA_Y_MARGIN;
    const countingAreaMaxX = this.layoutBounds.maxX - NumberPairsConstants.COUNTING_AREA_X_MARGIN;
    const countingAreaMaxY = countingAreaMinY + 340; // empirically determined
    this.countingAreaBounds = new Bounds2( countingAreaMinX, countingAreaMinY,
      countingAreaMaxX, countingAreaMaxY );

    /**
     * Create the buttons along the left edge of each screen
     */
    const speechSynthesisButton = new SpeechSynthesisButton( {
      tandem: options.tandem.createTandem( 'speechSynthesisButton' ),
      x: this.layoutBounds.minX + NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      y: this.layoutBounds.minY + NumberPairsConstants.SCREEN_VIEW_Y_MARGIN
    } );
    this.addChild( speechSynthesisButton );

    const tenFrameButtonVisibleProperty = new DerivedProperty( [ model.countingRepresentationTypeProperty ],
      countingRepresentation => countingRepresentation === CountingRepresentationType.APPLES ||
                                countingRepresentation === CountingRepresentationType.ONE_CARDS ||
                                countingRepresentation === CountingRepresentationType.BUTTERFLIES ||
                                countingRepresentation === CountingRepresentationType.SOCCER_BALLS ||
                                countingRepresentation === CountingRepresentationType.KITTENS );

    const tenFrameButton = new TenFrameButton( model.organizeIntoTenFrame, {
      tandem: options.tandem.createTandem( 'tenFrameButton' ),
      visibleProperty: tenFrameButtonVisibleProperty
    } );
    const commutativeButton = new CommutativeButton( model.swapAddends.bind( model ), {
      tandem: options.tandem.createTandem( 'commutativeButton' )
    } );
    const countingAreaButtonsVBox = new VBox( {
      children: [ tenFrameButton, commutativeButton ],
      spacing: 10,
      x: this.layoutBounds.minX + NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      y: this.countingAreaBounds.minY
    } );
    this.addChild( countingAreaButtonsVBox );

    /**
     * Create the counting area and accompanying features.
     */
    const countingAreaBackgroundColorProperty = new DerivedProperty( [ model.countingRepresentationTypeProperty ], countingRepresentationType => {
      if ( countingRepresentationType === CountingRepresentationType.CUBES || countingRepresentationType === CountingRepresentationType.NUMBER_LINE ) {
        return NumberPairsColors.numberLineBackgroundColorProperty;
      }
      else {
        return countingRepresentationType.totalColor;
      }
    } );
    const countingAreaNode = new CountingAreaNode( model.leftAddendVisibleProperty, model.rightAddendVisibleProperty,
      this.countingAreaBounds, {
        countingRepresentationTypeProperty: model.countingRepresentationTypeProperty,
        backgroundColorProperty: countingAreaBackgroundColorProperty,
        tandem: options.tandem.createTandem( 'countingAreaNode' )
      } );
    this.addChild( countingAreaNode );

    // All the location representations at least include One Cards
    if ( options.countingRepresentations.includes( CountingRepresentationType.ONE_CARDS ) ) {
      const locationLayerVisibleProperty = new DerivedProperty( [ model.countingRepresentationTypeProperty ],
        countingRepresentationType =>
          countingRepresentationType === CountingRepresentationType.APPLES ||
          countingRepresentationType === CountingRepresentationType.ONE_CARDS ||
          countingRepresentationType === CountingRepresentationType.BUTTERFLIES ||
          countingRepresentationType === CountingRepresentationType.SOCCER_BALLS );
      const locationCountingObjectsLayerNode = new LocationCountingObjectsLayerNode( model, this.countingAreaBounds, {
        visibleProperty: locationLayerVisibleProperty,
        tandem: options.tandem.createTandem( 'locationCountingObjectsLayerNode' )
      } );
      this.addChild( locationCountingObjectsLayerNode );
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
    if ( options.countingRepresentations.includes( CountingRepresentationType.KITTENS ) ) {
      const kittensLayerVisibleProperty = DerivedProperty.valueEqualsConstant( model.countingRepresentationTypeProperty, CountingRepresentationType.KITTENS );
      const kittensLayerNode = new KittensLayerNode( model, model.countingObjects, this.countingAreaBounds, {
        visibleProperty: kittensLayerVisibleProperty,
        tandem: options.tandem.createTandem( 'kittensLayerNode' )
      } );
      countingRepresentationsLayer.addChild( kittensLayerNode );
    }

    /**
     * Create the number line and accompanying features.
     */
    if ( options.countingRepresentations.includes( CountingRepresentationType.NUMBER_LINE ) ) {
      const numberLineVisibleProperty = DerivedProperty.valueEqualsConstant(
        model.countingRepresentationTypeProperty,
        CountingRepresentationType.NUMBER_LINE
      );

      const numberLineNode = new NumberLineNode( model, this.countingAreaBounds.width - 30, {
        visibleProperty: numberLineVisibleProperty,
        numberLineRange: options.sceneRange?.max === NumberPairsConstants.TEN_TOTAL_RANGE.max ?
                         NumberPairsConstants.TEN_NUMBER_LINE_RANGE : NumberPairsConstants.TWENTY_NUMBER_LINE_RANGE,
        tandem: options.tandem.createTandem( 'numberLineNode' )
      } );
      countingRepresentationsLayer.addChild( numberLineNode );

      // TODO: I'm having a hard time finding the offset I need to apply for this to be correct before the numberLineNode
      //  is added to the scene graph.
      numberLineNode.center = this.countingAreaBounds.center;

      const numberLineCheckboxGroup = new NumberLineOptionsCheckboxGroup( model, this.countingAreaBounds, {
        visibleProperty: numberLineVisibleProperty,
        tandem: options.tandem.createTandem( 'numberLineCheckboxGroup' )
      } );
      this.addChild( numberLineCheckboxGroup );

      const leftAddendLabelPlacementSwitch = new ABSwitch(
        model.leftAddendLabelPlacementProperty,
        'handle', new Text( 'Handle' ),
        'arrow', new Text( 'Arrow' ),
        {
          top: this.countingAreaBounds.bottom + COUNTING_AREA_Y_MARGIN,
          left: this.countingAreaBounds.left,
          visibleProperty: numberLineVisibleProperty,
          toggleSwitchOptions: {
            size: new Dimension2( 36, 18 )
          },
          tandem: options.tandem.createTandem( 'leftAddendLabelPlacementSwitch' )
        } );
      this.addChild( leftAddendLabelPlacementSwitch );
    }

    /**
     * Create the cubes on wire representation and accompanying features.
     */
    if ( options.countingRepresentations.includes( CountingRepresentationType.CUBES ) ) {
      const cubesVisibleProperty = DerivedProperty.valueEqualsConstant( model.countingRepresentationTypeProperty, CountingRepresentationType.CUBES );
      const sceneRange = options.sceneRange || NumberPairsConstants.TWENTY_TOTAL_RANGE;
      const cubesOnWireNode = new CubesOnWireNode( model, this.countingAreaBounds, {
        sceneRange: sceneRange,
        visibleProperty: cubesVisibleProperty,
        tandem: options.tandem.createTandem( 'cubesOnWireNode' )
      } );
      countingRepresentationsLayer.addChild( cubesOnWireNode );

      cubesOnWireNode.center = this.countingAreaBounds.center;
    }

    // Position the counting representation radio buttons below the counting area.
    countingRepresentationRadioButtonGroup.centerTop = new Vector2( this.countingAreaBounds.centerX, this.countingAreaBounds.maxY + COUNTING_AREA_Y_MARGIN );
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    //TODO
  }
}

numberPairs.register( 'NumberPairsScreenView', NumberPairsScreenView );