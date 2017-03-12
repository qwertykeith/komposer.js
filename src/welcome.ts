import { LoopLibrary } from './libs/sounds/loopLibrary';
import { VocalKit1Urls } from './libs/sounds/soundLibUrls/vocalKit1Urls';
import { Komposer } from './libs/komposer';
import { AutoPlayer } from './libs/autoPlayer';
import { log } from 'util';
import { setInterval } from 'timers';
import { autoinject } from 'aurelia-dependency-injection';
import { Dot } from './models/dot';
import { DotLocation } from './models/location';
import interact from 'interact.js'
import { KLoopPlayer } from './libs/kLoopPlayer'
import { KLoop, KLoopUtils } from './models/kloop'

@autoinject()
export class Welcome {

  dots: Dot[] = [];

  constructor(
    private player: KLoopPlayer,
    private autoPlayer: AutoPlayer) {

    console.log('%c KOMPOSER!', 'background-color:green; color: white, font-weight:bold');

    Komposer.start();

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


  private getNewRandom(initialDots: number) {

    const getNewRandomDot = (loop: KLoop) => {

      const pos = this.getRandomPos(300, 300);
      var dot = { id: 7, loop: loop, pos: pos };
      return dot;
    }

    const kloops = LoopLibrary.getBeatBox(initialDots);
    // const kloops = LoopLibrary.lameMelody1();

    return kloops.map(loop => getNewRandomDot(loop));

  }

  attached() {

    this.dots = this.getNewRandom(150);
    this.dots.forEach((d) => this.addDot(d));




    const explode = (url: string, offset: number) => {
      KLoopUtils.explode(url)
        .forEach(l => {
          const pos = this.getRandomPos(50, 50);
          pos.x = offset;
          var loop = { id: 7, loop: l, pos: pos };

          this.addDot(loop);
        });
    }

    // explode(this.testSounds[0], 400);
    // explode(this.testSounds[9], 350);
    // explode(this.testSounds[10], 450);

    //       this.startTestSeq();



  }


  get tempo(): number {
    return Math.round(Komposer.tempo);
  }

  set tempo(bpm: number) {
    Komposer.tempo = bpm;
  }



  getRandomPos(xw: number, yw: number): DotLocation {
    const x = Math.floor(300 * Math.random());
    const y = Math.floor(330 * Math.random());
    return { x: x, y: y };
  }

  addDot(dot: Dot) {
    this.dots.push(dot);
    this.player.addSound(dot.loop);

  }

  moveElementOnEvent(customEvent) {

    // debugger;
    let event = customEvent.detail;
    let target = event.target;

    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    this.moveElement(target, { x, y })

  }


  moveElement(element, {x, y}) {

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

