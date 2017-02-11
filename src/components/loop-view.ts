import { KLoop } from './../models/kloop';
import { inject, bindable, bindingMode } from 'aurelia-framework';

@inject(Element)
export class LoopViewCustomElement {

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  loop: KLoop;

  // dot:Dot;

  constructor(private element: HTMLElement) {

  }

  attached(argument) {
    console.log('........................');
    console.log(this.loop);
    
  }

}
