/**
 * describes a sound
 */
export class KLoop {

  public guid: string;

  constructor(
    public url: string,
    public beat: number,
    public volume: number
  ) {


    function newGuid(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    this.guid = newGuid();

  }

}

/**
 * utilities for kloops
 */
export class KLoopUtils {

  static explode(url: string): KLoop[] {

    const loops: KLoop[] = [];

    const beatSteps = 4;
    const volumeSteps = 6;
    for (var beat = 0; beat < beatSteps; beat++) {

      for (var volume = 0; volume < volumeSteps; volume++) {

        const beatFraction = 1 / (Math.pow(2, (beat + 2)));
        const volFraction = volume / volumeSteps;
        const loop = new KLoop(url, beatFraction, volFraction);
        loops.push(loop);
      }
    }

    return loops;

  }
}
