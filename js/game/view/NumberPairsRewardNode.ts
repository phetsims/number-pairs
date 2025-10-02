// Copyright 2025, University of Colorado Boulder

/**
 * RewardNode is the various objects that are falling behind the RewardDialog when the user reaches the
 * score that results in a reward.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import StarNode from '../../../../scenery-phet/js/StarNode.js';
import Image, { ImageOptions } from '../../../../scenery/js/nodes/Image.js';
import RewardNode from '../../../../vegas/js/RewardNode.js';
import kittenBlue_svg from '../../../images/kittenBlue_svg.js';
import kittenYellow_svg from '../../../images/kittenYellow_svg.js';
import numberPairs from '../../numberPairs.js';

// constants
const NUMBER_OF_NODES = 100;
const IMAGE_OPTIONS: ImageOptions = {
  maxHeight: 40
};
const NODES = [
  new StarNode(),
  new Image( kittenBlue_svg, IMAGE_OPTIONS ),
  new Image( kittenYellow_svg, IMAGE_OPTIONS )
];

export default class NumberPairsRewardNode extends RewardNode {

  public constructor() {

    super( {
      visible: false,
      nodes: RewardNode.createRandomNodes( NODES, NUMBER_OF_NODES )
    } );
  }
}

numberPairs.register( 'NumberPairsRewardNode', NumberPairsRewardNode );