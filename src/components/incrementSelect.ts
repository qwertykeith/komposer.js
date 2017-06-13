import { bindable, bindingMode } from 'aurelia-framework';
export class IncrementSelectCustomElement {

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: number

}
