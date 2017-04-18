import { newGuid } from './libs/kUtils';
import { ActivateKomposerCommandHandler } from './libs/commands/activateKomposer';
import { KomposerAppState } from './libs/komposerState';
import { ChangeTempoCommandHandler } from './libs/commands/changeTempo';
import { LoopLibrary } from './libs/sounds/loopLibrary';
import { VocalKit1Urls } from './libs/sounds/soundLibUrls/vocalKit1Urls';
// import { Komposer } from './libs/komposer';
import { AutoPlayer } from './libs/autoPlayer';
import { log } from 'util';
import { setInterval } from 'timers';
import { autoinject } from 'aurelia-dependency-injection';
import { KLoopView } from './models/dot';
import { XYLocation } from './models/location';
import interact from 'interact.js'
import { KLoopPlayer } from './libs/kLoopPlayer'
import { KLoop, KLoopUtils } from './models/kloop'
import { Komposer } from "./libs/komposer";

@autoinject()
export class Welcome {

  dots: KLoopView[] = [];

  constructor(
    private player: Komposer,
    private autoPlayer: AutoPlayer,
    private state: KomposerAppState,
    private activateKomposerCommandHandler: ActivateKomposerCommandHandler,
    private changeTempoCommandHandler: ChangeTempoCommandHandler) {

    console.log('%c KOMPOSER!', 'background-color:green; color: white, font-weight:bold');

  }

  set autoOn(value: boolean) {
    this.autoPlayer.on = value;
  }

  get autoOn(): boolean {
    return this.autoPlayer.on;
  }


  startTriggerDot(loop: KLoop) {
    this.player.on(loop);
  }

  stopTriggerDot(loop: KLoop) {
    this.player.off(loop);
  }


  placeDot(e) {
    this.moveElement(e.target, e.detail);
  }

  private getNewLoops(initialDots: number) {
    // const kloops = LoopLibrary.lameMelody1();
    return LoopLibrary.getBeatBox(initialDots);
  }

  // private getNewRandom(kloops: KLoop[]) {


  // }

  attached() {


    this.activateKomposerCommandHandler.execute(true);

    var loops = this.getNewLoops(150)
    // this.dots = this.getNewRandom(loops);
    // return kloops.map(loop => getNewRandomDot(loop));
    loops.forEach((loop) => this.addLoop(loop));

    const explode = (url: string, offset: number) => {
      KLoopUtils.explode(url)
        .forEach(l => {
          // const pos = this.getRandomPos(50, 50);
          // pos.x = offset;
          // var loop = { id: 7, loopId: l.guid, pos: pos };

          this.addLoop(l);
        });
    }

    // explode(this.testSounds[0], 400);
    // explode(this.testSounds[9], 350);
    // explode(this.testSounds[10], 450);

    //       this.startTestSeq();



  }


  get tempo(): number {

    return Math.round(this.state.data.tempo);
  }

  set tempo(bpm: number) {
    this.changeTempoCommandHandler.execute(bpm);
    // Komposer.tempo = bpm;
  }



  getRandomPos(xw: number, yw: number): XYLocation {
    const x = Math.floor(300 * Math.random());
    const y = Math.floor(330 * Math.random());
    return { x: x, y: y };
  }




  addLoop(loop: KLoop) {
    this.player.addLoop(loop);


    const getNewRandomDot = (loop: KLoop): KLoopView => {

      const pos = this.getRandomPos(300, 300);
      var dot = { id: newGuid(), loopId: loop.guid, pos: pos, loop: loop };
      return dot;
    }


    const dot = getNewRandomDot(loop);
    this.dots.push(dot);
  }

  // getLoopFrom(dot: KLoopView) {
  //   const loops = this.player.getloops().filter(l => l.guid == dot.loopId);

  //   return loops.length ? loops[0] : null;
  // }

  moveElementOnEvent(customEvent) {

    // debugger;
    let event = customEvent.detail;
    let target = event.target;

    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    this.moveElement(target, { x, y })

  }


  moveElement(element, { x, y }) {

    //return;

    // console.log('DOR LOC --------------------');
    // console.log(element);
    // console.log(x);
    // console.log(y);

    // debugger;

    // translate the element
    element.style.webkitTransform =
      element.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    element.setAttribute('data-x', x);
    element.setAttribute('data-y', y);

  }


}

