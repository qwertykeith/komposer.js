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

  getStyle() {

    const size = 400 * this.loop.beat;

    // make up a color from the name
    const name = this.getSoundName();
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < name.length; i++) {
      const code = name.charCodeAt(i);
      switch (i % 3) {
        case 0: r += code; break;
        case 1: g += code; break;
        case 2: b += code; break;
      }
    }
    r%=255;
    g%=255;
    b%=255;
    //      console.log(total);



    return `background-color: rgb(${r}, ${g}, ${b}); width:${size}px; height: ${size}px;`;
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
