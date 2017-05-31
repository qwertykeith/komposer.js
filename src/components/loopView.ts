import { KLoopPlayer } from './../libs/kLoopPlayer';
import { LoopLibrary } from './../libs/sounds/loopLibrary';
import { setTimeout } from 'timers';
import { log } from 'util';
import { SampleTriggerEvents } from './../libs/sampleTriggerEvents';
import { inject, bindable, bindingMode } from 'aurelia-framework';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject()
export class LoopViewCustomElement {

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  player: KLoopPlayer;

  showTick: boolean;

  private htmlElement: HTMLElement;

  constructor(private element: Element) {

    this.htmlElement = element as HTMLElement;

    this.htmlElement.ontouchmove = (event) => {
      this.dispatch('loop-start', this.player);
    }

    this.htmlElement.onmousedown = (event) => {
      this.dispatch('loop-start', this.player);
    }

    this.htmlElement.ontouchstart = (event) => {
      this.dispatch('loop-start', this.player);
    }

    this.htmlElement.ontouchend = (event) => {
      this.dispatch('loop-stop', this.player);
    }

    this.htmlElement.onmouseenter = (event) => {
      this.dispatch('loop-start', this.player);
    }

    this.htmlElement.onmouseleave = (event) => {
      this.dispatch('loop-stop', this.player);
    }

    this.htmlElement.onmouseup = (event) => {
      this.dispatch('loop-stop', this.player);
    }

  }

  private getLoopInfo() {
    return this.player.getLoop();
  }

  playerChanged(newLoop: KLoopPlayer, oldLoop: KLoopPlayer) {
    if (oldLoop != newLoop) {

      let lastTimeout: any = null;

      this.player.listen(() => {
        // debugger;
        clearTimeout(lastTimeout);
        this.showTick = true;

        lastTimeout = setTimeout(() => {
          this.showTick = false
        }, 20);
      });

    }
  }



  // attached(argument) {


  // }

  get style() {
    const size = 50;

    // const size = 400 * this.getLoopInfo().beat;
    let border = (60 * (1 / (this.getLoopInfo().beat))) / size;

    if (border > size / 2) border = size / 2;

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
    } 1
    r %= 255;
    g %= 255;
    b %= 255;

    const alpha = this.getLoopInfo().volume;

    return `width: ${size}px; height: ${size}px; border-color: rgba(${r}, ${g}, ${b}, ${alpha}); border-width:${border}px;`;
  }

  // strip off the full url and get the name of the file
  getSoundName() {

    function replaceAll(text, str1, str2, ignore) {
      return text.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
    }

    const url = this.getLoopInfo().url;
    var lastslash = url.lastIndexOf('/') + 1;

    return replaceAll(
      url.substr(lastslash).replace('.wav', '')
      , '+', ' ', '');
  }

  dispatch(name, data) {
    this.htmlElement.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        detail: data
      })
    );
  }

}
