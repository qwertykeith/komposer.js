import { Dot } from './models/Dot';
import interact from 'interact.js'
import { TestPlay } from './libs/testPlay'

export class Welcome {

  dots: Dot[];
  somenum: number = 0;
  player: TestPlay;

  constructor() {

    const soundUlrs = [
      "https://s3-ap-southeast-2.amazonaws.com/ksounds/CH.WAV",
      "https://s3-ap-southeast-2.amazonaws.com/ksounds/TR-808Rim02.wav",
      "https://s3-ap-southeast-2.amazonaws.com/ksounds/MoM Tap Kick 55-10.wav",
      "https://s3-ap-southeast-2.amazonaws.com/ksounds/MoM Klick 08 57-08.wav",
      "https://s3-ap-southeast-2.amazonaws.com/ksounds/MoM Klick 10 57-10.wav",
      "https://s3-ap-southeast-2.amazonaws.com/ksounds/MoM Klick 06 57-06.wav"
    ];

    this.dots = [
      { id: 1, soundUrl: soundUlrs[0], pos: { x: 10, y: 100 } },
      { id: 2, soundUrl: soundUlrs[1], pos: { x: 40, y: 45 } },
      { id: 3, soundUrl: soundUlrs[2], pos: { x: 200, y: 50 } },
      { id: 3, soundUrl: soundUlrs[3], pos: { x: 120, y: 50 } },
      { id: 3, soundUrl: soundUlrs[4], pos: { x: 110, y: 20 } },
      { id: 3, soundUrl: soundUlrs[5], pos: { x: 180, y: 60 } },
    ];

    this.player = new TestPlay();
    this.player.start();

    soundUlrs.forEach(url => {
      this.player.addSound(url);
    });


  }


  startTriggerDot(dot: Dot) {
    console.log(dot);

    this.player.on(dot.soundUrl);
  }

  stopTriggerDot(dot: Dot) {
    this.player.off(dot.soundUrl);
  }

  dotLoaded(e) {
    console.log('loadedloadedloadedloadedloadedloadedloaded');
    console.log(e);

// PLACE INITIAL  X Y HERE

//    debugger;

  }

  itemDropped(item, target, source, sibling, itemVM, siblingVM) {
    console.log(target);

    //do things in here
  }


  attached() {

    //this.player.on("https://s3-ap-southeast-2.amazonaws.com/ksounds/CH.WAV");


    // const draggys = document.getElementsByClassName('draggable');
    // const draggablesArr = Array.from(draggys);

    // const dotmap: { [id: number]: Dot } = {};
    // this.dots.forEach(d => dotmap[d.id] = d);

    // console.log(dotmap);
    // debugger;



    setInterval(() => {
      this.somenum++;

    }, 1000);

    this.dots.forEach(d => {
      //      d.textContent = 'zzz'

      // const x = Math.random() * 100.0;
      // const y = Math.random() * 100.0;

      //      this.move(d, { dotmap., y })
    });


  }

  dotOver() {
    console.log('dfgsfgdfg');

  }

  moveElement(customEvent) {

    // debugger;
    let event = customEvent.detail;
    let target = event.target;

    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    this.move(target, { x, y })

  }


  move(target, {x, y}) {
    // translate the element
    target.style.webkitTransform =
      target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

  }


}

