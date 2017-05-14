import { autoinject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';

/**
 * pub sub for sample trigger events
 */
@autoinject()
export class SampleTriggerEvents {

  private ename: string = 'soundOn';
  private eventAggregator: EventAggregator = new EventAggregator();

  constructor() { }

  listen(callback: () => void) {
    this.eventAggregator.subscribe(this.ename, response => {
      callback();
    });
  }

  dispatch() {
    this.eventAggregator.publish(this.ename);
  }

}
