import { Dot } from './../models/dot';
import { inject, bindable, bindingMode } from 'aurelia-framework';

@inject(Element)
export class DotViewCustomElement {

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  dot: Dot;

  @bindable()
  test: string;

  // dot:Dot;

  constructor(private element: HTMLElement) {
    // this.dot={
    // id:4,
    // text:'aaaaaa',
    // pos:{x:1,y:2}

    // };

  }

//   public dotChanged(newValue: string, oldValue: string): void {
//     console.log('DDDDDD');
//     console.log(newValue);
//     this.dispatch('newDot', newValue);
// //    debugger;
//   }

  attached(argument) {

    // this.element.onmousemove=(event)=>{
    //   console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');

    //   this.dispatch('loaded', this.dot);
    // }  


    // console.log('this.dot');
    // console.log(this.dot);

    // const data = {
    //   element:argument.target,

    // };

//    debugger;


  }

  // dispatch(name, data) {
  //   this.element.dispatchEvent(
  //     new CustomEvent(name, {
  //       bubbles: true,
  //       detail: data
  //     })
  //   );
  // }


}
