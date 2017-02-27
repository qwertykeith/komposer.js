import { autoinject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import Tone from 'tone'

/**
 * listen to global transport times to find the current measure (and fraction of measure)
 */
@autoinject()
export class TransportEvents {

  //  loop: Tone.Sequence;

  private ename: string = 'transporttimer';

  constructor(private eventAggregator: EventAggregator) {



// console.log('tone is...');

// console.log(Tone);

// debugger;

    // 16th note timer to send out what fraction of the bar we are in
    const loop = new Tone.Sequence((time, col) => {

      const posArr = Tone.Transport.position.split(':').map(p => p as number);

      const bar = +posArr[0] as number;
      const beat = +posArr[1] as number;
      const sixteenths = +posArr[2] as number;

      const timeSig = Tone.Transport.timeSignature as number;

      const beatInMeasure = (beat / timeSig);
      const sixtenthsInMeasure = (sixteenths / 4.0) / timeSig;
      const measure = bar + beatInMeasure + sixtenthsInMeasure;
      // console.log(measure);

      this.eventAggregator.publish(this.ename, measure);

    }, [0], "1/16");

    loop.start();

  }

  listen(callback: (measure: number) => void) {
    this.eventAggregator.subscribe(this.ename, (measure) => {
      callback(measure as number);
    });
  }

}
