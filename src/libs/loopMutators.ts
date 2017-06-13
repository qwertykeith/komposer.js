import { AddLoopsCommand } from './../libs/commands/addLoops';
import { KLoopUtils } from "../libs/kLoopUtils";
import { KLoopPlayer } from "./kLoopPlayer";
import { KomposerChannel } from "./komposerChannel";

export interface ILoopMutator {

  name: string;
  mutate: (channel: KomposerChannel, player: KLoopPlayer) => void;

}



export class MutateDelete implements ILoopMutator {
  name = "Delete";
  mutate(channel: KomposerChannel, player: KLoopPlayer) {
    channel.delete(player);

    // // delete the ui
    // var i = channel.players.indexOf(player);
    // console.log("--------------");
    // console.log(i);
    // console.log("--------------");
    // channel.players.splice(i, 1);
  }
}

export class MutateDeleteSound implements ILoopMutator {
  name = "Delete Sound";
  mutate(channel: KomposerChannel, player: KLoopPlayer) {

    var deleteer = new MutateDelete();
    var url = player.getLoop().url;

    channel.players
      .filter(p => p.getLoop().url == url)
      .forEach(d => deleteer.mutate(channel, d));

  }
}

export class MutateDeleteQuieter implements ILoopMutator {
  name = "Delete Quieter";
  mutate(channel: KomposerChannel, player: KLoopPlayer) {

    var deleteer = new MutateDelete();
    var vol = player.getLoop().volume;

    channel.players
      .filter(d => player.getLoop().volume <= vol)
      .forEach(d => deleteer.mutate(channel, d));

  }
}

export class MutateExplode implements ILoopMutator {
  name = "Explode";
  mutate(channel: KomposerChannel, player: KLoopPlayer) {
    const loops = KLoopUtils.explode(player.getLoop().url);
    const addLoop = new AddLoopsCommand();
    addLoop.execute(channel, loops);
  }
}
