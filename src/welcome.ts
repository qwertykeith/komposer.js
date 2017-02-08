import { Dot } from './models/Dot';
import interact from 'interact.js'
import { KSamplePlayer } from './libs/kSamplePlayer'
import { KLoop } from './models/kloop'

export class Welcome {

  dots: Dot[];
  somenum: number = 0;
  player: KSamplePlayer;

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
      { id: 1, loop: new KLoop(soundUlrs[0], "16n"), pos: { x: 0, y: 0 } },
      { id: 2, loop: new KLoop(soundUlrs[1], "4n"), pos: { x: 20, y: 45 } },
      { id: 3, loop: new KLoop(soundUlrs[2], "8n"), pos: { x: 300, y: 50 } },
      { id: 4, loop: new KLoop(soundUlrs[3], "32n"), pos: { x: 200, y: 50 } },
      { id: 5, loop: new KLoop(soundUlrs[4], "16n"), pos: { x: 200, y: 250 } },
      { id: 6, loop: new KLoop(soundUlrs[5], "8n"), pos: { x: 200, y: 50 } },
    ];

    this.player = new KSamplePlayer();
    this.player.start();

    this.dots.forEach(dot => {
      this.player.addSound(dot.loop);
    });


  }


  startTriggerDot(dot: Dot) {
    console.log(dot);

    this.player.on(dot.loop);
  }

  stopTriggerDot(dot: Dot) {
    this.player.off(dot.loop);
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

