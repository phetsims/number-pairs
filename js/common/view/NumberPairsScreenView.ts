// Copyright 2024, University of Colorado Boulder
/**
 * The base screen view for the Intro, Ten, Twenty, and Sum Screens in the Number Pairs simulation.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import numberPairs from '../../numberPairs.js';
import { AlignBox, Node } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberPairsConstants from '../NumberPairsConstants.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Range from '../../../../dot/js/Range.js';
import TotalRadioButtonGroup from './TotalRadioButtonGroup.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import NumberPairsModel, { CountingRepresentationType } from '../model/NumberPairsModel.js';
import CountingRepresentationRadioButtonGroup from './CountingRepresentationRadioButtonGroup.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberLineNode from './NumberLineNode.js';
import NumberLineOptionsCheckboxGroup from './NumberLineOptionsCheckboxGroup.js';
import NumberPairsColors from '../NumberPairsColors.js';
import CountingAreaNode from './CountingAreaNode.js';


type SelfOptions = {
  numberSentenceContent: Node;
  numberBondContent: Node;
  countingRepresentations: CountingRepresentationType[];
  equationContent?: Node | null;
  sceneRange?: Range | null;
};
export type NumberPairsScreenViewOptions = SelfOptions & WithRequired<ScreenViewOptions, 'tandem'>;

const COUNTING_AREA_Y_MARGIN = 25; // empirically determined
export default class NumberPairsScreenView extends ScreenView {

  protected readonly countingAreaBounds: Bounds2;

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

    const numberSentenceAlignBox = new AlignBox( options.numberSentenceContent, {
      alignBounds: this.layoutBounds.dilatedX( -NumberPairsConstants.COUNTING_AREA_X_MARGIN ),
      yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      yAlign: 'top',
      xAlign: 'left'
    } );
    const numberBondAlignBox = new AlignBox( options.numberBondContent, {
      alignBounds: this.layoutBounds.dilatedX( NumberPairsConstants.COUNTING_AREA_X_MARGIN ),
      yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      yAlign: 'top',
      xAlign: 'center'
    } );
    this.addChild( numberSentenceAlignBox );
    this.addChild( numberBondAlignBox );

    if ( options.equationContent ) {
      const equationAlignBox = new AlignBox( options.equationContent, {
        alignBounds: this.layoutBounds.dilatedX( -NumberPairsConstants.COUNTING_AREA_X_MARGIN ),
        yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
        yAlign: 'top',
        xAlign: 'right'
      } );
      this.addChild( equationAlignBox );
    }

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    // Add the total radio button group if the scene range is provided. Each radio button represents a total value
    // that is associated with a scene state.
    if ( options.sceneRange ) {
      const totalRadioButtonGroup = new TotalRadioButtonGroup( model.totalNumberProperty, {
        sceneRange: options.sceneRange
      } );

      // Sum radio buttons should be center aligned vertically above the reset all button.
      const totalSelectorAlignBox = new AlignBox( totalRadioButtonGroup, {
        alignBounds: this.layoutBounds.withOffsets( 0, 0, 0, -resetAllButton.height - NumberPairsConstants.SCREEN_VIEW_Y_MARGIN ),
        yMargin: NumberPairsConstants.SCREEN_VIEW_Y_MARGIN,
        xMargin: NumberPairsConstants.SCREEN_VIEW_X_MARGIN,
        yAlign: 'center',
        xAlign: 'right'
      } );

      this.addChild( totalSelectorAlignBox );
    }

    const countingAreaMinX = this.layoutBounds.minX + NumberPairsConstants.COUNTING_AREA_X_MARGIN;
    const countingAreaMinY = this.layoutBounds.minY + NumberPairsConstants.SCREEN_VIEW_Y_MARGIN
                             + options.numberBondContent.bounds.height + COUNTING_AREA_Y_MARGIN;
    const countingAreaMaxX = this.layoutBounds.maxX - NumberPairsConstants.COUNTING_AREA_X_MARGIN;
    const countingAreaMaxY = countingAreaMinY + 340; // empirically determined
    this.countingAreaBounds = new Bounds2( countingAreaMinX, countingAreaMinY,
      countingAreaMaxX, countingAreaMaxY );

    const backgroundColorProperty = new DerivedProperty( [ model.countingRepresentationTypeProperty ], countingRepresentationType => {
      if ( countingRepresentationType === CountingRepresentationType.CUBES || countingRepresentationType === CountingRepresentationType.NUMBER_LINE ) {
        return NumberPairsColors.numberLineBackgroundColorProperty;
      }
      else {
        return countingRepresentationType.totalColor;
      }
    } );
    const countingArea = new CountingAreaNode( this.countingAreaBounds, {
      countingRepresentationTypeProperty: model.countingRepresentationTypeProperty,
      backgroundColorProperty: backgroundColorProperty
    } );
    this.addChild( countingArea );

    /**
     * Create the number line and accompanying features.
     */
    if ( options.countingRepresentations.includes( CountingRepresentationType.NUMBER_LINE ) ) {
      const numberLineVisibleProperty = DerivedProperty.valueEqualsConstant( model.countingRepresentationTypeProperty, CountingRepresentationType.NUMBER_LINE );
      const numberLineNode = new NumberLineNode( model, this.countingAreaBounds.width - 30, {
        center: this.countingAreaBounds.center,
        visibleProperty: numberLineVisibleProperty,
        numberLineRange: options.sceneRange?.max === NumberPairsConstants.TEN_SCENE_RANGE.max ?
                         NumberPairsConstants.NUMBER_LINE_TEN_RANGE : NumberPairsConstants.NUMBER_LINE_TWENTY_RANGE
      } );
      this.addChild( numberLineNode );

      const numberLineCheckboxGroup = new NumberLineOptionsCheckboxGroup( model, this.countingAreaBounds, {
        visibleProperty: numberLineVisibleProperty
      } );
      this.addChild( numberLineCheckboxGroup );
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