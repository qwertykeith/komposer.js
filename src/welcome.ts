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

  soundUlrsDBass = [
    "354324__mtg__double-bass-c3-pizzicato.wav",
    "354326__mtg__double-bass-d3-pizzicato.wav",
    "354328__mtg__double-bass-e3-pizzicato.wav",
    "354329__mtg__double-bass-f3-pizzicato.wav",
    "354331__mtg__double-bass-g3-pizzicato.wav",
    "354333__mtg__double-bass-a3-pizzicato.wav",
    "354335__mtg__double-bass-b3-pizzicato.wav",
    "354336__mtg__double-bass-c4-pizzicato.wav",
    "354341__mtg__double-bass-f4-pizzicato.wav",
    "354343__mtg__double-bass-g4-pizzicato.wav",
  ].map(f => `https://s3-ap-southeast-2.amazonaws.com/ksounds/Dbass/${f}`);

  soundUlrsDAnalogDK1 = `
127393__menegass__mopho-bd0.wav
127394__menegass__mopho-bd1.wav
127395__menegass__mopho-bd3.wav
127396__menegass__mopho-bd4.wav
127397__menegass__mopho-bd5.wav
127398__menegass__mopho-bd6.wav
127399__menegass__mopho-bd7.wav
127400__menegass__mopho-bd8.wav
127401__menegass__mopho-bd9.wav
127402__menegass__mopho-cc0.wav
127403__menegass__mopho-cc1.wav
127404__menegass__mopho-cc2.wav
127405__menegass__mopho-cc3.wav
127406__menegass__mopho-cc5.wav
127407__menegass__mopho-cc6.wav
127408__menegass__mopho-cc7.wav
127409__menegass__mopho-cc8.wav
127410__menegass__mopho-cc9.wav
127411__menegass__mopho-co0.wav
127412__menegass__mopho-co1.wav
127413__menegass__mopho-hq0.wav
127414__menegass__mopho-hq1.wav
127415__menegass__mopho-hq2.wav
127416__menegass__mopho-hq3.wav
127417__menegass__mopho-pop0.wav
127418__menegass__mopho-pop1.wav
127419__menegass__mopho-sd0.wav
127420__menegass__mopho-sd1.wav
127421__menegass__mopho-sd2.wav
127422__menegass__mopho-sd3.wav
127423__menegass__mopho-sd4.wav
127424__menegass__mopho-microzap0.wav
127425__menegass__mopho-microzap1.wav
127426__menegass__mopho-microzap2.wav
127427__menegass__mopho-microzap3.wav
127428__menegass__mopho-microzap4.wav
127429__menegass__mopho-noise0.wav
127430__menegass__mopho-noise1.wav
127431__menegass__mopho-noise2.wav
127432__menegass__mopho-noise3.wav
`
  .split('\n')
  .map(f => `https://s3-ap-southeast-2.amazonaws.com/ksounds/7945__menegass__mopho-dsi-analog-drum-kit/${f}`);

  soundUlrskwahmah02 = `
255904__kwahmah-02__isd19.wav
255905__kwahmah-02__isd17.wav
255906__kwahmah-02__isd18.wav
255907__kwahmah-02__isd05.wav
255908__kwahmah-02__isd06.wav
255909__kwahmah-02__isd21.wav
255910__kwahmah-02__isd22.wav
255911__kwahmah-02__isd23.wav
255912__kwahmah-02__isd24.wav
255913__kwahmah-02__isd03.wav
255914__kwahmah-02__isd04.wav
255915__kwahmah-02__isd01.wav
255916__kwahmah-02__isd02.wav
255917__kwahmah-02__isd27.wav
255918__kwahmah-02__isd20.wav
255919__kwahmah-02__isd25.wav
255920__kwahmah-02__isd26.wav
255921__kwahmah-02__isd30.wav
255922__kwahmah-02__isd29.wav
255923__kwahmah-02__isd16.wav
255924__kwahmah-02__isd15.wav
255925__kwahmah-02__isd28.wav
255926__kwahmah-02__isd08.wav
255927__kwahmah-02__isd07.wav
255928__kwahmah-02__isd10.wav
255929__kwahmah-02__isd09.wav
255930__kwahmah-02__isd12.wav
255931__kwahmah-02__isd11.wav
255932__kwahmah-02__isd14.wav
255933__kwahmah-02__isd13.wav
`
  .split('\n')
  .map(f=>f.trim())
  .filter(f=>f.length)
  .map(f => `https://s3-ap-southeast-2.amazonaws.com/ksounds/15696__kwahmah-02__image-to-sound-drumkit-public-domain/${f}`);

  soundUlrsVocalKit1 = `
345410__artmasterrich__gunfire-02.wav
345411__artmasterrich__gunfire-01.wav
345412__artmasterrich__bullet-ricochet-02.wav
345413__artmasterrich__bullet-ricochet-01.wav
345414__artmasterrich__kicking-01.wav
345417__artmasterrich__impact-01.wav
345418__artmasterrich__landing-02.wav
345419__artmasterrich__landing-01.wav
345422__artmasterrich__male-yes-01.wav
345423__artmasterrich__male-yeah-01.wav
345424__artmasterrich__male-yeah-02.wav
345425__artmasterrich__male-jump-02.wav
345426__artmasterrich__male-jump-03.wav
345427__artmasterrich__punch-02.wav
345428__artmasterrich__punch-03.wav
345429__artmasterrich__punching-01.wav
345431__artmasterrich__male-heyyy-01.wav
345433__artmasterrich__male-hurt-01.wav
345436__artmasterrich__male-hurt-04.wav
345437__artmasterrich__male-jump-01.wav
345438__artmasterrich__male-hurt-02.wav
345439__artmasterrich__male-hurt-03.wav
345440__artmasterrich__thud-01.wav
345441__artmasterrich__punch-01.wav
345448__artmasterrich__laserfire-02.wav
345449__artmasterrich__laserfire-01.wav
345456__artmasterrich__male-death-04.wav
345458__artmasterrich__male-what-01.wav
345460__artmasterrich__thud-02.wav
345461__artmasterrich__male-land-02.wav
345462__artmasterrich__male-land-01.wav
345465__artmasterrich__male-ok-01.wav
345468__artmasterrich__male-ok-02.wav
`
  .split('\n')
  .map(f=>f.trim())
  .filter(f=>f.length)
  .map(f => `https://s3-ap-southeast-2.amazonaws.com/ksounds/19588__artmasterrich__action-sfx-vocal-kit/${f}`);

  soundUlrsWizkit = `
185022__casmarrav__rum-kick.wav
185023__casmarrav__keep-distance-kick.wav
185024__casmarrav__fast-food-kick.wav
185025__casmarrav__deep-thought-kick.wav
185026__casmarrav__42de-snare.wav
185027__casmarrav__hpf-it-snare.wav
185028__casmarrav__bang-as-in-bang-snare.wav
185029__casmarrav__beatbox-short-cut-snare.wav
185030__casmarrav__slip-2-hihat.wav
185031__casmarrav__slip-1-hihat.wav
185032__casmarrav__slide-hihat.wav
185033__casmarrav__reso-hihat.wav
185034__casmarrav__15m4-n64.wav
185036__casmarrav__13m2-kingconga.wav
185037__casmarrav__12m1-tone.wav
185200__casmarrav__max-kick.wav
185201__casmarrav__underdog-kick.wav
185202__casmarrav__mic-shake-kick.wav
185203__casmarrav__no-ice-kick.wav
185204__casmarrav__reggie-snare.wav
185205__casmarrav__tony-snare.wav
185206__casmarrav__warmer-snare.wav
185207__casmarrav__cold-as-ice-snare.wav
185208__casmarrav__poisonous-tock-hi-hat.wav
185209__casmarrav__poisonous-tick-hi-hat.wav
185210__casmarrav__headz-ringin-hi-hat.wav
185211__casmarrav__retro-hi-hat.wav
185213__casmarrav__bad-boom-kick.wav
185214__casmarrav__bad-bap-snare.wav
186971__casmarrav__iowa-dub-kick.wav
186972__casmarrav__roundabout-kick.wav
186973__casmarrav__outta-my-way-kick.wav
186974__casmarrav__dub-kick.wav
186975__casmarrav__sampled-style-snare.wav
186976__casmarrav__mo-fat-combo-snare.wav
186977__casmarrav__broken-snare.wav
186978__casmarrav__cold-shortcut-snare.wav
186979__casmarrav__dutty-personal-semi-hihat.wav
186980__casmarrav__dutty-personal-open-hihat.wav
186981__casmarrav__dutty-metal-semi-hihat.wav
186982__casmarrav__dutty-metal-open-hihat.wav
186983__casmarrav__bbox-y-misc.wav
186984__casmarrav__bbox-x-misc.wav
186986__casmarrav__bbox-a-misc.wav
`
  .split('\n')
  .map(f=>f.trim())
  .filter(f=>f.length)
  .map(f => `https://s3-ap-southeast-2.amazonaws.com/ksounds/11659__casmarrav__wizzkit/${f}`);

  soundUlrsBeatBox = `
335767__ipaghost__brush.wav
335768__ipaghost__chk1.wav
335769__ipaghost__blip1.wav
335770__ipaghost__breath.wav
335771__ipaghost__bd9.wav
335772__ipaghost__bdsnare.wav
335773__ipaghost__breath4.wav
335774__ipaghost__breathin.wav
335775__ipaghost__breath2.wav
335777__ipaghost__ht-roll.wav
335778__ipaghost__go.wav
335779__ipaghost__chk3.wav
335780__ipaghost__chk2.wav
335781__ipaghost__clp1.wav
335782__ipaghost__chk4.wav
335783__ipaghost__clp3.wav
335784__ipaghost__clp2.wav
335785__ipaghost__clp5.wav
335786__ipaghost__clp4.wav
335787__ipaghost__tom-5.wav
335788__ipaghost__tom-6.wav
335789__ipaghost__squeeze.wav
335790__ipaghost__tom-1.wav
335791__ipaghost__tom-2.wav
335792__ipaghost__tom-3.wav
335793__ipaghost__snow3.wav
335794__ipaghost__splat.wav
335795__ipaghost__splat2.wav
335796__ipaghost__splat3.wav
335797__ipaghost__tom-5.wav
335798__ipaghost__tom-6.wav
335799__ipaghost__squeeze.wav
335800__ipaghost__tom-1.wav
335801__ipaghost__tom-2.wav
335802__ipaghost__tom-3.wav
335803__ipaghost__snow3.wav
335804__ipaghost__splat.wav
335805__ipaghost__splat2.wav
335806__ipaghost__splat3.wav
335807__ipaghost__bd4.wav
335808__ipaghost__bd3.wav
335809__ipaghost__bd8.wav
335810__ipaghost__bd7.wav
335811__ipaghost__bd12.wav
335812__ipaghost__bd11.wav
335813__ipaghost__bd10.wav
335814__ipaghost__bd1.wav
335815__ipaghost__bd16.wav
335816__ipaghost__bd15.wav
335817__ipaghost__bd14.wav
335818__ipaghost__bd13.wav
335819__ipaghost__bd18.wav
335820__ipaghost__bd17.wav
335821__ipaghost__scratch1.wav
335822__ipaghost__scratch2.wav
335823__ipaghost__rip.wav
335824__ipaghost__scratch.wav
335825__ipaghost__rim3.wav
335826__ipaghost__rim4.wav
335827__ipaghost__rim1.wav
335828__ipaghost__rim2.wav
335829__ipaghost__snare1.wav
335830__ipaghost__snare10.wav
335831__ipaghost__snare7.wav
335832__ipaghost__snare6.wav
335833__ipaghost__snare9.wav
335834__ipaghost__snare8.wav
335835__ipaghost__snare2.wav
335836__ipaghost__snare5.wav
335837__ipaghost__snare4.wav
335838__ipaghost__snow2.wav
335839__ipaghost__snow1.wav
335840__ipaghost__ht.wav
335841__ipaghost__ht2.wav
335842__ipaghost__ht3.wav
335843__ipaghost__htcl1.wav
335844__ipaghost__htcl2.wav
335845__ipaghost__htcl3.wav
335846__ipaghost__htcl4.wav
335847__ipaghost__htcl5.wav
335848__ipaghost__htcl6.wav
335849__ipaghost__htcl7.wav
335850__ipaghost__reverse-snare.wav
335851__ipaghost__reverse-ht.wav
335852__ipaghost__monkey6.wav
335853__ipaghost__monkey5.wav
335854__ipaghost__monkey4.wav
335855__ipaghost__monkey3.wav
335856__ipaghost__monkey2.wav
335857__ipaghost__monkey1.wav
335858__ipaghost__moan.wav
335859__ipaghost__htcl8.wav
`
  .split('\n')
  .map(f=>f.trim())
  .filter(f=>f.length)
  .map(f => `https://s3-ap-southeast-2.amazonaws.com/ksounds/18994__ipaghost__ipa-beatbox-kit-01/${f}`);

  soundUlrsSoho = `
25210__suonho__deconstruction-kit-bip-zip.wav
25211__suonho__deconstruction-kit-clak01.wav
25212__suonho__deconstruction-kit-clak02.wav
25213__suonho__deconstruction-kit-click.wav
25214__suonho__deconstruction-kit-clock.wav
25215__suonho__deconstruction-kit-highhat01.wav
25216__suonho__deconstruction-kit-highhat02.wav
25217__suonho__deconstruction-kit-highhat03.wav
25218__suonho__deconstruction-kit-highhat04.wav
25219__suonho__deconstruction-kit-highhat05.wav
25220__suonho__deconstruction-kit-hihat-double.wav
25221__suonho__deconstruction-kit-hihat-open01.wav
25222__suonho__deconstruction-kit-hihat-open02.wav
25223__suonho__deconstruction-kit-hihat-open03.wav
25224__suonho__deconstruction-kit-kick-it01.wav
25225__suonho__deconstruction-kit-kick-it02.wav
25226__suonho__deconstruction-kit-kick-it03.wav
25227__suonho__deconstruction-kit-kick-it04.wav
25228__suonho__deconstruction-kit-kick-it05.wav
25229__suonho__deconstruction-kit-kickbox01.wav
25230__suonho__deconstruction-kit-kickbox02.wav
25231__suonho__deconstruction-kit-klick-in.wav
25232__suonho__deconstruction-kit-klick-out.wav
25233__suonho__deconstruction-kit-rim-wet01.wav
25234__suonho__deconstruction-kit-rim-wet02.wav
25235__suonho__deconstruction-kit-rim-wet03.wav
25236__suonho__deconstruction-kit-rim-wet04.wav
25237__suonho__deconstruction-kit-rim1.wav
25238__suonho__deconstruction-kit-rim2.wav
25239__suonho__deconstruction-kit-snare-double.wav
25240__suonho__deconstruction-kit-snare-double2.wav
25241__suonho__deconstruction-kit-snare-triple.wav
25242__suonho__deconstruction-kit-snare1.wav
25243__suonho__deconstruction-kit-snare2.wav
25244__suonho__deconstruction-kit-snare3.wav
25245__suonho__deconstruction-kit-tamburine.wav
`
  .split('\n')
  .map(f=>f.trim())
  .filter(f=>f.length)
  .map(f => `https://s3-ap-southeast-2.amazonaws.com/ksounds/1564__suonho__suonho-deconstruction-kit/${f}`);

  soundUlrsPerc = [
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

  // testSounds = this.soundUlrsDBass.concat(this.soundUlrsPerc);
  // testSounds = this.soundUlrsDAnalogDK1;
  // testSounds = this.soundUlrskwahmah02;
  // testSounds = this.soundUlrsVocalKit1;
  // testSounds = this.soundUlrsWizkit;
  testSounds = this.soundUlrsBeatBox;
  // testSounds = this.soundUlrsSoho;


  // testSounds = this.soundUlrsPerc;

  constructor(
    private player: KLoopPlayer,
    private autoPlayer: AutoPlayer) {

    console.log('%c KOMPOSER!','background-color:green; color: white, font-weight:bold');

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

    // console.log(e);

    this.moveElement(e.target, e.detail);

  }


  // itemDropped(item, target, source, sibling, itemVM, siblingVM) {
  //   console.log(target);

  //   //do things in here
  // }


  attached() {

// console.log('------------------------------');
// console.log(this.soundUlrsDAnalogDK1);
// console.log('------------------------------');
// debugger;

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

    explode(this.testSounds[0], 400);
    explode(this.testSounds[9], 350);
    explode(this.testSounds[10], 450);

    //    this.startTestSeq();

  }


  get tempo(): number {
    return Math.round(Komposer.tempo);
  }

  set tempo(bpm: number) {
    Komposer.tempo = bpm;
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
    const sound = this.testSounds[Math.floor(this.testSounds.length * Math.random())]
    const beat = beats[Math.floor(beats.length * Math.random())]


    var vol = 1; // (Math.random() * 0.5) + 0.5;

    // if (Math.random() < 0.5) vol = 0.5;
    const pos = this.getRandomPos(300, 300);

    var dot = { id: 7, loop: new KLoop(sound, beat, vol), pos: pos };
    // console.log('NEW dot');
    // console.log(dot);

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

