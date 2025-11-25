// Copyright 2024-2025, University of Colorado Boulder

/**
 * SumScreenView is the top-level view for the 'Sum' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text, { TextOptions } from '../../../../scenery/js/nodes/Text.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import NumberPairsPreferences from '../../common/model/NumberPairsPreferences.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import CountingAreaNode from '../../common/view/CountingAreaNode.js';
import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import KittenNode from '../../common/view/KittenNode.js';
import NumberBondAccordionBox from '../../common/view/NumberBondAccordionBox.js';
import NumberPairsScreenView, { NumberPairsScreenViewOptions } from '../../common/view/NumberPairsScreenView.js';
import numberPairsUtteranceQueue from '../../common/view/numberPairsUtteranceQueue.js';
import PhraseAccordionBox from '../../common/view/PhraseAccordionBox.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsFluent from '../../NumberPairsFluent.js';
import SumModel from '../model/SumModel.js';
import AddendControlPanel from './AddendControlPanel.js';
import SumScreenSummaryContent from './description/SumScreenSummaryContent.js';

type SelfOptions = EmptySelfOptions;

type SumScreenViewOptions = SelfOptions & StrictOmit<NumberPairsScreenViewOptions, 'phraseAccordionBox' | 'numberBondAccordionBox' | 'screenSummaryContent'>
  & PickRequired<NumberPairsScreenViewOptions, 'tandem'>;

const COUNTING_AREA_BOUNDS = NumberPairsConstants.COUNTING_AREA_BOUNDS;

export default class SumScreenView extends NumberPairsScreenView {

  // For pdom order setting.
  private readonly totalCheckbox: Node;

  public constructor( model: SumModel, providedOptions: SumScreenViewOptions ) {

    const options = optionize<SumScreenViewOptions, SelfOptions, NumberPairsScreenViewOptions>()( {
      sumScreen: true,
      phraseAccordionBox: new PhraseAccordionBox( model, {
        phraseStringProperty: NumberPairsFluent.sumPhrasePatternStringProperty,
        phraseSpeechStringProperty: NumberPairsFluent.sumPhraseSpeechPatternStringProperty,
        speechDataProperty: numberPairsUtteranceQueue.sumScreenSpeechDataProperty,
        tandem: providedOptions.tandem.createTandem( 'phraseAccordionBox' )
      } ),
      numberBondAccordionBox: new NumberBondAccordionBox( model, {
        numberBondNodeOptions: {
          totalOnTopProperty: NumberPairsPreferences.sumScreenTotalOnTopProperty
        },
        tandem: providedOptions.tandem.createTandem( 'numberBondAccordionBox' )
      } ),
      equationAccordionBox: new EquationAccordionBox( model, {
        totalColorProperty: model.totalColorProperty,
        leftAddendColorProperty: model.leftAddendColorProperty,
        rightAddendColorProperty: model.rightAddendColorProperty,
        addendsOnRight: false,
        expandedDefaultValue: true,
        tandem: providedOptions.tandem.createTandem( 'equationAccordionBox' )
      } ),
      screenSummaryContent: new SumScreenSummaryContent( model )
    }, providedOptions );

    super( model, options );

    const horizontalCheckboxSpacing = 40; // empirically determined
    const totalCheckboxLabelOptions = combineOptions<TextOptions>( {

      // we want the total maxWidth to be two less than the other labels to make space for padding.
      maxWidth: NumberPairsConstants.CHECKBOX_LABEL_OPTIONS.maxWidth - 2
    }, NumberPairsConstants.CHECKBOX_LABEL_OPTIONS );
    const pointerAreaDilation = 5;
    this.totalCheckbox = new Checkbox( model.totalVisibleProperty,
      new Text( NumberPairsFluent.totalStringProperty, totalCheckboxLabelOptions ), {
        accessibleHelpText: NumberPairsFluent.a11y.controls.totalCheckbox.accessibleHelpTextStringProperty,
        top: this.numberLineCheckboxGroup?.top,
        left: COUNTING_AREA_BOUNDS.right - NumberPairsConstants.CHECKBOX_LABEL_OPTIONS.maxWidth * 2 - horizontalCheckboxSpacing,
        touchAreaXDilation: pointerAreaDilation,
        touchAreaYDilation: pointerAreaDilation,
        mouseAreaXDilation: pointerAreaDilation,
        mouseAreaYDilation: pointerAreaDilation,
        accessibleContextResponseChecked: NumberPairsFluent.a11y.controls.totalCheckbox.accessibleContextResponseCheckedStringProperty,
        accessibleContextResponseUnchecked: NumberPairsFluent.a11y.controls.totalCheckbox.accessibleContextResponseUncheckedStringProperty,
        tandem: providedOptions.tandem.createTandem( 'totalCheckbox' )
      } );
    this.addChild( this.totalCheckbox );

    /**
     * Create the counting object controls. These look and act like NumberSpinners but due to their implementation needs,
     * are not NumberSpinners.
     */
    const leftAddendControlPanel = new AddendControlPanel(
      model.totalProperty,
      model.leftAddendCountingObjectsProperty.value,
      model.inactiveCountingObjects,
      model.representationTypeProperty,
      {
        countingObjectControlOptions: {
          leftAddendProperty: model.leftAddendProperty,
          interruptPointers: this.interruptSubtreeInput.bind( this ),
          addendVisibleProperty: model.leftAddendVisibleProperty,
          redactedValueStringProperty: NumberPairsFluent.a11y.unknownNumberStringProperty,
          addendStringProperty: NumberPairsFluent.a11y.leftStringProperty,
          colorStringProperty: NumberPairsFluent.a11y.leftAddendColorStringProperty
        },
        tandem: providedOptions.tandem.createTandem( 'leftAddendControlPanel' )
      } );

    const rightAddendControlPanel = new AddendControlPanel(
      model.totalProperty,
      model.rightAddendCountingObjectsProperty.value,
      model.inactiveCountingObjects,
      model.representationTypeProperty,
      {
        countingObjectControlOptions: {
          interruptPointers: this.interruptSubtreeInput.bind( this ),
          addendVisibleProperty: model.rightAddendVisibleProperty,
          redactedValueStringProperty: NumberPairsFluent.a11y.unknownNumberStringProperty,
          addendStringProperty: NumberPairsFluent.a11y.rightStringProperty,
          colorStringProperty: NumberPairsFluent.a11y.rightAddendColorStringProperty
        },
        tandem: providedOptions.tandem.createTandem( 'rightAddendControlPanel' )
      } );

    Multilink.multilink( [ model.totalProperty, model.leftAddendProperty, model.rightAddendProperty ],
      ( total, leftAddend, rightAddend ) => {
        if ( total === leftAddend + rightAddend ) {
          leftAddendControlPanel.countingObjectControl.setAriaValues( leftAddend.toString() );
          rightAddendControlPanel.countingObjectControl.setAriaValues( rightAddend.toString() );
        }
      } );

    const addendSpinners = new VBox( {
      children: [ leftAddendControlPanel, rightAddendControlPanel ],
      spacing: 35,
      centerY: COUNTING_AREA_BOUNDS.centerY,
      right: this.layoutBounds.maxX - NumberPairsConstants.SCREEN_VIEW_X_MARGIN
    } );
    ManualConstraint.create( this, [ addendSpinners ], addendSpinnersProxy => {
      addendSpinnersProxy.centerY = COUNTING_AREA_BOUNDS.centerY;
    } );

    this.addChild( addendSpinners );
    this.numberPairsSetPDOMOrder( addendSpinners );

    model.inactiveCountingObjects.addItemRemovedListener( removedCountingObject => {
      if ( !isSettingPhetioStateProperty.value && !isResettingAllProperty.value ) {

        // The counting object may have already been added to another observable array before this listener fires,
        // and we don't want to compare it with itself later.
        const countingObjects = [ ...model.leftAddendCountingObjectsProperty.value, ...model.rightAddendCountingObjectsProperty.value ]
          .filter( countingObject => countingObject !== removedCountingObject );

        // We assume that if a counting object is removed from the inactiveCountingObjectsArray it is being added to the
        // counting area and may need to update its position. Check if the newly active counting object is too close
        // to any other counting object and find a new point if so.
        const positions = countingObjects.map( countingObject => countingObject.attributePositionProperty.value );
        if ( positions.some( position => position.distance( removedCountingObject.attributePositionProperty.value ) < NumberPairsConstants.KITTEN_PANEL_WIDTH / 2 ) ) {
          removedCountingObject.attributePositionProperty.value = CountingAreaNode.getRandomEmptyPoint( positions, KittenNode.DEFAULT_DRAG_BOUNDS );
        }
      }
    } );
  }

  /**
   * Set the traversal order for the screen.
   * @param totalInteractionNode
   */
  private numberPairsSetPDOMOrder( totalInteractionNode: Node ): void {
    this.pdomPlayAreaNode.setPDOMOrder( [
      this.countingAreaDescriptionNode,
      totalInteractionNode,
      this.representationRadioButtonGroup,
      this.countingAreaButtonsVBox,
      ...this.countingAreaNodes,
      this.totalCheckbox,
      ...this.controlNodes
    ] );

    this.pdomControlAreaNode.setPDOMOrder( [
      this.resetAllButton
    ] );
  }
}

numberPairs.register( 'SumScreenView', SumScreenView );
