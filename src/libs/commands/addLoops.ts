import { XYLocation } from '../../viewModels/location';
import { KLoop, KLoopPlayer } from '../kLoopPlayer';
import { KomposerChannel } from '../komposerChannel';
import { newGuid } from '../kUtils';
import { KomposerViewModel } from './../../viewModels/komposerViewModel';

export class AddLoopsCommand {

  execute(channel: KomposerChannel, loops: KLoop[]) {

    loops.forEach(loop => {
      const player = channel.addLoop(loop);
      this.addPlayer(channel, player);
    });

  }

  private addPlayer(channel: KomposerChannel, player: KLoopPlayer) {
    const setRandomLocation = (player: KLoopPlayer) => {
      const pos = this.getRandomPos(300, 300);
      player.pos = pos;
      // var dot = <KLoopPlayer>{ pos: pos, player: player, channel: channel };
      //      return player;
    }

    setRandomLocation(player);
    //    channel.players.push(p);

  }

  private getRandomPos(xw: number, yw: number): XYLocation {
    const x = Math.floor(300 * Math.random());
    const y = Math.floor(330 * Math.random());
    return { x: x, y: y };
  }


}
