import { AddLoopsCommand } from './../libs/commands/addLoops';
import { KomposerViewModel } from "../viewModels/komposerViewModel";
import { KLoopViewModel } from "../viewModels/dot";
import { KLoopUtils } from "../libs/kLoopUtils";

export interface ILoopMutator {

  name: string;
  mutate: (model: KomposerViewModel, dot: KLoopViewModel) => void;

}

export class MutateDelete implements ILoopMutator {
  name = "Delete";
  mutate(model: KomposerViewModel, dot: KLoopViewModel) {
    const c = model.komposer.channels[dot.channel];
    c.delete(dot.player);

    // delete the ui
    var i = model.dots.indexOf(dot);
    model.dots.splice(i, 1);
  }
}

export class MutateDeleteSound implements ILoopMutator {
  name = "Delete Sound";
  mutate(model: KomposerViewModel, dot: KLoopViewModel) {

    var deleteer = new MutateDelete();
    var url = dot.player.getLoop().url;
    const c = model.komposer.channels[dot.channel];

    model.dots
      .filter(d => d.player.getLoop().url == url)
      .filter(d => d.channel == model.currentChannel)
      .forEach(d => deleteer.mutate(model, d));

  }
}

export class MutateDeleteQuieter implements ILoopMutator {
  name = "Delete Quieter";
  mutate(model: KomposerViewModel, dot: KLoopViewModel) {

    var deleteer = new MutateDelete();
    var vol = dot.player.getLoop().volume;
    const c = model.komposer.channels[dot.channel];

    model.dots
      .filter(d => d.player.getLoop().volume <= vol)
      .filter(d => d.channel == model.currentChannel)
      .forEach(d => deleteer.mutate(model, d));

  }
}

export class MutateExplode implements ILoopMutator {
  name = "Explode";
  mutate(model: KomposerViewModel, dot: KLoopViewModel) {
    const loops = KLoopUtils.explode(dot.player.getLoop().url);
    const channel = model.komposer.channels[model.currentChannel];
    const addLoop = new AddLoopsCommand();
    addLoop.execute(model, channel, loops);
  }
}
