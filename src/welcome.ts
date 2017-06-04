import { ActivateKomposerCommandHandler } from './libs/commands/activateKomposer';
import { AddLoopsCommand } from './libs/commands/addLoops';
import { KLoop } from './libs/kLoopPlayer';
import { KomposerChannel } from './libs/komposerChannel';
import { LoopLibrary } from './libs/sounds/loopLibrary';
import { KomposerViewModel } from './viewModels/komposerViewModel';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject()
export class Welcome {

  model: KomposerViewModel = new KomposerViewModel();

  constructor(
    // private state: KomposerAppState,
    private activateKomposerCommandHandler: ActivateKomposerCommandHandler,
    // private changeTempoCommandHandler: ChangeTempoCommandHandler,
    private addLoopsCommand: AddLoopsCommand,
  ) {

    console.log('%c************ KOMPOSER! ************', 'background-color:green; color: white, font-weight:bold');

  }

  private addLoopsAndChannel(channelName: string, loops: KLoop[]) {
    const c = this.model.komposer.addChannel(channelName);

    this.addLoops(c, loops);
  }

  private addLoops(channel: KomposerChannel, loops: KLoop[]) {

    this.addLoopsCommand.execute(channel, loops);
  }

  attached() {

    this.activateKomposerCommandHandler.execute(true);

    this.addLoopsAndChannel("1", LoopLibrary.getRandomSounds());
    this.addLoopsAndChannel("2", LoopLibrary.getRandomSounds());
    this.addLoopsAndChannel("3", LoopLibrary.getRandomSounds());
    this.addLoopsAndChannel("4", LoopLibrary.getRandomSounds());

    // this.addLoopsAndChannel("Beat Box", LoopLibrary.getBeatBox(150));
    // this.addLoopsAndChannel("Simple 1", LoopLibrary.getSimpleBeat1());
    // this.addLoopsAndChannel("Fast 1", LoopLibrary.getSimpleBeat2Fast());
    // this.addLoopsAndChannel("Lots", LoopLibrary.lots());
    // this.addLoopsAndChannel("Melody", LoopLibrary.lameMelody1());

    // this.addLoopsAndChannel("Test", LoopLibrary.getTest());

  }


  // get tempo(): number {
  //   return Komposer.tempo;

  //   //    return Math.round(this.state.data.tempo);
  // }

  // set tempo(bpm: number) {
  //   this.changeTempoCommandHandler.execute(bpm);
  //   // Komposer.tempo = bpm;
  // }




}

