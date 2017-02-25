import { autoinject } from 'aurelia-dependency-injection';
import { Dot } from './models/dot';
import { DotLocation } from './models/location';
import interact from 'interact.js'
import { KLoopPlayer } from './libs/kLoopPlayer'
import { KLoop, KLoopUtils } from './models/kloop'

@autoinject()
export class Welcome {

  loops: Dot[] = [];
  somenum: number = 0;
  // player: KLoopPlayer;
  beatLibrary = [
    1 / 8.0, 1 / 8.0, 1 / 8.0, 1 / 8.0, 1 / 8.0, 1 / 8.0,
    1 / 16.0, 1 / 16.0, 1 / 16.0, 1 / 16.0, 1 / 16.0, 1 / 16.0, 1 / 16.0,
    //      1/32.0,1/32.0,
    1 / 4.0,
    1 / 6.0,
    //      1/12.0,
    //      1/24.0,
  ];
  //  initialDots: number = 90;

  soundUlrs = [
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/CH.WAV",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/TR-808Rim02.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/MoM Tap Kick 55-10.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/MoM Klick 08 57-08.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/MoM Klick 10 57-10.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/MoM Klick 06 57-06.wav",

    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Clank/MoM+Chunk+02+56-02.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Clank/MoM+Goose+Flab+63-03.wav",
    //    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Clank/MoM+Rim+Tick+63-04.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Clank/MoM+Wash+Hit+62-09.wav",
    //    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Clank/MoM+Clank+12+53-12.wav",
    //    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Snares/MoM+Ugly+Acoustic++08+64-12.wav",
    //    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Snares/MoM+Mouth+Snare+63-07.wav",
    //    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Snares/MoM+Clang+Snare+62-02.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Kiks/MoM+Klick+Kick+62-06.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/808+Drum+Machine/Cabasa_808_PL.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/808+Drum+Machine/Closed_Hi_Hat_808_PL.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/808+Drum+Machine/Hi_Hat_Multi_PL_v1.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/808+Drum+Machine/Kick_808_PL_7.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/808+Drum+Machine/Snare_808_PL.wav",
    // "",
    // "",
    // "",
    // "",
    // "",
    // "",

  ];

  constructor(private player: KLoopPlayer) {

    this.player.start();

  }


  startTriggerDot(loop: KLoop) {
    this.player.on(loop);
  }

  stopTriggerDot(loop: KLoop) {
    this.player.off(loop);
  }


  placeDot(e) {

    console.log(e);

    this.moveElement(e.target, e.detail);

  }


  // itemDropped(item, target, source, sibling, itemVM, siblingVM) {
  //   console.log(target);

  //   //do things in here
  // }


  attached() {

    // NOTE
    // do this at some point?
    // http://codepen.io/taye/pen/YPyLxE



    // this.dots = [
    //   { id: 1, loop: new KLoop(this.soundUlrs[0], "16n"), pos: { x: 0, y: 0 } },
    //   { id: 2, loop: new KLoop(this.soundUlrs[1], "4n"), pos: { x: 20, y: 1 } },
    //   { id: 3, loop: new KLoop(this.soundUlrs[2], "8n"), pos: { x: 300, y: 2 } },
    //   { id: 4, loop: new KLoop(this.soundUlrs[3], "32n"), pos: { x: 200, y: 10 } },
    //   { id: 5, loop: new KLoop(this.soundUlrs[4], "16n"), pos: { x: 150, y: 90 } },
    //   { id: 6, loop: new KLoop(this.soundUlrs[5], "8n"), pos: { x: 90, y: 50 } },
    //   { id: 7, loop: new KLoop(this.soundUlrs[0], "12n"), pos: { x: 20, y: 10 } },
    // ];

    // this.dots.forEach(dot => {
    //   this.player.addSound(dot.loop);
    // });

    this.newRandom(150);


    const explode = (url: string, offset: number) => {
      KLoopUtils.explode(url)
        .forEach(l => {
          const pos = this.getRandomPos(50, 50);
          pos.x = offset;
          var loop = { id: 7, loop: l, pos: pos };

          this.addLoop(loop);
        });
    }

    explode(this.soundUlrs[0], 400);
    explode(this.soundUlrs[9], 350);
    explode(this.soundUlrs[10], 450);


  }

  get tempo(): number {
    return Math.round(this.player.tempo);
  }

  set tempo(bpm: number) {
    this.player.tempo = bpm;
  }


  newRandom(initialDots: number) {

    this.loops = [];

    // randomly add stuff
    for (let i = 0; i < initialDots; i++) {
      this.newDot(this.beatLibrary);
    }
  }

  // makes a new random sound for now
  newDot(theBeats) {
    const beats = theBeats || this.beatLibrary;
    const sound = this.soundUlrs[Math.floor(this.soundUlrs.length * Math.random())]
    const beat = beats[Math.floor(beats.length * Math.random())]


    var vol = 1; // (Math.random() * 0.5) + 0.5;

    // if (Math.random() < 0.5) vol = 0.5;
    const pos = this.getRandomPos(300, 300);

    var dot = { id: 7, loop: new KLoop(sound, beat, vol), pos: pos };
    console.log('NEW dot');
    console.log(dot);

    this.addLoop(dot);
  }

  getRandomPos(xw: number, yw: number): DotLocation {
    const x = Math.floor(300 * Math.random());
    const y = Math.floor(330 * Math.random());
    return { x: x, y: y };
  }

  addLoop(dot: Dot) {
    this.loops.push(dot);
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

  test(e) {
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
    console.log(e);

  }

  moveElement(element, {x, y}) {

    //return;

    console.log('DOR LOC --------------------');
    console.log(element);
    console.log(x);
    console.log(y);

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

