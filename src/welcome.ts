import { ActivateKomposerCommandHandler } from './libs/commands/activateKomposer';
import { ChangeTempoCommandHandler } from './libs/commands/changeTempo';
import { KLoop, KLoopPlayer } from './libs/kLoopPlayer';
import { KLoopUtils } from './libs/kLoopUtils';
import { Komposer } from './libs/komposer';
import { KomposerChannel } from './libs/komposerChannel';
import { newGuid } from './libs/kUtils';
import { LoopLibrary } from './libs/sounds/loopLibrary';
import { autoinject } from 'aurelia-dependency-injection';
import { KLoopViewModel } from "./viewModels/dot";
import { XYLocation } from "./viewModels/location";
import { KomposerViewModel } from "./viewModels/komposerViewModel";
import { AddLoopsCommand } from "./libs/commands/addLoops";
import { MutateDelete, MutateExplode, MutateDeleteSound, ILoopMutator, MutateDeleteQuieter } from "./libs/loopMutators";

@autoinject()
export class Welcome {

  model: KomposerViewModel = new KomposerViewModel();

  constructor(
    // private state: KomposerAppState,
    private activateKomposerCommandHandler: ActivateKomposerCommandHandler,
    private changeTempoCommandHandler: ChangeTempoCommandHandler,
    private addLoopsCommand: AddLoopsCommand) {

    console.log('%c KOMPOSER!', 'background-color:green; color: white, font-weight:bold');

  }

  getMutators(): ILoopMutator[] {

    function* list() {
      yield new MutateDelete();
      yield new MutateExplode();
      yield new MutateDeleteSound();
      yield new MutateDeleteQuieter();
    }

    return Array.from(list());

  }

  setMutator(m: ILoopMutator) {
    this.model.mutator = m;
  }

  mutate(dot: KLoopViewModel) {
    this.model.mutator.mutate(this.model, dot);
  }

  startTriggerDot(loop: KLoopPlayer) {
    loop.on = true;
  }

  stopTriggerDot(loop: KLoopPlayer) {
    loop.on = false;
  }


  trashDrop(event) {
    debugger;
  }

  test(e, dot) {
    console.log(e);
    console.log(dot);
    alert(e);
  }

  toggleAuto(channel: KomposerChannel) {
    channel.autoPlayerData.on = !channel.autoPlayerData.on;
    if (!channel.autoPlayerData.on) channel.allOff();
  }

  setChannel(channel: KomposerChannel) {

    const channelNumber = this.model.komposer.channels.indexOf(channel);

    if (channelNumber < 0 || channelNumber >= this.model.komposer.channels.length) return;

    this.model.currentChannel = channelNumber;
  }

  placeDot(e) {
    this.moveElement(e.target, e.detail);
  }

  private addLoopsAndChannel(channelName: string, loops: KLoop[]) {
    const c = this.model.komposer.addChannel(channelName);

    this.addLoops(c, loops);
  }

  private addLoops(channel: KomposerChannel, loops: KLoop[]) {

    this.addLoopsCommand.execute(this.model, channel, loops);
  }



  attached() {


    this.activateKomposerCommandHandler.execute(true);

    this.addLoopsAndChannel("Beat Box", LoopLibrary.getBeatBox(150));
    this.addLoopsAndChannel("Simple 1", LoopLibrary.getSimpleBeat1());
    this.addLoopsAndChannel("Fast 1", LoopLibrary.getSimpleBeat2Fast());

  }


  get tempo(): number {
    return Komposer.tempo;

    //    return Math.round(this.state.data.tempo);
  }

  set tempo(bpm: number) {
    this.changeTempoCommandHandler.execute(bpm);
    // Komposer.tempo = bpm;
  }



  moveElementOnEvent(customEvent) {

    // debugger;
    let event = customEvent.detail;
    let target = event.target;

    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    this.moveElement(target, { x, y })

  }


  moveElement(element, { x, y }) {

    // translate the element
    element.style.webkitTransform =
      element.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    element.setAttribute('data-x', x);
    element.setAttribute('data-y', y);

  }


}

