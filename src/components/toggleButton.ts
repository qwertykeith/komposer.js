import { bindable, bindingMode, autoinject } from 'aurelia-framework';

@autoinject()
export class ToggleButtonCustomElement {

  // @bindable({ defaultBindingMode: bindingMode.twoWay })
  @bindable()
  prop: boolean;

  // toggle() {
  //   this.prop = !this.prop;

  // }

  // private htmlElement: HTMLElement;

  // constructor(private element: Element) {
  //   this.htmlElement = element as HTMLElement;

  //   // this makes sure that touch works when the element is draggable
  //   this.htmlElement.ontouchstart = (event) => {
  //     this.htmlElement.dispatchEvent(
  //       new CustomEvent("click", {
  //         bubbles: true,
  //       })
  //     );
  //   }

  //   // this.htmlElement.ontouchend = (event) => {
  //   //   this.htmlElement.dispatchEvent(
  //   //     new CustomEvent("click", {
  //   //       bubbles: true,
  //   //     })
  //   //   );
  //   // }

  // }

  // click() {
  //   //    alert("dgsdfg");
  // }

}
