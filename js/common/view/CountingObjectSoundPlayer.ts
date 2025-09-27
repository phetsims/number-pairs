// Copyright 2025, University of Colorado Boulder

/**
 * CountingObjectSoundPlayer is a sound player that is used to produce sounds when a counting object's addend type
 * changes.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import SoundClip from '../../../../tambo/js/sound-generators/SoundClip.js';
import numberPairs from '../../numberPairs.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import SoundGenerator, { SoundGeneratorOptions } from '../../../../tambo/js/sound-generators/SoundGenerator.js';
import stepForward_mp3 from '../../../../tambo/sounds/stepForward_mp3.js';
import stepBack_mp3 from '../../../../tambo/sounds/stepBack_mp3.js';

type SelfOptions = EmptySelfOptions;
type CountingObjectSoundPlayerOptions = SoundGeneratorOptions & SelfOptions;

class CountingObjectSoundPlayer extends SoundGenerator {

  private readonly stepForwardSound: SoundClip;
  private readonly stepBackSound: SoundClip;

  public constructor( providedOptions?: CountingObjectSoundPlayerOptions ) {

    const options = optionize<CountingObjectSoundPlayerOptions, SelfOptions, SoundGeneratorOptions>()( {
      initialOutputLevel: 0.2
    }, providedOptions );

    super( options );

    this.stepForwardSound = new SoundClip( stepForward_mp3 );
    this.stepBackSound = new SoundClip( stepBack_mp3 );

    this.stepForwardSound.connect( this.mainGainNode );
    this.stepBackSound.connect( this.mainGainNode );
  }

  public playStepForwardSound(): void {
    this.stepForwardSound.play();
  }

  public playStepBackSound(): void {
    this.stepBackSound.play();
  }
}

numberPairs.register( 'CountingObjectSoundPlayer', CountingObjectSoundPlayer );

export default CountingObjectSoundPlayer;