import { VocalKit1Urls } from './soundLibUrls/vocalKit1Urls';
import { getSouldUrls } from './soundUrlUtils';
import { DAnalogDK1Urls } from './soundLibUrls/dAnalogDK1Urls';
import { DBassUrls } from './soundLibUrls/dBassUrls';
import { Kwahmah02Urls } from './soundLibUrls/kwahmah02Urls';
import { PercUrls } from './soundLibUrls/percUrls';
import { SohoUrls } from './soundLibUrls/sohoUrls';
import { BeatBoxUrls } from './soundLibUrls/beatBoxUrls';
import { WizkitUrls } from './soundLibUrls/wizkitUrls';
import { KLoop } from "../kLoopPlayer";

const someBeats = [
  1 / 8.0, 1 / 8.0, 1 / 8.0, 1 / 8.0, 1 / 8.0, 1 / 8.0,
  1 / 16.0, 1 / 16.0, 1 / 16.0, 1 / 16.0, 1 / 16.0, 1 / 16.0, 1 / 16.0,
  1 / 4.0,
  1 / 6.0,
];

const basicBeats = [1 / 8.0, 1 / 4.0];

function getRandom<T>(a: Array<T>) {
  return a[Math.floor(a.length * Math.random())]
}

function getRandomLoops(count: number, urls: string[], beats: number[]) {
  // randomly add stuff
  const loops: KLoop[] = [];
  for (let i = 0; i < count; i++) {
    const sound = getRandom(urls);
    const beat = getRandom(beats);
    var vol = 1;
    loops.push(new KLoop(sound, beat, vol));
  }
  return loops;
}

export const LoopLibrary = {

  getRandomSounds(): KLoop[] {

    const urlses = [
      VocalKit1Urls,
      DAnalogDK1Urls,
      DBassUrls,
      Kwahmah02Urls,
      PercUrls,
      SohoUrls,
      BeatBoxUrls,
      WizkitUrls,
    ];

    var urls = getRandom(urlses);
    var count = Math.floor(Math.random() * 20);
    var sounds = getSouldUrls(urls);
    var beats = Array(10).fill(1 / 16)
      .concat(Array(10).fill(1 / 4))
      .concat(Array(10).fill(1 / 8))
      .concat(Array(10).fill(1 / 1))
      .concat(Array(10).fill(1 / 32))
      ;

    return getRandomLoops(count, sounds, beats);

    // function* getSomVariations(){
    // const looptimes=Math.floor(Math.random()*5);

    // for (var i = 0; i < looptimes; i++) {
    //     const sound = getRandom(urls);
    //     const beat = getRandom(beats);
    //     var vol = 1;
    //     loops.push(new KLoop(sound, beat, vol));

    // }


    // }



    //     return getRandomLoops(20, urls, Array(10).fill(1 / 16).concat(1 / 32));


  },

  getBeatBox: (count: number) => {
    var urls = getSouldUrls(BeatBoxUrls);
    return getRandomLoops(count, urls, someBeats);
  },

  getSimpleBeat1: () => {
    var urls = getSouldUrls(WizkitUrls);
    return getRandomLoops(20, urls, basicBeats);
  },

  getFastSimpleBeat1: () => {
    var urls = getSouldUrls(WizkitUrls);
    return getRandomLoops(20, urls, Array(10).fill(1 / 16).concat(1 / 32));
  },

  getSimpleBeat2: () => {
    var urls = getSouldUrls(SohoUrls);
    return getRandomLoops(20, urls, Array(10).fill(1 / 8).concat([1 / 4, 1 / 2, 1 / 16]));
  },

  getSimpleBeat2Fast: () => {
    var urls = getSouldUrls(SohoUrls);
    return getRandomLoops(20, urls, Array(10).fill(1 / 8).concat([1 / 16, 1 / 2, 1 / 16]));
  },

  lameMelody1: () => {
    var urls = getSouldUrls(DBassUrls);
    return getRandomLoops(40, urls, Array(20).fill(1 / 2).concat([1 / 32, 1 / 24, 1 / 4, 1 / 12, 1 / 16]));
  },

  lots: () => {
    var urls = getSouldUrls(PercUrls);
    return getRandomLoops(40, urls, Array(40).fill(1 / 8).concat([1 / 32, 1 / 24, 1 / 4, 1 / 12, 1 / 16]));
  },

  getTest: () => {
    var urls = getSouldUrls(SohoUrls);
    return getRandomLoops(3, urls, Array(4).fill(1 / 8).concat([1 / 16, 1 / 2, 1 / 16]));
  },



  //   soundUlrsDBass = getSouldUrls(DBass);

  // soundUlrsDAnalogDK1 = getSouldUrls(DAnalogDK1);

  // soundUlrskwahmah02 = getSouldUrls(Kwahmah02Urls);

  // soundUlrsVocalKit1 = getSouldUrls(VocalKit1Urls);

  // soundUlrsWizkit = getSouldUrls(WizkitUrls);

  //  = ;

  // soundUlrsSoho = getSouldUrls(SohoUrls);

  // soundUlrsPerc = getSouldUrls(PercUrls);

  // testSounds = getSouldUrls(BeatBoxUrls); // this.soundUlrsBeatBox;
  // // testSounds = this.soundUlrsSoho;




}


