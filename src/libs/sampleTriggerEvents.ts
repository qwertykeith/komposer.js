import { autoinject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';

/**
 * pub sub for sample trigger events
 */
@autoinject()
export class SampleTriggerEvents {

  private ename: string = 'soundOn';

  constructor(private eventAggregator: EventAggregator) { }

  listen(guid: string, callback: () => void) {
    this.eventAggregator.subscribe(this.ename + '_' + guid, response => {
      callback();
    });
  }

  dispatch(guid: string) {
    this.eventAggregator.publish(this.ename + '_' + guid, guid);
  }

}
