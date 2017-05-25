

import { KLoopViewModel } from "./dot";
import { Komposer } from "../libs/komposer";
import { Mutator } from "../libs/commands/mutate";

export class KomposerViewModel {

  komposer: Komposer = new Komposer();

  currentChannel: number = 0;
  dots: KLoopViewModel[] = [];

  mutateMode: string = Mutator.MODE_DELETE;


}
