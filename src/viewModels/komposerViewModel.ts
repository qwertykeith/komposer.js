import { Komposer } from "../libs/komposer";
import { MutateDelete, ILoopMutator } from "../libs/loopMutators";
import { KLoopPlayer } from "../libs/kLoopPlayer";

export class KomposerViewModel {

  komposer: Komposer = new Komposer();

  currentChannel: number = 0;
  players: KLoopPlayer[] = [];



}
