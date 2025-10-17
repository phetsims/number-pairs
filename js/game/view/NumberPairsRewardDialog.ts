// Copyright 2025, University of Colorado Boulder

/**
 * NumberPairsRewardDialog is the reward dialog in the 'Game' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import RewardDialog from '../../../../vegas/js/RewardDialog.js';
import RewardNode from '../../../../vegas/js/RewardNode.js';
import numberPairs from '../../numberPairs.js';

export default class NumberPairsRewardDialog extends RewardDialog {

  public constructor(
    levelNumberProperty: TReadOnlyProperty<number>, // A number indicating the current level number. 1-indexed. 0 when not on a challenge level (like the levelSelectionScreen).
    returnToHomeScreen: () => void,
    focusNextButton: () => void,
    rewardNode: RewardNode,
    rewardScore: number,
    tandem: Tandem
  ) {

    super( levelNumberProperty, rewardScore, {

      // 'Keep Going' hides the dialog, but doesn't change the current challenge.
      dismissListener: () => {
        this.hide();
        focusNextButton();
      },

      // 'New Level' takes us back to the level-selection interface, and keeps the solved challenge loaded if we return
      // to this level to be consistent with the back button.
      newLevelButtonListener: () => {
        this.hide();
        returnToHomeScreen();
      },

      // When the dialog is shown, show the reward.
      showCallback: () => {
        rewardNode.visible = true;
      },

      // When the dialog is hidden, hide the reward.
      hideCallback: () => {
        rewardNode.visible = false;
      },

      tandem: tandem
    } );
  }
}

numberPairs.register( 'NumberPairsRewardDialog', NumberPairsRewardDialog );