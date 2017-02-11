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

  getSoundName() {

    function replaceAll(text, str1, str2, ignore) {
      return text.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
    }

    const url = this.loop.url;
    var lastslash = url.lastIndexOf('/') + 1;

    return replaceAll(
      url.substr(lastslash).replace('.wav', '')
      , '+', ' ', '');
  }


}
