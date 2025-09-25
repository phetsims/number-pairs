// Copyright 2024-2025, University of Colorado Boulder

/**
 * CountingObjectSoundPlayer is a sound player that is used to produce sounds when a counting object's addend type
 * changes.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import SoundClip from '../../../../tambo/js/sound-generators/SoundClip.js';
import cardMovement1_mp3 from '../../../../tambo/sounds/cardMovement1_mp3.js';
import cardMovement2_mp3 from '../../../../tambo/sounds/cardMovement2_mp3.js';
import numberPairs from '../../numberPairs.js';
import { AddendType } from '../model/CountingObject.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import SoundGenerator, { SoundGeneratorOptions } from '../../../../tambo/js/sound-generators/SoundGenerator.js';
import TSoundPlayer from '../../../../tambo/js/TSoundPlayer.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = EmptySelfOptions;
type CountingObjectSoundPlayerOptions = SoundGeneratorOptions & SelfOptions;

class CountingObjectSoundPlayer extends SoundGenerator implements TSoundPlayer {

  private readonly stepForwardSound: SoundClip;
  private readonly stepBackwardSound: SoundClip;

  public constructor( addendTypeProperty: TReadOnlyProperty<AddendType>, draggingProperty: TReadOnlyProperty<boolean>, providedOptions?: CountingObjectSoundPlayerOptions ) {

    const options = optionize<CountingObjectSoundPlayerOptions, SelfOptions, SoundGeneratorOptions>()( {
      initialOutputLevel: 0.2
    }, providedOptions );

    super( options );

    this.stepForwardSound = new SoundClip( cardMovement1_mp3 );
    this.stepBackwardSound = new SoundClip( cardMovement2_mp3 );

    this.stepForwardSound.connect( this.mainGainNode );
    this.stepBackwardSound.connect( this.mainGainNode );

    addendTypeProperty.lazyLink( ( newAddendType, oldAddendType ) => {

      if ( draggingProperty.value ) {
        if ( newAddendType === AddendType.RIGHT ) {
          this.stepForwardSound.play();
        }
        else if ( newAddendType === AddendType.LEFT ) {
          this.stepBackwardSound.play();
        }
      }
    } );
  }

  public play(): void {
    // This sound player is driven by property changes, so this method is not used.
  }

  public stop(): void {
    this.stepForwardSound.stop();
    this.stepBackwardSound.stop();
  }
}

numberPairs.register( 'CountingObjectSoundPlayer', CountingObjectSoundPlayer );

export default CountingObjectSoundPlayer;