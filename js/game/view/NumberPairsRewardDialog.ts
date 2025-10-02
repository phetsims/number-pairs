// Copyright 2023-2024, University of Colorado Boulder

/**
 * NumberPairsRewardDialog is the reward dialog in the 'Game' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import RewardDialog from '../../../../vegas/js/RewardDialog.js';
import RewardNode from '../../../../vegas/js/RewardNode.js';
import numberPairs from '../../numberPairs.js';

export default class NumberPairsRewardDialog extends RewardDialog {

  public constructor(
    returnToHomeScreen: () => void,
    rewardNode: RewardNode,
    rewardScore: number
  ) {

    super( rewardScore, {

      // 'Keep Going' hides the dialog, but doesn't change the current challenge.
      keepGoingButtonListener: () => this.hide(),

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
      }
    } );
  }
}

numberPairs.register( 'NumberPairsRewardDialog', NumberPairsRewardDialog );