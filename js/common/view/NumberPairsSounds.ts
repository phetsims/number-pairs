// Copyright 2025, University of Colorado Boulder

/**
 * Centralized sound utilities for Number Pairs.
 *
 * Currently, provides the sound that plays when a counting object selection changes via keyboard traversal.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import SoundClip from '../../../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../../../tambo/js/soundManager.js';
import stepBack_mp3 from '../../../../tambo/sounds/stepBack_mp3.js';
import stepForward_mp3 from '../../../../tambo/sounds/stepForward_mp3.js';
import numberPairs from '../../numberPairs.js';
import { AddendType } from '../model/CountingObject.js';

const stepForwardSound = new SoundClip( stepForward_mp3 );
const stepBackSound = new SoundClip( stepBack_mp3 );

soundManager.addSoundGenerator( stepForwardSound );
soundManager.addSoundGenerator( stepBackSound );

const rightAddendPitchFactor = 1.2;
const leftAddendPitchFactor = 1;

class NumberPairsSounds {

  /**
   * Play the sound that corresponds to selecting the next counting object.
   * @param destinationAddend - the addend that the selection moved to
   * @param movedForward - whether the traversal moved forward in the list
   */
  public static playSelectAddendSound( destinationAddend: AddendType, movedForward: boolean ): void {
    const isLeftAddend = destinationAddend === AddendType.LEFT;
    const isRightAddend = destinationAddend === AddendType.RIGHT;
    if ( !isLeftAddend && !isRightAddend ) {
      return;
    }

    if ( movedForward ) {
      NumberPairsSounds.playStepForwardSound( destinationAddend );
    }
    else {
      NumberPairsSounds.playStepBackSound( destinationAddend );
    }
  }

  private static playStepForwardSound( destinationAddend: AddendType ): void {
    const pitch = destinationAddend === AddendType.RIGHT ? rightAddendPitchFactor : leftAddendPitchFactor;
    stepForwardSound.setPlaybackRate( pitch );
    stepForwardSound.play();
  }

  private static playStepBackSound( destinationAddend: AddendType ): void {
    const pitch = destinationAddend === AddendType.RIGHT ? rightAddendPitchFactor : leftAddendPitchFactor;
    stepBackSound.setPlaybackRate( pitch );
    stepBackSound.play();
  }
}

numberPairs.register( 'NumberPairsSounds', NumberPairsSounds );

export default NumberPairsSounds;
