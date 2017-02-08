import { Dot } from './../models/dot';
import { inject, bindable, bindingMode } from 'aurelia-framework';

@inject(Element)
export class DotViewCustomElement {

 @bindable({ defaultBindingMode: bindingMode.twoWay }) 
 dot: Dot;

@bindable()
test:string;

// dot:Dot;

  constructor(private element: HTMLElement) {
// this.dot={
// id:4,
// text:'aaaaaa',
// pos:{x:1,y:2}

// };
  }

  attached(argument) {
    console.log('this.dot');
    console.log(this.dot);

      this.dispatch('loaded', argument);


  }

  dispatch(name, data) {
    this.element.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        detail: data
      })
    );
  }


}
