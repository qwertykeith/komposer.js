import { bindable, bindingMode } from 'aurelia-framework';

export class ToggleButtonCustomElement {

  // @bindable({ defaultBindingMode: bindingMode.twoWay })
  @bindable()
  prop: boolean;

  // toggle() {
  //   this.prop = !this.prop;

  // }

  click() {
    //    alert("dgsdfg");
  }

}
