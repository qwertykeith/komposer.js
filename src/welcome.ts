import { Dot } from './models/dot';
import { Location } from './models/location';
import interact from 'interact.js'
import { KSamplePlayer } from './libs/kSamplePlayer'
import { KLoop } from './models/kloop'

export class Welcome {

  dots: Dot[] = [];
  somenum: number = 0;
  player: KSamplePlayer;


  soundUlrs = [
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/CH.WAV",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/TR-808Rim02.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/MoM Tap Kick 55-10.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/MoM Klick 08 57-08.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/MoM Klick 10 57-10.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/MoM Klick 06 57-06.wav",

    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Clank/MoM+Chunk+02+56-02.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Clank/MoM+Goose+Flab+63-03.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Clank/MoM+Rim+Tick+63-04.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Clank/MoM+Wash+Hit+62-09.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Clank/MoM+Clank+12+53-12.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Snares/MoM+Ugly+Acoustic++08+64-12.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Snares/MoM+Mouth+Snare+63-07.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Snares/MoM+Clang+Snare+62-02.wav",
    "https://s3-ap-southeast-2.amazonaws.com/ksounds/Kiks/MoM+Klick+Kick+62-06.wav",
    // "",
    // "",
    // "",
    // "",
    // "",

  ];

  constructor() {


    this.player = new KSamplePlayer();
    this.player.start();



  }


  startTriggerDot(dot: Dot) {
    console.log(dot);

    if (dot) this.player.on(dot.loop);
  }

  stopTriggerDot(dot: Dot) {
    if (dot) this.player.off(dot.loop);
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

    this.newRandom();

  }

  newRandom() {

    this.dots = [];

    const beats = ['8n', '16n', '8n', '16n', '8n', '12n', '16n', '8n', '12n', '16n', '32n'];
    // const beats=['4n','8n','12n','16n','32n'];

    // randomly add stuff
    for (let i = 0; i < 100; i++) {
      this.newDot(beats);
    }
  }

  newDotTriplets() {
    this.newDot(['6n', '12n', '24n']);
  }

  // makes a new random sound for now
  newDot(theBeats) {
    const beats = theBeats || ['8n', '16n', '32n'];
    const sound = this.soundUlrs[Math.floor(this.soundUlrs.length * Math.random())]
    const beat = beats[Math.floor(beats.length * Math.random())]
    const x = Math.floor(300 * Math.random());
    const y = Math.floor(330 * Math.random());

    var dot = { id: 7, loop: new KLoop(sound, beat), pos: { x: x, y: y } };
    console.log('NEW dot');
    console.log(dot);

    this.dots.push(dot);
    this.player.addSound(dot.loop);
  }

  dotOver() {
    console.log('dfgsfgdfg');

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

