import { KLoopViewModel } from '../../viewModels/dot';
import { XYLocation } from '../../viewModels/location';
import { KLoop, KLoopPlayer } from '../kLoopPlayer';
import { KomposerChannel } from '../komposerChannel';
import { newGuid } from '../kUtils';
import { KomposerViewModel } from './../../viewModels/komposerViewModel';

export class AddLoopsCommand {

  execute(model: KomposerViewModel, channel: KomposerChannel, loops: KLoop[]) {

    const chanIndex = model.komposer.channels.indexOf(channel);
    loops.forEach(loop => {
      const player = channel.addLoop(loop);
      this.addPlayer(model, player, chanIndex);
    });

  }

  private addPlayer(model: KomposerViewModel, player: KLoopPlayer, channel: number) {
    const getNewRandomDot = (player: KLoopPlayer): KLoopViewModel => {
      const pos = this.getRandomPos(300, 300);
      var dot = <KLoopViewModel>{ id: newGuid(), pos: pos, player: player, channel: channel };
      return dot;
    }

    const dot = getNewRandomDot(player);
    model.dots.push(dot);

  }

  private getRandomPos(xw: number, yw: number): XYLocation {
    const x = Math.floor(300 * Math.random());
    const y = Math.floor(330 * Math.random());
    return { x: x, y: y };
  }


}
