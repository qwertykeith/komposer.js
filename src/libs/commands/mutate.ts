import { AddLoopsCommand } from './addLoops';
import { KLoopViewModel } from './../../viewModels/dot';
import { KLoopPlayer } from './../kLoopPlayer';
import { KomposerChannel } from '../komposerChannel';
import { Komposer } from "../komposer";
import { KLoopUtils } from "../kLoopUtils";
import { KomposerViewModel } from "../../viewModels/komposerViewModel";

export class Mutator {

  static MODE_DELETE = "delete";
  static MODE_EXPLODE = "explode";

  constructor(private addLoopsCommand: AddLoopsCommand) {

  }

  execute(model: KomposerViewModel, dot: KLoopViewModel) {

    if (model.mutateMode == Mutator.MODE_DELETE) {
      const c = model.komposer.channels[dot.channel];
      c.delete(dot.player);

      // delete the ui
      var i = model.dots.indexOf(dot);
      model.dots.splice(i, 1);

    }
    else if (model.mutateMode == Mutator.MODE_EXPLODE) {
      const loops = KLoopUtils.explode(dot.player.getLoop().url);
      const channel = model.komposer.channels[model.currentChannel];
      this.addLoopsCommand.execute(model, channel, loops);
    }


  }

}
