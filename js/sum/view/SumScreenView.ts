// Copyright 2024-2025, University of Colorado Boulder

/**
 * SumScreenView is the top-level view for the 'Sum' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import NumberPairsConstants from '../../common/NumberPairsConstants.js';
import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import NumberBondAccordionBox from '../../common/view/NumberBondAccordionBox.js';
import NumberPairsScreenView, { NumberPairsScreenViewOptions } from '../../common/view/NumberPairsScreenView.js';
import numberPairsUtteranceQueue from '../../common/view/numberPairsUtteranceQueue.js';
import PhraseAccordionBox from '../../common/view/PhraseAccordionBox.js';
import numberPairs from '../../numberPairs.js';
import NumberPairsStrings from '../../NumberPairsStrings.js';
import SumModel from '../model/SumModel.js';
import AddendControlPanel from './AddendControlPanel.js';
import NumberPairsPreferences from '../../common/model/NumberPairsPreferences.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';

type SelfOptions = EmptySelfOptions;

type SumScreenViewOptions = SelfOptions & StrictOmit<NumberPairsScreenViewOptions, 'phraseAccordionBox' | 'numberBondAccordionBox'>
  & PickRequired<NumberPairsScreenViewOptions, 'tandem'>;

const COUNTING_AREA_BOUNDS = NumberPairsConstants.COUNTING_AREA_BOUNDS;

export default class SumScreenView extends NumberPairsScreenView {

  // For pdom order setting.
  private readonly totalCheckbox: Node;

  public constructor( model: SumModel, providedOptions: SumScreenViewOptions ) {

    const options = optionize<SumScreenViewOptions, SelfOptions, NumberPairsScreenViewOptions>()( {
      sumScreen: true,
      phraseAccordionBox: new PhraseAccordionBox( model, {
        phraseStringProperty: NumberPairsStrings.sumPhrasePatternStringProperty,
        phraseSpeechStringProperty: NumberPairsStrings.sumPhraseSpeechPatternStringProperty,
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
      } )
    }, providedOptions );

    super( model, options );

    const horizontalCheckboxSpacing = 40; // empirically determined
    this.totalCheckbox = new Checkbox( model.totalVisibleProperty,
      new Text( NumberPairsStrings.totalStringProperty, NumberPairsConstants.CHECKBOX_LABEL_OPTIONS ), {
        accessibleHelpText: NumberPairsStrings.totalCheckboxHelpTextStringProperty,
        top: this.numberLineCheckboxGroup?.top,
        left: COUNTING_AREA_BOUNDS.right - NumberPairsConstants.CHECKBOX_LABEL_OPTIONS.maxWidth * 2 - horizontalCheckboxSpacing,
        tandem: providedOptions.tandem.createTandem( 'totalCheckbox' )
      } );
    this.addChild( this.totalCheckbox );
    const leftAddendControlPanel = new AddendControlPanel(
      model.totalProperty,
      model.leftAddendCountingObjectsProperty.value,
      model.inactiveCountingObjects,
      model.representationTypeProperty,
      {
        countingObjectControlOptions: {
          leftAddendProperty: model.leftAddendProperty,
          interruptPointers: this.interruptSubtreeInput.bind( this )
        },
        phetioVisiblePropertyInstrumented: true,
        tandem: providedOptions.tandem.createTandem( 'leftAddendControlPanel' )
      } );
    const rightAddendControlPanel = new AddendControlPanel(
      model.totalProperty,
      model.rightAddendCountingObjectsProperty.value,
      model.inactiveCountingObjects,
      model.representationTypeProperty,
      {
        countingObjectControlOptions: {
          interruptPointers: this.interruptSubtreeInput.bind( this )
        },
        phetioVisiblePropertyInstrumented: true,
        tandem: providedOptions.tandem.createTandem( 'rightAddendControlPanel' )
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
  }

  /**
   * Set the traversal order for the screen.
   * @param totalInteractionNode
   */
  private numberPairsSetPDOMOrder( totalInteractionNode: Node ): void {
    this.pdomPlayAreaNode.setPDOMOrder( [
      ...this.representationNodes,
      totalInteractionNode,
      this.representationRadioButtonGroup,
      this.countingAreaButtonsVBox,
      ...this.countingAreaNodes
    ] );

    this.pdomControlAreaNode.setPDOMOrder( [
      this.totalCheckbox,
      ...this.controlNodes,
      this.resetAllButton
    ] );
  }
}

numberPairs.register( 'SumScreenView', SumScreenView );