import { bindable, bindingMode } from 'aurelia-framework';
export class ExponentialSelectCustomElement {

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: number

}
