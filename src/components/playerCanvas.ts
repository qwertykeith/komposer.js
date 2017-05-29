import { bindable } from 'aurelia-framework';
import { KomposerChannel } from './../libs/komposerChannel';
import { autoinject } from 'aurelia-dependency-injection';
import { MutateDelete, ILoopMutator, MutateExplode, MutateDeleteSound, MutateDeleteQuieter } from "../libs/loopMutators";
import { KLoopPlayer } from "../libs/kLoopPlayer";
import { DragUtils } from "../libs/dragUtils";

@autoinject()
export class PlayerCanvasCustomElement {

  @bindable()
  channel: KomposerChannel;

  mutator?: ILoopMutator; //= new MutateDelete();


  constructor(public dragUtils: DragUtils) {

  }

  setMutator(m: ILoopMutator) {
    this.mutator = m;
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

  mutate(loop: KLoopPlayer) {
    if (this.mutator) this.mutator.mutate(this.channel, loop);
  }

  startPlayer(loop: KLoopPlayer) {
    loop.on = true;
  }

  stopPlayer(loop: KLoopPlayer) {
    loop.on = false;
  }




}
