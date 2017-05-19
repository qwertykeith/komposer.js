import { bindable, bindingMode } from 'aurelia-framework';

export class ToggleButton {

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
