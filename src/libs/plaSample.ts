
import Tone from 'tone'


export class PlaySample {

  synth;
  player;

  constructor() {

    //create a synth and connect it to the master output (your speakers)
    this.synth = new Tone.Synth({
      "oscillator": {
        "type": "pwm",
        "modulationFrequency": 0.2
      },
      "envelope": {
        "attack": 0.02,
        "decay": 0.1,
        "sustain": 0.2,
        "release": 0.9,
      }
    }).toMaster();


    this.player = new Tone.Player("https://s3-ap-southeast-2.amazonaws.com/ksounds/341980__officialfourge__174-dnb-acoustic-loop.wav").toMaster();


  }

  play() {

    this.player.start();

  }

  stop() {

    this.player.stop();

  }

}
