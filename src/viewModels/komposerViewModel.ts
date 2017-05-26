import { KLoopViewModel } from "./dot";
import { Komposer } from "../libs/komposer";
import { MutateDelete, ILoopMutator } from "../libs/loopMutators";

export class KomposerViewModel {

  komposer: Komposer = new Komposer();

  currentChannel: number = 0;
  dots: KLoopViewModel[] = [];

  mutator: ILoopMutator = new MutateDelete();


}
