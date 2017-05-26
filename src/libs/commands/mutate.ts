// import { autoinject } from 'aurelia-dependency-injection';
// import { AddLoopsCommand } from './addLoops';
// import { KLoopViewModel } from './../../viewModels/dot';
// import { KLoopPlayer } from './../kLoopPlayer';
// import { KomposerChannel } from '../komposerChannel';
// import { Komposer } from "../komposer";
// import { KLoopUtils } from "../kLoopUtils";
// import { KomposerViewModel } from "../../viewModels/komposerViewModel";
// import { ILoopMutator, MutateDelete, MutateExplode } from "../../models/loopMutator";

// @autoinject()
// export class Mutator {

//   static MODE_DELETE = "delete";
//   static MODE_EXPLODE = "explode";

//   constructor(private addLoopsCommand: AddLoopsCommand) {

//   }

//   getMutators(): ILoopMutator[] {

//     function* list() {
//       yield new MutateDelete();
//       yield new MutateExplode();
//     }

//     return Array.from(list());

//   }

//   execute(model: KomposerViewModel, dot: KLoopViewModel) {

//     // debugger;

//     if (model.mutateMode == Mutator.MODE_DELETE) {

//     }
//     else if (model.mutateMode == Mutator.MODE_EXPLODE) {
//     }


//   }

// }
