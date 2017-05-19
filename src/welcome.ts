import { KomposerChannel } from './libs/komposerChannel';
import { newGuid } from './libs/kUtils';
import { ActivateKomposerCommandHandler } from './libs/commands/activateKomposer';
// import { KomposerAppState } from './libs/komposerState';
import { ChangeTempoCommandHandler } from './libs/commands/changeTempo';
import { LoopLibrary } from './libs/sounds/loopLibrary';
import { VocalKit1Urls } from './libs/sounds/soundLibUrls/vocalKit1Urls';
import { AutoPlayer } from './libs/autoPlayer';
import { log } from 'util';
import { setInterval } from 'timers';
import { autoinject } from 'aurelia-dependency-injection';
import { KLoopViewModel } from './models/dot';
import { XYLocation } from './models/location';
import interact from 'interact.js'
import { KLoopPlayer, KLoop } from './libs/kLoopPlayer'
import { KLoopUtils } from "./libs/kLoopUtils";
import { Komposer } from "./libs/komposer";

@autoinject()
export class Welcome {

  dots: KLoopViewModel[] = [];
  // currentDots: KLoopViewModel[] = [];
  komposer: Komposer = new Komposer();
  currentChannel: number = 0;

  constructor(
    // private state: KomposerAppState,
    private activateKomposerCommandHandler: ActivateKomposerCommandHandler,
    private changeTempoCommandHandler: ChangeTempoCommandHandler) {

    console.log('%c KOMPOSER!', 'background-color:green; color: white, font-weight:bold');

  }



  // set autoOn(value: boolean) {
  //   if (this.currentChannel >= this.komposer.channels.length) return;
  //   var c = this.komposer.channels[this.currentChannel];
  //   c.autoPlayerData.on = value;
  //   if (!value) c.allOff();
  // }

  // get autoOn(): boolean {
  //   if (this.currentChannel >= this.komposer.channels.length) return false;
  //   return this.komposer.channels[this.currentChannel].autoPlayerData.on;
  // }


  startTriggerDot(loop: KLoopPlayer) {
    loop.on = true;
  }

  stopTriggerDot(loop: KLoopPlayer) {
    loop.on = false;
  }

  get channels() {

    return this.komposer.channels;
    //return [];
    // return [...Array(this.channels.length)]; //.map(v=>v);
    //    return Array.from({ length: this.channels.length }, (value, key) => key)
  }


  trashDrop(event) {
    debugger;
  }

  test(e, dot) {
    console.log(e);
    console.log(dot);
    alert(e);
  }

  toggleAuto(channel: KomposerChannel) {
    channel.autoPlayerData.on = !channel.autoPlayerData.on;
    if (!channel.autoPlayerData.on) channel.allOff();
  }

  setChannel(channel: KomposerChannel) {

    const channelNumber = this.komposer.channels.indexOf(channel);

    if (channelNumber < 0 || channelNumber >= this.komposer.channels.length) return;

    // const c = this.komposer.channels[channelNumber];

    //    this.currentDots = this.dots.filter(d => d.channel == this.currentChannel);

    this.currentChannel = channelNumber;
  }

  placeDot(e) {
    this.moveElement(e.target, e.detail);
  }

  private addLoops(name, loops) {
    const c = this.komposer.addChannel(name, loops);
    const players = c.players;
    this.addPlayers(players, this.komposer.channels.length - 1);
  }

  attached() {


    this.activateKomposerCommandHandler.execute(true);

    this.addLoops("1", LoopLibrary.getBeatBox(150));
    this.addLoops("2", LoopLibrary.getSimpleBeat1());
    this.addLoops("3", LoopLibrary.getSimpleBeat2Fast());

    //    this.setChannel(0);

    // const explode = (url: string, offset: number) => {
    //   KLoopUtils.explode(url)
    //     .forEach(l => {
    //       // const pos = this.getRandomPos(50, 50);
    //       // pos.x = offset;
    //       // var loop = { id: 7, loopId: l.guid, pos: pos };

    //       this.addLoop(l);
    //     });
    // }

    // explode(this.testSounds[0], 400);
    // explode(this.testSounds[9], 350);
    // explode(this.testSounds[10], 450);

    //       this.startTestSeq();

  }


  get tempo(): number {
    return Komposer.tempo;

    //    return Math.round(this.state.data.tempo);
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


  addPlayers(players: KLoopPlayer[], channel: number) {
    const getNewRandomDot = (player: KLoopPlayer): KLoopViewModel => {
      const pos = this.getRandomPos(300, 300);
      var dot = <KLoopViewModel>{ id: newGuid(), pos: pos, player: player, channel: channel };
      return dot;
    }

    players.forEach(p => {
      const dot = getNewRandomDot(p);
      this.dots.push(dot);
    });

  }

  // edit(dot: KLoopViewModel) {
  //   dot.isEditing = true;
  //   console.log(dot);
  // }

  deleteLoopView(dot: KLoopViewModel) {
    // debugger;

    // delete the player
    const c = this.komposer.channels[dot.channel];
    c.delete(dot.player);

    // delete the ui
    var i = this.dots.indexOf(dot);
    this.dots.splice(i, 1);
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


  moveElement(element, { x, y }) {

    // translate the element
    element.style.webkitTransform =
      element.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    element.setAttribute('data-x', x);
    element.setAttribute('data-y', y);

  }


}

