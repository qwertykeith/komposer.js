export class KLoop {

  constructor(
    public url: string,
    public beat: number,
    public volume: number
  ) { }

}

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
